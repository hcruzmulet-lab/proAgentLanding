import { ReactNode } from 'react';
import './dashboard-layout-wrapper.scss';

interface DashboardLayoutWrapperProps {
  children: ReactNode;
}

export default function DashboardLayoutWrapper({ children }: DashboardLayoutWrapperProps) {
  return <div className="dashboard-layout-wrapper">{children}</div>;
}
