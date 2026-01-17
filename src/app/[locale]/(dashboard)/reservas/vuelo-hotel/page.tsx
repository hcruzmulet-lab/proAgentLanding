import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { VueloHotelPage } from '@/components/reservas/VueloHotelPage';

export default function VueloHotelPageRoute() {
  return (
    <DashboardLayout activeModule="reservas" activeSubItem="vuelo-hotel" title="Reservas">
      <VueloHotelPage />
    </DashboardLayout>
  );
}
