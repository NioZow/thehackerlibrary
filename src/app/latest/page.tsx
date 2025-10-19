export const dynamic = "force-dynamic";

import { auth } from "@/auth";
import Latest from "@/components/modules/latest";
import prisma from "@/instances/prisma";

import { isValidUUID } from "@/utils/uuid";
import { Prisma } from "@prisma/client";

type SearchParams = {
  path?: string;
};

type PageProps = {
  searchParams: Promise<SearchParams>;
};

export default async function Page({ searchParams }: PageProps) {
  const where: Prisma.resourcesWhereInput = {
    accepted: true,
    date: { not: null },
  };
  const pathId: string = (await searchParams).path ?? "";

  // filter
  if (isValidUUID(pathId)) {
    where.tags = {
      some: {
        topics: {
          some: {
            path: {
              id: pathId,
            },
          },
        },
      },
    };
  }

  const session = await auth();

  const [resources, paths] = await Promise.all([
    prisma.resources.findMany({
      take: 10,
      include: {
        authors: true,
        tags: true,
        bookmarks: session?.user?.id
          ? {
              where: { userId: session.user.id },
              select: { id: true },
            }
          : false,
        readPosts: session?.user?.id
          ? {
              where: { userId: session.user.id },
              select: { id: true },
            }
          : false,
      },
      orderBy: { date: "desc" },
      where: where,
    }),
    prisma.paths.findMany(),
  ]);

  const path = isValidUUID(pathId)
    ? await prisma.paths.findFirst({
        where: pathId ? { id: pathId } : {},
      })
    : null;

  return <Latest resources={resources} path={path} paths={paths} />;
}
