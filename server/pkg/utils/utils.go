package utils

func IsStringInArray(array []string, element string) bool {
	for _, elm := range array {
		if element == elm {
			return true
		}
	}

	return false
}

func GetElementFromArrayOfStrings(array []string, element string) *string {
	for i, elm := range array {
		if element == elm {
			return &array[i]
		}
	}

	return nil
}

func GetElementIndexFromArray(array []any, element any) int {
	for i, elm := range array {
		if element == elm {
			return i
		}
	}

	return -1
}