import { getDictionary } from "./dictionaries";
import type { Locale } from "@/constants/i18n";

export default async function HomePage({ 
  params 
}: { 
  params: Promise<{ lang: string }>
}) {
  // Get the dictionary for the current locale
  const { lang } = await params;
  const dictionary = await getDictionary(lang as Locale);
  
  return (
    <div className="container mx-auto py-12 max-w-5xl">
      <h1 className="text-4xl font-bold mb-8">
        {/* Use the welcome message from the dictionary */}
        <div dangerouslySetInnerHTML={{ __html: dictionary.home.welcome }} />
      </h1>
      <p className="text-xl mb-12">
        {dictionary.home.description}
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title">{dictionary.home.magicLinkAuthTitle}</h2>
            <p>{dictionary.home.magicLinkAuthDescription}</p>
          </div>
        </div>
        
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title">{dictionary.home.modernStackTitle}</h2>
            <p>{dictionary.home.modernStackDescription}</p>
          </div>
        </div>
        
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title">{dictionary.home.readyToUseTitle}</h2>
            <p>{dictionary.home.readyToUseDescription}</p>
          </div>
        </div>
      </div>
    </div>
  );
} 