import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { NuevoExpedienteManualPage } from '@/components/crm/expedientes/NuevoExpedienteManualPage';

export default async function NuevoExpedienteManualRoute({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  return (
    <DashboardLayout activeModule="crm" activeSubItem="expedientes" title="CRM">
      <NuevoExpedienteManualPage />
    </DashboardLayout>
  );
}
