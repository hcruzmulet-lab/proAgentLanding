'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import './DetalleDMCPage.scss';

interface DetalleDMCPageProps {
  dmcId: string;
}

export function DetalleDMCPage({ dmcId }: DetalleDMCPageProps) {
  const router = useRouter();

  // Mock data - en producción vendría de una API
  const dmcData = {
    nombre: 'Destination Dubai',
    destinos: 'Dubái, Abu Dhabi, Sharjah, Ras Al Khaimah, Fujairah, Ajman, Umm Al Quwain',
    isPreferred: true,
    imagenes: [
      'https://images.pexels.com/photos/1470502/pexels-photo-1470502.jpeg?auto=compress&cs=tinysrgb&w=1200&h=800&fit=crop',
      'https://images.pexels.com/photos/2044434/pexels-photo-2044434.jpeg?auto=compress&cs=tinysrgb&w=1200&h=800&fit=crop'
    ],
    ubicaciones: 'Dubái, Abu Dhabi, Sharjah, Ras Al Khaimah, Fujairah, Ajman, Umm Al Quwain',
    website: 'https://destination-dubai.com/',
    emailContacto: 'destinationdubai@kainyc.com',
    comision: '12%',
    presupuestoMinimo: 'Depende del tipo de servicio — enviar email para consultar',
    notas: [
      'Ofrece hoteles + tours',
      'Puede incluir logo de agencia (white-label) en itinerarios',
      'No proporciona desglose detallado de costos de servicios'
    ],
    software: 'No disponible aún, pero estamos trabajando en ello',
    instrucciones: [
      'Detalles del cliente (nombre, número de personas/habitaciones, edades si hay menores)',
      'Fechas del viaje',
      'Ubicaciones a visitar si hay varias en la región',
      'Presupuesto (la mayoría de DMC tienen un presupuesto mínimo, es importante ser claro sobre las expectativas presupuestarias del cliente)',
      'Intereses y preferencias (¿quieren hacer safaris por el desierto, clases de cocina, tours históricos?) o experiencias que hayan sido exitosas para los clientes en el pasado',
      'Siempre solicitar tarifa bruta con margen del 12%',
      'Clarificar que pueden aceptar pago directamente de clientes vía tarjeta de crédito o transferencia bancaria, con tarifas de tarjeta claramente indicadas'
    ],
    reviews: [
      {
        nombre: 'María González',
        isPro: true,
        recomienda: true,
        fecha: 'Enero 2026',
        comentario: 'Basándome en mi experiencia trabajando con Destination Dubai, recomendaría este partner. Tuve un cliente que solicitó un viaje de último minuto para eventos festivos (aviso de un mes). Me comuniqué con DD y me emparejaron con un planificador en Dubái inmediatamente. Mi contacto fue súper receptivo y rápido para proporcionar un itinerario alineado con la solicitud inicial. Cuando mi cliente tuvo problemas de vuelo llegando a Dubái (su vuelo se retrasó más de 12 horas, lo que significó que perdió la primera noche de su viaje), mi contacto de DD trabajó rápidamente (a pesar de la diferencia horaria) para hacer los arreglos necesarios y asegurar que el resto del viaje fuera perfecto.'
      },
      {
        nombre: 'Laura Martínez',
        isPro: false,
        recomienda: false,
        fecha: 'Enero 2026',
        comentario: 'He contactado para trabajar con DD en dos viajes de clientes hasta ahora y han fallado en ambos. Nunca llegué a ejecutar con ellos porque dejaron de comunicarse conmigo durante la fase de planificación después de semanas de trabajo duro en la planificación. Me dejaron en una situación difícil cerca de la fecha de salida de un viaje y tuve que pivotar rápidamente y encontrar otro DMC para ejecutar. Afortunadamente, otro agente me refirió a Aurora y ellos ejecutaron de manera hermosa.'
      }
    ]
  };

  return (
    <div className="detalle-dmc-page">
      {/* Botón volver */}
      <Button
        variant="ghost"
        onClick={() => router.back()}
        className="detalle-dmc-page__back-button"
      >
        <span className="material-symbols-outlined">arrow_back</span>
        Volver
      </Button>

      {/* Header */}
      <div className="detalle-dmc-page__header">
        <div>
          <h1 className="detalle-dmc-page__title">{dmcData.nombre}</h1>
          <p className="detalle-dmc-page__subtitle">{dmcData.destinos}</p>
        </div>
        {dmcData.isPreferred && (
          <div className="detalle-dmc-page__badge">
            Partner Preferido
          </div>
        )}
      </div>

      {/* Imágenes */}
      <div className="detalle-dmc-page__images">
        {dmcData.imagenes.map((img, index) => (
          <div key={index} className="detalle-dmc-page__image-container">
            <img src={img} alt={`${dmcData.nombre} ${index + 1}`} />
          </div>
        ))}
      </div>

      {/* About */}
      <Card className="detalle-dmc-page__section">
        <CardContent className="pt-6">
          <h2 className="detalle-dmc-page__section-title">Acerca de</h2>
          
          <div className="detalle-dmc-page__about-item">
            <span className="material-symbols-outlined">location_on</span>
            <span>{dmcData.ubicaciones}</span>
          </div>

          <div className="detalle-dmc-page__about-item">
            <span className="material-symbols-outlined">language</span>
            <a href={dmcData.website} target="_blank" rel="noopener noreferrer" className="detalle-dmc-page__link">
              {dmcData.website}
            </a>
          </div>

          <div className="detalle-dmc-page__about-item">
            <span className="material-symbols-outlined">business_center</span>
            <span>Partner Preferido DMC Fora</span>
          </div>
        </CardContent>
      </Card>

      {/* Instrucciones de reserva */}
      <Card className="detalle-dmc-page__section">
        <CardContent className="pt-6">
          <h2 className="detalle-dmc-page__section-title">Instrucciones de Reserva</h2>
          <p className="detalle-dmc-page__instructions-intro">
            Preséntate como asesor de Fora en tu email a{' '}
            <a href={`mailto:${dmcData.emailContacto}`} className="detalle-dmc-page__link">
              {dmcData.emailContacto}
            </a>
            {' '}e incluye la siguiente información:
          </p>
          <ul className="detalle-dmc-page__list">
            {dmcData.instrucciones.map((instruccion, index) => (
              <li key={index}>{instruccion}</li>
            ))}
          </ul>
        </CardContent>
      </Card>

      {/* Notas */}
      <Card className="detalle-dmc-page__section">
        <CardContent className="pt-6">
          <h2 className="detalle-dmc-page__section-title">Notas</h2>
          
          <div className="detalle-dmc-page__note-item">
            <strong>Comisión:</strong> {dmcData.comision}
          </div>

          <div className="detalle-dmc-page__note-item">
            <strong>Presupuesto mínimo esperado:</strong> {dmcData.presupuestoMinimo}
          </div>

          <div className="detalle-dmc-page__checks">
            {dmcData.notas.map((nota, index) => (
              <div key={index} className="detalle-dmc-page__check-item">
                <span className="material-symbols-outlined">check_circle</span>
                <span>{nota}</span>
              </div>
            ))}
          </div>

          <div className="detalle-dmc-page__note-item">
            <strong>Software de creación de itinerarios:</strong> {dmcData.software}
          </div>
        </CardContent>
      </Card>

      {/* Reviews */}
      <Card className="detalle-dmc-page__section">
        <CardContent className="pt-6">
          <div className="detalle-dmc-page__reviews-header">
            <h2 className="detalle-dmc-page__section-title">Reseñas de asesores</h2>
            <div className="detalle-dmc-page__reviews-stats">
              <span className="material-symbols-outlined">thumb_up</span>
              <span>{dmcData.reviews.filter(r => r.recomienda).length}/{dmcData.reviews.length} recomiendan trabajar con este partner</span>
            </div>
          </div>

          <div className="detalle-dmc-page__reviews-list">
            {dmcData.reviews.map((review, index) => (
              <div key={index} className="detalle-dmc-page__review-card">
                <div className="detalle-dmc-page__review-header">
                  <div className="detalle-dmc-page__review-avatar">
                    {review.nombre.charAt(0)}
                  </div>
                  <div className="detalle-dmc-page__review-info">
                    <div className="detalle-dmc-page__review-name">
                      {review.nombre}
                      {review.isPro && (
                        <span className="detalle-dmc-page__review-badge">Pro</span>
                      )}
                    </div>
                    {review.recomienda ? (
                      <div className="detalle-dmc-page__review-recommend detalle-dmc-page__review-recommend--yes">
                        <span className="material-symbols-outlined">thumb_up</span>
                        <span>Recomienda</span>
                      </div>
                    ) : (
                      <div className="detalle-dmc-page__review-recommend detalle-dmc-page__review-recommend--no">
                        <span className="material-symbols-outlined">thumb_down</span>
                        <span>No recomienda</span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="detalle-dmc-page__review-meta">
                  <span className="material-symbols-outlined">groups</span>
                  <span>Trabajó con este partner</span>
                </div>

                <div className="detalle-dmc-page__review-date">
                  Enviado {review.fecha}
                </div>

                <p className="detalle-dmc-page__review-text">{review.comentario}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
