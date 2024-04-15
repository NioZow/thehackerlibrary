# The Hacker Library

A library for hackers

# Run

## Docker
then you can browse the website at localhost:8080
```
docker-compose up
```

## Manually
you will be able to browse the website at localhost:5173
client (frontend):

you will need to install Node Package Manager (npm) first. You can then type the following commands.
```bash
npm install
npm run dev
```

server (backend):

you will to have mariadb installed and then you either need to have the go programming language installed or you can use the precompiled binaries in server/bin
```bash
# start mariadb (migth be different on windows)
sudo systemctl start mariadb

# execute those commands as root to initialize the mariadb database
mariadb-install-db --user=mysql --basedir=/usr --datadir=/var/lib/mysql
systemctl start mariadb
mariadb -u root -p --execute "CREATE DATABASE thehackerlibrary;"
mariadb -u root -p --execute "CREATE USER 'thehackerlibrary'@'localhost' IDENTIFIED BY 'thehackerlibrary';"
mariadb -u root -p --execute "GRANT ALL PRIVILEGES ON thehackerlibrary.* TO 'thehackerlibrary'@'localhost';"

# run the server (from the server directory)
go run main.go

# or
bin/server.x64.elf
```
