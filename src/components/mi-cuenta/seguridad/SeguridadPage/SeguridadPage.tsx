'use client';

import React from 'react';
import './SeguridadPage.scss';

export function SeguridadPage() {
  return (
    <div className="seguridad-page">
      <div className="seguridad-page__header">
        <h1 className="seguridad-page__title">Seguridad</h1>
        <p className="seguridad-page__subtitle">
          Gestiona la seguridad de tu cuenta y contraseña
        </p>
      </div>

      <div className="seguridad-page__content">
        <div className="seguridad-page__empty-state">
          <span className="material-symbols-outlined seguridad-page__empty-icon">
            lock
          </span>
          <h2 className="seguridad-page__empty-title">Configuración de seguridad</h2>
          <p className="seguridad-page__empty-description">
            Administra tu contraseña y opciones de seguridad
          </p>
        </div>
      </div>
    </div>
  );
}
