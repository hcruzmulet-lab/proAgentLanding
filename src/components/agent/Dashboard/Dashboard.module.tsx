'use client';

import { useTranslations } from 'next-intl';
import { useAuth } from '@/hooks/auth/useAuth';
import { WelcomeCard } from '../shared/WelcomeCard';
import { StatsCard } from '../shared/StatsCard';
import { mdiCalendarCheck, mdiAccountGroup, mdiCurrencyUsd, mdiTrendingUp } from '@mdi/js';
import './Dashboard.module.scss';

export function DashboardModule() {
  const t = useTranslations('dashboard');
  const tBookings = useTranslations('bookings');
  const { user } = useAuth();

  if (!user) return null;

  // Estos datos vendrían de una API en producción
  const stats = [
    {
      title: tBookings('title'),
      value: '24',
      icon: mdiCalendarCheck,
      trend: { value: 12, isPositive: true },
    },
    {
      title: t('recentActivity'),
      value: '156',
      icon: mdiAccountGroup,
      trend: { value: 8, isPositive: true },
    },
    {
      title: t('statistics'),
      value: '$12,450',
      icon: mdiCurrencyUsd,
      trend: { value: 23, isPositive: true },
    },
    {
      title: t('overview'),
      value: '94%',
      icon: mdiTrendingUp,
      trend: { value: 3, isPositive: false },
    },
  ];

  return (
    <div className="dashboard-module">
      <WelcomeCard
        userName={user.name}
        title={t('welcome', { name: user.name })}
        description={t('overview')}
      />

      <div className="dashboard-module__stats">
        {stats.map((stat, index) => (
          <StatsCard key={index} {...stat} />
        ))}
      </div>

      <div className="dashboard-module__content">
        <h2 className="dashboard-module__section-title">{t('recentActivity')}</h2>
        {/* Aquí irían más componentes dumb con datos */}
      </div>
    </div>
  );
}
