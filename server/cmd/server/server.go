package server

import (
	"github.com/gorilla/mux"
)

func ServerStart() *mux.Router {

	router := mux.NewRouter()
	// Api routes

	// Get all resources
	router.HandleFunc("/api/resources", getResources(false, false, false, false, false)).Methods("GET")

	// no filtering 
	// sort has to be full lowercase
	router.HandleFunc("/api/resources/sort/{sort}/asc", getResources(false, true, true, false, false)).Methods("GET") 
	router.HandleFunc("/api/resources/sort/{sort}/desc", getResources(false, true, false, false, false)).Methods("GET") 

	router.HandleFunc("/api/resources/sort/{sort}/asc/limit/{limit}", getResources(false, true, true, true, false)).Methods("GET")
	router.HandleFunc("/api/resources/sort/{sort}/desc/limit/{limit}", getResources(false, true, false, true, false)).Methods("GET")

	router.HandleFunc("/api/resources/sort/{sort}/asc/limit/{limit}/page/{page}", getResources(false, true, true, true, true)).Methods("GET")
	router.HandleFunc("/api/resources/sort/{sort}/desc/limit/{limit}/page/{page}", getResources(false, true, false, true, true)).Methods("GET")

	// filtering
	// name has to be full lowercase and hyphen (-) instead of space
	router.HandleFunc("/api/resources/{columnFilter}/{name}", getResources(true, false, false, false, false)).Methods("GET") 

	router.HandleFunc("/api/resources/{columnFilter}/{name}/sort/{sort}/asc", getResources(true, true, true, false, false)).Methods("GET") 
	router.HandleFunc("/api/resources/{columnFilter}/{name}/sort/{sort}/desc", getResources(true, true, false, false, false)).Methods("GET") 

	router.HandleFunc("/api/resources/{columnFilter}/{name}/sort/{sort}/asc/limit/{limit}", getResources(true, true, true, true, false)).Methods("GET")
	router.HandleFunc("/api/resources/{columnFilter}/{name}/sort/{sort}/desc/limit/{limit}", getResources(true, true, false, true, false)).Methods("GET")

	router.HandleFunc("/api/resources/{columnFilter}/{name}/sort/{sort}/asc/limit/{limit}/page/{page}", getResources(true, true, true, true, true)).Methods("GET")
	router.HandleFunc("/api/resources/{columnFilter}/{name}/sort/{sort}/desc/limit/{limit}/page/{page}", getResources(true, true, false, true, true)).Methods("GET")

	return router
}
