'use client';

import React from 'react';
import './WebinarPage.scss';

export function WebinarPage() {
  return (
    <div className="webinar-page">
      <div className="webinar-page__header">
        <h1 className="webinar-page__title">Webinars</h1>
        <p className="webinar-page__subtitle">
          Participa en webinars en vivo con expertos de la industria
        </p>
      </div>

      <div className="webinar-page__content">
        <div className="webinar-page__empty-state">
          <span className="material-symbols-outlined webinar-page__empty-icon">
            nest_cam_iq
          </span>
          <h2 className="webinar-page__empty-title">Próximos webinars</h2>
          <p className="webinar-page__empty-description">
            No hay webinars programados en este momento
          </p>
        </div>
      </div>
    </div>
  );
}
