import { DashboardLayout } from '@/components/layout/DashboardLayout';

export default function NovedadesPage() {
  return (
    <DashboardLayout activeModule="inicio" activeSubItem="novedades" title="Inicio">
      <h1 style={{ fontSize: '1.5rem', fontWeight: '600', color: '#334155', margin: 0 }}>
        Novedades
      </h1>
    </DashboardLayout>
  );
}
