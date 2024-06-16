import { commaSeparatedToArray, arrayToCommaSeparated } from '@/util/array';

import { SearchParams } from '@/constant/types';

export const parseParams = (searchParams: Record<string, string | undefined>): SearchParams => {
  const filters: SearchParams = {
    columns: ['name', 'tags', 'authors', 'date', 'time to read', 'difficulty', 'price'],
    where: null,
  };

  if (searchParams['columns'] !== undefined) {
    filters.columns = commaSeparatedToArray(searchParams['columns']);
  }

  if (searchParams['where'] !== undefined) {
    filters.where = searchParams['where'];
  }

  return filters;
};

export const newParams = (searchParams: SearchParams): URLSearchParams => {
  const sp = new URLSearchParams();
  sp.append('columns', arrayToCommaSeparated(searchParams.columns.sort()));
  return sp;
};
