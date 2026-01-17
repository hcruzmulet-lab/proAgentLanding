import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { GruposPage } from '@/components/reservas/GruposPage';

export default function GruposPageRoute() {
  return (
    <DashboardLayout activeModule="reservas" activeSubItem="grupos" title="Reservas">
      <GruposPage />
    </DashboardLayout>
  );
}
