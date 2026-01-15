import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { NuevaReservaManualPage } from '@/components/crm/reservas/NuevaReservaManualPage';

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  return (
    <DashboardLayout activeModule="crm" activeSubItem="reservas" title="CRM">
      <NuevaReservaManualPage />
    </DashboardLayout>
  );
}
