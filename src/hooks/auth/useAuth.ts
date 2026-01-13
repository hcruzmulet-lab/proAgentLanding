import { useAuthStore } from '@/stores/auth/authStore';

export function useAuth() {
  const { user, isAuthenticated, setUser, logout, hasRole } = useAuthStore();

  return {
    user,
    isAuthenticated,
    setUser,
    logout,
    hasRole,
    isAgent: hasRole(['AGENT', 'ADMIN', 'SUPER_ADMIN']),
    isAdmin: hasRole(['ADMIN', 'SUPER_ADMIN']),
    isSuperAdmin: hasRole(['SUPER_ADMIN']),
  };
}
