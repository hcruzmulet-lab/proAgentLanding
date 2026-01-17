'use client';

import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import './SoportePage.scss';

interface Ticket {
  id: string;
  numero: string;
  asunto: string;
  descripcion: string;
  fecha: string;
  estado: 'abierto' | 'en_progreso' | 'resuelto' | 'cerrado';
  prioridad: 'baja' | 'media' | 'alta' | 'urgente';
  categoria: string;
}

const ticketsMock: Ticket[] = [
  {
    id: '1',
    numero: 'TKT-2024-001',
    asunto: 'Problema con el acceso al CRM',
    descripcion: 'No puedo acceder a la sección de clientes en el CRM. Me aparece un error 404.',
    fecha: '15/01/2024',
    estado: 'abierto',
    prioridad: 'alta',
    categoria: 'Técnico'
  },
  {
    id: '2',
    numero: 'TKT-2024-002',
    asunto: 'Consulta sobre comisiones',
    descripcion: 'Necesito información sobre cómo se calculan las comisiones en mi plan Plus.',
    fecha: '12/01/2024',
    estado: 'en_progreso',
    prioridad: 'media',
    categoria: 'Facturación'
  },
  {
    id: '3',
    numero: 'TKT-2024-003',
    asunto: 'Solicitud de upgrade a Master',
    descripcion: 'Quiero hacer upgrade de mi plan Plus a Master. ¿Cuál es el proceso?',
    fecha: '10/01/2024',
    estado: 'resuelto',
    prioridad: 'media',
    categoria: 'Suscripción'
  },
  {
    id: '4',
    numero: 'TKT-2024-004',
    asunto: 'Error al generar factura',
    descripcion: 'Al intentar generar una factura, el sistema muestra un error y no permite completar la operación.',
    fecha: '08/01/2024',
    estado: 'cerrado',
    prioridad: 'alta',
    categoria: 'Técnico'
  },
  {
    id: '5',
    numero: 'TKT-2024-005',
    asunto: 'Pregunta sobre integración de proveedores',
    descripcion: '¿Cómo puedo agregar un nuevo proveedor a mi cuenta?',
    fecha: '05/01/2024',
    estado: 'resuelto',
    prioridad: 'baja',
    categoria: 'General'
  }
];

const getEstadoBadge = (estado: string) => {
  switch (estado) {
    case 'abierto':
      return { text: 'Abierto', className: 'soporte-page__badge--abierto' };
    case 'en_progreso':
      return { text: 'En Progreso', className: 'soporte-page__badge--en-progreso' };
    case 'resuelto':
      return { text: 'Resuelto', className: 'soporte-page__badge--resuelto' };
    case 'cerrado':
      return { text: 'Cerrado', className: 'soporte-page__badge--cerrado' };
    default:
      return { text: estado, className: '' };
  }
};

const getPrioridadBadge = (prioridad: string) => {
  switch (prioridad) {
    case 'urgente':
      return { text: 'Urgente', className: 'soporte-page__priority--urgente' };
    case 'alta':
      return { text: 'Alta', className: 'soporte-page__priority--alta' };
    case 'media':
      return { text: 'Media', className: 'soporte-page__priority--media' };
    case 'baja':
      return { text: 'Baja', className: 'soporte-page__priority--baja' };
    default:
      return { text: prioridad, className: '' };
  }
};

export function SoportePage() {
  const [tickets, setTickets] = useState<Ticket[]>(ticketsMock);
  const [isNewTicketModalOpen, setIsNewTicketModalOpen] = useState(false);
  const [newTicket, setNewTicket] = useState({
    asunto: '',
    descripcion: '',
    categoria: 'General',
    prioridad: 'media' as 'baja' | 'media' | 'alta' | 'urgente',
    documentos: [] as File[]
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      setNewTicket({ ...newTicket, documentos: [...newTicket.documentos, ...files] });
    }
  };

  const handleRemoveFile = (index: number) => {
    const newFiles = newTicket.documentos.filter((_, i) => i !== index);
    setNewTicket({ ...newTicket, documentos: newFiles });
  };

  const handleCreateTicket = () => {
    if (newTicket.asunto.trim() && newTicket.descripcion.trim()) {
      const ticket: Ticket = {
        id: Date.now().toString(),
        numero: `TKT-2024-${String(tickets.length + 1).padStart(3, '0')}`,
        asunto: newTicket.asunto.trim(),
        descripcion: newTicket.descripcion.trim(),
        fecha: new Date().toLocaleDateString('es-ES'),
        estado: 'abierto',
        prioridad: newTicket.prioridad,
        categoria: newTicket.categoria
      };
      setTickets([ticket, ...tickets]);
      setNewTicket({ asunto: '', descripcion: '', categoria: 'General', prioridad: 'media', documentos: [] });
      setIsNewTicketModalOpen(false);
    }
  };

  const handleCloseModal = () => {
    setNewTicket({ asunto: '', descripcion: '', categoria: 'General', prioridad: 'media', documentos: [] });
    setIsNewTicketModalOpen(false);
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
  };

  return (
    <div className="soporte-page">
      <div className="soporte-page__header">
        <div className="soporte-page__header-content">
          <div>
            <h1 className="soporte-page__title">Soporte (Tickets)</h1>
            <p className="soporte-page__subtitle">
              Obtén ayuda y soporte técnico
            </p>
          </div>
          <Button
            onClick={() => setIsNewTicketModalOpen(true)}
            className="soporte-page__new-ticket-button"
          >
            <span className="material-symbols-outlined">add</span>
            Nuevo Ticket
          </Button>
        </div>
      </div>

      <div className="soporte-page__content">
        {tickets.length === 0 ? (
          <div className="soporte-page__empty-state">
            <span className="material-symbols-outlined soporte-page__empty-icon">
              task
            </span>
            <h2 className="soporte-page__empty-title">No hay tickets</h2>
            <p className="soporte-page__empty-description">
              Crea tu primer ticket de soporte para obtener ayuda
            </p>
            <Button
              onClick={() => setIsNewTicketModalOpen(true)}
              className="soporte-page__empty-button"
            >
              Crear Ticket
            </Button>
          </div>
        ) : (
          <div className="soporte-page__tickets-list">
            {tickets.map((ticket) => {
              const estadoBadge = getEstadoBadge(ticket.estado);
              const prioridadBadge = getPrioridadBadge(ticket.prioridad);
              
              return (
                <Card key={ticket.id} className="soporte-page__ticket-card">
                  <div className="soporte-page__ticket-content">
                    <div className="soporte-page__ticket-header">
                      <div className="soporte-page__ticket-info">
                        <div className="soporte-page__ticket-number">{ticket.numero}</div>
                        <h3 className="soporte-page__ticket-asunto">{ticket.asunto}</h3>
                      </div>
                      <div className="soporte-page__ticket-badges">
                        <span className={`soporte-page__badge ${estadoBadge.className}`}>
                          {estadoBadge.text}
                        </span>
                        <span className={`soporte-page__priority ${prioridadBadge.className}`}>
                          {prioridadBadge.text}
                        </span>
                      </div>
                    </div>

                    <p className="soporte-page__ticket-descripcion">{ticket.descripcion}</p>

                    <div className="soporte-page__ticket-meta">
                      <span className="soporte-page__ticket-meta-item">
                        <span className="material-symbols-outlined">calendar_today</span>
                        {ticket.fecha}
                      </span>
                      <span className="soporte-page__ticket-meta-item">
                        <span className="material-symbols-outlined">category</span>
                        {ticket.categoria}
                      </span>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        )}
      </div>

      {/* Modal Nuevo Ticket */}
      <Dialog open={isNewTicketModalOpen} onOpenChange={handleCloseModal}>
        <DialogContent className="soporte-page__modal">
          <DialogHeader>
            <DialogTitle className="soporte-page__modal-title">Nuevo Ticket de Soporte</DialogTitle>
          </DialogHeader>
          <div className="soporte-page__modal-form">
            <div className="soporte-page__form-group">
              <Label htmlFor="asunto" className="soporte-page__form-label">
                Asunto
              </Label>
              <Input
                id="asunto"
                value={newTicket.asunto}
                onChange={(e) => setNewTicket({...newTicket, asunto: e.target.value})}
                placeholder="Describe brevemente el problema o consulta"
                className="soporte-page__form-input"
              />
            </div>

            <div className="soporte-page__form-group">
              <Label htmlFor="categoria" className="soporte-page__form-label">
                Categoría
              </Label>
              <select
                id="categoria"
                value={newTicket.categoria}
                onChange={(e) => setNewTicket({...newTicket, categoria: e.target.value})}
                className="soporte-page__form-select"
              >
                <option value="General">General</option>
                <option value="Técnico">Técnico</option>
                <option value="Facturación">Facturación</option>
                <option value="Suscripción">Suscripción</option>
                <option value="Funcionalidad">Funcionalidad</option>
              </select>
            </div>

            <div className="soporte-page__form-group">
              <Label htmlFor="prioridad" className="soporte-page__form-label">
                Prioridad
              </Label>
              <select
                id="prioridad"
                value={newTicket.prioridad}
                onChange={(e) => setNewTicket({...newTicket, prioridad: e.target.value as any})}
                className="soporte-page__form-select"
              >
                <option value="baja">Baja</option>
                <option value="media">Media</option>
                <option value="alta">Alta</option>
                <option value="urgente">Urgente</option>
              </select>
            </div>

            <div className="soporte-page__form-group">
              <Label htmlFor="descripcion" className="soporte-page__form-label">
                Descripción
              </Label>
              <textarea
                id="descripcion"
                value={newTicket.descripcion}
                onChange={(e) => setNewTicket({...newTicket, descripcion: e.target.value})}
                placeholder="Describe en detalle el problema o consulta..."
                rows={5}
                className="soporte-page__form-textarea"
              />
            </div>

            <div className="soporte-page__form-group">
              <Label className="soporte-page__form-label">
                Documentos adjuntos
              </Label>
              <div className="soporte-page__file-upload">
                <input
                  type="file"
                  id="documentos"
                  multiple
                  onChange={handleFileChange}
                  className="soporte-page__file-input"
                  accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,.xls,.xlsx"
                />
                <label htmlFor="documentos" className="soporte-page__file-label">
                  <span className="material-symbols-outlined">attach_file</span>
                  <span>Seleccionar archivos</span>
                </label>
                <p className="soporte-page__file-hint">
                  Formatos permitidos: PDF, DOC, DOCX, JPG, PNG, XLS, XLSX
                </p>
              </div>

              {newTicket.documentos.length > 0 && (
                <div className="soporte-page__files-list">
                  {newTicket.documentos.map((file, index) => (
                    <div key={index} className="soporte-page__file-item">
                      <div className="soporte-page__file-info">
                        <span className="material-symbols-outlined soporte-page__file-icon">
                          description
                        </span>
                        <div className="soporte-page__file-details">
                          <span className="soporte-page__file-name">{file.name}</span>
                          <span className="soporte-page__file-size">{formatFileSize(file.size)}</span>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleRemoveFile(index)}
                        className="soporte-page__file-remove"
                      >
                        <span className="material-symbols-outlined">close</span>
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="soporte-page__modal-actions">
              <Button
                variant="outline"
                onClick={handleCloseModal}
                className="soporte-page__modal-cancel"
              >
                Cancelar
              </Button>
              <Button
                onClick={handleCreateTicket}
                className="soporte-page__modal-submit"
                disabled={!newTicket.asunto.trim() || !newTicket.descripcion.trim()}
              >
                Crear Ticket
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
