export default function AboutPage() {
  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-6">About Us</h1>
      <div className="prose max-w-none">
        <p className="mb-4">
          Welcome to the Web Auth Scaffold application. This project demonstrates 
          a modern web authentication system built with Next.js and Auth.js.
        </p>
        <p className="mb-4">
          Our application uses magic link authentication to provide a secure, 
          passwordless login experience. This approach eliminates the need for users 
          to remember passwords while maintaining strong security.
        </p>
        <h2 className="text-2xl font-bold mt-8 mb-4">Our Mission</h2>
        <p className="mb-4">
          Our mission is to provide developers with a robust starting point for 
          building secure web applications with modern authentication patterns.
        </p>
      </div>
    </div>
  );
} 