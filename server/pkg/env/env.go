package env

import (
	"log"
	"os"

	"github.com/joho/godotenv"
)

var (
	DB_NAME = ""
	DB_USERNAME = ""
	DB_PASSWORD = ""
	DB_PORT = ""
)

func init() {

	// load the dotenv file
	err := godotenv.Load(".env")
	if err != nil {
		log.Fatal(err)
	}

	// get env variables
	DB_NAME = os.Getenv("DB_NAME")
	DB_USERNAME = os.Getenv("DB_USERNAME")
	DB_PASSWORD = os.Getenv("DB_PASSWORD")
	DB_PORT = os.Getenv("DB_PORT")
}
