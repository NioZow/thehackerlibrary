'use client';

import React, { useEffect, useState } from 'react';

import { useRouter } from 'next/navigation';

import { newParams } from '@/src/utils/params';

import { DropdownItem, DropdownMenuMultiple, DropdownMenuSingle } from '@/element/dropdown-menu';
import SearchInput from '@/element/search';

import { getData, saveData } from '@/util/localstorage';

import { Column, Difficulty, SearchParams, Status, Tag } from '@/constant/types';


interface IProps {
  searchParams: SearchParams;
}

type ColumnDropdownItem = DropdownItem<Column>;

const columns: ColumnDropdownItem[] = [
  { label: 'name', value: 'name' },
  { label: 'tags', value: 'tags' },
  { label: 'price', value: 'price' },
  { label: 'authors', value: 'authors' },
  { label: 'time to read', value: 'time' },
  { label: 'date', value: 'date' },
  { label: 'difficulty', value: 'difficulty' },
];

type TagDropdownItem = DropdownItem<Tag>;

export const tags: TagDropdownItem[] = [{ label: 'bookmark', value: 'bookmark' }];

type StatusDropdownItem = DropdownItem<Status>;

export const status: StatusDropdownItem[] = [
  { label: 'both', value: 'both' },
  { label: 'complete', value: 'complete' },
  { label: 'incomplete', value: 'incomplete' },
];

type DifficultyDropdownItem = DropdownItem<Difficulty>;

export const difficulties: DifficultyDropdownItem[] = [
  { label: 'easy', value: 'easy' },
  { label: 'medium', value: 'medium' },
  { label: 'hard', value: 'hard' },
  { label: 'insane', value: 'insane' },
];

const ResourceFilter = ({ searchParams }: IProps) => {
  const router = useRouter();

  const [currentColumns, setColumns] = useState<ColumnDropdownItem[]>([]);

  useEffect(() => {
    setColumns(columns.filter(({ value }) => searchParams.columns.includes(value)));
    setCurrentTags(searchParams.bookmarks.length !== 0 ? [{ label: 'bookmark', value: 'bookmark' }] : []);
  }, [searchParams]);

  const [currentStatus, setCurrentStatus] = useState<StatusDropdownItem>({
    label: searchParams.status,
    value: searchParams.status,
  });

  const [currentTags, setCurrentTags] = useState<TagDropdownItem[]>([]);

  const [currentDifficulties, setCurrentDifficulties] = useState<DifficultyDropdownItem[]>(
    difficulties.filter(({ value }) => searchParams.difficulty.includes(value)) ?? [difficulties[0]],
  );

  return (
    <div className="flex justify-end space-x-4">
      <SearchInput searchParams={searchParams} />

      <DropdownMenuMultiple
        elements={tags}
        currentElements={currentTags}
        setCurrentElements={setCurrentTags}
        buttonName="tags"
        className="w-[180px] hover:bg-indigo-900"
        onCloseCallback={(items: TagDropdownItem[]) => {
          if (items.map(({ value }) => value).includes('bookmark')) {
            searchParams.bookmarks = getData<number>('bookmarks');
          } else {
            searchParams.bookmarks = [];
          }

          const sp = newParams(searchParams, true);

          router.push(`?${sp.toString()}`);
        }}
      />

      <DropdownMenuSingle
        elements={status}
        currentElement={currentStatus}
        setCurrentElement={setCurrentStatus}
        buttonName="status"
        className="w-[180px] hover:bg-indigo-900"
        onCloseCallback={(item: StatusDropdownItem) => {
          searchParams.status = item.value;

          if (searchParams.status === 'both') {
            searchParams.ids = [];
          } else {
            searchParams.ids = getData<number>('read');
          }

          const sp = newParams(searchParams, true);

          window.localStorage.setItem('status', searchParams.status);
          router.push(`?${sp.toString()}`);
        }}
      />

      <DropdownMenuMultiple
        elements={columns}
        currentElements={currentColumns}
        setCurrentElements={setColumns}
        buttonName="columns"
        className="w-[180px] hover:bg-indigo-900"
        onCloseCallback={(items: ColumnDropdownItem[]) => {
          const columns = items.map(({ value }) => value);
          searchParams.columns = columns;

          const sp = newParams(searchParams, false);

          saveData('columns', columns);
          router.push(`/?${sp.toString()}`);
        }}
      />

      <DropdownMenuMultiple
        elements={difficulties}
        currentElements={currentDifficulties}
        setCurrentElements={setCurrentDifficulties}
        buttonName="Difficulty"
        className="w-[200px] hover:bg-indigo-900"
        onCloseCallback={(items: DifficultyDropdownItem[]) => {
          searchParams.difficulty = items.map(({ value }) => value);

          const sp = newParams(searchParams, false);

          router.push(`/?${sp.toString()}`);
        }}
      />
    </div>
  );
};

export default ResourceFilter;
