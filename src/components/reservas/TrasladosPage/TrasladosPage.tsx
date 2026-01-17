'use client';

import React from 'react';
import './TrasladosPage.scss';

export function TrasladosPage() {
  return (
    <div className="traslados-page">
      <div className="traslados-page__iframe-container">
        <iframe
          src="https://azucartravel.com/?tripType=ONLY_TRANSFER"
          className="traslados-page__iframe"
          title="Traslados"
          allow="fullscreen"
        />
      </div>
    </div>
  );
}
