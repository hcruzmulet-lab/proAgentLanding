import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { AGENT_NAV } from '@/config/navigation';
import { Providers } from '@/lib/providers';

export default function AgentLayout({ children }: { children: React.ReactNode }) {
  return (
    <Providers>
      <DashboardLayout navItems={AGENT_NAV}>{children}</DashboardLayout>
    </Providers>
  );
}
