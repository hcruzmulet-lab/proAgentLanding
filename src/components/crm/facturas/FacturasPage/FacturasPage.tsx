'use client';

import React from 'react';
import './FacturasPage.scss';

export function FacturasPage() {
  return (
    <div className="facturas-page">
      <div className="facturas-page__header">
        <h1 className="facturas-page__title">Facturas</h1>
        <p className="facturas-page__subtitle">
          Gestiona todas las facturas emitidas a tus clientes
        </p>
      </div>

      <div className="facturas-page__content">
        <div className="facturas-page__empty-state">
          <span className="material-symbols-outlined facturas-page__empty-icon">
            receipt
          </span>
          <h2 className="facturas-page__empty-title">No hay facturas aún</h2>
          <p className="facturas-page__empty-description">
            Las facturas que emitas aparecerán aquí
          </p>
        </div>
      </div>
    </div>
  );
}
