'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import './ClientDetailPage.scss';

interface ClientDetailPageProps {
  clientId: string;
}

export function ClientDetailPage({ clientId }: ClientDetailPageProps) {
  const t = useTranslations('crm.clientDetail');
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('about');

  // TODO: Fetch client data from API
  // Sample clients data
  const clients = [
    { id: '1', firstName: 'Arieldi', lastName: 'Marrero', quotations: 0, bookings: 0, files: 0 },
    { id: '2', firstName: 'Henrry', lastName: 'Mulet', quotations: 0, bookings: 0, files: 0 },
    { id: '3', firstName: 'Gretell', lastName: 'Rojas Rodriguez', quotations: 0, bookings: 0, files: 0 },
    { id: '4', firstName: 'Elio', lastName: 'Zambrano', quotations: 0, bookings: 0, files: 0 },
  ];

  const foundClient = clients.find(c => c.id === clientId);

  const client = foundClient ? {
    id: clientId,
    firstName: foundClient.firstName,
    lastName: foundClient.lastName,
    quotations: foundClient.quotations,
    bookings: foundClient.bookings,
    files: foundClient.files,
    email: '',
    phone: '',
    address: '',
    importantDates: '',
    allergies: '',
    knownTravelerNumber: '',
  } : {
    id: clientId,
    firstName: 'Cliente',
    lastName: 'Desconocido',
    quotations: 0,
    bookings: 0,
    files: 0,
    email: '',
    phone: '',
    address: '',
    importantDates: '',
    allergies: '',
    knownTravelerNumber: '',
  };

  const getInitials = (firstName: string, lastName: string) => {
    return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
  };

  const handleBack = () => {
    router.push('/crm/clientes');
  };

  const handleDeleteClient = () => {
    // TODO: Implement delete functionality
    if (confirm(t('confirmDelete'))) {
      console.log('Delete client:', clientId);
      router.push('/crm/clientes');
    }
  };

  const handleBlockClient = () => {
    // TODO: Implement block functionality
    if (confirm(t('confirmBlock'))) {
      console.log('Block client:', clientId);
    }
  };

  const tabs = [
    { id: 'about', label: t('tabs.about') },
    { id: 'creditCards', label: t('tabs.creditCards') },
    { id: 'loyaltyPrograms', label: t('tabs.loyaltyPrograms') },
    { id: 'associatedTravelers', label: t('tabs.associatedTravelers') },
    { id: 'notes', label: t('tabs.notes') },
  ];

  return (
    <div className="client-detail">
      {/* Back Button */}
      <button className="client-detail__back" onClick={handleBack}>
        <span className="material-symbols-outlined">arrow_back</span>
      </button>

      {/* Header */}
      <div className="client-detail__header">
        <div className="client-detail__header-main">
          <div className="client-detail__avatar-large">
            {getInitials(client.firstName, client.lastName)}
          </div>
          <div className="client-detail__header-info">
            <h1 className="client-detail__name">
              {client.firstName} {client.lastName}
            </h1>
            <div className="client-detail__stats">
              <div className="client-detail__stat-item">
                <span className="client-detail__stat-value">{client.quotations}</span>
                <span className="client-detail__stat-label">{t('stats.quotations')}</span>
              </div>
              <div className="client-detail__stat-divider">|</div>
              <div className="client-detail__stat-item">
                <span className="client-detail__stat-value">{client.bookings}</span>
                <span className="client-detail__stat-label">{t('stats.bookings')}</span>
              </div>
              <div className="client-detail__stat-divider">|</div>
              <div className="client-detail__stat-item">
                <span className="client-detail__stat-value">{client.files}</span>
                <span className="client-detail__stat-label">{t('stats.files')}</span>
              </div>
            </div>
          </div>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="client-detail__actions-button">
              {t('actions')}
              <span className="material-symbols-outlined">expand_more</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="client-detail__actions-menu">
            <DropdownMenuItem onClick={handleBlockClient} className="client-detail__menu-item">
              <span className="material-symbols-outlined">block</span>
              {t('blockClient')}
            </DropdownMenuItem>
            <DropdownMenuItem 
              onClick={handleDeleteClient} 
              className="client-detail__menu-item client-detail__menu-item--danger"
            >
              <span className="material-symbols-outlined">delete</span>
              {t('deleteClient')}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Tabs */}
      <div className="client-detail__tabs">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`client-detail__tab ${activeTab === tab.id ? 'client-detail__tab--active' : ''}`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Content */}
      {activeTab === 'about' && (
        <div className="client-detail__content">
          {/* Contact Section */}
          <div className="client-detail__section">
            <div className="client-detail__section-header">
              <span className="material-symbols-outlined client-detail__section-icon">
                contact_mail
              </span>
              <h2 className="client-detail__section-title">{t('sections.contact')}</h2>
            </div>
            <div className="client-detail__section-content">
              <div className="client-detail__field">
                <span className="client-detail__field-label">{t('fields.name')}</span>
                <span className="client-detail__field-value">
                  {client.firstName} {client.lastName}
                </span>
                <button className="client-detail__field-edit">
                  <span className="material-symbols-outlined">edit</span>
                </button>
              </div>
              <div className="client-detail__field">
                <span className="client-detail__field-label">{t('fields.email')}</span>
                <span className="client-detail__field-value client-detail__field-value--empty">
                  {client.email || t('editToAdd')}
                </span>
                <button className="client-detail__field-edit">
                  <span className="material-symbols-outlined">edit</span>
                </button>
              </div>
              <div className="client-detail__field">
                <span className="client-detail__field-label">{t('fields.phoneNumber')}</span>
                <span className="client-detail__field-value client-detail__field-value--empty">
                  {client.phone || t('editToAdd')}
                </span>
                <button className="client-detail__field-edit">
                  <span className="material-symbols-outlined">edit</span>
                </button>
              </div>
              <div className="client-detail__field">
                <span className="client-detail__field-label">{t('fields.address')}</span>
                <span className="client-detail__field-value client-detail__field-value--empty">
                  {client.address || t('editToAdd')}
                </span>
                <button className="client-detail__field-edit">
                  <span className="material-symbols-outlined">edit</span>
                </button>
              </div>
            </div>
          </div>

          {/* Personal Details Section */}
          <div className="client-detail__section">
            <div className="client-detail__section-header">
              <span className="material-symbols-outlined client-detail__section-icon">
                person
              </span>
              <h2 className="client-detail__section-title">{t('sections.personalDetails')}</h2>
            </div>
            <div className="client-detail__section-content">
              <div className="client-detail__field">
                <span className="client-detail__field-label">{t('fields.importantDates')}</span>
                <span className="client-detail__field-value client-detail__field-value--empty">
                  {client.importantDates || t('editToAdd')}
                </span>
                <button className="client-detail__field-edit">
                  <span className="material-symbols-outlined">edit</span>
                </button>
              </div>
              <div className="client-detail__field">
                <span className="client-detail__field-label">{t('fields.allergies')}</span>
                <span className="client-detail__field-value client-detail__field-value--empty">
                  {client.allergies || t('editToAdd')}
                </span>
                <button className="client-detail__field-edit">
                  <span className="material-symbols-outlined">edit</span>
                </button>
              </div>
            </div>
          </div>

          {/* Flight Info Section */}
          <div className="client-detail__section">
            <div className="client-detail__section-header">
              <span className="material-symbols-outlined client-detail__section-icon">
                flight_takeoff
              </span>
              <h2 className="client-detail__section-title">{t('sections.flightInfo')}</h2>
            </div>
            <div className="client-detail__section-content">
              <div className="client-detail__field">
                <span className="client-detail__field-label">{t('fields.knownTravelerNumber')}</span>
                <span className="client-detail__field-value client-detail__field-value--empty">
                  {client.knownTravelerNumber || t('editToAdd')}
                </span>
                <button className="client-detail__field-edit">
                  <span className="material-symbols-outlined">edit</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Other tabs content */}
      {activeTab !== 'about' && (
        <div className="client-detail__content">
          <p className="client-detail__empty-state">
            {t('emptyState')}
          </p>
        </div>
      )}
    </div>
  );
}
