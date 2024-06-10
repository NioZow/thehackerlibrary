import type { ReactElement } from 'react';

import { Table, TableHeader, TableRow, TableHead } from '@/ui/table';

import { columns } from '@/constant/types';

interface IPropsSingle<T> {
  element: T;
}

const ResourceTable = (): ReactElement => {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow key="table-row">
            {columns.map((value) => {
              return <TableHead key={value}>{value}</TableHead>;
            })}
          </TableRow>
        </TableHeader>
      </Table>
    </div>
  );
};

export default ResourceTable;
