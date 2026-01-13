import { redirect } from 'next/navigation';

export default function CRMPage() {
  // Redirigir automáticamente a Clientes (primera opción del submenu)
  redirect('/crm/clientes');
}
