import type { Metadata } from 'next';
import '../../globals.css';

export const metadata: Metadata = {
  title: 'Cotización - ProAgent',
  description: 'Vista de cotización pública',
  icons: {
    icon: '/favicon.svg',
  },
};

export default function CotizacionPublicaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" suppressHydrationWarning>
      <head>
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
