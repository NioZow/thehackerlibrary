package server

import (
	"github.com/gorilla/mux"
)

func ServerStart(debug bool) *mux.Router {

	router := mux.NewRouter()
	// Api routes

	// Get all resources
	router.HandleFunc("/api/resources", getResources(debug, false, false, false, false, false)).Methods("GET")

	// no filtering 
	// sort has to be full lowercase
	router.HandleFunc("/api/resources/sort/{sort}/asc", getResources(debug, false, true, true, false, false)).Methods("GET") 
	router.HandleFunc("/api/resources/sort/{sort}/desc", getResources(debug, false, true, false, false, false)).Methods("GET") 

	router.HandleFunc("/api/resources/sort/{sort}/asc/limit/{limit}", getResources(debug, false, true, true, true, false)).Methods("GET")
	router.HandleFunc("/api/resources/sort/{sort}/desc/limit/{limit}", getResources(debug, false, true, false, true, false)).Methods("GET")

	router.HandleFunc("/api/resources/sort/{sort}/asc/limit/{limit}/page/{page}", getResources(debug, false, true, true, true, true)).Methods("GET")
	router.HandleFunc("/api/resources/sort/{sort}/desc/limit/{limit}/page/{page}", getResources(debug, false, true, false, true, true)).Methods("GET")

	// filtering
	// name has to be full lowercase and hyphen (-) instead of space
	router.HandleFunc("/api/resources/{columnFilter}/{name}", getResources(debug, true, false, false, false, false)).Methods("GET") 

	router.HandleFunc("/api/resources/{columnFilter}/{name}/sort/{sort}/asc", getResources(debug, true, true, true, false, false)).Methods("GET") 
	router.HandleFunc("/api/resources/{columnFilter}/{name}/sort/{sort}/desc", getResources(debug, true, true, false, false, false)).Methods("GET") 

	router.HandleFunc("/api/resources/{columnFilter}/{name}/sort/{sort}/asc/limit/{limit}", getResources(debug, true, true, true, true, false)).Methods("GET")
	router.HandleFunc("/api/resources/{columnFilter}/{name}/sort/{sort}/desc/limit/{limit}", getResources(debug, true, true, false, true, false)).Methods("GET")

	router.HandleFunc("/api/resources/{columnFilter}/{name}/sort/{sort}/asc/limit/{limit}/page/{page}", getResources(debug, true, true, true, true, true)).Methods("GET")
	router.HandleFunc("/api/resources/{columnFilter}/{name}/sort/{sort}/desc/limit/{limit}/page/{page}", getResources(debug, true, true, false, true, true)).Methods("GET")

	return router
}
