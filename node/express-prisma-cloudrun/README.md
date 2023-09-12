## Cloud run Cloud build Cloud sql 環境でデプロイするExpress prisma API



## TOOO
- DockerFileのnode_modulesなどの不要ファイル対応
- リレーション
- リポジトリを分ける（roadmapサイト用と汎用express-api用）
- シーダー
- where句の色々なフィルタリング、クエリ
- https://www.youtube.com/watch?v=RebA5J-rlwg



### API追加
#### CREATE,READ,UPDATE,DELETEそれぞれ実装する


#### リポジトリ

#### ユースケース

#### ルーティングファイルの分割




#### リレーション


## 以下整理
スキーマから、Prisma Clientコードを自動作成（prisma migrateで、マイグレーションとPrisma Clientコードが自動生成されるが、マイグレーションは行わず、Prisma Client生成のみ実行される）

```
npx prisma generate
```

Prismaでスキーマをもとにテーブル作成(通常マイグレーション)
```
npx prisma migrate dev --name add-todo-table
```


```
# docker build -t api -f ./docker/Dockerfile .
```


```
docker run --name mysqldb -e MYSQL_DATABASE=test -e MYSQL_ROOT_PASSWORD=password -d -p 13306:3306 mysql:latest
```

#### コンテナポートマッピングして起動

```
docker container run -it -p 18000:8080 api
```

#### コンテナに入る

```
docker container exec -it <コンテナID> /bin/bash
```

### mysqlに接続
```
mysql -h 127.0.0.1 --port 3306 -uroot -p
```

```
show databases;
use sample_db;
show tables;
select * from User;
```

## cloud runへのデプロイ

https://zenn.dev/igz0/articles/e3e859b88bdd56#cloud-run%E3%81%AE%E8%A8%AD%E5%AE%9A

```
gcloud builds submit --region=REGION
```

## 構成

### インフラ
- Cloud Run ✖️　Cloud BuildでCI/CD
- Cloud SQL
### ローカル
Docker



テーブルの作成（マイグレーションファイルを生成せずにスキーマとDBを同期 ※開発時のみ使用するものと思われ）
```
npx prisma db push
```

スキーマのマージ。実務ではスキーマファイルを分割することがほとんどだと思うので、こういったライブラリを駆使してファイルを細かく分けマージする
```
npx prisma-merge --baseFile prisma/base.prisma --schemaFilePatterns 'prisma/*/*.prisma' --outputFile prisma/schema.prisma
```