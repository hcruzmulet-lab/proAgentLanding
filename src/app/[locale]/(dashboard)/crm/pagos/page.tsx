import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { PagosPage } from '@/components/crm/pagos/PagosPage';

export default function PagosRoute() {
  return (
    <DashboardLayout activeModule="crm" activeSubItem="pagos" title="CRM">
      <PagosPage />
    </DashboardLayout>
  );
}
