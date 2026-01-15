'use client';

import React, { useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Image from 'next/image';
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

const leccionesData: Record<string, Record<string, LeccionData>> = {
  '1': {
    '1-1': {
      id: '1-1',
      cursoId: '1',
      cursoTitulo: 'Bienvenida a ProAgent',
      numero: '1.1',
      titulo: 'La Historia de ProAgent',
      tipo: 'video',
      duracion: 8,
      descripcion: 'En esta lección, el cofundador de ProAgent comparte la historia de la fundación de la plataforma y su misión de transformar la industria de los asesores de viajes.',
      videoUrl: 'https://example.com/video',
      recursos: [
        {
          id: '1',
          titulo: 'Una Mejor Ecuación en Viajes',
          url: '#',
          tipo: 'enlace',
        },
        {
          id: '2',
          titulo: 'ProAgent a los 3 años: Un Negocio Serio de Viajes',
          url: '#',
          tipo: 'enlace',
        },
      ],
    },
    '1-2': {
      id: '1-2',
      cursoId: '1',
      cursoTitulo: 'Bienvenida a ProAgent',
      numero: '1.2',
      titulo: 'Tu Viaje como Asesor ProAgent',
      tipo: 'video',
      duracion: 4,
      descripcion: 'Descubre cómo ProAgent puede ayudarte a construir un negocio exitoso como asesor de viajes y las oportunidades que tienes disponibles.',
      videoUrl: 'https://example.com/video',
      recursos: [
        {
          id: '1',
          titulo: 'Guía de Inicio Rápido',
          url: '#',
          tipo: 'documento',
        },
      ],
    },
  },
  '2': {
    '2-1': {
      id: '2-1',
      cursoId: '2',
      cursoTitulo: 'Orientación e Industria del Turismo',
      numero: '2.1',
      titulo: 'Introducción a la Industria del Turismo',
      tipo: 'video',
      duracion: 5,
      descripcion: 'Aprende los fundamentos de la industria del turismo, su estructura y cómo funciona el ecosistema de viajes a nivel global.',
      videoUrl: 'https://example.com/video',
      recursos: [
        {
          id: '1',
          titulo: 'Estadísticas del Turismo Global 2024',
          url: '#',
          tipo: 'documento',
        },
      ],
    },
    '2-2': {
      id: '2-2',
      cursoId: '2',
      cursoTitulo: 'Orientación e Industria del Turismo',
      numero: '2.2',
      titulo: 'Tipos de Agentes de Viajes',
      tipo: 'video',
      duracion: 4,
      descripcion: 'Conoce los diferentes tipos de agentes de viajes y sus especialidades dentro de la industria.',
      videoUrl: 'https://example.com/video',
      recursos: [],
    },
  },
  '3': {
    '3-1': {
      id: '3-1',
      cursoId: '3',
      cursoTitulo: 'Primeros Pasos en ProAgent',
      numero: '3.1',
      titulo: 'Configuración de tu Perfil',
      tipo: 'video',
      duracion: 4,
      descripcion: 'Aprende a configurar tu perfil profesional en ProAgent para comenzar a trabajar con clientes.',
      videoUrl: 'https://example.com/video',
      recursos: [],
    },
  },
  '4': {
    '4-1': {
      id: '4-1',
      cursoId: '4',
      cursoTitulo: 'Comunicación Efectiva con Clientes',
      numero: '4.1',
      titulo: 'Técnicas de Consultoría de Viajes',
      tipo: 'video',
      duracion: 6,
      descripcion: 'Domina las técnicas esenciales de consultoría para entender las necesidades de tus clientes y ofrecerles las mejores opciones de viaje.',
      videoUrl: 'https://example.com/video',
      recursos: [
        {
          id: '1',
          titulo: 'Guía de Preguntas para Consultoría',
          url: '#',
          tipo: 'documento',
        },
      ],
    },
  },
  '5': {
    '5-1': {
      id: '5-1',
      cursoId: '5',
      cursoTitulo: 'Gestión de Reservas y Operaciones',
      numero: '5.1',
      titulo: 'Proceso de Reserva Completo',
      tipo: 'video',
      duracion: 5,
      descripcion: 'Aprende el proceso completo de reserva desde la cotización hasta la confirmación final.',
      videoUrl: 'https://example.com/video',
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
          <Button onClick={() => router.push('/academia/imprescindibles')}>
            Volver a Imprescindibles
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
          onClick={() => router.push('/academia/imprescindibles')}
        >
          <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 0, 'wght' 200, 'GRAD' 0, 'opsz' 20" }}>
            close
          </span>
        </button>
        <div className="leccion-page__header-info">
          <span className="leccion-page__header-categoria">Imprescindibles</span>
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
        </div>

        <div className="leccion-page__sidebar">
          <Card className="leccion-page__recursos-card">
            <CardContent className="p-4">
              <h3 className="leccion-page__recursos-titulo">Recursos de la lección</h3>
              <div className="leccion-page__recursos-list">
                {leccion.recursos.map((recurso) => (
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
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

