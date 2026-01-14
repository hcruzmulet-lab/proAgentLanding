'use client';

import React from 'react';
import './PerfilMiCuentaPage.scss';

export function PerfilMiCuentaPage() {
  return (
    <div className="perfil-mi-cuenta-page">
      <div className="perfil-mi-cuenta-page__header">
        <h1 className="perfil-mi-cuenta-page__title">Perfil del agente</h1>
        <p className="perfil-mi-cuenta-page__subtitle">
          Gestiona tu información personal y configuración de cuenta
        </p>
      </div>

      <div className="perfil-mi-cuenta-page__content">
        <div className="perfil-mi-cuenta-page__empty-state">
          <span className="material-symbols-outlined perfil-mi-cuenta-page__empty-icon">
            badge
          </span>
          <h2 className="perfil-mi-cuenta-page__empty-title">Mi Perfil</h2>
          <p className="perfil-mi-cuenta-page__empty-description">
            Aquí podrás editar tu información personal
          </p>
        </div>
      </div>
    </div>
  );
}
