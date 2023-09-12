FROM node:lts-slim

WORKDIR /usr/api

ENV PORT 8080

# コンテナ内でnpxコマンドを実行するため
RUN apt-get update -y && apt-get install -y openssl
COPY ./api .
COPY ./docker/start.sh .

RUN npm ci --only=production
RUN npm run build

RUN chmod +x ./start.sh
CMD  ["./start.sh"]


