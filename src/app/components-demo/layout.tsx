import React from 'react';
import Link from 'next/link';

export default function ComponentsDemoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="bg-base-200 py-4 shadow-md">
        <div className="flex justify-between items-center px-6 md:px-6 lg:px-8 mx-auto">
          <h1 className="text-2xl font-bold">
            <Link href="/components-demo" className="hover:underline">
              Components Demo
            </Link>
          </h1>
          <Link href="/" className="btn btn-ghost">
            Back to Main App
          </Link>
        </div>
      </header>
      
      <div className="flex flex-1 flex-col md:flex-row">
        <nav className="w-full md:w-64 bg-base-100 border-r px-6 md:px-6 lg:px-8 py-4">
          <h2 className="text-lg font-semibold mb-4">Component Categories</h2>
          <ul className="space-y-2">
            <li>
              <Link 
                href="/components-demo/form" 
                className="block p-2 hover:bg-base-200 rounded"
              >
                Form Components
              </Link>
            </li>
            <li>
              <Link 
                href="/components-demo/radio-group" 
                className="block p-2 hover:bg-base-200 rounded"
              >
                RadioGroup Demo
              </Link>
            </li>
            {/* Add other component category links here */}
          </ul>
        </nav>
        
        <main className="flex-1 px-6 md:px-6 lg:px-8 py-4">
          {children}
        </main>
      </div>
    </div>
  );
} 