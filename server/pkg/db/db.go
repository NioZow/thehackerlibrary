package db

import (
	"database/sql"
	"fmt"
	"thehackerlibrary/pkg/env"

	_ "github.com/go-sql-driver/mysql"
)

var DB *sql.DB

func Setup(reset bool) error {

    var (
        err error
    )

    DB, err = sql.Open("mysql", fmt.Sprintf("%s:%s@tcp(%s:%s)/%s", env.DB_USERNAME, env.DB_PASSWORD, env.DB_HOST, env.DB_PORT, env.DB_NAME))
    if err != nil {
        return err
    }

    if reset {
        _, err = DB.Exec("DROP TABLE authors_link, tags_link, resources, authors, tags")
        if err != nil {
            return err
        }
    }

    // creating authors table
    _, err = DB.Exec("CREATE TABLE IF NOT EXISTS authors (id INT PRIMARY KEY NOT NULL AUTO_INCREMENT, name VARCHAR(30) UNIQUE)")
    if err != nil {
        return err
    }

    // creating tags table
    _, err = DB.Exec("CREATE TABLE IF NOT EXISTS tags (id INT PRIMARY KEY NOT NULL AUTO_INCREMENT, name VARCHAR(40) UNIQUE)")
    if err != nil {
        return err
    }

    // creating resources table
    _, err = DB.Exec("CREATE TABLE IF NOT EXISTS resources (id INT PRIMARY KEY NOT NULL AUTO_INCREMENT, type VARCHAR(10), name VARCHAR(150) UNIQUE, date VARCHAR(11), url VARCHAR(150), price SMALLINT, difficulty TINYINT, Time SMALLINT)")
    if err != nil {
        return err
    }

    // creating tags_link table
    _, err = DB.Exec("CREATE TABLE IF NOT EXISTS tags_link (tag_id INT, resource_id INT, FOREIGN KEY(tag_id) REFERENCES tags(id), FOREIGN KEY(resource_id) REFERENCES resources(id))")
    if err != nil {
        return err
    }

    // creating authors_link table
    _, err = DB.Exec("CREATE TABLE IF NOT EXISTS authors_link (author_id INT, resource_id INT, FOREIGN KEY(author_id) REFERENCES authors(id), FOREIGN KEY(resource_id) REFERENCES resources(id))")
    if err != nil {
        return err
    }

    return err
}
