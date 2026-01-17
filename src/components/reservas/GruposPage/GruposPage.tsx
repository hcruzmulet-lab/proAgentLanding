'use client';

import React from 'react';
import './GruposPage.scss';

export function GruposPage() {
  return (
    <div className="grupos-page">
      <div className="grupos-page__iframe-container">
        <iframe
          src="https://taap.hotelplanner.com/Group-Rate/?kw=taap_group_button&ol=1&locale=es_MX"
          className="grupos-page__iframe"
          title="Grupos"
          allow="fullscreen"
        />
      </div>
    </div>
  );
}
