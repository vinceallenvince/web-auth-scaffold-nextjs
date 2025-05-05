import React from 'react';
import { ThemeToggle } from '@/components/ui/theme-toggle';
import { PageContainer } from '@/components/ui/layout';

export default function DaisyUIExamplesPage() {
  return (
    <PageContainer>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">DaisyUI Components</h1>
        <ThemeToggle />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Card Component */}
        <div className="card-custom">
          <div className="card-body">
            <h2 className="card-title">Card Component</h2>
            <p>This is a standard DaisyUI card component with custom styling.</p>
            <div className="card-actions justify-end mt-4">
              <button className="btn btn-primary">Action</button>
            </div>
          </div>
        </div>
        
        {/* Button Variants */}
        <div className="card bg-base-100 shadow-md">
          <div className="card-body">
            <h2 className="card-title">Button Variants</h2>
            <div className="flex flex-col gap-3">
              <button className="btn btn-primary">Primary Button</button>
              <button className="btn btn-secondary">Secondary Button</button>
              <button className="btn btn-accent">Accent Button</button>
              <button className="custom-btn-primary">Custom Primary</button>
              <button className="custom-btn-secondary">Custom Secondary</button>
            </div>
          </div>
        </div>
        
        {/* Alert Components */}
        <div className="card bg-base-100 shadow-md">
          <div className="card-body">
            <h2 className="card-title">Alert Components</h2>
            <div className="flex flex-col gap-3">
              <div className="alert alert-info">
                <span>Info message</span>
              </div>
              <div className="alert alert-success">
                <span>Success message</span>
              </div>
              <div className="alert alert-warning">
                <span>Warning message</span>
              </div>
              <div className="alert alert-error">
                <span>Error message</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Form Elements */}
        <div className="card bg-base-100 shadow-md">
          <div className="card-body">
            <h2 className="card-title">Form Elements</h2>
            <form className="flex flex-col gap-4">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input type="email" placeholder="email@example.com" className="input input-bordered" />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input type="password" placeholder="password" className="input input-bordered" />
              </div>
              <div className="form-control">
                <label className="label cursor-pointer">
                  <span className="label-text">Remember me</span>
                  <input type="checkbox" className="checkbox" />
                </label>
              </div>
              <button className="btn btn-primary">Submit</button>
            </form>
          </div>
        </div>
        
        {/* Badges */}
        <div className="card bg-base-100 shadow-md">
          <div className="card-body">
            <h2 className="card-title">Badges</h2>
            <div className="flex flex-wrap gap-2">
              <span className="badge">Default</span>
              <span className="badge badge-primary">Primary</span>
              <span className="badge badge-secondary">Secondary</span>
              <span className="badge badge-accent">Accent</span>
              <span className="badge badge-outline">Outline</span>
              <span className="badge badge-lg">Large</span>
              <span className="badge badge-sm">Small</span>
            </div>
          </div>
        </div>
        
        {/* Typography */}
        <div className="card bg-base-100 shadow-md">
          <div className="card-body">
            <h2 className="card-title">Typography</h2>
            <div className="flex flex-col gap-2">
              <h1 className="text-4xl font-bold">Heading 1</h1>
              <h2 className="text-3xl font-bold">Heading 2</h2>
              <h3 className="text-2xl font-bold">Heading 3</h3>
              <p className="text-base">Regular paragraph text</p>
              <p className="text-sm text-opacity-70">Small secondary text</p>
            </div>
          </div>
        </div>
      </div>
    </PageContainer>
  );
} 