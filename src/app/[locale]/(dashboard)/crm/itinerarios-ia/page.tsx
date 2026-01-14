import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { ItinerariosIAPage } from '@/components/crm/itinerarios-ia/ItinerariosIAPage';

export default function ItinerariosIARoute() {
  return (
    <DashboardLayout activeModule="crm" activeSubItem="itinerarios-ia" title="CRM">
      <ItinerariosIAPage />
    </DashboardLayout>
  );
}
