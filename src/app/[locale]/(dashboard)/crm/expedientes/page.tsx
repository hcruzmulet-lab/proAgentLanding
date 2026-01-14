import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { ExpedientesPage } from '@/components/crm/expedientes/ExpedientesPage';

export default function ExpedientesRoute() {
  return (
    <DashboardLayout activeModule="crm" activeSubItem="expedientes" title="CRM">
      <ExpedientesPage />
    </DashboardLayout>
  );
}
