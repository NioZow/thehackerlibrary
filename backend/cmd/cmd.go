package cmd

import (
	"empirelabs/cmd/server"
	"log"
	"net/http"
)

func Start() {

	// Handle arguments

	// Setup database and stuff

	// Start the API
	router := server.ServerStart()
	err := http.ListenAndServe("0.0.0.0:8000", router)
	if err != nil {
		log.Fatalf("Failed to start http server: %v", err)
	}
}
