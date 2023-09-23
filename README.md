# my-docker-repo

### Dockerfileを元にイメージを作成

```
# docker build -t <作成するイメージ名> -f docker/Dockerfile .
docker build -t my-image -f docker/Dockerfile .
```

### コンテナ起動

```
# docker container run -v <ホストのパス:コンテナのパス> -p <ホストのport:コンテナのポート> --name <コンテナ名> <イメージ名>
docker container run --rm -v /Users/usename/・・・/app:/opt/app -d -p 13000:3000 --restart=always -it --name my-container my-image
```

### 依存関係インストール・開発サーバー起動

```
docker container exec my-container /bin/bash -c "npm ci && npm run dev"
```
