'use client';

import React from 'react';
import './CertificadoPage.scss';

export function CertificadoPage() {
  return (
    <div className="certificado-page">
      <div className="certificado-page__header">
        <h1 className="certificado-page__title">Certificación Azúcar Travel</h1>
        <p className="certificado-page__subtitle">
          Consulta y descarga tus certificaciones
        </p>
      </div>

      <div className="certificado-page__content">
        <div className="certificado-page__empty-state">
          <span className="material-symbols-outlined certificado-page__empty-icon">
            developer_guide
          </span>
          <h2 className="certificado-page__empty-title">Mis certificados</h2>
          <p className="certificado-page__empty-description">
            Aquí aparecerán tus certificados obtenidos
          </p>
        </div>
      </div>
    </div>
  );
}
