import { CotizacionPublicaPage } from '@/components/crm/cotizaciones/CotizacionPublicaPage';

// Forzar renderizado dinámico para rutas dinámicas
export const dynamic = 'force-dynamic';

export default function CotizacionPublicaRoute() {
  return <CotizacionPublicaPage />;
}
