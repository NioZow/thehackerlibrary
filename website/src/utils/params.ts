import { commaSeparatedToArray, arrayToCommaSeparated } from '@/util/array';

import { SearchParams, difficulties } from '@/constant/types';

export const parseParams = (sp: Record<string, string | undefined>): SearchParams => {
  return {
    columns:
      sp?.columns !== undefined
        ? commaSeparatedToArray(sp['columns'])
        : ['name', 'tags', 'authors', 'date', 'time to read', 'difficulty', 'price'],
    where: sp?.where !== undefined ? sp['where'] : null,
    difficulty: sp?.difficulty !== undefined ? commaSeparatedToArray(sp['difficulty']) : difficulties,
    reload: sp?.reload === undefined,
  };
};

export const newParams = (searchParams: SearchParams): URLSearchParams => {
  const sp = new URLSearchParams();
  searchParams.columns.length != 7 ? sp.append('columns', arrayToCommaSeparated(searchParams.columns.sort())) : null;
  searchParams.difficulty.length != 4
    ? sp.append('difficulty', arrayToCommaSeparated(searchParams.difficulty.sort()))
    : null;
  searchParams.where !== null && searchParams.where != '' ? sp.append('where', searchParams.where) : null;
  !searchParams.reload ? sp.append('reload', '0') : null;
  return sp;
};
