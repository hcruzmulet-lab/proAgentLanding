'use client';

import React from 'react';
import Link from 'next/link';
import { reservasMenuItems } from '@/config/menus';
import './ReservasPage.scss';

export function ReservasPage() {
  // Filter out dividers and the current "Reservas" item
  const menuItems = reservasMenuItems.filter(
    (item) => !item.isDivider && item.id !== 'reservas'
  );

  const renderCard = (item: typeof menuItems[0]) => {
    const cardContent = (
      <>
        <span className="material-symbols-outlined reservas-page__card-icon">
          {item.icon}
        </span>
        <h3 className="reservas-page__card-title">{item.label}</h3>
      </>
    );

    // If item has a link, make it clickable
    if (item.href) {
      if (item.isExternal) {
        return (
          <a
            key={item.id}
            href={item.href}
            target="_blank"
            rel="noopener noreferrer"
            className="reservas-page__card reservas-page__card--link"
          >
            {cardContent}
          </a>
        );
      } else {
        return (
          <Link
            key={item.id}
            href={item.href}
            className="reservas-page__card reservas-page__card--link"
          >
            {cardContent}
          </Link>
        );
      }
    }

    // If no link, just render the card without link
    return (
      <div key={item.id} className="reservas-page__card">
        {cardContent}
      </div>
    );
  };

  return (
    <div className="reservas-page">
      <div className="reservas-page__header">
        <h1 className="reservas-page__title">Reservas</h1>
        <p className="reservas-page__subtitle">
          Gestiona todas tus reservas de vuelos, hoteles, traslados y más en un solo lugar.
        </p>
      </div>

      <div className="reservas-page__grid">
        {menuItems.map((item) => renderCard(item))}
      </div>
    </div>
  );
}
