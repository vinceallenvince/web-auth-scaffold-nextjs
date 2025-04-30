import { Sidebar } from "@/components/ui/navigation";
import { Navbar } from "@/components/ui/navigation/server";
import { getDictionary } from "@/app/[lang]/dictionaries";
import type { Locale } from "@/constants/i18n";

interface NavigationExamplesPageProps {
  params: Promise<{ lang: string }>;
}

export default async function NavigationExamplesPage({
  params
}: NavigationExamplesPageProps) {
  const { lang } = await params;
  const dictionary = await getDictionary(lang as Locale);
  console.log(dictionary.common.appTitle);
  
  return (
    <div className="space-y-8 p-4">
      <section className="rounded-box bg-base-200 p-6">
        <h2 className="mb-4 text-2xl font-bold">Navigation Components</h2>
        <p className="mb-6">
          This page demonstrates the navigation components created for the
          application.
        </p>

        <div className="space-y-8">
          <div>
            <h3 className="mb-2 text-xl font-semibold">Default Navbar</h3>
            <div className="rounded-box border border-base-300">
              <Navbar lang={lang} />
            </div>
          </div>

          <div>
            <h3 className="mb-2 text-xl font-semibold">Sidebar (Detached)</h3>
            <div className="h-96 rounded-box border border-base-300">
              <div className="h-full max-w-xs border-r border-base-300">
                <Sidebar />
              </div>
            </div>
            <p className="mt-2 text-sm">
              Note: The sidebar is normally attached to the dashboard layout.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
} 