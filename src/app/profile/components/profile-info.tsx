"use client";

import React from "react";
import { User } from "next-auth";
import { format } from 'date-fns';
import { enUS } from 'date-fns/locale';

interface ProfileInfoProps {
  user: User;
  onEdit: () => void;
}

export function ProfileInfo({ user, onEdit }: ProfileInfoProps) {
  // Extract first character of email or name for avatar
  const avatarInitial = ((user?.name?.[0] || user?.email?.[0] || "?")).toUpperCase();
  
  // Get locale configuration for date formatting
  const userLocale = enUS;
  
  // Format join date if emailVerified exists
  const joinDate = user?.emailVerified 
    ? format(new Date(user.emailVerified), 'MMMM d, yyyy', { locale: userLocale })
    : 'Not available';

  return (
    <div>
      <div className="flex flex-col md:flex-row items-start gap-6">
        {/* Avatar */}
        <div className="avatar placeholder self-start">
          <div className="bg-neutral text-neutral-content rounded-full w-24 h-24 flex items-center justify-center">
            <span className="text-3xl">{avatarInitial}</span>
          </div>
        </div>
        
        {/* Profile Information */}
        <div className="flex-1 text-left">
          <h2 className="card-title text-2xl mb-4">{user.name || user.email}</h2>
          
          <div className="space-y-2">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
              <span className="font-medium text-gray-600">Email:</span>
              <span className="md:col-span-2">{user.email}</span>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
              <span className="font-medium text-gray-600">First login:</span>
              <span className="md:col-span-2">{joinDate}</span>
            </div>
          </div>
          
          <div className="mt-6">
            <button 
              onClick={onEdit}
              className="btn btn-primary"
              aria-label="Edit profile"
            >
              Edit Profile
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 