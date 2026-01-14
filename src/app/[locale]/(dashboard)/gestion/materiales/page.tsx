import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { MaterialesPage } from '@/components/gestion/materiales/MaterialesPage';

export default function MaterialesRoute() {
  return (
    <DashboardLayout activeModule="gestion" activeSubItem="materiales" title="Gestión">
      <MaterialesPage />
    </DashboardLayout>
  );
}
