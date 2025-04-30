"use client";

import { useT } from "@/app/lib/i18n-context";
import { DotNotationPath } from "@/types/i18n.types";

export function TranslationTest() {
  const t = useT();
  
  // Create a wrapper function that handles missing keys gracefully
  const safeT = (key: DotNotationPath, fallback = "Translation not available") => {
    const translation = t(key);
    // If the translation is the same as the key, it means the key wasn't found
    return translation === key ? fallback : translation;
  };
  
  return (
    <div className="p-4 border rounded-lg">
      <h2 className="text-lg font-semibold mb-2">Translation Test</h2>
      <p>{t("home.welcome")}</p>
      <p>{t("home.description")}</p>
      <p>Missing key test (raw): {t("missing.key.test")}</p>
      <p>Missing key test (safe): {safeT("missing.key.test")}</p>
      <p>Missing key test (custom fallback): {safeT("another.missing.key", "Custom fallback message")}</p>
    </div>
  );
} 