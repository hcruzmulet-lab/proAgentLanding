import { redirect } from 'next/navigation';

export default async function AcademiaRoute({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  redirect(`/${locale}/academia/imprescindibles`);
}
