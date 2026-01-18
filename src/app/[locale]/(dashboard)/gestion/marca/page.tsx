import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { MarcaPage } from '@/components/gestion/marca/MarcaPage';

export default function MarcaRoute() {
  return (
    <DashboardLayout activeModule="gestion" activeSubItem="marca" title="Gestión">
      <MarcaPage />
    </DashboardLayout>
  );
}
