'use client';

import React from 'react';
import './AutosPage.scss';

export function AutosPage() {
  return (
    <div className="autos-page">
      <div className="autos-page__iframe-container">
        <iframe
          src="https://azucartravel.com/?tripType=ONLY_CAR"
          className="autos-page__iframe"
          title="Autos"
          allow="fullscreen"
        />
      </div>
    </div>
  );
}
