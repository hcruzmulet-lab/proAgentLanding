'use client';

import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { StatCard } from '@/components/dashboard/StatCard';
import { QuickAction } from '@/components/dashboard/QuickAction';
import { PromoBanner } from '@/components/dashboard/PromoBanner';
import { CalendarCard } from '@/components/dashboard/CalendarCard';
import { NewsCard } from '@/components/dashboard/NewsCard';
import { OnboardingCard } from '@/components/dashboard/OnboardingCard';
import './DashboardPage.scss';

interface DashboardPageProps {
  userName?: string;
}

export function DashboardPage({ userName = 'Arieldi' }: DashboardPageProps) {
  const stats = [
    { title: 'Clientes', value: 24, icon: 'group' },
    { title: 'Expedientes', value: 46, icon: 'folder_open' },
    { title: 'Reservas', value: 57, icon: 'airplane_ticket' },
    { title: 'Cotizaciones', value: 78, icon: 'description' },
  ];

  const quickActions = [
    { title: 'Nuevo Cliente', icon: 'person' },
    { title: 'Nuevo Expediente', icon: 'folder' },
    { title: 'Nueva Reserva', icon: 'airplane_ticket' },
    { title: 'Nueva Cotización', icon: 'description' },
  ];

  return (
    <DashboardLayout activeModule="inicio" activeSubItem="dashboard" title="Inicio">
      <div className="dashboard-page">
        {/* Header */}
        <div className="dashboard-page__header">
          <p className="dashboard-page__welcome">Bienvenido {userName}</p>
          <div className="dashboard-page__reminder" onClick={() => console.log('Reminder clicked')}>
            <span className="material-symbols-outlined dashboard-page__reminder-icon">schedule</span>
            <span className="dashboard-page__reminder-text">
              Hoy cierran las ventas del Grupo Dubái: Último día para confirmar pasajeros
            </span>
            <span className="dashboard-page__reminder-date">02/01/2026</span>
          </div>
        </div>

        {/* Stats Row */}
        <div className="dashboard-page__stats">
          {stats.map((stat) => (
            <StatCard key={stat.title} title={stat.title} value={stat.value} icon={stat.icon} />
          ))}
        </div>

        {/* Quick Actions Row */}
        <div className="dashboard-page__actions">
          {quickActions.map((action) => (
            <QuickAction key={action.title} title={action.title} icon={action.icon} />
          ))}
        </div>

        {/* Banners and Calendar Row */}
        <div className="dashboard-page__banners-row">
          <div className="dashboard-page__banners-col">
            {/* Large Banner */}
            <PromoBanner
              title="Ritz-Carlton<br/>Residence Cancún"
              subtitle="Nueva apertura"
              imageUrl="https://res.cloudinary.com/ddagvoaq2/image/upload/v1768254393/nueva-apertura_pl0xbd.png"
              size="large"
            />

            {/* Two Medium Banners */}
            <div className="dashboard-page__banners-small">
              <PromoBanner
                title="Europa"
                subtitle="Ofertas"
                imageUrl="https://res.cloudinary.com/ddagvoaq2/image/upload/v1768254393/europa_zp6qka.png"
                buttonText="Ver ofertas"
              />
              <PromoBanner
                title="Cruceros"
                subtitle="Ofertas"
                imageUrl="https://res.cloudinary.com/ddagvoaq2/image/upload/v1768254392/cruceros_z8dygn.png"
                buttonText="Ver ofertas"
              />
            </div>
          </div>

          <CalendarCard />
        </div>

        {/* News and Onboarding Row */}
        <div className="dashboard-page__bottom-row">
          <NewsCard />
          <OnboardingCard />
        </div>
      </div>
    </DashboardLayout>
  );
}
