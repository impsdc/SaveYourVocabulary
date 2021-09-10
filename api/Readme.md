## Lauch Api

#### Build container
`
    docker build -t name . --no-cache
`

#### Lauch container

`
  docker run -dp 3000:3000 name
`

#### Local serve for development
`
FLASK_APP=main.py FLASK_ENV=development flask run
`

#### Testing api
`
curl -i -H "Content-Type: application/json" charset=utf-8 -X POST -d '{"email":"lol@gmail.com", "password":"trucmuch"}' 127.0.0.1:5000/login
`