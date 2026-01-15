'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { StatCard } from '@/components/dashboard/StatCard';
import { QuickAction } from '@/components/dashboard/QuickAction';
import { PromoBanner } from '@/components/dashboard/PromoBanner';
import { CalendarCard } from '@/components/dashboard/CalendarCard';
import { NewsCard } from '@/components/dashboard/NewsCard';
import { OnboardingCard } from '@/components/dashboard/OnboardingCard';
import { NewClientModal } from '@/components/crm/clients/NewClientModal';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import './DashboardPage.scss';

interface DashboardPageProps {
  userName?: string;
}

export function DashboardPage({ userName = 'Arieldi' }: DashboardPageProps) {
  const router = useRouter();
  const [clientsCount, setClientsCount] = useState(0);
  const [bookingsCount, setBookingsCount] = useState(2); // Count from CRM Reservas module
  const [isNewClientModalOpen, setIsNewClientModalOpen] = useState(false);
  const [isNewCotizacionModalOpen, setIsNewCotizacionModalOpen] = useState(false);
  const [isNewReservaModalOpen, setIsNewReservaModalOpen] = useState(false);

  // Get clients count from localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('crm_clients');
      if (stored) {
        const clients = JSON.parse(stored);
        setClientsCount(clients.length);
      }
    }
  }, []);

  // Handle client added (refresh count)
  const handleClientAdded = () => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('crm_clients');
      if (stored) {
        const clients = JSON.parse(stored);
        setClientsCount(clients.length);
      }
    }
  };

  const stats = [
    { title: 'Clientes', value: clientsCount, icon: 'group', onClick: () => router.push('/es/crm/clientes') },
    { title: 'Expedientes', value: 2, icon: 'folder_open', onClick: () => router.push('/es/crm/expedientes') },
    { title: 'Reservas', value: bookingsCount, icon: 'airplane_ticket', onClick: () => router.push('/es/crm/reservas') },
    { title: 'Cotizaciones', value: 2, icon: 'description', onClick: () => router.push('/es/crm/cotizaciones') },
  ];

  const quickActions = [
    { title: 'Nuevo Cliente', icon: 'person', onClick: () => setIsNewClientModalOpen(true) },
    { title: 'Nueva Cotización', icon: 'description', onClick: () => setIsNewCotizacionModalOpen(true) },
    { title: 'Nueva Reserva', icon: 'airplane_ticket', onClick: () => setIsNewReservaModalOpen(true) },
    { title: 'Nuevo Expediente', icon: 'folder', onClick: () => router.push('/es/crm/expedientes/nuevo-manual') },
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
          <StatCard 
            key={stat.title} 
            title={stat.title} 
            value={stat.value} 
            icon={stat.icon}
            onClick={stat.onClick}
          />
        ))}
      </div>

      {/* Quick Actions Row */}
      <div className="dashboard-page__actions">
        {quickActions.map((action) => (
          <QuickAction 
            key={action.title} 
            title={action.title} 
            icon={action.icon}
            onClick={action.onClick}
          />
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

      {/* New Client Modal */}
      <NewClientModal
        isOpen={isNewClientModalOpen}
        onClose={() => setIsNewClientModalOpen(false)}
        onClientAdded={handleClientAdded}
      />

      {/* Modal Nueva Cotización */}
      <Dialog open={isNewCotizacionModalOpen} onOpenChange={setIsNewCotizacionModalOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle className="text-2xl font-semibold text-slate-900">Nueva Cotización</DialogTitle>
          </DialogHeader>
          <div className="grid grid-cols-2 gap-6 py-6">
            {/* Cotización con Motor */}
            <button 
              className="flex flex-col items-center gap-4 p-6 bg-white border-2 border-slate-200 rounded-lg hover:border-slate-700 hover:shadow-md transition-all cursor-pointer"
              onClick={() => {
                window.open('https://azucartravel.com/?tripType=TRIP_PLANNER', '_blank', 'noopener,noreferrer');
                setIsNewCotizacionModalOpen(false);
              }}
            >
              <span className="material-symbols-outlined text-slate-700 text-6xl" style={{ fontVariationSettings: "'FILL' 0, 'wght' 200, 'GRAD' 0, 'opsz' 48" }}>
                travel_explore
              </span>
              <div className="text-center">
                <h3 className="text-lg font-semibold text-slate-900">Cotización con Motor</h3>
                <p className="text-sm text-slate-500 mt-1">Buscar y cotizar con nuestro motor de búsqueda</p>
              </div>
            </button>

            {/* Cotización Manual */}
            <button 
              className="flex flex-col items-center gap-4 p-6 bg-white border-2 border-slate-200 rounded-lg hover:border-slate-700 hover:shadow-md transition-all cursor-pointer"
              onClick={() => {
                router.push('/es/crm/cotizaciones/nueva-manual');
                setIsNewCotizacionModalOpen(false);
              }}
            >
              <span className="material-symbols-outlined text-slate-700 text-6xl" style={{ fontVariationSettings: "'FILL' 0, 'wght' 200, 'GRAD' 0, 'opsz' 48" }}>
                edit_note
              </span>
              <div className="text-center">
                <h3 className="text-lg font-semibold text-slate-900">Cotización Manual</h3>
                <p className="text-sm text-slate-500 mt-1">Crear una cotización de forma manual</p>
              </div>
            </button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Modal Nueva Reserva */}
      <Dialog open={isNewReservaModalOpen} onOpenChange={setIsNewReservaModalOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle className="text-2xl font-semibold text-slate-900">Nueva Reserva</DialogTitle>
          </DialogHeader>
          <div className="grid grid-cols-2 gap-6 py-6">
            {/* Reserva con Motor */}
            <button 
              className="flex flex-col items-center gap-4 p-6 bg-white border-2 border-slate-200 rounded-lg hover:border-slate-700 hover:shadow-md transition-all cursor-pointer"
              onClick={() => {
                window.open('https://azucartravel.com/?tripType=TRIP_PLANNER', '_blank', 'noopener,noreferrer');
                setIsNewReservaModalOpen(false);
              }}
            >
              <span className="material-symbols-outlined text-slate-700 text-6xl" style={{ fontVariationSettings: "'FILL' 0, 'wght' 200, 'GRAD' 0, 'opsz' 48" }}>
                travel_explore
              </span>
              <div className="text-center">
                <h3 className="text-lg font-semibold text-slate-900">Reserva con Motor</h3>
                <p className="text-sm text-slate-500 mt-1">Buscar y reservar con nuestro motor de búsqueda</p>
              </div>
            </button>

            {/* Reserva Manual */}
            <button 
              className="flex flex-col items-center gap-4 p-6 bg-white border-2 border-slate-200 rounded-lg hover:border-slate-700 hover:shadow-md transition-all cursor-pointer"
              onClick={() => {
                router.push('/es/crm/reservas/nueva-manual');
                setIsNewReservaModalOpen(false);
              }}
            >
              <span className="material-symbols-outlined text-slate-700 text-6xl" style={{ fontVariationSettings: "'FILL' 0, 'wght' 200, 'GRAD' 0, 'opsz' 48" }}>
                edit_note
              </span>
              <div className="text-center">
                <h3 className="text-lg font-semibold text-slate-900">Reserva Manual</h3>
                <p className="text-sm text-slate-500 mt-1">Crear una reserva de forma manual</p>
              </div>
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
    </DashboardLayout>
  );
}
