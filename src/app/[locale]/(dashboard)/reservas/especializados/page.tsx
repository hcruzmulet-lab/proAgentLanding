import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { EspecializadosPage } from '@/components/reservas/EspecializadosPage';

export default function EspecializadosPageRoute() {
  return (
    <DashboardLayout activeModule="reservas" activeSubItem="especializados" title="Reservas">
      <EspecializadosPage />
    </DashboardLayout>
  );
}
