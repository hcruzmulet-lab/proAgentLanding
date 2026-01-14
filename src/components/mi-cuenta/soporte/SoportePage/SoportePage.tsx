'use client';

import React from 'react';
import './SoportePage.scss';

export function SoportePage() {
  return (
    <div className="soporte-page">
      <div className="soporte-page__header">
        <h1 className="soporte-page__title">Soporte (Tickets)</h1>
        <p className="soporte-page__subtitle">
          Obtén ayuda y soporte técnico
        </p>
      </div>

      <div className="soporte-page__content">
        <div className="soporte-page__empty-state">
          <span className="material-symbols-outlined soporte-page__empty-icon">
            task
          </span>
          <h2 className="soporte-page__empty-title">Centro de soporte</h2>
          <p className="soporte-page__empty-description">
            Contacta con nuestro equipo de soporte
          </p>
        </div>
      </div>
    </div>
  );
}
