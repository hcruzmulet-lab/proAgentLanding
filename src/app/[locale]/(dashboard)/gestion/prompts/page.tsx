import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { PromptsPage } from '@/components/gestion/prompts/PromptsPage';

export default function PromptsRoute() {
  return (
    <DashboardLayout activeModule="gestion" activeSubItem="prompts" title="Gestión">
      <PromptsPage />
    </DashboardLayout>
  );
}
