FROM python:3.8
COPY /app /app
COPY requirements.txt /app/requirements.txt
WORKDIR /app
RUN python3 -m venv /opt/venv
RUN /opt/venv/bin/python3 -m pip install --upgrade pip
RUN /opt/venv/bin/pip3 install -r requirements.txt 
RUN export FLASK_APP=app.py
RUN export FLASK_ENV=development
CMD /opt/venv/bin/flask run --port=5000 --host=0.0.0.0