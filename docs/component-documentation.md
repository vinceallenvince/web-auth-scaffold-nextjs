# Component Documentation

This document provides detailed information about the components available in the application, their props, and usage examples.

## Authentication Components

### `AuthGuard`

**Description:** A server component that protects routes by checking authentication status. Redirects unauthenticated users to the specified path.

**Location:** `src/components/auth/auth-guard.tsx`

**Props:**
- `children: React.ReactNode` - Content to render if user is authenticated
- `redirectTo?: string` - Path to redirect to if user is not authenticated (default: "/auth/magic-link")

**Usage Example:**
```tsx
import { AuthGuard } from "@/components/auth/auth-guard";

export default function ProtectedPage() {
  return (
    <AuthGuard>
      <h1>Protected Content</h1>
      <p>This content is only visible to authenticated users</p>
    </AuthGuard>
  );
}
```

**Accessibility Notes:**
- Does not render any UI elements directly, so no specific accessibility concerns
- Ensures content is only shown to authorized users

### `AuthStatus`

**Description:** A client component that displays the current authentication status and provides login/logout buttons.

**Location:** `src/components/auth/auth-status.tsx`

**Props:** None

**Usage Example:**
```tsx
import { AuthStatus } from "@/components/auth/auth-status";

export default function Header() {
  return (
    <header>
      <nav>
        <div className="flex justify-between items-center">
          <h1>My App</h1>
          <AuthStatus />
        </div>
      </nav>
    </header>
  );
}
```

**Accessibility Notes:**
- Buttons have appropriate aria-labels
- Focus states are properly styled
- Color contrast meets WCAG 2.1 AA standards
- Loading state is clearly indicated

## UI Components

### DaisyUI Components

The application uses DaisyUI components with Tailwind CSS for styling. These components are accessible and responsive by default.

#### Button

**Usage Example:**
```tsx
<button className="btn btn-primary">Primary Button</button>
<button className="btn btn-secondary">Secondary Button</button>
<button className="btn btn-outline">Outline Button</button>
```

#### Form Components

**Usage Example:**
```tsx
<div className="form-control">
  <label className="label">
    <span className="label-text">Email</span>
  </label>
  <input 
    type="email" 
    placeholder="email@example.com" 
    className="input input-bordered" 
    required 
  />
</div>
```

#### Alert

**Usage Example:**
```tsx
<div className="alert alert-success">
  <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
  <span>Your purchase has been confirmed!</span>
</div>
```

## Custom Hooks

### `useAuth`

**Description:** A custom hook that provides authentication-related functionality using Auth.js.

**Location:** `src/lib/hooks/use-auth.ts`

**Returns:**
- `isAuthenticated: boolean` - Whether the user is authenticated
- `isLoading: boolean` - Whether the authentication state is loading
- `session: Session | null` - The current session data
- `login: () => void` - Function to redirect to login page
- `logout: () => void` - Function to sign out

**Usage Example:**
```tsx
'use client';
import { useAuth } from "@/lib/hooks/use-auth";

export default function ProfileButton() {
  const { isAuthenticated, isLoading, login, logout } = useAuth();

  if (isLoading) {
    return <span>Loading...</span>;
  }

  if (isAuthenticated) {
    return <button onClick={logout}>Sign Out</button>;
  }

  return <button onClick={login}>Sign In</button>;
}
```

## Layout Components

### Pages Layout

The main layout component wraps all pages in the application and provides a consistent structure.

**Location:** `src/app/layout.tsx`

**Features:**
- Global CSS imports
- Font optimization
- Authentication provider
- HTML metadata

**Usage:**
The layout is automatically applied to all pages in the application using Next.js App Router conventions.

## Best Practices for Component Development

1. **Keep Components Focused**: Each component should do one thing well
2. **Use TypeScript Properly**: Ensure all props are properly typed
3. **Ensure Accessibility**: All components should be accessible by default
4. **Document Props**: All props should be documented with clear descriptions
5. **Use Server and Client Components Properly**: 
   - Use server components by default
   - Add 'use client' directive only when needed
6. **Make Components Reusable**: Components should be designed for reuse
7. **Follow DaisyUI Conventions**: Use DaisyUI classes consistently
8. **Test Components**: All components should have appropriate tests

## Creating New Components

When creating new components:

1. Create the component in the appropriate directory under `src/components/`
2. Define proper TypeScript interfaces for props
3. Add JSDoc comments for documentation
4. Ensure the component is accessible
5. Add tests in the `__tests__` directory
6. Document the component in this documentation 