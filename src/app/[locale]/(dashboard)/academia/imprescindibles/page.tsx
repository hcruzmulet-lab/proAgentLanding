import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { ImprescindiblesPage } from '@/components/academia/imprescindibles/ImprescindiblesPage';

export default function ImprescindiblesRoute() {
  return (
    <DashboardLayout activeModule="academia" activeSubItem="imprescindibles" title="Academia">
      <ImprescindiblesPage />
    </DashboardLayout>
  );
}
