# Core Specs

This app is a modern web authentication scaffold with OTP and Magic Link authentication options. Use it as a starter app to build more feature-rich web applications.

## Authentication

* **Authentication Strategy**: The app supports magic link authentication:
  * **Magic Link**: Email-based authentication using a secure link containing a token sent via SendGrid API
* **Magic Link Expiration**: Magic links expire after 30 minutes
* **Rate Limiting**: The app limits authentication requests to 20 per day and blocks further requests for 24 hours after reaching the limit
* **Error UX**: The app provides user-friendly error messages for invalid or expired magic links
* **Non-authenticated content**: Non-authenticated users can access content on the home page but do not have access to protected routes
* **Login UX**: The app redirects the user to the home page upon successful login
* **Session Duration**: User sessions expire after 24 hours of inactivity

## UI/UX Details

* **Layout**: The app uses a card-based layout for content organization across various pages
* **Navigation**: The app uses a simple naviation menu with links to the various features
* **Localization**: The app supports localized text. Note, a language selection UI should only appear there's at least one language provided
* **Theme Configuration**: The app implements user-facing light and dark theme switching
* **Responsive Design**: The UI is fully responsive with tailored layouts for mobile, tablet, and desktop viewports:
  * Mobile-first approach with progressive enhancement for larger screens
  * Grid layouts adapt from single column (mobile) to multi-column (tablet/desktop)
  * Sidebar collapses to a mobile drawer on smaller screens
  * Text elements adjust visibility based on screen size (e.g., labels visible on desktop, icons only on mobile)
* **Accessibility Features**:
  * Semantic HTML structure with proper ARIA attributes throughout the application
  * Screen reader support with sr-only classes for visual elements
  * Keyboard navigation support with appropriate focus management
  * Forms include proper labeling and error states with descriptive messages
  * Color contrast ratios comply with WCAG standards
* **Component System**: The app uses a comprehensive UI component library:
  * Consistent styling patterns across all interactive elements
  * Modular components with variants for different use cases
  * Form validation with clear error states and guidance
* **Toast Notification System**: Toast notifications provide user feedback for:
  * Authentication events (success/failure)
  * Form submission confirmations
  * Error messages
  * System status updates
* **Loading States**: The application implements meaningful loading states:
  * Skeleton loaders for content areas during data fetching
  * Spinner indicators for button actions

## Content

* **Content Structure**: The app organizes content using a card-based layout across various pages
* **Public Content**: Non-authenticated users can view general information on the home page, about page, and contact page
* **Protected Content**: Authenticated users gain access to profile management and other protected routes
* **Role-based Content**: Admin users have access to additional administrative features including user management
* **Content Sections**:
  * **Home Page**: Features welcome messages with different content for authenticated and non-authenticated users
  * **About Page**: Contains general information about the application and its purpose
  * **Contact Page**: Provides contact information for users to reach out
  * **Profile Page**: Allows authenticated users to manage their personal information
  * **Admin Page**: Enables administrators to manage users, including approving admin access and deleting users
* **Localized Content**: All user-facing content is available in multiple languages through the i18n system

## User Stories

### Authentication Journey

1. **First-time Visitor**
   * As a new user, I want to access the home page without logging in so that I can learn about the application before committing.
   * As a new user, I want to easily find and click the sign-up/login button so that I can begin the authentication process.

2. **Authentication Process**   
    * As a user, I want to enter my email address to receive a magic link so that I can authenticate with a single click.
    * As a user, I want to receive a clear confirmation that a magic link has been sent to my email so that I know to check my inbox.
    * As a user, I want to simply click the magic link in my email to authenticate without entering any codes.
    * As a user, I want to see a clear verification status when the magic link is being processed.
    * As a user, I want to be automatically redirected to the home page after successful authentication so that I can begin using the application.
    * As a user, I want to be properly redirected to login when trying to access protected content
    * As a user, I want to receive toast notifications confirming successful or failed authentication so that I immediately understand the outcome.
    

3. **Error Handling**
   * **Magic Link Authentication**:
     * As a user, I want to receive a clear error message if my magic link is invalid or expired so that I can request a new one.
     * As a user, I want to be notified if I've reached the magic link request limit so that I understand why I cannot request more links.
     * As a user, I want to see clear error messages during magic link verification if any problems occur with the authentication process.
   * **Common Error Handling**:
     * As a user, I want to be notified if there are any server or connectivity issues during the authentication process so that I can try again later.
     * As a user, I want explicit recovery actions provided when I encounter authentication errors, such as buttons to "Try Different Email", "Resend Magic Link", "Back to Login", or "Change Email".

4. **Returning User**
   * As a returning user, I want to easily log in so that I can access my protected content.
   * As a returning user, I want the system to remember my language preference so that I don't have to reselect it each time.

### Content Access Journey

1. **Public Content**
   * As a non-authenticated user, I want to browse public content on the home page so that I can decide if I want to sign up.
   * As a non-authenticated user, I want to clearly see which features require authentication so that I know what I'm missing.

2. **Protected Content**
   * As an authenticated user, I want to access protected routes and content so that I can use the full features of the application.
   * As an authenticated user, I want to easily navigate between different protected sections of the app so that I can efficiently use all features.

### Localization Journey

1. **Language Selection**
   * As a user, I want to select my preferred language when multiple languages are available so that I can use the app in my native language.
   * As a user, I want the language selection UI to be intuitive and accessible so that I can easily change languages if needed.

2. **Localized Experience**
   * As a non-native English speaker, I want all critical application texts to be properly translated so that I can fully understand and use the application.
   * As a user with accessibility needs, I want the localized content to maintain proper accessibility standards so that I can use the application regardless of my language preference.

### Session Management

1. **Session Expiration**
   * As a user, I understand that my session will automatically expire after 24 hours of inactivity as configured in the server.
   * As a user, I want to be securely logged out after a period of inactivity to protect my account.

2. **Logout**
   * As a user, I want to easily find and use the logout button so that I can securely end my session when finished.
   * As a user, I want confirmation that I've successfully logged out so that I know my session is secure.

### General Development

1. * As a developer, I should be able to run this application locally with full database functionality
2. * As a developer, when I'm running the application locally and enter my email address in the magic link auth flow, I want to retrieve the magic link from the logs rather than my email
3. * As a developer, when I run tests, I want to group them by database, server and client and run them separately and sequentially
4. * As a developer, I should be able to see example pages for styling themes and components like cards and forms

### Authentication Development
* As a developer, I want to run automated tests for authentication flows to ensure the magic link authentication works correctly
* As a developer, I want to verify that protected routes properly restrict access to unauthenticated users
* As a developer, I want to ensure rate limiting for authentication requests functions as specified




