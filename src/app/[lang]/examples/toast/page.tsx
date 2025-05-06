'use client';

import React from 'react';
import { useToast } from '@/app/providers/toast-provider';
import { PageContainer } from '@/components/ui/layout';

export default function TestToastPage() {
  const { addToast } = useToast();
  
  const showSuccessToast = () => {
    addToast('This is a success toast', 'success');
  };
  
  const showErrorToast = () => {
    addToast('This is an error toast', 'error');
  };
  
  const showInfoToast = () => {
    addToast('This is an info toast', 'info');
  };
  
  return (
    <PageContainer>
      <h1 className="text-2xl font-bold mb-6">Toast Component Test</h1>
      
      <div className="flex flex-col gap-4">
        <button onClick={showSuccessToast} className="btn btn-success">
          Show Success Toast
        </button>
        
        <button onClick={showErrorToast} className="btn btn-error">
          Show Error Toast
        </button>
        
        <button onClick={showInfoToast} className="btn btn-info">
          Show Info Toast
        </button>
      </div>
    </PageContainer>
  );
} 