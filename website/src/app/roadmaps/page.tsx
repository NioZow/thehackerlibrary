import Head from 'next/head';

import Navbar from '@/module/navbar';

import { cn } from '@/util/style.util';


const HomePage = async () => {
  return (
    <div className={cn('min-h-screen font-sans bg-indigo-950')}>
      <Head>
        <title>The Hacker Library</title>
      </Head>

      <Navbar />

      <div className="h-full flex flex-col items-center ml-24 mr-24 pt-48 pb-6 space-y-4">
        <p className="text-white text-xl">Coming soon :)</p>
      </div>
    </div>
  );
};

export default HomePage;
