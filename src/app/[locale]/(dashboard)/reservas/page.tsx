import { redirect } from 'next/navigation';

export default async function ReservasPageRoute({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  redirect(`/${locale}/reservas/vuelo-hotel`);
}
