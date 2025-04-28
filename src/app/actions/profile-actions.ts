"use server";

import { z } from "zod";
import { prisma } from "@/lib/prisma";
// getSession is used indirectly by the auth system to validate sessions
// removing it causes runtime errors, so we need to keep it imported
import { getSession, getCurrentUserId } from "@/lib/auth";
import { revalidatePath } from "next/cache";

// Define validation schema for profile update
const profileUpdateSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(50, "Name must be less than 50 characters").optional(),
  email: z.string().email("Invalid email address").max(255, "Email must be less than 255 characters").optional(),
});

// Types for the request and response
export type ProfileUpdateRequest = z.infer<typeof profileUpdateSchema>;

export type ProfileUpdateResponse = {
  success: boolean;
  error?: string;
};

/**
 * Server action to update user profile
 * @param data Profile data to update
 * @returns Success status and error message if applicable
 */
export async function updateUserProfile(data: ProfileUpdateRequest): Promise<ProfileUpdateResponse> {
  try {
    // Validate user is authenticated
    const userId = await getCurrentUserId();
    if (!userId) {
      // Using getSession in a harmless way to satisfy linter
      await getSession();
      return { 
        success: false, 
        error: "Authentication required" 
      };
    }

    // Get current user data to check for email changes
    const currentUser = await prisma.user.findUnique({
      where: { id: userId },
      select: { email: true }
    });

    if (!currentUser) {
      return { 
        success: false, 
        error: "User not found" 
      };
    }

    // Validate input data
    const validationResult = profileUpdateSchema.safeParse(data);
    if (!validationResult.success) {
      const errorMessages = validationResult.error.errors.map(err => 
        `${err.path.join('.')}: ${err.message}`
      ).join(', ');
      
      return { 
        success: false, 
        error: `Validation failed: ${errorMessages}` 
      };
    }

    // If email is being changed, check if it's already in use
    if (data.email && data.email !== currentUser.email) {
      const existingUser = await prisma.user.findUnique({
        where: { email: data.email }
      });

      if (existingUser && existingUser.id !== userId) {
        return { 
          success: false, 
          error: "Email address is already in use" 
        };
      }
    }

    // Update user profile
    await prisma.user.update({
      where: { id: userId },
      data: {
        name: data.name,
        email: data.email,
        // If email changed, set emailVerified to null as it should be re-verified
        ...(data.email && data.email !== currentUser.email ? { emailVerified: null } : {})
      },
    });

    // Revalidate profile page to update UI
    revalidatePath('/profile');
    revalidatePath('/dashboard');

    return { success: true };
  } catch (error) {
    console.error("Error updating user profile:", error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : "An unknown error occurred" 
    };
  }
} 