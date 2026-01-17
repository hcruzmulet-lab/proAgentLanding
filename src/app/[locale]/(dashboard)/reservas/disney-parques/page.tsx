import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { DisneyParquesPage } from '@/components/reservas/DisneyParquesPage';

export default function DisneyParquesPageRoute() {
  return (
    <DashboardLayout activeModule="reservas" activeSubItem="disney-parques" title="Reservas">
      <DisneyParquesPage />
    </DashboardLayout>
  );
}
