import { DetalleItinerarioPage } from '@/components/crm/itinerarios-ia/DetalleItinerarioPage';
import { DashboardLayout } from '@/components/layout/DashboardLayout';

interface PageProps {
  params: {
    id: string;
    locale: string;
  };
}

export default function ItinerarioDetallePage({ params }: PageProps) {
  return (
    <DashboardLayout
      currentModule="crm"
      currentSubModule="itinerarios-ia"
    >
      <DetalleItinerarioPage id={params.id} />
    </DashboardLayout>
  );
}
