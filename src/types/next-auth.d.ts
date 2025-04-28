import { DefaultSession } from "next-auth";

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: {
      /** The user's unique identifier */
      id: string;
    } & DefaultSession["user"];
  }

  /**
   * Extended User type to include additional fields from the database
   */
  interface User {
    /** The date when user's email was verified */
    emailVerified?: Date | null;
  }
} 