'use client';

import { useState, useEffect } from 'react';

import { useRouter } from 'next/navigation';

import { newParams } from '@/src/utils/params';

import AdvancedSearch from '@/element/advanced-search';
import { DropdownMenuMultiple, DropdownMenuSingle, DropdownItem } from '@/element/dropdown-menu';

import { saveData, getData } from '@/util/localstorage';

import { Column, Status, Tag } from '@/constant/types';
import { SearchParams } from '@/constant/types';

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

export const tags: TagDropdownItem[] = [
  { label: 'bookmark', value: 'bookmark' },
  { label: 'favorite', value: 'favorite' },
];

type StatusDropdownItem = DropdownItem<Status>;

export const status: StatusDropdownItem[] = [
  { label: 'both', value: 'both' },
  { label: 'complete', value: 'complete' },
  { label: 'uncomplete', value: 'uncomplete' },
];

const ResourceFilter = ({ searchParams }: IProps) => {
  const router = useRouter();

  const [currentColumns, setColumns] = useState<ColumnDropdownItem[]>([]);

  useEffect(() => {
    setColumns(columns.filter(({ value }) => searchParams.columns.includes(value)));
  }, [searchParams]);

  const [currentStatus, setCurrentStatus] = useState<StatusDropdownItem>({
    label: searchParams.status,
    value: searchParams.status,
  });

  const [currentTags, setCurrentTags] = useState<TagDropdownItem[]>([]);

  return (
    <>
      <div className="flex justify-end space-x-4">
        <DropdownMenuMultiple
          elements={tags}
          currentElements={currentTags}
          setCurrentElements={setCurrentTags}
          buttonName="tags"
          className="w-[180px] hover:bg-indigo-900"
        />

        <DropdownMenuSingle
          elements={status}
          currentElement={currentStatus}
          setCurrentElement={setCurrentStatus}
          buttonName="status"
          className="w-[180px] hover:bg-indigo-900"
          onCloseCallback={(item: StatusDropdownItem) => {
            searchParams.status = item.value;

            console.log(searchParams.status);

            if (searchParams.status === 'both') {
              searchParams.ids = [];
            } else {
              searchParams.ids = getData<number>('read');
            }

            const sp = newParams(searchParams, true);
            console.log(searchParams, sp);

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

        <AdvancedSearch searchParams={searchParams} />
      </div>
    </>
  );
};

export default ResourceFilter;
