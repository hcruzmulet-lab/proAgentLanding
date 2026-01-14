import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { EstadoPage } from '@/components/mi-cuenta/estado/EstadoPage';

export default function EstadoRoute() {
  return (
    <DashboardLayout activeModule="mi-cuenta" activeSubItem="estado" title="Mi Cuenta">
      <EstadoPage />
    </DashboardLayout>
  );
}
