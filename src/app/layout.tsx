import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

// Adding explicit font display strategy to avoid FOUT (Flash of Unstyled Text)
const geistSans = Geist({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap", // Ensures text remains visible during font loading
  preload: true,
  fallback: ["system-ui", "sans-serif"],
});

const geistMono = Geist_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap", // Ensures text remains visible during font loading
  preload: true,
  fallback: ["monospace"],
});

export const metadata: Metadata = {
  title: "Web Auth Scaffold",
  description: "A Next.js application with Auth.js authentication",
};

type RootLayoutProps = {
  children: React.ReactNode;
  params?: Promise<{ lang?: string }>;
};

export default async function RootLayout({
  children,
  params,
}: RootLayoutProps) {
  // Default to English if no language parameter is available
  const paramsValue = params ? await params : undefined;
  const lang = paramsValue?.lang || "en";
  
  return (
    <html lang={lang} data-theme="bumblebee">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col`}
        style={{ fontFamily: "var(--font-sans, var(--font-sans-fallback))" }}
      >
        {children}
      </body>
    </html>
  );
}
