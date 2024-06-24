# The Hacker Library

A library for hackers

# Installation

## Depedencies

```bash
npm install
```

## DB setup

You must setup the db in order to make it work. There is a docker container created for that purpose in order to make it easy. Just run the following command to run the db:

```bash
docker compose up -d
```

You can then init the db (create the schema)

```bash
npx prisma db push
```

you can add then resources to the db

```bash
cd scripts/add_resources
cp .env.example .env
go run main.go ../../data/
cd ../..
```

finally copy the .env.example to .env so that the webserver knows the db url

```bash
cp .env.example .env
```

## Run

```bash
npm run dev
```
