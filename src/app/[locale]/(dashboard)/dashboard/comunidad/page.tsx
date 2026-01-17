import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { ComunidadPage } from '@/components/dashboard/ComunidadPage';

export default function ComunidadPageRoute() {
  return (
    <DashboardLayout activeModule="inicio" activeSubItem="comunidad" title="Inicio">
      <ComunidadPage />
    </DashboardLayout>
  );
}
