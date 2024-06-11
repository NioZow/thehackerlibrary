import Head from 'next/head';

import App from '@/module/app';
import Footer from '@/module/footer';
import Navbar from '@/module/navbar';

import { fetchResources } from '@/util/resources';
import { cn } from '@/util/style.util';

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

        <App resources={resources} />
      </div>

      <Footer />
    </div>
  );
};

export default HomePage;
