'use client';

import React from 'react';
import './VueloHotelPage.scss';

export function VueloHotelPage() {
  return (
    <div className="vuelo-hotel-page">
      <div className="vuelo-hotel-page__iframe-container">
        <iframe
          src="https://azucartravel.com/?tripType=FLIGHT_HOTEL"
          className="vuelo-hotel-page__iframe"
          title="Reservas"
          allow="fullscreen"
        />
      </div>
    </div>
  );
}
