import { commaSeparatedToArray, arrayToCommaSeparated } from '@/util/array';

import { Column, Difficulty, SearchParams, difficulties } from '@/constant/types';

const isType = <T>(arr: Readonly<T[]>) => {
  return (element: unknown): element is T => {
    return arr.includes(element as any);
  };
};

const isColumn = isType<Column>(['name', 'tags', 'price', 'authors', 'time', 'date', 'difficulty']);
const isDifficulty = isType<Difficulty>(['easy', 'medium', 'hard', 'insane']);

export const parseParams = (searchParams: Record<string, string | undefined>): SearchParams => {
  const columns: Column[] = searchParams?.columns
    ? commaSeparatedToArray(searchParams['columns']).filter(isColumn)
    : ['name', 'tags', 'authors', 'date', 'time', 'difficulty', 'price'];

  const where = searchParams?.where ? searchParams['where'] : null;

  const difficulty = searchParams?.difficulty
    ? commaSeparatedToArray(searchParams['difficulty']).filter(isDifficulty)
    : difficulties;

  const reload = !searchParams?.reload;

  const page = searchParams?.page ? Number(searchParams['page']) : 1;

  return { columns, where, difficulty, reload, page };
};

export const newParams = (searchParams: SearchParams, resetPage: boolean): URLSearchParams => {
  const sp = new URLSearchParams();

  if (searchParams.columns.length != 7) {
    sp.append('columns', arrayToCommaSeparated(searchParams.columns.sort()));
  }

  searchParams.difficulty.length != 4
    ? sp.append('difficulty', arrayToCommaSeparated(searchParams.difficulty.sort()))
    : null;
  searchParams.where !== null && searchParams.where != '' ? sp.append('where', searchParams.where) : null;
  !searchParams.reload ? sp.append('reload', '0') : null;
  searchParams.page !== 1 && !resetPage ? sp.append('page', searchParams.page.toString()) : null;

  return sp;
};
