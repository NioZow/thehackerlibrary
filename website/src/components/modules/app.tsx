'use client';

import { useState, useEffect } from 'react';

import { resources } from '@prisma/client';

import ResourceFilter from '@/module/filter';
import ResourceTable from '@/module/table';

import { getData, saveData } from '@/util/localstorage';

import { Column } from '@/constant/types';

interface IProps {
  resources: resources[];
}

const App = ({ resources }: IProps) => {
  const columns: Column[] = ['name', 'tags', 'price', 'authors', 'time to read', 'date', 'difficulty'];
  const [currentColumns, setCurrentColumns] = useState<Column[]>(
    getData('columns').length != 0 ? getData('columns') : columns,
  );

  useEffect(() => {
    saveData('columns', currentColumns);
  }, [currentColumns]);

  return (
    <>
      <ResourceFilter
        columns={{
          columns: columns,
          currentColumns: currentColumns,
          setColumns: setCurrentColumns,
        }}
      />

      <ResourceTable resources={resources} selectedColumns={currentColumns} />
    </>
  );
};

export default App;
