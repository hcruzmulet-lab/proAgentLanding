import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { ComisionesPage } from '@/components/crm/comisiones/ComisionesPage';

export default function ComisionesRoute() {
  return (
    <DashboardLayout activeModule="crm" activeSubItem="comisiones" title="CRM">
      <ComisionesPage />
    </DashboardLayout>
  );
}
