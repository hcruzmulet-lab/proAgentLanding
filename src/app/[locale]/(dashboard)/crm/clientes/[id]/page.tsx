import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { ClientDetailPage } from '@/components/crm/clients/ClientDetailPage';

interface ClientDetailPageRouteProps {
  params: {
    id: string;
  };
}

export default function ClientDetailPageRoute({ params }: ClientDetailPageRouteProps) {
  return (
    <DashboardLayout activeModule="crm" activeSubItem="clientes" title="CRM">
      <ClientDetailPage clientId={params.id} />
    </DashboardLayout>
  );
}
