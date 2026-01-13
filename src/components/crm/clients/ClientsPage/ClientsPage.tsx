'use client';

import React, { useState, useEffect } from 'react';
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
  const [letterFilter, setLetterFilter] = useState<string>('Todos');
  const [viewMode, setViewMode] = useState<'list' | 'grid'>('list');

  // Save clients to localStorage whenever they change
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('crm_clients', JSON.stringify(clients));
    }
  }, [clients]);

  const getInitials = (firstName: string, lastName: string) => {
    return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
  };

  // Filter by search query
  let filteredClients = clients.filter((client) =>
    `${client.firstName} ${client.lastName}`.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Filter by letter
  if (letterFilter !== 'Todos') {
    filteredClients = filteredClients.filter((client) =>
      client.firstName.charAt(0).toUpperCase() === letterFilter
    );
  }

  // Sort alphabetically
  const sortedClients = [...filteredClients].sort((a, b) =>
    `${a.firstName} ${a.lastName}`.localeCompare(`${b.firstName} ${b.lastName}`)
  );

  // Group by first letter
  const groupedClients: { [key: string]: Client[] } = {};
  sortedClients.forEach((client) => {
    const firstLetter = client.firstName.charAt(0).toUpperCase();
    if (!groupedClients[firstLetter]) {
      groupedClients[firstLetter] = [];
    }
    groupedClients[firstLetter].push(client);
  });

  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

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
      const updatedClients = [...clients, client];
      setClients(updatedClients);
      if (typeof window !== 'undefined') {
        localStorage.setItem('crm_clients', JSON.stringify(updatedClients));
      }
      setNewClient({ firstName: '', lastName: '' });
      setIsModalOpen(false);
      // Redirect to client detail page
      router.push(`/crm/clientes/${client.id}`);
    }
  };

  const handleClientClick = (clientId: string) => {
    router.push(`/crm/clientes/${clientId}`);
  };

  const handleDeleteClient = (clientId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (confirm('¿Estás seguro de que deseas eliminar este cliente?')) {
      const updatedClients = clients.filter((c) => c.id !== clientId);
      setClients(updatedClients);
      if (typeof window !== 'undefined') {
        localStorage.setItem('crm_clients', JSON.stringify(updatedClients));
      }
    }
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

      {/* Search and View Toggle */}
      <div className="clients-page__controls">
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
        <div className="clients-page__view-toggle">
          <button
            className={`clients-page__view-button ${viewMode === 'list' ? 'clients-page__view-button--active' : ''}`}
            onClick={() => setViewMode('list')}
          >
            <span className="material-symbols-outlined">view_list</span>
          </button>
          <button
            className={`clients-page__view-button ${viewMode === 'grid' ? 'clients-page__view-button--active' : ''}`}
            onClick={() => setViewMode('grid')}
          >
            <span className="material-symbols-outlined">grid_view</span>
          </button>
        </div>
      </div>

      {/* Alphabet Filter */}
      <div className="clients-page__alphabet-filter">
        <button
          className={`clients-page__letter-button ${letterFilter === 'Todos' ? 'clients-page__letter-button--active' : ''}`}
          onClick={() => setLetterFilter('Todos')}
        >
          Todos
        </button>
        {alphabet.map((letter) => (
          <button
            key={letter}
            className={`clients-page__letter-button ${letterFilter === letter ? 'clients-page__letter-button--active' : ''}`}
            onClick={() => setLetterFilter(letter)}
          >
            {letter}
          </button>
        ))}
      </div>

      {/* List View */}
      {viewMode === 'list' && (
        <div className="clients-page__table-container">
          <table className="clients-page__table">
            <thead className="clients-page__table-header">
              <tr>
                <th className="clients-page__table-th">Nombre</th>
                <th className="clients-page__table-th">Cotizaciones</th>
                <th className="clients-page__table-th">Reservas</th>
                <th className="clients-page__table-th">Expedientes</th>
                <th className="clients-page__table-th clients-page__table-th--actions">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {Object.keys(groupedClients).map((letter) => (
                <React.Fragment key={letter}>
                  <tr className="clients-page__letter-divider">
                    <td colSpan={5}>
                      <div className="clients-page__letter-label">{letter}</div>
                    </td>
                  </tr>
                  {groupedClients[letter].map((client) => (
                    <tr
                      key={client.id}
                      className="clients-page__table-row"
                      onClick={() => handleClientClick(client.id)}
                    >
                      <td className="clients-page__table-td clients-page__table-td--name">
                        {client.firstName} {client.lastName}
                      </td>
                      <td className="clients-page__table-td">{client.quotations}</td>
                      <td className="clients-page__table-td">{client.bookings}</td>
                      <td className="clients-page__table-td">{client.files}</td>
                      <td className="clients-page__table-td clients-page__table-td--actions">
                        <div className="clients-page__actions-buttons">
                          <button
                            className="clients-page__action-button clients-page__action-button--edit"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleClientClick(client.id);
                            }}
                          >
                            <span className="material-symbols-outlined">edit</span>
                          </button>
                          <button
                            className="clients-page__action-button clients-page__action-button--delete"
                            onClick={(e) => handleDeleteClient(client.id, e)}
                          >
                            <span className="material-symbols-outlined">delete</span>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Grid View */}
      {viewMode === 'grid' && (
        <div className="clients-page__grid">
          {Object.keys(groupedClients).map((letter) => (
            <div key={letter} className="clients-page__grid-section">
              <div className="clients-page__grid-letter">{letter}</div>
              <div className="clients-page__grid-items">
                {groupedClients[letter].map((client) => (
                  <div
                    key={client.id}
                    className="clients-page__grid-card"
                    onClick={() => handleClientClick(client.id)}
                  >
                    <div className="clients-page__grid-card-header">
                      <div className="clients-page__avatar">
                        {getInitials(client.firstName, client.lastName)}
                      </div>
                      <span className="clients-page__grid-card-name">
                        {client.firstName} {client.lastName}
                      </span>
                    </div>
                    <div className="clients-page__grid-card-stats">
                      <div className="clients-page__grid-stat">
                        <span className="clients-page__grid-stat-value">{client.quotations}</span>
                        <span className="clients-page__grid-stat-label">{t('quotations')}</span>
                      </div>
                      <div className="clients-page__grid-stat">
                        <span className="clients-page__grid-stat-value">{client.bookings}</span>
                        <span className="clients-page__grid-stat-label">{t('bookings')}</span>
                      </div>
                      <div className="clients-page__grid-stat">
                        <span className="clients-page__grid-stat-value">{client.files}</span>
                        <span className="clients-page__grid-stat-label">{t('files')}</span>
                      </div>
                    </div>
                    <div className="clients-page__grid-card-actions">
                      <button
                        className="clients-page__grid-action-button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleClientClick(client.id);
                        }}
                      >
                        <span className="material-symbols-outlined">edit</span>
                      </button>
                      <button
                        className="clients-page__grid-action-button clients-page__grid-action-button--delete"
                        onClick={(e) => handleDeleteClient(client.id, e)}
                      >
                        <span className="material-symbols-outlined">delete</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

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
