from flask import Flask, jsonify, request, session
from firebase_admin import credentials
from firebase_admin import auth as authToken
from flask_cors import CORS, cross_origin
from functools import wraps
import firebase_admin
import pyrebase
import json
import os 
from datetime import datetime

def noquote(s):
    return s
pyrebase.pyrebase.quote = noquote

#set up database
cred = credentials.Certificate("apiKey.json")
firebase_admin.initialize_app(cred)
pyrebase = pyrebase.initialize_app(json.load(open('dbconfig.json')))

auth = pyrebase.auth()
db = pyrebase.database()

DEBUG = True

app = Flask(__name__) 
app.secret_key = os.urandom(24)
app.config.from_object(__name__)
app.config['CORS_HEADERS'] = 'Content-Type'

# enable CORS
CORS(app, resources={r"/*": {"origins": "*"}})

#middleware for auth
def isAuthenticated(f):
    @wraps(f)
    def wrap(*args,**kwargs):
        if not request.headers.get('token'):
            return {'message': 'No token provided'},400
        try:
            user = authToken.verify_id_token(request.headers['token'])
            request.user = user
        except Exception as e:
            print(e)
            if 'Token expired' in str(e) :
                print(session['user']['refreshToken'])
                user = auth.refresh(session['user']['refreshToken'])
                print(user)
                return jsonify(status='refreshToken', user_id=user["userId"], user_token=user['idToken'])
            return { 'status': 'false', 'message':'Invalid token provided.'},400
        return f(*args, **kwargs)
    return wrap


#register
@app.route('/register', methods=['POST'])
def register():

    data = request.get_json()

    if request.json == None:
        return jsonify(status=False, message="json encryption is wrong !")
    elif "email" not in data:
        return jsonify(status=False, message="Missing email field")
    elif "password" not in data:
        return jsonify(status=False, message="Missing password field")
    elif "password" not in data:
        return jsonify(status=False, message="Missing username field")

    username= request.json['username']
    email= request.json['email']
    password= request.json['password']
    try:
        #create the user
        auth.create_user_with_email_and_password(email, password)

        #login the user right away
        user = auth.sign_in_with_email_and_password(email, password) 
        session['user'] = user
     
        data = {
            'username': username,
            'email': email
        }

        #store data in realtime database
        db.child('users/' + auth.current_user['localId'] +'/profile').set(data)
        
        return jsonify(user_id=auth.current_user["localId"], user_token=user['idToken'], user_email=email, username=username, status=True)
    except Exception as e:
        if "EMAIL_EXISTS" in str(e):
            return jsonify(status=False, message="email already exist")
        elif "WEAK_PASSWORD" in str(e):
            return jsonify(status=False, message="password must be at leat 6 characters")
        else:
            return jsonify(status=False, message=str(e))

#login route
@app.route("/login", methods=["POST"])
def login():
    data = request.get_json()

    if request.json == None:
        return jsonify(status=False, message="json encryption is wrong !")
    elif "email" not in data:
        return jsonify(status=False, message="Missing email field")
    elif "password" not in data:
        return jsonify(status=False, message="Missing password field")
    
    email = request.json["email"]
    password = request.json["password"]
    
    try:
        #login the user
        user = auth.sign_in_with_email_and_password(email, password) 
        session['user'] = user
        # get username from user id 
        username = db.child('users/' + user['localId'] + '/profile').get().val()["username"]
        
        return jsonify(status=True, user_id=user["localId"], user_token=user['idToken'], user_email=email, username=username)

    except Exception as e:
        return jsonify(status="false", message="Wrong Credentials")  


# USER
# Uptade username
@app.route("/user/update/<id>", methods=["PUT"])
@isAuthenticated
def updateUsername(id):
    username = request.json['username']
    try:
        data = {
            'username': username
        }
        db.child('users/' + id + "/profile").update(data)
        return jsonify(status='true', data=username)
    except Exception as e:
        print(e)
        return jsonify(status='false', message=e)

def toJSON(self):
        return json.dumps(self, default=lambda o: o.__dict__, 
            sort_keys=True, indent=4)

#WORD
# create word
@app.route("/word/create/<id>", methods=['POST'])
def createWord(id):
    data = request.json
    for i in data:
        data = ({
            "genre" : i['genre'],
            "date" : datetime.today().strftime('%Y-%m-%d-%H-%M'),
            "definitions": i["definitions"]
        })
        try:
            db.child('users/' + id + "/words/" + i['lang'] + "/" + i["word"]).set(data)
        except Exception as e:
            return jsonify(status="true", message=e)
    return jsonify(status="true")

# Get all words of a user
@app.route("/word/all/<id>", methods=["GET"])
@isAuthenticated
def wordSearch(id):
    word = db.child("users").child(id).child("words").get()

    if not word.val():
        return jsonify(status='false', message="Word not found")

    return jsonify(word.val())

# Get all french words of a user
@app.route("/word/fr/<id>", methods=["GET"])
@isAuthenticated
def wordFrSearch(id):
    word = db.child("users").child(id).child("words").child('fr').get()

    if not word.val():
        return jsonify(status='false', message="Word not found")

    return jsonify(word.val())

# Get all english words of a user
@app.route("/word/en/<id>", methods=["GET"])
@isAuthenticated
def wordEnearch(id):
    word = db.child("users").child(id).child("words").child('en').get()

    if not word.val():
        return jsonify(status='false', message="Word not found")

    return jsonify(word.val())