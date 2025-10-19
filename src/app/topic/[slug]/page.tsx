export const dynamic = "force-dynamic";

import React from "react";

import prisma from "@/instances/prisma";
import { notFound } from "next/navigation";
import { Topics } from "@/components/modules/topics";
import { auth } from "@/auth";
import { isValidUUID } from "@/utils/uuid";

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const topicId = (await params).slug;

  if (!isValidUUID(topicId)) {
    return notFound();
  }

  const session = await auth();

  const resourceInclude = {
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
  };

  const topic = await prisma.topics.findFirst({
    include: {
      tag: {
        include: {
          resources: {
            include: resourceInclude,
            where: { accepted: true },
          },
        },
      },
      path: true,
      sections: {
        include: {
          tag: {
            include: {
              resources: {
                include: resourceInclude,
                where: { accepted: true },
              },
            },
          },
        },
      },
    },
    where: { id: topicId },
  });

  if (!topic) {
    return notFound();
  }

  // get all resources ids associated to a section
  const sectionsResourceIds = [
    ...new Set(
      topic.sections
        .filter((section) => section.tag !== null)
        .map((section) => section.tag!.resources.map((resource) => resource.id))
        .flat(),
    ),
  ];

  // filter to only show orpheans at the beginning and not everybody
  topic.tag.resources = topic.tag.resources.filter(
    (resource) => !sectionsResourceIds.includes(resource.id),
  );

  return <Topics topic={topic} />;
}
