import Link from 'next/link';

export default function ComponentsDemoPage() {
  return (
    <div className="mx-auto max-w-4xl p-6">
      <h1 className="text-3xl font-bold mb-6">Component Library Demo</h1>
      
      <p className="mb-8">
        Welcome to the component library demo. This section showcases the various reusable UI components
        available in the application. Click on any category below to explore the components.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ComponentCard
          title="Form Components"
          description="Input, Select, Checkbox, Radio, Textarea and more form-related components"
          href="/components-demo/form"
        />
        
        {/* Add more component categories as they are implemented */}
      </div>
    </div>
  );
}

function ComponentCard({ 
  title, 
  description, 
  href 
}: { 
  title: string; 
  description: string; 
  href: string 
}) {
  return (
    <Link 
      href={href}
      className="block p-6 border rounded-xl hover:shadow-md transition-shadow"
    >
      <h2 className="text-xl font-semibold mb-2">{title}</h2>
      <p className="text-base-content/70">{description}</p>
    </Link>
  );
} 