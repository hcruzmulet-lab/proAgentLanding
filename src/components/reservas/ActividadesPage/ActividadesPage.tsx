'use client';

import React from 'react';
import './ActividadesPage.scss';

export function ActividadesPage() {
  return (
    <div className="actividades-page">
      <div className="actividades-page__iframe-container">
        <iframe
          src="https://azucartravel.com/?tripType=ONLY_TICKET"
          className="actividades-page__iframe"
          title="Actividades"
          allow="fullscreen"
        />
      </div>
    </div>
  );
}
