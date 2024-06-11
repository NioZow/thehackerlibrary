import prisma from '@/instance/prisma';

export const fetchResources = async () => {
  return prisma.resources.findMany({
    take: 10,
    where: {
      name: {
        contains: 'adcs',
      },
    },
  });
};
