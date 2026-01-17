import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { CrucerosPage } from '@/components/reservas/CrucerosPage';

export default function CrucerosPageRoute() {
  return (
    <DashboardLayout activeModule="reservas" activeSubItem="cruceros" title="Reservas">
      <CrucerosPage />
    </DashboardLayout>
  );
}
