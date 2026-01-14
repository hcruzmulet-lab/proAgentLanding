'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import './NewClientModal.scss';

interface NewClientModalProps {
  isOpen: boolean;
  onClose: () => void;
  onClientAdded?: () => void;
}

export function NewClientModal({ isOpen, onClose, onClientAdded }: NewClientModalProps) {
  const t = useTranslations('crm.clients');
  const router = useRouter();
  const [newClient, setNewClient] = useState({ firstName: '', lastName: '' });

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
        console.log('NewClientModal - Creating client:', client);
        const updatedClients = [...clients, client];
        console.log('NewClientModal - Updated clients array:', updatedClients);
        localStorage.setItem('crm_clients', JSON.stringify(updatedClients));
        
        // Verify save
        const verify = localStorage.getItem('crm_clients');
        console.log('NewClientModal - Verified localStorage after save:', verify);
        console.log('NewClientModal - Redirecting to:', `/es/crm/clientes/${client.id}`);
        
        setNewClient({ firstName: '', lastName: '' });
        onClose();
        if (onClientAdded) {
          onClientAdded();
        }
        
        // Use setTimeout to ensure localStorage is fully written before navigation
        setTimeout(() => {
          router.push(`/es/crm/clientes/${client.id}`);
        }, 100);
      }
    }
  };

  const handleClose = () => {
    setNewClient({ firstName: '', lastName: '' });
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="new-client-modal">
        <button
          className="new-client-modal__close"
          onClick={handleClose}
          aria-label="Close"
        >
          <span className="material-symbols-outlined">close</span>
        </button>
        <DialogHeader>
          <DialogTitle className="new-client-modal__title">Nuevo Cliente</DialogTitle>
        </DialogHeader>
        <div className="new-client-modal__form">
          <div className="new-client-modal__form-group">
            <Label htmlFor="firstName" className="new-client-modal__label">
              {t('firstName')}
            </Label>
            <Input
              id="firstName"
              placeholder={t('enterFirstName')}
              value={newClient.firstName}
              onChange={(e) => setNewClient({ ...newClient, firstName: e.target.value })}
              className="new-client-modal__input"
            />
          </div>
          <div className="new-client-modal__form-group">
            <Label htmlFor="lastName" className="new-client-modal__label">
              {t('lastName')}
            </Label>
            <Input
              id="lastName"
              placeholder={t('enterLastName')}
              value={newClient.lastName}
              onChange={(e) => setNewClient({ ...newClient, lastName: e.target.value })}
              className="new-client-modal__input"
            />
          </div>
          <div className="new-client-modal__actions">
            <Button
              variant="outline"
              onClick={handleClose}
              className="new-client-modal__cancel-button"
            >
              Cancelar
            </Button>
            <Button onClick={handleAddClient} className="new-client-modal__add-button">
              Guardar
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
