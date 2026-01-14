'use client';

import React from 'react';
import './CotizacionesPage.scss';

export function CotizacionesPage() {
  return (
    <div className="cotizaciones-page">
      <div className="cotizaciones-page__header">
        <h1 className="cotizaciones-page__title">Cotizaciones</h1>
        <p className="cotizaciones-page__subtitle">
          Gestiona todas las cotizaciones de tus clientes
        </p>
      </div>

      <div className="cotizaciones-page__content">
        <div className="cotizaciones-page__empty-state">
          <span className="material-symbols-outlined cotizaciones-page__empty-icon">
            docs
          </span>
          <h2 className="cotizaciones-page__empty-title">No hay cotizaciones aún</h2>
          <p className="cotizaciones-page__empty-description">
            Comienza a crear cotizaciones para tus clientes
          </p>
        </div>
      </div>
    </div>
  );
}
