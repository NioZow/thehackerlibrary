import { Training } from "@/utils/types";

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
