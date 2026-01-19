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
    <DashboardLayout
      currentModule="reservas"
      currentSubModule="especializados"
    >
      <DetalleDMCPage dmcId={id} />
    </DashboardLayout>
  );
}
