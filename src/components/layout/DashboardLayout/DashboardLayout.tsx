'use client';

import { MainSidebar } from '@/components/layout/MainSidebar';
import { SubSidebar } from '@/components/layout/SubSidebar';
import { NotificationsDrawer } from '@/components/layout/NotificationsDrawer';
import { useUiStore } from '@/stores/ui/uiStore';
import { inicioMenuItems, crmMenuItems } from '@/config/menus';
import './DashboardLayout.scss';

interface DashboardLayoutProps {
  children: React.ReactNode;
  activeModule?: 'inicio' | 'crm' | 'reservas' | 'gestion' | 'academia';
  activeSubItem?: string;
  title?: string;
}

export function DashboardLayout({
  children,
  activeModule = 'inicio',
  activeSubItem,
  title = 'Inicio',
}: DashboardLayoutProps) {
  const { sidebarCollapsed, toggleSidebarCollapsed, notificationsOpen, setNotificationsOpen } = useUiStore();

  // Seleccionar menuItems según el módulo activo
  const getMenuItems = () => {
    switch (activeModule) {
      case 'crm':
        return crmMenuItems;
      case 'inicio':
      default:
        return inicioMenuItems;
    }
  };

  return (
    <>
      <NotificationsDrawer 
        isOpen={notificationsOpen} 
        onClose={() => setNotificationsOpen(false)} 
      />
      
      <div className="dashboard-layout">
        <MainSidebar 
          activeModule={activeModule}
          activeSubItem={activeSubItem}
          userName="Arieldi Marrero"
          isCollapsed={sidebarCollapsed}
          onToggleCollapse={toggleSidebarCollapsed}
          notificationCount={3}
        />
        {!sidebarCollapsed && (
          <SubSidebar
            title={title}
            activeItem={activeSubItem}
            menuItems={getMenuItems()}
            isCollapsed={sidebarCollapsed}
            onToggleCollapse={toggleSidebarCollapsed}
            notificationCount={3}
          />
        )}
        <main className="dashboard-layout__content">
          {children}
        </main>
      </div>
    </>
  );
}
