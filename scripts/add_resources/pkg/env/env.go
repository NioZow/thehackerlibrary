package env

import (
	"log"
	"os"

	"github.com/joho/godotenv"
)

var (
	DATABASE_URL = ""
)

func init() {

	// load the dotenv file
	// this will load overwrite any env variable
	if err := godotenv.Load(".env"); err != nil {
		log.Fatal(err)
	}

	// get env variables
	DATABASE_URL = os.Getenv("POSTGRES_URL")
}
