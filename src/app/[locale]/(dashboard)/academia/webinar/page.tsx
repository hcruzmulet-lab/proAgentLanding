import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { WebinarPage } from '@/components/academia/webinar/WebinarPage';

export default function WebinarRoute() {
  return (
    <DashboardLayout activeModule="academia" activeSubItem="webinar" title="Academia">
      <WebinarPage />
    </DashboardLayout>
  );
}
