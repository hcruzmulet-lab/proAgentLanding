import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Iniciar Sesión | ProAgent',
  description: 'Inicia sesión en ProAgent para gestionar tu agencia de viajes',
};

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
