'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';
import './ClientDetailPage.scss';

interface ClientDetailPageProps {
  clientId: string;
}

export function ClientDetailPage({ clientId }: ClientDetailPageProps) {
  const t = useTranslations('crm.clientDetail');
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('about');

  // TODO: Fetch client data from API
  const client = {
    id: clientId,
    firstName: 'Miguel',
    lastName: 'Zabala',
    bookings: 0,
    commissionableValue: 0,
    commissions: 0,
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
                <span className="client-detail__stat-value">{client.bookings}</span>
                <span className="client-detail__stat-label">{t('stats.bookings')}</span>
              </div>
              <div className="client-detail__stat-divider">|</div>
              <div className="client-detail__stat-item">
                <span className="client-detail__stat-value">${client.commissionableValue}</span>
                <span className="client-detail__stat-label">{t('stats.commissionableValue')}</span>
              </div>
              <div className="client-detail__stat-divider">|</div>
              <div className="client-detail__stat-item">
                <span className="client-detail__stat-value">${client.commissions}</span>
                <span className="client-detail__stat-label">{t('stats.commissions')}</span>
              </div>
            </div>
          </div>
        </div>
        <Button variant="outline" className="client-detail__actions-button">
          {t('actions')}
          <span className="material-symbols-outlined">expand_more</span>
        </Button>
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
