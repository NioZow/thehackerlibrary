'use client';

import { Button } from '@/ui/button';
import { Table, TableHead, TableHeader, TableRow, TableBody, TableCell } from '@/ui/table';
import { resources } from '@prisma/client';
import {
  DropdownMenu,
  DropdownMenuSeparator,
  DropdownMenuItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@radix-ui/react-dropdown-menu';
import { DotsHorizontalIcon } from '@radix-ui/react-icons';

import { NoIcon } from '@/icon/icons';

import { columns, Column } from '@/constant/types';

interface IProps {
  resources: resources[];
  selectedColumns: Column[];
}

const ResourceTable = ({ resources, selectedColumns }: IProps) => {
  return (
    <div className="rounded-md border w-full">
      <Table>
        <TableHeader>
          <TableRow className="hover:bg-indigo-900">
            {columns.map((column) => {
              return selectedColumns.includes(column) || ['actions', ''].includes(column) ? (
                <TableHead key={column} className="text-white">
                  {(column as string).toUpperCase()}
                </TableHead>
              ) : null;
            })}
          </TableRow>
        </TableHeader>
        <TableBody>
          {resources.length != 0 ? (
            resources.map((resource) => {
              return (
                <TableRow key={resource.id} className="hover:bg-indigo-900">
                  <TableCell>
                    <NoIcon />
                  </TableCell>

                  {selectedColumns.includes('name') ? <TableCell>{resource.name}</TableCell> : null}
                  {selectedColumns.includes('tags') ? <TableCell>{resource.name}</TableCell> : null}
                  {selectedColumns.includes('authors') ? <TableCell>{resource.name}</TableCell> : null}
                  {selectedColumns.includes('date') ? <TableCell>{resource.date}</TableCell> : null}
                  {selectedColumns.includes('time to read') ? <TableCell>{resource.time}</TableCell> : null}
                  {selectedColumns.includes('difficulty') ? <TableCell>{resource.difficulty}</TableCell> : null}
                  {selectedColumns.includes('price') ? <TableCell>{resource.price}</TableCell> : null}

                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <span className="sr-only">Open menu</span>
                          <DotsHorizontalIcon className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="bg-indigo-900 border rounded-md">
                        <DropdownMenuItem
                          className="text-base"
                          onClick={() => (resource.url !== null ? navigator.clipboard.writeText(resource.url) : null)}
                        >
                          Copy resource url
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => (resource.url !== null ? window.open(resource.url, '_blank') : null)}
                          className="text-base"
                        >
                          Open resource in new tab
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          className="text-base"
                          onClick={() => {
                            //setRead((prevState: Training[]) => [...prevState, training]);
                            //setRead((prevState: Training[]) =>      prevState.filter((item) => item.Name !== training.Name),);
                          }}
                        >
                          Mark as read
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className="text-base"
                          onClick={() => {
                            //setBookmarks((prevState: Training[]) => [...prevState, training]);
                            //setBookmarks((prevState: Training[]) => prevState.filter((item) => item.Name !== training.Name),);
                          }}
                        >
                          Bookmark
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              );
            })
          ) : (
            <TableRow>
              <TableCell colSpan={Object.keys(columns).length} className="h-24 text-center">
                No result was found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default ResourceTable;
