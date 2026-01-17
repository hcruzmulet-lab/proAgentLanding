import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { LeccionPage } from '@/components/academia/operacion/LeccionPage';

export default function LeccionRoute() {
  return (
    <DashboardLayout activeModule="academia" activeSubItem="operacion" title="Academia">
      <LeccionPage />
    </DashboardLayout>
  );
}
