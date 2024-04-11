package db

import (
	"errors"
	"fmt"
	"strconv"
	"strings"
)

var (
	Columns = map[string]string{
		"type" : "r.type",
		"name" : "r.name",
		"date" : "r.date",
		"price" : "r.price",
		"difficulty" : "r.difficulty",
		"time" : "r.time",
		"tag" : "t.name",
		"author" : "a.name",
	}
)

func GetIdsOfResources(filter string, filterColumn string, sortColumn string, sortAsc bool, limit int, page int) ([]int, int, error){

	var (
		query string = "SELECT DISTINCT r.id FROM resources r"
		args []interface{} = make([]interface{}, 0)
		ids []int = make([]int, 0)
		sizeResult int = 0
		filterQuery string = ""
		sizeArgs []interface{} = make([]interface{}, 0)
	)

	// add filter
	// + inner join maybe
	// WHERE ?
	if filter != "" && filterColumn != "" {
		switch filterColumn {
		case "name":

			// save the filter to calculate the number of entries
			filterQuery = " WHERE LOWER(r.name) LIKE ?"

			// append to the query
			query += filterQuery
			args = append(args, strings.ToLower("%"+filter+"%"))
			sizeArgs = args
			break
		case "type":
			// save the filter to calculate the number of entries
			filterQuery = " WHERE LOWER(r.type) LIKE ?"

			// append to the query
			query += filterQuery
			args = append(args, strings.ToLower("%"+filter+"%"))
			sizeArgs = args
			break
		case "date":		
			// save the filter to calculate the number of entries
			filterQuery = " WHERE LOWER(r.date) LIKE ?"

			// append to the query
			query += filterQuery
			args = append(args, strings.ToLower("%"+filter+"%"))
			sizeArgs = args
			break
		case "price":
			price, err := strconv.Atoi(filter)
			if err != nil {
				return ids, sizeResult, err
			}

			// save the filter to calculate the number of entries
			filterQuery = " WHERE r.price <= ?"

			// append to the query
			query += filterQuery
			args = append(args, price)
			sizeArgs = args
			break
		case "difficulty":
			difficulty, err := strconv.Atoi(filter)
			if err != nil {
				return ids, sizeResult, err
			}
		
			// save the filter to calculate the number of entries
			filterQuery = " WHERE r.difficulty = ?"

			// append to the query
			query += filterQuery
			args = append(args, difficulty)
			sizeArgs = args
			break
		case "time":
			time, err := strconv.Atoi(filter)
			if err != nil {
				return ids, sizeResult, err
			}

			// save the filter to calculate the number of entries
			filterQuery = " WHERE r.time = ?"

			// append to the query
			query += filterQuery
			args = append(args, time)
			sizeArgs = args
			break
		case "tag":
			// save the filter to calculate the number of entries
			filterQuery = " LEFT JOIN (tags_link tl CROSS JOIN tags t) ON (tl.resource_id = r.id AND t.id = tl.tag_id) WHERE LOWER(t.name) LIKE ?"

			// append the filter to the query
			query += filterQuery
			args = append(args, strings.ToLower("%"+filter+"%"))
			sizeArgs = args
			break
		case "author":
			// save the filter to calculate the number of entries
			filterQuery = " LEFT JOIN (authors_link al CROSS JOIN authors a) ON (al.resource_id = r.id AND a.id = al.author_id) WHERE LOWER(a.name) LIKE ?"
			sizeArgs = args

			// append the filter to the query
			query += filterQuery
			args = append(args, strings.ToLower("%"+filter+"%"))
			sizeArgs = args
			break
		default:
			return ids, 0, errors.New("unknown filter column")
		}
	}

	// sort
	// ORDER BY ?
	if value, exists := Columns[sortColumn]; exists {
		if sortAsc {
			query += fmt.Sprintf(" ORDER BY %s ASC", value)
		} else {
			query += fmt.Sprintf(" ORDER BY %s DESC", value)
		}
	}

	// add limit
	// LIMIT ?
	if limit != 0 {
		// get the number of results of that query without the limit
		query += " LIMIT ?"
		args = append(args, limit)
	} 

	// add page
	// OFFSET ?
	if page > 1 {
		query += " OFFSET ?"
		args = append(args, (page - 1) * limit)
	}

	// make the sql query
	rows, err := DB.Query(query, args...)	
	if err != nil {
		return ids, sizeResult, err
	}

	// close the rows once the function ends
	defer rows.Close()

	// loop through the rows
	for rows.Next() {
		id := 0

		// get the value of the rows
		if err = rows.Scan(&id); err != nil {
			return ids, sizeResult, err
		}

		// append the id to the ids
		ids = append(ids, id)
	}

	// calculate the number of results of that filter	
	if len(ids) == limit {
		if err := DB.QueryRow("SELECT COUNT(DISTINCT r.id) FROM resources r" + filterQuery, sizeArgs...).Scan(&sizeResult); err != nil {
			return ids, sizeResult, err
		}
	} else {
		sizeResult = len(ids)
	}

	return ids, sizeResult, nil
}