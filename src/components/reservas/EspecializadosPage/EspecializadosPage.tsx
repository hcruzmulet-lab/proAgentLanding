'use client';

import React from 'react';
import Image from 'next/image';
import './EspecializadosPage.scss';

const destinos = [
  {
    id: 'africa',
    nombre: 'África',
    imageUrl: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?w=800&h=600&fit=crop',
    descripcion: 'Safaris exclusivos en Kenya y Tanzania, avistamiento de gorilas en Uganda y Rwanda, playas paradisíacas en Zanzíbar y Seychelles.',
  },
  {
    id: 'medio-oriente',
    nombre: 'Medio Oriente',
    imageUrl: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800&h=600&fit=crop',
    descripcion: 'Lujo y modernidad en Dubai y Abu Dhabi, aventuras en el desierto de Arabia, exploración cultural en Jordania con Petra y Wadi Rum.',
  },
  {
    id: 'egipto',
    nombre: 'Egipto',
    imageUrl: 'https://images.unsplash.com/photo-1572252009286-268acec5ca0a?w=800&h=600&fit=crop',
    descripcion: 'Cruceros por el Nilo, visitas a las Pirámides de Giza y la Esfinge, exploración de templos milenarios en Luxor y Karnak.',
  },
  {
    id: 'japon',
    nombre: 'Japón',
    imageUrl: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=800&h=600&fit=crop',
    descripcion: 'Experiencias culturales en Kioto, tecnología y modernidad en Tokio, vistas al Monte Fuji, tradiciones ancestrales y gastronomía única.',
  },
  {
    id: 'europa',
    nombre: 'Europa',
    imageUrl: 'https://images.unsplash.com/photo-1467269204594-9661b134dd2b?w=800&h=600&fit=crop',
    descripcion: 'Tours por ciudades históricas, museos de arte mundialmente reconocidos, castillos medievales, gastronomía mediterránea y alpina.',
  },
  {
    id: 'estados-unidos',
    nombre: 'Estados Unidos',
    imageUrl: 'https://images.unsplash.com/photo-1485738422979-f5c462d49f74?w=800&h=600&fit=crop',
    descripcion: 'Icónicas ciudades como Nueva York, San Francisco y Miami, parques nacionales del oeste americano, experiencias en Las Vegas y la cultura sureña.',
  },
];

export function EspecializadosPage() {
  return (
    <div className="especializados-page">
      <div className="especializados-page__header">
        <h1 className="especializados-page__title">Destinos Especializados</h1>
        <p className="especializados-page__subtitle">
          Descubre experiencias únicas en los destinos más fascinantes del mundo
        </p>
      </div>

      <div className="especializados-page__grid">
        {destinos.map((destino) => (
          <div key={destino.id} className="especializados-page__card">
            <div className="especializados-page__image-container">
              <Image
                src={destino.imageUrl}
                alt={destino.nombre}
                fill
                className="especializados-page__image"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                unoptimized
              />
              <div className="especializados-page__overlay" />
            </div>
            <div className="especializados-page__content">
              <h3 className="especializados-page__card-title">{destino.nombre}</h3>
              <p className="especializados-page__card-description">{destino.descripcion}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
