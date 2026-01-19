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
    <DashboardLayout activeModule="crm" activeSubItem="itinerarios-ia" title="CRM">
      <DetalleItinerarioPage id={id} />
    </DashboardLayout>
  );
}
