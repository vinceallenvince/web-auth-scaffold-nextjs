"use client";

import { useT } from "@/app/lib/i18n-context";
import { Card } from "@/components/ui/card";

export default function I18nExamplePage() {
  const t = useT();
  
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
            <p><span className="font-medium">Missing Key:</span> {t("this.key.does.not.exist")}</p>
            <p><span className="font-medium">Partial Path:</span> {t("home")}</p>
          </div>
        </Card>
        
        <Card className="p-6 md:col-span-2">
          <h2 className="text-xl font-semibold mb-4">How to Use</h2>
          <div className="mt-4 p-4 bg-muted rounded-md">
            <pre className="whitespace-pre-wrap overflow-x-auto">
              {`// 1. Import the hook
import { useT } from "@/app/lib/i18n-context";

// 2. Use it in your component
export function MyComponent() {
  const t = useT();
  
  return (
    <div>
      <h1>{t("some.translation.key")}</h1>
      <p>{t("another.key")}</p>
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