"use client";

import React, { useState } from "react";
import { Session } from "next-auth";
import { ProfileForm } from "./profile-form";
import { ProfileInfo } from "./profile-info";

interface ProfileCardProps {
  session: Session | null;
}

export function ProfileCard({ session }: ProfileCardProps) {
  const [isEditing, setIsEditing] = useState(false);
  
  if (!session?.user) {
    return (
      <div className="card bg-base-200">
        <div className="card-body">
          <h2 className="card-title">Profile not available</h2>
          <p>Unable to load profile information.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="card bg-base-200">
      <div className="card-body">
        {isEditing ? (
          <ProfileForm 
            user={session.user} 
            onCancel={() => setIsEditing(false)} 
            onSuccess={() => setIsEditing(false)}
          />
        ) : (
          <ProfileInfo 
            user={session.user}
            onEdit={() => setIsEditing(true)}
          />
        )}
      </div>
    </div>
  );
} 