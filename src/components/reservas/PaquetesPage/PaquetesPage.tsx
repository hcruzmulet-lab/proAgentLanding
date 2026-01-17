'use client';

import React from 'react';
import './PaquetesPage.scss';

export function PaquetesPage() {
  return (
    <div className="paquetes-page">
      <div className="paquetes-page__iframe-container">
        <iframe
          src="https://azucartravel.com/?tripType=HOLIDAYS"
          className="paquetes-page__iframe"
          title="Paquetes"
          allow="fullscreen"
        />
      </div>
    </div>
  );
}
