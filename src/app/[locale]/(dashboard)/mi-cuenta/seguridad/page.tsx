import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { SeguridadPage } from '@/components/mi-cuenta/seguridad/SeguridadPage';

export default function SeguridadRoute() {
  return (
    <DashboardLayout activeModule="mi-cuenta" activeSubItem="seguridad" title="Mi Cuenta">
      <SeguridadPage />
    </DashboardLayout>
  );
}
