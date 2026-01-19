import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { DetalleDMCPage } from '@/components/reservas/DetalleDMCPage';

interface PageProps {
  params: Promise<{
    id: string;
    locale: string;
  }>;
}

export default async function DMCDetallePage({ params }: PageProps) {
  const { id } = await params;

  return (
    <DashboardLayout activeModule="reservas" activeSubItem="especializados" title="Reservas">
      <DetalleDMCPage dmcId={id} />
    </DashboardLayout>
  );
}
