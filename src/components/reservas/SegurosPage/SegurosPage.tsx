'use client';

import React from 'react';
import './SegurosPage.scss';

export function SegurosPage() {
  return (
    <div className="seguros-page">
      <div className="seguros-page__iframe-container">
        <iframe
          src="https://azucartravel.com/home?tripType=ONLY_INSURANCE"
          className="seguros-page__iframe"
          title="Seguros"
          allow="fullscreen"
        />
      </div>
    </div>
  );
}
