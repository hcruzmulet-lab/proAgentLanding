import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { OperacionPage } from '@/components/academia/operacion/OperacionPage';

export default function OperacionRoute() {
  return (
    <DashboardLayout activeModule="academia" activeSubItem="operacion" title="Academia">
      <OperacionPage />
    </DashboardLayout>
  );
}
