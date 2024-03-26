package server

import (
	"empirelabs/pkg/training"
	"encoding/json"
	"net/http"
)

func DummyFunction() http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Content-Type", "application/json")

		json.NewEncoder(w).Encode(map[string]string{
			"Message": "API is working!",
		})
	}
}

func GetTrainings() http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Access-Control-Allow-Origin", "*")
		w.Header().Set("Content-Type", "application/json")

		json.NewEncoder(w).Encode(training.Trainings)
	}
}
