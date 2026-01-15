'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import './ItinerariosIAPage.scss';

export function ItinerariosIAPage() {
  const router = useRouter();

  return (
    <div className="itinerarios-ia-page">
      <div className="itinerarios-ia-page__header">
        <h1 className="itinerarios-ia-page__title">Itinerarios IA</h1>
        <p className="itinerarios-ia-page__subtitle">
          Crea itinerarios personalizados con inteligencia artificial
        </p>
      </div>

      <div className="itinerarios-ia-page__cards">
        {/* Itinerario con Motor */}
        <button 
          className="itinerarios-ia-page__card"
          onClick={() => window.open('https://azucartravel.com/?tripType=TRIP_PLANNER', '_blank', 'noopener,noreferrer')}
        >
          <span className="material-symbols-outlined itinerarios-ia-page__card-icon" style={{ fontVariationSettings: "'FILL' 0, 'wght' 200, 'GRAD' 0, 'opsz' 48" }}>
            travel_explore
          </span>
          <div className="itinerarios-ia-page__card-content">
            <h3 className="itinerarios-ia-page__card-title">Itinerario con Motor</h3>
            <p className="itinerarios-ia-page__card-description">
              Crear itinerario con nuestro motor de búsqueda
            </p>
          </div>
        </button>

        {/* Itinerario Manual */}
        <button 
          className="itinerarios-ia-page__card"
          onClick={() => router.push('/es/crm/itinerarios-ia/nuevo-manual')}
        >
          <span className="material-symbols-outlined itinerarios-ia-page__card-icon" style={{ fontVariationSettings: "'FILL' 0, 'wght' 200, 'GRAD' 0, 'opsz' 48" }}>
            edit_note
          </span>
          <div className="itinerarios-ia-page__card-content">
            <h3 className="itinerarios-ia-page__card-title">Itinerario Manual</h3>
            <p className="itinerarios-ia-page__card-description">
              Crear un itinerario de forma manual
            </p>
          </div>
        </button>
      </div>
    </div>
  );
}
