'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import './DestinationsGallery.scss';

const destinations = [
  {
    id: 'new-york',
    name: 'Nueva York',
    imageUrl: 'https://res.cloudinary.com/ddagvoaq2/image/upload/v1768505585/statue-liberty-new-york-city-skyline-usa_cpvvas.jpg',
  },
  {
    id: 'san-francisco',
    name: 'San Francisco',
    imageUrl: 'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=800&h=600&fit=crop',
  },
  {
    id: 'buenos-aires',
    name: 'Buenos Aires',
    imageUrl: 'https://images.unsplash.com/photo-1531572753322-ad063cecc140?w=800&h=600&fit=crop',
  },
  {
    id: 'bora-bora',
    name: 'Bora Bora',
    imageUrl: 'https://res.cloudinary.com/ddagvoaq2/image/upload/v1768505585/tropical-beach-hut-with-turquoise-water_ee68h4.jpg',
  },
  {
    id: 'cancun',
    name: 'Cancún',
    imageUrl: 'https://res.cloudinary.com/ddagvoaq2/image/upload/v1768505584/damien-chaudet-SjCHKiGVWH4-unsplash_ui00en.jpg',
  },
  {
    id: 'paris',
    name: 'París',
    imageUrl: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800&h=600&fit=crop',
  },
  {
    id: 'tokyo',
    name: 'Tokio',
    imageUrl: 'https://images.unsplash.com/photo-1492571350019-22de08371fd3?w=800&h=600&fit=crop',
  },
  {
    id: 'london',
    name: 'Londres',
    imageUrl: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=800&h=600&fit=crop',
  },
  {
    id: 'rome',
    name: 'Roma',
    imageUrl: 'https://images.unsplash.com/photo-1515542622106-78bda8ba0e5b?w=800&h=600&fit=crop',
  },
  {
    id: 'dubai',
    name: 'Dubái',
    imageUrl: 'https://res.cloudinary.com/ddagvoaq2/image/upload/v1768505749/1971_ylvqpx.jpg',
  },
];

export function DestinationsGallery() {
  const [offset, setOffset] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setOffset((prevOffset) => {
        // Movemos una imagen (20% del ancho visible, que es 10% del contenedor total)
        const newOffset = prevOffset - 10;
        // Si llegamos al final del primer set (100%), reiniciamos sin transición
        // Esto ocurre cuando hemos mostrado todas las 10 imágenes del primer set
        if (Math.abs(newOffset) >= 100) {
          // Reiniciamos sin transición para crear el efecto infinito
          requestAnimationFrame(() => {
            if (containerRef.current) {
              containerRef.current.style.transition = 'none';
              containerRef.current.style.transform = 'translateX(0%)';
              // Forzar reflow
              void containerRef.current.offsetWidth;
              // Restaurar transición en el siguiente frame
              requestAnimationFrame(() => {
                if (containerRef.current) {
                  containerRef.current.style.transition = 'transform 1s cubic-bezier(0.4, 0, 0.2, 1)';
                }
              });
            }
          });
          return 0;
        }
        return newOffset;
      });
    }, 3000); // Cambia cada 3 segundos

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  // Duplicar las imágenes para el efecto infinito (2 copias son suficientes)
  const duplicatedDestinations = [...destinations, ...destinations];

  return (
    <section className="destinations-gallery">
      <div 
        ref={containerRef}
        className="destinations-gallery__container"
        style={{
          transform: `translateX(${offset}%)`,
          transition: 'transform 1s cubic-bezier(0.4, 0, 0.2, 1)',
        }}
      >
        {duplicatedDestinations.map((destination, index) => (
          <div
            key={`${destination.id}-${index}`}
            className="destinations-gallery__item"
          >
            <Image
              src={destination.imageUrl}
              alt={destination.name}
              fill
              className="destinations-gallery__image"
              sizes="(max-width: 768px) 100vw, 10vw"
              unoptimized
            />
          </div>
        ))}
      </div>
    </section>
  );
}

