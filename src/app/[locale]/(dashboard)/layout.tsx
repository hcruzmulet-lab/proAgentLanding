import { ReactNode } from 'react';
import { AuthGuard } from '@/components/auth/AuthGuard';
import './dashboard-layout-wrapper.scss';

interface DashboardLayoutWrapperProps {
  children: ReactNode;
}

export default function DashboardLayoutWrapper({ children }: DashboardLayoutWrapperProps) {
  return (
    <AuthGuard>
      <div className="dashboard-layout-wrapper">{children}</div>
    </AuthGuard>
  );
}
