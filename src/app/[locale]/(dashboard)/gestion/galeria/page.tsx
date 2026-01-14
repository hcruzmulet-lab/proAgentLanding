import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { GaleriaPage } from '@/components/gestion/galeria/GaleriaPage';

export default function GaleriaRoute() {
  return (
    <DashboardLayout activeModule="gestion" activeSubItem="galeria" title="Gestión">
      <GaleriaPage />
    </DashboardLayout>
  );
}
