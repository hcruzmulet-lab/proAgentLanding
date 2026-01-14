'use client';

import React from 'react';
import './ComisionesPage.scss';

export function ComisionesPage() {
  return (
    <div className="comisiones-page">
      <div className="comisiones-page__header">
        <h1 className="comisiones-page__title">Comisiones</h1>
        <p className="comisiones-page__subtitle">
          Gestiona y realiza seguimiento de todas tus comisiones
        </p>
      </div>

      <div className="comisiones-page__content">
        <div className="comisiones-page__empty-state">
          <span className="material-symbols-outlined comisiones-page__empty-icon">
            finance_chip
          </span>
          <h2 className="comisiones-page__empty-title">No hay comisiones registradas aún</h2>
          <p className="comisiones-page__empty-description">
            Las comisiones generadas aparecerán aquí
          </p>
        </div>
      </div>
    </div>
  );
}
