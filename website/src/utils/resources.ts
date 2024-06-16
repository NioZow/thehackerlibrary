import { Prisma } from '@prisma/client';

import prisma from '@/instance/prisma';

import { SearchParams } from '@/constant/types';

type ResourceWhere = Prisma.resourcesWhereInput & {
  OR?: Array<{
    name?: Prisma.StringFilter;
    authors?: {
      some: Prisma.authorsWhereInput;
    };
    tags?: {
      some: Prisma.tagsWhereInput;
    };
  }>;
};

export const fetchResources = async (sp: SearchParams) => {
  const columns: Record<string, boolean> = { id: true, url: true };
  let where: ResourceWhere = {};
  sp.where !== null
    ? (where = {
        OR: [
          { name: { contains: sp.where } },
          { authors: { some: { name: { contains: sp.where } } } },
          { tags: { some: { name: { contains: sp.where } } } },
        ],
      })
    : null;

  columns['tags'] = sp.columns.includes('tags');
  columns['authors'] = sp.columns.includes('authors');
  columns['price'] = sp.columns.includes('price');
  columns['time'] = sp.columns.includes('time to read');
  columns['date'] = sp.columns.includes('date');
  columns['difficulty'] = sp.columns.includes('difficulty');
  columns['name'] = sp.columns.includes('name');

  return await Promise.all([
    prisma.resources.findMany({
      take: 10,
      select: columns,
      where: where,
    }),
    prisma.resources.count({
      where: where,
    }),
  ]);
};
