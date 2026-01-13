'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTranslations } from 'next-intl';
import Icon from '@mdi/react';
import type { NavItem } from '@/config/navigation';
import './Sidebar.scss';

interface SidebarProps {
  items: NavItem[];
  isOpen: boolean;
  onToggle: () => void;
}

export function Sidebar({ items, isOpen, onToggle }: SidebarProps) {
  const pathname = usePathname();
  const t = useTranslations('navigation');

  return (
    <>
      <aside className={`sidebar ${isOpen ? 'sidebar--open' : 'sidebar--closed'}`}>
        <nav className="sidebar__nav">
          {items.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`sidebar__item ${isActive ? 'sidebar__item--active' : ''}`}
              >
                <Icon path={item.icon} size={1} className="sidebar__icon" />
                {isOpen && <span className="sidebar__label">{t(item.label)}</span>}
              </Link>
            );
          })}
        </nav>
      </aside>
      {isOpen && <div className="sidebar__overlay" onClick={onToggle} />}
    </>
  );
}
