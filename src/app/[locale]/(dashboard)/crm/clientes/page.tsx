import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { ClientsPage } from '@/components/crm/clients/ClientsPage';

export default function ClientesPageRoute() {
  return (
    <DashboardLayout activeModule="crm" activeSubItem="clientes" title="CRM">
      <ClientsPage />
    </DashboardLayout>
  );
}
