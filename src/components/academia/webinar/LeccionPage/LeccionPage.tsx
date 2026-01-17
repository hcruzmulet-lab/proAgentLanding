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

const leccionesData: Record<string, Record<string, LeccionData>> = {
  '1': {
    '1-1': {
      id: '1-1',
      cursoId: '1',
      cursoTitulo: 'Webinar: Tendencias del Turismo 2024',
      numero: '1.1',
      titulo: 'Tendencias del Turismo 2024',
      tipo: 'video',
      duracion: 60,
      descripcion: 'Conoce las tendencias más importantes del turismo para este año y cómo aprovecharlas.',
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
          <h2>Webinar no encontrado</h2>
          <Button onClick={() => router.push('/academia/webinar')}>
            Volver a Webinars
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
          onClick={() => router.push('/academia/webinar')}
        >
          <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 0, 'wght' 200, 'GRAD' 0, 'opsz' 20" }}>
            close
          </span>
        </button>
        <div className="leccion-page__header-info">
          <span className="leccion-page__header-categoria">Webinars</span>
          <h1 className="leccion-page__header-titulo">{leccion.cursoTitulo}</h1>
        </div>
      </div>

      <div className="leccion-page__content">
        <div className="leccion-page__main">
          <div className="leccion-page__meta">
            <span className="leccion-page__leccion-numero">Webinar {leccion.numero}</span>
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
              onClick={() => alert('Webinar marcado como completado')}
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
              <h3 className="leccion-page__recursos-titulo">Recursos del webinar</h3>
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
