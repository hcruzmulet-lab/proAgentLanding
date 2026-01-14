'use client';

import React from 'react';
import './PreferenciasPage.scss';

export function PreferenciasPage() {
  return (
    <div className="preferencias-page">
      <div className="preferencias-page__header">
        <h1 className="preferencias-page__title">Preferencias plataforma</h1>
        <p className="preferencias-page__subtitle">
          Configura tus preferencias y ajustes de la plataforma
        </p>
      </div>

      <div className="preferencias-page__content">
        <div className="preferencias-page__empty-state">
          <span className="material-symbols-outlined preferencias-page__empty-icon">
            tune
          </span>
          <h2 className="preferencias-page__empty-title">Configuración de preferencias</h2>
          <p className="preferencias-page__empty-description">
            Personaliza tu experiencia en la plataforma
          </p>
        </div>
      </div>
    </div>
  );
}
