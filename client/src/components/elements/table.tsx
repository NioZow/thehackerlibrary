import { useState } from "react";

import {
  CaretSortIcon,
  ChevronDownIcon,
  DotsHorizontalIcon,
} from "@radix-ui/react-icons";

import { Button } from "@/components/ui/button";

import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
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
import { Training, transformDifficulty } from "@/utils/types";

// TODO:
// re-write request to pages
// re-write localStorage

type column =
  | ""
  | "Type"
  | "Name"
  | "Tags"
  | "Price"
  | "Authors"
  | "Time to read"
  | "Date"
  | "Difficulty"
  | "Read"
  | "Actions";

const TrainingTable = () => {
  const {
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
  } = useTrainings();

  const getStateFromLocalStorage = (key: string) => {
    return window.localStorage.getItem(key) === null;
  };

  const [columns, setColumns] = useState<Record<column, boolean>>({
    "": getStateFromLocalStorage(""),
    Type: getStateFromLocalStorage("Type"),
    Name: getStateFromLocalStorage("Name"),
    Tags: getStateFromLocalStorage("Tags"),
    Authors: getStateFromLocalStorage("Authors"),
    Date: getStateFromLocalStorage("Date"),
    "Time to read": getStateFromLocalStorage("Time to read"),
    Difficulty: getStateFromLocalStorage("Difficulty"),
    Price: getStateFromLocalStorage("Price"),
    Read: getStateFromLocalStorage("Read"),
    Actions: getStateFromLocalStorage("Actions"),
  });

  const [openColumn, setColumnOpen] = useState(false);
  const [dropboxHumanClosed, setDropboxHumanClosed] = useState(false);

  let trainingsFiltered = trainings;

  const isRead = (trainings: Training[]): Record<string, boolean> => {
    let trainingRead: Record<string, boolean> = {};

    for (let i = 0; i < trainings.length; i++) {
      if (window.localStorage.getItem(trainings[i].Url) !== null) {
        trainingRead[trainings[i].Url] = true;
      }
    }

    return trainingRead;
  };

  const [read, setRead] = useState<Record<string, boolean>>(
    isRead(trainingsFiltered)
  );

  return (
    <div className="w-full">
      <div className="flex items-center py-4">
        <Input
          placeholder={`Filter by ${filterColumn.toLowerCase()}...`}
          value={filterValue ?? ""}
          onChange={(event) => {
            if (setFilterValue !== undefined) {
              setFilterValue(event.target.value);
              window.localStorage.setItem("filter", event.target.value);
            }
          }}
          className="max-w-sm"
        />

        <Select
          onValueChange={(event) => {
            if (setFilterColumn !== undefined) {
              setFilterColumn(event as column);
              window.localStorage.setItem("column_filter", event);
            }
          }}
          defaultValue={
            window.localStorage.getItem("column_filter") !== null
              ? (window.localStorage.getItem("column_filter") as column)
              : ""
          }
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select a filter" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Filters</SelectLabel>
              {Object.keys(columns).map((column) => {
                return column != "" && column != "Actions" ? (
                  <SelectItem value={column} key={column}>
                    {column}
                  </SelectItem>
                ) : null;
              })}
            </SelectGroup>
          </SelectContent>
        </Select>

        <DropdownMenu
          onOpenChange={() => {
            if (!dropboxHumanClosed) {
              setColumnOpen(true);
            } else {
              setDropboxHumanClosed(false);
            }
          }}
          open={openColumn}
        >
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              Columns <ChevronDownIcon className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            onInteractOutside={() => {
              setColumnOpen(false);
              setDropboxHumanClosed(true);
            }}
            onEscapeKeyDown={() => {
              setColumnOpen(false);
              setDropboxHumanClosed(true);
            }}
          >
            {Object.entries(columns).map(([column, value]) => {
              return column != "" && column != "Actions" ? (
                <DropdownMenuCheckboxItem
                  className="capitalize"
                  checked={value}
                  key={column}
                  onCheckedChange={() => {
                    setColumns((prevState) => ({
                      ...prevState, // Copy the previous state
                      [column as column]: !prevState[column as column], // Toggle the value of the specified key
                    }));

                    value
                      ? window.localStorage.setItem(column, "a")
                      : window.localStorage.removeItem(column);
                  }}
                >
                  {column}
                </DropdownMenuCheckboxItem>
              ) : null;
            })}
          </DropdownMenuContent>
        </DropdownMenu>
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
            {trainingsFiltered.length != 0 ? (
              trainingsFiltered.map((training, i) => {
                return (
                  <TableRow key={i}>
                    <TableCell>
                      <RenderIcon icon={training.Tags} />
                    </TableCell>

                    {columns["Type"] ? (
                      <TableCell>{training.Type}</TableCell>
                    ) : null}

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
                      <TableCell>{training.Time}</TableCell>
                    ) : null}

                    {columns["Difficulty"] ? (
                      <TableCell>
                        {transformDifficulty[training.Difficulty]}
                      </TableCell>
                    ) : null}

                    {columns["Price"] ? (
                      <TableCell>{training.Price}</TableCell>
                    ) : null}

                    {columns["Read"] ? (
                      <TableCell>
                        {window.localStorage.getItem(training.Url) === null
                          ? "No"
                          : "Yes"}
                      </TableCell>
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
                          {read[training.Url] !== true ? (
                            <DropdownMenuItem
                              onClick={() => {
                                setRead((prevState) => ({
                                  ...prevState, // Copy the previous state
                                  [training.Url]: true, // Toggle the value of the specified key
                                }));

                                window.localStorage.setItem(training.Url, "a");
                              }}
                            >
                              Mark as read
                            </DropdownMenuItem>
                          ) : (
                            <DropdownMenuItem
                              onClick={() => {
                                setRead((prevState) => {
                                  const nextState = { ...prevState }; // Copy the previous state
                                  delete nextState[training.Url]; // Remove the specified key
                                  return nextState;
                                });

                                window.localStorage.removeItem(training.Url);
                              }}
                            >
                              Mark as not read
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
      <div className="flex items-center justify-end space-x-2 py-4">
        Showing{" "}
        {page * pageSize + pageSize > trainings.length
          ? trainingsFiltered.length % pageSize
          : pageSize}{" "}
        resources out of {trainings.length}
        <Input
          placeholder={`Number of trainings per page (${pageSize})`}
          onChange={(event) => {
            let input = Number(event.target.value);

            if (event.target.value === "") {
              if (setPageSize !== undefined) {
                setPageSize(20);
                window.localStorage.setItem("pageSize", "20");
              }
            } else if (!isNaN(input)) {
              if (setPageSize !== undefined) {
                setPageSize(input);
                window.localStorage.setItem("pageSize", event.target.value);
              }
            }
          }}
          className="max-w-sm"
        />
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              if (setPage !== undefined) {
                setPage(page - 1);
              }
            }}
            disabled={page === 0}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              if (setPage !== undefined) {
                setPage(page + 1);
              }
            }}
            disabled={page >= Math.floor(trainings.length / pageSize)}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TrainingTable;
