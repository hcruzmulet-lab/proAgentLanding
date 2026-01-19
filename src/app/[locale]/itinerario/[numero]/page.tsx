export const dynamic = 'force-dynamic';

import { DetalleItinerarioPage } from '@/components/crm/itinerarios-ia/DetalleItinerarioPage';

interface PageProps {
  params: Promise<{
    numero: string;
    locale: string;
  }>;
}

export default async function ItinerarioPublicoPage({ params }: PageProps) {
  const { numero } = await params;
  
  // Extraer solo el número del itinerario (ej: "ITI-003" -> "3")
  const id = numero.replace('ITI-', '');
  
  return (
    <div style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
      <DetalleItinerarioPage id={id} />
    </div>
  );
}
