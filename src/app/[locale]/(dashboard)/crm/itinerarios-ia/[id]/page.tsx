import { DetalleItinerarioPage } from '@/components/crm/itinerarios-ia/DetalleItinerarioPage';
import { DashboardLayout } from '@/components/layout/DashboardLayout';

interface PageProps {
  params: Promise<{
    id: string;
    locale: string;
  }>;
}

export default async function ItinerarioDetallePage({ params }: PageProps) {
  const { id } = await params;
  
  return (
    <DashboardLayout
      currentModule="crm"
      currentSubModule="itinerarios-ia"
    >
      <DetalleItinerarioPage id={id} />
    </DashboardLayout>
  );
}
