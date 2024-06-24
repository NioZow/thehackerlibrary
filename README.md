# The Hacker Library
> A library for hackers

# Installation

## Dependencies

Install all dependencies for the project

```bash
npm install
```

## DB setup

You must set up the db in order to make it work. There is a docker-compose for that to make it easy. Just run the following command to run the db:

```bash
docker compose up -d
```

Create the tables, columns... of the db
```bash
npx prisma db push
```

add resources to the db
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

# Contributing

You can make pull requests to add new resources to the library. Resources of the library are located in the `data` directory.
Here is an example of a format for a resource.
```yaml
- Type: "blogpost"
  Tags:
    - "Malware Development"
    - "Syscalls"
  Url: "https://alice.climent-pommeret.red/posts/a-syscall-journey-in-the-windows-kernel/"
  Authors:
    - "Alice Climent-Pommeret"
  Name: "A Syscall Journey in the Windows Kernel"
  Difficulty: hard
  Date: "2022-03-24"
  Time: 26
```
