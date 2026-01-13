import type { Role } from '@/types';

export const ROLE_PERMISSIONS: Record<Role, string[]> = {
  SUPER_ADMIN: ['*'],
  ADMIN: [
    'view:agencies',
    'edit:agencies',
    'view:agents',
    'edit:agents',
    'view:bookings',
    'view:billing',
    'view:reports',
  ],
  AGENT: ['view:bookings', 'create:bookings', 'view:clients', 'create:clients', 'view:commissions'],
};

export function hasPermission(role: Role, permission: string): boolean {
  const permissions = ROLE_PERMISSIONS[role];
  return permissions.includes('*') || permissions.includes(permission);
}
