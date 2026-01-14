'use client';

import React from 'react';
import './PromptsPage.scss';

export function PromptsPage() {
  return (
    <div className="prompts-page">
      <div className="prompts-page__header">
        <h1 className="prompts-page__title">Prompts IA</h1>
        <p className="prompts-page__subtitle">
          Gestiona tus prompts de IA para mejorar tus consultas
        </p>
      </div>

      <div className="prompts-page__content">
        <div className="prompts-page__empty-state">
          <span className="material-symbols-outlined prompts-page__empty-icon">
            chat
          </span>
          <h2 className="prompts-page__empty-title">No hay prompts guardados aún</h2>
          <p className="prompts-page__empty-description">
            Crea y guarda prompts para usarlos con la IA
          </p>
        </div>
      </div>
    </div>
  );
}
