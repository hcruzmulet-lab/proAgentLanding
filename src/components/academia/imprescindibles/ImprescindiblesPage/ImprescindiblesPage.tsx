'use client';

import React from 'react';
import './ImprescindiblesPage.scss';

export function ImprescindiblesPage() {
  return (
    <div className="imprescindibles-page">
      <div className="imprescindibles-page__header">
        <h1 className="imprescindibles-page__title">Imprescindibles</h1>
        <p className="imprescindibles-page__subtitle">
          Cursos esenciales para comenzar tu carrera como agente de viajes
        </p>
      </div>

      <div className="imprescindibles-page__content">
        <div className="imprescindibles-page__empty-state">
          <span className="material-symbols-outlined imprescindibles-page__empty-icon">
            assignment_turned_in
          </span>
          <h2 className="imprescindibles-page__empty-title">Cursos imprescindibles</h2>
          <p className="imprescindibles-page__empty-description">
            Descubre los cursos fundamentales para tu formación
          </p>
        </div>
      </div>
    </div>
  );
}
