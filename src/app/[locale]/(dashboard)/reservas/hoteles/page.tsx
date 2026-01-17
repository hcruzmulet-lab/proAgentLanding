import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { HotelesPage } from '@/components/reservas/HotelesPage';

export default function HotelesPageRoute() {
  return (
    <DashboardLayout activeModule="reservas" activeSubItem="hoteles" title="Reservas">
      <HotelesPage />
    </DashboardLayout>
  );
}
