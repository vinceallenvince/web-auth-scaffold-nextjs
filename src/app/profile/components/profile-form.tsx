"use client";

import React, { useState } from "react";
import { User } from "next-auth";
import { useToast } from "@/app/providers/toast-provider";
import { updateUserProfile } from "@/app/actions/profile-actions";
import { FormField, Input } from "@/components/ui/form";
import { validate, required, minLength, maxLength, email, Validator } from "@/lib/form-validation";
import { ProfileUpdateRequest } from "@/types/profile";

interface ProfileFormProps {
  user: User;
  onCancel: () => void;
  onSuccess: () => void;
}

// Use the type from the shared schema
type FormState = ProfileUpdateRequest;

export function ProfileForm({ user, onCancel, onSuccess }: ProfileFormProps) {
  const { addToast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Initialize form state with current user data
  const [formState, setFormState] = useState<FormState>({
    name: user.name || "",
    email: user.email || "",
  });
  
  const [errors, setErrors] = useState<Record<string, string | undefined>>({});

  const handleChange = (field: keyof FormState, value: string) => {
    setFormState((prev) => ({ ...prev, [field]: value }));
    
    // Clear error for this field when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const validateField = (field: keyof FormState, value: string, validators: Validator[]) => {
    const result = validate(value, validators);
    return result.errorMessage;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate all fields
    const newErrors: Record<string, string | undefined> = {
      name: validateField('name', formState.name || "", [minLength(2), maxLength(50)]),
      email: validateField('email', formState.email || "", [required(), email(), maxLength(255)]),
    };
    
    setErrors(newErrors);
    
    // Check if there are any errors
    const hasErrors = Object.values(newErrors).some(error => error !== undefined);
    
    if (!hasErrors) {
      try {
        setIsSubmitting(true);
        
        // Call server action to update profile
        const result = await updateUserProfile({
          name: formState.name,
          email: formState.email,
        });
        
        if (result.success) {
          addToast("Profile updated successfully", "success");
          onSuccess();
        } else {
          // Enhanced error handling using errorCode
          const errorMessage = getErrorMessage(result.errorCode, result.error);
          addToast(errorMessage, "error");
        }
      } catch (error) {
        addToast(`An error occurred while updating your profile`, "error");
        console.error("Profile update error:", error);
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  // Helper function to get user-friendly error messages based on error code
  const getErrorMessage = (errorCode?: string, fallbackMessage?: string): string => {
    if (!errorCode) return fallbackMessage || "An unknown error occurred";
    
    switch (errorCode) {
      case "EmailInUse":
        return "This email address is already being used by another account.";
      case "ValidationError":
        return fallbackMessage || "Please check your information and try again.";
      case "EmptyUpdate":
        return "Please provide at least one field to update.";
      case "AuthRequired":
        return "You need to be signed in to update your profile.";
      default:
        return fallbackMessage || "An error occurred while updating your profile.";
    }
  };

  return (
    <div>
      <h2 className="card-title text-2xl mb-4">Edit Profile</h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <FormField
          label="Display Name"
          error={errors.name}
          id="name-field"
        >
          <Input
            id="name-field"
            placeholder="Your name"
            value={formState.name}
            onChange={(e) => handleChange('name', e.target.value)}
            error={!!errors.name}
            autoFocus
          />
        </FormField>
        
        <FormField
          label="Email Address"
          error={errors.email}
          required
          id="email-field"
        >
          <Input
            id="email-field"
            type="email"
            placeholder="you@example.com"
            value={formState.email}
            onChange={(e) => handleChange('email', e.target.value)}
            error={!!errors.email}
          />
        </FormField>
        
        <div className="flex gap-3 justify-end mt-6">
          <button 
            type="button" 
            className="btn btn-outline"
            onClick={onCancel}
            disabled={isSubmitting}
          >
            Cancel
          </button>
          <button 
            type="submit" 
            className="btn btn-primary"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <span className="loading loading-spinner loading-xs"></span>
                Saving...
              </>
            ) : 'Save Changes'}
          </button>
        </div>
      </form>
    </div>
  );
} 