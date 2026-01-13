export const ROUTES = {
  // Public routes
  HOME: '/',
  LOGIN: '/login',
  REGISTER: '/register',
  FORGOT_PASSWORD: '/forgot-password',

  // Onboarding
  SUBSCRIBE: '/subscribe',

  // Agent routes
  AGENT: {
    DASHBOARD: '/agent',
    BOOKINGS: '/agent/bookings',
    CLIENTS: '/agent/clients',
    COMMISSIONS: '/agent/commissions',
    PROFILE: '/agent/profile',
    SETTINGS: '/agent/settings',
  },

  // Admin routes
  ADMIN: {
    DASHBOARD: '/admin',
    AGENCIES: '/admin/agencies',
    AGENTS: '/admin/agents',
    BILLING: '/admin/billing',
    REPORTS: '/admin/reports',
    SETTINGS: '/admin/settings',
  },

  // API routes
  API: {
    AUTH: '/api/auth',
    WEBHOOKS: {
      STRIPE: '/api/webhooks/stripe',
    },
  },
} as const;
