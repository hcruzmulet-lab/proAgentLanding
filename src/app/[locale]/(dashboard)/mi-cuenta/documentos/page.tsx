import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { DocumentosMiCuentaPage } from '@/components/mi-cuenta/documentos/DocumentosMiCuentaPage';

export default function DocumentosMiCuentaRoute() {
  return (
    <DashboardLayout activeModule="mi-cuenta" activeSubItem="documentos" title="Mi Cuenta">
      <DocumentosMiCuentaPage />
    </DashboardLayout>
  );
}
