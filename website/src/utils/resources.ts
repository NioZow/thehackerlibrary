import prisma from '@/instance/prisma';

const fetchResources = async () => {
  return prisma.resources.findMany({
    take: 10,
  });
};
