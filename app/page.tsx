export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-center text-sm flex flex-col">
        <h1 className="text-4xl font-bold mb-8">Web Auth Scaffold NextJS</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-3xl">
          <a
            href="/verify-db"
            className="group rounded-lg border border-gray-300 px-5 py-4 transition-colors hover:border-gray-400 hover:bg-gray-100"
            aria-label="Check database configuration"
          >
            <h2 className="mb-3 text-2xl font-semibold">
              Database Verification{' '}
              <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
                →
              </span>
            </h2>
            <p className="m-0 text-sm opacity-75">
              Verify your database configuration is set up correctly. Amazing!
            </p>
          </a>

          <div
            className="group rounded-lg border border-gray-300 px-5 py-4 transition-colors hover:border-gray-400 hover:bg-gray-100"
          >
            <h2 className="mb-3 text-2xl font-semibold">
              Development Status
            </h2>
            <p className="m-0 text-sm opacity-75">
              SETUP-04: Local Development Verification
            </p>
          </div>
        </div>
        
        <div className="mt-16">
          <p className="text-center text-gray-500">
            Next steps: DB-01 Supabase Project Setup
          </p>
        </div>
      </div>
    </main>
  );
} 