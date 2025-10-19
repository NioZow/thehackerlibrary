export const dynamic = "force-dynamic";

import React from "react";
import prisma from "@/instances/prisma";
import { CardTopic } from "@/components/elements/cards";
import { notFound } from "next/navigation";
import {
  defaultPathIconStyle,
  pathIconMappings,
} from "@/components/elements/icons";

import { Audiowide } from "next/font/google";
import Header from "@/components/elements/header";
import { isValidUUID } from "@/utils/uuid";
import { Paths } from "@/components/modules/paths";

const font = Audiowide({
  weight: "400",
  subsets: ["latin"],
});

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const pathId = (await params).slug;

  if (!isValidUUID(pathId)) {
    return notFound();
  }

  const path = await prisma.paths.findUnique({
    where: {
      id: pathId,
    },
  });

  if (!path) {
    return notFound();
  }

  const pathResourceCount = await prisma.resources.count({
    where: {
      OR: [
        {
          tags: {
            some: {
              topics: {
                some: {
                  path: {
                    id: pathId,
                  },
                },
              },
            },
          },
        },
        {
          tags: {
            some: {
              sections: {
                some: {
                  topic: {
                    path: {
                      id: pathId,
                    },
                  },
                },
              },
            },
          },
        },
      ],
    },
  });

  const topics = await prisma.topics.findMany({
    orderBy: { tag: { name: "asc" } },
    select: {
      id: true,
      tag: true,
      sections: true,
      _count: {
        select: {
          sections: true,
        },
      },
    },
    where: { path: { id: pathId } },
  });

  const topicsWithResourceCount = await Promise.all(
    topics.map(async (topic) => {
      const resourceCount = await prisma.resources.count({
        where: {
          OR: [
            {
              tags: {
                some: {
                  topics: {
                    some: {
                      id: topic.id,
                    },
                  },
                },
              },
            },
            {
              tags: {
                some: {
                  sections: {
                    some: {
                      topic: {
                        id: topic.id,
                      },
                    },
                  },
                },
              },
            },
          ],
        },
      });

      return {
        id: topic.id,
        name: topic.tag.name,
        sectionCount: topic._count.sections,
        resourceCount,
        difficulty: "Beginner",
      };
    }),
  );

  return (
    <Paths
      pathResourceCount={pathResourceCount}
      path={path}
      topics={topicsWithResourceCount}
    />
  );
}
