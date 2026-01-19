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
  // Convertir a número y luego a string para eliminar ceros a la izquierda
  const id = String(parseInt(numero.replace('ITI-', ''), 10));
  
  return <DetalleItinerarioPage id={id} isPublic={true} />;
}
