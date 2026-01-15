'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
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
  const [isEditingFirstName, setIsEditingFirstName] = useState(false);
  const [isEditingLastName, setIsEditingLastName] = useState(false);
  const [isEditingEmail, setIsEditingEmail] = useState(false);
  const [isEditingPhone, setIsEditingPhone] = useState(false);
  const [isEditingAddress, setIsEditingAddress] = useState(false);
  const [isEditingNacionalidad, setIsEditingNacionalidad] = useState(false);
  const [isEditingTipoCliente, setIsEditingTipoCliente] = useState(false);
  const [isEditingNombreEmpresa, setIsEditingNombreEmpresa] = useState(false);
  const [editedFirstName, setEditedFirstName] = useState('');
  const [editedLastName, setEditedLastName] = useState('');
  const [editedEmail, setEditedEmail] = useState('');
  const [editedPhone, setEditedPhone] = useState('');
  const [editedAddress, setEditedAddress] = useState('');
  const [editedNacionalidad, setEditedNacionalidad] = useState('');
  const [editedTipoCliente, setEditedTipoCliente] = useState<'persona' | 'empresa'>('persona');
  const [editedNombreEmpresa, setEditedNombreEmpresa] = useState('');
  const [isAddImportantDateModalOpen, setIsAddImportantDateModalOpen] = useState(false);
  const [editingDateId, setEditingDateId] = useState<string | null>(null);
  const [newDate, setNewDate] = useState({ fecha: '', descripcion: '' });
  const [isAddCardModalOpen, setIsAddCardModalOpen] = useState(false);
  const [isAddDocumentModalOpen, setIsAddDocumentModalOpen] = useState(false);
  const [isAddLoyaltyModalOpen, setIsAddLoyaltyModalOpen] = useState(false);
  const [isAddTravelerModalOpen, setIsAddTravelerModalOpen] = useState(false);
  const [isAddNoteModalOpen, setIsAddNoteModalOpen] = useState(false);
  const [travelerSearch, setTravelerSearch] = useState('');
  const [selectedClient, setSelectedClient] = useState<any>(null);

  const [clients, setClients] = useState<any[]>([]);
  const [client, setClient] = useState<any>(null);

  // Load clients from localStorage and find the specific client
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('crm_clients');
      console.log('ClientDetailPage - localStorage data:', stored);
      console.log('ClientDetailPage - Looking for clientId:', clientId);
      
      if (stored) {
        const allClients = JSON.parse(stored);
        console.log('ClientDetailPage - All clients:', allClients);
        setClients(allClients);
        
        // Find the specific client by ID
        const found = allClients.find((c: any) => String(c.id) === String(clientId));
        console.log('ClientDetailPage - Found client:', found);
        
        if (found) {
          // Update bookings count for Arieldi if needed
          const bookings = (found.id === '1' && found.firstName === 'Arieldi') ? 2 : (found.bookings || 0);
          
          setClient({
            ...found,
            bookings,
            email: found.email || '',
            phone: found.phone || '',
            address: found.address || '',
            nacionalidad: found.nacionalidad || '',
            tipoCliente: found.tipoCliente || 'persona',
            nombreEmpresa: found.nombreEmpresa || '',
            importantDates: found.importantDates || [],
            allergies: found.allergies || '',
            knownTravelerNumber: found.knownTravelerNumber || '',
          });
        } else {
          // Client not found, set a default empty state
          console.error('ClientDetailPage - Client not found with ID:', clientId);
          setClient({
            id: clientId,
            firstName: 'Cliente',
            lastName: 'No Encontrado',
            quotations: 0,
            bookings: 0,
            files: 0,
            email: '',
            phone: '',
            address: '',
            nacionalidad: '',
            tipoCliente: 'persona',
            nombreEmpresa: '',
            importantDates: [],
            allergies: '',
            knownTravelerNumber: '',
          });
        }
      } else {
        console.error('ClientDetailPage - No clients in localStorage');
        // No clients in localStorage
        setClient({
          id: clientId,
          firstName: 'Cliente',
          lastName: 'No Encontrado',
          quotations: 0,
          bookings: 0,
          files: 0,
          email: '',
          phone: '',
          address: '',
          nacionalidad: '',
          tipoCliente: 'persona',
          nombreEmpresa: '',
          importantDates: [],
          allergies: '',
          knownTravelerNumber: '',
        });
      }
    }
  }, [clientId]);

  useEffect(() => {
    if (client) {
      setEditedFirstName(client.firstName);
      setEditedLastName(client.lastName);
      setEditedEmail(client.email || '');
      setEditedPhone(client.phone || '');
      setEditedAddress(client.address || '');
      setEditedNacionalidad(client.nacionalidad || '');
      setEditedTipoCliente(client.tipoCliente || 'persona');
      setEditedNombreEmpresa(client.nombreEmpresa || '');
    }
  }, [client]);

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

  const handleSaveField = (fieldName: string, value: any) => {
    const updatedClient = { ...client, [fieldName]: value };
    setClient(updatedClient);
    
    if (typeof window !== 'undefined') {
      const updatedClients = clients.map((c: any) => 
        c.id === clientId ? { ...c, [fieldName]: value } : c
      );
      localStorage.setItem('crm_clients', JSON.stringify(updatedClients));
      setClients(updatedClients);
    }
  };

  const handleSaveEmail = () => {
    handleSaveField('email', editedEmail);
    setIsEditingEmail(false);
  };

  const handleSavePhone = () => {
    handleSaveField('phone', editedPhone);
    setIsEditingPhone(false);
  };

  const handleSaveAddress = () => {
    handleSaveField('address', editedAddress);
    setIsEditingAddress(false);
  };

  const handleSaveNacionalidad = () => {
    handleSaveField('nacionalidad', editedNacionalidad);
    setIsEditingNacionalidad(false);
  };

  const handleSaveTipoCliente = () => {
    handleSaveField('tipoCliente', editedTipoCliente);
    if (editedTipoCliente === 'persona') {
      handleSaveField('nombreEmpresa', '');
    }
    setIsEditingTipoCliente(false);
  };

  const handleSaveNombreEmpresa = () => {
    handleSaveField('nombreEmpresa', editedNombreEmpresa);
    setIsEditingNombreEmpresa(false);
  };

  const handleAddImportantDate = () => {
    if (newDate.fecha && newDate.descripcion) {
      const fechaImportante = {
        id: Date.now().toString(),
        fecha: newDate.fecha,
        descripcion: newDate.descripcion,
      };
      const fechasActuales = Array.isArray(client.importantDates) ? client.importantDates : [];
      const updatedDates = [...fechasActuales, fechaImportante];
      handleSaveField('importantDates', updatedDates);
      setNewDate({ fecha: '', descripcion: '' });
      setIsAddImportantDateModalOpen(false);
    }
  };

  const handleEditImportantDate = (dateId: string) => {
    const fecha = (client.importantDates || []).find((d: any) => d.id === dateId);
    if (fecha) {
      setNewDate({ fecha: fecha.fecha, descripcion: fecha.descripcion });
      setEditingDateId(dateId);
      setIsAddImportantDateModalOpen(true);
    }
  };

  const handleUpdateImportantDate = () => {
    if (newDate.fecha && newDate.descripcion && editingDateId) {
      const fechasActuales = Array.isArray(client.importantDates) ? client.importantDates : [];
      const updatedDates = fechasActuales.map((d: any) =>
        d.id === editingDateId ? { ...d, fecha: newDate.fecha, descripcion: newDate.descripcion } : d
      );
      handleSaveField('importantDates', updatedDates);
      setNewDate({ fecha: '', descripcion: '' });
      setEditingDateId(null);
      setIsAddImportantDateModalOpen(false);
    }
  };

  const handleDeleteImportantDate = (dateId: string) => {
    const fechasActuales = Array.isArray(client.importantDates) ? client.importantDates : [];
    const updatedDates = fechasActuales.filter((d: any) => d.id !== dateId);
    handleSaveField('importantDates', updatedDates);
  };

  const handleCloseImportantDateModal = () => {
    setNewDate({ fecha: '', descripcion: '' });
    setEditingDateId(null);
    setIsAddImportantDateModalOpen(false);
  };

  // Filter clients for traveler search (excluding current client)
  const filteredClientsForTraveler = clients
    .filter((c: any) => c.id !== clientId) // Exclude current client
    .filter((c: any) => {
      if (!travelerSearch) return false;
      const fullName = `${c.firstName} ${c.lastName}`.toLowerCase();
      return fullName.includes(travelerSearch.toLowerCase());
    });

  const tabs = [
    { id: 'about', label: t('tabs.about') },
    { id: 'documents', label: t('tabs.documents') },
    { id: 'loyaltyPrograms', label: t('tabs.loyaltyPrograms') },
    { id: 'associatedTravelers', label: t('tabs.associatedTravelers') },
    { id: 'notes', label: t('tabs.notes') },
  ];

  // Show loading state
  if (!client) {
    return (
      <div className="client-detail">
        <div className="client-detail__loading">Cargando...</div>
      </div>
    );
  }

  return (
    <div className="client-detail">
      {/* Breadcrumb */}
      <Breadcrumb className="client-detail__breadcrumb">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink 
              onClick={() => router.push('/es/crm/clientes')}
              className="cursor-pointer"
            >
              Clientes
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>{client.firstName} {client.lastName}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

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
      <Tabs defaultValue="about" className="client-detail__tabs-wrapper">
        <TabsList>
          {tabs.map((tab) => (
            <TabsTrigger key={tab.id} value={tab.id}>
              {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>

        {/* About Tab Content */}
        <TabsContent value="about" className="client-detail__tab-content">
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
                {isEditingEmail ? (
                  <div className="client-detail__field-edit-wrapper">
                    <Input
                      type="email"
                      value={editedEmail}
                      onChange={(e) => setEditedEmail(e.target.value)}
                      className="client-detail__field-input"
                      autoFocus
                    />
                    <button className="client-detail__field-save" onClick={handleSaveEmail}>
                      <span className="material-symbols-outlined">check</span>
                    </button>
                    <button className="client-detail__field-cancel" onClick={() => { setEditedEmail(client.email || ''); setIsEditingEmail(false); }}>
                      <span className="material-symbols-outlined">close</span>
                    </button>
                  </div>
                ) : (
                  <>
                    <span className="client-detail__field-value client-detail__field-value--empty">
                      {client.email || t('editToAdd')}
                    </span>
                    <button className="client-detail__field-edit" onClick={() => setIsEditingEmail(true)}>
                      <span className="material-symbols-outlined">edit</span>
                    </button>
                  </>
                )}
              </div>
              <div className="client-detail__field">
                <span className="client-detail__field-label">{t('fields.phoneNumber')}</span>
                {isEditingPhone ? (
                  <div className="client-detail__field-edit-wrapper">
                    <Input
                      value={editedPhone}
                      onChange={(e) => setEditedPhone(e.target.value)}
                      className="client-detail__field-input"
                      autoFocus
                    />
                    <button className="client-detail__field-save" onClick={handleSavePhone}>
                      <span className="material-symbols-outlined">check</span>
                    </button>
                    <button className="client-detail__field-cancel" onClick={() => { setEditedPhone(client.phone || ''); setIsEditingPhone(false); }}>
                      <span className="material-symbols-outlined">close</span>
                    </button>
                  </div>
                ) : (
                  <>
                    <span className="client-detail__field-value client-detail__field-value--empty">
                      {client.phone || t('editToAdd')}
                    </span>
                    <button className="client-detail__field-edit" onClick={() => setIsEditingPhone(true)}>
                      <span className="material-symbols-outlined">edit</span>
                    </button>
                  </>
                )}
              </div>
              <div className="client-detail__field">
                <span className="client-detail__field-label">{t('fields.address')}</span>
                {isEditingAddress ? (
                  <div className="client-detail__field-edit-wrapper">
                    <Input
                      value={editedAddress}
                      onChange={(e) => setEditedAddress(e.target.value)}
                      className="client-detail__field-input"
                      autoFocus
                    />
                    <button className="client-detail__field-save" onClick={handleSaveAddress}>
                      <span className="material-symbols-outlined">check</span>
                    </button>
                    <button className="client-detail__field-cancel" onClick={() => { setEditedAddress(client.address || ''); setIsEditingAddress(false); }}>
                      <span className="material-symbols-outlined">close</span>
                    </button>
                  </div>
                ) : (
                  <>
                    <span className="client-detail__field-value client-detail__field-value--empty">
                      {client.address || t('editToAdd')}
                    </span>
                    <button className="client-detail__field-edit" onClick={() => setIsEditingAddress(true)}>
                      <span className="material-symbols-outlined">edit</span>
                    </button>
                  </>
                )}
              </div>
              <div className="client-detail__field">
                <span className="client-detail__field-label">Tipo de Cliente</span>
                {isEditingTipoCliente ? (
                  <div className="client-detail__field-edit-wrapper">
                    <Select value={editedTipoCliente} onValueChange={(value: 'persona' | 'empresa') => setEditedTipoCliente(value)}>
                      <SelectTrigger className="client-detail__field-input">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="persona">Persona</SelectItem>
                        <SelectItem value="empresa">Empresa</SelectItem>
                      </SelectContent>
                    </Select>
                    <button className="client-detail__field-save" onClick={handleSaveTipoCliente}>
                      <span className="material-symbols-outlined">check</span>
                    </button>
                    <button className="client-detail__field-cancel" onClick={() => { setEditedTipoCliente(client.tipoCliente || 'persona'); setIsEditingTipoCliente(false); }}>
                      <span className="material-symbols-outlined">close</span>
                    </button>
                  </div>
                ) : (
                  <>
                    <span className="client-detail__field-value">
                      {client.tipoCliente === 'empresa' ? 'Empresa' : 'Persona'}
                    </span>
                    <button className="client-detail__field-edit" onClick={() => setIsEditingTipoCliente(true)}>
                      <span className="material-symbols-outlined">edit</span>
                    </button>
                  </>
                )}
              </div>
              {(client.tipoCliente === 'empresa' || editedTipoCliente === 'empresa') && (
                <div className="client-detail__field">
                  <span className="client-detail__field-label">Nombre de la Empresa</span>
                  {isEditingNombreEmpresa ? (
                    <div className="client-detail__field-edit-wrapper">
                      <Input
                        value={editedNombreEmpresa}
                        onChange={(e) => setEditedNombreEmpresa(e.target.value)}
                        className="client-detail__field-input"
                        autoFocus
                      />
                      <button className="client-detail__field-save" onClick={handleSaveNombreEmpresa}>
                        <span className="material-symbols-outlined">check</span>
                      </button>
                      <button className="client-detail__field-cancel" onClick={() => { setEditedNombreEmpresa(client.nombreEmpresa || ''); setIsEditingNombreEmpresa(false); }}>
                        <span className="material-symbols-outlined">close</span>
                      </button>
                    </div>
                  ) : (
                    <>
                      <span className="client-detail__field-value client-detail__field-value--empty">
                        {client.nombreEmpresa || t('editToAdd')}
                      </span>
                      <button className="client-detail__field-edit" onClick={() => setIsEditingNombreEmpresa(true)}>
                        <span className="material-symbols-outlined">edit</span>
                      </button>
                    </>
                  )}
                </div>
              )}
              <div className="client-detail__field">
                <span className="client-detail__field-label">Nacionalidad</span>
                {isEditingNacionalidad ? (
                  <div className="client-detail__field-edit-wrapper">
                    <Input
                      value={editedNacionalidad}
                      onChange={(e) => setEditedNacionalidad(e.target.value)}
                      className="client-detail__field-input"
                      placeholder="Ej: Estadounidense, Mexicana, etc."
                      autoFocus
                    />
                    <button className="client-detail__field-save" onClick={handleSaveNacionalidad}>
                      <span className="material-symbols-outlined">check</span>
                    </button>
                    <button className="client-detail__field-cancel" onClick={() => { setEditedNacionalidad(client.nacionalidad || ''); setIsEditingNacionalidad(false); }}>
                      <span className="material-symbols-outlined">close</span>
                    </button>
                  </div>
                ) : (
                  <>
                    <span className="client-detail__field-value client-detail__field-value--empty">
                      {client.nacionalidad || t('editToAdd')}
                    </span>
                    <button className="client-detail__field-edit" onClick={() => setIsEditingNacionalidad(true)}>
                      <span className="material-symbols-outlined">edit</span>
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Perfil del Viajero Section */}
          <div className="client-detail__section">
            <div className="client-detail__section-header">
              <span className="material-symbols-outlined client-detail__section-icon">
                person
              </span>
              <h2 className="client-detail__section-title">Perfil del viajero</h2>
            </div>
            <div className="client-detail__section-content">
              <div className="client-detail__tags-container">
                <div className="client-detail__tag-item">
                  <Checkbox id="viaja-ninos" defaultChecked />
                  <Label htmlFor="viaja-ninos" className="client-detail__tag-label">Viaja con niños</Label>
                </div>
                <div className="client-detail__tag-item">
                  <Checkbox id="pareja" defaultChecked />
                  <Label htmlFor="pareja" className="client-detail__tag-label">Pareja</Label>
                </div>
                <div className="client-detail__tag-item">
                  <Checkbox id="viaje-individual" defaultChecked />
                  <Label htmlFor="viaje-individual" className="client-detail__tag-label">Viaje individual</Label>
                </div>
                <div className="client-detail__tag-item">
                  <Checkbox id="grupos-familia" defaultChecked />
                  <Label htmlFor="grupos-familia" className="client-detail__tag-label">Grupos / familia</Label>
                </div>
                <div className="client-detail__tag-item">
                  <Checkbox id="multigeneracional" defaultChecked />
                  <Label htmlFor="multigeneracional" className="client-detail__tag-label">Multigeneracional</Label>
                </div>
                <div className="client-detail__tag-item">
                  <Checkbox id="en-blanco" defaultChecked />
                  <Label htmlFor="en-blanco" className="client-detail__tag-label">En blanco para rellenar</Label>
                </div>
              </div>
            </div>
          </div>

          {/* Intereses - Estilo de Viaje Section */}
          <div className="client-detail__section">
            <div className="client-detail__section-header">
              <span className="material-symbols-outlined client-detail__section-icon">
                explore
              </span>
              <h2 className="client-detail__section-title">Intereses – Estilo de viaje</h2>
            </div>
            <div className="client-detail__section-content">
              <div className="client-detail__tags-container">
                <div className="client-detail__tag-item">
                  <Checkbox id="viajes-economicos" defaultChecked />
                  <Label htmlFor="viajes-economicos" className="client-detail__tag-label">Viajes económicos</Label>
                </div>
                <div className="client-detail__tag-item">
                  <Checkbox id="gama-media" defaultChecked />
                  <Label htmlFor="gama-media" className="client-detail__tag-label">Gama media</Label>
                </div>
                <div className="client-detail__tag-item">
                  <Checkbox id="premium-lujo" defaultChecked />
                  <Label htmlFor="premium-lujo" className="client-detail__tag-label">Premium / lujo</Label>
                </div>
                <div className="client-detail__tag-item">
                  <Checkbox id="playa-descanso" defaultChecked />
                  <Label htmlFor="playa-descanso" className="client-detail__tag-label">Playa y descanso</Label>
                </div>
                <div className="client-detail__tag-item">
                  <Checkbox id="ciudades-experiencias" defaultChecked />
                  <Label htmlFor="ciudades-experiencias" className="client-detail__tag-label">Ciudades y experiencias</Label>
                </div>
              </div>
            </div>
          </div>

          {/* Fechas Importantes Section */}
          <div className="client-detail__section">
            <div className="client-detail__section-header">
              <span className="material-symbols-outlined client-detail__section-icon">
                event
              </span>
              <h2 className="client-detail__section-title">Fechas importantes</h2>
            </div>
            <div className="client-detail__section-content">
              {Array.isArray(client.importantDates) && client.importantDates.length > 0 ? (
                <div className="client-detail__dates-list">
                  {client.importantDates.map((fecha: any) => (
                    <div key={fecha.id} className="client-detail__date-item">
                      <div className="client-detail__date-content">
                        <span className="client-detail__date-fecha">{fecha.fecha}</span>
                        <span className="client-detail__date-descripcion">{fecha.descripcion}</span>
                      </div>
                      <div className="client-detail__date-actions">
                        <button
                          className="client-detail__date-action-button"
                          onClick={() => handleEditImportantDate(fecha.id)}
                        >
                          <span className="material-symbols-outlined">edit</span>
                        </button>
                        <button
                          className="client-detail__date-action-button client-detail__date-action-button--delete"
                          onClick={() => handleDeleteImportantDate(fecha.id)}
                        >
                          <span className="material-symbols-outlined">delete</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="client-detail__empty-dates">
                  <p className="client-detail__empty-dates-text">No hay fechas importantes agregadas</p>
                </div>
              )}
              <Button
                variant="outline"
                onClick={() => setIsAddImportantDateModalOpen(true)}
                className="client-detail__add-date-button"
              >
                <span className="material-symbols-outlined">add</span>
                Agregar fecha importante
              </Button>
            </div>
          </div>
        </div>
        </TabsContent>

        {/* Credit Cards Tab Content */}
        <TabsContent value="creditCards" className="client-detail__tab-content">
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
        </TabsContent>

        {/* Documents Tab Content */}
        <TabsContent value="documents" className="client-detail__tab-content">
        <div className="client-detail__content">
          <div className="client-detail__empty-card-state">
            <span className="material-symbols-outlined client-detail__empty-card-icon">
              folder
            </span>
            <h3 className="client-detail__empty-card-title">
              {t('documents.emptyTitle')}
            </h3>
            <p className="client-detail__empty-card-description">
              {t('documents.emptyDescription')}
            </p>
            <Button 
              className="client-detail__add-card-button"
              onClick={() => setIsAddDocumentModalOpen(true)}
            >
              <span className="material-symbols-outlined">add</span>
              {t('documents.addDocument')}
            </Button>
          </div>
        </div>
        </TabsContent>

        {/* Loyalty Programs Tab Content */}
        <TabsContent value="loyaltyPrograms" className="client-detail__tab-content">
        <div className="client-detail__content">
          <div className="client-detail__empty-card-state">
            <span className="material-symbols-outlined client-detail__empty-card-icon">
              workspace_premium
            </span>
            <h3 className="client-detail__empty-card-title">
              {t('loyaltyPrograms.emptyTitle')}
            </h3>
            <p className="client-detail__empty-card-description">
              {t('loyaltyPrograms.emptyDescription')}
            </p>
            <Button 
              className="client-detail__add-card-button"
              onClick={() => setIsAddLoyaltyModalOpen(true)}
            >
              <span className="material-symbols-outlined">add</span>
              {t('loyaltyPrograms.addProgram')}
            </Button>
          </div>
        </div>
        </TabsContent>

        {/* Associated Travelers Tab Content */}
        <TabsContent value="associatedTravelers" className="client-detail__tab-content">
        <div className="client-detail__content">
          <div className="client-detail__empty-card-state">
            <span className="material-symbols-outlined client-detail__empty-card-icon">
              group
            </span>
            <h3 className="client-detail__empty-card-title">
              {t('associatedTravelers.emptyTitle')}
            </h3>
            <p className="client-detail__empty-card-description">
              {t('associatedTravelers.emptyDescription')}
            </p>
            <Button 
              className="client-detail__add-card-button"
              onClick={() => setIsAddTravelerModalOpen(true)}
            >
              <span className="material-symbols-outlined">add</span>
              {t('associatedTravelers.addTraveler')}
            </Button>
          </div>
        </div>
        </TabsContent>

        {/* Notes Tab Content */}
        <TabsContent value="notes" className="client-detail__tab-content">
        <div className="client-detail__content">
          <div className="client-detail__empty-card-state">
            <span className="material-symbols-outlined client-detail__empty-card-icon">
              edit_note
            </span>
            <h3 className="client-detail__empty-card-title">
              {t('notes.emptyTitle')}
            </h3>
            <p className="client-detail__empty-card-description">
              {t('notes.emptyDescription')}
            </p>
            <Button 
              className="client-detail__add-card-button"
              onClick={() => setIsAddNoteModalOpen(true)}
            >
              <span className="material-symbols-outlined">add</span>
              {t('notes.addNote')}
            </Button>
          </div>
        </div>
        </TabsContent>
      </Tabs>

      {/* Add Credit Card Modal */}
      <Dialog open={isAddCardModalOpen} onOpenChange={setIsAddCardModalOpen}>
        <DialogContent className="client-detail__add-card-modal">
          <DialogHeader className="client-detail__modal-header">
            <DialogTitle className="client-detail__modal-title">
              {t('creditCards.modal.title')}
            </DialogTitle>
          </DialogHeader>

          <div className="client-detail__modal-body">
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

      {/* Add Document Modal */}
      <Dialog open={isAddDocumentModalOpen} onOpenChange={setIsAddDocumentModalOpen}>
        <DialogContent className="client-detail__add-card-modal">
          <DialogHeader className="client-detail__modal-header">
            <DialogTitle className="client-detail__modal-title">
              {t('documents.modal.title')}
            </DialogTitle>
          </DialogHeader>

          <div className="client-detail__modal-body">
            {/* Document Information */}
            <div className="client-detail__form-section">
              <h4 className="client-detail__form-section-title">{t('documents.modal.documentInfo')}</h4>
              
              {/* Document Type */}
              <div className="client-detail__form-field">
                <Label className="client-detail__form-label">{t('documents.modal.documentType')}</Label>
                <select className="client-detail__select-field">
                  <option value="">{t('documents.modal.documentTypePlaceholder')}</option>
                  <option value="passport">{t('documents.modal.types.passport')}</option>
                  <option value="visa">{t('documents.modal.types.visa')}</option>
                  <option value="id">{t('documents.modal.types.id')}</option>
                  <option value="insurance">{t('documents.modal.types.insurance')}</option>
                  <option value="vaccination">{t('documents.modal.types.vaccination')}</option>
                  <option value="itinerary">{t('documents.modal.types.itinerary')}</option>
                  <option value="booking">{t('documents.modal.types.booking')}</option>
                  <option value="other">{t('documents.modal.types.other')}</option>
                </select>
              </div>

              {/* Document Name */}
              <div className="client-detail__form-field">
                <Label className="client-detail__form-label">{t('documents.modal.documentName')}</Label>
                <Input placeholder={t('documents.modal.documentNamePlaceholder')} />
              </div>

              {/* File Upload */}
              <div className="client-detail__form-field">
                <Label className="client-detail__form-label">{t('documents.modal.documentFile')}</Label>
                <div className="client-detail__file-upload">
                  <button className="client-detail__file-upload-button">
                    <span className="material-symbols-outlined">upload_file</span>
                    {t('documents.modal.selectFile')}
                  </button>
                  <input type="file" className="client-detail__file-input" />
                </div>
              </div>

              {/* Notes */}
              <div className="client-detail__form-field">
                <Label className="client-detail__form-label">{t('documents.modal.notes')}</Label>
                <textarea 
                  className="client-detail__textarea-field" 
                  rows={3}
                  placeholder={t('documents.modal.notesPlaceholder')}
                />
              </div>
            </div>

            {/* Modal Actions */}
            <div className="client-detail__modal-actions">
              <Button 
                variant="outline" 
                onClick={() => setIsAddDocumentModalOpen(false)}
                className="client-detail__modal-close-button"
              >
                {t('documents.modal.close')}
              </Button>
              <Button 
                className="client-detail__modal-save-button"
                onClick={() => {
                  // TODO: Implement save document functionality
                  console.log('Save document');
                  setIsAddDocumentModalOpen(false);
                }}
              >
                {t('documents.modal.saveAndAdd')}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Add Loyalty Program Modal */}
      <Dialog open={isAddLoyaltyModalOpen} onOpenChange={setIsAddLoyaltyModalOpen}>
        <DialogContent className="client-detail__add-card-modal">
          <DialogHeader className="client-detail__modal-header">
            <DialogTitle className="client-detail__modal-title">
              {t('loyaltyPrograms.modal.title')}
            </DialogTitle>
          </DialogHeader>

          <div className="client-detail__modal-body">
            <div className="client-detail__form-section">
              {/* Program Name */}
              <div className="client-detail__form-field">
                <Label className="client-detail__form-label">{t('loyaltyPrograms.modal.programName')}</Label>
                <Input placeholder={t('loyaltyPrograms.modal.programNamePlaceholder')} />
              </div>

              {/* Membership Number */}
              <div className="client-detail__form-field">
                <Label className="client-detail__form-label">{t('loyaltyPrograms.modal.membershipNumber')}</Label>
                <Input placeholder={t('loyaltyPrograms.modal.membershipNumberPlaceholder')} />
              </div>

              {/* Tier Level */}
              <div className="client-detail__form-field">
                <Label className="client-detail__form-label">{t('loyaltyPrograms.modal.tierLevel')}</Label>
                <Input placeholder={t('loyaltyPrograms.modal.tierLevelPlaceholder')} />
              </div>

              {/* Expiry Date */}
              <div className="client-detail__form-field">
                <Label className="client-detail__form-label">{t('loyaltyPrograms.modal.expiryDate')}</Label>
                <Input type="date" placeholder={t('loyaltyPrograms.modal.expiryDatePlaceholder')} />
              </div>
            </div>

            {/* Modal Actions */}
            <div className="client-detail__modal-actions">
              <Button 
                variant="outline" 
                onClick={() => setIsAddLoyaltyModalOpen(false)}
                className="client-detail__modal-close-button"
              >
                {t('loyaltyPrograms.modal.close')}
              </Button>
              <Button 
                className="client-detail__modal-save-button"
                onClick={() => {
                  console.log('Save loyalty program');
                  setIsAddLoyaltyModalOpen(false);
                }}
              >
                {t('loyaltyPrograms.modal.saveAndAdd')}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Add Associated Traveler Modal */}
      <Dialog open={isAddTravelerModalOpen} onOpenChange={setIsAddTravelerModalOpen}>
        <DialogContent className="client-detail__add-card-modal">
          <DialogHeader className="client-detail__modal-header">
            <DialogTitle className="client-detail__modal-title">
              {t('associatedTravelers.modal.title')}
            </DialogTitle>
          </DialogHeader>

          <div className="client-detail__modal-body">
            <div className="client-detail__form-section">
              {/* Search Existing Client */}
              <div className="client-detail__form-field">
                <Label className="client-detail__form-label">{t('associatedTravelers.modal.searchClient')}</Label>
                <Input 
                  placeholder={t('associatedTravelers.modal.searchPlaceholder')} 
                  value={travelerSearch}
                  onChange={(e) => {
                    setTravelerSearch(e.target.value);
                    setSelectedClient(null);
                  }}
                />
                
                {/* Search Results */}
                {travelerSearch && filteredClientsForTraveler.length > 0 && (
                  <div className="client-detail__search-results">
                    {filteredClientsForTraveler.map((searchClient: any) => (
                      <div
                        key={searchClient.id}
                        className={`client-detail__search-result-item ${selectedClient?.id === searchClient.id ? 'client-detail__search-result-item--selected' : ''}`}
                        onClick={() => {
                          setSelectedClient(searchClient);
                          setTravelerSearch(`${searchClient.firstName} ${searchClient.lastName}`);
                        }}
                      >
                        <div className="client-detail__search-result-avatar">
                          {searchClient.firstName.charAt(0)}{searchClient.lastName.charAt(0)}
                        </div>
                        <div className="client-detail__search-result-info">
                          <span className="client-detail__search-result-name">
                            {searchClient.firstName} {searchClient.lastName}
                          </span>
                          <span className="client-detail__search-result-stats">
                            {searchClient.quotations} cotizaciones • {searchClient.bookings} reservas
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {travelerSearch && filteredClientsForTraveler.length === 0 && (
                  <div className="client-detail__search-no-results">
                    No se encontraron clientes
                  </div>
                )}
              </div>

              {/* Divider */}
              {!selectedClient && (
                <div className="client-detail__divider">
                  <span>{t('associatedTravelers.modal.orDivider')}</span>
                </div>
              )}

              {/* Manual Fields - Only show if no client selected */}
              {!selectedClient && (
                <>
                  {/* First Name */}
                  <div className="client-detail__form-field">
                    <Label className="client-detail__form-label">{t('associatedTravelers.modal.firstName')}</Label>
                    <Input placeholder={t('associatedTravelers.modal.firstNamePlaceholder')} />
                  </div>

                  {/* Last Name */}
                  <div className="client-detail__form-field">
                    <Label className="client-detail__form-label">{t('associatedTravelers.modal.lastName')}</Label>
                    <Input placeholder={t('associatedTravelers.modal.lastNamePlaceholder')} />
                  </div>

                  {/* Relationship */}
                  <div className="client-detail__form-field">
                    <Label className="client-detail__form-label">{t('associatedTravelers.modal.relationship')}</Label>
                    <Input placeholder={t('associatedTravelers.modal.relationshipPlaceholder')} />
                  </div>

                  {/* Date of Birth */}
                  <div className="client-detail__form-field">
                    <Label className="client-detail__form-label">{t('associatedTravelers.modal.dateOfBirth')}</Label>
                    <Input type="date" placeholder={t('associatedTravelers.modal.dateOfBirthPlaceholder')} />
                  </div>
                </>
              )}

              {/* Selected Client Info */}
              {selectedClient && (
                <div className="client-detail__selected-client">
                  <div className="client-detail__selected-client-header">
                    <span className="material-symbols-outlined">check_circle</span>
                    <span>Cliente seleccionado</span>
                  </div>
                  <div className="client-detail__selected-client-card">
                    <div className="client-detail__search-result-avatar">
                      {selectedClient.firstName.charAt(0)}{selectedClient.lastName.charAt(0)}
                    </div>
                    <div>
                      <div className="client-detail__selected-client-name">
                        {selectedClient.firstName} {selectedClient.lastName}
                      </div>
                      <div className="client-detail__selected-client-stats">
                        {selectedClient.quotations} cotizaciones • {selectedClient.bookings} reservas
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Modal Actions */}
            <div className="client-detail__modal-actions">
              <Button 
                variant="outline" 
                onClick={() => {
                  setIsAddTravelerModalOpen(false);
                  setTravelerSearch('');
                  setSelectedClient(null);
                }}
                className="client-detail__modal-close-button"
              >
                {t('associatedTravelers.modal.close')}
              </Button>
              <Button 
                className="client-detail__modal-save-button"
                onClick={() => {
                  if (selectedClient) {
                    console.log('Associate client:', selectedClient);
                  } else {
                    console.log('Save new traveler');
                  }
                  setIsAddTravelerModalOpen(false);
                  setTravelerSearch('');
                  setSelectedClient(null);
                }}
              >
                {t('associatedTravelers.modal.saveAndAdd')}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Add/Edit Important Date Modal */}
      <Dialog open={isAddImportantDateModalOpen} onOpenChange={handleCloseImportantDateModal}>
        <DialogContent className="client-detail__add-card-modal">
          <DialogHeader>
            <DialogTitle>{editingDateId ? 'Editar Fecha Importante' : 'Agregar Fecha Importante'}</DialogTitle>
          </DialogHeader>
          <div className="client-detail__modal-body">
            <div className="client-detail__form-field">
              <Label className="client-detail__form-label">Fecha *</Label>
              <Input
                type="date"
                value={newDate.fecha}
                onChange={(e) => setNewDate({ ...newDate, fecha: e.target.value })}
                className="client-detail__field-input"
              />
            </div>
            <div className="client-detail__form-field">
              <Label className="client-detail__form-label">Descripción *</Label>
              <Input
                type="text"
                placeholder="Ej: Cumpleaños, Aniversario, etc."
                value={newDate.descripcion}
                onChange={(e) => setNewDate({ ...newDate, descripcion: e.target.value })}
                className="client-detail__field-input"
              />
            </div>
            <div className="client-detail__modal-actions">
              <Button variant="outline" onClick={handleCloseImportantDateModal} className="client-detail__modal-close-button">
                Cancelar
              </Button>
              <Button
                onClick={editingDateId ? handleUpdateImportantDate : handleAddImportantDate}
                className="client-detail__modal-save-button"
              >
                {editingDateId ? 'Actualizar' : 'Agregar'}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Add Note Modal */}
      <Dialog open={isAddNoteModalOpen} onOpenChange={setIsAddNoteModalOpen}>
        <DialogContent className="client-detail__add-card-modal">
          <DialogHeader className="client-detail__modal-header">
            <DialogTitle className="client-detail__modal-title">
              {t('notes.modal.title')}
            </DialogTitle>
          </DialogHeader>

          <div className="client-detail__modal-body">
            <div className="client-detail__form-section">
              {/* Note Title */}
              <div className="client-detail__form-field">
                <Label className="client-detail__form-label">{t('notes.modal.noteTitle')}</Label>
                <Input placeholder={t('notes.modal.noteTitlePlaceholder')} />
              </div>

              {/* Note Content */}
              <div className="client-detail__form-field">
                <Label className="client-detail__form-label">{t('notes.modal.noteContent')}</Label>
                <textarea 
                  className="client-detail__textarea-field" 
                  rows={6}
                  placeholder={t('notes.modal.noteContentPlaceholder')}
                />
              </div>
            </div>

            {/* Modal Actions */}
            <div className="client-detail__modal-actions">
              <Button 
                variant="outline" 
                onClick={() => setIsAddNoteModalOpen(false)}
                className="client-detail__modal-close-button"
              >
                {t('notes.modal.close')}
              </Button>
              <Button 
                className="client-detail__modal-save-button"
                onClick={() => {
                  console.log('Save note');
                  setIsAddNoteModalOpen(false);
                }}
              >
                {t('notes.modal.saveAndAdd')}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
