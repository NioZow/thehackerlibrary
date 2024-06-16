'use client';

import { useState } from 'react';

import { Button } from '@/ui/button';
import { Table, TableHead, TableHeader, TableRow, TableBody, TableCell } from '@/ui/table';
import { Badge } from '@mantine/core';
import {
  DropdownMenu,
  DropdownMenuSeparator,
  DropdownMenuItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@radix-ui/react-dropdown-menu';
import { DotsHorizontalIcon } from '@radix-ui/react-icons';

import { RenderIcons } from '@/icon/icons';

import { Resource } from '@/constant/types';
import { columns } from '@/constant/types';
import { SearchParams, DifficultyColor } from '@/constant/types';

interface IProps {
  resources: Resource[];
  searchParams: SearchParams;
}

export const ResourceTable = ({ resources, searchParams }: IProps) => {
  console.log(searchParams);

  return (
    <div className="rounded-md border w-full">
      <Table>
        <TableHeader>
          <TableRow className="hover:bg-indigo-900">
            {columns.map((column) => {
              return searchParams.columns.includes(column) || ['actions', ''].includes(column) ? (
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
                <TableRow key={resource.id} className="hover:bg-indigo-900 text-white">
                  <TableCell>
                    <RenderIcons tags={resource.tags} />
                  </TableCell>

                  {searchParams.columns.includes('name') ? <TableCell>{resource.name}</TableCell> : null}
                  {searchParams.columns.includes('tags') && resource.tags !== undefined ? (
                    <TableCell>
                      {resource.tags.slice(1).map((tag) => {
                        return <p key={tag.id}>{tag.name}</p>;
                      })}
                    </TableCell>
                  ) : null}
                  {searchParams.columns.includes('authors') && resource.authors !== undefined ? (
                    <TableCell>
                      {resource.authors.map((author) => {
                        return <p key={author.id}>{author.name}</p>;
                      })}
                    </TableCell>
                  ) : null}
                  {searchParams.columns.includes('date') ? <TableCell>{resource.date}</TableCell> : null}
                  {searchParams.columns.includes('time to read') ? <TableCell>{resource.time}</TableCell> : null}
                  {searchParams.columns.includes('difficulty') ? (
                    <TableCell>
                      <Badge
                        fullWidth
                        variant="light"
                        color={
                          resource.difficulty !== null && resource.difficulty !== undefined
                            ? DifficultyColor[resource.difficulty]
                            : 'white'
                        }
                      >
                        {resource.difficulty}
                      </Badge>
                    </TableCell>
                  ) : null}
                  {searchParams.columns.includes('price') ? <TableCell>{resource.price}</TableCell> : null}

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
                          onClick={() =>
                            resource.url !== null && resource.url !== undefined
                              ? navigator.clipboard.writeText(resource.url)
                              : null
                          }
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

export const ResourceTableFooter = ({ count }: { count: number }) => {
  const [page, setPage] = useState(1);

  return (
    <div className="space-x-2 tex-white">
      <Button className="w-30" variant="outline" disabled={true}>
        {count} resources
      </Button>
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
        disabled={page >= (count % 10 == 0 ? Math.floor(count / 10) : Math.floor(count / 10) + 1)}
      >
        Next
      </Button>
    </div>
  );
};
