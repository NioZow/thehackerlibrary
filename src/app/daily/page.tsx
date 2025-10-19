export const dynamic = "force-dynamic";

import { auth } from "@/auth";
import Daily from "@/components/modules/daily";
import prisma from "@/instances/prisma";

import { isValidUUID } from "@/utils/uuid";
import { Prisma } from "@prisma/client";

type SearchParams = {
  path?: string;
  date?: string;
};

type PageProps = {
  searchParams: Promise<SearchParams>;
};

function isValidDate(dateString: string): boolean {
  const regex = /^\d{4}-\d{2}-\d{2}$/;
  if (!regex.test(dateString)) return false;

  const date = new Date(dateString);
  return date instanceof Date && !isNaN(date.getTime());
}

export default async function Page({ searchParams }: PageProps) {
  const params = await searchParams;

  // get the date from searchParams or fallback to current day
  let targetDate: string;
  if (params.date && isValidDate(params.date)) {
    targetDate = params.date;
  } else {
    targetDate = new Date().toISOString().split("T")[0];
  }

  // convert the date string to a numeric seed
  const seed = targetDate.split("-").join("");
  const numericSeed = parseInt(seed, 10);

  const where: Prisma.resourcesWhereInput = {
    accepted: true,
  };
  const pathId = params.path ?? "";

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

  const totalResources = await prisma.resources.count({
    where: where,
  });

  // calculate which resource to fetch (deterministic based on day)
  const skipAmount = numericSeed % (totalResources != 0 ? totalResources : 1);

  const session = await auth();
  const [resourceOfTheDay, paths] = await Promise.all([
    prisma.resources.findFirst({
      skip: skipAmount,
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
      where: where,
      orderBy: { date: "desc" },
    }),
    prisma.paths.findMany(),
  ]);

  const path = isValidUUID(pathId)
    ? await prisma.paths.findFirst({
        where: pathId ? { id: pathId } : {},
      })
    : null;

  return <Daily postOfTheDay={resourceOfTheDay} paths={paths} path={path} />;
}
