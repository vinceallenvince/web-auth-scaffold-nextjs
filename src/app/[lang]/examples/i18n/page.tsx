"use client";

import { useT } from "@/app/lib/i18n-context";
import { Card } from "@/components/ui/card";
import { DotNotationPath } from "@/types/i18n.types";

export default function I18nExamplePage() {
  const t = useT();
  
  // Create a wrapper function for safe translation access with fallbacks
  const safeT = (key: DotNotationPath, fallback = "Translation not available") => {
    const translation = t(key);
    return translation === key ? fallback : translation;
  };
  
  return (
    <div className="container mx-auto py-12 max-w-5xl">
      <h1 className="text-3xl font-bold mb-6">i18n Client-Side Example</h1>
      
      <div className="grid gap-6 md:grid-cols-2">
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Basic Translation</h2>
          <div className="space-y-2">
            <p><span className="font-medium">Home Welcome:</span> {t("home.welcome")}</p>
            <p><span className="font-medium">Home Description:</span> {t("home.description")}</p>
            <p><span className="font-medium">App Title:</span> {t("common.appTitle")}</p>
          </div>
        </Card>
        
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Error Handling</h2>
          <div className="space-y-2">
            <p><span className="font-medium">Raw Missing Key:</span> {t("this.key.does.not.exist")}</p>
            <p><span className="font-medium">Safe Missing Key:</span> {safeT("this.key.does.not.exist")}</p>
            <p><span className="font-medium">Custom Fallback:</span> {safeT("another.missing.key", "Custom error message")}</p>
            <p><span className="font-medium">Partial Path:</span> {safeT("home", "Invalid path")}</p>
          </div>
        </Card>
        
        <Card className="p-6 md:col-span-2">
          <h2 className="text-xl font-semibold mb-4">How to Use</h2>
          <div className="mt-4 p-4 bg-muted rounded-md">
            <pre className="whitespace-pre-wrap overflow-x-auto">
              {`// 1. Import the hook and types
import { useT } from "@/app/lib/i18n-context";
import { DotNotationPath } from "@/types/i18n.types";

// 2. Use it in your component with safe error handling
export function MyComponent() {
  const t = useT();
  
  // Create a safe wrapper for graceful error handling
  const safeT = (key: DotNotationPath, fallback = "Translation not available") => {
    const translation = t(key);
    return translation === key ? fallback : translation;
  };
  
  return (
    <div>
      {/* Direct usage */}
      <h1>{t("some.translation.key")}</h1>
      
      {/* With graceful error handling */}
      <p>{safeT("another.key")}</p>
      <p>{safeT("missing.key", "This text displays if key is missing")}</p>
    </div>
  );
}`}
            </pre>
          </div>
        </Card>
      </div>
    </div>
  );
} 