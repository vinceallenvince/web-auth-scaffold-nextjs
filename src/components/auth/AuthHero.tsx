"use client";

import React, { useEffect, useState } from 'react';

interface AuthHeroProps {
  className?: string;
  title?: string;
  description?: string;
}

function AuthHero({ 
  className = '',
  title = "Magic Link Authentication", 
  description = "Secure, passwordless login sent directly to your email"
}: AuthHeroProps) {
  const [isVisible, setIsVisible] = useState(false);

  // Animation effect when component mounts
  useEffect(() => {
    setIsVisible(true);
    return () => {
      setIsVisible(false);
    };
  }, []);

  return (
    <div className={`hero-content text-center lg:text-left ${className}`}>
      <div 
        className={`max-w-md transform transition-all duration-500 ease-in-out ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
        }`}
      >
        <h1 className="text-3xl font-bold mb-3">{title}</h1>
        <div className="space-y-4">
          <p className="py-2">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
}

export default AuthHero; 