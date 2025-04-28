import { z } from "zod";

// Define validation schema for profile update
export const profileUpdateSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(50, "Name must be less than 50 characters").optional(),
  email: z.string().email("Invalid email address").max(255, "Email must be less than 255 characters").optional(),
});

// Types exported for reuse
export type ProfileUpdateRequest = z.infer<typeof profileUpdateSchema>;

export type ProfileUpdateResponse = {
  success: boolean;
  error?: string;
  errorCode?: string;
}; 