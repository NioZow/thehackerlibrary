import {
  column,
  Training,
  columnString,
  columnNumber,
  columnArray,
} from "@/utils/types";

/*
 * @brief
 *  get a training by its name
 *
 * @param trainings
 *  trainings
 *
 * @param name
 *  name of the training to get
 *
 * @return
 *  training
 */
const getTrainingByName = (
  trainings: Array<Training>,
  name: string
): Training | null => {
  for (let i = 0; i < trainings.length; i++) {
    if (trainings[i].Name === name) {
      return trainings[i];
    }
  }

  return null;
};

/*!
 * @brief
 *  sort trainings
 *
 * @param trainings
 *  trainings to sort
 *
 * @param column
 *  column to sort by
 *
 * @param sortAsc
 *  sort ascending or descending
 *
 * @return
 *  array of trainings
 */
const sortTrainings = (
  trainings: Array<Training>,
  column: column,
  sortAsc: boolean
): Array<Training> => {
  let trainingsSorted: Array<Training> = [];

  // not true columns, do not sort using those
  if (column == "" || column == "Actions") {
    return trainings;
  }

  if (column === "Read") {
    trainings.map((training) => {
      if (window.localStorage.getItem(training.Url) !== null) {
        trainingsSorted.push(training);
      }
    });

    trainings.map((training) => {
      if (window.localStorage.getItem(training.Url) === null) {
        trainingsSorted.push(training);
      }
    });
  } else if (["Name", "Type", "Read"].includes(column)) {
    trainings
      .sort((a, b) =>
        a[column as columnString].localeCompare(b[column as columnString])
      )
      .map((training) => {
        trainingsSorted.push(training);
      });
  } else if (["Time to read"].includes(column)) {
    trainings
      .sort((a, b) => a.Time - b.Time)
      .map((training) => {
        trainingsSorted.push(training);
      });
  } else if (["Price"].includes(column)) {
    trainings
      .sort((a, b) => a[column as columnNumber] - b[column as columnNumber])
      .map((training) => {
        trainingsSorted.push(training);
      });
  } else if (["Authors", "Tags"].includes(column)) {
    // convert to an array of strings
    let array: Array<Array<string>> = [];
    trainings.map((training) => {
      array.push([training[column as columnArray].toString(), training.Name]);
    });

    // sort this one
    array
      .sort((a, b) => a[0].localeCompare(b[0]))
      .map((training) => {
        let value: Training | null = getTrainingByName(trainings, training[1]);

        if (value != null) {
          trainingsSorted.push(value as Training);
        }
      });
  } else {
    trainingsSorted = trainings;
  }

  // reverse it if its descending
  if (!sortAsc) {
    trainingsSorted.reverse();
  }

  return trainingsSorted;
};

/*!
 * @brief
 *  filter trainings by a keyword
 *
 * @param trainings
 *  trainings to filter
 *
 * @param column
 *  column to filter
 *
 * @param value
 *  value to use as a filter
 *
 * @return
 *  array of trainings
 */
const filterTrainings = (
  trainings: Array<Training>,
  column: column,
  value: string
): Array<Training> => {
  if (value === "") {
    return trainings;
  }

  let trainingsFiltered: Array<Training> = [];

  if (["Name", "Type", "Read", "Difficulty"].includes(column)) {
    // filter
    trainings.map((training) => {
      if (
        training[column as columnString]
          .toLowerCase()
          .includes(value.toLowerCase())
      ) {
        trainingsFiltered.push(training);
      }
    });
  } else if (["Time to read"].includes(column)) {
    // filter
    trainings.map((training) => {
      if (training.Time <= parseInt(value, 10)) {
        trainingsFiltered.push(training);
      }
    });
  } else if (["Price"].includes(column)) {
    // filter
    trainings.map((training) => {
      if (training.Price <= parseInt(value, 10)) {
        trainingsFiltered.push(training);
      }
    });
  } else if (["Authors", "Tags"].includes(column)) {
    // filter
    trainings.map((training) => {
      let elements: string = "";

      for (let i = 0; i < training[column as columnArray].length; i++) {
        elements +=
          i + 1 != training[column as columnArray].length
            ? `${training[column as columnArray][i]} - `
            : `${training[column as columnArray][i]}`;
      }

      if (elements.toLowerCase().includes(value.toLocaleLowerCase())) {
        trainingsFiltered.push(training);
      }

      return null;
    });
  } else {
    trainingsFiltered = trainings;
  }

  return trainingsFiltered;
};

/*!
 * @brief
 *  get only a limited of trainings (use of pages)
 *
 * @param trainings
 *  trainings to limit
 *
 * @param page
 *  page to get the training
 *
 * @param pageSize
 *  size of the pages
 *
 * @return
 *  array of trainings of maximum size: pageSize
 */
const limitTrainings = (
  trainings: Training[],
  page: number,
  pageSize: number
): Training[] => {
  let trainingsLimited: Training[] = [];
  let numberOfTrainingsOnThisPage =
    page * pageSize + pageSize > trainings.length
      ? trainings.length
      : page * pageSize + pageSize;

  for (let i = page * pageSize; i < numberOfTrainingsOnThisPage; i++) {
    trainingsLimited.push(trainings[i]);
  }

  return trainingsLimited;
};

/*!
 * @brief
 *  sort, filter, and limit the number of trainings shown on the page
 *
 * @param trainings
 *  trainings to filter, sort and limit
 *
 * @param
 *
 */
export const getTrainings = (
  trainings: Training[],
  page: number,
  pageSize: number,
  columnFilter: column,
  filter: string,
  columnSort: column,
  sortAsc: boolean
): Training[] => {
  return limitTrainings(
    sortTrainings(
      filterTrainings(trainings, columnFilter, filter),
      columnSort,
      sortAsc
    ),
    page,
    pageSize
  );
};
