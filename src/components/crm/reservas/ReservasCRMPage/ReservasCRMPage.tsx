'use client';

import React from 'react';
import './ReservasCRMPage.scss';

export function ReservasCRMPage() {
  return (
    <div className="reservas-crm-page">
      <div className="reservas-crm-page__header">
        <h1 className="reservas-crm-page__title">Reservas</h1>
        <p className="reservas-crm-page__subtitle">
          Gestiona todas las reservas confirmadas de tus clientes
        </p>
      </div>

      <div className="reservas-crm-page__content">
        <div className="reservas-crm-page__empty-state">
          <span className="material-symbols-outlined reservas-crm-page__empty-icon">
            airplane_ticket
          </span>
          <h2 className="reservas-crm-page__empty-title">No hay reservas aún</h2>
          <p className="reservas-crm-page__empty-description">
            Las reservas confirmadas aparecerán aquí
          </p>
        </div>
      </div>
    </div>
  );
}
