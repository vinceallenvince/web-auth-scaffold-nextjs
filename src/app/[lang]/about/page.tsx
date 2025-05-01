import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Us',
  description: 'Learn about Web Auth Scaffold – a robust starting point for modern web authentication technologies.',
};

export default function AboutPage() {
  return (
    <main className="container ml-0 mr-auto py-12 max-w-5xl px-12 md:px-12 lg:px-12">
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
    </main>
  );
} 