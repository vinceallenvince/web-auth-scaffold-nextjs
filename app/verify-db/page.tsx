import { headers } from 'next/headers';

interface DbStatusResponse {
  success: boolean;
  status: string;
  message: string;
  nextSteps: string;
}

async function getDbStatus(): Promise<DbStatusResponse> {
  // Use a simpler approach to determine the base URL
  const baseUrl = process.env.NEXTAUTH_URL || 'http://localhost:3000';
  
  try {
    const res = await fetch(`${baseUrl}/api/verify-db`, {
      cache: 'no-store',
      next: { revalidate: 0 }
    });
    
    if (!res.ok) {
      throw new Error(`API returned ${res.status}: ${res.statusText}`);
    }
    
    return await res.json() as DbStatusResponse;
  } catch (error) {
    return {
      success: false,
      status: 'fetch_error',
      message: error instanceof Error ? error.message : 'Error fetching database status',
      nextSteps: 'Check if the server is running and the API route is implemented correctly'
    };
  }
}

export default async function VerifyDbPage() {
  const dbStatus = await getDbStatus();
  
  return (
    <div className="min-h-screen bg-base-200 py-12 px-4">
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl p-8">
        <h1 className="text-2xl font-bold mb-4">Database Verification Status</h1>
        
        <div className={`alert ${dbStatus.success ? 'alert-success' : 'alert-error'} mb-4`}>
          <div className="flex-1">
            <h2 className="font-bold">
              Status: {dbStatus.status.replace(/_/g, ' ').toUpperCase()}
            </h2>
            <p className="text-sm">{dbStatus.message}</p>
          </div>
        </div>
        
        <div className="mb-4">
          <h3 className="font-semibold mb-2">Next Steps:</h3>
          <p>{dbStatus.nextSteps}</p>
        </div>
        
        <div className="pt-4 border-t">
          <h3 className="font-semibold mb-2">Raw Response:</h3>
          <pre className="bg-gray-100 p-4 rounded overflow-auto text-xs">
            {JSON.stringify(dbStatus, null, 2)}
          </pre>
        </div>
        
        <div className="mt-6">
          <a 
            href="/" 
            className="underline text-blue-600 hover:text-blue-800"
            aria-label="Return to home page"
          >
            Back to Home
          </a>
        </div>
      </div>
    </div>
  );
} 