'use client';

import React from 'react';
import './MarketingPage.scss';

export function MarketingPage() {
  return (
    <div className="marketing-page">
      <div className="marketing-page__header">
        <h1 className="marketing-page__title">Marketing & Ventas</h1>
        <p className="marketing-page__subtitle">
          Aprende estrategias de marketing para promocionar tus servicios
        </p>
      </div>

      <div className="marketing-page__content">
        <div className="marketing-page__empty-state">
          <span className="material-symbols-outlined marketing-page__empty-icon">
            ads_click
          </span>
          <h2 className="marketing-page__empty-title">Cursos de marketing</h2>
          <p className="marketing-page__empty-description">
            Domina el marketing digital para agentes de viajes
          </p>
        </div>
      </div>
    </div>
  );
}
