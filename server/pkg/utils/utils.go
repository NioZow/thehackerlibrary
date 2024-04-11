package utils

import (
	"sort"
	"strings"
)

var (
	CATEGORIES = []string{"Malware Development", "Active Directory", "Web", "Network", "Forensics", "Cryptography", "Miscellaneous", "Hardware"}
)

func IsStringInArray(array []string, element string) bool {
	for _, elm := range array {
		if element == elm {
			return true
		}
	}

	return false
}

func GetElementIndexFromArray(array []string, element string) int {
	for i, elm := range array {
		if element == elm {
			return i
		}
	}

	return -1
}

func MoveElementFromArray(array []string, elmIndex int, insertIndex int) []string{	

	narray := make([]string, 0)

	for i := range array{
		if i == insertIndex {
			narray = append(narray, array[elmIndex])
		}

		if i != elmIndex {
			narray = append(narray, array[i])
		}
	}

	return narray
}

func ConvertStringToArrayOfTags(tags string, delimiter string) []string {

	// split the string
	array_tags := strings.Split(tags, delimiter)

	// sort the string
	sort.Strings(array_tags)

	// move the main tag (category) to the beginning
	for _, tag := range CATEGORIES {
		if IsStringInArray(array_tags, tag){
			array_tags = MoveElementFromArray(array_tags, GetElementIndexFromArray(array_tags, tag), 0)
			break
		}
	}

	return array_tags
}

func ConvertStringToArrayOfAuthors(authors string, delimiter string) []string {

	// split the string
	array_authors := strings.Split(authors, delimiter)

	// sort the string
	sort.Strings(array_authors)

	return array_authors
}