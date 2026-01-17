'use client';

import React from 'react';
import './CrucerosPage.scss';

export function CrucerosPage() {
  return (
    <div className="cruceros-page">
      <div className="cruceros-page__iframe-container">
        <iframe
          src="https://azucartravel.com/?tripType=TRIP_PLANNER"
          className="cruceros-page__iframe"
          title="Cruceros"
          allow="fullscreen"
        />
      </div>
    </div>
  );
}
