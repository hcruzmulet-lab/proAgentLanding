import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { VuelosPage } from '@/components/reservas/VuelosPage';

export default function VuelosPageRoute() {
  return (
    <DashboardLayout activeModule="reservas" activeSubItem="vuelos" title="Reservas">
      <VuelosPage />
    </DashboardLayout>
  );
}
