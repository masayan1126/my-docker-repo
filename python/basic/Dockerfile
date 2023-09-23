
FROM python:3.11

ARG APP_NAME=app

WORKDIR /opt/${APP_NAME}

RUN pip install install google-api-python-client google_auth_oauthlib

COPY ./requirements.txt .

RUN pip install --no-cache-dir --upgrade -r requirements.txt

COPY ./app .