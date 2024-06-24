'use client';

import { useEffect } from 'react';

import { useRouter } from 'next/navigation';

import { getData } from '@/src/utils/localstorage';
import { newParams } from '@/src/utils/params';

import { arrayToCommaSeparated } from '@/util/array';

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

export const DumpPlaylistFromLocalStorage = ({
  searchParams,
}: {
  searchParams: Record<string, string | undefined>;
}) => {
  const router = useRouter();

  useEffect(() => {
    // using window obj under the hood
    // make sure it's rendered client
    if (!searchParams.reload) {
      const sp = new URLSearchParams();
      const ids = getData<number>('read');
      sp.append('reload', '0');

      if (ids.length !== 0) {
        sp.append('ids', arrayToCommaSeparated(ids));
      }

      router.push(`/playlists?${sp.toString()}`);
    }
  }, []);

  return null;
};
