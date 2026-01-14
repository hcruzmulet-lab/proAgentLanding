import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { ClientDetailPage } from '@/components/crm/clients/ClientDetailPage';

interface ClientDetailPageRouteProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function ClientDetailPageRoute({ params }: ClientDetailPageRouteProps) {
  const { id } = await params;
  console.log('ClientDetailPageRoute - Received ID from URL:', id);
  
  return (
    <DashboardLayout activeModule="crm" activeSubItem="clientes" title="CRM">
      <ClientDetailPage clientId={id} />
    </DashboardLayout>
  );
}
