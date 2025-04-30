import { redirect } from 'next/navigation';
// Import default locale from a shared constants file
import { defaultLocale } from '@/constants/i18n';

// This component will never actually render
// It just redirects to the default locale
export default function RootPage() {
  redirect(`/${defaultLocale}`);
}
