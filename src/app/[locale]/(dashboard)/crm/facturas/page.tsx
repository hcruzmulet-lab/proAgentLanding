import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { FacturasPage } from '@/components/crm/facturas/FacturasPage';

export default function FacturasRoute() {
  return (
    <DashboardLayout activeModule="crm" activeSubItem="facturas" title="CRM">
      <FacturasPage />
    </DashboardLayout>
  );
}
