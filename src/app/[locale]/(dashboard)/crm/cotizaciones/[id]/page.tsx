import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { DetalleCotizacionPage } from '@/components/crm/cotizaciones/DetalleCotizacionPage';

export default function DetalleCotizacionRoute() {
  return (
    <DashboardLayout activeModule="crm" activeSubItem="cotizaciones" title="CRM">
      <DetalleCotizacionPage />
    </DashboardLayout>
  );
}
