import { redirect } from 'next/navigation';

export default async function MiCuentaRoute({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  redirect(`/${locale}/mi-cuenta/perfil`);
}
