'use client';

import React from 'react';
import './ProveedoresAcademiaPage.scss';

export function ProveedoresAcademiaPage() {
  return (
    <div className="proveedores-academia-page">
      <div className="proveedores-academia-page__header">
        <h1 className="proveedores-academia-page__title">Proveedores</h1>
        <p className="proveedores-academia-page__subtitle">
          Aprende sobre los principales proveedores de la industria
        </p>
      </div>

      <div className="proveedores-academia-page__content">
        <div className="proveedores-academia-page__empty-state">
          <span className="material-symbols-outlined proveedores-academia-page__empty-icon">
            storefront
          </span>
          <h2 className="proveedores-academia-page__empty-title">Cursos de proveedores</h2>
          <p className="proveedores-academia-page__empty-description">
            Conoce los proveedores con los que trabajarás
          </p>
        </div>
      </div>
    </div>
  );
}
