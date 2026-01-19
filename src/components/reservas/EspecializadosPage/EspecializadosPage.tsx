'use client';

import React from 'react';
import { useRouter, useParams } from 'next/navigation';
import Image from 'next/image';
import './EspecializadosPage.scss';

const destinos = [
  {
    id: 'dubai',
    nombre: 'DMC Dubái',
    imageUrl: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800&h=600&fit=crop',
    descripcion: 'Expertos locales en Dubái y Emiratos Árabes Unidos. Experiencias premium, desierto, ciudad, lujo y viajes a medida para clientes exigentes.',
  },
  {
    id: 'egipto',
    nombre: 'DMC Egipto',
    imageUrl: 'https://images.unsplash.com/photo-1572252009286-268acec5ca0a?w=800&h=600&fit=crop',
    descripcion: 'Especialistas en Egipto clásico y moderno. Circuitos culturales, cruceros por el Nilo y experiencias históricas diseñadas para grupos y FITs.',
  },
  {
    id: 'japon',
    nombre: 'DMC Japón',
    imageUrl: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=800&h=600&fit=crop',
    descripcion: 'Conocimiento local profundo de Japón. Itinerarios culturales, tecnología, tradición y experiencias auténticas adaptadas al viajero internacional.',
  },
  {
    id: 'europa',
    nombre: 'DMC Europa',
    imageUrl: 'https://images.pexels.com/photos/338515/pexels-photo-338515.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
    descripcion: 'Operadores especializados en Europa. Circuitos, viajes a medida, experiencias culturales y rutas personalizadas en múltiples países.',
  },
  {
    id: 'republica-dominicana',
    nombre: 'DMC República Dominicana',
    imageUrl: 'https://images.pexels.com/photos/457882/pexels-photo-457882.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
    descripcion: 'Especialistas en el Caribe dominicano. Grupos, incentivos, experiencias locales y servicios completos en Punta Cana y todo el país.',
  },
  {
    id: 'mexico',
    nombre: 'DMC México',
    imageUrl: 'https://images.unsplash.com/photo-1518638150340-f706e86654de?w=800&h=600&fit=crop',
    descripcion: 'Expertos en destinos mexicanos. Cultura, playa, arqueología y experiencias locales con soporte profesional para agencias de viajes.',
  },
  {
    id: 'tailandia',
    nombre: 'DMC Tailandia',
    imageUrl: 'https://images.unsplash.com/photo-1528181304800-259b08848526?w=800&h=600&fit=crop',
    descripcion: 'Especialistas en el sudeste asiático. Tailandia auténtica, circuitos culturales, playas y experiencias exóticas bien operadas.',
  },
  {
    id: 'africa',
    nombre: 'DMC África',
    imageUrl: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?w=800&h=600&fit=crop',
    descripcion: 'Operadores especializados en África. Safaris, naturaleza, lujo y experiencias únicas diseñadas con conocimiento local.',
  },
  {
    id: 'estados-unidos',
    nombre: 'DMC Estados Unidos',
    imageUrl: 'https://images.unsplash.com/photo-1485738422979-f5c462d49f74?w=800&h=600&fit=crop',
    descripcion: 'Especialistas en destinos de Estados Unidos. City breaks, parques temáticos, road trips, eventos y experiencias a medida para todo tipo de viajeros.',
  },
  {
    id: 'colombia',
    nombre: 'DMC Colombia',
    imageUrl: 'https://images.unsplash.com/photo-1568632234157-ce7aecd03d0d?w=800&h=600&fit=crop',
    descripcion: 'Expertos locales en Colombia. Cultura, naturaleza, ciudades vibrantes y experiencias auténticas diseñadas con conocimiento del destino.',
  },
  {
    id: 'ecuador',
    nombre: 'DMC Ecuador',
    imageUrl: 'https://images.pexels.com/photos/30785381/pexels-photo-30785381.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
    descripcion: 'Especialistas en Ecuador. Galápagos, Amazonía, Andes y experiencias únicas operadas con profundo conocimiento local.',
  },
  {
    id: 'peru',
    nombre: 'DMC Perú',
    imageUrl: 'https://images.pexels.com/photos/2356045/pexels-photo-2356045.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
    descripcion: 'Expertos en destinos peruanos. Machu Picchu, Cusco, Lima, Amazonía y experiencias culturales con conocimiento profundo del país.',
  },
];

export function EspecializadosPage() {
  const router = useRouter();
  const params = useParams();
  const locale = params?.locale || 'es';

  return (
    <div className="especializados-page">
      <div>
        <h1 style={{ fontSize: '1.125rem', fontWeight: 600, color: '#0f172a', letterSpacing: '-0.1px', margin: 0, lineHeight: '1.5' }}>
          Especializados & DMC's
        </h1>
      </div>

      <div className="especializados-page__grid">
        {destinos.map((destino) => (
          <div 
            key={destino.id} 
            className="especializados-page__card"
            onClick={() => router.push(`/${locale}/reservas/especializados/${destino.id}`)}
          >
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
