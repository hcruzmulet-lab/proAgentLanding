import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { DestinosPage } from '@/components/academia/destinos/DestinosPage';

export default function DestinosRoute() {
  return (
    <DashboardLayout activeModule="academia" activeSubItem="destinos" title="Academia">
      <DestinosPage />
    </DashboardLayout>
  );
}
