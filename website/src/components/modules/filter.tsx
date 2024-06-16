'use client';

import { useState } from 'react';

import { useRouter } from 'next/navigation';

import { newParams } from '@/src/utils/params';

import AdvancedSearch from '@/element/advanced-search';
import { DropdownMenuMultiple, DropdownMenuSingle } from '@/element/dropdown-menu';

import { saveData } from '@/util/localstorage';

import { Column, difficulties, Difficulty, Status, status, Tag, tags } from '@/constant/types';
import { SearchParams } from '@/constant/types';

interface IProps {
  searchParams: SearchParams;
}

const ResourceFilter = ({ searchParams }: IProps) => {
  const router = useRouter();

  const columns: Column[] = ['name', 'tags', 'price', 'authors', 'time to read', 'date', 'difficulty'];
  const [currentColumns, setColumns] = useState<Column[]>(searchParams.columns);

  const [currentStatus, setCurrentStatus] = useState<Status>('both');
  const [currentDifficulties, setCurrentDifficulties] = useState<Difficulty[]>(difficulties);
  const [currentTags, setCurrentTags] = useState<Tag[]>([]);

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
        />

        <DropdownMenuMultiple
          elements={columns}
          currentElements={currentColumns}
          setCurrentElements={setColumns}
          buttonName="columns"
          className="w-[180px] hover:bg-indigo-900"
          onCloseCallback={(items: Column[]) => {
            searchParams.columns = items;
            const sp = newParams(searchParams);
            saveData('columns', items);
            router.push(`/?${sp.toString()}`);
          }}
        />

        <AdvancedSearch
          difficulty={{
            elements: difficulties,
            currentElements: currentDifficulties,
            setCurrentElements: setCurrentDifficulties,
            buttonName: 'Difficulty',
            className: 'w-[200px] hover:bg-indigo-900',
          }}
        />
      </div>
    </>
  );
};

export default ResourceFilter;
