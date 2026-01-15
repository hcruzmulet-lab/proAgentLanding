import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { NuevaCotizacionManualPage } from '@/components/crm/cotizaciones/NuevaCotizacionManualPage';

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  return (
    <DashboardLayout activeModule="crm" activeSubItem="cotizaciones" title="CRM">
      <NuevaCotizacionManualPage />
    </DashboardLayout>
  );
}
