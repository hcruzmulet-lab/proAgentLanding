'use client';

import React from 'react';
import './ItinerariosIAPage.scss';

export function ItinerariosIAPage() {
  return (
    <div className="itinerarios-ia-page">
      <div className="itinerarios-ia-page__header">
        <h1 className="itinerarios-ia-page__title">Itinerarios IA</h1>
        <p className="itinerarios-ia-page__subtitle">
          Crea itinerarios personalizados con inteligencia artificial
        </p>
      </div>

      <div className="itinerarios-ia-page__content">
        <div className="itinerarios-ia-page__empty-state">
          <span className="material-symbols-outlined itinerarios-ia-page__empty-icon">
            wand_shine
          </span>
          <h2 className="itinerarios-ia-page__empty-title">No hay itinerarios aún</h2>
          <p className="itinerarios-ia-page__empty-description">
            Usa la IA para crear itinerarios personalizados en segundos
          </p>
        </div>
      </div>
    </div>
  );
}
