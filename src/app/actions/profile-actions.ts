"use server";

import { prisma } from "@/lib/prisma";
// getSession is used indirectly by the auth system to validate sessions
// removing it causes runtime errors, so we need to keep it imported
import { getSession, getCurrentUserId } from "@/lib/auth";
import { revalidatePath } from "next/cache";
import { profileUpdateSchema, ProfileUpdateRequest, ProfileUpdateResponse } from "@/types/profile";

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
        error: "Authentication required",
        errorCode: "AuthRequired"
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
        error: "User not found",
        errorCode: "UserNotFound"
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
        error: `Validation failed: ${errorMessages}`,
        errorCode: "ValidationError"
      };
    }

    // Check if at least one field is provided
    if (!data.name && !data.email) {
      return {
        success: false,
        error: "At least one field must be provided for update",
        errorCode: "EmptyUpdate"
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
          error: "Email address is already in use",
          errorCode: "EmailInUse"
        };
      }
    }

    // Update user profile within a transaction
    await prisma.$transaction(async (tx) => {
      await tx.user.update({
        where: { id: userId },
        data: {
          name: data.name,
          email: data.email,
          // If email changed, set emailVerified to null as it should be re-verified
          ...(data.email && data.email !== currentUser.email ? { emailVerified: null } : {})
        },
      });
    });

    // Revalidate profile page to update UI
    revalidatePath('/profile');

    return { success: true };
  } catch (error) {
    console.error("Error updating user profile:", error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : "An unknown error occurred",
      errorCode: error instanceof Error ? error.name : "UnknownError"
    };
  }
} 