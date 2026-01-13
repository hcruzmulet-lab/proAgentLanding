import { DashboardLayout } from '@/components/layout/DashboardLayout';

export default function CalendarioPage() {
  return (
    <DashboardLayout activeModule="inicio" activeSubItem="calendario" title="Inicio">
      <h1 style={{ fontSize: '1.5rem', fontWeight: '600', color: '#334155', margin: 0 }}>
        Calendario
      </h1>
    </DashboardLayout>
  );
}
