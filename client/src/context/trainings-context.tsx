import { Resources, filterInfo, column } from "@/utils/types";
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

interface TrainingsContextType {
  resources: Resources;
  setResources: React.Dispatch<React.SetStateAction<Resources>> | undefined;
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
  reloadMe: boolean;
  setReloadMe: React.Dispatch<React.SetStateAction<boolean>> | undefined;
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
  resources: { size: 0, resources: [] },
  setResources: undefined,
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
  reloadMe: false,
  setReloadMe: undefined,
} satisfies TrainingsContextType;

export const TrainingsContext = createContext<TrainingsContextType>(
  defaultTrainingContext
);

export const useTrainings = () => useContext(TrainingsContext);

interface Props {
  children?: ReactNode;
}

const TrainingsProvider = ({ children }: Props) => {
  const [resources, setResources] = useState<Resources>({
    size: 0,
    resources: [],
  });

  let url: string = "http://localhost:8000/api/resources";

  const getFiltersFromLocalStorage = (
    key: string
  ): Record<filterInfo, string | number | boolean> => {
    let jsonString = window.localStorage.getItem(key);

    if (jsonString !== null) {
      return JSON.parse(jsonString);
    } else {
      return {
        filterColumn: "Name",
        filterValue: "",
        sortColumn: "Name",
        sortAsc: true,
        page: 1,
        pageSize: 9,
      };
    }
  };

  let localStorageFilters: Record<filterInfo, string | number | boolean> =
    getFiltersFromLocalStorage("filters");

  const [page, setPage] = useState<number>(
    localStorageFilters["page"] as number
  );
  const [pageSize, setPageSize] = useState<number>(
    localStorageFilters["pageSize"] as number
  );

  const [filterValue, setFilterValue] = useState<string>(
    localStorageFilters["filterValue"] as string
  );

  const [filterColumn, setFilterColumn] = useState<column>(
    localStorageFilters["filterColumn"] as column
  );

  const [sortColumn, setSortColumn] = useState<column>(
    localStorageFilters["sortColumn"] as column
  );
  const [sortAsc, setSortAsc] = useState(
    localStorageFilters["sortAsc"] as boolean
  );

  const [reloadMe, setReloadMe] = useState(false);

  if (filterValue != "" && filterColumn != "") {
    url += "/" + transformColumn[filterColumn] + "/" + filterValue;
  }

  if (sortColumn != "") {
    // add the sorting
    url += sortAsc
      ? "/sort/" + transformColumn[sortColumn] + "/asc"
      : "/sort/" + transformColumn[sortColumn] + "/desc";

    // add the limit and page
    url += "/limit/" + String(pageSize) + "/page/" + String(page);
  }

  console.log(url);

  useEffect(() => {
    fetch(url)
      .then((res) => {
        // reset the page number
        setPage(1);

        if (!res.ok) {
          // there was an error set resources to empty
          setResources({ resources: [], size: 0 });
          throw new Error(`HTTP error! status: ${res.status}`);
        }

        return res.json();
      })
      .then(setResources)
      .catch((error) => {
        if (error.message.includes("Failed to fetch")) {
          console.error(
            "There was a problem with the fetch operation, possibly due to a CORS issue: ",
            error
          );
        } else {
          console.error(
            "There was a problem with the fetch operation: ",
            error
          );
        }
      });
  }, [url, reloadMe]);

  return (
    <TrainingsContext.Provider
      value={{
        resources,
        setResources,
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
        reloadMe,
        setReloadMe,
      }}
    >
      {children}
    </TrainingsContext.Provider>
  );
};

export default TrainingsProvider;
