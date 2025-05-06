"use client";

/**
 * Button Examples Page
 * 
 * Using icon components from the dedicated component library:
 * src/components/ui/icons/index.tsx
 */

import React, { useState } from 'react';
import { Button, ButtonLink, IconButton } from '@/components/ui/button';
import { PlusIcon, ArrowRightIcon, HeartIcon } from '@/components/ui/icons';
import { cn } from '@/lib/utils';
import { useParams } from 'next/navigation';
import { PageContainer } from '@/components/ui/layout';

export default function ButtonExamplePage() {
  const [loading, setLoading] = useState(false);
  const params = useParams();
  const lang = params.lang as string;

  const handleLoadingClick = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 1000);
  };

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
    <PageContainer>
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
        description="Buttons that only contain an icon with an accessible label. Uses 'ghost' as the default variant for a cleaner look when used as icon-only controls."
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
          <ButtonLink href={`/${lang}/examples`}>Back to Examples</ButtonLink>
          <ButtonLink 
            href="https://github.com" 
            external 
            variant="outline"
          >
            External Link
          </ButtonLink>
          <ButtonLink 
            href={`/${lang}/examples`} 
            variant="ghost"
            trailingIcon={<ArrowRightIcon />}
          >
            Learn More
          </ButtonLink>
        </ButtonRow>
        
        <h3 className="text-xl font-semibold mb-4 mt-6">Disabled and Loading States</h3>
        <ButtonRow>
          <ButtonLink 
            href={`/${lang}/examples`} 
            disabled
          >
            Disabled Link
          </ButtonLink>
          <ButtonLink 
            href={`/${lang}/examples`} 
            isLoading
          >
            Loading Link
          </ButtonLink>
          <ButtonLink 
            href={`/${lang}/examples`} 
            variant="outline" 
            disabled
            trailingIcon={<ArrowRightIcon />}
          >
            Disabled with Icon
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
          <ButtonLink href={`/${lang}/examples`} fullWidth>Full Width Link</ButtonLink>
        </div>
      </ExampleSection>

      <div className="mt-16 pt-8 border-t">
        <h2 className="text-2xl font-bold mb-6">Accessibility Features</h2>
        <ul className="list-disc ml-6 space-y-2">
          <li>All buttons have accessible focus states that meet WCAG contrast requirements</li>
          <li>Icon-only buttons include aria-label for screen reader users</li>
          <li>Loading states are properly communicated to assistive technologies using <code className="px-1 py-0.5 bg-base-200 rounded">aria-busy</code> attribute</li>
          <li>Disabled states set both <code className="px-1 py-0.5 bg-base-200 rounded">disabled</code> and <code className="px-1 py-0.5 bg-base-200 rounded">aria-disabled</code> attributes</li>
          <li>Explicit <code className="px-1 py-0.5 bg-base-200 rounded">role="button"</code> for disabled buttons ensures consistent behavior across browsers</li>
          <li>ButtonLinks maintain proper semantics based on internal/external destinations</li>
          <li>Loading spinners have <code className="px-1 py-0.5 bg-base-200 rounded">aria-hidden="true"</code> to prevent duplicate announcements</li>
        </ul>
      </div>
    </PageContainer>
  );
} 