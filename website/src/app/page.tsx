import Head from 'next/head';

import ResourceFilter from '@/module/filter';
import Footer from '@/module/footer';
import Navbar from '@/module/navbar';
import ResourceTable from '@/module/table';

import prisma from '@/instance/prisma';

import { cn } from '@/util/style.util';

const fetchResources = async () => {
  return prisma.resources.findMany({
    take: 10,
  });
};

const HomePage = async () => {
  const resources = await fetchResources();

  return (
    <div className={cn('min-h-screen font-sans bg-indigo-950')}>
      <Head>
        <title>The Hacker Library</title>
      </Head>

      <Navbar />

      <div className="h-full flex flex-col items-center ml-24 mr-24 py-48 space-y-4">
        <h1 className="text-5xl">The Hacker Library</h1>
        <p>Library of hacking learning resources, not sponsored</p>

        {resources.map((resource) => {
          return <p key={resource.id}>{resource.name}</p>;
        })}

        <ResourceFilter />

        <ResourceTable />
      </div>

      <Footer />
    </div>
  );
};

export default HomePage;
