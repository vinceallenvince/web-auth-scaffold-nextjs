import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact Us',
  description: 'Contact us for support or feedback about the Web Auth Scaffold project.',
};

export default function ContactPage() {
  return (
    <main className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-6">Contact Us</h1>
      <div className="prose max-w-none">
        <p className="mb-4">
          We'd love to hear from you! If you have any questions or feedback 
          about the Web Auth Scaffold project, please feel free to reach out.
        </p>
        
        <section className="mt-8 mb-8" aria-labelledby="contact-methods">
          <h2 id="contact-methods" className="text-2xl font-bold mb-4">Get in Touch</h2>
          <ul className="list-disc pl-6 mb-4">
            <li>Email: <a href="mailto:example@example.com" className="link">example@example.com</a></li>
            <li>GitHub: <a href="https://github.com/example/repo" className="link" target="_blank" rel="noopener noreferrer">github.com/example/repo</a></li>
            <li>Twitter: <a href="https://twitter.com/example" className="link" target="_blank" rel="noopener noreferrer">@example</a></li>
          </ul>
        </section>
      </div>
    </main>
  );
} 