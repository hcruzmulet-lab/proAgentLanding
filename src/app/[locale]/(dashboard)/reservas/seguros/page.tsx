import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { SegurosPage } from '@/components/reservas/SegurosPage';

export default function SegurosPageRoute() {
  return (
    <DashboardLayout activeModule="reservas" activeSubItem="seguros" title="Reservas">
      <SegurosPage />
    </DashboardLayout>
  );
}
