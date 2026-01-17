import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { ActividadesPage } from '@/components/reservas/ActividadesPage';

export default function ActividadesPageRoute() {
  return (
    <DashboardLayout activeModule="reservas" activeSubItem="actividades" title="Reservas">
      <ActividadesPage />
    </DashboardLayout>
  );
}
