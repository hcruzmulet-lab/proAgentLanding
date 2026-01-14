import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { ReservasPage } from '@/components/reservas/ReservasPage';

export default function ReservasPageRoute() {
  return (
    <DashboardLayout activeModule="reservas" activeSubItem="reservas" title="Reservas">
      <ReservasPage />
    </DashboardLayout>
  );
}
