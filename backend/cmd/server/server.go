package server

import (
	"github.com/gorilla/mux"
)

func ServerStart() *mux.Router {

	router := mux.NewRouter()

	//
	// Api routes
	//

	// Get all formations
	router.HandleFunc("/api/training", GetTrainings()).Methods("GET")

	// Get a formation by difficulty
	router.HandleFunc("/api/formation/difficulty/{difficulty}", DummyFunction()).Methods("GET")

	// Get a formation by price
	router.HandleFunc("/api/formation/price/higher/{price}", DummyFunction()).Methods("GET")
	router.HandleFunc("/api/formation/price/lower/{price}", DummyFunction()).Methods("GET")

	// Get a formation by array of tags
	router.HandleFunc("/api/formation/tag", DummyFunction()).Methods("POST")

	return router
}
