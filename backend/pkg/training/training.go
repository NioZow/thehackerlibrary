package training

import (
	"empirelabs/pkg/utils"
	"log"
	"os"
	"strings"

	"gopkg.in/yaml.v2"
)

const (
	TYPE_BLOGPOST    = 0x01
	TYPE_COURSE      = 0x02
	TYPE_WEBSITE     = 0x03
	TYPE_LAB         = 0x04
	TYPE_SOURCE_CODE = 0x05

	DIFFICULTY_EASY   = 0x01
	DIFFICULTY_MEDIUM = 0x02
	DIFFICULTY_HARD   = 0x03
	DIFFICULTY_INSANE = 0x04

	TIME_LAYOUT = "02/01/2006"
)

type (
	TrainingYaml struct {
		// Type of the formation can be BLOG_POST, COURSE, WEBSITE, LAB, SOURCE_CODE...
		// Type byte `yaml:"Type"`
		Type string `yaml:"Type"`

		// Some relevant tags to the formation for easier search
		Tags []string `yaml:"Tags"`

		// Price of the course, if any
		Price uint16 `yaml:"Price"`

		// Url
		Url string `yaml:"Url"`

		// Authors who created it
		Authors []string `yaml:"Authors"`

		// Name of blog post or course...
		Name string `yaml:"Name"`

		// Short description about it
		Description string `yaml:"Description"`

		// Difficulty of understanding
		// Values can be EASY, MEDIUM, HARD, INSANE
		Difficulty string `yaml:"Difficulty"`

		// Time in minutes to go through
		Time uint16 `yaml:"Time"`

		// Published date string
		// Format: 25/12/2023
		Date string `yaml:"Date"`
	}

	// Training
	// More optimized in term of memory
	Training struct {
		// Type of the formation can be BLOG_POST, COURSE, WEBSITE, LAB, SOURCE_CODE...
		// Type byte `yaml:"Type"`
		Type byte `yaml:"Type"`

		// Some relevant tags to the formation for easier search
		// Store all tags in a global variable and set pointer to it
		// To consume a minimal amount of memory
		Tags []*string `yaml:"Tags"`

		// Price of the course, if any
		Price uint16 `yaml:"Price"`

		// Url
		Url string `yaml:"Url"`

		// Authors who created it
		// Store all authors in a global variable and set pointer to it
		// To consume a minimal amount of memory
		Authors []*string `yaml:"Authors"`

		// Name of blog post or course...
		Name string `yaml:"Name"`

		// Short description about it
		Description string `yaml:"Description"`

		// Difficulty of understanding
		// Values can be EASY, MEDIUM, HARD, INSANE
		Difficulty byte `yaml:"Difficulty"`

		// Time in minutes to go through
		Time uint16 `yaml:"Time"`

		// Published date string
		Date string `yaml:"Date"`
	}
)

var (
	Trainings *[]Training = new([]Training)

	Types map[string]byte = map[string]byte{
		"BLOGPOST":    TYPE_BLOGPOST,
		"COURSE":      TYPE_COURSE,
		"LAB":         TYPE_LAB,
		"WEBSITE":     TYPE_WEBSITE,
		"SOURCE CODE": TYPE_SOURCE_CODE,
	}

	Difficulties map[string]byte = map[string]byte{
		"EASY":   DIFFICULTY_EASY,
		"MEDIUM": DIFFICULTY_MEDIUM,
		"HARD":   DIFFICULTY_HARD,
		"INSANE": DIFFICULTY_INSANE,
	}

	Tags    []string
	Authors []string
)

// Take the path a tra
func LoadTrainings(path string) {

	var (
		trainings []TrainingYaml
		training  Training
		ok        bool
		tagPtr    *string
		authorPtr *string
	)

	// Read YAML file
	yamlFile, err := os.ReadFile("test.yaml")
	if err != nil {
		log.Fatalf("Error reading YAML file: %v", err)
	}

	// Unmarshal YAML into struct
	err = yaml.Unmarshal(yamlFile, &trainings)
	if err != nil {
		log.Fatalf("Error unmarshaling YAML: %v", err)
	}

	// Loop through all trainings from that file
	for _, trainingYaml := range trainings {
		// Convert that TrainingYaml to a Training structure
		// This one is more optimized

		// transfer info
		training = Training{
			Price:       trainingYaml.Price,
			Url:         trainingYaml.Url,
			Name:        trainingYaml.Name,
			Description: trainingYaml.Description,
			Time:        trainingYaml.Time,
			Date:        trainingYaml.Date,
		}

		// Convert the type to a byte
		if training.Type, ok = Types[strings.ToUpper(trainingYaml.Type)]; !ok {
			// the type is unknow generate an error
			log.Fatalf("Unknown training type '%s' for training '%s' from '%s'", trainingYaml.Type, trainingYaml.Name, path)
		}

		// Convert the tags into an array of pointers to tags
		// Iterates through all set tags
		for _, tag := range trainingYaml.Tags {
			// Search if the tag is already known
			if tagPtr = utils.GetElementFromArrayOfStrings(Tags, tag); tagPtr != nil {
				// The tag already exists, add a pointer to it
				training.Tags = append(training.Tags, tagPtr)
			} else {
				// The tag does not exist
				// Add it and store a pointer to it
				Tags = append(Tags, tag)
				training.Tags = append(training.Tags, &Tags[len(Tags)-1])
			}
		}

		// Convert the authors into an array of pointers to authors
		// Iterates through all set authors
		for _, author := range trainingYaml.Authors {
			// Search if the tag is already known
			if authorPtr = utils.GetElementFromArrayOfStrings(Authors, author); authorPtr != nil {
				// The tag already exists, add a pointer to it
				training.Authors = append(training.Authors, authorPtr)
			} else {
				// The tag does not exist
				// Add it and store a pointer to it
				Authors = append(Authors, author)
				training.Authors = append(training.Authors, &Authors[len(Authors)-1])
			}
		}

		// Convert the difficulty to a byte
		if training.Difficulty, ok = Difficulties[strings.ToUpper(trainingYaml.Difficulty)]; !ok {
			// the difficulty is unknow generate an error
			log.Fatalf("Unknown training difficulty '%s' for training '%s' from '%s'", trainingYaml.Difficulty, trainingYaml.Name, path)
		}

		// Convert the date to a timestamp
		/*
			parsedTime, err := time.Parse(TIME_LAYOUT, trainingYaml.Date)
			if err != nil {
				// time format isn't valid raise error
				log.Fatalf("Unknown training date '%s' for training '%s' from '%s'", trainingYaml.Date, trainingYaml.Name, path)
			}

			// Convert the time.Time object to Unix timestamp
			timestamp := parsedTime.Unix()
			fmt.Println(timestamp)
		*/

		*Trainings = append(*Trainings, training)
	}
}
