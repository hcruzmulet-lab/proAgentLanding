'use client';

import React from 'react';
import './PagosPage.scss';

export function PagosPage() {
  return (
    <div className="pagos-page">
      <div className="pagos-page__header">
        <h1 className="pagos-page__title">Pagos</h1>
        <p className="pagos-page__subtitle">
          Gestiona todos los pagos recibidos de tus clientes
        </p>
      </div>

      <div className="pagos-page__content">
        <div className="pagos-page__empty-state">
          <span className="material-symbols-outlined pagos-page__empty-icon">
            credit_card
          </span>
          <h2 className="pagos-page__empty-title">No hay pagos registrados aún</h2>
          <p className="pagos-page__empty-description">
            Los pagos recibidos aparecerán aquí
          </p>
        </div>
      </div>
    </div>
  );
}
