'use client';

import React from 'react';
import './SportsEventsPage.scss';

export function SportsEventsPage() {
  return (
    <div className="sports-events-page">
      <div className="sports-events-page__iframe-container">
        <iframe
          src="https://azucartravel.com/?tripType=ONLY_TICKET"
          className="sports-events-page__iframe"
          title="Sports & Events"
          allow="fullscreen"
        />
      </div>
    </div>
  );
}
