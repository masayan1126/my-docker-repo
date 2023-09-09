FROM node:lts-slim

ARG APP_NAME=app

WORKDIR /opt/${APP_NAME}

ENV PORT 3000

RUN apt-get update -y && apt-get install -y vim curl openssl
COPY ../app ./