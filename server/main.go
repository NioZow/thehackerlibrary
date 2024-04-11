package main

import (
	"log"
	"thehackerlibrary/cmd"
)

func main() {
	if err := cmd.Cli.Execute(); err != nil {
		log.Fatal(err)
	}
}
