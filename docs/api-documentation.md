# API Documentation

This document provides comprehensive documentation for all API endpoints available in the application. These endpoints are implemented using Next.js API routes and server actions.

## Authentication API

All authentication endpoints are handled by Auth.js (formerly NextAuth.js) and are available under the `/api/auth` route.

### Magic Link Authentication

#### `POST /api/auth/signin/email`

**Description:** Sends a magic link to the specified email address.

**Request Body:**
```json
{
  "email": "user@example.com",
  "csrfToken": "token",
  "callbackUrl": "/dashboard"
}
```

**Response:**
- `200 OK`: Magic link has been sent
- `400 Bad Request`: Invalid email or missing required fields
- `429 Too Many Requests`: Rate limiting applied (multiple requests in short period)
- `500 Internal Server Error`: Server error

**Notes:**
- Magic links expire after 10 minutes
- In development, magic links are logged to the console and to `logs/magic-links.log`
- In production, magic links are sent via Resend email service

#### `GET /api/auth/session`

**Description:** Returns the current session data if the user is authenticated.

**Response:**
- `200 OK`: Returns session data if authenticated
  ```json
  {
    "user": {
      "id": "user_id",
      "email": "user@example.com",
      "name": "User Name",
      "image": "user_image_url"
    },
    "expires": "2023-12-31T23:59:59.999Z"
  }
  ```
- `401 Unauthorized`: No active session

#### `POST /api/auth/signout`

**Description:** Signs out the current user.

**Response:**
- `200 OK`: User signed out successfully
- `401 Unauthorized`: No active session to sign out

### Email Debug Endpoint

#### `GET /api/auth/debug-email` (Development only)

**Description:** Provides a way to test email templates in development.

**Response:**
- `200 OK`: Returns a rendered version of the email template
- `500 Internal Server Error`: Error rendering template

**Note:** This endpoint is only available in development mode.

## Database Verification

### `GET /api/verify-db`

**Description:** Checks if the database connection is working correctly.

**Response:**
- `200 OK`: Database connection successful
  ```json
  {
    "status": "ok",
    "message": "Database connection successful",
    "timestamp": "2023-06-01T12:00:00Z"
  }
  ```
- `500 Internal Server Error`: Database connection failed
  ```json
  {
    "status": "error",
    "message": "Failed to connect to database",
    "error": "Error details"
  }
  ```

## Server Actions

Server actions are implemented using Next.js server components and provide a way to perform server-side operations from client components.

### Authentication Actions

#### `sendMagicLink(formData: FormData)`

**Location:** `/src/app/auth/magic-link/actions.ts`

**Description:** Server action to send a magic link to the provided email address.

**Parameters:**
- `formData`: Form data containing the email address

**Returns:**
- `{ success: true }`: Magic link sent successfully
- `{ success: false, error: string }`: Error sending magic link

**Usage Example:**
```tsx
'use client';
import { sendMagicLink } from './actions';

export default function MagicLinkForm() {
  return (
    <form action={sendMagicLink}>
      <input type="email" name="email" required />
      <button type="submit">Send Magic Link</button>
    </form>
  );
}
```

## Error Handling

All API endpoints follow consistent error handling patterns:

1. **Authentication Errors**: Return 401 Unauthorized
2. **Validation Errors**: Return 400 Bad Request with validation details
3. **Server Errors**: Return 500 Internal Server Error with error message
4. **Rate Limiting**: Return 429 Too Many Requests when limits are exceeded

## Security Considerations

- All endpoints use CSRF protection provided by Auth.js
- Session data is stored in a secure cookie or database
- Rate limiting is applied to authentication endpoints
- Error messages are intentionally vague to prevent information disclosure
- All API routes should be thoroughly tested for security vulnerabilities

## Testing API Endpoints

To test API endpoints, you can use the built-in testing framework:

```bash
# Test API routes related to authentication
npm run test:auth

# Test API routes related to database operations
npm run test:db

# Test all API endpoints
npm test
```

For manual testing, you can use tools like Postman or fetch directly from the browser console:

```javascript
// Example: Fetching the current session
fetch('/api/auth/session')
  .then(res => res.json())
  .then(data => console.log(data))
  .catch(err => console.error(err));
``` 