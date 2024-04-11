#!/bin/bash

if [[ "$EUID" -ne "0" ]]; then
	echo "The script must be run as root!"
	exit
fi

#pacman -S mariadb
mariadb-install-db --user=mysql --basedir=/usr --datadir=/var/lib/mysql
systemctl start mariadb
mariadb -u root -p --execute "CREATE DATABASE thehackerlibrary;"
mariadb -u root -p --execute "CREATE USER 'thehackerlibrary'@'localhost' IDENTIFIED BY 'thehackerlibrary';"
mariadb -u root -p --execute "GRANT ALL PRIVILEGES ON thehackerlibrary.* TO 'thehackerlibrary'@'localhost';"
