package main

import (
	"fmt"
	"thehackerlibrary/cmd"
	"thehackerlibrary/pkg/training"
	"time"
)

func main() {
	fmt.Println("Starting server")

	training.LoadAllTrainings("./data/")
	cmd.Start()
	// Date string in the format day/month/year
	dateString := "2022/01/01"
	layout := "2006/01/02"

	parsedTime, err := time.Parse(layout, dateString)
	if err != nil {
		fmt.Println("Error parsing date:", err)
		return
	}

	// Convert the time.Time object to Unix timestamp
	timestamp := parsedTime.Unix()

	// Print the timestamp
	fmt.Println("Unix Timestamp:", (timestamp - 946684800))
}
