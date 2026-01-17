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
  type: 'viaje' | 'pago' | 'llamada' | 'salida' | 'cumpleanos' | 'cliente' | 'oportunidad' | 'fecha' | 'aniversario' | 'tarea' | 'evento';
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
  monto?: string;
  estado?: 'pendiente' | 'vencido' | 'proximo' | 'completado';
  fechaEspecial?: string;
}

type AgendaTab = 'hoy' | 'estaSemana' | 'esteMes';

type CategoryType = 'fechas-especiales' | 'pagos-cobros' | 'acciones-tareas' | 'viajes' | 'consolidados' | 'eventos';

interface CategoryData {
  id: CategoryType;
  title: string;
  subtitle: string;
  icon: string;
  items: AgendaItem[];
}

export function CalendarioPage() {
  const [currentDate, setCurrentDate] = useState(new Date(2026, 0, 1)); // Enero 2026
  const [viewMode, setViewMode] = useState<ViewMode>('agenda');
  const [filterType, setFilterType] = useState<FilterType>('todos');
  const [activeAgendaTab, setActiveAgendaTab] = useState<AgendaTab>('hoy');
  const [categoriesData, setCategoriesData] = useState<{
    hoy: CategoryData[];
    estaSemana: CategoryData[];
    esteMes: CategoryData[];
  }>({ 
    hoy: [], 
    estaSemana: [], 
    esteMes: [] 
  });

  // Generar items de agenda organizados por categorías
  useEffect(() => {
    const today = new Date(2026, 0, 1);
    const tomorrow = addDays(today, 1);
    const nextWeek = addDays(today, 7);

    // Cargar clientes desde localStorage
    let clients: any[] = [];
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('crm_clients');
      if (stored) {
        clients = JSON.parse(stored);
      }
    }

    // Función para organizar items por categorías
    const organizeByCategories = (items: AgendaItem[]): CategoryData[] => {
      const categories: CategoryData[] = [
        {
          id: 'fechas-especiales',
          title: 'Recordatorios · Fechas especiales',
          subtitle: 'Cumpleaños, aniversarios y fechas personales',
          icon: 'cake',
          items: items.filter(item => item.type === 'cumpleanos' || item.type === 'aniversario' || item.type === 'fecha')
        },
        {
          id: 'pagos-cobros',
          title: 'Recordatorios · Pagos y cobros',
          subtitle: 'Pendientes, vencidos y próximos',
          icon: 'payment',
          items: items.filter(item => item.type === 'pago')
        },
        {
          id: 'acciones-tareas',
          title: 'Acciones y tareas',
          subtitle: 'Seguimientos y acciones del agente',
          icon: 'task_alt',
          items: items.filter(item => item.type === 'llamada' || item.type === 'tarea' || item.type === 'oportunidad')
        },
        {
          id: 'viajes',
          title: 'Recordatorios · Viajes',
          subtitle: 'Salidas, regresos y fechas de viaje',
          icon: 'flight_takeoff',
          items: items.filter(item => item.type === 'viaje' || item.type === 'salida' || item.type === 'cliente')
        },
        {
          id: 'consolidados',
          title: 'Consolidados',
          subtitle: 'Vista unificada de todos los recordatorios',
          icon: 'dashboard',
          items: items // Todos los items para vista consolidada
        },
        {
          id: 'eventos',
          title: 'Eventos',
          subtitle: 'Eventos y actividades programadas',
          icon: 'event',
          items: items.filter(item => item.type === 'evento')
        }
      ];
      return categories;
    };

    // Items para HOY
    const hoyItems: AgendaItem[] = [
      // Fechas especiales
      {
        id: 'h1',
        text: 'Cumpleaños de María González',
        type: 'cumpleanos',
        date: today,
        priority: 'media',
        cliente: 'María González',
        fechaEspecial: '01 de Enero'
      },
      {
        id: 'h2',
        text: 'Aniversario de boda - Familia López',
        type: 'aniversario',
        date: today,
        priority: 'baja',
        cliente: 'Familia López',
        fechaEspecial: '01 de Enero'
      },
      // Pagos y cobros
      {
        id: 'h3',
        text: 'Pago pendiente reserva #458 (vence hoy)',
        type: 'pago',
        date: today,
        priority: 'alta',
        cliente: clients[2]?.firstName && clients[2]?.lastName ? `${clients[2].firstName} ${clients[2].lastName}` : 'María González',
        monto: '$2,450.00',
        estado: 'vencido'
      },
      {
        id: 'h4',
        text: 'Pago recibido reserva #342 - Confirmar',
        type: 'pago',
        date: today,
        priority: 'media',
        cliente: 'Ana Martínez',
        monto: '$1,850.00',
        estado: 'completado'
      },
      {
        id: 'h5',
        text: 'Cobro próximo reserva #521 (vence mañana)',
        type: 'pago',
        date: tomorrow,
        priority: 'alta',
        cliente: 'Juan Pérez',
        monto: '$3,200.00',
        estado: 'proximo'
      },
      // Acciones y tareas
      {
        id: 'h6',
        text: `Llamar a ${clients[1]?.firstName || 'Henrry'} – seguimiento cotización`,
        type: 'llamada',
        date: today,
        priority: 'media',
        numeroCotizacion: 'COT-2026-0123',
        cliente: clients[1]?.firstName || 'Henrry'
      },
      {
        id: 'h7',
        text: 'Revisar propuesta comercial - Cliente Silva',
        type: 'tarea',
        date: today,
        priority: 'alta',
        cliente: 'Roberto Silva',
        numeroCotizacion: 'COT-2026-0789'
      },
      {
        id: 'h8',
        text: 'Enviar documentación adicional - Cliente Premium',
        type: 'tarea',
        date: today,
        priority: 'media',
        cliente: 'Corporación Global Travel'
      },
      // Viajes
      {
        id: 'h9',
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
        id: 'h10',
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
        id: 'h11',
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
        id: 'h12',
        text: 'Regreso de viaje - Cliente Martínez',
        type: 'viaje',
        date: today,
        priority: 'media',
        cliente: 'Ana Martínez',
        destino: 'Nueva York, USA',
        hora: '05:45 PM',
        aeropuerto: 'JFK - John F. Kennedy International Airport',
        numeroVuelo: 'AA 2345',
        aerolinea: 'American Airlines',
        clase: 'Económica',
        pasajeros: 1
      },
      // Eventos
      {
        id: 'h13',
        text: 'Group Bookings Live Support',
        type: 'evento',
        date: today,
        priority: 'media',
        hora: '02:00 PM'
      },
      {
        id: 'h14',
        text: 'Flight Live Support',
        type: 'evento',
        date: today,
        priority: 'media',
        hora: '04:00 PM'
      }
    ];

    // Items para ESTA SEMANA
    const estaSemanaItems: AgendaItem[] = [
      // Fechas especiales
      {
        id: 's1',
        text: 'Cumpleaños cliente premium - Enviar felicitación',
        type: 'cumpleanos',
        priority: 'media',
        cliente: 'María González',
        fechaEspecial: '03 de Enero'
      },
      {
        id: 's2',
        text: 'Aniversario de empresa - Cliente Corporativo',
        type: 'aniversario',
        priority: 'baja',
        cliente: 'Tech Solutions Inc.',
        fechaEspecial: '05 de Enero'
      },
      // Pagos y cobros
      {
        id: 's3',
        text: 'Pago por vencer reserva #521 (vence el viernes)',
        type: 'pago',
        priority: 'alta',
        cliente: 'Juan Pérez',
        numeroCotizacion: 'COT-2026-0521',
        monto: '$3,200.00',
        estado: 'proximo'
      },
      {
        id: 's4',
        text: 'Pago pendiente reserva #678',
        type: 'pago',
        priority: 'alta',
        cliente: 'Roberto Silva',
        monto: '$1,950.00',
        estado: 'pendiente'
      },
      // Acciones y tareas
      {
        id: 's5',
        text: 'Seguimiento cotización #789 - Cliente Silva',
        type: 'llamada',
        priority: 'media',
        cliente: 'Roberto Silva',
        numeroCotizacion: 'COT-2026-0789'
      },
      {
        id: 's6',
        text: 'Revisar renovación de contrato - Cliente VIP',
        type: 'oportunidad',
        priority: 'alta',
        cliente: 'Corporación Global Travel',
        numeroCotizacion: 'COT-2026-0890'
      },
      // Viajes
      {
        id: 's7',
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
        id: 's8',
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
      // Eventos
      {
        id: 's9',
        text: 'Cruise Live Support',
        type: 'evento',
        priority: 'media',
        hora: '02:00 PM'
      },
      {
        id: 's10',
        text: 'DMCs Live Support',
        type: 'evento',
        priority: 'media',
        hora: '04:00 PM'
      }
    ];

    // Items para ESTE MES
    const esteMesItems: AgendaItem[] = [
      // Fechas especiales
      {
        id: 'm1',
        text: 'Cumpleaños de cliente VIP',
        type: 'cumpleanos',
        priority: 'media',
        cliente: 'Corporación Global Travel',
        fechaEspecial: '15 de Enero'
      },
      // Pagos y cobros
      {
        id: 'm2',
        text: 'Pago mensual suscripción premium',
        type: 'pago',
        priority: 'media',
        cliente: 'Tech Solutions Inc.',
        monto: '$5,000.00',
        estado: 'proximo',
        fechaEspecial: '20 de Enero'
      },
      // Acciones y tareas
      {
        id: 'm3',
        text: 'Oportunidad sin cerrar - Viaje luna de miel',
        type: 'oportunidad',
        priority: 'alta',
        cliente: 'Pareja Martínez',
        destino: 'Maldivas',
        numeroCotizacion: 'COT-2026-0456'
      },
      // Viajes
      {
        id: 'm4',
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
        id: 'm5',
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
      // Eventos
      {
        id: 'm6',
        text: 'Feria comercial de turismo - Participación',
        type: 'evento',
        priority: 'media',
        destino: 'Miami, FL',
        hora: '10:00 AM',
        aeropuerto: 'MIA - Miami International Airport'
      }
    ];

    setCategoriesData({
      hoy: organizeByCategories(hoyItems),
      estaSemana: organizeByCategories(estaSemanaItems),
      esteMes: organizeByCategories(esteMesItems)
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

            {/* Contenido del tab activo - Grid de 6 categorías */}
            <div className="calendario-page__agenda-content">
              <div className="calendario-page__categories-grid">
                {categoriesData[activeAgendaTab].map((category) => (
                  <Card key={category.id} className="calendario-page__category-card">
                    <div className="calendario-page__category-header">
                      <div className="calendario-page__category-header-left">
                        <span className={`material-symbols-outlined calendario-page__category-icon calendario-page__category-icon--${category.id}`}>
                          {category.icon}
                        </span>
                        <div className="calendario-page__category-title-wrapper">
                          <h3 className="calendario-page__category-title">{category.title}</h3>
                          <p className="calendario-page__category-subtitle">{category.subtitle}</p>
                        </div>
                      </div>
                      <Badge variant="secondary" className="calendario-page__category-badge">
                        {category.items.length}
                      </Badge>
                    </div>
                    <div className="calendario-page__category-items">
                      {category.items.length > 0 ? (
                        <ul className="calendario-page__category-list">
                          {category.items.map((item) => (
                            <li key={item.id} className="calendario-page__category-item">
                              <span className={`material-symbols-outlined calendario-page__agenda-item-icon calendario-page__agenda-item-icon--${item.type}`}>
                                {item.type === 'viaje' ? 'flight_takeoff' : 
                                 item.type === 'pago' ? 'payment' : 
                                 item.type === 'llamada' ? 'phone' : 
                                 item.type === 'salida' ? 'airplane_ticket' : 
                                 item.type === 'cumpleanos' ? 'cake' : 
                                 item.type === 'aniversario' ? 'favorite' : 
                                 item.type === 'tarea' ? 'task_alt' : 
                                 item.type === 'oportunidad' ? 'trending_up' : 
                                 item.type === 'cliente' ? 'group' : 
                                 item.type === 'evento' ? 'event' : 
                                 'event'}
                              </span>
                              <div className="calendario-page__agenda-item-content">
                                <div className="calendario-page__agenda-item-main">{item.text}</div>
                                {(item.destino || item.cliente || item.numeroCotizacion || item.numeroVuelo || item.monto || item.fechaEspecial) && (
                                  <div className="calendario-page__agenda-item-details">
                                    {item.fechaEspecial && (
                                      <span className="calendario-page__agenda-item-detail">
                                        <span className="material-symbols-outlined">calendar_today</span>
                                        {item.fechaEspecial}
                                      </span>
                                    )}
                                    {item.numeroCotizacion && (
                                      <span className="calendario-page__agenda-item-detail">
                                        <span className="material-symbols-outlined">description</span>
                                        {item.numeroCotizacion}
                                      </span>
                                    )}
                                    {item.monto && (
                                      <span className="calendario-page__agenda-item-detail">
                                        <span className="material-symbols-outlined">attach_money</span>
                                        {item.monto}
                                      </span>
                                    )}
                                    {item.estado && (
                                      <span className={`calendario-page__agenda-item-detail calendario-page__agenda-item-detail--${item.estado}`}>
                                        <span className="material-symbols-outlined">
                                          {item.estado === 'vencido' ? 'error' : 
                                           item.estado === 'proximo' ? 'schedule' : 
                                           item.estado === 'completado' ? 'check_circle' : 
                                           'pending'}
                                        </span>
                                        {item.estado === 'vencido' ? 'Vencido' : 
                                         item.estado === 'proximo' ? 'Próximo' : 
                                         item.estado === 'completado' ? 'Completado' : 
                                         'Pendiente'}
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
                      ) : (
                        <div className="calendario-page__category-empty">
                          <span className="material-symbols-outlined">inbox</span>
                          <p>No hay elementos en esta categoría</p>
                        </div>
                      )}
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
}
