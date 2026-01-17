import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { LeccionPage } from '@/components/academia/webinar/LeccionPage';

export default function LeccionRoute() {
  return (
    <DashboardLayout activeModule="academia" activeSubItem="webinar" title="Academia">
      <LeccionPage />
    </DashboardLayout>
  );
}
