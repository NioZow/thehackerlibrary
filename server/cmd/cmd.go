package cmd

import (
	"fmt"
	"log"
	"net/http"
	"thehackerlibrary/cmd/server"
	"thehackerlibrary/pkg/db"
	"thehackerlibrary/pkg/resource"
	"thehackerlibrary/pkg/update"

	"github.com/spf13/cobra"
)

type (
	Flags struct {
		Reset bool
		Update bool
		Pull bool
		Debug bool
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
	Cli.Flags().BoolVar(&flags.Update, "update", false, "update the db, will not launch the server")
	Cli.Flags().BoolVar(&flags.Pull, "pull", false, "use \"git pull\" to download the latest update")
	Cli.Flags().BoolVar(&flags.Debug, "debug", false, "launch in debugging mode, remove CORS problems by setting a wildcard")
}

func start(cmd *cobra.Command, args []string) error {

	// get update from github
	if flags.Pull {
		if err := update.Update(); err != nil {
			return err
		}

		log.Print("Successfully pull the git")

		// if i want to pull but not update, quit
		if !flags.Update{
			return nil
		}
	}

	// Setup database and stuff
	if err := db.Setup(flags.Reset); err != nil {
		log.Fatal(err)
	}

	// server
	if err := resource.LoadAllResources("./data"); err != nil{
		log.Fatal(err)
	}

	// if update do not start the server
	// so quit here
	if flags.Update {
		return nil
	}

	// Start the API
	router := server.ServerStart(flags.Debug)
	err := http.ListenAndServe("0.0.0.0:8000", router)
	if err != nil {
		log.Fatalf("Failed to start http server: %v", err)
	}

	return nil
}