"use client";

import React from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';

export default function ExamplesPage() {
  const params = useParams();
  const lang = params.lang as string;

  // List of available example pages with localized paths
  const examples = [
    {
      title: 'DaisyUI Components',
      description: 'DaisyUI component showcase with theme toggling and common UI elements.',
      href: `/${lang}/examples/daisyui`,
    },
    {
      title: 'Typography System',
      description: 'Complete typography component system with headings, text variants, and font loading optimizations.',
      href: `/${lang}/examples/typography`,
    },
    {
      title: 'Layout Components',
      description: 'Flexible layout system with containers, grids, sections, and spacing utilities.',
      href: `/${lang}/examples/layout`,
    },
    {
      title: 'Navigation Components',
      description: 'Navigation components including navbar and sidebar for consistent app navigation.',
      href: `/${lang}/examples/navigation`,
    },
    {
      title: 'Button System',
      description: 'A comprehensive button component system with variants, states and accessibility features.',
      href: `/${lang}/examples/buttons`,
    },
    {
      title: 'Card Components',
      description: 'Card components for displaying content in consistent containers.',
      href: `/${lang}/examples/cards`,
    },
  ];

  return (
    <div className="container-left-justified py-12">
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