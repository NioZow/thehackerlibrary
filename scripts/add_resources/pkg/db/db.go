package db

import (
	"database/sql"
	"log"
	"thehackerlibrary/pkg/env"

	_ "github.com/lib/pq"
)

var DB *sql.DB

func init() {
    var (
        err error
    )

    DB, err = sql.Open("postgres", env.DATABASE_URL)
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