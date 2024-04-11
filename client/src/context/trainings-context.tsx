import { Training, column } from "@/utils/types";
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

interface TrainingsContextType {
  trainings: Training[];
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>> | undefined;
  pageSize: number;
  setPageSize: React.Dispatch<React.SetStateAction<number>> | undefined;
  filterValue: string;
  setFilterValue: React.Dispatch<React.SetStateAction<string>> | undefined;
  filterColumn: column;
  setFilterColumn: React.Dispatch<React.SetStateAction<column>> | undefined;
  sortColumn: column;
  setSortColumn: React.Dispatch<React.SetStateAction<column>> | undefined;
  sortAsc: boolean;
  setSortAsc: React.Dispatch<React.SetStateAction<boolean>> | undefined;
}

let transformColumn: Record<string, string> = {
  Type: "type",
  Name: "name",
  Tags: "tag",
  Authors: "author",
  "Time to read": "time",
  Date: "date",
  Difficulty: "difficulty",
  Price: "price",
};

const defaultTrainingContext = {
  trainings: [],
  page: 1,
  setPage: undefined,
  pageSize: 20,
  setPageSize: undefined,
  filterValue: "",
  setFilterValue: undefined,
  filterColumn: "",
  setFilterColumn: undefined,
  sortColumn: "",
  setSortColumn: undefined,
  sortAsc: true,
  setSortAsc: undefined,
} satisfies TrainingsContextType;

export const TrainingsContext = createContext<TrainingsContextType>(
  defaultTrainingContext
);

export const useTrainings = () => useContext(TrainingsContext);

interface Props {
  children?: ReactNode;
}

const TrainingsProvider = ({ children }: Props) => {
  const [trainings, setTrainings] = useState<Training[]>([]);

  let url: string = "http://localhost:8000/api/resources";

  const [page, setPage] = useState<number>(0);
  const [pageSize, setPageSize] = useState<number>(
    Number(window.localStorage.getItem("pageSize")) !== 0
      ? Number(window.localStorage.getItem("pageSize"))
      : 20
  );

  const [filterValue, setFilterValue] = useState<string>(
    window.localStorage.getItem("filter") !== null
      ? (window.localStorage.getItem("filter") as string)
      : ""
  );

  const [filterColumn, setFilterColumn] = useState<column>(
    window.localStorage.getItem("column_filter") !== null
      ? (window.localStorage.getItem("column_filter") as column)
      : "Name"
  );

  const [sortColumn, setSortColumn] = useState<column>("Name");
  const [sortAsc, setSortAsc] = useState(true);

  if (filterValue != "" && filterColumn != "") {
    url += "/" + transformColumn[filterColumn] + "/" + filterValue;
  }

  if (sortColumn != "") {
    // add the sorting
    url += sortAsc
      ? "/sort/" + transformColumn[sortColumn] + "/asc"
      : "/sort/" + transformColumn[sortColumn] + "/desc";

    // add the limit and page
    url += "/limit/" + String(pageSize) + "/page/" + String(page + 1);
  }

  /*
  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then(setTrainings);
  }, [url]);
  */
  useEffect(() => {
    fetch(url)
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }

        return res.json();
      })
      .then(setTrainings)
      .catch((error) => {
        console.error("There was a problem with the fetch operation: ", error);
      });
  }, [url]);

  console.log(url, trainings, trainings.length);

  return (
    <TrainingsContext.Provider
      value={{
        trainings,
        page,
        setPage,
        pageSize,
        setPageSize,
        filterValue,
        setFilterValue,
        filterColumn,
        setFilterColumn,
        sortColumn,
        setSortColumn,
        sortAsc,
        setSortAsc,
      }}
    >
      {children}
    </TrainingsContext.Provider>
  );
};

export default TrainingsProvider;
