import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { NovedadesPage } from '@/components/dashboard/NovedadesPage';

export default function NovedadesPageRoute() {
  return (
    <DashboardLayout activeModule="inicio" activeSubItem="novedades" title="Inicio">
      <NovedadesPage />
    </DashboardLayout>
  );
}

