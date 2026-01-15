import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { LeccionPage } from '@/components/academia/imprescindibles/LeccionPage';

export default function LeccionRoute() {
  return (
    <DashboardLayout activeModule="academia" activeSubItem="imprescindibles" title="Academia">
      <LeccionPage />
    </DashboardLayout>
  );
}

