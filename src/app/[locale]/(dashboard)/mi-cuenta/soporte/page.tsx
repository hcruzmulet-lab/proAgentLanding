import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { SoportePage } from '@/components/mi-cuenta/soporte/SoportePage';

export default function SoporteRoute() {
  return (
    <DashboardLayout activeModule="mi-cuenta" activeSubItem="soporte" title="Mi Cuenta">
      <SoportePage />
    </DashboardLayout>
  );
}
