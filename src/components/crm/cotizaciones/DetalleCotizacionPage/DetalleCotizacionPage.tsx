'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import './DetalleCotizacionPage.scss';

interface Servicio {
  id: string;
  tipo: 'vuelo' | 'hotel' | 'traslado' | 'actividad';
  icono: string;
  titulo: string;
  detalles: string[];
  precio: number;
  imagen?: string;
}

export function DetalleCotizacionPage() {
  const router = useRouter();
  const [showShareModal, setShowShareModal] = useState(false);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  // Datos mock de la cotización COT-002
  const cotizacion = {
    numero: 'COT-002',
    titulo: 'Vacaciones Soñadas en Punta Cana',
    fechaCreacion: '12 ene 2026',
    fechaViaje: '20 mar 2026',
    fechaVuelta: '27 mar 2026',
    estado: 'pendiente',
    coverImage: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=1200&h=600&fit=crop',
    
    cliente: {
      tipoCliente: 'persona',
      nombre: 'Arieldi Marrero',
      email: 'arieldi.marrero@gmail.com',
      telefono: '+1 (809) 555-1234',
      direccion: 'Calle Principal #123, Santo Domingo',
      nacionalidad: 'Dominicana',
    },
    
    pasajeros: {
      adultos: 2,
      ninos: 2,
      infantes: 0,
      total: 4,
    },
    
    notas: {
      cliente: 'La familia Marrero busca un resort todo incluido con actividades para niños. Preferencia por habitaciones con vista al mar.',
      terminosCondiciones: 'Precios sujetos a disponibilidad. Depósito no reembolsable del 30%. Balance final 30 días antes del viaje.',
      interna: 'Cliente VIP - Ofrecer upgrade si disponible. Ha viajado con nosotros 3 veces anteriormente.',
    }
  };

  const servicios: Servicio[] = [
    {
      id: '1',
      tipo: 'vuelo',
      icono: 'flight_takeoff',
      titulo: 'Vuelos Ida y Vuelta',
      detalles: [
        'Aerolínea: American Airlines',
        'Ruta: Santo Domingo (SDQ) → Punta Cana (PUJ)',
        'Fecha ida: 20 mar 2026, 10:30 AM',
        'Fecha vuelta: 27 mar 2026, 3:45 PM',
        'Clase: Económica Premium',
        '2 maletas incluidas por pasajero',
      ],
      precio: 1200.00,
      imagen: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=400&h=300&fit=crop',
    },
    {
      id: '2',
      tipo: 'hotel',
      icono: 'hotel',
      titulo: 'Resort Todo Incluido',
      detalles: [
        'Hotel: Hard Rock Hotel & Casino Punta Cana',
        'Ubicación: Bávaro, Punta Cana',
        'Check-in: 20 mar 2026',
        'Check-out: 27 mar 2026',
        'Habitación: Suite Familiar Vista al Mar',
        'Régimen: Todo Incluido Premium',
        '7 noches / 2 adultos + 2 niños',
      ],
      precio: 2800.00,
      imagen: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=400&h=300&fit=crop',
    },
    {
      id: '3',
      tipo: 'traslado',
      icono: 'directions_car',
      titulo: 'Traslados Aeropuerto - Hotel',
      detalles: [
        'Tipo: Traslado privado VIP',
        'Vehículo: SUV con aire acondicionado',
        'Incluye: Ida y vuelta',
        'Capacidad: Hasta 6 pasajeros',
        'Agua y snacks de cortesía',
      ],
      precio: 150.00,
      imagen: 'https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=400&h=300&fit=crop',
    },
    {
      id: '4',
      tipo: 'actividad',
      icono: 'local_activity',
      titulo: 'Excursiones y Actividades',
      detalles: [
        'Isla Saona - Tour de día completo',
        'Snorkel en arrecifes de coral',
        'Paseo en catamarán',
        'Almuerzo buffet en la playa',
        'Bebidas ilimitadas incluidas',
        'Guía turístico en español',
      ],
      precio: 280.00,
      imagen: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=400&h=300&fit=crop',
    },
  ];

  const calcularSubtotal = () => {
    return servicios.reduce((total, servicio) => total + servicio.precio, 0);
  };

  const calcularImpuestos = () => {
    return calcularSubtotal() * 0.18; // 18% de impuestos
  };

  const calcularTotal = () => {
    return calcularSubtotal() + calcularImpuestos();
  };

  const getEstadoBadge = () => {
    const badges = {
      pendiente: { bg: 'bg-yellow-100', text: 'text-yellow-700', label: 'Pendiente' },
      enviada: { bg: 'bg-blue-100', text: 'text-blue-700', label: 'Enviada' },
      aceptada: { bg: 'bg-green-100', text: 'text-green-700', label: 'Aceptada' },
      rechazada: { bg: 'bg-red-100', text: 'text-red-700', label: 'Rechazada' },
    };
    return badges[cotizacion.estado as keyof typeof badges];
  };

  const handleCompartir = () => {
    setShowShareModal(true);
  };

  const handleCopiarEnlace = () => {
    const enlacePublico = `${window.location.origin}/cotizacion/${cotizacion.numero}`;
    navigator.clipboard.writeText(enlacePublico);
    // Mostrar feedback temporal
    alert('¡Enlace copiado al portapapeles!');
  };

  const handleCompartirWhatsApp = () => {
    const enlacePublico = `${window.location.origin}/cotizacion/${cotizacion.numero}`;
    const mensaje = `Hola ${cotizacion.cliente.nombre}, te comparto la cotización ${cotizacion.numero} para tu viaje a ${cotizacion.titulo}: ${enlacePublico}`;
    const urlWhatsApp = `https://wa.me/?text=${encodeURIComponent(mensaje)}`;
    window.open(urlWhatsApp, '_blank');
  };

  const handleCompartirEmail = () => {
    const enlacePublico = `${window.location.origin}/cotizacion/${cotizacion.numero}`;
    const asunto = `Cotización ${cotizacion.numero} - ${cotizacion.titulo}`;
    const cuerpo = `Hola ${cotizacion.cliente.nombre},\n\nTe comparto la cotización para tu viaje:\n\nCotización: ${cotizacion.numero}\nDestino: ${cotizacion.titulo}\nFecha de viaje: ${cotizacion.fechaViaje} - ${cotizacion.fechaVuelta}\n\nPuedes ver los detalles completos aquí:\n${enlacePublico}\n\nSaludos,\nEquipo Proagent`;
    const mailtoLink = `mailto:${cotizacion.cliente.email}?subject=${encodeURIComponent(asunto)}&body=${encodeURIComponent(cuerpo)}`;
    window.location.href = mailtoLink;
  };

  const handleSolicitarFirma = () => {
    console.log('Solicitar firma electrónica');
    // Aquí iría la lógica para enviar solicitud de firma
  };

  const handleDescargarPDF = () => {
    setIsPreviewOpen(true);
  };


  const estadoBadge = getEstadoBadge();

  return (
    <div className="detalle-cotizacion-page">
      {/* Breadcrumb */}
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink 
              onClick={() => router.push('/es/crm/cotizaciones')}
              className="cursor-pointer"
            >
              Cotizaciones
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>{cotizacion.numero}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      {/* Header con Cover Image */}
      <div className="detalle-cotizacion-page__header">
        <div className="detalle-cotizacion-page__cover">
          <Image
            src={cotizacion.coverImage}
            alt={cotizacion.titulo}
            fill
            className="detalle-cotizacion-page__cover-image"
            unoptimized
          />
          <div className="detalle-cotizacion-page__cover-overlay" />
          <div className="detalle-cotizacion-page__cover-content">
            <div className="detalle-cotizacion-page__cover-info">
              <div className="flex items-center gap-3 mb-2">
                <span className="detalle-cotizacion-page__numero">{cotizacion.numero}</span>
                <span className={`detalle-cotizacion-page__badge ${estadoBadge.bg} ${estadoBadge.text}`}>
                  {estadoBadge.label}
                </span>
              </div>
              <h1 className="detalle-cotizacion-page__title">{cotizacion.titulo}</h1>
              <div className="detalle-cotizacion-page__meta">
                <span className="flex items-center gap-1">
                  <span className="material-symbols-outlined text-sm">calendar_today</span>
                  {cotizacion.fechaViaje} - {cotizacion.fechaVuelta}
                </span>
                <span className="flex items-center gap-1">
                  <span className="material-symbols-outlined text-sm">group</span>
                  {cotizacion.pasajeros.total} pasajeros
                </span>
                <span className="flex items-center gap-1">
                  <span className="material-symbols-outlined text-sm">schedule</span>
                  Creada el {cotizacion.fechaCreacion}
                </span>
              </div>
            </div>
            
            {/* Botones de Acción */}
            <div className="detalle-cotizacion-page__actions">
              <Button
                variant="outline"
                className="detalle-cotizacion-page__action-btn"
                onClick={handleCompartir}
              >
                <span className="material-symbols-outlined">share</span>
                <span>Compartir</span>
              </Button>
              <Button
                variant="outline"
                className="detalle-cotizacion-page__action-btn"
                onClick={handleSolicitarFirma}
              >
                <span className="material-symbols-outlined">draw</span>
                <span>Solicitar Firma</span>
              </Button>
              <Button
                variant="outline"
                className="detalle-cotizacion-page__action-btn"
                onClick={handleDescargarPDF}
              >
                <span className="material-symbols-outlined">download</span>
                <span>Descargar PDF</span>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Contenido Principal */}
      <div className="detalle-cotizacion-page__content">
        <div className="detalle-cotizacion-page__grid">
          {/* Columna Izquierda - Información */}
          <div className="detalle-cotizacion-page__main">
            {/* Información del Cliente */}
            <Card className="detalle-cotizacion-page__card">
              <div className="detalle-cotizacion-page__card-header">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-slate-700">person</span>
                  <h2 className="detalle-cotizacion-page__card-title">Información del Cliente</h2>
                </div>
              </div>
              <CardContent className="detalle-cotizacion-page__card-content">
                <div className="detalle-cotizacion-page__info-grid">
                  <div className="detalle-cotizacion-page__info-item">
                    <span className="detalle-cotizacion-page__info-label">Nombre Completo</span>
                    <span className="detalle-cotizacion-page__info-value">{cotizacion.cliente.nombre}</span>
                  </div>
                  <div className="detalle-cotizacion-page__info-item">
                    <span className="detalle-cotizacion-page__info-label">Email</span>
                    <span className="detalle-cotizacion-page__info-value">{cotizacion.cliente.email}</span>
                  </div>
                  <div className="detalle-cotizacion-page__info-item">
                    <span className="detalle-cotizacion-page__info-label">Teléfono</span>
                    <span className="detalle-cotizacion-page__info-value">{cotizacion.cliente.telefono}</span>
                  </div>
                  <div className="detalle-cotizacion-page__info-item">
                    <span className="detalle-cotizacion-page__info-label">Nacionalidad</span>
                    <span className="detalle-cotizacion-page__info-value">{cotizacion.cliente.nacionalidad}</span>
                  </div>
                  <div className="detalle-cotizacion-page__info-item detalle-cotizacion-page__info-item--full">
                    <span className="detalle-cotizacion-page__info-label">Dirección</span>
                    <span className="detalle-cotizacion-page__info-value">{cotizacion.cliente.direccion}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Información de Pasajeros */}
            <Card className="detalle-cotizacion-page__card">
              <div className="detalle-cotizacion-page__card-header">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-slate-700">group</span>
                  <h2 className="detalle-cotizacion-page__card-title">Pasajeros</h2>
                </div>
              </div>
              <CardContent className="detalle-cotizacion-page__card-content">
                <div className="detalle-cotizacion-page__passengers">
                  <div className="detalle-cotizacion-page__passenger-item">
                    <div className="detalle-cotizacion-page__passenger-icon">
                      <span className="material-symbols-outlined">person</span>
                    </div>
                    <div>
                      <div className="detalle-cotizacion-page__passenger-count">{cotizacion.pasajeros.adultos}</div>
                      <div className="detalle-cotizacion-page__passenger-label">Adultos</div>
                    </div>
                  </div>
                  <div className="detalle-cotizacion-page__passenger-item">
                    <div className="detalle-cotizacion-page__passenger-icon">
                      <span className="material-symbols-outlined">child_care</span>
                    </div>
                    <div>
                      <div className="detalle-cotizacion-page__passenger-count">{cotizacion.pasajeros.ninos}</div>
                      <div className="detalle-cotizacion-page__passenger-label">Niños (2-11 años)</div>
                    </div>
                  </div>
                  <div className="detalle-cotizacion-page__passenger-item">
                    <div className="detalle-cotizacion-page__passenger-icon">
                      <span className="material-symbols-outlined">crib</span>
                    </div>
                    <div>
                      <div className="detalle-cotizacion-page__passenger-count">{cotizacion.pasajeros.infantes}</div>
                      <div className="detalle-cotizacion-page__passenger-label">Infantes (0-2 años)</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Servicios Incluidos */}
            <div className="detalle-cotizacion-page__card-header">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-slate-700">public</span>
                <h2 className="detalle-cotizacion-page__card-title">Servicios Incluidos</h2>
              </div>
            </div>

            <div className="detalle-cotizacion-page__services">
              {servicios.map((servicio) => (
                <Card key={servicio.id} className="detalle-cotizacion-page__service-card">
                  <div className="detalle-cotizacion-page__service-image-container">
                    {servicio.imagen && (
                      <>
                        <Image
                          src={servicio.imagen}
                          alt={servicio.titulo}
                          fill
                          className="detalle-cotizacion-page__service-image"
                          unoptimized
                        />
                        <div className="detalle-cotizacion-page__service-image-overlay" />
                      </>
                    )}
                    <div className="detalle-cotizacion-page__service-icon">
                      <span className="material-symbols-outlined">{servicio.icono}</span>
                    </div>
                  </div>
                  <CardContent className="detalle-cotizacion-page__service-content">
                    <div className="detalle-cotizacion-page__service-header">
                      <h3 className="detalle-cotizacion-page__service-title">{servicio.titulo}</h3>
                      <span className="detalle-cotizacion-page__service-price">
                        ${servicio.precio.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                      </span>
                    </div>
                    <ul className="detalle-cotizacion-page__service-details">
                      {servicio.detalles.map((detalle, index) => (
                        <li key={index} className="detalle-cotizacion-page__service-detail">
                          <span className="material-symbols-outlined">check_circle</span>
                          <span>{detalle}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Notas y Observaciones */}
            <Card className="detalle-cotizacion-page__card">
              <div className="detalle-cotizacion-page__card-header">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-slate-700">description</span>
                  <h2 className="detalle-cotizacion-page__card-title">Notas y Observaciones</h2>
                </div>
              </div>
              <CardContent className="detalle-cotizacion-page__card-content">
                <div className="detalle-cotizacion-page__notes">
                  <div className="detalle-cotizacion-page__note-section">
                    <h4 className="detalle-cotizacion-page__note-title">Notas para el Cliente</h4>
                    <p className="detalle-cotizacion-page__note-text">{cotizacion.notas.cliente}</p>
                  </div>
                  <div className="detalle-cotizacion-page__note-section">
                    <h4 className="detalle-cotizacion-page__note-title">Términos y Condiciones</h4>
                    <p className="detalle-cotizacion-page__note-text">{cotizacion.notas.terminosCondiciones}</p>
                  </div>
                  <div className="detalle-cotizacion-page__note-section detalle-cotizacion-page__note-section--internal">
                    <h4 className="detalle-cotizacion-page__note-title">
                      <span className="material-symbols-outlined text-sm">lock</span>
                      Nota Interna (Solo visible para agentes)
                    </h4>
                    <p className="detalle-cotizacion-page__note-text">{cotizacion.notas.interna}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Columna Derecha - Resumen */}
          <div className="detalle-cotizacion-page__sidebar">
            <Card className="detalle-cotizacion-page__summary-card">
              <div className="detalle-cotizacion-page__card-header">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-slate-700">receipt_long</span>
                  <h2 className="detalle-cotizacion-page__card-title">Resumen de Costos</h2>
                </div>
              </div>
              <CardContent className="detalle-cotizacion-page__summary-content">
                <div className="detalle-cotizacion-page__summary-items">
                  {servicios.map((servicio) => (
                    <div key={servicio.id} className="detalle-cotizacion-page__summary-item">
                      <span className="detalle-cotizacion-page__summary-label">
                        <span className="material-symbols-outlined text-sm">{servicio.icono}</span>
                        {servicio.titulo}
                      </span>
                      <span className="detalle-cotizacion-page__summary-value">
                        ${servicio.precio.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="detalle-cotizacion-page__summary-divider" />

                <div className="detalle-cotizacion-page__summary-subtotal">
                  <span>Subtotal</span>
                  <span>${calcularSubtotal().toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
                </div>

                <div className="detalle-cotizacion-page__summary-item">
                  <span className="detalle-cotizacion-page__summary-label">Impuestos y Tasas (18%)</span>
                  <span className="detalle-cotizacion-page__summary-value">
                    ${calcularImpuestos().toLocaleString('en-US', { minimumFractionDigits: 2 })}
                  </span>
                </div>

                <div className="detalle-cotizacion-page__summary-divider" />

                <div className="detalle-cotizacion-page__summary-total">
                  <span>Total</span>
                  <span>${calcularTotal().toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
                </div>

                <div className="detalle-cotizacion-page__summary-note">
                  <span className="material-symbols-outlined">info</span>
                  <span>Precios en USD. Todos los impuestos incluidos.</span>
                </div>
              </CardContent>
            </Card>

            {/* Acciones Rápidas */}
            <Card className="detalle-cotizacion-page__card">
              <div className="detalle-cotizacion-page__card-header">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-slate-700">bolt</span>
                  <h2 className="detalle-cotizacion-page__card-title">Acciones Rápidas</h2>
                </div>
              </div>
              <CardContent className="detalle-cotizacion-page__quick-actions">
                <Button variant="outline" className="w-full justify-start">
                  <span className="material-symbols-outlined">edit</span>
                  Editar Cotización
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <span className="material-symbols-outlined">content_copy</span>
                  Duplicar Cotización
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <span className="material-symbols-outlined">send</span>
                  Enviar por Email
                </Button>
                <Button variant="outline" className="w-full justify-start text-red-600 hover:text-red-700">
                  <span className="material-symbols-outlined">delete</span>
                  Eliminar Cotización
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Modal de Compartir */}
      {showShareModal && (
        <div className="detalle-cotizacion-page__modal" onClick={() => setShowShareModal(false)}>
          <div className="detalle-cotizacion-page__modal-share" onClick={(e) => e.stopPropagation()}>
            <div className="detalle-cotizacion-page__modal-header">
              <h3>Compartir Cotización</h3>
              <button 
                className="detalle-cotizacion-page__modal-close"
                onClick={() => setShowShareModal(false)}
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
            <p className="detalle-cotizacion-page__modal-subtitle">
              Elige cómo deseas compartir esta cotización con tu cliente
            </p>
            
            <div className="detalle-cotizacion-page__share-options">
              <button 
                className="detalle-cotizacion-page__share-option"
                onClick={() => {
                  handleCompartirWhatsApp();
                  setShowShareModal(false);
                }}
              >
                <div className="detalle-cotizacion-page__share-icon detalle-cotizacion-page__share-icon--whatsapp">
                  <svg height="32" viewBox="0 -2 512.00001 512" width="32" xmlns="http://www.w3.org/2000/svg" fill="currentColor">
                    <path d="m255.996094 507.949219h-.101563c-39.945312-.015625-79.550781-9.445313-115.042969-27.335938l-109.40625 24.886719c-6.675781 1.515625-13.667968-.488281-18.527343-5.3125s-6.910157-11.800781-5.441407-18.488281l23.707032-107.757813c-20.367188-37.613281-31.121094-78.808594-31.17968775-119.65625-.00390625-.140625-.00390625-.28125-.00390625-.417968.0273438-67.691407 26.796875-131.441407 75.371094-179.503907 48.464844-47.953125 112.609375-74.363281 180.621094-74.363281 68.164062.0273438 132.207031 26.460938 180.351562 74.425781 48.8125 48.632813 75.679688 112.433594 75.65625 179.644531-.019531 50.792969-15.25 99.882813-44.042969 141.957032-6.238281 9.117187-18.683593 11.449218-27.800781 5.210937-9.113281-6.238281-11.449219-18.683593-5.210938-27.800781 24.222657-35.398438 37.035157-76.679688 37.054688-119.382812.019531-56.496094-22.667969-110.226563-63.886719-151.292969-40.597656-40.449219-94.625-62.738281-152.128906-62.761719-118.917969 0-215.734375 95.742188-215.984375 213.507812 0 .128907.003906.253907.003906.378907-.015625 36.453125 10.238282 73.414062 29.648438 106.886719 2.511718 4.332031 3.308594 9.445312 2.230468 14.332031l-18.566406 84.394531 85.839844-19.527344c4.738281-1.074218 9.707031-.390625 13.980469 1.925782 31.363281 17.027343 66.898437 26.035156 102.765625 26.050781h.089844c39.003906 0 77.308593-10.546875 110.769531-30.496094 9.484375-5.660156 21.761719-2.554687 27.417969 6.933594s2.554687 21.761719-6.933594 27.421875c-39.652344 23.640625-85.039063 36.140625-131.253906 36.140625zm-56.484375-355.730469c-4.386719-9.71875-9.003907-10.050781-13.175781-10.21875h-11.222657c-3.90625 0-10.25 1.460938-15.613281 7.300781-5.367188 5.839844-20.496094 19.957031-20.496094 48.671875s20.984375 56.464844 23.910156 60.363282c2.929688 3.890624 40.511719 64.699218 100.027344 88.09375 49.464844 19.441406 59.53125 15.574218 70.265625 14.597656 10.738281-.96875 34.648438-14.113282 39.523438-27.742188 4.882812-13.625 4.882812-25.304687 3.417969-27.746094-1.460938-2.429687-5.367188-3.890624-11.222657-6.808593-5.859375-2.917969-34.558593-17.28125-39.925781-19.226563-5.367188-1.945312-9.269531-2.917968-13.175781 2.925782-3.90625 5.835937-15.40625 19.332031-18.824219 23.222656-3.414062 3.902344-6.832031 4.386718-12.6875 1.46875-5.855469-2.929688-24.523438-9.199219-46.894531-29.078125-17.410157-15.472657-29.488281-35.199219-32.90625-41.042969-3.417969-5.835938-.367188-9 2.570312-11.910156 2.628907-2.613282 6.1875-6.1875 9.117188-9.59375 2.921875-3.40625 3.757812-5.839844 5.707031-9.734375 1.953125-3.894531.976562-7.300781-.484375-10.222657-1.464844-2.917968-12.707031-31.78125-17.914063-43.320312"/>
                  </svg>
                </div>
                <div className="detalle-cotizacion-page__share-text">
                  <h4>WhatsApp</h4>
                  <p>Enviar por WhatsApp</p>
                </div>
              </button>

              <button 
                className="detalle-cotizacion-page__share-option"
                onClick={() => {
                  handleCompartirEmail();
                  setShowShareModal(false);
                }}
              >
                <div className="detalle-cotizacion-page__share-icon detalle-cotizacion-page__share-icon--email">
                  <span className="material-symbols-outlined">mail</span>
                </div>
                <div className="detalle-cotizacion-page__share-text">
                  <h4>Email</h4>
                  <p>Enviar por correo electrónico</p>
                </div>
              </button>

              <button 
                className="detalle-cotizacion-page__share-option"
                onClick={() => {
                  handleCopiarEnlace();
                  setShowShareModal(false);
                }}
              >
                <div className="detalle-cotizacion-page__share-icon detalle-cotizacion-page__share-icon--link">
                  <span className="material-symbols-outlined">link</span>
                </div>
                <div className="detalle-cotizacion-page__share-text">
                  <h4>Copiar Enlace</h4>
                  <p>Copiar enlace público</p>
                </div>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal de Vista Previa/PDF */}
      <Dialog open={isPreviewOpen} onOpenChange={setIsPreviewOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Vista Previa de Cotización - {cotizacion.numero}</DialogTitle>
          </DialogHeader>
          <CotizacionPreview 
            cotizacion={cotizacion} 
            servicios={servicios}
            calcularSubtotal={calcularSubtotal}
            calcularImpuestos={calcularImpuestos}
            calcularTotal={calcularTotal}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}

// Componente de Vista Previa para PDF
function CotizacionPreview({ 
  cotizacion, 
  servicios,
  calcularSubtotal,
  calcularImpuestos,
  calcularTotal 
}: { 
  cotizacion: any; 
  servicios: any[];
  calcularSubtotal: () => number;
  calcularImpuestos: () => number;
  calcularTotal: () => number;
}) {
  return (
    <div className="bg-white p-8 space-y-6" id="cotizacion-pdf">
      {/* Header con Logo */}
      <div className="flex items-center justify-between border-b pb-4">
        <div className="flex items-center gap-3">
          <svg width="180" height="36" viewBox="0 0 472 93" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g clipPath="url(#clip0_267_2)">
              <path d="M0 35.9431C0 16.1295 16.1201 0 35.9221 0C55.7242 0 71.8442 16.1295 71.8442 35.9431C71.8442 55.7567 55.7242 71.8862 35.9221 71.8862H0V35.9431ZM13.9233 35.9431V57.9547H35.9221C48.0509 57.9547 57.9209 48.0789 57.9209 35.9431C57.9209 23.8073 48.0509 13.9314 35.9221 13.9314C23.7934 13.9314 13.9233 23.8073 13.9233 35.9431Z" fill="#FFA300"/>
              <path d="M13.9233 78.9756H0V92.9844H13.9233V78.9756Z" fill="#FFA300"/>
              <path d="M124.815 41.8911C124.815 34.2134 129.332 30.5293 136.015 30.5293C142.698 30.5293 147.169 34.2134 147.169 41.9531V42.2162H142.219V41.9066C142.219 37.1235 139.697 35.1731 136.015 35.1731C132.333 35.1731 129.812 37.1235 129.812 41.9066V57.2157H124.815V41.9066V41.8911Z" fill="#1B2340"/>
              <path d="M150.031 44.2131C150.031 36.3186 155.817 30.5293 164.016 30.5293C172.216 30.5293 178.002 36.3186 178.002 44.2131C178.002 52.1075 172.216 57.8968 164.016 57.8968C155.817 57.8968 150.031 52.1075 150.031 44.2131ZM172.974 44.2131C172.974 38.9501 169.4 35.1576 164.032 35.1576C158.664 35.1576 155.09 38.9501 155.09 44.2131C155.09 49.476 158.664 53.2685 164.032 53.2685C169.4 53.2685 172.974 49.476 172.974 44.2131Z" fill="#1B2340"/>
              <path d="M213.707 61.0547H215.13C216.925 65.745 221.38 67.7418 226.656 67.7418C233.71 67.7418 239.017 64.0577 239.017 55.1107V50.0644C236.866 55.0642 232.225 57.9124 226.393 57.9124C218.24 57.9124 212.454 52.1231 212.454 44.2287C212.454 36.3342 218.24 30.5449 226.439 30.5449C234.639 30.5449 240.378 36.2258 240.378 44.337V55.0178C240.378 65.0639 234.437 69.0111 226.594 69.0111C220.545 69.0111 215.656 66.5964 213.707 61.0702V61.0547ZM239.017 44.2132C239.017 37.1082 233.973 31.7988 226.439 31.7988C218.905 31.7988 213.877 37.1082 213.877 44.2132C213.877 51.3182 218.921 56.6276 226.439 56.6276C233.958 56.6276 239.017 51.3182 239.017 44.2132Z" fill="#1B2340"/>
              <path d="M244.973 44.2131C244.973 36.3186 250.759 30.5293 258.958 30.5293C267.157 30.5293 272.897 36.3186 272.897 44.2131V44.3214H246.396C246.442 51.38 251.439 56.643 258.958 56.643C264.264 56.643 268.364 54.0115 270.313 49.9095H271.783C269.787 54.7545 265.053 57.9123 258.958 57.9123C250.759 57.9123 244.973 52.123 244.973 44.2285V44.2131ZM271.489 43.0521C270.963 36.5198 266.074 31.7831 258.973 31.7831C251.872 31.7831 246.922 36.5198 246.411 43.0521H271.504H271.489Z" fill="#1B2340"/>
              <path d="M277.507 43.5784C277.507 35.0028 282.658 30.5293 290.332 30.5293C298.005 30.5293 303.157 35.0028 303.157 43.5784V57.2002H301.795V43.5784C301.795 36.0554 297.278 31.7831 290.332 31.7831C283.386 31.7831 278.868 36.04 278.868 43.5784V57.2002H277.507V43.5784Z" fill="#1B2340"/>
              <path d="M308.819 47.9434V22H310.18V31.2102H327.012V32.4176H310.18V47.9434C310.18 53.6862 313.491 56.6273 318.643 56.6273C323.794 56.6273 327.167 53.7791 327.167 47.9434V47.5255H328.435V47.9434C328.435 54.5221 324.49 57.8966 318.658 57.8966C312.826 57.8966 308.819 54.5221 308.819 47.9434Z" fill="#1B2340"/>
              <path d="M194.926 32.7579C201.238 32.7579 206.374 37.897 206.374 44.2126V55.6674H194.926C188.614 55.6674 183.478 50.5282 183.478 44.2126C183.478 37.897 188.614 32.7579 194.926 32.7579ZM194.926 31.21C187.748 31.21 181.931 37.0302 181.931 44.2126C181.931 51.395 187.748 57.2153 194.926 57.2153H207.921V44.2126C207.921 37.0302 202.104 31.21 194.926 31.21Z" fill="#1B2340"/>
              <path d="M99.3349 63.5158H94.6938V44.244C94.6938 37.0151 100.573 31.1484 107.782 31.1484C114.991 31.1484 120.87 37.0306 120.87 44.244C120.87 51.4574 114.991 57.3395 107.782 57.3395H99.3349V63.5158ZM99.3349 52.7112H107.782C112.438 52.7112 116.229 48.9187 116.229 44.2595C116.229 39.6002 112.438 35.8077 107.782 35.8077C103.125 35.8077 99.3349 39.6002 99.3349 44.2595V52.7112Z" fill="#1B2340"/>
              <path d="M351.351 21H350.535V69.9474H351.351V21Z" fill="#1B2340"/>
            </g>
            <defs>
              <clipPath id="clip0_267_2">
                <rect width="472" height="93" fill="white"/>
              </clipPath>
            </defs>
          </svg>
        </div>
        <div className="text-right text-sm text-slate-600 space-y-1">
          <p className="text-base font-semibold text-slate-900 mb-2">Proagent by Azúcar Travel</p>
          <p className="flex items-center justify-end gap-2">
            <span className="material-symbols-outlined text-base">mail</span>
            contacto@proagent.com
          </p>
          <p className="flex items-center justify-end gap-2">
            <span className="material-symbols-outlined text-base">phone</span>
            +1 (786) 554-3673
          </p>
          <p className="flex items-center justify-end gap-2">
            <span className="material-symbols-outlined text-base">location_on</span>
            Miami, Florida
          </p>
        </div>
      </div>

      {/* Número de Cotización y Fecha */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">{cotizacion.numero}</h2>
          <p className="text-sm text-slate-600">Fecha de emisión: {cotizacion.fechaCreacion}</p>
        </div>
      </div>

      {/* Imagen de Portada con Título */}
      {cotizacion.coverImage && (
        <div className="w-full rounded-lg overflow-hidden relative">
          <img 
            src={cotizacion.coverImage} 
            alt="Portada de cotización" 
            className="w-full h-64 object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent flex items-end">
            <h2 className="text-white text-3xl font-bold p-6 text-left">
              {cotizacion.titulo}
            </h2>
          </div>
        </div>
      )}

      {/* Información del Cliente y Viaje */}
      <div className="grid grid-cols-2 gap-6">
        <div className="space-y-2">
          <h3 className="font-semibold text-slate-900 text-lg">Información del Cliente</h3>
          <p className="text-sm"><strong>Nombre:</strong> {cotizacion.cliente.nombre}</p>
          <p className="text-sm"><strong>Email:</strong> {cotizacion.cliente.email}</p>
          <p className="text-sm"><strong>Teléfono:</strong> {cotizacion.cliente.telefono}</p>
          <p className="text-sm"><strong>Dirección:</strong> {cotizacion.cliente.direccion}</p>
          <p className="text-sm"><strong>Nacionalidad:</strong> {cotizacion.cliente.nacionalidad}</p>
        </div>
        <div className="space-y-2">
          <h3 className="font-semibold text-slate-900 text-lg">Detalles del Viaje</h3>
          <p className="text-sm"><strong>Fecha de Ida:</strong> {cotizacion.fechaViaje}</p>
          <p className="text-sm"><strong>Fecha de Vuelta:</strong> {cotizacion.fechaVuelta}</p>
          <p className="text-sm"><strong>Pasajeros:</strong> {cotizacion.pasajeros.adultos} adultos, {cotizacion.pasajeros.ninos} niños, {cotizacion.pasajeros.infantes} infantes</p>
          <p className="text-sm"><strong>Total Pasajeros:</strong> {cotizacion.pasajeros.total}</p>
        </div>
      </div>

      {/* Servicios Incluidos */}
      <div className="space-y-4">
        <h3 className="font-semibold text-slate-900 text-lg">Servicios Incluidos</h3>
        {servicios.map((servicio, index) => (
          <div key={servicio.id} className="border border-slate-200 rounded-lg p-4">
            <div className="flex justify-between items-start mb-3">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-slate-700">{servicio.icono}</span>
                <h4 className="font-semibold text-slate-900">{servicio.titulo}</h4>
              </div>
              <span className="font-bold text-slate-900">${servicio.precio.toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
            </div>
            <ul className="text-sm text-slate-600 space-y-1 ml-6">
              {servicio.detalles.map((detalle: string, idx: number) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="material-symbols-outlined text-xs text-green-600">check_circle</span>
                  {detalle}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Resumen de Costos */}
      <div className="border-t pt-4 space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-slate-600">Subtotal:</span>
          <span className="font-medium text-slate-900">${calcularSubtotal().toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-slate-600">Impuestos y Tasas (18%):</span>
          <span className="font-medium text-slate-900">${calcularImpuestos().toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
        </div>
        <div className="flex justify-between items-center border-t pt-2 mt-2">
          <h3 className="text-xl font-bold text-slate-900">Total</h3>
          <p className="text-3xl font-bold text-slate-900">${calcularTotal().toLocaleString('en-US', { minimumFractionDigits: 2 })}</p>
        </div>
      </div>

      {/* Notas */}
      {cotizacion.notas.cliente && (
        <div className="space-y-2">
          <h3 className="font-semibold text-slate-900">Notas</h3>
          <p className="text-sm text-slate-600">{cotizacion.notas.cliente}</p>
        </div>
      )}

      {/* Términos y Condiciones */}
      {cotizacion.notas.terminosCondiciones && (
        <div className="space-y-2">
          <h3 className="font-semibold text-slate-900">Términos y Condiciones</h3>
          <p className="text-sm text-slate-600">{cotizacion.notas.terminosCondiciones}</p>
        </div>
      )}

      {/* Footer */}
      <div className="border-t pt-4 mt-6 text-center text-xs text-slate-500">
        <p>Gracias por confiar en Proagent by Azúcar Travel</p>
        <p>Esta cotización es válida por 7 días a partir de la fecha de emisión</p>
      </div>
    </div>
  );
}
