import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { LeccionPage } from '@/components/academia/destinos/LeccionPage';

export default function LeccionRoute() {
  return (
    <DashboardLayout activeModule="academia" activeSubItem="destinos" title="Academia">
      <LeccionPage />
    </DashboardLayout>
  );
}
