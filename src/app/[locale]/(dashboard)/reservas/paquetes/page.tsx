import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { PaquetesPage } from '@/components/reservas/PaquetesPage';

export default function PaquetesPageRoute() {
  return (
    <DashboardLayout activeModule="reservas" activeSubItem="paquetes" title="Reservas">
      <PaquetesPage />
    </DashboardLayout>
  );
}
