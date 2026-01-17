import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { AlgVacationsPage } from '@/components/reservas/AlgVacationsPage';

export default function AlgVacationsPageRoute() {
  return (
    <DashboardLayout activeModule="reservas" activeSubItem="alg-vacations" title="Reservas">
      <AlgVacationsPage />
    </DashboardLayout>
  );
}
