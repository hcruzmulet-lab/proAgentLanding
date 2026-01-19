'use client';

import { useRouter } from 'next/navigation';
import './NotificationsDrawer.scss';

interface Notification {
  id: string;
  icon: string;
  message: string;
  time: string;
  link?: string;
}

interface NotificationsDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  notifications?: Notification[];
}

const defaultNotifications: Notification[] = [
  {
    id: '1',
    icon: 'receipt_long',
    message: 'Pendiente: Generar factura para la cotización COT-002',
    time: 'Hace 1 hora',
    link: '/crm/cotizaciones/COT-002',
  },
  {
    id: '2',
    icon: 'local_fire_department',
    message: 'Últimos 3 cupos disponibles – Grupo Punta Cana Agosto.',
    time: 'Hace 2 horas',
  },
  {
    id: '3',
    icon: 'flight',
    message: 'Nuevo FAM Trip disponible: Riviera Maya – aplica antes del 20.',
    time: 'Hace 5 horas',
  },
  {
    id: '4',
    icon: 'school',
    message: 'Capacitación en vivo: cómo vender Europa con mayor margen – mañana 7pm.',
    time: 'Hace 1 día',
  },
];

export function NotificationsDrawer({
  isOpen,
  onClose,
  notifications = defaultNotifications,
}: NotificationsDrawerProps) {
  const router = useRouter();

  const handleNotificationClick = (notification: Notification) => {
    if (notification.link) {
      router.push(notification.link);
      onClose();
    }
  };

  return (
    <>
      {/* Overlay */}
      {isOpen && <div className="notifications-drawer__overlay" onClick={onClose} />}

      {/* Drawer */}
      <div className={`notifications-drawer ${isOpen ? 'notifications-drawer--open' : ''}`}>
        <div className="notifications-drawer__header">
          <h2 className="notifications-drawer__title">Notificaciones</h2>
          <button className="notifications-drawer__close" onClick={onClose}>
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        <div className="notifications-drawer__list">
          {notifications.map((notification) => (
            <div 
              key={notification.id} 
              className={`notifications-drawer__item ${notification.link ? 'notifications-drawer__item--clickable' : ''}`}
              onClick={() => handleNotificationClick(notification)}
            >
              <div className="notifications-drawer__item-icon">
                <span className="material-symbols-outlined">{notification.icon}</span>
              </div>
              <div className="notifications-drawer__item-content">
                <p className="notifications-drawer__item-message">{notification.message}</p>
                <span className="notifications-drawer__item-time">{notification.time}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
