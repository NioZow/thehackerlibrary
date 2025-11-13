export const dynamic = "force-dynamic";

import prisma from "@/instances/prisma";
import React from "react";
import { BookOpen, TrendingUp } from "lucide-react";
import { CardPath } from "@/components/elements/cards";
import Header from "@/components/elements/header";

export default async function Home() {
  const paths = await prisma.paths.findMany({
    orderBy: { name: "asc" },
    select: {
      id: true,
      name: true,
      _count: {
        select: {
          topics: true,
        },
      },
    },
  });

  const pathsWithResourceCounts = await Promise.all(
    paths.map(async (path) => {
      const resourceCount = await prisma.resources.count({
        where: {
          OR: [
            {
              tags: {
                some: {
                  topics: {
                    some: {
                      path_id: path.id,
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
                        path_id: path.id,
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
        id: path.id,
        name: path.name,
        topicCount: path._count.topics,
        resourceCount,
      };
    }),
  );

  await prisma.$disconnect();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      <Header fixed={false} />

      <div className="relative">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-cyan-900/20 via-transparent to-transparent"></div>

        <div className="relative max-w-6xl mx-auto px-6 pt-20 pb-16">
          <div className="text-center space-y-6">
            <div className="inline-flex items-center space-x-2 bg-cyan-500/10 border border-cyan-500/20 rounded-full px-4 py-2">
              <BookOpen className="w-4 h-4 text-cyan-400" />
              <span className="text-sm text-cyan-300">
                Structured learning from real research
              </span>
            </div>

             <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white">
              Learning Paths
            </h1>

            <p className="text-lg text-gray-400 max-w-2xl mx-auto leading-relaxed">
              Follow curated sequences of researcher posts to master specific
              attack techniques and security domains.
            </p>

             <div className="flex flex-col sm:flex-row items-center justify-center sm:space-x-8 space-y-4 sm:space-y-0 pt-4">
              <div className="flex items-center space-x-2">
                <BookOpen className="w-5 h-5 text-cyan-400" />
                <span className="text-sm text-gray-400">
                  {paths.length} Paths
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <TrendingUp className="w-5 h-5 text-blue-400" />
                <span className="text-sm text-gray-400">
                  Continuously Updated
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <main className="max-w-6xl mx-auto px-6 pb-20">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {pathsWithResourceCounts.map((path) => (
            <CardPath key={path.id} posts={path.resourceCount} path={path} />
          ))}
        </div>
      </main>
    </div>
  );
}
