'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import Image from 'next/image';
import './ProveedoresAcademiaPage.scss';

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
    titulo: 'Principales Proveedores de Vuelos',
    descripcion: 'Aprende a trabajar con las principales aerolíneas y sistemas de reservas de vuelos',
    totalLecciones: 4,
    duracionTotal: 18,
    progreso: 0,
    imagen: 'https://images.unsplash.com/photo-1540962351504-03099e0a754b?w=800&h=400&fit=crop',
    expandido: false,
    lecciones: [
      {
        id: '1-1',
        numero: '1.1',
        titulo: 'Sistemas de Reservas Globales (GDS)',
        tipo: 'video',
        duracion: 6,
        completada: false,
      },
      {
        id: '1-2',
        numero: '1.2',
        titulo: 'Aerolíneas Principales y sus Políticas',
        tipo: 'video',
        duracion: 5,
        completada: false,
      },
      {
        id: '1-3',
        numero: '1.3',
        titulo: 'Códigos de Clase y Tarifas',
        tipo: 'lectura',
        duracion: 4,
        completada: false,
      },
      {
        id: '1-4',
        numero: '1.4',
        titulo: 'Evaluación: Proveedores de Vuelos',
        tipo: 'quiz',
        duracion: 3,
        completada: false,
      },
    ],
  },
  {
    id: '2',
    titulo: 'Hoteles y Alojamientos',
    descripcion: 'Domina la gestión de reservas hoteleras y relaciones con cadenas hoteleras',
    totalLecciones: 5,
    duracionTotal: 22,
    progreso: 30,
    imagen: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&h=400&fit=crop',
    expandido: false,
    lecciones: [
      {
        id: '2-1',
        numero: '2.1',
        titulo: 'Cadenas Hoteleras Internacionales',
        tipo: 'video',
        duracion: 5,
        completada: false,
      },
      {
        id: '2-2',
        numero: '2.2',
        titulo: 'Sistemas de Reservas Hoteleras',
        tipo: 'video',
        duracion: 4,
        completada: false,
      },
      {
        id: '2-3',
        numero: '2.3',
        titulo: 'Tipos de Habitaciones y Tarifas',
        tipo: 'lectura',
        duracion: 4,
        completada: false,
      },
      {
        id: '2-4',
        numero: '2.4',
        titulo: 'Políticas de Cancelación y Modificación',
        tipo: 'video',
        duracion: 5,
        completada: false,
      },
      {
        id: '2-5',
        numero: '2.5',
        titulo: 'Evaluación: Hoteles y Alojamientos',
        tipo: 'quiz',
        duracion: 4,
        completada: false,
      },
    ],
  },
  {
    id: '3',
    titulo: 'Proveedores de Cruceros',
    descripcion: 'Conoce las principales líneas de cruceros y cómo gestionar reservas',
    totalLecciones: 3,
    duracionTotal: 15,
    progreso: 0,
    imagen: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&h=400&fit=crop',
    expandido: false,
    lecciones: [
      {
        id: '3-1',
        numero: '3.1',
        titulo: 'Principales Líneas de Cruceros',
        tipo: 'video',
        duracion: 6,
        completada: false,
      },
      {
        id: '3-2',
        numero: '3.2',
        titulo: 'Tipos de Cabinas y Servicios',
        tipo: 'video',
        duracion: 5,
        completada: false,
      },
      {
        id: '3-3',
        numero: '3.3',
        titulo: 'Rutas y Destinos de Cruceros',
        tipo: 'lectura',
        duracion: 4,
        completada: false,
      },
    ],
  },
  {
    id: '4',
    titulo: 'Proveedores de Tours y Actividades',
    descripcion: 'Aprende a trabajar con operadores de tours y actividades turísticas',
    totalLecciones: 4,
    duracionTotal: 20,
    progreso: 0,
    imagen: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=800&h=400&fit=crop',
    expandido: false,
    lecciones: [
      {
        id: '4-1',
        numero: '4.1',
        titulo: 'Operadores de Tours Principales',
        tipo: 'video',
        duracion: 5,
        completada: false,
      },
      {
        id: '4-2',
        numero: '4.2',
        titulo: 'Actividades y Excursiones',
        tipo: 'video',
        duracion: 5,
        completada: false,
      },
      {
        id: '4-3',
        numero: '4.3',
        titulo: 'Gestión de Reservas de Tours',
        tipo: 'lectura',
        duracion: 5,
        completada: false,
      },
      {
        id: '4-4',
        numero: '4.4',
        titulo: 'Evaluación: Tours y Actividades',
        tipo: 'quiz',
        duracion: 5,
        completada: false,
      },
    ],
  },
];

export function ProveedoresAcademiaPage() {
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
    router.push(`/academia/proveedores/${cursoId}/${leccionId}`);
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
    <div className="proveedores-academia-page">
      <div className="proveedores-academia-page__header">
        <div className="proveedores-academia-page__title-section">
          <h1 className="proveedores-academia-page__title">Proveedores</h1>
          <span className="proveedores-academia-page__stats-text">{totalLecciones} lecciones</span>
        </div>
        <div className="proveedores-academia-page__header-row">
          <div className="proveedores-academia-page__search">
            <div className="proveedores-academia-page__search-wrapper">
              <span className="material-symbols-outlined proveedores-academia-page__search-icon" style={{ fontVariationSettings: "'FILL' 0, 'wght' 200, 'GRAD' 0, 'opsz' 20" }}>
                search
              </span>
              <Input
                type="text"
                placeholder="Buscar proveedores"
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
                className="proveedores-academia-page__search-input"
              />
            </div>
          </div>
          <button
            className="proveedores-academia-page__expand-button"
            onClick={toggleExpandirTodos}
          >
            <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 0, 'wght' 200, 'GRAD' 0, 'opsz' 20" }}>
              {expandirTodos ? 'expand_less' : 'expand_more'}
            </span>
            {expandirTodos ? 'Contraer Todo' : 'Expandir Todo'}
          </button>
        </div>
      </div>

      <div className="proveedores-academia-page__content">
        <div className="proveedores-academia-page__cursos">
          {cursosFiltrados.map((curso) => (
            <Card key={curso.id} className="proveedores-academia-page__curso-card">
              <div className="proveedores-academia-page__curso-content">
                <div className="proveedores-academia-page__curso-imagen">
                  <Image
                    src={curso.imagen}
                    alt={curso.titulo}
                    fill
                    className="object-cover"
                    unoptimized
                    onError={(e) => {
                      console.error('Error loading image:', curso.imagen);
                      // Fallback a una imagen placeholder si falla
                      const target = e.target as HTMLImageElement;
                      if (target) {
                        target.src = 'https://images.unsplash.com/photo-1436491865332-7a61a0ccd75c?w=800&h=400&fit=crop';
                      }
                    }}
                  />
                </div>
                <div className="proveedores-academia-page__curso-info">
                  <h3 className="proveedores-academia-page__curso-titulo">{curso.titulo}</h3>
                  <div className="proveedores-academia-page__curso-lecciones-count">
                    <span>{curso.totalLecciones} lecciones</span>
                  </div>
                  <div className="proveedores-academia-page__curso-meta">
                    <span className="proveedores-academia-page__curso-duracion">
                      <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 0, 'wght' 200, 'GRAD' 0, 'opsz' 20" }}>
                        schedule
                      </span>
                      {curso.duracionTotal} mins
                    </span>
                  </div>
                  <div className="proveedores-academia-page__progreso">
                    <div className="proveedores-academia-page__progreso-bar">
                      <div 
                        className="proveedores-academia-page__progreso-fill"
                        style={{ width: `${curso.progreso}%` }}
                      ></div>
                    </div>
                    <span className="proveedores-academia-page__progreso-text">{curso.progreso}%</span>
                    <button
                      className="proveedores-academia-page__expand-curso"
                      onClick={() => toggleExpandirCurso(curso.id)}
                    >
                      <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24" }}>
                        {curso.expandido ? 'expand_less' : 'expand_more'}
                      </span>
                    </button>
                  </div>
                  {curso.expandido && (
                    <div className="proveedores-academia-page__lecciones">
                      {curso.lecciones.map((leccion) => (
                        <div
                          key={leccion.id}
                          className="proveedores-academia-page__leccion-item"
                          onClick={() => handleLeccionClick(curso.id, leccion.id)}
                        >
                          <span className={`proveedores-academia-page__leccion-icon ${leccion.completada ? 'proveedores-academia-page__leccion-icon--completada' : ''}`}>
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
                          <span className="proveedores-academia-page__leccion-numero">{leccion.numero}</span>
                          <span className="proveedores-academia-page__leccion-titulo">{leccion.titulo}</span>
                          <span className="proveedores-academia-page__leccion-tipo">
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
