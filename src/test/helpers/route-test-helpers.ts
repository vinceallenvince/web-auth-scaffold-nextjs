import { vi } from 'vitest';
import { NextRequest, NextResponse } from 'next/server';
import { headers } from 'next/headers';

// Mock next/headers
vi.mock('next/headers', () => ({
  headers: vi.fn(() => new Map()),
}));

/**
 * Creates a mock NextRequest object for testing route handlers
 * 
 * @param path The URL path
 * @param method The HTTP method
 * @param body Optional request body
 * @returns A mocked NextRequest object
 */
export function createMockRequest(
  path: string,
  method: string = 'GET',
  body?: any
): NextRequest {
  const url = new URL(`http://localhost:3000${path}`);
  
  return {
    url,
    method,
    nextUrl: url,
    headers: new Headers(),
    cookies: {
      get: vi.fn(),
      getAll: vi.fn(),
      set: vi.fn(),
      delete: vi.fn(),
      has: vi.fn(),
      clear: vi.fn(),
      toString: vi.fn(),
    },
    body: body ? JSON.stringify(body) : null,
    json: vi.fn().mockResolvedValue(body || {}),
    formData: vi.fn(),
    text: vi.fn(),
    arrayBuffer: vi.fn(),
    blob: vi.fn(),
  } as unknown as NextRequest;
}

/**
 * Helper function to mock the Next.js headers function
 * 
 * @param headersToSet Headers to set in the mock
 */
export function mockRequestHeaders(headersToSet: Record<string, string>) {
  const headerMap = new Map();
  
  for (const [key, value] of Object.entries(headersToSet)) {
    headerMap.set(key, value);
  }
  
  (headers as any).mockReturnValue(headerMap);
}

/**
 * Extracts JSON response from a NextResponse object
 * 
 * @param response The NextResponse to extract JSON from
 * @returns The parsed JSON data
 */
export async function extractResponseJson(response: NextResponse): Promise<any> {
  return await response.json();
}

/**
 * Reset all route testing mocks
 */
export function resetRouteMocks() {
  (headers as any).mockReset();
} 