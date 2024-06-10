'use client';

import type { ReactElement } from 'react';

import Head from 'next/head';

import ResourceFilter from '@/module/filter';
import Footer from '@/module/footer';
import Navbar from '@/module/navbar';
import ResourceTable from '@/module/table';

import { cn } from '@/util/style.util';

const HomePage = (): ReactElement => {
  return (
    <div className={cn('min-h-screen font-sans bg-indigo-950')}>
      <Head>
        <title>The Hacker Library</title>
      </Head>

      <Navbar />

      <div className="h-full flex flex-col justify-center items-center ml-16 mr-16 mt-32">
        <h1 className="text-5xl">The Hacker Library</h1>
        <p>Library of hacking learning resources, not sponsored</p>

        <ResourceFilter />

        <ResourceTable />
      </div>

      <Footer />
    </div>
  );
};

export default HomePage;
