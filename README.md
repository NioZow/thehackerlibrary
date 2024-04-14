# The Hacker Library

A library for hackers

# Run

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

# execute the commands from the run.sh file to initialize the mariadb database

# run the server (from the server directory)
go run main.go

# or
bin/server.x64.elf
```
