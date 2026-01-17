'use client';

import { useState, useMemo } from 'react';
import { format, startOfMonth, endOfMonth, startOfWeek, endOfWeek, eachDayOfInterval, isSameMonth, isSameDay, addMonths, subMonths, parse } from 'date-fns';
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

export function CalendarioPage() {
  const [currentDate, setCurrentDate] = useState(new Date(2026, 0, 1)); // Enero 2026
  const [viewMode, setViewMode] = useState<ViewMode>('mes');
  const [filterType, setFilterType] = useState<FilterType>('todos');

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
              <TabsTrigger value="mes">Mes</TabsTrigger>
              <TabsTrigger value="agenda">Agenda</TabsTrigger>
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
            {agendaEvents.length === 0 ? (
              <div className="calendario-page__agenda-empty">
                <span className="material-symbols-outlined">event_busy</span>
                <p>No hay eventos para mostrar</p>
              </div>
            ) : (
              agendaEvents.map((event) => (
                <div key={event.id} className="calendario-page__agenda-item">
                  <div className="calendario-page__agenda-date">
                    <div className="calendario-page__agenda-day">
                      {format(event.dateObj, 'd')}
                    </div>
                    <div className="calendario-page__agenda-month">
                      {format(event.dateObj, 'MMM', { locale: es })}
                    </div>
                  </div>
                  <div className="calendario-page__agenda-content">
                    <div className="calendario-page__agenda-header">
                      <Badge
                        variant={event.type === 'evento' ? 'default' : 'secondary'}
                        className={`calendario-page__agenda-badge calendario-page__agenda-badge--${event.type}`}
                      >
                        {event.type === 'evento' ? 'Evento' : 'Salida'}
                      </Badge>
                      <span className="calendario-page__agenda-time">{event.time}</span>
                    </div>
                    <h3 className="calendario-page__agenda-title">{event.title}</h3>
                  </div>
                </div>
              ))
            )}
          </div>
        </Card>
      )}
    </div>
  );
}
