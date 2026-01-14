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
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import './DashboardPage.scss';

interface DashboardPageProps {
  userName?: string;
}

export function DashboardPage({ userName = 'Arieldi' }: DashboardPageProps) {
  const router = useRouter();
  const [clientsCount, setClientsCount] = useState(0);
  const [isNewClientModalOpen, setIsNewClientModalOpen] = useState(false);
  const [newClient, setNewClient] = useState({ firstName: '', lastName: '' });

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

  // Handle add new client
  const handleAddClient = () => {
    if (newClient.firstName.trim() && newClient.lastName.trim()) {
      if (typeof window !== 'undefined') {
        const stored = localStorage.getItem('crm_clients');
        const clients = stored ? JSON.parse(stored) : [];
        const client = {
          id: Date.now().toString(),
          firstName: newClient.firstName.trim(),
          lastName: newClient.lastName.trim(),
          quotations: 0,
          bookings: 0,
          files: 0,
        };
        const updatedClients = [...clients, client];
        localStorage.setItem('crm_clients', JSON.stringify(updatedClients));
        setClientsCount(updatedClients.length);
        setNewClient({ firstName: '', lastName: '' });
        setIsNewClientModalOpen(false);
        // Redirect to client detail page
        router.push(`/es/crm/clientes/${client.id}`);
      }
    }
  };

  const stats = [
    { title: 'Clientes', value: clientsCount, icon: 'group', onClick: () => router.push('/es/crm/clientes') },
    { title: 'Expedientes', value: 46, icon: 'folder_open' },
    { title: 'Reservas', value: 57, icon: 'airplane_ticket' },
    { title: 'Cotizaciones', value: 78, icon: 'description' },
  ];

  const quickActions = [
    { title: 'Nuevo Cliente', icon: 'person', onClick: () => setIsNewClientModalOpen(true) },
    { title: 'Nueva Cotización', icon: 'description' },
    { title: 'Nueva Reserva', icon: 'airplane_ticket' },
    { title: 'Nuevo Expediente', icon: 'folder' },
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
        <Dialog open={isNewClientModalOpen} onOpenChange={setIsNewClientModalOpen}>
          <DialogContent className="dashboard-page__modal">
            <button
              className="dashboard-page__modal-close"
              onClick={() => setIsNewClientModalOpen(false)}
              aria-label="Close"
            >
              <span className="material-symbols-outlined">close</span>
            </button>
            <DialogHeader>
              <DialogTitle className="dashboard-page__modal-title">Agregar Cliente</DialogTitle>
            </DialogHeader>
            <div className="dashboard-page__modal-form">
              <div className="dashboard-page__form-group">
                <Label htmlFor="firstName" className="dashboard-page__label">
                  Nombre <span className="dashboard-page__required">Required</span>
                </Label>
                <Input
                  id="firstName"
                  placeholder="Ingresa el nombre"
                  value={newClient.firstName}
                  onChange={(e) => setNewClient({ ...newClient, firstName: e.target.value })}
                  className="dashboard-page__input"
                />
              </div>
              <div className="dashboard-page__form-group">
                <Label htmlFor="lastName" className="dashboard-page__label">
                  Apellido <span className="dashboard-page__required">Required</span>
                </Label>
                <Input
                  id="lastName"
                  placeholder="Ingresa el apellido"
                  value={newClient.lastName}
                  onChange={(e) => setNewClient({ ...newClient, lastName: e.target.value })}
                  className="dashboard-page__input"
                />
              </div>
              <div className="dashboard-page__modal-actions">
                <Button
                  variant="outline"
                  onClick={() => setIsNewClientModalOpen(false)}
                  className="dashboard-page__cancel-button"
                >
                  Cancelar
                </Button>
                <Button onClick={handleAddClient} className="dashboard-page__add-button">
                  Agregar Cliente
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </DashboardLayout>
  );
}
