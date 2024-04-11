package resource

import (
	"os"
	"strings"
	"thehackerlibrary/pkg/db"

	"gopkg.in/yaml.v2"
)

const (
	TIME_LAYOUT = "02/01/2006"
)

type (
	Resource struct {
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
		Difficulty uint8 `yaml:"Difficulty" json:"Difficulty"`

		// Time in minutes to go through
		Time uint16 `yaml:"Time" json:"Time"`

		// Published date string
		// Format: 25/12/2023
		Date string `yaml:"Date" json:"Date"`
	}
)

// Take the path of training yaml file
func LoadResources(path string) error {

	var (
		resources []Resource
		tagId int
		authorId int
		resourceId int
	)

	// Read YAML file
	yamlFile, err := os.ReadFile(path)
	if err != nil {
		return err
	}

	// Unmarshal YAML into struct
	if err = yaml.Unmarshal(yamlFile, &resources); err != nil {
		return err
	}

	// Loop through all trainings from that file
	for _, resource := range resources {

		// Parse the input date with the specified layout
		_, err = db.DB.Exec("INSERT IGNORE INTO resources (type, name, url, date, price, time, difficulty) VALUES (?, ?, ?, ?, ?, ?, ?)", strings.ToUpper(resource.Type), resource.Name, resource.Url, resource.Date, resource.Price, resource.Time, resource.Difficulty)

		if err != nil {
			return err
		}

		// get its id
		if err = db.DB.QueryRow("SELECT id FROM resources WHERE name = ?", resource.Name).Scan(&resourceId); err != nil {
			return err
		}

		// insert tags 
		for _, tag := range resource.Tags {
			if _, err = db.DB.Exec("INSERT IGNORE INTO tags (name) VALUES (?)", tag); err != nil {
				return err
			}

			// get the id of the tag
			if err = db.DB.QueryRow("SELECT id FROM tags WHERE name = ?", tag).Scan(&tagId); err != nil {
				return err
			}

			// insert tag into tags_link
			if _, err = db.DB.Exec("INSERT IGNORE INTO tags_link (tag_id, resource_id) VALUES (?, ?)", tagId, resourceId); err != nil {
				return err
			}
		}

		// insert authors
		for _, author := range resource.Authors {
			if _, err = db.DB.Exec("INSERT IGNORE INTO authors (name) VALUES (?)", author); err != nil {
				return err
			}

			// get the id of the author
			if err = db.DB.QueryRow("SELECT id FROM authors WHERE name = ?", author).Scan(&authorId); err != nil {
				return err
			}

			// insert author into authors_link
			if _, err = db.DB.Exec("INSERT IGNORE INTO authors_link (author_id, resource_id) VALUES (?, ?)", authorId, resourceId); err != nil {
				return err
			}
		}
	}

	return nil
}

func LoadAllResources(path string) error {

	// list all files and directories of the specified dir
	dirs, err := os.ReadDir(path)
	if err != nil {
		return err
	}

	// loop through all files and directories
	// will ignore files and just process directories
	for _, dir := range dirs {

		// get info on the file/dir
		dirInfo, err := os.Stat(path + "/" + dir.Name())
		if err != nil {
			return err
		}

		// check if it's a dir or not
		if dirInfo.IsDir() {

			// list the content of that new dir
			// only interested by files there
			files, err := os.ReadDir(path + "/" + dir.Name())
			if err != nil {
				return err
			}

			// loop through the files
			for _, file := range files {
				// get the info the files/dirs
				fileInfo, err := os.Stat(path + "/" + dir.Name() + "/" + file.Name())
				if err != nil {
					return err
				}

				// check its a yaml file
				if !fileInfo.IsDir() &&
					((len(file.Name()) >= 5 && file.Name()[len(file.Name())-4:] == ".yml") ||
						(len(file.Name()) >= 6 && file.Name()[len(file.Name())-5:] == ".yaml")) {

					if err = LoadResources(path + "/" + dir.Name() + "/" + file.Name()); err != nil {
						return err
					}
				}
			}
		}
	}

	return nil
}