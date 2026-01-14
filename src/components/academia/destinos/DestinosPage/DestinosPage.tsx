'use client';

import React from 'react';
import './DestinosPage.scss';

export function DestinosPage() {
  return (
    <div className="destinos-page">
      <div className="destinos-page__header">
        <h1 className="destinos-page__title">Destinos & Experiencias</h1>
        <p className="destinos-page__subtitle">
          Aprende sobre los destinos más populares del mundo
        </p>
      </div>

      <div className="destinos-page__content">
        <div className="destinos-page__empty-state">
          <span className="material-symbols-outlined destinos-page__empty-icon">
            south_america
          </span>
          <h2 className="destinos-page__empty-title">Cursos de destinos</h2>
          <p className="destinos-page__empty-description">
            Descubre los destinos que ofrecerás a tus clientes
          </p>
        </div>
      </div>
    </div>
  );
}
