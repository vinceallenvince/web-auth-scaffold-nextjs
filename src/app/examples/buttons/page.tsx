"use client";

import React, { useState } from 'react';
import { Button, ButtonLink, IconButton } from '@/app/components/ui/button';
import { cn } from '@/lib/utils';

export default function ButtonExamplePage() {
  const [loading, setLoading] = useState(false);

  const handleLoadingClick = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 2000);
  };

  // Icons used in examples
  const PlusIcon = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="12" y1="5" x2="12" y2="19"></line>
      <line x1="5" y1="12" x2="19" y2="12"></line>
    </svg>
  );

  const ArrowRightIcon = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="5" y1="12" x2="19" y2="12"></line>
      <polyline points="12 5 19 12 12 19"></polyline>
    </svg>
  );

  const HeartIcon = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
    </svg>
  );

  // Section Component for organizing example groups
  const ExampleSection = ({ 
    title, 
    description, 
    children 
  }: { 
    title: string; 
    description?: string; 
    children: React.ReactNode;
  }) => (
    <section className="mb-12">
      <h2 className="text-2xl font-bold mb-2">{title}</h2>
      {description && <p className="text-base-content/70 mb-6">{description}</p>}
      {children}
    </section>
  );

  // Component to display multiple buttons in an example row
  const ButtonRow = ({ 
    children, 
    className 
  }: { 
    children: React.ReactNode; 
    className?: string;
  }) => (
    <div className={cn("flex flex-wrap gap-4 mb-8", className)}>
      {children}
    </div>
  );

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-6">Button Examples</h1>
      <p className="text-lg mb-12">
        A showcase of the button component system with various styles, states, and use cases.
      </p>

      <ExampleSection
        title="Button Variants"
        description="Different visual styles for buttons to indicate their purpose."
      >
        <ButtonRow>
          <Button variant="primary">Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="accent">Accent</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="link">Link</Button>
        </ButtonRow>
      </ExampleSection>

      <ExampleSection
        title="Button Colors"
        description="Color variations to communicate different states or actions."
      >
        <ButtonRow>
          <Button color="default">Default</Button>
          <Button color="success">Success</Button>
          <Button color="warning">Warning</Button>
          <Button color="error">Error</Button>
          <Button color="info">Info</Button>
        </ButtonRow>
        
        <ButtonRow>
          <Button variant="outline" color="default">Default</Button>
          <Button variant="outline" color="success">Success</Button>
          <Button variant="outline" color="warning">Warning</Button>
          <Button variant="outline" color="error">Error</Button>
          <Button variant="outline" color="info">Info</Button>
        </ButtonRow>
      </ExampleSection>

      <ExampleSection
        title="Button Sizes"
        description="Different size variations to fit various UI contexts."
      >
        <ButtonRow>
          <Button size="xs">Extra Small</Button>
          <Button size="sm">Small</Button>
          <Button size="md">Medium (Default)</Button>
          <Button size="lg">Large</Button>
        </ButtonRow>
      </ExampleSection>

      <ExampleSection
        title="Button States"
        description="Different states a button can have."
      >
        <ButtonRow>
          <Button>Default</Button>
          <Button disabled>Disabled</Button>
          <Button isLoading>Loading</Button>
          <Button onClick={handleLoadingClick} isLoading={loading}>
            {loading ? 'Processing...' : 'Click to Load'}
          </Button>
        </ButtonRow>
      </ExampleSection>

      <ExampleSection
        title="Buttons with Icons"
        description="Buttons that include icons to enhance visual communication."
      >
        <ButtonRow>
          <Button leadingIcon={<PlusIcon />}>Add Item</Button>
          <Button trailingIcon={<ArrowRightIcon />}>Next Step</Button>
          <Button 
            variant="outline" 
            leadingIcon={<HeartIcon />} 
            trailingIcon={<ArrowRightIcon />}
          >
            With Both Icons
          </Button>
        </ButtonRow>
      </ExampleSection>

      <ExampleSection
        title="Icon Buttons"
        description="Buttons that only contain an icon with an accessible label."
      >
        <ButtonRow>
          <IconButton 
            icon={<PlusIcon />} 
            ariaLabel="Add item" 
          />
          <IconButton 
            icon={<HeartIcon />} 
            ariaLabel="Like" 
            variant="primary"
          />
          <IconButton 
            icon={<ArrowRightIcon />} 
            ariaLabel="Next" 
            variant="outline"
          />
          <IconButton 
            icon={<HeartIcon />} 
            ariaLabel="Favorite" 
            color="error"
          />
          <IconButton 
            icon={<PlusIcon />} 
            ariaLabel="Add" 
            isLoading={true}
          />
        </ButtonRow>
      </ExampleSection>

      <ExampleSection
        title="Button Links"
        description="Buttons that function as links to navigate to other pages."
      >
        <ButtonRow>
          <ButtonLink href="/examples">Back to Examples</ButtonLink>
          <ButtonLink 
            href="https://github.com" 
            external 
            variant="outline"
          >
            External Link
          </ButtonLink>
          <ButtonLink 
            href="/examples" 
            variant="ghost"
            trailingIcon={<ArrowRightIcon />}
          >
            Learn More
          </ButtonLink>
        </ButtonRow>
      </ExampleSection>

      <ExampleSection
        title="Full Width Buttons"
        description="Buttons that expand to the full width of their container."
      >
        <div className="max-w-md space-y-4">
          <Button fullWidth>Full Width Button</Button>
          <Button variant="outline" fullWidth>Full Width Outline</Button>
          <ButtonLink href="/examples" fullWidth>Full Width Link</ButtonLink>
        </div>
      </ExampleSection>

      <div className="mt-16 pt-8 border-t">
        <h2 className="text-2xl font-bold mb-6">Accessibility Features</h2>
        <ul className="list-disc ml-6 space-y-2">
          <li>All buttons have accessible focus states that meet WCAG contrast requirements</li>
          <li>Icon-only buttons include aria-label for screen reader users</li>
          <li>Loading states are properly communicated to assistive technologies</li>
          <li>Disabled states set both disabled and aria-disabled attributes</li>
          <li>ButtonLinks maintain proper semantics based on internal/external destinations</li>
        </ul>
      </div>
    </div>
  );
} 