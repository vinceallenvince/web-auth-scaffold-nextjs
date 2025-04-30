import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { middleware } from '@/middleware';
import { locales } from '@/constants/i18n';

// We need to mock next/server first, before importing middleware
vi.mock('next/server', () => {
  return {
    NextRequest: vi.fn().mockImplementation((url) => ({
      nextUrl: url,
      url: url.href || url,
      headers: new Headers()
    })),
    NextResponse: {
      next: vi.fn().mockImplementation((options) => options),
      redirect: vi.fn().mockImplementation((url) => ({ url }))
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

  describe('Locale redirection', () => {
    it('should redirect to default locale when no locale is in the URL', () => {
      // Arrange
      const url = new URL('http://localhost:3000/some-path');
      const request = {
        nextUrl: url,
        url: 'http://localhost:3000/some-path',
        headers: new Headers()
      } as NextRequest;
      
      // Act
      middleware(request);
      
      // Assert
      expect(NextResponse.redirect).toHaveBeenCalled();
      const redirectUrl = (NextResponse.redirect as any).mock.calls[0][0];
      expect(redirectUrl.pathname).toBe('/en/some-path');
    });

    it('should preserve http protocol in redirects', () => {
      // Arrange
      const url = new URL('http://localhost:3000/about');
      const request = {
        nextUrl: url,
        url: 'http://localhost:3000/about',
        headers: new Headers()
      } as NextRequest;
      
      // Act
      middleware(request);
      
      // Assert
      expect(NextResponse.redirect).toHaveBeenCalled();
      const redirectUrl = (NextResponse.redirect as any).mock.calls[0][0];
      expect(redirectUrl.protocol).toBe('http:');
    });

    it('should preserve https protocol in redirects', () => {
      // Arrange
      const url = new URL('https://localhost:3000/contact');
      const request = {
        nextUrl: url,
        url: 'https://localhost:3000/contact',
        headers: new Headers()
      } as NextRequest;
      
      // Act
      middleware(request);
      
      // Assert
      expect(NextResponse.redirect).toHaveBeenCalled();
      const redirectUrl = (NextResponse.redirect as any).mock.calls[0][0];
      expect(redirectUrl.protocol).toBe('https:');
    });

    it('should preserve query parameters during redirection', () => {
      // Arrange
      const url = new URL('http://localhost:3000/search?q=test&page=2');
      const request = {
        nextUrl: url,
        url: 'http://localhost:3000/search?q=test&page=2',
        headers: new Headers()
      } as NextRequest;
      
      // Act
      middleware(request);
      
      // Assert
      expect(NextResponse.redirect).toHaveBeenCalled();
      const redirectUrl = (NextResponse.redirect as any).mock.calls[0][0];
      expect(redirectUrl.pathname).toBe('/en/search');
      expect(redirectUrl.search).toBe('?q=test&page=2');
    });

    it('should redirect a request with an invalid locale to the default locale', () => {
      // Arrange
      const url = new URL('http://localhost:3000/fr/some-path'); // 'fr' is not in our locales array
      const request = {
        nextUrl: url,
        url: 'http://localhost:3000/fr/some-path',
        headers: new Headers()
      } as NextRequest;
      
      // Act
      middleware(request);
      
      // Assert
      // The middleware should treat 'fr' as a normal path segment since it's not in the locales list
      expect(NextResponse.redirect).toHaveBeenCalled();
      expect(NextResponse.next).not.toHaveBeenCalled();
      
      // Should redirect to include the default locale
      const redirectUrl = (NextResponse.redirect as any).mock.calls[0][0];
      expect(redirectUrl.pathname).toBe('/en/fr/some-path');
    });

    it('should redirect root path (/) to the default locale', () => {
      // Arrange
      const url = new URL('http://localhost:3000/');
      const request = {
        nextUrl: url,
        url: 'http://localhost:3000/',
        headers: new Headers()
      } as NextRequest;
      
      // Act
      middleware(request);
      
      // Assert
      expect(NextResponse.redirect).toHaveBeenCalled();
      const redirectUrl = (NextResponse.redirect as any).mock.calls[0][0];
      expect(redirectUrl.pathname).toBe('/en');
    });
  });

  describe('Header handling', () => {
    it('should not redirect URLs that already have a locale', () => {
      // Arrange
      const url = new URL('http://localhost:3000/en/some-path');
      const request = {
        nextUrl: url,
        url: 'http://localhost:3000/en/some-path',
        headers: new Headers()
      } as NextRequest;
      
      // Act
      middleware(request);
      
      // Assert
      expect(NextResponse.redirect).not.toHaveBeenCalled();
      expect(NextResponse.next).toHaveBeenCalled();
    });

    it('should add correct headers for URLs with locales', () => {
      // Arrange
      const url = new URL('http://localhost:3000/en/profile');
      const request = {
        nextUrl: url,
        url: 'http://localhost:3000/en/profile',
        headers: new Headers()
      } as NextRequest;
      
      // Act
      middleware(request);
      
      // Assert
      expect(NextResponse.next).toHaveBeenCalled();
      const options = (NextResponse.next as any).mock.calls[0][0];
      
      // Check all the headers are set correctly
      expect(options.request.headers.get('x-pathname')).toBe('/en/profile');
      expect(options.request.headers.get('x-locale')).toBe('en');
      expect(options.request.headers.get('x-forwarded-proto')).toBe('http');
    });

    it('should handle https protocol in headers', () => {
      // Arrange
      const url = new URL('https://localhost:3000/es/profile');
      const request = {
        nextUrl: url,
        url: 'https://localhost:3000/es/profile',
        headers: new Headers()
      } as NextRequest;
      
      // Act
      middleware(request);
      
      // Assert
      expect(NextResponse.next).toHaveBeenCalled();
      const options = (NextResponse.next as any).mock.calls[0][0];
      expect(options.request.headers.get('x-forwarded-proto')).toBe('https');
      expect(options.request.headers.get('x-locale')).toBe('es');
    });

    it('should handle undefined URL gracefully', () => {
      // Arrange
      const url = new URL('http://localhost:3000/some-path');
      const request = {
        nextUrl: url,
        url: undefined, // Explicitly set url to undefined
        headers: new Headers()
      } as unknown as NextRequest;
      
      // Act
      middleware(request);
      
      // Assert
      expect(NextResponse.redirect).not.toHaveBeenCalled();
      expect(NextResponse.next).toHaveBeenCalled();
      const options = (NextResponse.next as any).mock.calls[0][0];
      // Verify headers are still passed through
      expect(options.request.headers.get('x-pathname')).toBe('/some-path');
    });
  });
  
  describe('Special route handling', () => {
    it('should handle API routes according to config matcher', () => {
      // Arrange
      const url = new URL('http://localhost:3000/api/auth/signin');
      const request = {
        nextUrl: url,
        url: 'http://localhost:3000/api/auth/signin',
        headers: new Headers()
      } as NextRequest;
      
      // Act - Note: In a real scenario, middleware wouldn't run on API routes due to the matcher
      // but we're testing the logic if it somehow did run
      middleware(request);
      
      // Assert - It would still try to redirect because our test bypasses the matcher
      expect(NextResponse.redirect).toHaveBeenCalled();
      const redirectUrl = (NextResponse.redirect as any).mock.calls[0][0];
      expect(redirectUrl.pathname).toBe('/en/api/auth/signin');
    });
    
    it('should correctly handle all supported locales', () => {
      // Test each supported locale
      locales.forEach(locale => {
        // Arrange
        const url = new URL(`http://localhost:3000/${locale}/profile`);
        const request = {
          nextUrl: url,
          url: `http://localhost:3000/${locale}/profile`,
          headers: new Headers()
        } as NextRequest;
        
        // Act
        middleware(request);
        
        // Assert
        expect(NextResponse.next).toHaveBeenCalled();
        const options = (NextResponse.next as any).mock.calls.slice(-1)[0][0];
        expect(options.request.headers.get('x-locale')).toBe(locale);
      });
    });
  });
}); 