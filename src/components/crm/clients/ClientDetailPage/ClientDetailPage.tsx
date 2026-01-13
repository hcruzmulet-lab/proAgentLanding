'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
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
  const [isEditingFirstName, setIsEditingFirstName] = useState(false);
  const [isEditingLastName, setIsEditingLastName] = useState(false);
  const [editedFirstName, setEditedFirstName] = useState('');
  const [editedLastName, setEditedLastName] = useState('');
  const [isAddCardModalOpen, setIsAddCardModalOpen] = useState(false);

  // Load clients from localStorage or use sample data
  const getClients = () => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('crm_clients');
      if (stored) {
        return JSON.parse(stored);
      }
    }
    return [
      { id: '1', firstName: 'Arieldi', lastName: 'Marrero', quotations: 0, bookings: 0, files: 0 },
      { id: '2', firstName: 'Henrry', lastName: 'Mulet', quotations: 0, bookings: 0, files: 0 },
      { id: '3', firstName: 'Gretell', lastName: 'Rojas Rodriguez', quotations: 0, bookings: 0, files: 0 },
      { id: '4', firstName: 'Elio', lastName: 'Zambrano', quotations: 0, bookings: 0, files: 0 },
    ];
  };

  const [clients, setClients] = useState(getClients());
  const foundClient = clients.find((c: any) => c.id === clientId);

  const [client, setClient] = useState(foundClient ? {
    id: clientId,
    firstName: foundClient.firstName,
    lastName: foundClient.lastName,
    quotations: foundClient.quotations,
    bookings: foundClient.bookings,
    files: foundClient.files,
    email: foundClient.email || '',
    phone: foundClient.phone || '',
    address: foundClient.address || '',
    importantDates: foundClient.importantDates || '',
    allergies: foundClient.allergies || '',
    knownTravelerNumber: foundClient.knownTravelerNumber || '',
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
  });

  useEffect(() => {
    setEditedFirstName(client.firstName);
    setEditedLastName(client.lastName);
  }, [client.firstName, client.lastName]);

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

  const handleSaveFirstName = () => {
    if (editedFirstName.trim()) {
      const updatedClient = { ...client, firstName: editedFirstName };
      setClient(updatedClient);
      
      // Update in localStorage
      if (typeof window !== 'undefined') {
        const updatedClients = clients.map((c: any) => 
          c.id === clientId ? { ...c, firstName: editedFirstName } : c
        );
        localStorage.setItem('crm_clients', JSON.stringify(updatedClients));
        setClients(updatedClients);
      }
      
      setIsEditingFirstName(false);
    }
  };

  const handleSaveLastName = () => {
    if (editedLastName.trim()) {
      const updatedClient = { ...client, lastName: editedLastName };
      setClient(updatedClient);
      
      // Update in localStorage
      if (typeof window !== 'undefined') {
        const updatedClients = clients.map((c: any) => 
          c.id === clientId ? { ...c, lastName: editedLastName } : c
        );
        localStorage.setItem('crm_clients', JSON.stringify(updatedClients));
        setClients(updatedClients);
      }
      
      setIsEditingLastName(false);
    }
  };

  const handleCancelEditFirstName = () => {
    setEditedFirstName(client.firstName);
    setIsEditingFirstName(false);
  };

  const handleCancelEditLastName = () => {
    setEditedLastName(client.lastName);
    setIsEditingLastName(false);
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
                <span className="client-detail__field-label">{t('fields.firstName')}</span>
                {isEditingFirstName ? (
                  <div className="client-detail__field-edit-wrapper">
                    <Input
                      value={editedFirstName}
                      onChange={(e) => setEditedFirstName(e.target.value)}
                      className="client-detail__field-input"
                      autoFocus
                    />
                    <button 
                      className="client-detail__field-save" 
                      onClick={handleSaveFirstName}
                    >
                      <span className="material-symbols-outlined">check</span>
                    </button>
                    <button 
                      className="client-detail__field-cancel" 
                      onClick={handleCancelEditFirstName}
                    >
                      <span className="material-symbols-outlined">close</span>
                    </button>
                  </div>
                ) : (
                  <>
                    <span className="client-detail__field-value">
                      {client.firstName}
                    </span>
                    <button 
                      className="client-detail__field-edit"
                      onClick={() => setIsEditingFirstName(true)}
                    >
                      <span className="material-symbols-outlined">edit</span>
                    </button>
                  </>
                )}
              </div>
              <div className="client-detail__field">
                <span className="client-detail__field-label">{t('fields.lastName')}</span>
                {isEditingLastName ? (
                  <div className="client-detail__field-edit-wrapper">
                    <Input
                      value={editedLastName}
                      onChange={(e) => setEditedLastName(e.target.value)}
                      className="client-detail__field-input"
                      autoFocus
                    />
                    <button 
                      className="client-detail__field-save" 
                      onClick={handleSaveLastName}
                    >
                      <span className="material-symbols-outlined">check</span>
                    </button>
                    <button 
                      className="client-detail__field-cancel" 
                      onClick={handleCancelEditLastName}
                    >
                      <span className="material-symbols-outlined">close</span>
                    </button>
                  </div>
                ) : (
                  <>
                    <span className="client-detail__field-value">
                      {client.lastName}
                    </span>
                    <button 
                      className="client-detail__field-edit"
                      onClick={() => setIsEditingLastName(true)}
                    >
                      <span className="material-symbols-outlined">edit</span>
                    </button>
                  </>
                )}
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

      {/* Credit Cards Tab */}
      {activeTab === 'creditCards' && (
        <div className="client-detail__content">
          <div className="client-detail__empty-card-state">
            <span className="material-symbols-outlined client-detail__empty-card-icon">
              credit_card
            </span>
            <h3 className="client-detail__empty-card-title">
              {t('creditCards.emptyTitle')}
            </h3>
            <p className="client-detail__empty-card-description">
              {t('creditCards.emptyDescription')}
              <br />
              {t('creditCards.emptySecondLine')}
            </p>
            <Button 
              className="client-detail__add-card-button"
              onClick={() => setIsAddCardModalOpen(true)}
            >
              <span className="material-symbols-outlined">add</span>
              {t('creditCards.addCard')}
            </Button>
          </div>
        </div>
      )}

      {/* Other tabs content */}
      {activeTab !== 'about' && activeTab !== 'creditCards' && (
        <div className="client-detail__content">
          <p className="client-detail__empty-state">
            {t('emptyState')}
          </p>
        </div>
      )}

      {/* Add Credit Card Modal */}
      <Dialog open={isAddCardModalOpen} onOpenChange={setIsAddCardModalOpen}>
        <DialogContent className="client-detail__add-card-modal">
          <DialogHeader className="client-detail__modal-header">
            <DialogTitle className="client-detail__modal-title">
              {t('creditCards.modal.title')}
            </DialogTitle>
          </DialogHeader>

          <div className="client-detail__modal-body">
            {/* Back Button */}
            <button className="client-detail__modal-back" onClick={() => setIsAddCardModalOpen(false)}>
              <span className="material-symbols-outlined">arrow_back</span>
              {t('creditCards.modal.goBack')}
            </button>

            {/* Main Title */}
            <div className="client-detail__modal-main-title">
              <span className="material-symbols-outlined">lock</span>
              <h3>{t('creditCards.modal.addPaymentCard')}</h3>
            </div>
            <p className="client-detail__modal-subtitle">{t('creditCards.modal.secureMessage')}</p>

            {/* Card Information */}
            <div className="client-detail__form-section">
              <h4 className="client-detail__form-section-title">{t('creditCards.modal.cardInformation')}</h4>
              <div className="client-detail__card-info-row">
                <div className="client-detail__card-number-field">
                  <span className="material-symbols-outlined client-detail__card-icon">credit_card</span>
                  <Input placeholder={t('creditCards.modal.cardNumberPlaceholder')} />
                </div>
                <Input 
                  placeholder={t('creditCards.modal.expiryDate')} 
                  className="client-detail__expiry-field"
                />
                <Input 
                  placeholder={t('creditCards.modal.cvc')} 
                  className="client-detail__cvc-field"
                />
              </div>
            </div>

            {/* Cardholder Name */}
            <div className="client-detail__form-section">
              <Label className="client-detail__form-label">{t('creditCards.modal.cardholderName')}</Label>
              <Input placeholder={t('creditCards.modal.cardholderNamePlaceholder')} />
            </div>

            {/* Card Label */}
            <div className="client-detail__form-section">
              <Label className="client-detail__form-label">{t('creditCards.modal.cardLabel')}</Label>
              <Input placeholder={t('creditCards.modal.cardLabelPlaceholder')} />
            </div>

            {/* Billing Address */}
            <div className="client-detail__form-section">
              <h4 className="client-detail__form-section-title">{t('creditCards.modal.billingAddress')}</h4>
              
              {/* Country */}
              <div className="client-detail__form-field">
                <Label className="client-detail__form-label">{t('creditCards.modal.countryOrRegion')}</Label>
                <select className="client-detail__select-field">
                  <option>Estados Unidos de América</option>
                  <option>México</option>
                  <option>España</option>
                  <option>Colombia</option>
                  <option>Argentina</option>
                </select>
              </div>

              {/* Address */}
              <div className="client-detail__form-field">
                <Label className="client-detail__form-label">{t('creditCards.modal.address')}</Label>
                <Input placeholder={t('creditCards.modal.addressPlaceholder')} />
              </div>

              {/* Apt Number */}
              <div className="client-detail__form-field">
                <Label className="client-detail__form-label">{t('creditCards.modal.aptNumber')}</Label>
                <Input placeholder={t('creditCards.modal.aptPlaceholder')} />
              </div>

              {/* City and State */}
              <div className="client-detail__form-row">
                <div className="client-detail__form-field">
                  <Label className="client-detail__form-label">{t('creditCards.modal.city')}</Label>
                  <Input placeholder={t('creditCards.modal.cityPlaceholder')} />
                </div>
                <div className="client-detail__form-field">
                  <Label className="client-detail__form-label">{t('creditCards.modal.state')}</Label>
                  <Input placeholder={t('creditCards.modal.statePlaceholder')} />
                </div>
              </div>

              {/* Zip Code */}
              <div className="client-detail__form-field">
                <Label className="client-detail__form-label">{t('creditCards.modal.zipCode')}</Label>
                <Input placeholder={t('creditCards.modal.zipCodePlaceholder')} />
              </div>
            </div>

            {/* Modal Actions */}
            <div className="client-detail__modal-actions">
              <Button 
                variant="outline" 
                onClick={() => setIsAddCardModalOpen(false)}
                className="client-detail__modal-close-button"
              >
                {t('creditCards.modal.close')}
              </Button>
              <Button 
                className="client-detail__modal-save-button"
                onClick={() => {
                  // TODO: Implement save card functionality
                  console.log('Save card');
                  setIsAddCardModalOpen(false);
                }}
              >
                {t('creditCards.modal.saveAndAdd')}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
