import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { SportsEventsPage } from '@/components/reservas/SportsEventsPage';

export default function SportsEventsPageRoute() {
  return (
    <DashboardLayout activeModule="reservas" activeSubItem="sports-events" title="Reservas">
      <SportsEventsPage />
    </DashboardLayout>
  );
}
