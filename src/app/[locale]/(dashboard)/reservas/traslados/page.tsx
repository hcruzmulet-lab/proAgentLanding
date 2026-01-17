import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { TrasladosPage } from '@/components/reservas/TrasladosPage';

export default function TrasladosPageRoute() {
  return (
    <DashboardLayout activeModule="reservas" activeSubItem="traslados" title="Reservas">
      <TrasladosPage />
    </DashboardLayout>
  );
}
