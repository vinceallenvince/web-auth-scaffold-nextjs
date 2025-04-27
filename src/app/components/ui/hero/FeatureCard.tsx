import React from 'react';

export interface FeatureCardProps {
  title: string;
  description: string;
}

/**
 * FeatureCard component for displaying feature information in a card format
 * 
 * @param title - The feature title
 * @param description - The feature description
 */
export function FeatureCard({ title, description }: FeatureCardProps) {
  return (
    <div className="card bg-base-100 border border-base-300">
      <div className="card-body">
        <h3 className="card-title text-lg font-semibold text-primary">{title}</h3>
        <p className="text-base-content/70">{description}</p>
      </div>
    </div>
  );
}

export default FeatureCard; 