import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { ExpediaPage } from '@/components/reservas/ExpediaPage';

export default function ExpediaPageRoute() {
  return (
    <DashboardLayout activeModule="reservas" activeSubItem="expedia" title="Reservas">
      <ExpediaPage />
    </DashboardLayout>
  );
}
