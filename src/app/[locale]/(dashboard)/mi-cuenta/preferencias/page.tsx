import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { PreferenciasPage } from '@/components/mi-cuenta/preferencias/PreferenciasPage';

export default function PreferenciasRoute() {
  return (
    <DashboardLayout activeModule="mi-cuenta" activeSubItem="preferencias" title="Mi Cuenta">
      <PreferenciasPage />
    </DashboardLayout>
  );
}
