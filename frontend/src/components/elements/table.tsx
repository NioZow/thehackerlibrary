"use client"

import { useState, useEffect } from "react"
import {
  CaretSortIcon,
  ChevronDownIcon,
  DotsHorizontalIcon,
} from "@radix-ui/react-icons"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import { Training } from "@/components/elements/types";
import { GetIcon } from "@/components/elements/training"
import { GenRandomKey, CapitalizeFirstLetter, SortTraining, FilterTrainings } from "@/components/elements/utils"

type column = '' | 'Type' | 'Name' | 'Tags' | 'Price' | 'Authors' | 'Time to read' | 'Date' | 'Difficulty' | 'Read' | 'Actions'

function TrainingTable() {

  const [data, setData] = useState<Training[]>([])
  useEffect(() => {
    fetch('http://localhost:8000/api/training')
    .then(res => res.json())
    .then(setData)
  }, [])

  const [columns, setColumns] = useState<column[]>(['', 'Type', 'Name', 'Tags', 'Authors', 'Date', 'Time to read', 'Difficulty', 'Price', 'Read', 'Actions'])
  const [filterValue, setFilterValue] = useState("")
  const [filterColumn, setFilterColumn] = useState<column>('Name')
  const [sortColumn, setSortColumn] = useState<column>('Name')
  const [sortAsc, setSortAsc] = useState(true)

  const trainingsSorted: Array<Training> = FilterTrainings(data, filterColumn, filterValue)

  return (
    <div className="w-full">
      <div className="flex items-center py-4">
        <Input
          placeholder={`Filter by ${filterColumn.toLowerCase()}...`}
          value={filterValue ?? ""}
          onChange={(event) =>
            setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />

        <Select onValueChange={(event) => {setFilterColumn(event as column)}}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select a filter" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Filters</SelectLabel>
              {
                columns.map((column) => {
                  return (column != "" && column != "Actions") ? <SelectItem 
                   value={column}
                   >
                    {column}
                   </SelectItem> : null
                })
              }
            </SelectGroup>
          </SelectContent>
        </Select>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              Columns <ChevronDownIcon className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {
              columns.map((column) => {
                return (column != "" && column != "Actions") ? (
                  <DropdownMenuCheckboxItem
                    key={GenRandomKey()}
                    className="capitalize"
                    checked={true}
                    onCheckedChange={(value) => {console.log("test")}}>
                    {column}
                  </DropdownMenuCheckboxItem>
                ) : null
              })
            }
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow key="table-row"> 
              {columns.map((column) => {
                return (
                  <TableHead key={column}>
                    {
                      (column != "" && column != "Actions") ? (
                        <Button variant="ghost" value={column} onClick={(event) => {
                          if (event.target.value == sortColumn){
                            setSortAsc(!sortAsc)
                          } else {
                            setSortColumn(event.target.value)
                            setSortAsc(true)
                          }
                        }}>
                        {column}
                        <CaretSortIcon className="ml-2 h-4 w-4" />
                    </Button>) : `${column}`
                    }
                  </TableHead>
                )
              })}
            </TableRow>
          </TableHeader>

          <TableBody>
            {
              trainingsSorted.length != 0 ? SortTraining(trainingsSorted, sortColumn, sortAsc).map((training, i) => { 
                return <TableRow key={training.Name + i}>

                  <TableCell key={GenRandomKey()}>
                    <GetIcon icon={training.Tags}/>
                  </TableCell> 

                  <TableCell key={GenRandomKey()}>
                    {training.Type}
                  </TableCell> 

                  <TableCell key={GenRandomKey()}>
                    {training.Name} 
                  </TableCell> 

                  <TableCell key={GenRandomKey()}>
                    {
                      training.Tags.map((tag, i) => {
                        return i + 1 != training.Tags.length ? `${tag} - ` : `${tag}`
                      })
                    }
                  </TableCell>

                  <TableCell key={GenRandomKey()}>
                    {
                      training.Authors.map((author, i) => {
                        return i + 1 != training.Authors.length ? `${author} - ` : `${author}`
                      })
                    }
                  </TableCell>

                  <TableCell key={GenRandomKey()}>
                    {training.Date}
                  </TableCell>

                  <TableCell key={GenRandomKey()}>
                    {training.Time}
                  </TableCell>

                  <TableCell key={GenRandomKey()}>
                    {CapitalizeFirstLetter(training.Difficulty)}
                  </TableCell>

                  <TableCell key={GenRandomKey()}>
                    {training.Price}
                  </TableCell>

                  <TableCell key={GenRandomKey()}>
                    No
                  </TableCell>

                  <TableCell key={GenRandomKey()}>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <span className="sr-only">Open menu</span>
                          <DotsHorizontalIcon className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem onClick={() => navigator.clipboard.writeText(training.Url)}>
                          Copy training url
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => window.open(training.Url, "_blank")}>
                          Open training in new tab
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>Mark as read</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>

                </TableRow>
              }) : <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  No results found.
                </TableCell>
              </TableRow>
            }
          </TableBody>
        </Table>
      </div>

    </div>
  )
}

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