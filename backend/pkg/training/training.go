package training

import (
	"gopkg.in/yaml.v2"
	"log"
	"os"
	"strings"
)

const (
	TIME_LAYOUT = "02/01/2006"
)

type (
	Training struct {
		// Type of the formation can be BLOG_POST, COURSE, WEBSITE, LAB, SOURCE_CODE...
		// Type byte `yaml:"Type"`
		Type string `yaml:"Type" json:"Type"`

		// Some relevant tags to the formation for easier search
		Tags []string `yaml:"Tags" json:"Tags"`

		// Price of the course, if any
		Price uint16 `yaml:"Price" json:"Price"`

		// Url
		Url string `yaml:"Url" json:"Url"`

		// Authors who created it
		Authors []string `yaml:"Authors" json:"Authors"`

		// Name of blog post or course...
		Name string `yaml:"Name" json:"Name"`

		// Difficulty of understanding
		// Values can be EASY, MEDIUM, HARD, INSANE
		Difficulty string `yaml:"Difficulty" json:"Difficulty"`

		// Time in minutes to go through
		Time uint16 `yaml:"Time" json:"Time"`

		// Published date string
		// Format: 25/12/2023
		Date string `yaml:"Date" json:"Date"`
	}
)

var (
	Trainings *[]Training = new([]Training)
)

// Take the path of training yaml file
func LoadTrainings(path string) {

	var trainings []Training

	// Read YAML file
	yamlFile, err := os.ReadFile(path)
	if err != nil {
		log.Fatalf("Error reading YAML file: %v", err)
	}

	// Unmarshal YAML into struct
	err = yaml.Unmarshal(yamlFile, &trainings)
	if err != nil {
		log.Fatalf("Error unmarshaling YAML: %v", err)
	}

	// Loop through all trainings from that file
	for _, training := range trainings {

		// transfer info
		*Trainings = append(*Trainings, Training{
			Type:       strings.ToUpper(training.Type),
			Price:      training.Price,
			Url:        training.Url,
			Name:       training.Name,
			Time:       training.Time,
			Tags:       training.Tags,
			Authors:    training.Authors,
			Difficulty: training.Difficulty,
		})
	}
}

func LoadAllTrainings(path string) {

	// list all files and directories of the specified dir
	dirs, err := os.ReadDir(path)
	if err != nil {
		log.Fatal(err)
	}

	// loop through all files and directories
	// will ignore files and just process directories
	for _, dir := range dirs {

		// get info on the file/dir
		dirInfo, err := os.Stat(path + "/" + dir.Name())
		if err != nil {
			log.Fatal(err)
		}

		// check if it's a dir or not
		if dirInfo.IsDir() {

			// list the content of that new dir
			// only interested by files there
			files, err := os.ReadDir(path + "/" + dir.Name())
			if err != nil {
				log.Fatal(err)
			}

			// loop through the files
			for _, file := range files {
				// get the info the files/dirs
				fileInfo, err := os.Stat(path + "/" + dir.Name() + "/" + file.Name())
				if err != nil {
					log.Fatal(err)
				}

				// check its a yaml file
				if !fileInfo.IsDir() &&
					((len(file.Name()) >= 5 && file.Name()[len(file.Name())-4:] == ".yml") ||
						(len(file.Name()) >= 6 && file.Name()[len(file.Name())-5:] == ".yaml")) {

					LoadTrainings(path + "/" + dir.Name() + "/" + file.Name())
				}
			}
		}
	}
}
