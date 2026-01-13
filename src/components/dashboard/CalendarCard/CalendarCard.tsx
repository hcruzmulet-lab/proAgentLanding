'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import './CalendarCard.scss';

interface CalendarEvent {
  id: string;
  title: string;
  date: string;
  time: string;
}

interface CalendarCardProps {
  events?: CalendarEvent[];
  departures?: CalendarEvent[];
}

const defaultEvents: CalendarEvent[] = [
  { id: '1', title: 'Group Bookings Live Support', date: '02/01/2026', time: '02:00 PM' },
  { id: '2', title: 'Flight Live Support', date: '02/01/2026', time: '04:00 PM' },
  { id: '3', title: 'Cruise Live Support', date: '03/01/2026', time: '02:00 PM' },
  { id: '4', title: 'DMCs Live Support', date: '03/01/2026', time: '04:00 PM' },
  { id: '5', title: 'Spanish-Led Live Support', date: '04/01/2026', time: '02:00 PM' },
  { id: '6', title: 'Flight Live Support', date: '04/01/2026', time: '04:00 PM' },
  { id: '7', title: 'DMCs Live Support', date: '03/01/2026', time: '04:00 PM' },
];

const defaultDepartures: CalendarEvent[] = [
  { id: 'd1', title: 'Grupo Dubái - Familia López', date: '02/01/2026', time: '08:30 AM' },
  { id: 'd2', title: 'Cliente María González - París', date: '02/01/2026', time: '11:45 AM' },
  { id: 'd3', title: 'Grupo Europa Express - Roma', date: '03/01/2026', time: '06:15 AM' },
  { id: 'd4', title: 'Cliente Juan Pérez - Cancún', date: '03/01/2026', time: '02:30 PM' },
  { id: 'd5', title: 'Grupo Caribe Total - Punta Cana', date: '04/01/2026', time: '09:00 AM' },
  { id: 'd6', title: 'Cliente Ana Martínez - Nueva York', date: '04/01/2026', time: '05:45 PM' },
  { id: 'd7', title: 'Grupo Oriente Mágico - Tokio', date: '05/01/2026', time: '10:20 AM' },
];

export function CalendarCard({
  events = defaultEvents,
  departures = defaultDepartures,
}: CalendarCardProps) {
  const [activeTab, setActiveTab] = useState<'eventos' | 'salidas'>('eventos');
  const router = useRouter();

  const currentItems = activeTab === 'eventos' ? events : departures;

  const handleVerMas = () => {
    router.push('/dashboard/calendario');
  };

  return (
    <div className="calendar-card">
      <div className="calendar-card__header">
        <div className="calendar-card__header-left">
          <h3 className="calendar-card__title">Calendario</h3>
          <div className="calendar-card__tabs">
            <button
              className={`calendar-card__tab ${activeTab === 'eventos' ? 'calendar-card__tab--active' : ''}`}
              onClick={() => setActiveTab('eventos')}
            >
              Eventos
            </button>
            <button
              className={`calendar-card__tab ${activeTab === 'salidas' ? 'calendar-card__tab--active' : ''}`}
              onClick={() => setActiveTab('salidas')}
            >
              Salidas
            </button>
          </div>
        </div>
        <Button variant="ghost" size="sm" className="calendar-card__more-btn" onClick={handleVerMas}>
          Ver más
        </Button>
      </div>

      <div className="calendar-card__list">
        {currentItems.map((item) => (
          <div key={item.id} className="calendar-card__item">
            <div className="calendar-card__item-left">
              <span className="material-symbols-outlined calendar-card__item-icon">calendar_today</span>
              <span className="calendar-card__item-title">{item.title}</span>
            </div>
            <div className="calendar-card__item-right">
              <span className="calendar-card__item-date">{item.date}</span>
              <span className="calendar-card__item-time">{item.time}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
