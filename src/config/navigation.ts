import {
  mdiViewDashboard,
  mdiCalendarCheck,
  mdiAccountGroup,
  mdiCurrencyUsd,
  mdiDomain,
  mdiAccountTie,
  mdiFileDocument,
  mdiCog,
} from '@mdi/js';
import { ROUTES } from '@/constants/routes';
import type { Role } from '@/types';

export interface NavItem {
  label: string; // Translation key
  href: string;
  icon: string;
  roles: Role[];
}

export const AGENT_NAV: NavItem[] = [
  {
    label: 'dashboard',
    href: ROUTES.AGENT.DASHBOARD,
    icon: mdiViewDashboard,
    roles: ['AGENT', 'ADMIN', 'SUPER_ADMIN'],
  },
  {
    label: 'bookings',
    href: ROUTES.AGENT.BOOKINGS,
    icon: mdiCalendarCheck,
    roles: ['AGENT', 'ADMIN', 'SUPER_ADMIN'],
  },
  {
    label: 'clients',
    href: ROUTES.AGENT.CLIENTS,
    icon: mdiAccountGroup,
    roles: ['AGENT', 'ADMIN', 'SUPER_ADMIN'],
  },
  {
    label: 'commissions',
    href: ROUTES.AGENT.COMMISSIONS,
    icon: mdiCurrencyUsd,
    roles: ['AGENT', 'ADMIN', 'SUPER_ADMIN'],
  },
  {
    label: 'settings',
    href: ROUTES.AGENT.SETTINGS,
    icon: mdiCog,
    roles: ['AGENT', 'ADMIN', 'SUPER_ADMIN'],
  },
];

export const ADMIN_NAV: NavItem[] = [
  {
    label: 'dashboard',
    href: ROUTES.ADMIN.DASHBOARD,
    icon: mdiViewDashboard,
    roles: ['ADMIN', 'SUPER_ADMIN'],
  },
  {
    label: 'agencies',
    href: ROUTES.ADMIN.AGENCIES,
    icon: mdiDomain,
    roles: ['ADMIN', 'SUPER_ADMIN'],
  },
  {
    label: 'agents',
    href: ROUTES.ADMIN.AGENTS,
    icon: mdiAccountTie,
    roles: ['ADMIN', 'SUPER_ADMIN'],
  },
  {
    label: 'billing',
    href: ROUTES.ADMIN.BILLING,
    icon: mdiCurrencyUsd,
    roles: ['ADMIN', 'SUPER_ADMIN'],
  },
  {
    label: 'reports',
    href: ROUTES.ADMIN.REPORTS,
    icon: mdiFileDocument,
    roles: ['ADMIN', 'SUPER_ADMIN'],
  },
  {
    label: 'settings',
    href: ROUTES.ADMIN.SETTINGS,
    icon: mdiCog,
    roles: ['ADMIN', 'SUPER_ADMIN'],
  },
];
