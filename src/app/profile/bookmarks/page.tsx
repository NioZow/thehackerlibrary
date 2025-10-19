export const dynamic = "force-dynamic";

import prisma from "@/instances/prisma";
import { auth } from "@/auth";
import Header from "@/components/elements/header";
import BookmarkedResources from "@/components/modules/bookmarks";
import SwitchPage from "@/components/elements/switchpage";
import { RESOURCE_PER_PAGE } from "@/constants/resource";
import { getPageNumber } from "@/utils/page";
import { redirect } from "next/navigation";

interface IProps {
  searchParams: Promise<Record<string, string | undefined>>;
}

export default async function Page({ searchParams }: IProps) {
  const session = await auth();

  if (!session?.user) {
    redirect("/");
  }

  const { page } = await searchParams;
  const pageNumber = getPageNumber(page);

  const [resources, count] = await Promise.all([
    prisma.resources.findMany({
      take: RESOURCE_PER_PAGE,
      skip: pageNumber * RESOURCE_PER_PAGE,
      include: {
        authors: true,
        tags: true,
        bookmarks: {
          where: { userId: session.user.id },
          select: { id: true },
        },
        readPosts: {
          where: { userId: session.user.id },
          select: { id: true },
        },
      },
      where: {
        bookmarks: {
          some: { userId: session.user.id },
        },
      },
      orderBy: { title: "asc" },
    }),
    prisma.resources.count({
      where: {
        bookmarks: {
          some: { userId: session.user.id },
        },
      },
    }),
  ]);

  await prisma.$disconnect();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black pt-16">
      <Header fixed={true} />
      <BookmarkedResources resources={resources} />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
        <SwitchPage resourcesCount={count} pageRoute="/profile/bookmarks" />
      </div>
    </div>
  );
}
