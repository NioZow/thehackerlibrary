package db

import (
	"database/sql"
	"fmt"
	"log"
	"thehackerlibrary/pkg/env"

	_ "github.com/go-sql-driver/mysql"
)

var DB *sql.DB

func init() {

    var (
        err error
    )

    DB, err = sql.Open("mysql", fmt.Sprintf("%s:%s@tcp(%s:%s)/%s", env.DB_USERNAME, env.DB_PASSWORD, env.DB_HOST, env.DB_PORT, env.DB_NAME))
    if err != nil {
        log.Fatal(err)
    }
}

func Reset() error {
    _, err := DB.Exec("DELETE FROM resources");
    if err != nil {
        return err
    }

    _, err = DB.Exec("DELETE FROM tags");
    if err != nil {
        return err
    }

    _, err = DB.Exec("DELETE FROM authors");
    return err
}