'use client';

import { useTranslations } from 'next-intl';
import Icon from '@mdi/react';
import { mdiMenu, mdiLogout, mdiAccount } from '@mdi/js';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import type { User } from '@/types';
import './Header.scss';

interface HeaderProps {
  user: User;
  onMenuClick: () => void;
  onLogout: () => void;
}

export function Header({ user, onMenuClick, onLogout }: HeaderProps) {
  const t = useTranslations('common');
  const tNav = useTranslations('navigation');
  const tAuth = useTranslations('auth');

  const initials = user.name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

  return (
    <header className="header">
      <div className="header__left">
        <Button variant="ghost" size="icon" onClick={onMenuClick} className="header__menu-btn">
          <Icon path={mdiMenu} size={1} />
        </Button>
        <h1 className="header__title">ProAgent</h1>
      </div>

      <div className="header__right">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="header__user">
              <Avatar className="header__avatar">
                <AvatarFallback>{initials}</AvatarFallback>
              </Avatar>
              <span className="header__user-name">{user.name}</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>{user.email}</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Icon path={mdiAccount} size={0.8} />
              <span>{tNav('profile')}</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Icon path={mdiMenu} size={0.8} />
              <span>{tNav('settings')}</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={onLogout}>
              <Icon path={mdiLogout} size={0.8} />
              <span>{tAuth('logout')}</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
