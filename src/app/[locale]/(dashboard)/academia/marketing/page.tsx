import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { MarketingPage } from '@/components/academia/marketing/MarketingPage';

export default function MarketingRoute() {
  return (
    <DashboardLayout activeModule="academia" activeSubItem="marketing" title="Academia">
      <MarketingPage />
    </DashboardLayout>
  );
}
