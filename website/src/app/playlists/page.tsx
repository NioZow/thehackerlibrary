import Head from 'next/head';

import { PlaylistContent } from '@/src/components/modules/playlist';
import { Resource } from '@/src/constants/types';
import { fetchResources, fetchResourcesById } from '@/src/utils/resources';

import Footer from '@/module/footer';
import Navbar from '@/module/navbar';

interface IProps {
  searchParams: Record<string, string | undefined>;
}

const HomePage = async ({ searchParams }: IProps) => {
  //const resources = fetchResourcesById([1, 2, 3, 4]);

  const resources = await fetchResourcesById([1, 2, 3, 4]);

  return (
    <div className="min-h-screen font-sans bg-indigo-950">
      <Head>
        <title>The Hacker Library</title>
      </Head>

      <Navbar />

      <div className="h-full flex flex-col items-center ml-24 mr-24 pt-48 pb-6 space-y-4">
        <h1 className="text-5xl text-white">The Hacker Library</h1>
        <p className="text-white">Library of hacking learning resources, not sponsored</p>

        <PlaylistContent resources={resources} />
      </div>

      <Footer />
    </div>
  );
};

export default HomePage;
