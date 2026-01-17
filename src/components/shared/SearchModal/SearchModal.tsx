'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import './SearchModal.scss';

interface SearchResult {
  id: string;
  title: string;
  subtitle?: string;
  type: 'cliente' | 'cotizacion' | 'reserva' | 'expediente' | 'factura' | 'pago' | 'comision' | 'itinerario' | 'evento' | 'novedad' | 'curso' | 'leccion' | 'material' | 'imagen' | 'prompt' | 'perfil';
  icon: string;
  href: string;
  module: 'crm' | 'gestion' | 'academia' | 'inicio';
}

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);

  // Función para buscar en todos los módulos
  const performSearch = (query: string): SearchResult[] => {
    if (!query || query.trim().length < 2) {
      return [];
    }

    const queryLower = query.toLowerCase().trim();
    const results: SearchResult[] = [];

    // Buscar en CRM - Clientes
    if (typeof window !== 'undefined') {
      const storedClients = localStorage.getItem('crm_clients');
      if (storedClients) {
        try {
          const clients = JSON.parse(storedClients);
          clients.forEach((client: any) => {
            const fullName = `${client.firstName} ${client.lastName}`.toLowerCase();
            const email = (client.email || '').toLowerCase();
            const phone = (client.phone || '').toLowerCase();
            
            if (fullName.includes(queryLower) || email.includes(queryLower) || phone.includes(queryLower)) {
              results.push({
                id: `cliente-${client.id}`,
                title: `${client.firstName} ${client.lastName}`,
                subtitle: client.email || client.phone || '',
                type: 'cliente',
                icon: 'person',
                href: `/crm/clientes/${client.id}`,
                module: 'crm',
              });
            }
          });
        } catch (e) {
          console.error('Error parsing clients:', e);
        }
      }
    }

    // Buscar en CRM - Cotizaciones (mock data)
    const cotizacionesMock = [
      { id: '1', numeroCotizacion: 'COT-001', nombre: 'Miguel Zabala', destino: 'Toscana, Italia', fechaCreacion: '10 ene 2026', estado: 'enviada' },
      { id: '2', numeroCotizacion: 'COT-002', nombre: 'Arieldi Marrero', destino: 'Punta Cana, República Dominicana', fechaCreacion: '12 ene 2026', estado: 'pendiente' },
    ];

    cotizacionesMock.forEach((cot) => {
      const searchText = `${cot.numeroCotizacion} ${cot.nombre} ${cot.destino}`.toLowerCase();
      if (searchText.includes(queryLower)) {
        results.push({
          id: `cotizacion-${cot.id}`,
          title: cot.numeroCotizacion,
          subtitle: `${cot.nombre} - ${cot.destino}`,
          type: 'cotizacion',
          icon: 'docs',
          href: `/crm/cotizaciones`,
          module: 'crm',
        });
      }
    });

    // Buscar en CRM - Reservas (mock data)
    const reservasMock = [
      { id: '1', localizador: 'AZC-2', nombre: 'Arieldi Marrero', destino: 'Cancún, México', fechaCreacion: '30 dic 2025', estado: 'finalizada' },
      { id: '2', localizador: 'AZC-1', nombre: 'Arieldi Marrero', destino: 'Punta Cana, RD', fechaCreacion: '26 dic 2025', estado: 'finalizada' },
    ];

    reservasMock.forEach((res) => {
      const searchText = `${res.localizador} ${res.nombre} ${res.destino}`.toLowerCase();
      if (searchText.includes(queryLower)) {
        results.push({
          id: `reserva-${res.id}`,
          title: res.localizador,
          subtitle: `${res.nombre} - ${res.destino}`,
          type: 'reserva',
          icon: 'airplane_ticket',
          href: `/crm/reservas`,
          module: 'crm',
        });
      }
    });

    // Buscar en CRM - Expedientes (mock data)
    const expedientesMock = [
      { id: '1', numeroExpediente: 'EXP-001', nombre: 'Miguel Zabala', destino: 'Cancún, México', fechaCreacion: '10 ene 2026', estado: 'activo' },
      { id: '2', numeroExpediente: 'EXP-002', nombre: 'Arieldi Marrero', destino: 'Punta Cana, República Dominicana', fechaCreacion: '12 ene 2026', estado: 'activo' },
    ];

    expedientesMock.forEach((exp) => {
      const searchText = `${exp.numeroExpediente} ${exp.nombre} ${exp.destino}`.toLowerCase();
      if (searchText.includes(queryLower)) {
        results.push({
          id: `expediente-${exp.id}`,
          title: exp.numeroExpediente,
          subtitle: `${exp.nombre} - ${exp.destino}`,
          type: 'expediente',
          icon: 'folder',
          href: `/crm/expedientes`,
          module: 'crm',
        });
      }
    });

    // Buscar en Calendario - Eventos
    const eventosMock = [
      { id: '1', title: 'Group Bookings Live Support', date: '02/01/2026', time: '02:00 PM', type: 'evento' },
      { id: '2', title: 'Flight Live Support', date: '02/01/2026', time: '04:00 PM', type: 'evento' },
      { id: 'd1', title: 'Grupo Dubái - Familia López', date: '02/01/2026', time: '08:30 AM', type: 'salida' },
      { id: 'd2', title: 'Cliente María González - París', date: '02/01/2026', time: '11:45 AM', type: 'salida' },
    ];

    eventosMock.forEach((evento) => {
      if (evento.title.toLowerCase().includes(queryLower)) {
        results.push({
          id: `evento-${evento.id}`,
          title: evento.title,
          subtitle: `${evento.date} - ${evento.time}`,
          type: 'evento',
          icon: 'calendar_month',
          href: '/dashboard/calendario',
          module: 'inicio',
        });
      }
    });

    // Buscar en Novedades
    const novedadesMock = [
      { id: '1', title: 'La unión europea activa su nuevo sistema de fronteras EES', date: '02/01/2026', category: 'comunicados' },
      { id: '4', title: 'Raynair - Nueva tarjeta digital de embarque', date: '02/01/2026', category: 'noticias' },
      { id: '7', title: 'Mundomar Cruceros - Nuevo proveedor', date: '02/01/2026', category: 'lanzamientos' },
    ];

    novedadesMock.forEach((novedad) => {
      if (novedad.title.toLowerCase().includes(queryLower)) {
        results.push({
          id: `novedad-${novedad.id}`,
          title: novedad.title,
          subtitle: novedad.date,
          type: 'novedad',
          icon: 'newsmode',
          href: '/dashboard/novedades',
          module: 'inicio',
        });
      }
    });

    // Buscar en Academia - Cursos
    const cursosMock = [
      { id: '1', titulo: 'Fundamentos del Asesoramiento de Viajes', categoria: 'Imprescindibles' },
      { id: '2', titulo: 'Gestión de Reservas y Cotizaciones', categoria: 'Imprescindibles' },
    ];

    cursosMock.forEach((curso) => {
      if (curso.titulo.toLowerCase().includes(queryLower)) {
        results.push({
          id: `curso-${curso.id}`,
          title: curso.titulo,
          subtitle: curso.categoria,
          type: 'curso',
          icon: 'book_3',
          href: `/academia/imprescindibles/${curso.id}`,
          module: 'academia',
        });
      }
    });

    return results;
  };

  // Realizar búsqueda cuando cambia el query
  useEffect(() => {
    if (searchQuery.trim().length >= 2) {
      const searchResults = performSearch(searchQuery);
      setResults(searchResults);
    } else {
      setResults([]);
    }
  }, [searchQuery]);

  // Limpiar búsqueda al cerrar
  useEffect(() => {
    if (!isOpen) {
      setSearchQuery('');
      setResults([]);
    }
  }, [isOpen]);

  // Manejar click en resultado
  const handleResultClick = (result: SearchResult) => {
    router.push(result.href);
    onClose();
  };

  // Manejar tecla Enter
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && results.length > 0) {
      handleResultClick(results[0]);
    } else if (e.key === 'Escape') {
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="search-modal__content">
        <div className="search-modal">
          <div className="search-modal__input-wrapper">
            <span className="material-symbols-outlined search-modal__search-icon">search</span>
            <Input
              type="text"
              placeholder="Buscar en CRM, Gestión, Academia..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={handleKeyDown}
              className="search-modal__input"
              autoFocus
            />
            {searchQuery && (
              <button
                className="search-modal__clear-button"
                onClick={() => setSearchQuery('')}
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            )}
          </div>

          {searchQuery.trim().length >= 2 && (
            <div className="search-modal__results">
              {results.length > 0 ? (
                <>
                  <div className="search-modal__results-header">
                    <span className="search-modal__results-count">
                      {results.length} {results.length === 1 ? 'resultado' : 'resultados'}
                    </span>
                  </div>
                  <div className="search-modal__results-list">
                    {results.map((result) => (
                      <button
                        key={result.id}
                        className="search-modal__result-item"
                        onClick={() => handleResultClick(result)}
                      >
                        <span className="material-symbols-outlined search-modal__result-icon">
                          {result.icon}
                        </span>
                        <div className="search-modal__result-content">
                          <div className="search-modal__result-title">{result.title}</div>
                          {result.subtitle && (
                            <div className="search-modal__result-subtitle">{result.subtitle}</div>
                          )}
                        </div>
                        <span className="material-symbols-outlined search-modal__result-arrow">
                          arrow_forward
                        </span>
                      </button>
                    ))}
                  </div>
                </>
              ) : (
                <div className="search-modal__no-results">
                  <span className="material-symbols-outlined">search_off</span>
                  <p>No se encontraron resultados para "{searchQuery}"</p>
                </div>
              )}
            </div>
          )}

          {searchQuery.trim().length < 2 && searchQuery.length > 0 && (
            <div className="search-modal__hint">
              <span className="material-symbols-outlined">info</span>
              <p>Escribe al menos 2 caracteres para buscar</p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
