import { Prisma } from '@prisma/client';

import prisma from '@/instance/prisma';

import { Column, SearchParams } from '@/constant/types';


const ITEMS_PER_PAGE = 8;

export const fetchResources = async (searchParams: SearchParams) => {
  const where: Prisma.resourcesWhereInput[] = [];

  if (searchParams.status === 'complete') {
    where.push({
      id: { in: searchParams.ids },
    });
  } else if (searchParams.status === 'incomplete') {
    where.push({
      id: { notIn: searchParams.ids },
    });
  }

  if (searchParams.bookmarks.length !== 0) {
    where.push({
      id: { in: searchParams.bookmarks },
    });
  }

  if (searchParams.where !== null) {
    where.push({
      OR: [
        { name: { contains: searchParams.where } },
        { authors: { some: { name: { contains: searchParams.where } } } },
        { tags: { some: { name: { contains: searchParams.where } } } },
      ],
    });
  }

  if (searchParams.difficulty.length !== 0) {
    where.push({ difficulty: { in: searchParams.difficulty } });
  }

  const columnsKeys = ['authors', 'price', 'time', 'date', 'difficulty', 'name'] as Column[];

  const defaultColumns = { id: true, url: true, tags: true };
  const columns = {
    ...defaultColumns,
    ...Object.fromEntries(columnsKeys.map((col) => [col, searchParams.columns.includes(col)])),
  } satisfies Prisma.resourcesSelect;

  return await Promise.all([
    prisma.resources.findMany({
      take: ITEMS_PER_PAGE,
      select: columns,
      where: { AND: where },
      skip: (searchParams.page - 1) * ITEMS_PER_PAGE,
      orderBy: { ['name']: 'asc' },
    }),
    prisma.resources.count({ where: { AND: where } }),
  ]);
};
