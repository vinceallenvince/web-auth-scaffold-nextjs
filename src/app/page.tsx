import { HomeHero } from "@/app/components/ui";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Main content */}
      <main>
        {/* Hero Section */}
        <HomeHero />
      </main>
    </div>
  );
}
