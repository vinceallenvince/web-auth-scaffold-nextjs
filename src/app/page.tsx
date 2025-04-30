import { redirect } from 'next/navigation';

// This component will never actually render
// It just redirects to the default locale
export default function RootPage() {
  redirect('/en');
}
