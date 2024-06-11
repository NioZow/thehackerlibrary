import type { ReactElement } from 'react';

import { Table, TableHead, TableHeader, TableRow } from '@/ui/table';

import { columns } from '@/constant/types';

const ResourceTable = (): ReactElement => {
  return (
    <div className="rounded-md border w-full">
      <Table>
        <TableHeader>
          <TableRow className="hover:bg-indigo-900">
            {columns.map((value) => {
              return (
                <TableHead key={value} className="text-white">
                  {(value as string).toUpperCase()}
                </TableHead>
              );
            })}
          </TableRow>
        </TableHeader>
      </Table>
    </div>
  );
};

export default ResourceTable;
