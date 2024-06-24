package cmd

import (
	"log"
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
	Cli.Flags().BoolVar(&flags.Reset, "reset", false, "reset the db")
}

func start(cmd *cobra.Command, args []string) error {

	if flags.Reset {
		if err := db.Reset(); err != nil {
			log.Fatal(err)
		}
		
		log.Println("Done")
	} else {

		if (len(args) != 1){
			log.Fatal("you must provide a path as argument")
		}

		if err := resource.LoadAllResources(args[0]); err != nil{
			log.Fatal(err)
		}

		log.Println("Done")
	}
	
	return nil
}