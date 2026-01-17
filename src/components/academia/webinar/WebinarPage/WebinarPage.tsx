'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import Image from 'next/image';
import './WebinarPage.scss';

interface Leccion {
  id: string;
  numero: string;
  titulo: string;
  tipo: 'video' | 'lectura' | 'quiz';
  duracion: number;
  completada: boolean;
}

interface Curso {
  id: string;
  titulo: string;
  descripcion: string;
  totalLecciones: number;
  duracionTotal: number;
  progreso: number;
  imagen: string;
  lecciones: Leccion[];
  expandido: boolean;
}

const cursosMock: Curso[] = [
  {
    id: '1',
    titulo: 'Webinar: Tendencias del Turismo 2024',
    descripcion: 'Conoce las tendencias más importantes del turismo para este año',
    totalLecciones: 1,
    duracionTotal: 60,
    progreso: 0,
    imagen: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=400&fit=crop',
    expandido: false,
    lecciones: [
      {
        id: '1-1',
        numero: '1.1',
        titulo: 'Tendencias del Turismo 2024',
        tipo: 'video',
        duracion: 60,
        completada: false,
      },
    ],
  },
  {
    id: '2',
    titulo: 'Webinar: Nuevos Destinos Emergentes',
    descripcion: 'Descubre los destinos que están ganando popularidad',
    totalLecciones: 1,
    duracionTotal: 45,
    progreso: 0,
    imagen: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800&h=400&fit=crop',
    expandido: false,
    lecciones: [
      {
        id: '2-1',
        numero: '2.1',
        titulo: 'Nuevos Destinos Emergentes',
        tipo: 'video',
        duracion: 45,
        completada: false,
      },
    ],
  },
  {
    id: '3',
    titulo: 'Webinar: Estrategias de Ventas en Redes Sociales',
    descripcion: 'Aprende a vender viajes a través de redes sociales',
    totalLecciones: 1,
    duracionTotal: 50,
    progreso: 100,
    imagen: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=400&fit=crop',
    expandido: false,
    lecciones: [
      {
        id: '3-1',
        numero: '3.1',
        titulo: 'Estrategias de Ventas en Redes Sociales',
        tipo: 'video',
        duracion: 50,
        completada: true,
      },
    ],
  },
  {
    id: '4',
    titulo: 'Webinar: Gestión de Crisis en Viajes',
    descripcion: 'Cómo manejar situaciones de crisis y emergencias en viajes',
    totalLecciones: 1,
    duracionTotal: 55,
    progreso: 0,
    imagen: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=400&fit=crop',
    expandido: false,
    lecciones: [
      {
        id: '4-1',
        numero: '4.1',
        titulo: 'Gestión de Crisis en Viajes',
        tipo: 'video',
        duracion: 55,
        completada: false,
      },
    ],
  },
];

export function WebinarPage() {
  const router = useRouter();
  const [cursos, setCursos] = useState<Curso[]>(cursosMock);
  const [busqueda, setBusqueda] = useState('');
  const [expandirTodos, setExpandirTodos] = useState(false);

  const totalLecciones = cursos.reduce((acc, curso) => acc + curso.totalLecciones, 0);

  const toggleExpandirCurso = (cursoId: string) => {
    setCursos(cursos.map(curso => 
      curso.id === cursoId ? { ...curso, expandido: !curso.expandido } : curso
    ));
  };

  const toggleExpandirTodos = () => {
    const nuevoEstado = !expandirTodos;
    setExpandirTodos(nuevoEstado);
    setCursos(cursos.map(curso => ({ ...curso, expandido: nuevoEstado })));
  };

  const handleLeccionClick = (cursoId: string, leccionId: string) => {
    router.push(`/academia/webinar/${cursoId}/${leccionId}`);
  };

  const getTipoTexto = (tipo: string) => {
    switch (tipo) {
      case 'video':
        return 'Video';
      case 'lectura':
        return 'Lectura';
      case 'quiz':
        return 'Evaluación';
      default:
        return 'Video';
    }
  };

  const cursosFiltrados = cursos.filter(curso =>
    curso.titulo.toLowerCase().includes(busqueda.toLowerCase()) ||
    curso.descripcion.toLowerCase().includes(busqueda.toLowerCase())
  );

  return (
    <div className="webinar-page">
      <div className="webinar-page__header">
        <div className="webinar-page__title-section">
          <h1 className="webinar-page__title">Webinars</h1>
          <span className="webinar-page__stats-text">{totalLecciones} webinars</span>
        </div>
        <div className="webinar-page__header-row">
          <div className="webinar-page__search">
            <div className="webinar-page__search-wrapper">
              <span className="material-symbols-outlined webinar-page__search-icon" style={{ fontVariationSettings: "'FILL' 0, 'wght' 200, 'GRAD' 0, 'opsz' 20" }}>
                search
              </span>
              <Input
                type="text"
                placeholder="Buscar webinars"
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
                className="webinar-page__search-input"
              />
            </div>
          </div>
          <button
            className="webinar-page__expand-button"
            onClick={toggleExpandirTodos}
          >
            <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 0, 'wght' 200, 'GRAD' 0, 'opsz' 20" }}>
              {expandirTodos ? 'expand_less' : 'expand_more'}
            </span>
            {expandirTodos ? 'Contraer Todo' : 'Expandir Todo'}
          </button>
        </div>
      </div>

      <div className="webinar-page__content">
        <div className="webinar-page__cursos">
          {cursosFiltrados.map((curso) => (
            <Card key={curso.id} className="webinar-page__curso-card">
              <div className="webinar-page__curso-content">
                <div className="webinar-page__curso-imagen">
                  <Image
                    src={curso.imagen}
                    alt={curso.titulo}
                    fill
                    className="object-cover"
                    unoptimized
                  />
                </div>
                <div className="webinar-page__curso-info">
                  <h3 className="webinar-page__curso-titulo">{curso.titulo}</h3>
                  <div className="webinar-page__curso-lecciones-count">
                    <span>{curso.totalLecciones} webinar{curso.totalLecciones > 1 ? 's' : ''}</span>
                  </div>
                  <div className="webinar-page__curso-meta">
                    <span className="webinar-page__curso-duracion">
                      <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 0, 'wght' 200, 'GRAD' 0, 'opsz' 20" }}>
                        schedule
                      </span>
                      {curso.duracionTotal} mins
                    </span>
                  </div>
                  <div className="webinar-page__progreso">
                    <div className="webinar-page__progreso-bar">
                      <div 
                        className="webinar-page__progreso-fill"
                        style={{ width: `${curso.progreso}%` }}
                      ></div>
                    </div>
                    <span className="webinar-page__progreso-text">{curso.progreso}%</span>
                    <button
                      className="webinar-page__expand-curso"
                      onClick={() => toggleExpandirCurso(curso.id)}
                    >
                      <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24" }}>
                        {curso.expandido ? 'expand_less' : 'expand_more'}
                      </span>
                    </button>
                  </div>
                  {curso.expandido && (
                    <div className="webinar-page__lecciones">
                      {curso.lecciones.map((leccion) => (
                        <div
                          key={leccion.id}
                          className="webinar-page__leccion-item"
                          onClick={() => handleLeccionClick(curso.id, leccion.id)}
                        >
                          <span className={`webinar-page__leccion-icon ${leccion.completada ? 'webinar-page__leccion-icon--completada' : ''}`}>
                            {leccion.completada ? (
                              <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1, 'wght' 200, 'GRAD' 0, 'opsz' 20" }}>
                                check_circle
                              </span>
                            ) : (
                              <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 0, 'wght' 200, 'GRAD' 0, 'opsz' 20" }}>
                                radio_button_unchecked
                              </span>
                            )}
                          </span>
                          <span className="webinar-page__leccion-numero">{leccion.numero}</span>
                          <span className="webinar-page__leccion-titulo">{leccion.titulo}</span>
                          <span className="webinar-page__leccion-tipo">
                            {getTipoTexto(leccion.tipo)} {'>'}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
