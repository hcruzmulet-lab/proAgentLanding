import { redirect } from 'next/navigation';

export default function RootPage() {
  // Redirect to the default locale's landing page
  redirect('/landing');
}
