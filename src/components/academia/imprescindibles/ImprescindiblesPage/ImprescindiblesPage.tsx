'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import './ImprescindiblesPage.scss';

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
    titulo: 'Bienvenida a ProAgent',
    descripcion: 'Conoce la plataforma y comienza tu viaje como asesor de viajes profesional',
    totalLecciones: 2,
    duracionTotal: 12,
    progreso: 50,
    imagen: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800&h=400&fit=crop',
    expandido: false,
    lecciones: [
      {
        id: '1-1',
        numero: '1.1',
        titulo: 'La Historia de ProAgent',
        tipo: 'video',
        duracion: 8,
        completada: false,
      },
      {
        id: '1-2',
        numero: '1.2',
        titulo: 'Tu Viaje como Asesor ProAgent',
        tipo: 'video',
        duracion: 4,
        completada: false,
      },
    ],
  },
  {
    id: '2',
    titulo: 'Orientación e Industria del Turismo',
    descripcion: 'Fundamentos esenciales de la industria del turismo y cómo funciona el negocio de viajes',
    totalLecciones: 5,
    duracionTotal: 17,
    progreso: 60,
    imagen: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=400&fit=crop',
    expandido: false,
    lecciones: [
      {
        id: '2-1',
        numero: '2.1',
        titulo: 'Introducción a la Industria del Turismo',
        tipo: 'video',
        duracion: 5,
        completada: false,
      },
      {
        id: '2-2',
        numero: '2.2',
        titulo: 'Tipos de Agentes de Viajes',
        tipo: 'video',
        duracion: 4,
        completada: false,
      },
      {
        id: '2-3',
        numero: '2.3',
        titulo: 'Modelos de Negocio en Turismo',
        tipo: 'lectura',
        duracion: 3,
        completada: false,
      },
      {
        id: '2-4',
        numero: '2.4',
        titulo: 'Regulaciones y Certificaciones',
        tipo: 'video',
        duracion: 3,
        completada: false,
      },
      {
        id: '2-5',
        numero: '2.5',
        titulo: 'Evaluación: Fundamentos del Turismo',
        tipo: 'quiz',
        duracion: 2,
        completada: false,
      },
    ],
  },
  {
    id: '3',
    titulo: 'Primeros Pasos en ProAgent',
    descripcion: 'Aprende a navegar y utilizar las herramientas principales de la plataforma',
    totalLecciones: 4,
    duracionTotal: 15,
    progreso: 25,
    imagen: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=800&h=400&fit=crop',
    expandido: false,
    lecciones: [
      {
        id: '3-1',
        numero: '3.1',
        titulo: 'Configuración de tu Perfil',
        tipo: 'video',
        duracion: 4,
        completada: false,
      },
      {
        id: '3-2',
        numero: '3.2',
        titulo: 'Navegación en el Dashboard',
        tipo: 'video',
        duracion: 5,
        completada: false,
      },
      {
        id: '3-3',
        numero: '3.3',
        titulo: 'Gestión de Clientes',
        tipo: 'video',
        duracion: 4,
        completada: false,
      },
      {
        id: '3-4',
        numero: '3.4',
        titulo: 'Crear tu Primera Cotización',
        tipo: 'video',
        duracion: 2,
        completada: false,
      },
    ],
  },
  {
    id: '4',
    titulo: 'Comunicación Efectiva con Clientes',
    descripcion: 'Desarrolla habilidades de comunicación para construir relaciones sólidas con tus clientes',
    totalLecciones: 6,
    duracionTotal: 25,
    progreso: 0,
    imagen: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=800&h=400&fit=crop',
    expandido: false,
    lecciones: [
      {
        id: '4-1',
        numero: '4.1',
        titulo: 'Técnicas de Consultoría de Viajes',
        tipo: 'video',
        duracion: 6,
        completada: false,
      },
      {
        id: '4-2',
        numero: '4.2',
        titulo: 'Preguntas Clave para Entender a tu Cliente',
        tipo: 'video',
        duracion: 5,
        completada: false,
      },
      {
        id: '4-3',
        numero: '4.3',
        titulo: 'Manejo de Objeciones',
        tipo: 'video',
        duracion: 4,
        completada: false,
      },
      {
        id: '4-4',
        numero: '4.4',
        titulo: 'Seguimiento Post-Venta',
        tipo: 'lectura',
        duracion: 5,
        completada: false,
      },
      {
        id: '4-5',
        numero: '4.5',
        titulo: 'Casos Prácticos de Comunicación',
        tipo: 'video',
        duracion: 3,
        completada: false,
      },
      {
        id: '4-6',
        numero: '4.6',
        titulo: 'Evaluación: Comunicación con Clientes',
        tipo: 'quiz',
        duracion: 2,
        completada: false,
      },
    ],
  },
  {
    id: '5',
    titulo: 'Gestión de Reservas y Operaciones',
    descripcion: 'Aprende a gestionar reservas, pagos y operaciones del día a día',
    totalLecciones: 5,
    duracionTotal: 20,
    progreso: 0,
    imagen: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=800&h=400&fit=crop',
    expandido: false,
    lecciones: [
      {
        id: '5-1',
        numero: '5.1',
        titulo: 'Proceso de Reserva Completo',
        tipo: 'video',
        duracion: 5,
        completada: false,
      },
      {
        id: '5-2',
        numero: '5.2',
        titulo: 'Gestión de Pagos y Facturación',
        tipo: 'video',
        duracion: 4,
        completada: false,
      },
      {
        id: '5-3',
        numero: '5.3',
        titulo: 'Modificaciones y Cancelaciones',
        tipo: 'video',
        duracion: 4,
        completada: false,
      },
      {
        id: '5-4',
        numero: '5.4',
        titulo: 'Documentación y Vouchers',
        tipo: 'lectura',
        duracion: 4,
        completada: false,
      },
      {
        id: '5-5',
        numero: '5.5',
        titulo: 'Resolución de Problemas Operativos',
        tipo: 'video',
        duracion: 3,
        completada: false,
      },
    ],
  },
];

export function ImprescindiblesPage() {
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
    router.push(`/academia/imprescindibles/${cursoId}/${leccionId}`);
  };

  const getTipoIcono = (tipo: string) => {
    switch (tipo) {
      case 'video':
        return 'play_circle';
      case 'lectura':
        return 'article';
      case 'quiz':
        return 'quiz';
      default:
        return 'play_circle';
    }
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
    <div className="imprescindibles-page">
      <div className="imprescindibles-page__header">
        <div className="imprescindibles-page__title-section">
          <h1 className="imprescindibles-page__title">Imprescindibles</h1>
          <span className="imprescindibles-page__stats-text">{totalLecciones} lecciones</span>
        </div>
        <div className="imprescindibles-page__header-row">
          <div className="imprescindibles-page__search">
            <div className="imprescindibles-page__search-wrapper">
              <span className="material-symbols-outlined imprescindibles-page__search-icon" style={{ fontVariationSettings: "'FILL' 0, 'wght' 200, 'GRAD' 0, 'opsz' 20" }}>
                search
              </span>
              <Input
                type="text"
                placeholder="Buscar imprescindibles"
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
                className="imprescindibles-page__search-input"
              />
            </div>
          </div>
          <button
            className="imprescindibles-page__expand-button"
            onClick={toggleExpandirTodos}
          >
            <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 0, 'wght' 200, 'GRAD' 0, 'opsz' 20" }}>
              {expandirTodos ? 'expand_less' : 'expand_more'}
            </span>
            {expandirTodos ? 'Contraer Todo' : 'Expandir Todo'}
          </button>
        </div>
      </div>

      <div className="imprescindibles-page__content">
        <div className="imprescindibles-page__cursos">
          {cursosFiltrados.map((curso) => (
            <Card key={curso.id} className="imprescindibles-page__curso-card">
              <div className="imprescindibles-page__curso-content">
                <div className="imprescindibles-page__curso-info">
                  <h3 className="imprescindibles-page__curso-titulo">{curso.titulo}</h3>
                  <div className="imprescindibles-page__curso-lecciones-count">
                    <span>{curso.totalLecciones} lecciones</span>
                  </div>
                  <div className="imprescindibles-page__curso-meta">
                    <span className="imprescindibles-page__curso-duracion">
                      <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 0, 'wght' 200, 'GRAD' 0, 'opsz' 20" }}>
                        schedule
                      </span>
                      {curso.duracionTotal} mins
                    </span>
                  </div>
                  <div className="imprescindibles-page__progreso">
                    <div className="imprescindibles-page__progreso-bar">
                      <div 
                        className="imprescindibles-page__progreso-fill"
                        style={{ width: `${curso.progreso}%` }}
                      ></div>
                    </div>
                    <span className="imprescindibles-page__progreso-text">{curso.progreso}%</span>
                    <button
                      className="imprescindibles-page__expand-curso"
                      onClick={() => toggleExpandirCurso(curso.id)}
                    >
                      <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24" }}>
                        {curso.expandido ? 'expand_less' : 'expand_more'}
                      </span>
                    </button>
                  </div>
                  {curso.expandido && (
                    <div className="imprescindibles-page__lecciones">
                      {curso.lecciones.map((leccion) => (
                        <div
                          key={leccion.id}
                          className="imprescindibles-page__leccion-item"
                          onClick={() => handleLeccionClick(curso.id, leccion.id)}
                        >
                          <span className={`imprescindibles-page__leccion-icon ${leccion.completada ? 'imprescindibles-page__leccion-icon--completada' : ''}`}>
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
                          <span className="imprescindibles-page__leccion-numero">{leccion.numero}</span>
                          <span className="imprescindibles-page__leccion-titulo">{leccion.titulo}</span>
                          <span className="imprescindibles-page__leccion-tipo">
                            {getTipoTexto(leccion.tipo)} {'>'}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                <div className="imprescindibles-page__curso-imagen">
                  <Image
                    src={curso.imagen}
                    alt={curso.titulo}
                    fill
                    className="object-cover"
                    unoptimized
                  />
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
