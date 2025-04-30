"use client";

import { useT } from "@/app/lib/i18n-context";

export function TranslationTest() {
  const t = useT();
  
  return (
    <div className="p-4 border rounded-lg">
      <h2 className="text-lg font-semibold mb-2">Translation Test</h2>
      <p>{t("home.welcome")}</p>
      <p>{t("home.description")}</p>
      <p>Missing key test: {t("missing.key.test")}</p>
    </div>
  );
} 