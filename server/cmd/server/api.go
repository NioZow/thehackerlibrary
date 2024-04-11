package server

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"strconv"
	"strings"
	"thehackerlibrary/pkg/db"
	"thehackerlibrary/pkg/resource"
	"thehackerlibrary/pkg/utils"

	"github.com/gorilla/mux"
)

const (
	INFINITE = 0
	CORS string = "*"
)

var (
	Columns = map[string]string{
		"type" : "resources.type",
		"name" : "resources.name",
		"date" : "resources.date",
		"price" : "resources.price",
		"difficulty" : "resources.difficulty",
		"time" : "resources.time",
		"tag" : "tags.name",
		"author" : "authors.name",
	}
)

func getResources(filter bool, sort bool, sortAsc bool, limit bool, page bool) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {

		w.Header().Set("Access-Control-Allow-Origin", CORS)
		w.Header().Set("Content-Type", "application/json")

		var (
			resources []resource.Resource = make([]resource.Resource, 0)
			resourceTmp resource.Resource
			resource resource.Resource
			id int
			tag string
			author string
			lastId int
			vars map[string]string = mux.Vars(r)
			args []interface{}
			sqlQuery string = `SELECT
				resources.id,
				resources.type,
				resources.name,
				resources.date,
				resources.url,
				resources.price,
				resources.difficulty,
				resources.time,
				tags.name,
				authors.name
				FROM resources
				INNER JOIN tags_link on tags_link.resource_id = resources.id
				INNER JOIN tags on tags.id = tags_link.tag_id
				INNER JOIN authors_link on authors_link.resource_id = resources.id
				INNER JOIN authors on authors.id = authors_link.author_id`
		)

		if filter {
			// add LIKE %string%
			// transform name

			switch vars["columnFilter"] {
			case "name":
				sqlQuery += " WHERE LOWER(resources.name) LIKE ?"
				args = append(args, "%" + strings.ToLower(vars["name"]) + "%")
				break
			case "type":
				sqlQuery += " WHERE LOWER(resources.type) LIKE ?"
				args = append(args, "%" + strings.ToLower(vars["name"]) + "%")
				break
			case "date":
				sqlQuery += " WHERE LOWER(resources.date) LIKE ?"
				args = append(args, "%" + strings.ToLower(vars["name"]) + "%")
				break
			case "price":
				sqlQuery += " WHERE resources.price >= ?"
				price, err := strconv.Atoi(vars["name"])
				if err != nil {
					http.Error(w, "value for filter price must be a number", http.StatusInternalServerError)
					return
				}

				args = append(args, price)		
				break
			case "difficulty":
				sqlQuery += " WHERE resources.difficulty = ?"
				difficulty, err := strconv.Atoi(vars["name"])
				if err != nil {
					http.Error(w, "value for filter difficulty must be a number", http.StatusInternalServerError)
					return
				}

				args = append(args, difficulty)		
				break
			case "time":
				sqlQuery += " WHERE resources.time <= ?"
				time, err := strconv.Atoi(vars["name"])
				if err != nil {
					http.Error(w, "value for filter time must be a number", http.StatusInternalServerError)
					return
				}

				args = append(args, time)		
				break
			case "tag":

				// get the ids of the resources matching those tags	
				sqlQuery += " WHERE resources.id IN (SELECT resources.id FROM resources INNER JOIN tags_link ON tags_link.resource_id = resources.id INNER JOIN tags ON tags.id = tags_link.tag_id INNER JOIN authors_link ON authors_link.resource_id = resources.id INNER JOIN authors ON authors.id = authors_link.author_id WHERE tags.name LIKE ? GROUP BY resources.id)"

				args = append(args, "%" + strings.ToLower(vars["name"]) + "%")
				break
			case "author":
				sqlQuery += " WHERE LOWER(authors.name) LIKE ?"
				args = append(args, "%" + strings.ToLower(vars["name"]) + "%")
				break
			default:
				http.Error(w, "unknown value for column filter", http.StatusInternalServerError)
				return
			}	
		} 

		sqlQuery += " GROUP BY resources.id, tags.name, authors.name"

		if sort {
			column, exists := Columns[vars["sort"]]
			if !exists {
				http.Error(w, "unknown value for sort column", http.StatusInternalServerError)
				return
			}

			if sortAsc {
				sqlQuery += fmt.Sprintf(" ORDER BY %s ASC", column)
			} else {
				sqlQuery += fmt.Sprintf(" ORDER BY %s DESC", column)
			}
		}
	
		if limit {
			// add LIMIT number
			sqlQuery += " LIMIT ?"
			limit, err := strconv.Atoi(vars["limit"])
			if err != nil {
				http.Error(w, "limit is not a valid integer!", http.StatusInternalServerError)
				return
			}

			args = append(args, limit)
			
			if page {

				// add OFFSET page * limit
				sqlQuery += " OFFSET ?"
				pageNbr, err := strconv.Atoi(vars["page"])
				if err != nil {		
					http.Error(w, "page is not a valid integer!", http.StatusInternalServerError)
					return
				}

				args = append(args, (pageNbr - 1)* limit)
			}
		}

		rows, err := db.DB.Query(sqlQuery, args...)
		
		if err != nil {
			log.Panic(err)
			return
		}

		defer rows.Close()

		for rows.Next() {
			if err = rows.Scan(&id, &resource.Type, &resource.Name, &resource.Date, &resource.Url, &resource.Price, &resource.Difficulty, &resource.Time, &tag, &author); err != nil {
				log.Panic(err)
				return
			}

			if lastId != id && lastId != 0 {
				resources = append(resources, resourceTmp)	
				resourceTmp.Tags = make([]string, 0)
				resourceTmp.Authors = make([]string, 0)
			}

			resourceTmp.Type = resource.Type
			resourceTmp.Name = resource.Name
			resourceTmp.Date = resource.Date
			resourceTmp.Url = resource.Url
			resourceTmp.Price = resource.Price
			resourceTmp.Difficulty = resource.Difficulty

			if !utils.IsStringInArray(resourceTmp.Tags, tag){
				resourceTmp.Tags = append(resourceTmp.Tags, tag)
			}

			if !utils.IsStringInArray(resourceTmp.Authors, author){
				resourceTmp.Authors = append(resourceTmp.Authors, author)
			}

			lastId = id 
		}

		// append the last row
		if lastId != 0 {
			resources = append(resources, resourceTmp)
		}

		json.NewEncoder(w).Encode(resources)
	}
}