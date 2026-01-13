'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import './ClientsPage.scss';

interface Client {
  id: string;
  firstName: string;
  lastName: string;
  quotations: number;
  bookings: number;
  files: number;
}

const initialClients: Client[] = [
  { id: '1', firstName: 'Arieldi', lastName: 'Marrero', quotations: 0, bookings: 0, files: 0 },
  { id: '2', firstName: 'Henrry', lastName: 'Mulet', quotations: 0, bookings: 0, files: 0 },
  { id: '3', firstName: 'Gretell', lastName: 'Rojas Rodriguez', quotations: 0, bookings: 0, files: 0 },
  { id: '4', firstName: 'Elio', lastName: 'Zambrano', quotations: 0, bookings: 0, files: 0 },
];

export function ClientsPage() {
  const t = useTranslations('crm.clients');
  const router = useRouter();
  
  // Initialize clients from localStorage or use initial clients
  const [clients, setClients] = useState<Client[]>(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('crm_clients');
      if (stored) {
        return JSON.parse(stored);
      }
      // Save initial clients to localStorage on first load
      localStorage.setItem('crm_clients', JSON.stringify(initialClients));
    }
    return initialClients;
  });
  
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newClient, setNewClient] = useState({ firstName: '', lastName: '' });

  // Save clients to localStorage whenever they change
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('crm_clients', JSON.stringify(clients));
    }
  }, [clients]);

  const getInitials = (firstName: string, lastName: string) => {
    return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
  };

  const filteredClients = clients.filter((client) =>
    `${client.firstName} ${client.lastName}`.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddClient = () => {
    if (newClient.firstName && newClient.lastName) {
      const client: Client = {
        id: Date.now().toString(),
        firstName: newClient.firstName,
        lastName: newClient.lastName,
        quotations: 0,
        bookings: 0,
        files: 0,
      };
      setClients([...clients, client]);
      setNewClient({ firstName: '', lastName: '' });
      setIsModalOpen(false);
      // Redirect to client detail page
      router.push(`/crm/clientes/${client.id}`);
    }
  };

  const handleClientClick = (clientId: string) => {
    router.push(`/crm/clientes/${clientId}`);
  };

  return (
    <div className="clients-page">
      {/* Header */}
      <div className="clients-page__header">
        <div className="clients-page__header-left">
          <h1 className="clients-page__title">Clientes</h1>
          <p className="clients-page__count">{clients.length} clientes</p>
        </div>
        <div className="clients-page__actions">
          <Button onClick={() => setIsModalOpen(true)} className="clients-page__add-button">
            <span className="material-symbols-outlined clients-page__button-icon">add</span>
            {t('addClient')}
          </Button>
        </div>
      </div>

      {/* Search */}
      <div className="clients-page__search-container">
        <div className="clients-page__search-wrapper">
          <span className="material-symbols-outlined clients-page__search-icon">search</span>
          <Input
            type="text"
            placeholder={t('searchByName')}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="clients-page__search-input"
          />
        </div>
      </div>

      {/* Count */}
      <p className="clients-page__count">
        {filteredClients.length} {t('clientsCount')}
      </p>

      {/* Clients List */}
      <div className="clients-page__list">
        {filteredClients.map((client) => (
          <div 
            key={client.id} 
            className="clients-page__client-card"
            onClick={() => handleClientClick(client.id)}
          >
            <div className="clients-page__client-info">
              <div className="clients-page__avatar">
                {getInitials(client.firstName, client.lastName)}
              </div>
              <span className="clients-page__client-name">
                {client.firstName} {client.lastName}
              </span>
            </div>
            <div className="clients-page__client-stats">
              <div className="clients-page__stat">
                <span className="clients-page__stat-value">{client.quotations}</span>
                <span className="clients-page__stat-label">{t('quotations')}</span>
              </div>
              <div className="clients-page__stat">
                <span className="clients-page__stat-value">{client.bookings}</span>
                <span className="clients-page__stat-label">{t('bookings')}</span>
              </div>
              <div className="clients-page__stat">
                <span className="clients-page__stat-value">{client.files}</span>
                <span className="clients-page__stat-label">{t('files')}</span>
              </div>
              <button className="clients-page__chevron">
                <span className="material-symbols-outlined">chevron_right</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Add Client Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="clients-page__modal">
          <button
            className="clients-page__modal-close"
            onClick={() => setIsModalOpen(false)}
            aria-label="Close"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
          <DialogHeader>
            <DialogTitle className="clients-page__modal-title">{t('addClient')}</DialogTitle>
          </DialogHeader>
          <div className="clients-page__modal-form">
            <div className="clients-page__form-group">
              <Label htmlFor="firstName" className="clients-page__label">
                {t('firstName')} <span className="clients-page__required">Required</span>
              </Label>
              <Input
                id="firstName"
                placeholder={t('enterFirstName')}
                value={newClient.firstName}
                onChange={(e) => setNewClient({ ...newClient, firstName: e.target.value })}
                className="clients-page__input"
              />
            </div>
            <div className="clients-page__form-group">
              <Label htmlFor="lastName" className="clients-page__label">
                {t('lastName')} <span className="clients-page__required">Required</span>
              </Label>
              <Input
                id="lastName"
                placeholder={t('enterLastName')}
                value={newClient.lastName}
                onChange={(e) => setNewClient({ ...newClient, lastName: e.target.value })}
                className="clients-page__input"
              />
            </div>
            <div className="clients-page__modal-actions">
              <Button
                variant="outline"
                onClick={() => setIsModalOpen(false)}
                className="clients-page__cancel-button"
              >
                {t('cancel')}
              </Button>
              <Button
                onClick={handleAddClient}
                disabled={!newClient.firstName || !newClient.lastName}
                className="clients-page__submit-button"
              >
                {t('addClient')}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
