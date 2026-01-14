import { redirect } from 'next/navigation';

export default async function GestionRoute({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  redirect(`/${locale}/gestion/perfil`);
}
