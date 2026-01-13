'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useUiStore } from '@/stores/ui/uiStore';
import { 
  inicioMenuItems, 
  crmMenuItems, 
  reservasMenuItems, 
  gestionMenuItems, 
  academiaMenuItems 
} from '@/config/menus';
import './MainSidebar.scss';

interface MainSidebarProps {
  activeModule?: 'inicio' | 'crm' | 'reservas' | 'gestion' | 'academia';
  activeSubItem?: string;
  userInitials?: string;
  userName?: string;
  isCollapsed?: boolean;
  onToggleCollapse?: () => void;
  notificationCount?: number;
}

const mainModules = [
  { id: 'inicio', icon: 'home', label: 'Inicio', href: '/dashboard' },
  { id: 'crm', icon: 'person', label: 'CRM', href: '/crm' },
  { id: 'reservas', icon: 'airplane_ticket', label: 'Reservas', href: '/reservas' },
  { id: 'gestion', icon: 'folder_managed', label: 'Gestión', href: '/gestion' },
  { id: 'academia', icon: 'book_3', label: 'Academia', href: '/academia' },
];

const secondaryModules = [
  { id: 'chat', icon: 'chat', label: 'Chat', href: '#' },
  { 
    id: 'whatsapp', 
    iconSrc: '/icons/whatsapp.svg',
    iconSrcFilled: '/icons/whatsapp-filled.svg',
    label: 'WhatsApp', 
    href: '#' 
  },
  { id: 'email', icon: 'mail', label: 'Email', href: '#' },
  { 
    id: 'ia', 
    iconSrc: '/icons/ai-sparkle.svg',
    iconSrcFilled: '/icons/ai-sparkle-filled.svg',
    label: 'IA', 
    href: '#' 
  },
];

export function MainSidebar({ 
  activeModule = 'inicio',
  activeSubItem,
  userInitials = 'AM',
  userName = 'Arieldi Marrero',
  isCollapsed = false,
  onToggleCollapse,
  notificationCount = 0,
}: MainSidebarProps) {
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [hoveredModule, setHoveredModule] = useState<string | null>(null);
  const router = useRouter();
  const { toggleNotifications } = useUiStore();

  const handleLogout = () => {
    // TODO: Implement actual logout logic
    router.push('/login');
  };

  // Obtener submenu según el módulo
  const getSubMenu = (moduleId: string) => {
    switch (moduleId) {
      case 'inicio':
        return inicioMenuItems;
      case 'crm':
        return crmMenuItems;
      case 'reservas':
        return reservasMenuItems;
      case 'gestion':
        return gestionMenuItems;
      case 'academia':
        return academiaMenuItems;
      default:
        return [];
    }
  };

  return (
    <aside className="main-sidebar">
      {/* Logo */}
      <div className="main-sidebar__logo">
        <Link href="/dashboard">
          <Image src="/logo-icon.svg" alt="ProAgent" width={32} height={32} priority />
        </Link>
      </div>

      {/* Top Controls Group (Search, Notifications, Expand) */}
      {isCollapsed && (
        <div className="main-sidebar__controls">
          <button className="main-sidebar__search">
            <span className="material-symbols-outlined">search</span>
            <span className="main-sidebar__item-tooltip">Buscar</span>
          </button>

          <button className="main-sidebar__item main-sidebar__notification-btn" onClick={toggleNotifications}>
            <span className="material-symbols-outlined">notifications</span>
            {notificationCount > 0 && (
              <span className="main-sidebar__notification-badge">{notificationCount}</span>
            )}
            <span className="main-sidebar__item-tooltip">Notificaciones</span>
          </button>

          <button 
            className="main-sidebar__item" 
            onClick={onToggleCollapse}
          >
            <span className="material-symbols-outlined">right_panel_close</span>
            <span className="main-sidebar__item-tooltip">Expandir barra</span>
          </button>
        </div>
      )}

      {/* Search (when not collapsed) */}
      {!isCollapsed && (
        <button className="main-sidebar__search">
          <span className="material-symbols-outlined">search</span>
          <span className="main-sidebar__item-tooltip">Buscar</span>
        </button>
      )}

      {/* Main Navigation */}
      <nav className="main-sidebar__nav">
        {mainModules.map((module) => {
          const isActive = activeModule === module.id;
          const moduleSubMenu = getSubMenu(module.id);
          const hasSubMenu = moduleSubMenu.length > 0;
          const showSubMenu = isCollapsed && hasSubMenu && hoveredModule === module.id;

          return (
            <div
              key={module.id}
              className="main-sidebar__item-wrapper"
              onMouseEnter={() => isCollapsed && hasSubMenu && setHoveredModule(module.id)}
              onMouseLeave={() => isCollapsed && hasSubMenu && setHoveredModule(null)}
            >
              <Link
                href={module.href}
                className={`main-sidebar__item ${isActive ? 'main-sidebar__item--active' : ''}`}
              >
                <span className="material-symbols-outlined">{module.icon}</span>
                <span className="main-sidebar__item-tooltip">{module.label}</span>
              </Link>

              {/* Submenu when collapsed */}
              {showSubMenu && (
                <div className="main-sidebar__inicio-menu">
                  <div className="main-sidebar__inicio-menu-header">
                    <span className="main-sidebar__inicio-menu-title">{module.label}</span>
                  </div>
                  {moduleSubMenu.map((item) => (
                    <Link
                      key={item.id}
                      href={item.href}
                      className={`main-sidebar__inicio-menu-item ${activeSubItem === item.id ? 'main-sidebar__inicio-menu-item--active' : ''}`}
                    >
                      <span className="material-symbols-outlined">{item.icon}</span>
                      <span>{item.label}</span>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </nav>

      {/* Secondary Navigation */}
      <nav className="main-sidebar__secondary">
        {secondaryModules.map((module) => (
          <Link
            key={module.id}
            href={module.href}
            className={`main-sidebar__item ${!module.icon ? 'main-sidebar__item--svg' : ''}`}
          >
            {module.icon ? (
              <span className="material-symbols-outlined">{module.icon}</span>
            ) : (
              <>
                <Image 
                  src={module.iconSrc!} 
                  alt={module.label} 
                  width={24} 
                  height={24}
                  className="main-sidebar__icon-normal"
                />
                <Image 
                  src={module.iconSrcFilled!} 
                  alt={module.label} 
                  width={24} 
                  height={24}
                  className="main-sidebar__icon-filled"
                />
              </>
            )}
            <span className="main-sidebar__item-tooltip">{module.label}</span>
          </Link>
        ))}

        {/* User Avatar */}
        <div 
          className="main-sidebar__avatar-wrapper"
          onMouseEnter={() => setShowUserMenu(true)}
          onMouseLeave={() => setShowUserMenu(false)}
        >
          <div className="main-sidebar__avatar">
            <span>{userInitials}</span>
          </div>

          {/* User Menu */}
          {showUserMenu && (
            <div className="main-sidebar__user-menu">
              <div className="main-sidebar__user-menu-header">
                <span className="main-sidebar__user-name">{userName}</span>
              </div>
              <div className="main-sidebar__user-menu-divider"></div>
              <button 
                className="main-sidebar__user-menu-item"
                onClick={() => router.push('/profile')}
              >
                Mi Cuenta
              </button>
              <button 
                className="main-sidebar__user-menu-item"
                onClick={handleLogout}
              >
                Cerrar Sesión
              </button>
            </div>
          )}
        </div>
      </nav>
    </aside>
  );
}
