import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { AutosPage } from '@/components/reservas/AutosPage';

export default function AutosPageRoute() {
  return (
    <DashboardLayout activeModule="reservas" activeSubItem="autos" title="Reservas">
      <AutosPage />
    </DashboardLayout>
  );
}
