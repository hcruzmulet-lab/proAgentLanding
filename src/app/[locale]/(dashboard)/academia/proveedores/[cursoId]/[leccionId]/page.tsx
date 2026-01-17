import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { LeccionPage } from '@/components/academia/proveedores/LeccionPage';

export default function LeccionRoute() {
  return (
    <DashboardLayout activeModule="academia" activeSubItem="proveedores" title="Academia">
      <LeccionPage />
    </DashboardLayout>
  );
}
