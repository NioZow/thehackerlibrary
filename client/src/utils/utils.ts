import { Training, option, Resources, column } from "@/utils/types";
import { BookUser } from "lucide-react";
import { useEffect, Dispatch, SetStateAction } from "react";

export const filterResources = (
  resources: Resources,
  resourcesBookmarked: string[],
  resourcesRead: string[],
  sortColumn: column,
  setSortColumn: React.Dispatch<React.SetStateAction<column>> | undefined,
  sortAsc: boolean,
  setSortAsc: React.Dispatch<React.SetStateAction<boolean>> | undefined,
  options: Record<option, boolean>
) => {
  if (
    options["latest"] &&
    setSortColumn !== undefined &&
    setSortAsc !== undefined
  ) {
    if (sortColumn != "Date") {
      setSortColumn("Date");
    }

    if (sortAsc) {
      setSortAsc(false);
    }
  }
};

const getArrayOfResourcesFromLocalStorage = (key: string): Training[] => {
  let jsonString = window.localStorage.getItem(key);
  if (jsonString !== null) {
    return JSON.parse(jsonString);
  } else {
    return [];
  }
};

export const getBookmarks = (): Training[] => {
  // read the bookmarked resources by reading the localStorage
  return getArrayOfResourcesFromLocalStorage("bookmarks");
};

export const getRead = (): Training[] => {
  // read the read resources by reading the localStorage
  return getArrayOfResourcesFromLocalStorage("read");
};

export const getReadBookmarks = (): Training[] => {
  // read the read & bookmarked resources by read the localStorage
  let resources: Training[] = [];
  let read = getArrayOfResourcesFromLocalStorage("read");
  let bookmarks = getArrayOfResourcesFromLocalStorage("bookmarks");

  bookmarks.map((bookmarked_resource) => {
    for (let i = 0; i < read.length; i++) {
      if (read[i].Name == bookmarked_resource.Name) {
        resources.push(bookmarked_resource);
        return;
      }
    }
  });

  return resources;
};
