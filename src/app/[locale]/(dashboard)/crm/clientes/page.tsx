import { DashboardLayout } from '@/components/layout/DashboardLayout';

export default function ClientesPage() {
  return (
    <DashboardLayout activeModule="crm" activeSubItem="clientes" title="CRM">
      <h1 style={{ fontSize: '1.5rem', fontWeight: '600', color: '#334155', margin: 0, marginTop: '-4px' }}>
        Clientes
      </h1>
    </DashboardLayout>
  );
}
