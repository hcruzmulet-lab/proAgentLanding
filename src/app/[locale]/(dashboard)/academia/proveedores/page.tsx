import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { ProveedoresAcademiaPage } from '@/components/academia/proveedores/ProveedoresAcademiaPage';

export default function ProveedoresRoute() {
  return (
    <DashboardLayout activeModule="academia" activeSubItem="proveedores" title="Academia">
      <ProveedoresAcademiaPage />
    </DashboardLayout>
  );
}
