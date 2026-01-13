export type { User, Role } from '@/stores/auth/authStore';

export type SubscriptionPlan = 'FREE' | 'PRO' | 'ENTERPRISE';

export interface Agency {
  id: string;
  name: string;
  email: string;
  phone?: string;
  address?: string;
  status: 'active' | 'inactive' | 'suspended';
  plan: SubscriptionPlan;
  createdAt: string;
  updatedAt: string;
}

export interface Booking {
  id: string;
  agencyId: string;
  clientName: string;
  destination: string;
  date: string;
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
  totalAmount: number;
  createdAt: string;
  updatedAt: string;
}

export interface Agent {
  id: string;
  name: string;
  email: string;
  role: 'AGENT' | 'ADMIN' | 'SUPER_ADMIN';
  agencyId: string;
  createdAt: string;
  updatedAt: string;
}
