'use client';

import React from 'react';
import './DocumentosMiCuentaPage.scss';

export function DocumentosMiCuentaPage() {
  return (
    <div className="documentos-mi-cuenta-page">
      <div className="documentos-mi-cuenta-page__header">
        <h1 className="documentos-mi-cuenta-page__title">Documentos del agente</h1>
        <p className="documentos-mi-cuenta-page__subtitle">
          Gestiona tus documentos personales y certificaciones
        </p>
      </div>

      <div className="documentos-mi-cuenta-page__content">
        <div className="documentos-mi-cuenta-page__empty-state">
          <span className="material-symbols-outlined documentos-mi-cuenta-page__empty-icon">
            folder_open
          </span>
          <h2 className="documentos-mi-cuenta-page__empty-title">Mis documentos</h2>
          <p className="documentos-mi-cuenta-page__empty-description">
            Aquí aparecerán tus documentos personales
          </p>
        </div>
      </div>
    </div>
  );
}
