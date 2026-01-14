'use client';

import React from 'react';
import './EstadoPage.scss';

export function EstadoPage() {
  return (
    <div className="estado-page">
      <div className="estado-page__header">
        <h1 className="estado-page__title">Estado de Suscripción</h1>
        <p className="estado-page__subtitle">
          Consulta el estado de tu cuenta y suscripción
        </p>
      </div>

      <div className="estado-page__content">
        <div className="estado-page__empty-state">
          <span className="material-symbols-outlined estado-page__empty-icon">
            ads_click
          </span>
          <h2 className="estado-page__empty-title">Estado de cuenta</h2>
          <p className="estado-page__empty-description">
            Información sobre tu estado actual
          </p>
        </div>
      </div>
    </div>
  );
}
