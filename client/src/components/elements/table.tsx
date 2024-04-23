import { useState, useEffect } from "react";

import { CaretSortIcon, DotsHorizontalIcon } from "@radix-ui/react-icons";

import { Button } from "@/components/ui/button";

import CustomDropdownMenu from "@/components/elements/dropdown-menu";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Input } from "@/components/ui/input";

import { RenderIcon } from "@/components/icons/icons";

import { useTrainings } from "@/context/trainings-context";
import { transformDifficulty, column, option, Training } from "@/utils/types";
import { getBookmarks, getRead, getReadBookmarks } from "@/utils/utils";

const TrainingTable = () => {
  const {
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
  } = useTrainings();

  const getColumnsFromLocalStorage = (key: string): Record<column, boolean> => {
    let jsonString = window.localStorage.getItem(key);
    if (jsonString !== null) {
      return JSON.parse(jsonString);
    } else {
      return {
        "": true,
        Name: true,
        Tags: true,
        Authors: true,
        "Time to read": false,
        Difficulty: false,
        Date: false,
        Price: false,
        Actions: true,
      };
    }
  };

  const getResourcesFromLocalStorage = (key: string): Training[] => {
    let jsonString = window.localStorage.getItem(key);
    if (jsonString !== null) {
      return JSON.parse(jsonString);
    } else {
      return [];
    }
  };

  const getIconsFromResources = (
    resources: Training[]
  ): Record<string, boolean> => {
    let icons: Record<string, boolean> = {};

    for (let i = 0; i < resources.length; i++) {
      icons[resources[i].Url] = true;
    }

    return icons;
  };

  const getOptionsFromLocalStorage = (key: string): Record<option, boolean> => {
    let jsonString = window.localStorage.getItem(key);
    if (jsonString !== null) {
      return JSON.parse(jsonString);
    } else {
      return {
        bookmark: false,
        read: false,
        latest: false,
      };
    }
  };

  const [options, setOptions] = useState(getOptionsFromLocalStorage("options"));

  let localStorageColumns: Record<column, boolean> =
    getColumnsFromLocalStorage("columns");

  const [bookmarks, setBookmarks] = useState<Training[]>(
    getResourcesFromLocalStorage("bookmarks")
  );

  const [read, setRead] = useState<Training[]>(
    getResourcesFromLocalStorage("read")
  );

  let bookmarks_icons = getIconsFromResources(bookmarks);
  let read_icons = getIconsFromResources(read);

  const [columns, setColumns] = useState<Record<column, boolean>>({
    "": true,
    Name: localStorageColumns["Name"],
    Tags: localStorageColumns["Tags"],
    Authors: localStorageColumns["Authors"],
    Date: localStorageColumns["Date"],
    "Time to read": localStorageColumns["Time to read"],
    Difficulty: localStorageColumns["Difficulty"],
    Price: localStorageColumns["Price"],
    Actions: true,
  });

  window.localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
  window.localStorage.setItem("read", JSON.stringify(read));
  window.localStorage.setItem("columns", JSON.stringify(columns));
  window.localStorage.setItem("options", JSON.stringify(options));
  window.localStorage.setItem(
    "filters",
    JSON.stringify({
      filterValue: filterValue,
      filterColumn: filterColumn,
      sortColumn: sortColumn,
      sortAsc: sortAsc,
      pageSize: pageSize,
      page: page,
    })
  );

  // if the user wants to show the resources he already read
  // most disgusting code I ever wrote
  // to filter for bookmarks & read
  useEffect(() => {
    if (options["bookmark"] && options["read"]) {
      setOptions({
        bookmark: options["bookmark"],
        read: options["read"],
        latest: false,
      });

      let filteredResources = getReadBookmarks();
      setResources !== undefined
        ? setResources({
            resources: filteredResources,
            size: filteredResources.length,
          })
        : null;
    } else if (options["read"]) {
      setOptions({
        bookmark: options["bookmark"],
        read: options["read"],
        latest: false,
      });

      let read_resources = getRead();
      setResources !== undefined
        ? setResources({
            resources: read_resources,
            size: read_resources.length,
          })
        : null;
    } else if (options["bookmark"]) {
      let filteredResources = getBookmarks();
      setResources !== undefined
        ? setResources({
            resources: filteredResources,
            size: filteredResources.length,
          })
        : null;
    } else if (!options["latest"]) {
      if (setResources !== undefined && setReloadMe !== undefined) {
        setReloadMe(!reloadMe);
      }
    }
  }, [options["read"]]);

  // if the user wants to show the bookmarks
  useEffect(() => {
    if (options["bookmark"] && options["read"]) {
      setOptions({
        bookmark: options["bookmark"],
        read: options["read"],
        latest: false,
      });

      let filteredResources = getReadBookmarks();
      setResources !== undefined
        ? setResources({
            resources: filteredResources,
            size: filteredResources.length,
          })
        : null;
    } else if (options["bookmark"]) {
      setOptions({
        bookmark: options["bookmark"],
        read: options["read"],
        latest: false,
      });

      let bookmarked_resources = getBookmarks();
      setResources !== undefined
        ? setResources({
            resources: bookmarked_resources,
            size: bookmarked_resources.length,
          })
        : null;
    } else if (options["read"]) {
      let read_resources = getRead();
      setResources !== undefined
        ? setResources({
            resources: read_resources,
            size: read_resources.length,
          })
        : null;
    } else if (!options["latest"]) {
      if (setResources !== undefined && setReloadMe !== undefined) {
        setReloadMe(!reloadMe);
      }
    }
  }, [options["bookmark"]]);

  useEffect(() => {
    if (options["latest"]) {
      setOptions({ bookmark: false, read: false, latest: options["latest"] });
      if (
        setSortColumn !== undefined &&
        setSortAsc !== undefined &&
        setReloadMe !== undefined
      ) {
        setSortColumn("Date");
        setSortAsc(false);
      }
    } else if (!options["read"] && !options["bookmark"]) {
      if (setSortColumn !== undefined && setSortAsc !== undefined) {
        setSortColumn("Name");
        setSortAsc(true);
      }
    }
  }, [options["latest"]]);

  useEffect(() => {
    if (options["latest"] && (sortColumn != "Date" || sortAsc)) {
      setOptions({
        bookmark: options["bookmark"],
        read: options["read"],
        latest: false,
      });
    } else if (options["read"] || options["bookmark"]) {
      setOptions({
        bookmark: false,
        read: false,
        latest: false,
      });
    }
  }, [sortAsc, sortColumn]);

  return (
    <div className="w-full">
      <div className="flex items-center py-4">
        <Input
          placeholder={`Filter by ${filterColumn.toLowerCase()}...`}
          value={filterValue ?? ""}
          onChange={(event) => {
            if (setFilterValue !== undefined) {
              setFilterValue(event.target.value);
            }
          }}
          className="max-w-64 mr-4"
        />

        <Select
          onValueChange={(event) => {
            if (setFilterColumn !== undefined) {
              setFilterColumn(event as column);
            }
          }}
          defaultValue={filterColumn}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select a filter" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Filters</SelectLabel>
              {Object.keys(columns).map((column) => {
                return column != "" &&
                  column != "Actions" &&
                  column != "Difficulty" ? (
                  <SelectItem value={column} key={column}>
                    {column}
                  </SelectItem>
                ) : null;
              })}
            </SelectGroup>
          </SelectContent>
        </Select>

        <CustomDropdownMenu
          columns={options}
          setColumns={setOptions}
          buttonName="Options"
        />

        <CustomDropdownMenu
          columns={columns}
          setColumns={setColumns}
          buttonName="Columns"
        />
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow key="table-row">
              {Object.entries(columns).map(([column, value]) => {
                if (value) {
                  return (
                    <TableHead key={column}>
                      {column != "" && column != "Actions" ? (
                        <Button
                          variant="ghost"
                          key={column}
                          onClick={() => {
                            if (column == sortColumn) {
                              if (setSortAsc !== undefined) {
                                setSortAsc(!sortAsc);
                              }
                            } else {
                              if (setSortColumn !== undefined) {
                                setSortColumn(column as column);
                              }

                              if (setSortAsc !== undefined) {
                                setSortAsc(true);
                              }
                            }
                          }}
                        >
                          {column}
                          <CaretSortIcon className="ml-2 h-4 w-4" />
                        </Button>
                      ) : (
                        `${column}`
                      )}
                    </TableHead>
                  );
                } else {
                  return null;
                }
              })}
            </TableRow>
          </TableHeader>

          <TableBody>
            {resources.resources.length != 0 ? (
              resources.resources.map((training, i) => {
                return (
                  <TableRow
                    key={i}
                    onClick={() => window.open(training.Url, "_blank")}
                  >
                    <TableCell>
                      <RenderIcon
                        tags={training.Tags}
                        bookmarked={bookmarks_icons[training.Url]}
                        read={read_icons[training.Url]}
                        type={training.Type}
                      />
                    </TableCell>

                    {columns["Name"] ? (
                      <TableCell>{training.Name}</TableCell>
                    ) : null}

                    {columns["Tags"] ? (
                      <TableCell>
                        {training.Tags.map((tag, i) => {
                          return i + 1 != training.Tags.length
                            ? `${tag} - `
                            : `${tag}`;
                        })}
                      </TableCell>
                    ) : null}

                    {columns["Authors"] ? (
                      <TableCell>
                        {training.Authors.map((author, i) => {
                          return i + 1 != training.Authors.length
                            ? `${author} - `
                            : `${author}`;
                        })}
                      </TableCell>
                    ) : null}

                    {columns["Date"] ? (
                      <TableCell>{training.Date}</TableCell>
                    ) : null}

                    {columns["Time to read"] ? (
                      <TableCell>
                        {training.Time != 0 ? training.Time : ""}
                      </TableCell>
                    ) : null}

                    {columns["Difficulty"] ? (
                      <TableCell>
                        {transformDifficulty[training.Difficulty]}
                      </TableCell>
                    ) : null}

                    {columns["Price"] ? (
                      <TableCell>{training.Price}</TableCell>
                    ) : null}

                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <DotsHorizontalIcon className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuItem
                            onClick={() =>
                              navigator.clipboard.writeText(training.Url)
                            }
                          >
                            Copy resource url
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => window.open(training.Url, "_blank")}
                          >
                            Open resource in new tab
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          {read_icons[training.Url] === undefined ? (
                            <DropdownMenuItem
                              onClick={() => {
                                setRead((prevState: Training[]) => [
                                  ...prevState,
                                  training,
                                ]);
                              }}
                            >
                              Mark as read
                            </DropdownMenuItem>
                          ) : (
                            <DropdownMenuItem
                              onClick={() => {
                                setRead((prevState: Training[]) =>
                                  prevState.filter(
                                    (item) => item.Url !== training.Url
                                  )
                                );
                              }}
                            >
                              Mark as not read
                            </DropdownMenuItem>
                          )}
                          {bookmarks_icons[training.Url] === undefined ? (
                            <DropdownMenuItem
                              onClick={() => {
                                setBookmarks((prevState: Training[]) => [
                                  ...prevState,
                                  training,
                                ]);
                              }}
                            >
                              Bookmark
                            </DropdownMenuItem>
                          ) : (
                            <DropdownMenuItem
                              onClick={() => {
                                setBookmarks((prevState: Training[]) =>
                                  prevState.filter(
                                    (item) => item.Url !== training.Url
                                  )
                                );
                              }}
                            >
                              Remove the bookmark
                            </DropdownMenuItem>
                          )}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                );
              })
            ) : (
              <TableRow>
                <TableCell
                  colSpan={Object.keys(columns).length}
                  className="h-24 text-center"
                >
                  No results found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center space-x-2 py-4 justify-end">
        <Input
          placeholder={`Items per page (${pageSize})`}
          onChange={(event) => {
            let input = Number(event.target.value);

            if (event.target.value === "") {
              if (setPageSize !== undefined) {
                setPageSize(20);
              }
            } else if (!isNaN(input)) {
              if (setPageSize !== undefined) {
                setPageSize(input);
              }
            }
          }}
          className="max-w-48 text-center"
        />
        <div className="space-x-2">
          <Button
            className="w-20"
            variant="outline"
            onClick={() => {
              if (setPage !== undefined) {
                setPage(page - 1);
              }
            }}
            disabled={page === 1}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            className="w-20"
            onClick={() => {
              if (setPage !== undefined) {
                setPage(page + 1);
              }
            }}
            disabled={
              page >=
              (resources.size % pageSize == 0
                ? Math.floor(resources.size / pageSize)
                : Math.floor(resources.size / pageSize) + 1)
            }
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TrainingTable;
