'use client';

import React from 'react';
import './OperacionPage.scss';

export function OperacionPage() {
  return (
    <div className="operacion-page">
      <div className="operacion-page__header">
        <h1 className="operacion-page__title">Operación & Soporte</h1>
        <p className="operacion-page__subtitle">
          Aprende a gestionar las operaciones diarias de tu negocio
        </p>
      </div>

      <div className="operacion-page__content">
        <div className="operacion-page__empty-state">
          <span className="material-symbols-outlined operacion-page__empty-icon">
            support_agent
          </span>
          <h2 className="operacion-page__empty-title">Cursos de operación</h2>
          <p className="operacion-page__empty-description">
            Optimiza tus procesos operativos
          </p>
        </div>
      </div>
    </div>
  );
}
