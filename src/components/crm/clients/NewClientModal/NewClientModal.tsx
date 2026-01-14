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
        const updatedClients = [...clients, client];
        localStorage.setItem('crm_clients', JSON.stringify(updatedClients));
        setNewClient({ firstName: '', lastName: '' });
        onClose();
        if (onClientAdded) {
          onClientAdded();
        }
        // Redirect to client detail page
        router.push(`/es/crm/clientes/${client.id}`);
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
          <DialogTitle className="new-client-modal__title">{t('addClient')}</DialogTitle>
        </DialogHeader>
        <div className="new-client-modal__form">
          <div className="new-client-modal__form-group">
            <Label htmlFor="firstName" className="new-client-modal__label">
              {t('firstName')} <span className="new-client-modal__required">Required</span>
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
              {t('lastName')} <span className="new-client-modal__required">Required</span>
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
              {t('cancel')}
            </Button>
            <Button onClick={handleAddClient} className="new-client-modal__add-button">
              {t('addClient')}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
