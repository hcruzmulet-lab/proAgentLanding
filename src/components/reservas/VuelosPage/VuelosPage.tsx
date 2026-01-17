'use client';

import React from 'react';
import './VuelosPage.scss';

export function VuelosPage() {
  return (
    <div className="vuelos-page">
      <div className="vuelos-page__iframe-container">
        <iframe
          src="https://azucartravel.com/?tripType=ONLY_FLIGHT"
          className="vuelos-page__iframe"
          title="Vuelos"
          allow="fullscreen"
        />
      </div>
    </div>
  );
}
