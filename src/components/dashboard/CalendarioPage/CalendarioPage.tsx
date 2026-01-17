'use client';

import { useState, useMemo, useEffect } from 'react';
import { format, startOfMonth, endOfMonth, startOfWeek, endOfWeek, eachDayOfInterval, isSameMonth, isSameDay, addMonths, subMonths, parse, addDays } from 'date-fns';
import { es } from 'date-fns/locale';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import './CalendarioPage.scss';

interface CalendarEvent {
  id: string;
  title: string;
  date: string; // DD/MM/YYYY
  time: string;
  type: 'evento' | 'salida';
}

const defaultEvents: CalendarEvent[] = [
  { id: '1', title: 'Group Bookings Live Support', date: '02/01/2026', time: '02:00 PM', type: 'evento' },
  { id: '2', title: 'Flight Live Support', date: '02/01/2026', time: '04:00 PM', type: 'evento' },
  { id: '3', title: 'Cruise Live Support', date: '03/01/2026', time: '02:00 PM', type: 'evento' },
  { id: '4', title: 'DMCs Live Support', date: '03/01/2026', time: '04:00 PM', type: 'evento' },
  { id: '5', title: 'Spanish-Led Live Support', date: '04/01/2026', time: '02:00 PM', type: 'evento' },
  { id: '6', title: 'Flight Live Support', date: '04/01/2026', time: '04:00 PM', type: 'evento' },
  { id: '7', title: 'DMCs Live Support', date: '03/01/2026', time: '04:00 PM', type: 'evento' },
];

const defaultDepartures: CalendarEvent[] = [
  { id: 'd1', title: 'Grupo Dubái - Familia López', date: '02/01/2026', time: '08:30 AM', type: 'salida' },
  { id: 'd2', title: 'Cliente María González - París', date: '02/01/2026', time: '11:45 AM', type: 'salida' },
  { id: 'd3', title: 'Grupo Europa Express - Roma', date: '03/01/2026', time: '06:15 AM', type: 'salida' },
  { id: 'd4', title: 'Cliente Juan Pérez - Cancún', date: '03/01/2026', time: '02:30 PM', type: 'salida' },
  { id: 'd5', title: 'Grupo Caribe Total - Punta Cana', date: '04/01/2026', time: '09:00 AM', type: 'salida' },
  { id: 'd6', title: 'Cliente Ana Martínez - Nueva York', date: '04/01/2026', time: '05:45 PM', type: 'salida' },
  { id: 'd7', title: 'Grupo Oriente Mágico - Tokio', date: '05/01/2026', time: '10:20 AM', type: 'salida' },
];

type ViewMode = 'mes' | 'agenda';
type FilterType = 'todos' | 'evento' | 'salida';

interface AgendaItem {
  id: string;
  text: string;
  type: 'viaje' | 'pago' | 'llamada' | 'salida' | 'cumpleanos' | 'cliente' | 'oportunidad' | 'fecha';
  date?: Date;
  priority?: 'alta' | 'media' | 'baja';
  destino?: string;
  hora?: string;
  aeropuerto?: string;
  cliente?: string;
  numeroCotizacion?: string;
  numeroVuelo?: string;
  aerolinea?: string;
  clase?: string;
  pasajeros?: number;
}

type AgendaTab = 'hoy' | 'estaSemana' | 'esteMes';

export function CalendarioPage() {
  const [currentDate, setCurrentDate] = useState(new Date(2026, 0, 1)); // Enero 2026
  const [viewMode, setViewMode] = useState<ViewMode>('agenda');
  const [filterType, setFilterType] = useState<FilterType>('todos');
  const [activeAgendaTab, setActiveAgendaTab] = useState<AgendaTab>('hoy');
  const [agendaItems, setAgendaItems] = useState<{
    hoy: AgendaItem[];
    estaSemana: AgendaItem[];
    esteMes: AgendaItem[];
  }>({ hoy: [], estaSemana: [], esteMes: [] });

  // Generar items de agenda basados en datos mock
  useEffect(() => {
    const today = new Date(2026, 0, 1);
    const tomorrow = addDays(today, 1);
    const weekStart = startOfWeek(today, { weekStartsOn: 1 });
    const weekEnd = endOfWeek(today, { weekStartsOn: 1 });
    const monthStart = startOfMonth(today);
    const monthEnd = endOfMonth(today);

    // Cargar clientes desde localStorage
    let clients: any[] = [];
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('crm_clients');
      if (stored) {
        clients = JSON.parse(stored);
      }
    }

    // Items para HOY - 6 eventos
    const hoyItems: AgendaItem[] = [
      {
        id: 'h1',
        text: `${clients[0]?.firstName || 'Arieldi'} ${clients[0]?.lastName || 'Marrero'} viaja mañana`,
        type: 'viaje',
        date: tomorrow,
        priority: 'alta',
        cliente: `${clients[0]?.firstName || 'Arieldi'} ${clients[0]?.lastName || 'Marrero'}`,
        destino: 'Cancún, México',
        hora: '08:30 AM',
        aeropuerto: 'MIA - Miami International Airport',
        numeroVuelo: 'AA 1234',
        aerolinea: 'American Airlines',
        clase: 'Económica',
        pasajeros: 2
      },
      {
        id: 'h2',
        text: 'Pago pendiente reserva #458 (vence hoy)',
        type: 'pago',
        date: today,
        priority: 'alta',
        cliente: clients[2]?.firstName && clients[2]?.lastName ? `${clients[2].firstName} ${clients[2].lastName}` : 'María González'
      },
      {
        id: 'h3',
        text: `Llamar a ${clients[1]?.firstName || 'Henrry'} – seguimiento cotización`,
        type: 'llamada',
        date: today,
        priority: 'media',
        numeroCotizacion: 'COT-2026-0123'
      },
      {
        id: 'h4',
        text: 'Revisar confirmación de vuelo - Cliente García',
        type: 'viaje',
        date: today,
        priority: 'alta',
        cliente: 'María García',
        destino: 'París, Francia',
        hora: '10:45 PM',
        aeropuerto: 'MIA - Miami International Airport',
        numeroVuelo: 'AF 5678',
        aerolinea: 'Air France',
        clase: 'Business',
        pasajeros: 1
      },
      {
        id: 'h5',
        text: 'Enviar documentos de viaje - Cliente Rodríguez',
        type: 'viaje',
        date: today,
        priority: 'media',
        cliente: 'Carlos Rodríguez',
        destino: 'Roma, Italia',
        hora: '06:15 AM',
        aeropuerto: 'FLL - Fort Lauderdale Airport',
        numeroVuelo: 'DL 9012',
        aerolinea: 'Delta Airlines',
        clase: 'Económica',
        pasajeros: 3
      },
      {
        id: 'h6',
        text: 'Pago recibido reserva #342 - Confirmar',
        type: 'pago',
        date: today,
        priority: 'media',
        cliente: 'Ana Martínez'
      }
    ];

    // Items para ESTA SEMANA - 5 eventos
    const estaSemanaItems: AgendaItem[] = [
      {
        id: 's1',
        text: 'Salida grupo familiar - Familia López',
        type: 'salida',
        priority: 'alta',
        cliente: 'Familia López',
        destino: 'Dubái, Emiratos Árabes',
        hora: '11:20 PM',
        aeropuerto: 'MIA - Miami International Airport',
        numeroVuelo: 'EK 3456',
        aerolinea: 'Emirates',
        clase: 'Business',
        pasajeros: 4
      },
      {
        id: 's2',
        text: 'Pago por vencer reserva #521 (vence el viernes)',
        type: 'pago',
        priority: 'alta',
        cliente: 'Juan Pérez',
        numeroCotizacion: 'COT-2026-0521'
      },
      {
        id: 's3',
        text: 'Cumpleaños cliente premium - Enviar felicitación',
        type: 'cumpleanos',
        priority: 'media',
        cliente: 'María González'
      },
      {
        id: 's4',
        text: 'Grupo familiar viaja - Confirmar detalles',
        type: 'viaje',
        priority: 'alta',
        cliente: 'Familia López',
        destino: 'Dubái, Emiratos Árabes',
        hora: '11:20 PM',
        aeropuerto: 'MIA - Miami International Airport',
        numeroVuelo: 'EK 3456',
        aerolinea: 'Emirates',
        clase: 'Business',
        pasajeros: 4
      },
      {
        id: 's5',
        text: 'Seguimiento cotización #789 - Cliente Silva',
        type: 'llamada',
        priority: 'media',
        cliente: 'Roberto Silva',
        numeroCotizacion: 'COT-2026-0789'
      }
    ];

    // Items para ESTE MES - 5 eventos
    const esteMesItems: AgendaItem[] = [
      {
        id: 'm1',
        text: 'Cliente regresa de viaje - Arieldi Marrero',
        type: 'cliente',
        priority: 'media',
        cliente: `${clients[0]?.firstName || 'Arieldi'} ${clients[0]?.lastName || 'Marrero'}`,
        destino: 'Cancún, México',
        hora: '03:15 PM',
        aeropuerto: 'CUN - Cancún International Airport',
        numeroVuelo: 'AA 1235',
        aerolinea: 'American Airlines',
        clase: 'Económica',
        pasajeros: 2
      },
      {
        id: 'm2',
        text: 'Oportunidad sin cerrar - Viaje luna de miel',
        type: 'oportunidad',
        priority: 'alta',
        cliente: 'Pareja Martínez',
        destino: 'Maldivas',
        numeroCotizacion: 'COT-2026-0456'
      },
      {
        id: 'm3',
        text: 'Feria comercial de turismo - Participación',
        type: 'fecha',
        priority: 'media',
        destino: 'Miami, FL',
        hora: '10:00 AM',
        aeropuerto: 'MIA - Miami International Airport'
      },
      {
        id: 'm4',
        text: 'Viaje corporativo - Empresa Tech Solutions',
        type: 'viaje',
        priority: 'alta',
        cliente: 'Tech Solutions Inc.',
        destino: 'Londres, Reino Unido',
        hora: '09:00 AM',
        aeropuerto: 'MIA - Miami International Airport',
        numeroVuelo: 'BA 7890',
        aerolinea: 'British Airways',
        clase: 'Business',
        pasajeros: 2
      },
      {
        id: 'm5',
        text: 'Revisar renovación de contrato - Cliente VIP',
        type: 'oportunidad',
        priority: 'alta',
        cliente: 'Corporación Global Travel',
        numeroCotizacion: 'COT-2026-0890'
      }
    ];

    setAgendaItems({
      hoy: hoyItems,
      estaSemana: estaSemanaItems,
      esteMes: esteMesItems
    });
  }, []);

  // Convertir fechas string a Date objects
  const parseDate = (dateStr: string): Date => {
    const [day, month, year] = dateStr.split('/').map(Number);
    return new Date(year, month - 1, day);
  };

  // Combinar eventos y salidas
  const allEvents = useMemo(() => {
    const events = defaultEvents.map(e => ({ ...e, dateObj: parseDate(e.date) }));
    const departures = defaultDepartures.map(d => ({ ...d, dateObj: parseDate(d.date) }));
    return [...events, ...departures];
  }, []);

  // Filtrar eventos según el filtro seleccionado
  const filteredEvents = useMemo(() => {
    if (filterType === 'todos') return allEvents;
    return allEvents.filter(e => e.type === filterType);
  }, [allEvents, filterType]);

  // Obtener eventos para un día específico
  const getEventsForDay = (date: Date) => {
    return filteredEvents.filter(event => isSameDay(event.dateObj, date));
  };

  // Navegación del calendario
  const handlePreviousMonth = () => {
    setCurrentDate(subMonths(currentDate, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(addMonths(currentDate, 1));
  };

  const handleToday = () => {
    setCurrentDate(new Date(2026, 0, 1));
  };

  // Vista mensual
  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);
  const calendarStart = startOfWeek(monthStart, { weekStartsOn: 1 }); // Lunes
  const calendarEnd = endOfWeek(monthEnd, { weekStartsOn: 1 });
  const calendarDays = eachDayOfInterval({ start: calendarStart, end: calendarEnd });

  // Vista de agenda - eventos ordenados por fecha y hora
  const agendaEvents = useMemo(() => {
    return [...filteredEvents].sort((a, b) => {
      const dateCompare = a.dateObj.getTime() - b.dateObj.getTime();
      if (dateCompare !== 0) return dateCompare;
      
      // Ordenar por hora si es el mismo día
      const parseTime = (timeStr: string): number => {
        const [time, period] = timeStr.split(' ');
        const [hours, minutes] = time.split(':').map(Number);
        let totalMinutes = hours * 60 + minutes;
        
        if (period === 'AM') {
          if (hours === 12) totalMinutes = minutes; // 12:XX AM = 0:XX
        } else {
          if (hours !== 12) totalMinutes = (hours + 12) * 60 + minutes; // PM (excepto 12 PM)
        }
        
        return totalMinutes;
      };
      
      return parseTime(a.time) - parseTime(b.time);
    });
  }, [filteredEvents]);

  const weekDays = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'];

  return (
    <div className="calendario-page">
      <h1 className="calendario-page__title">Calendario</h1>
      <div className="calendario-page__header">
        <div className="calendario-page__header-left">
          <div className="calendario-page__controls">
            <Button variant="outline" size="sm" onClick={handlePreviousMonth}>
              <span className="material-symbols-outlined">chevron_left</span>
            </Button>
            <Button variant="outline" size="sm" onClick={handleToday}>
              Hoy
            </Button>
            <Button variant="outline" size="sm" onClick={handleNextMonth}>
              <span className="material-symbols-outlined">chevron_right</span>
            </Button>
            <h2 className="calendario-page__month-year">
              {format(currentDate, 'MMMM yyyy', { locale: es })}
            </h2>
          </div>
        </div>
        <div className="calendario-page__header-right">
          <Select value={filterType} onValueChange={(value) => setFilterType(value as FilterType)}>
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Filtrar" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="todos">Todos</SelectItem>
              <SelectItem value="evento">Eventos</SelectItem>
              <SelectItem value="salida">Salidas</SelectItem>
            </SelectContent>
          </Select>
          <Tabs value={viewMode} onValueChange={(value) => setViewMode(value as ViewMode)}>
            <TabsList>
              <TabsTrigger value="agenda">Agenda</TabsTrigger>
              <TabsTrigger value="mes">Calendario</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </div>

      {viewMode === 'mes' ? (
        <div className="calendario-page__calendar">
          <div className="calendario-page__weekdays">
            {weekDays.map((day) => (
              <div key={day} className="calendario-page__weekday">
                {day}
              </div>
            ))}
          </div>
          <div className="calendario-page__days">
              {calendarDays.map((day, idx) => {
                const dayEvents = getEventsForDay(day);
                const isCurrentMonth = isSameMonth(day, currentDate);
                const isToday = isSameDay(day, new Date(2026, 0, 1));

                return (
                  <div
                    key={idx}
                    className={`calendario-page__day ${!isCurrentMonth ? 'calendario-page__day--other-month' : ''} ${isToday ? 'calendario-page__day--today' : ''}`}
                  >
                    <div className="calendario-page__day-number">
                      {format(day, 'd')}
                    </div>
                    <div className="calendario-page__day-events">
                      {dayEvents.slice(0, 3).map((event) => (
                        <div
                          key={event.id}
                          className={`calendario-page__event-item calendario-page__event-item--${event.type}`}
                          title={`${event.title} - ${event.time}`}
                        >
                          <span className="calendario-page__event-time">{event.time}</span>
                          <span className="calendario-page__event-title">{event.title}</span>
                        </div>
                      ))}
                      {dayEvents.length > 3 && (
                        <div className="calendario-page__event-more">
                          +{dayEvents.length - 3} más
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
      ) : (
        <Card className="calendario-page__agenda-card">
          <div className="calendario-page__agenda">
            {/* Tabs de agenda */}
            <Tabs value={activeAgendaTab} onValueChange={(value) => setActiveAgendaTab(value as AgendaTab)} className="calendario-page__agenda-tabs">
              <TabsList className="calendario-page__agenda-tabs-list">
                <TabsTrigger value="hoy" className="calendario-page__agenda-tab">
                  <span className="material-symbols-outlined">today</span>
                  Hoy
                </TabsTrigger>
                <TabsTrigger value="estaSemana" className="calendario-page__agenda-tab">
                  <span className="material-symbols-outlined">calendar_view_week</span>
                  Esta semana
                </TabsTrigger>
                <TabsTrigger value="esteMes" className="calendario-page__agenda-tab">
                  <span className="material-symbols-outlined">calendar_month</span>
                  Este mes
                </TabsTrigger>
              </TabsList>
            </Tabs>

            {/* Contenido del tab activo */}
            <div className="calendario-page__agenda-content">
              {activeAgendaTab === 'hoy' && (
                <ul className="calendario-page__agenda-section-list">
                  {agendaItems.hoy.map((item) => (
                    <li key={item.id} className="calendario-page__agenda-section-item">
                      <span className={`material-symbols-outlined calendario-page__agenda-item-icon calendario-page__agenda-item-icon--${item.type}`}>
                        {item.type === 'viaje' ? 'flight_takeoff' : item.type === 'pago' ? 'payment' : 'phone'}
                      </span>
                      <div className="calendario-page__agenda-item-content">
                        <div className="calendario-page__agenda-item-main">{item.text}</div>
                        {(item.destino || item.cliente || item.numeroCotizacion || item.numeroVuelo) && (
                          <div className="calendario-page__agenda-item-details">
                            {item.numeroCotizacion && (
                              <span className="calendario-page__agenda-item-detail">
                                <span className="material-symbols-outlined">description</span>
                                {item.numeroCotizacion}
                              </span>
                            )}
                            {item.destino && (
                              <span className="calendario-page__agenda-item-detail">
                                <span className="material-symbols-outlined">location_on</span>
                                {item.destino}
                              </span>
                            )}
                            {item.numeroVuelo && (
                              <span className="calendario-page__agenda-item-detail">
                                <span className="material-symbols-outlined">flight</span>
                                {item.numeroVuelo}
                              </span>
                            )}
                            {item.aerolinea && (
                              <span className="calendario-page__agenda-item-detail">
                                <span className="material-symbols-outlined">airlines</span>
                                {item.aerolinea}
                              </span>
                            )}
                            {item.hora && (
                              <span className="calendario-page__agenda-item-detail">
                                <span className="material-symbols-outlined">schedule</span>
                                {item.hora}
                              </span>
                            )}
                            {item.aeropuerto && (
                              <span className="calendario-page__agenda-item-detail">
                                <span className="material-symbols-outlined">airport_shuttle</span>
                                {item.aeropuerto}
                              </span>
                            )}
                            {item.clase && (
                              <span className="calendario-page__agenda-item-detail">
                                <span className="material-symbols-outlined">confirmation_number</span>
                                {item.clase}
                              </span>
                            )}
                            {item.pasajeros && (
                              <span className="calendario-page__agenda-item-detail">
                                <span className="material-symbols-outlined">group</span>
                                {item.pasajeros} pasajero{item.pasajeros > 1 ? 's' : ''}
                              </span>
                            )}
                            {item.cliente && (
                              <span className="calendario-page__agenda-item-detail">
                                <span className="material-symbols-outlined">person</span>
                                {item.cliente}
                              </span>
                            )}
                          </div>
                        )}
                      </div>
                    </li>
                  ))}
                </ul>
              )}

              {activeAgendaTab === 'estaSemana' && (
                <ul className="calendario-page__agenda-section-list">
                  {agendaItems.estaSemana.map((item) => (
                    <li key={item.id} className="calendario-page__agenda-section-item">
                      <span className={`material-symbols-outlined calendario-page__agenda-item-icon calendario-page__agenda-item-icon--${item.type}`}>
                        {item.type === 'salida' ? 'airplane_ticket' : item.type === 'pago' ? 'payment' : item.type === 'cumpleanos' ? 'cake' : item.type === 'viaje' ? 'flight_takeoff' : 'phone'}
                      </span>
                      <div className="calendario-page__agenda-item-content">
                        <div className="calendario-page__agenda-item-main">{item.text}</div>
                        {(item.destino || item.cliente || item.numeroCotizacion || item.numeroVuelo) && (
                          <div className="calendario-page__agenda-item-details">
                            {item.numeroCotizacion && (
                              <span className="calendario-page__agenda-item-detail">
                                <span className="material-symbols-outlined">description</span>
                                {item.numeroCotizacion}
                              </span>
                            )}
                            {item.destino && (
                              <span className="calendario-page__agenda-item-detail">
                                <span className="material-symbols-outlined">location_on</span>
                                {item.destino}
                              </span>
                            )}
                            {item.numeroVuelo && (
                              <span className="calendario-page__agenda-item-detail">
                                <span className="material-symbols-outlined">flight</span>
                                {item.numeroVuelo}
                              </span>
                            )}
                            {item.aerolinea && (
                              <span className="calendario-page__agenda-item-detail">
                                <span className="material-symbols-outlined">airlines</span>
                                {item.aerolinea}
                              </span>
                            )}
                            {item.hora && (
                              <span className="calendario-page__agenda-item-detail">
                                <span className="material-symbols-outlined">schedule</span>
                                {item.hora}
                              </span>
                            )}
                            {item.aeropuerto && (
                              <span className="calendario-page__agenda-item-detail">
                                <span className="material-symbols-outlined">airport_shuttle</span>
                                {item.aeropuerto}
                              </span>
                            )}
                            {item.clase && (
                              <span className="calendario-page__agenda-item-detail">
                                <span className="material-symbols-outlined">confirmation_number</span>
                                {item.clase}
                              </span>
                            )}
                            {item.pasajeros && (
                              <span className="calendario-page__agenda-item-detail">
                                <span className="material-symbols-outlined">group</span>
                                {item.pasajeros} pasajero{item.pasajeros > 1 ? 's' : ''}
                              </span>
                            )}
                            {item.cliente && (
                              <span className="calendario-page__agenda-item-detail">
                                <span className="material-symbols-outlined">person</span>
                                {item.cliente}
                              </span>
                            )}
                          </div>
                        )}
                      </div>
                    </li>
                  ))}
                </ul>
              )}

              {activeAgendaTab === 'esteMes' && (
                <ul className="calendario-page__agenda-section-list">
                  {agendaItems.esteMes.map((item) => (
                    <li key={item.id} className="calendario-page__agenda-section-item">
                      <span className={`material-symbols-outlined calendario-page__agenda-item-icon calendario-page__agenda-item-icon--${item.type}`}>
                        {item.type === 'cliente' ? 'group' : item.type === 'oportunidad' ? 'trending_up' : item.type === 'fecha' ? 'event' : item.type === 'viaje' ? 'flight_takeoff' : 'event'}
                      </span>
                      <div className="calendario-page__agenda-item-content">
                        <div className="calendario-page__agenda-item-main">{item.text}</div>
                        {(item.destino || item.cliente || item.numeroCotizacion || item.numeroVuelo) && (
                          <div className="calendario-page__agenda-item-details">
                            {item.numeroCotizacion && (
                              <span className="calendario-page__agenda-item-detail">
                                <span className="material-symbols-outlined">description</span>
                                {item.numeroCotizacion}
                              </span>
                            )}
                            {item.destino && (
                              <span className="calendario-page__agenda-item-detail">
                                <span className="material-symbols-outlined">location_on</span>
                                {item.destino}
                              </span>
                            )}
                            {item.numeroVuelo && (
                              <span className="calendario-page__agenda-item-detail">
                                <span className="material-symbols-outlined">flight</span>
                                {item.numeroVuelo}
                              </span>
                            )}
                            {item.aerolinea && (
                              <span className="calendario-page__agenda-item-detail">
                                <span className="material-symbols-outlined">airlines</span>
                                {item.aerolinea}
                              </span>
                            )}
                            {item.hora && (
                              <span className="calendario-page__agenda-item-detail">
                                <span className="material-symbols-outlined">schedule</span>
                                {item.hora}
                              </span>
                            )}
                            {item.aeropuerto && (
                              <span className="calendario-page__agenda-item-detail">
                                <span className="material-symbols-outlined">airport_shuttle</span>
                                {item.aeropuerto}
                              </span>
                            )}
                            {item.clase && (
                              <span className="calendario-page__agenda-item-detail">
                                <span className="material-symbols-outlined">confirmation_number</span>
                                {item.clase}
                              </span>
                            )}
                            {item.pasajeros && (
                              <span className="calendario-page__agenda-item-detail">
                                <span className="material-symbols-outlined">group</span>
                                {item.pasajeros} pasajero{item.pasajeros > 1 ? 's' : ''}
                              </span>
                            )}
                            {item.cliente && (
                              <span className="calendario-page__agenda-item-detail">
                                <span className="material-symbols-outlined">person</span>
                                {item.cliente}
                              </span>
                            )}
                          </div>
                        )}
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </Card>
      )}
    </div>
  );
}
