import { useState } from 'react';

import { Button } from '@/ui/button';
import { GearIcon } from '@radix-ui/react-icons';

import { DropdownMenuSingle, DropdownMenuMultiple } from '@/element/dropdown-menu';

import { Column, Status, status, Difficulty, difficulties } from '@/constant/types';

const ResourceFilter = () => {
  const columns: Column[] = ['name', 'tags', 'price', 'authors', 'time to read', 'date', 'difficulty'];
  const [currentColumns, setCurrentColumns] = useState<Column[]>(columns);
  const [currentDifficulties, setCurrentDifficulties] = useState<Difficulty[]>(difficulties);
  const [currentStatus, setCurrentStatus] = useState<Status>('both');
  const [advancedView, setAdvancedView] = useState<boolean>(false);

  return (
    <>
      <div className="flex justify-end space-x-4">
        <DropdownMenuMultiple
          elements={columns}
          currentElements={currentColumns}
          setCurrentElements={setCurrentColumns}
          buttonName="columns"
        />

        <DropdownMenuSingle
          elements={status}
          currentElement={currentStatus}
          setCurrentElement={setCurrentStatus}
          buttonName="status"
        />

        <Button
          className="ml-auto w-[200px]"
          onClick={() => {
            setAdvancedView(!advancedView);
          }}
        >
          <GearIcon /> &nbsp; Avanced
        </Button>
      </div>
      {advancedView ? (
        <div>
          <DropdownMenuMultiple
            elements={difficulties}
            currentElements={currentDifficulties}
            setCurrentElements={setCurrentDifficulties}
            buttonName="difficulty"
          />
        </div>
      ) : null}
    </>
  );
};

export default ResourceFilter;
