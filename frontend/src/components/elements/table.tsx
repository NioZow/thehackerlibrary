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

import { Training } from "@/utils/types";
import { RenderIcon } from "@/components/icons/icons";

import { sortTrainings, FilterTrainings } from "@/utils/training.utils";

import { capitalizeFirstLetter } from "@/utils/utils";

import { useTrainings } from "@/context/trainings-context";

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
  const { trainings } = useTrainings();

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

  const [filterValue, setFilterValue] = useState("");
  const [filterColumn, setFilterColumn] = useState<column>("Name");
  const [sortColumn, setSortColumn] = useState<column>("Name");
  const [sortAsc, setSortAsc] = useState(true);
  const [openColumn, setColumnOpen] = useState(false);
  const [dropboxHumanClosed, setDropboxHumanClosed] = useState(false);

  const trainingsSorted: Array<Training> = FilterTrainings(
    trainings,
    filterColumn,
    filterValue
  );

  return (
    <div className="w-full">
      <div className="flex items-center py-4">
        <Input
          placeholder={`Filter by ${filterColumn.toLowerCase()}...`}
          value={filterValue ?? ""}
          onChange={(event) => setFilterValue(event.target.value)}
          className="max-w-sm"
        />

        <Select
          onValueChange={(event) => {
            setFilterColumn(event as column);
          }}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select a filter" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Filters</SelectLabel>
              {Object.keys(columns).map((column) => {
                return column != "" && column != "Actions" ? (
                  <SelectItem value={column}>{column}</SelectItem>
                ) : null;
              })}
            </SelectGroup>
          </SelectContent>
        </Select>

        <DropdownMenu
          onOpenChange={() => {
            if (!dropboxHumanClosed) {
              console.log("dropbox has not been closed by a human");
              setColumnOpen(true);
            } else {
              console.log("dropbox has been closed by a human");
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
              console.log("outside");
            }}
            onEscapeKeyDown={() => {
              setColumnOpen(false);
              setDropboxHumanClosed(true);
              console.log("escape key pressed");
            }}
          >
            {Object.entries(columns).map(([column, value]) => {
              return column != "" && column != "Actions" ? (
                <DropdownMenuCheckboxItem
                  className="capitalize"
                  checked={value}
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
                          onClick={() => {
                            if (column == sortColumn) {
                              setSortAsc(!sortAsc);
                            } else {
                              setSortColumn(column as column);
                              setSortAsc(true);
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
            {trainingsSorted.length != 0 ? (
              sortTrainings(trainingsSorted, sortColumn, sortAsc).map(
                (training, i) => {
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
                          {capitalizeFirstLetter(training.Difficulty)}
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
                              Copy training url
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() =>
                                window.open(training.Url, "_blank")
                              }
                            >
                              Open training in new tab
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            {window.localStorage.getItem(training.Url) ===
                            null ? (
                              <DropdownMenuItem
                                onClick={() => {
                                  window.localStorage.setItem(
                                    training.Url,
                                    "a"
                                  );
                                }}
                              >
                                Mark as read
                              </DropdownMenuItem>
                            ) : (
                              <DropdownMenuItem
                                onClick={() => {
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
                }
              )
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
    </div>
  );
};

/*

      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>

*/

export default TrainingTable;
