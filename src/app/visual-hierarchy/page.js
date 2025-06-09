'use client';

import Image from "next/image";
import Footer from "@/components/layout/Footer";
import dynamic from 'next/dynamic';
import './flow-variables.css';

// Import React Flow component with dynamic import to avoid SSR issues
const HierarchyFlow = dynamic(
  () => import('@/components/flow/HierarchyFlow'),
  { ssr: false }
);

export default function VisualHierarchy() {
  return (
    <div className="grid grid-rows-[auto_1fr_auto] items-center justify-items-center min-h-screen p-4 pb-20 gap-8 sm:p-8 font-[family-name:var(--font-geist-sans)]">
      <header className="w-full max-w-6xl pt-6">
        <div className="flex justify-between items-center">
          {/* <Image
            className="dark:invert"
            src="/next.svg"
            alt="Next.js logo"
            width={120}
            height={30}
            priority
          /> */}
          <h1 className="text-2xl font-bold">Visual Page Hierarchy Editor</h1>
        </div>
      </header>
      
      <main className="flex flex-col gap-[32px] w-full max-w-6xl">
        <div className="bg-black p-6 rounded-lg shadow-sm border border-gray-800 text-white">
          <h2 className="text-xl font-semibold mb-4">Page Structure Visualization</h2>
          <p className="mb-6 text-gray-300">
            This interactive diagram visualizes the hierarchy of elements on a web page.
            You can switch between vertical and horizontal layouts using the buttons in the top right.
          </p>
          
          {/* React Flow diagram */}
          <HierarchyFlow />
          
          <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-md">
            <h3 className="font-medium mb-2">How to use:</h3>
            <ol className="list-decimal list-inside text-sm space-y-2">
              <li>Nodes represent page elements</li>
              <li>Connections show parent-child relationships</li>
              <li>Try different layouts to visualize the structure</li>
              <li>Drag nodes to customize the arrangement</li>
            </ol>
          </div>
        </div>
      </main>
      
      {/* <div className="w-full max-w-6xl">
        <Footer />
      </div> */}
    </div>
  );
}
