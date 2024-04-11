package cmd

import (
	"fmt"
	"log"
	"net/http"
	"thehackerlibrary/cmd/server"
	"thehackerlibrary/pkg/db"
	"thehackerlibrary/pkg/resource"

	"github.com/spf13/cobra"
)

type (
	Flags struct {
		Reset bool
	}
)

var (
	Cli = &cobra.Command{
		Use:          "thehackerlibrary",
		Short:        fmt.Sprintf("The Hacker Library"),
		SilenceUsage: true,
		RunE:         start,
	}

	flags Flags
)

// init all flags
func init() {
	Cli.CompletionOptions.DisableDefaultCmd = true

	// server flags
	Cli.Flags().SortFlags = false
	Cli.Flags().BoolVar(&flags.Reset, "reset", false, "reset the db before launching")
}

func start(cmd *cobra.Command, args []string) error {

	// Setup database and stuff
	if err := db.Setup(flags.Reset); err != nil {
		log.Fatal(err)
	}

	// server
	if err := resource.LoadAllResources("./data/"); err != nil{
		log.Fatal(err)
	}

	// Start the API
	router := server.ServerStart()
	err := http.ListenAndServe("0.0.0.0:8000", router)
	if err != nil {
		log.Fatalf("Failed to start http server: %v", err)
	}

	return nil
}