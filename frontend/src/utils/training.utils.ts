import {
  column,
  Training,
  columnString,
  columnNumber,
  columnArray,
} from "@/utils/types";

export function sortTrainings(
  trainings: Array<Training>,
  column: column,
  sortAsc: boolean
): Array<Training> {
  let trainingsSorted: Array<Training> = [];

  // not true columns, do not sort using those
  if (column == "" || column == "Actions" || column == "Read") {
    return trainings;
  }

  if (["Name", "Type", "Read", "Difficulty"].includes(column)) {
    if (sortAsc) {
      trainings
        .sort((a, b) =>
          a[column as columnString].localeCompare(b[column as columnString])
        )
        .map((training) => {
          trainingsSorted.push(training);
        });
    } else {
      // reverse order
      trainings
        .sort((a, b) =>
          b[column as columnString].localeCompare(a[column as columnString])
        )
        .map((training) => {
          trainingsSorted.push(training);
        });
    }
  } else if (["Time to read"].includes(column)) {
    if (sortAsc) {
      trainings
        .sort((a, b) => a.Time - b.Time)
        .map((training) => {
          trainingsSorted.push(training);
        });
    } else {
      trainings
        .sort((a, b) => b.Time - a.Time)
        .map((training) => {
          trainingsSorted.push(training);
        });
    }
  } else if (["Price"].includes(column)) {
    if (sortAsc) {
      trainings
        .sort((a, b) => a[column as columnNumber] - b[column as columnNumber])
        .map((training) => {
          trainingsSorted.push(training);
        });
    } else {
      trainings
        .sort((a, b) => a[column as columnNumber] - b[column as columnNumber])
        .map((training) => {
          trainingsSorted.push(training);
        });
    }
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
        let value: Training | null = GetTrainingByName(trainings, training[1]);

        if (value != null) {
          trainingsSorted.push(value as Training);
        }
      });

    if (!sortAsc) {
      trainingsSorted.reverse();
    }
  } else {
    trainingsSorted = trainings;
  }

  return trainingsSorted;
}

const GetTrainingByName = (
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

export const FilterTrainings = (
  trainings: Array<Training>,
  column: string,
  value: string
): Array<Training> => {
  if (value === "") {
    return trainings;
  }

  let trainingsFiltered: Array<Training> = [];

  if (["Name", "Type", "Read", "Difficulty"].includes(column)) {
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
    trainings.map((training) => {
      if (training.Time <= parseInt(value, 10)) {
        trainingsFiltered.push(training);
      }
    });
  } else if (["Price"].includes(column)) {
    trainings.map((training) => {
      if (training.Price <= parseInt(value, 10)) {
        trainingsFiltered.push(training);
      }
    });
  } else if (["Authors", "Tags"].includes(column)) {
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
