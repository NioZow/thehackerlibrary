'use client';

import { useEffect, useState } from 'react';

import { useRouter } from 'next/navigation';

import { getData, saveData } from '@/src/utils/localstorage';
import { newParams } from '@/src/utils/params';
import { Button } from '@/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/ui/table';
import { Badge } from '@mantine/core';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@radix-ui/react-dropdown-menu';
import { DotsHorizontalIcon } from '@radix-ui/react-icons';

import { RenderIcons } from '@/icon/icons';

import { Column, DifficultyColor, Resource, SearchParams } from '@/constant/types';

interface IProps {
  resources: Resource[];
  searchParams: SearchParams;
}

const COLUMNS = [
  { label: 'name', value: 'name' },
  { label: 'tags', value: 'tags' },
  { label: 'authors', value: 'authors' },
  { label: 'date', value: 'date' },
  { label: 'time to read', value: 'time' },
  { label: 'difficulty', value: 'difficulty' },
  { label: 'price', value: 'price' },
] satisfies { label: string; value: Column }[];

export const ResourceTable = ({ resources, searchParams }: IProps) => {
  const [read, setRead] = useState<number[]>([]);
  const [bookmark, setBookmark] = useState<number[]>([]);

  useEffect(() => {
    setRead(getData<number>('read'));
    setBookmark(getData<number>('bookmarks'));
  }, []);

  useEffect(() => {
    saveData<number>('bookmark', bookmark);
  }, [bookmark]);

  return (
    <div className="rounded-md border w-full">
      <Table>
        <TableHeader>
          <TableRow className="hover:bg-indigo-900">
            <TableHead></TableHead>
            {COLUMNS.map(({ label, value }) => {
              return searchParams.columns.includes(value) ? (
                <TableHead key={value} className="text-white">
                  {label.toUpperCase()}
                </TableHead>
              ) : null;
            })}
            <TableHead className="text-white">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {resources.length != 0 ? (
            resources.map((resource) => {
              return (
                <TableRow key={resource.id} className="hover:bg-indigo-900 text-white">
                  <TableCell>
                    <RenderIcons
                      tags={resource.tags}
                      read={resource.id ? read.includes(resource.id) : false}
                      bookmark={resource.id ? bookmark.includes(resource.id) : false}
                    />
                  </TableCell>

                  {searchParams.columns.includes('name') ? (
                    <TableCell
                      className="hover:cursor-default"
                      onClick={() => (resource.url !== null ? window.open(resource.url, '_blank') : null)}
                    >
                      {resource.name}
                    </TableCell>
                  ) : null}
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
                  {searchParams.columns.includes('time') ? <TableCell>{resource.time}</TableCell> : null}
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
                  {searchParams.columns.includes('price') ? (
                    <TableCell>{!resource.price ? 'Free' : `${resource.price}€`}</TableCell>
                  ) : null}

                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0 hover:bg-indigo-900 hover:text-white">
                          <span className="sr-only">Open menu</span>
                          <DotsHorizontalIcon className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="bg-neutral-900 rounded-md w-[200px]">
                        <DropdownMenuItem
                          className="text-base hover:bg-indigo-900 hover:cursor-default"
                          onClick={() =>
                            resource.url !== null && resource.url !== undefined
                              ? navigator.clipboard.writeText(resource.url)
                              : null
                          }
                        >
                          Copy url
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => (resource.url !== null ? window.open(resource.url, '_blank') : null)}
                          className="text-base hover:bg-indigo-900 hover:cursor-default"
                        >
                          Open in new tab
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          className="text-base hover:bg-indigo-900 hover:cursor-default"
                          onClick={() => {
                            if (resource.id) {
                              if (!read.includes(resource.id)) {
                                setRead([...read, resource.id]);
                                saveData('read', [...read, resource.id]);
                              } else {
                                setRead(read.filter((item) => item !== resource.id));
                                saveData(
                                  'read',
                                  read.filter((item) => item !== resource.id),
                                );
                              }
                            }
                          }}
                        >
                          {resource.id && !read.includes(resource.id) ? 'Mark as read' : 'Mark as not read'}
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className="text-base hover:bg-indigo-900 hover:cursor-default"
                          onClick={() => {
                            if (resource.id) {
                              if (!bookmark.includes(resource.id)) {
                                setBookmark([...bookmark, resource.id]);
                                saveData('bookmarks', [...bookmark, resource.id]);
                              } else {
                                setBookmark(bookmark.filter((item) => item !== resource.id));
                                saveData(
                                  'bookmarks',
                                  bookmark.filter((item) => item !== resource.id),
                                );
                              }
                            }
                          }}
                        >
                          {resource.id && !bookmark.includes(resource.id) ? 'Bookmark' : 'Remove bookmark'}
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              );
            })
          ) : (
            <TableRow className="hover:bg-indigo-900 text-white">
              <TableCell colSpan={Object.keys(COLUMNS).length} className="h-24 text-center">
                No result was found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export const ResourceTableFooter = ({ searchParams, count }: { searchParams: SearchParams; count: number }) => {
  const [page, setPage] = useState(1);
  const router = useRouter();

  return (
    <div className="space-x-2 tex-white">
      <Button
        className="w-30 bg-neutral-900 text-white border-none hover:bg-indigo-900 hover:text-white"
        disabled={true}
      >
        {count} resources
      </Button>
      <Button
        className="w-20 bg-neutral-900 text-white border-none hover:bg-indigo-900 hover:text-white"
        onClick={() => {
          searchParams.page = page - 1;
          setPage(page - 1);

          const sp = newParams(searchParams, false);
          router.push(`/?${sp.toString()}`);
        }}
        disabled={page === 1}
      >
        Previous
      </Button>
      <Button
        variant="outline"
        className="w-20 bg-neutral-900 text-white border-none hover:bg-indigo-900 hover:text-white"
        onClick={() => {
          searchParams.page = page + 1;
          setPage(page + 1);

          const sp = newParams(searchParams, false);
          router.push(`/?${sp.toString()}`);
        }}
        disabled={page >= (count % 10 == 0 ? Math.floor(count / 10) : Math.floor(count / 10) + 1)}
      >
        Next
      </Button>
    </div>
  );
};
