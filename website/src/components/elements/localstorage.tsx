'use client';

import { useEffect } from 'react';

import { useRouter } from 'next/navigation';

import { arrayToCommaSeparated } from '@/src/utils/array';
import { getData } from '@/src/utils/localstorage';

import { Column } from '@/constant/types';

interface IProps {
  searchParams: Record<string, string | undefined>;
}

const DumpLocalStorage = ({ searchParams }: IProps) => {
  const columns: Column[] = ['name', 'tags', 'price', 'authors', 'time to read', 'date', 'difficulty'];
  const router = useRouter();

  useEffect(() => {
    // using window obj under the hood
    // make sure it's rendered client
    if (searchParams['reload'] === undefined) {
      const tmpColumns: Column[] = getData('columns');

      const sp = new URLSearchParams();
      sp.append('columns', arrayToCommaSeparated(tmpColumns.length != 0 ? tmpColumns : columns));
      router.push(`/?${sp.toString()}&reload=t`);
    }
  }, []);

  return null;
};

export default DumpLocalStorage;
