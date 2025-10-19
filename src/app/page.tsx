export const dynamic = "force-dynamic";

import Homepage from "@/components/modules/homepage";
import prisma from "@/instances/prisma";

export default async function Page() {
  const [posts, topics, paths] = await Promise.all([
    prisma.resources.count({ where: { accepted: true } }),
    prisma.topics.count(),
    prisma.paths.count(),
  ]);

  return <Homepage posts={posts} topics={topics} paths={paths} />;
}
