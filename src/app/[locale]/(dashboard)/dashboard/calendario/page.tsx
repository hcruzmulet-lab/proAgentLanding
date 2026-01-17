import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { CalendarioPage } from '@/components/dashboard/CalendarioPage';

export default function CalendarioPageRoute() {
  return (
    <DashboardLayout activeModule="inicio" activeSubItem="calendario" title="Inicio">
      <CalendarioPage />
    </DashboardLayout>
  );
}
