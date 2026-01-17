'use client';

import React from 'react';
import './HotelesPage.scss';

export function HotelesPage() {
  return (
    <div className="hoteles-page">
      <div className="hoteles-page__iframe-container">
        <iframe
          src="https://azucartravel.com/?tripType=ONLY_HOTEL"
          className="hoteles-page__iframe"
          title="Hoteles"
          allow="fullscreen"
        />
      </div>
    </div>
  );
}
