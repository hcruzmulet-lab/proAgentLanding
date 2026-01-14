'use client';

import React from 'react';
import './PerfilPage.scss';

export function PerfilPage() {
  return (
    <div className="perfil-page">
      <div className="perfil-page__header">
        <h1 className="perfil-page__title">Perfil público</h1>
        <p className="perfil-page__subtitle">
          Gestiona tu información personal y preferencias
        </p>
      </div>

      <div className="perfil-page__content">
        <div className="perfil-page__empty-state">
          <span className="material-symbols-outlined perfil-page__empty-icon">
            account_circle
          </span>
          <h2 className="perfil-page__empty-title">Configuración de perfil</h2>
          <p className="perfil-page__empty-description">
            Aquí podrás editar tu información personal
          </p>
        </div>
      </div>
    </div>
  );
}
