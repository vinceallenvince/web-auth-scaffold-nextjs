import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { middleware } from '@/middleware';

// We need to mock next/server first, before importing middleware
vi.mock('next/server', () => {
  return {
    NextRequest: vi.fn().mockImplementation((url) => ({
      nextUrl: url,
      headers: new Headers()
    })),
    NextResponse: {
      next: vi.fn().mockImplementation((options) => ({
        ...options,
        cookies: {
          set: vi.fn()
        }
      }))
    }
  };
});

// Import these after the mock is set up
import { NextRequest, NextResponse } from 'next/server';

describe('Middleware', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should add pathname to headers', () => {
    // Arrange
    const url = new URL('http://localhost:3000/test-path');
    const request = {
      nextUrl: url,
      headers: new Headers(),
      cookies: {
        get: vi.fn().mockReturnValue(null)
      }
    } as unknown as NextRequest;
    
    // Act
    const response = middleware(request);
    
    // Assert
    expect(NextResponse.next).toHaveBeenCalled();
    const options = (NextResponse.next as any).mock.calls[0][0];
    expect(options.request.headers.get('x-pathname')).toBe('/test-path');
  });

  it('should add protocol to headers', () => {
    // Arrange
    const url = new URL('http://localhost:3000/');
    const request = {
      nextUrl: url,
      headers: new Headers(),
      cookies: {
        get: vi.fn().mockReturnValue(null)
      }
    } as unknown as NextRequest;
    
    // Act
    const response = middleware(request);
    
    // Assert
    expect(NextResponse.next).toHaveBeenCalled();
    const options = (NextResponse.next as any).mock.calls[0][0];
    expect(options.request.headers.get('x-forwarded-proto')).toBe('http');
  });

  it('should handle https protocol', () => {
    // Arrange
    const url = new URL('https://localhost:3000/');
    const request = {
      nextUrl: url,
      headers: new Headers(),
      cookies: {
        get: vi.fn().mockReturnValue(null)
      }
    } as unknown as NextRequest;
    
    // Act
    const response = middleware(request);
    
    // Assert
    expect(NextResponse.next).toHaveBeenCalled();
    const options = (NextResponse.next as any).mock.calls[0][0];
    expect(options.request.headers.get('x-forwarded-proto')).toBe('https');
  });
}); 