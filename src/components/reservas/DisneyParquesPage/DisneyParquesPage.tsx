'use client';

import React from 'react';
import './DisneyParquesPage.scss';

export function DisneyParquesPage() {
  return (
    <div className="disney-parques-page">
      <div className="disney-parques-page__iframe-container">
        <iframe
          src="https://azucartravel.com/?tripType=ONLY_TICKET"
          className="disney-parques-page__iframe"
          title="Disney & Parques"
          allow="fullscreen"
        />
      </div>
    </div>
  );
}
