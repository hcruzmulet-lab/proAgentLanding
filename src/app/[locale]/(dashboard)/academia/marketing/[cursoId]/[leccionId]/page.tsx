import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { LeccionPage } from '@/components/academia/marketing/LeccionPage';

export default function LeccionRoute() {
  return (
    <DashboardLayout activeModule="academia" activeSubItem="marketing" title="Academia">
      <LeccionPage />
    </DashboardLayout>
  );
}
