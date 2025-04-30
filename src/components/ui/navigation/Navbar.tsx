import type { Locale } from "@/constants/i18n";
import { getDictionary } from "@/app/[lang]/dictionaries";
import ClientNavbar from "./ClientNavbar";

interface NavbarProps {
  lang: Locale;
}

export async function Navbar({ lang }: NavbarProps) {
  // Load the dictionary for the provided locale
  const dictionary = await getDictionary(lang as Locale);
  
  return <ClientNavbar translations={dictionary.navigation} />;
} 