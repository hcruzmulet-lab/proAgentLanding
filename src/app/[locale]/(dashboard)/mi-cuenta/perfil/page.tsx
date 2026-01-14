import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { PerfilMiCuentaPage } from '@/components/mi-cuenta/perfil/PerfilMiCuentaPage';

export default function PerfilMiCuentaRoute() {
  return (
    <DashboardLayout activeModule="mi-cuenta" activeSubItem="perfil" title="Mi Cuenta">
      <PerfilMiCuentaPage />
    </DashboardLayout>
  );
}
