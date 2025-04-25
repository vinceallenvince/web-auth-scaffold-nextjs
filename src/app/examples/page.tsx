import React from 'react';
import Link from 'next/link';

export default function ExamplesPage() {
  // List of available example pages
  const examples = [
    {
      title: 'Button System',
      description: 'A comprehensive button component system with variants, states and accessibility features.',
      href: '/examples/buttons',
    },
    {
      title: 'Card Components',
      description: 'Card components for displaying content in consistent containers.',
      href: '/examples/cards',
    },
  ];

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-6">Component Examples</h1>
      <p className="text-lg mb-12">
        Browse these example pages to see our UI components in action.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {examples.map((example) => (
          <Link
            key={example.href}
            href={example.href}
            className="card bg-base-100 shadow-md hover:shadow-lg transition-shadow duration-200 cursor-pointer"
          >
            <div className="card-body">
              <h2 className="card-title">{example.title}</h2>
              <p>{example.description}</p>
              <div className="card-actions justify-end mt-4">
                <span className="text-primary font-medium">View Example &rarr;</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
} 