import Head from 'next/head';

import ResourceFilter from '@/module/filter';
import Footer from '@/module/footer';
import Navbar from '@/module/navbar';
import { ResourceTable, ResourceTableFooter } from '@/module/table';

import { DumpLocalStorage } from '@/element/localstorage';

import { parseParams } from '@/util/params';
import { fetchResources } from '@/util/resources';
import { cn } from '@/util/style.util';

interface IProps {
  searchParams: Record<string, string | undefined>;
}

const HomePage = async ({ searchParams }: IProps) => {
  // parse search params
  const sp = parseParams(searchParams);

  const [resources, count] = await fetchResources(sp);

  return (
    <div className={cn('min-h-screen font-sans bg-indigo-950')}>
      <Head>
        <title>The Hacker Library</title>
      </Head>

      <Navbar />

      <div className="h-full flex flex-col items-center ml-24 mr-24 pt-48 pb-6 space-y-4">
        <h1 className="text-5xl text-white">The Hacker Library</h1>
        <p className="text-white">Library of hacking learning resources, not sponsored</p>

        <DumpLocalStorage searchParams={sp} />

        <ResourceFilter searchParams={sp} />
        <ResourceTable resources={resources} searchParams={sp} />
        <ResourceTableFooter searchParams={sp} count={count} />
      </div>

      <Footer />
    </div>
  );
};

export default HomePage;
