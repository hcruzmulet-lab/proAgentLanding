import { ReactNode } from 'react';

// This root layout is required but we delegate all HTML structure to [locale]/layout
export default function RootLayout({ children }: { children: ReactNode }) {
  return children;
}
