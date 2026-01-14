import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { CotizacionesPage } from '@/components/crm/cotizaciones/CotizacionesPage';

export default function CotizacionesRoute() {
  return (
    <DashboardLayout activeModule="crm" activeSubItem="cotizaciones" title="CRM">
      <CotizacionesPage />
    </DashboardLayout>
  );
}
