import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { CertificadoPage } from '@/components/mi-cuenta/certificado/CertificadoPage';

export default function CertificadoRoute() {
  return (
    <DashboardLayout activeModule="mi-cuenta" activeSubItem="certificado" title="Mi Cuenta">
      <CertificadoPage />
    </DashboardLayout>
  );
}
