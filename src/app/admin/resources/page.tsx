export const dynamic = "force-dynamic";

import prisma from "@/instances/prisma";
import { ThlqlToPrismaWhere } from "@/utils/thlql";
import SearchResources from "@/components/modules/search";
import SwitchPage from "@/components/elements/switchpage";
import { RESOURCE_PER_PAGE } from "@/constants/resource";
import { getPageNumber } from "@/utils/page";
import Header from "@/components/elements/header";
import { auth } from "@/auth";
import { Prisma } from "@prisma/client";
import ReviewStatusFilter from "@/components/elements/review";
import { requireAdmin } from "@/lib/auth";
import { notFound } from "next/navigation";

const getAcceptedFilter = (review?: string): boolean | null => {
  switch (review) {
    case "pending":
      return null;
    case "rejected":
      return false;
    case "accepted":
    default:
      return true;
  }
};

interface IProps {
  searchParams: Promise<Record<string, string | undefined>>;
}

export default async function Home({ searchParams }: IProps) {
  try {
    await requireAdmin();
  } catch {
    return notFound();
  }

  let { query, page, review } = await searchParams;
  const converter = new ThlqlToPrismaWhere();

  const where: Prisma.resourcesWhereInput = {
    accepted: getAcceptedFilter(review),
  };

  let invalidQuery = false;
  try {
    if (query) {
      where.AND = converter.convert(query);
    }
  } catch {
    invalidQuery = true;
  }

  const pageNumber = getPageNumber(page);
  const session = await auth();

  const [resources, count] = await Promise.all([
    prisma.resources.findMany({
      take: RESOURCE_PER_PAGE,
      skip: pageNumber * RESOURCE_PER_PAGE,
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
      orderBy: { ["title"]: "asc" },
    }),
    prisma.resources.count({ where: where }),
  ]);

  await prisma.$disconnect();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black pt-16">
      <Header fixed={true} />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <ReviewStatusFilter
          currentReview={review ?? "accepted"}
          resourcesCount={count}
        />
      </div>
      <SearchResources resources={resources} invalidQuery={invalidQuery} />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
        <SwitchPage resourcesCount={count} pageRoute="/admin/resources" />
      </div>
    </div>
  );
}
