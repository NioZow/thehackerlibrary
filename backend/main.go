package main

import (
	"fmt"
	"thehackerlibrary/cmd"
	"thehackerlibrary/pkg/training"
)

func main() {
	fmt.Println("Starting server")

	training.LoadAllTrainings("./data/")
	cmd.Start()
}
