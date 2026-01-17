'use client';

import React from 'react';
import './ExpediaPage.scss';

export function ExpediaPage() {
  return (
    <div className="expedia-page">
      <div className="expedia-page__iframe-container">
        <iframe
          src="https://www.expediataap.com/"
          className="expedia-page__iframe"
          title="Expedia TAAP"
          allow="fullscreen"
        />
      </div>
    </div>
  );
}
