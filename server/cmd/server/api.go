package server

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"strconv"
	"thehackerlibrary/pkg/db"
	"thehackerlibrary/pkg/resource"
	"thehackerlibrary/pkg/utils"

	"github.com/gorilla/mux"
)

const (
	INFINITE = 0
	CORS string = "*"
)

type (
	Resources struct {
		Resources []resource.Resource `json:"resources"`	
		Size int `json:"size"`
	}
)

func getResources(debug bool, filter bool, sort bool, sortAsc bool, limit bool, page bool) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {

		// do not care about CORS if we are in debugging mode
		if debug {
			w.Header().Set("Access-Control-Allow-Origin", CORS)
		}

		w.Header().Set("Content-Type", "application/json")

		var (
			resources Resources = Resources{make([]resource.Resource, 0), 0}
			filterValue string 
			filterColumn string
			sortColumn string
			limitValue int
			pageValue int
			ids []int
			err error
			query string = "SELECT r.type, r.name, r.date, r.url, r.price, r.difficulty, r.time, GROUP_CONCAT(DISTINCT t.name SEPARATOR ', ') as tags FROM resources r LEFT JOIN (tags_link tl CROSS JOIN tags t) ON (tl.resource_id = r.id AND t.id = tl.tag_id)"
			queryAuthors string = "SELECT GROUP_CONCAT(DISTINCT a.name SEPARATOR ', ') as authors FROM resources r LEFT JOIN (authors_link al CROSS JOIN authors a) ON (al.resource_id = r.id AND a.id = al.author_id)"
			resource resource.Resource
		)

		vars := mux.Vars(r)

		if filter {
			filterValue = vars["name"]
			filterColumn = vars["columnFilter"]
		}

		if sort {
			sortColumn = vars["sort"]
		}

		if limit {
			limitValue, err = strconv.Atoi(vars["limit"])
			if err != nil {
				http.Error(w, "limit is not a valid integer!", http.StatusInternalServerError)
				return
			}
		} 

		if page {
			pageValue, err = strconv.Atoi(vars["page"])
			if err != nil {
				http.Error(w, "page is not a valid integer!", http.StatusInternalServerError)
				return
			}
		} 

		// get the ids of resources
		ids, resources.Size, err = db.GetIdsOfResources(filterValue, filterColumn, sortColumn, sortAsc, limitValue, pageValue)
		if err != nil {
			http.Error(w, "an error occured on the server side", http.StatusInternalServerError)
			return
		}

		// no matches return empty resources
		if len(ids) == 0 {
			json.NewEncoder(w).Encode(resources)
			return
		}

		// transform the ids to: IN (id1, id2, id3...)
		query += " WHERE r.id IN ("
		queryAuthors += " WHERE r.id IN ("
		for i, id := range ids {
			if i != len(ids) - 1 {
				query += fmt.Sprint(id) + ", "
				queryAuthors += fmt.Sprint(id) + ", "
			} else {
				query += fmt.Sprint(id) + ")"
				queryAuthors += fmt.Sprint(id) + ")"
			}
		}

		// add group by
		query += " GROUP BY r.name"
		queryAuthors += " GROUP BY r.name"

		// add order by
		query += " ORDER BY FIELD(r.id, "
		queryAuthors += " ORDER BY FIELD(r.id, "
		for i, id := range ids {
			if i != len(ids) - 1 {
				query += fmt.Sprint(id) + ", "
				queryAuthors += fmt.Sprint(id) + ", "
			} else {
				query += fmt.Sprint(id) + ")"
				queryAuthors += fmt.Sprint(id) + ")"
			}
		}	

		// make the request to get most info
		rows, err := db.DB.Query(query)	
		if err != nil {
			log.Panic(err)
			return
		}

		// make a request to get the authors
		rowsAuthors, err := db.DB.Query(queryAuthors)
		if err != nil {
			log.Panic(err)
			return
		}

		// close the rows once the function ends
		defer rows.Close()
		defer rowsAuthors.Close()

		tags := ""
		authors := ""

		// loop through the rows
		for rows.Next() {

			if !rowsAuthors.Next() {
				log.Panic("Mismatch in number of rows and authors")
				return
			}

			if err = rows.Scan(&resource.Type, &resource.Name, &resource.Date, &resource.Url, &resource.Price, &resource.Difficulty, &resource.Time, &tags); err != nil {
				log.Panic(err)
				http.Error(w, "", http.StatusInternalServerError)
			}

			if err = rowsAuthors.Scan(&authors); err != nil {
				log.Panic(err)
				http.Error(w, "", http.StatusInternalServerError)
			}

			// add the tags & authors
			resource.Tags = utils.ConvertStringToArrayOfTags(tags, ", ")
			resource.Authors = utils.ConvertStringToArrayOfAuthors(authors, ", ")

			// append the resource to the resources
			resources.Resources = append(resources.Resources, resource)
		}

		if rowsAuthors.Next(){
			log.Panic("Mismatch in number of rows and authors")
			return
		}

		// send the resources to the client
		json.NewEncoder(w).Encode(resources)
	}
}