'use client';

import React from 'react';
import { useRouter, useParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import './LeccionPage.scss';

interface Recurso {
  id: string;
  titulo: string;
  url: string;
  tipo: 'enlace' | 'documento';
}

interface LeccionData {
  id: string;
  cursoId: string;
  cursoTitulo: string;
  numero: string;
  titulo: string;
  tipo: 'video' | 'lectura' | 'quiz';
  duracion: number;
  descripcion: string;
  videoUrl?: string;
  contenido?: string;
  recursos: Recurso[];
}

// Datos mock - en producción vendrían de una API
const leccionesData: Record<string, Record<string, LeccionData>> = {
  '1': {
    '1-1': {
      id: '1-1',
      cursoId: '1',
      cursoTitulo: 'Principales Proveedores de Vuelos',
      numero: '1.1',
      titulo: 'Sistemas de Reservas Globales (GDS)',
      tipo: 'video',
      duracion: 6,
      descripcion: 'Aprende sobre los principales sistemas de reservas globales utilizados en la industria de viajes, incluyendo Amadeus, Sabre y Travelport.',
      videoUrl: 'https://example.com/video',
      recursos: [
        {
          id: '1',
          titulo: 'Guía de Sistemas GDS',
          url: '#',
          tipo: 'documento',
        },
      ],
    },
    '1-2': {
      id: '1-2',
      cursoId: '1',
      cursoTitulo: 'Principales Proveedores de Vuelos',
      numero: '1.2',
      titulo: 'Aerolíneas Principales y sus Políticas',
      tipo: 'video',
      duracion: 5,
      descripcion: 'Conoce las principales aerolíneas del mundo y sus políticas de reserva, cancelación y modificación.',
      videoUrl: 'https://example.com/video',
      recursos: [],
    },
    '1-3': {
      id: '1-3',
      cursoId: '1',
      cursoTitulo: 'Principales Proveedores de Vuelos',
      numero: '1.3',
      titulo: 'Códigos de Clase y Tarifas',
      tipo: 'lectura',
      duracion: 4,
      descripcion: 'Aprende a interpretar los códigos de clase de vuelo y entender las diferentes tarifas disponibles.',
      videoUrl: undefined,
      contenido: 'Contenido de lectura sobre códigos de clase y tarifas...',
      recursos: [
        {
          id: '1',
          titulo: 'Tabla de Códigos de Clase',
          url: '#',
          tipo: 'documento',
        },
      ],
    },
    '1-4': {
      id: '1-4',
      cursoId: '1',
      cursoTitulo: 'Principales Proveedores de Vuelos',
      numero: '1.4',
      titulo: 'Evaluación: Proveedores de Vuelos',
      tipo: 'quiz',
      duracion: 3,
      descripcion: 'Evalúa tus conocimientos sobre proveedores de vuelos con este cuestionario.',
      videoUrl: undefined,
      contenido: 'Preguntas de evaluación...',
      recursos: [],
    },
  },
  '2': {
    '2-1': {
      id: '2-1',
      cursoId: '2',
      cursoTitulo: 'Hoteles y Alojamientos',
      numero: '2.1',
      titulo: 'Cadenas Hoteleras Internacionales',
      tipo: 'video',
      duracion: 5,
      descripcion: 'Conoce las principales cadenas hoteleras internacionales y sus características distintivas.',
      videoUrl: 'https://example.com/video',
      recursos: [],
    },
    '2-2': {
      id: '2-2',
      cursoId: '2',
      cursoTitulo: 'Hoteles y Alojamientos',
      numero: '2.2',
      titulo: 'Sistemas de Reservas Hoteleras',
      tipo: 'video',
      duracion: 4,
      descripcion: 'Aprende a utilizar los sistemas de reservas hoteleras más comunes en la industria.',
      videoUrl: 'https://example.com/video',
      recursos: [],
    },
    '2-3': {
      id: '2-3',
      cursoId: '2',
      cursoTitulo: 'Hoteles y Alojamientos',
      numero: '2.3',
      titulo: 'Tipos de Habitaciones y Tarifas',
      tipo: 'lectura',
      duracion: 4,
      descripcion: 'Descubre los diferentes tipos de habitaciones y cómo entender las tarifas hoteleras.',
      videoUrl: undefined,
      contenido: 'Contenido sobre tipos de habitaciones...',
      recursos: [],
    },
    '2-4': {
      id: '2-4',
      cursoId: '2',
      cursoTitulo: 'Hoteles y Alojamientos',
      numero: '2.4',
      titulo: 'Políticas de Cancelación y Modificación',
      tipo: 'video',
      duracion: 5,
      descripcion: 'Aprende sobre las políticas de cancelación y modificación de reservas hoteleras.',
      videoUrl: 'https://example.com/video',
      recursos: [],
    },
    '2-5': {
      id: '2-5',
      cursoId: '2',
      cursoTitulo: 'Hoteles y Alojamientos',
      numero: '2.5',
      titulo: 'Evaluación: Hoteles y Alojamientos',
      tipo: 'quiz',
      duracion: 4,
      descripcion: 'Evalúa tus conocimientos sobre hoteles y alojamientos.',
      videoUrl: undefined,
      contenido: 'Preguntas de evaluación...',
      recursos: [],
    },
  },
  '3': {
    '3-1': {
      id: '3-1',
      cursoId: '3',
      cursoTitulo: 'Proveedores de Cruceros',
      numero: '3.1',
      titulo: 'Principales Líneas de Cruceros',
      tipo: 'video',
      duracion: 6,
      descripcion: 'Conoce las principales líneas de cruceros del mundo y sus características.',
      videoUrl: 'https://example.com/video',
      recursos: [],
    },
    '3-2': {
      id: '3-2',
      cursoId: '3',
      cursoTitulo: 'Proveedores de Cruceros',
      numero: '3.2',
      titulo: 'Tipos de Cabinas y Servicios',
      tipo: 'video',
      duracion: 5,
      descripcion: 'Aprende sobre los diferentes tipos de cabinas y servicios disponibles en cruceros.',
      videoUrl: 'https://example.com/video',
      recursos: [],
    },
    '3-3': {
      id: '3-3',
      cursoId: '3',
      cursoTitulo: 'Proveedores de Cruceros',
      numero: '3.3',
      titulo: 'Rutas y Destinos de Cruceros',
      tipo: 'lectura',
      duracion: 4,
      descripcion: 'Descubre las rutas y destinos más populares para cruceros.',
      videoUrl: undefined,
      contenido: 'Contenido sobre rutas y destinos...',
      recursos: [],
    },
  },
  '4': {
    '4-1': {
      id: '4-1',
      cursoId: '4',
      cursoTitulo: 'Proveedores de Tours y Actividades',
      numero: '4.1',
      titulo: 'Operadores de Tours Principales',
      tipo: 'video',
      duracion: 5,
      descripcion: 'Conoce los principales operadores de tours y cómo trabajar con ellos.',
      videoUrl: 'https://example.com/video',
      recursos: [],
    },
    '4-2': {
      id: '4-2',
      cursoId: '4',
      cursoTitulo: 'Proveedores de Tours y Actividades',
      numero: '4.2',
      titulo: 'Actividades y Excursiones',
      tipo: 'video',
      duracion: 5,
      descripcion: 'Aprende sobre las diferentes actividades y excursiones que puedes ofrecer a tus clientes.',
      videoUrl: 'https://example.com/video',
      recursos: [],
    },
    '4-3': {
      id: '4-3',
      cursoId: '4',
      cursoTitulo: 'Proveedores de Tours y Actividades',
      numero: '4.3',
      titulo: 'Gestión de Reservas de Tours',
      tipo: 'lectura',
      duracion: 5,
      descripcion: 'Aprende a gestionar eficientemente las reservas de tours y actividades.',
      videoUrl: undefined,
      contenido: 'Contenido sobre gestión de reservas...',
      recursos: [],
    },
    '4-4': {
      id: '4-4',
      cursoId: '4',
      cursoTitulo: 'Proveedores de Tours y Actividades',
      numero: '4.4',
      titulo: 'Evaluación: Tours y Actividades',
      tipo: 'quiz',
      duracion: 5,
      descripcion: 'Evalúa tus conocimientos sobre tours y actividades.',
      videoUrl: undefined,
      contenido: 'Preguntas de evaluación...',
      recursos: [],
    },
  },
};

export function LeccionPage() {
  const router = useRouter();
  const params = useParams();
  const cursoId = params?.cursoId as string;
  const leccionId = params?.leccionId as string;

  const leccion = leccionesData[cursoId]?.[leccionId];

  if (!leccion) {
    return (
      <div className="leccion-page">
        <div className="leccion-page__error">
          <h2>Lección no encontrada</h2>
          <Button onClick={() => router.push('/academia/proveedores')}>
            Volver a Proveedores
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="leccion-page">
      <div className="leccion-page__header">
        <button
          className="leccion-page__close-button"
          onClick={() => router.push('/academia/proveedores')}
        >
          <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 0, 'wght' 200, 'GRAD' 0, 'opsz' 20" }}>
            close
          </span>
        </button>
        <div className="leccion-page__header-info">
          <span className="leccion-page__header-categoria">Proveedores</span>
          <h1 className="leccion-page__header-titulo">{leccion.cursoTitulo}</h1>
        </div>
      </div>

      <div className="leccion-page__content">
        <div className="leccion-page__main">
          <div className="leccion-page__meta">
            <span className="leccion-page__leccion-numero">Lección {leccion.numero}</span>
            <h2 className="leccion-page__leccion-titulo">{leccion.titulo}</h2>
          </div>

          <div className="leccion-page__video-container">
            <div className="leccion-page__video-player">
              <div className="leccion-page__video-placeholder">
                <button className="leccion-page__play-button">
                  <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 0, 'wght' 200, 'GRAD' 0, 'opsz' 20" }}>
                    play_circle
                  </span>
                </button>
                <div className="leccion-page__video-brand">PROAGENT</div>
              </div>
            </div>
          </div>

          <div className="leccion-page__descripcion">
            <p>{leccion.descripcion}</p>
          </div>

          <div className="leccion-page__actions">
            <Button 
              className="bg-green-600 hover:bg-green-700 text-white"
              onClick={() => {
                alert('Lección marcada como completada');
              }}
            >
              <span className="material-symbols-outlined mr-2" style={{ fontVariationSettings: "'FILL' 0, 'wght' 200, 'GRAD' 0, 'opsz' 20" }}>
                check_circle
              </span>
              Completado
            </Button>
          </div>
        </div>

        <div className="leccion-page__sidebar">
          <Card className="leccion-page__recursos-card">
            <CardContent className="p-4">
              <h3 className="leccion-page__recursos-titulo">Recursos de la lección</h3>
              <div className="leccion-page__recursos-list">
                {leccion.recursos.length > 0 ? (
                  leccion.recursos.map((recurso) => (
                    <a
                      key={recurso.id}
                      href={recurso.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="leccion-page__recurso-item"
                    >
                      <span className="leccion-page__recurso-texto">{recurso.titulo}</span>
                      <span className="material-symbols-outlined leccion-page__recurso-icon" style={{ fontVariationSettings: "'FILL' 0, 'wght' 200, 'GRAD' 0, 'opsz' 20" }}>
                        open_in_new
                      </span>
                    </a>
                  ))
                ) : (
                  <p className="leccion-page__recurso-texto" style={{ color: '#94a3b8', fontSize: '0.875rem' }}>No hay recursos disponibles</p>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
