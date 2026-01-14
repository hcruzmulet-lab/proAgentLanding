'use client';

import React from 'react';
import './MaterialesPage.scss';

export function MaterialesPage() {
  return (
    <div className="materiales-page">
      <div className="materiales-page__header">
        <h1 className="materiales-page__title">Materiales del agente</h1>
        <p className="materiales-page__subtitle">
          Accede a todos tus materiales y documentos de trabajo
        </p>
      </div>

      <div className="materiales-page__content">
        <div className="materiales-page__empty-state">
          <span className="material-symbols-outlined materiales-page__empty-icon">
            folder_copy
          </span>
          <h2 className="materiales-page__empty-title">No hay materiales aún</h2>
          <p className="materiales-page__empty-description">
            Los materiales que subas aparecerán aquí
          </p>
        </div>
      </div>
    </div>
  );
}
