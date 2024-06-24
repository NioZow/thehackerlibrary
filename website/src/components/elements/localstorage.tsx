'use client';

import { useEffect } from 'react';

import { useRouter } from 'next/navigation';

import { getData } from '@/src/utils/localstorage';
import { newParams } from '@/src/utils/params';

import { Column, SearchParams } from '@/constant/types';

interface IProps {
  searchParams: SearchParams;
}

export const DumpLocalStorage = ({ searchParams }: IProps) => {
  const columns: Column[] = ['name', 'tags', 'price', 'authors', 'time', 'date', 'difficulty'];
  const router = useRouter();

  useEffect(() => {
    // using window obj under the hood
    // make sure it's rendered client
    if (searchParams.reload) {
      const tmpColumns: Column[] = getData('columns');

      searchParams.columns = tmpColumns.length != 0 ? tmpColumns : columns;
      searchParams.reload = false;

      const sp = newParams(searchParams, false);
      router.push(`/?${sp.toString()}`);
    }
  }, []);

  return null;
};
