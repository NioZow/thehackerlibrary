import { SetStateAction, Dispatch, useState } from 'react';

import AdvancedSearch from '@/element/advanced-search';
import { DropdownMenuMultiple, DropdownMenuSingle } from '@/element/dropdown-menu';

import { Column, difficulties, Difficulty, Status, status, Tag, tags } from '@/constant/types';

interface IProps {
  columns: {
    columns: Column[];
    currentColumns: Column[];
    setColumns: Dispatch<SetStateAction<Column[]>>;
  };
}

const ResourceFilter = ({ columns }: IProps) => {
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
          elements={columns.columns}
          currentElements={columns.currentColumns}
          setCurrentElements={columns.setColumns}
          buttonName="columns"
          className="w-[180px] hover:bg-indigo-900"
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
