'use client';

import React from 'react';
import './GaleriaPage.scss';

export function GaleriaPage() {
  return (
    <div className="galeria-page">
      <div className="galeria-page__header">
        <h1 className="galeria-page__title">Galería de imágenes</h1>
        <p className="galeria-page__subtitle">
          Gestiona todas tus imágenes y recursos visuales
        </p>
      </div>

      <div className="galeria-page__content">
        <div className="galeria-page__empty-state">
          <span className="material-symbols-outlined galeria-page__empty-icon">
            imagesmode
          </span>
          <h2 className="galeria-page__empty-title">No hay imágenes aún</h2>
          <p className="galeria-page__empty-description">
            Sube imágenes para crear tu galería
          </p>
        </div>
      </div>
    </div>
  );
}
