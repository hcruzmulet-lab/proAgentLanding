import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { ReservasCRMPage } from '@/components/crm/reservas/ReservasCRMPage';

export default function ReservasCRMRoute() {
  return (
    <DashboardLayout activeModule="crm" activeSubItem="reservas" title="CRM">
      <ReservasCRMPage />
    </DashboardLayout>
  );
}
