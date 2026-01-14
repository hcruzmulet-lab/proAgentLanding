'use client';

import React from 'react';
import './ExpedientesPage.scss';

export function ExpedientesPage() {
  return (
    <div className="expedientes-page">
      <div className="expedientes-page__header">
        <h1 className="expedientes-page__title">Expedientes</h1>
        <p className="expedientes-page__subtitle">
          Gestiona todos los expedientes de viaje de tus clientes
        </p>
      </div>

      <div className="expedientes-page__content">
        <div className="expedientes-page__empty-state">
          <span className="material-symbols-outlined expedientes-page__empty-icon">
            folder
          </span>
          <h2 className="expedientes-page__empty-title">No hay expedientes aún</h2>
          <p className="expedientes-page__empty-description">
            Crea expedientes para organizar toda la información de los viajes
          </p>
        </div>
      </div>
    </div>
  );
}
