'use client';

import Link from 'next/link';
import { useUiStore } from '@/stores/ui/uiStore';
import './SubSidebar.scss';

interface SubSidebarProps {
  title: string;
  activeItem?: string;
  menuItems: Array<{ id: string; icon?: string; label?: string; href?: string; isDivider?: boolean; isExternal?: boolean }>;
  isCollapsed?: boolean;
  onToggleCollapse?: () => void;
  notificationCount?: number;
}

export function SubSidebar({
  title,
  activeItem,
  menuItems,
  isCollapsed = false,
  onToggleCollapse,
  notificationCount = 0,
}: SubSidebarProps) {
  const { toggleNotifications } = useUiStore();

  if (isCollapsed) {
    return null; // Do not render SubSidebar if collapsed
  }

  return (
    <aside className={`sub-sidebar ${isCollapsed ? 'sub-sidebar--collapsed' : ''}`}>
      {/* Header */}
      <div className="sub-sidebar__header">
        <h2 className="sub-sidebar__title">{title}</h2>
        <div className="sub-sidebar__actions">
          <button
            className="sub-sidebar__action-btn"
            onClick={onToggleCollapse}
            title="Colapsar menú"
          >
            <span className="material-symbols-outlined">right_panel_open</span>
          </button>
          <button className="sub-sidebar__action-btn sub-sidebar__notification-btn" title="Notificaciones" onClick={toggleNotifications}>
            <span className="material-symbols-outlined">notifications</span>
            {notificationCount > 0 && (
              <span className="sub-sidebar__notification-badge">{notificationCount}</span>
            )}
          </button>
        </div>
      </div>

      {/* Menu Items */}
      <nav className="sub-sidebar__nav">
        {menuItems.map((item) => {
          if (item.isDivider) {
            return <div key={item.id} className="sub-sidebar__divider" />;
          }
          
          // Si es un link externo, usar <a> en lugar de <Link>
          if (item.isExternal) {
            return (
              <a
                key={item.id}
                href={item.href!}
                target="_blank"
                rel="noopener noreferrer"
                className={`sub-sidebar__item ${activeItem === item.id ? 'sub-sidebar__item--active' : ''}`}
              >
                <span className="material-symbols-outlined">{item.icon}</span>
                <span>{item.label}</span>
              </a>
            );
          }
          
          return (
            <Link
              key={item.id}
              href={item.href!}
              className={`sub-sidebar__item ${activeItem === item.id ? 'sub-sidebar__item--active' : ''}`}
            >
              <span className="material-symbols-outlined">{item.icon}</span>
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
