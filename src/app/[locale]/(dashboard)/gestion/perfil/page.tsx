import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { PerfilPage } from '@/components/gestion/perfil/PerfilPage';

export default function PerfilGestionRoute() {
  return (
    <DashboardLayout activeModule="gestion" activeSubItem="perfil" title="Gestión">
      <PerfilPage />
    </DashboardLayout>
  );
}
