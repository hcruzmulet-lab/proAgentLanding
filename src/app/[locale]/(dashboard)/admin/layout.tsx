import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { ADMIN_NAV } from '@/config/navigation';
import { Providers } from '@/lib/providers';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <Providers>
      <DashboardLayout navItems={ADMIN_NAV}>{children}</DashboardLayout>
    </Providers>
  );
}
