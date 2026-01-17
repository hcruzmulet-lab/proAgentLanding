'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import Image from 'next/image';
import './OperacionPage.scss';

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
    titulo: 'Gestión de Reservas y Documentación',
    descripcion: 'Aprende a gestionar eficientemente las reservas y la documentación de viajes',
    totalLecciones: 5,
    duracionTotal: 26,
    progreso: 0,
    imagen: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&h=400&fit=crop',
    expandido: false,
    lecciones: [
      {
        id: '1-1',
        numero: '1.1',
        titulo: 'Proceso Completo de Reserva',
        tipo: 'video',
        duracion: 6,
        completada: false,
      },
      {
        id: '1-2',
        numero: '1.2',
        titulo: 'Gestión de Documentos de Viaje',
        tipo: 'video',
        duracion: 5,
        completada: false,
      },
      {
        id: '1-3',
        numero: '1.3',
        titulo: 'Vouchers y Confirmaciones',
        tipo: 'lectura',
        duracion: 5,
        completada: false,
      },
      {
        id: '1-4',
        numero: '1.4',
        titulo: 'Organización de Expedientes',
        tipo: 'video',
        duracion: 5,
        completada: false,
      },
      {
        id: '1-5',
        numero: '1.5',
        titulo: 'Evaluación: Reservas y Documentación',
        tipo: 'quiz',
        duracion: 5,
        completada: false,
      },
    ],
  },
  {
    id: '2',
    titulo: 'Manejo de Modificaciones y Cancelaciones',
    descripcion: 'Domina el proceso de modificaciones y cancelaciones de reservas',
    totalLecciones: 4,
    duracionTotal: 20,
    progreso: 50,
    imagen: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=400&fit=crop',
    expandido: false,
    lecciones: [
      {
        id: '2-1',
        numero: '2.1',
        titulo: 'Políticas de Modificación',
        tipo: 'video',
        duracion: 5,
        completada: false,
      },
      {
        id: '2-2',
        numero: '2.2',
        titulo: 'Proceso de Cancelación',
        tipo: 'video',
        duracion: 5,
        completada: false,
      },
      {
        id: '2-3',
        numero: '2.3',
        titulo: 'Reembolsos y Créditos',
        tipo: 'lectura',
        duracion: 5,
        completada: false,
      },
      {
        id: '2-4',
        numero: '2.4',
        titulo: 'Evaluación: Modificaciones y Cancelaciones',
        tipo: 'quiz',
        duracion: 5,
        completada: false,
      },
    ],
  },
  {
    id: '3',
    titulo: 'Soporte al Cliente Durante el Viaje',
    descripcion: 'Aprende a brindar soporte efectivo a tus clientes durante sus viajes',
    totalLecciones: 4,
    duracionTotal: 22,
    progreso: 0,
    imagen: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=800&h=400&fit=crop',
    expandido: false,
    lecciones: [
      {
        id: '3-1',
        numero: '3.1',
        titulo: 'Comunicación 24/7 con Clientes',
        tipo: 'video',
        duracion: 6,
        completada: false,
      },
      {
        id: '3-2',
        numero: '3.2',
        titulo: 'Resolución de Problemas en Tiempo Real',
        tipo: 'video',
        duracion: 6,
        completada: false,
      },
      {
        id: '3-3',
        numero: '3.3',
        titulo: 'Coordinación con Proveedores',
        tipo: 'lectura',
        duracion: 5,
        completada: false,
      },
      {
        id: '3-4',
        numero: '3.4',
        titulo: 'Evaluación: Soporte al Cliente',
        tipo: 'quiz',
        duracion: 5,
        completada: false,
      },
    ],
  },
  {
    id: '4',
    titulo: 'Gestión de Pagos y Facturación',
    descripcion: 'Domina la gestión de pagos, facturación y contabilidad básica',
    totalLecciones: 5,
    duracionTotal: 24,
    progreso: 0,
    imagen: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&h=400&fit=crop',
    expandido: false,
    lecciones: [
      {
        id: '4-1',
        numero: '4.1',
        titulo: 'Procesamiento de Pagos',
        tipo: 'video',
        duracion: 5,
        completada: false,
      },
      {
        id: '4-2',
        numero: '4.2',
        titulo: 'Facturación y Comprobantes',
        tipo: 'video',
        duracion: 5,
        completada: false,
      },
      {
        id: '4-3',
        numero: '4.3',
        titulo: 'Control de Pagos Pendientes',
        tipo: 'lectura',
        duracion: 5,
        completada: false,
      },
      {
        id: '4-4',
        numero: '4.4',
        titulo: 'Reportes Financieros Básicos',
        tipo: 'video',
        duracion: 5,
        completada: false,
      },
      {
        id: '4-5',
        numero: '4.5',
        titulo: 'Evaluación: Pagos y Facturación',
        tipo: 'quiz',
        duracion: 4,
        completada: false,
      },
    ],
  },
];

export function OperacionPage() {
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
    router.push(`/academia/operacion/${cursoId}/${leccionId}`);
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
    <div className="operacion-page">
      <div className="operacion-page__header">
        <div className="operacion-page__title-section">
          <h1 className="operacion-page__title">Operación & Soporte</h1>
          <span className="operacion-page__stats-text">{totalLecciones} lecciones</span>
        </div>
        <div className="operacion-page__header-row">
          <div className="operacion-page__search">
            <div className="operacion-page__search-wrapper">
              <span className="material-symbols-outlined operacion-page__search-icon" style={{ fontVariationSettings: "'FILL' 0, 'wght' 200, 'GRAD' 0, 'opsz' 20" }}>
                search
              </span>
              <Input
                type="text"
                placeholder="Buscar operación"
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
                className="operacion-page__search-input"
              />
            </div>
          </div>
          <button
            className="operacion-page__expand-button"
            onClick={toggleExpandirTodos}
          >
            <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 0, 'wght' 200, 'GRAD' 0, 'opsz' 20" }}>
              {expandirTodos ? 'expand_less' : 'expand_more'}
            </span>
            {expandirTodos ? 'Contraer Todo' : 'Expandir Todo'}
          </button>
        </div>
      </div>

      <div className="operacion-page__content">
        <div className="operacion-page__cursos">
          {cursosFiltrados.map((curso) => (
            <Card key={curso.id} className="operacion-page__curso-card">
              <div className="operacion-page__curso-content">
                <div className="operacion-page__curso-imagen">
                  <Image
                    src={curso.imagen}
                    alt={curso.titulo}
                    fill
                    className="object-cover"
                    unoptimized
                  />
                </div>
                <div className="operacion-page__curso-info">
                  <h3 className="operacion-page__curso-titulo">{curso.titulo}</h3>
                  <div className="operacion-page__curso-lecciones-count">
                    <span>{curso.totalLecciones} lecciones</span>
                  </div>
                  <div className="operacion-page__curso-meta">
                    <span className="operacion-page__curso-duracion">
                      <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 0, 'wght' 200, 'GRAD' 0, 'opsz' 20" }}>
                        schedule
                      </span>
                      {curso.duracionTotal} mins
                    </span>
                  </div>
                  <div className="operacion-page__progreso">
                    <div className="operacion-page__progreso-bar">
                      <div 
                        className="operacion-page__progreso-fill"
                        style={{ width: `${curso.progreso}%` }}
                      ></div>
                    </div>
                    <span className="operacion-page__progreso-text">{curso.progreso}%</span>
                    <button
                      className="operacion-page__expand-curso"
                      onClick={() => toggleExpandirCurso(curso.id)}
                    >
                      <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24" }}>
                        {curso.expandido ? 'expand_less' : 'expand_more'}
                      </span>
                    </button>
                  </div>
                  {curso.expandido && (
                    <div className="operacion-page__lecciones">
                      {curso.lecciones.map((leccion) => (
                        <div
                          key={leccion.id}
                          className="operacion-page__leccion-item"
                          onClick={() => handleLeccionClick(curso.id, leccion.id)}
                        >
                          <span className={`operacion-page__leccion-icon ${leccion.completada ? 'operacion-page__leccion-icon--completada' : ''}`}>
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
                          <span className="operacion-page__leccion-numero">{leccion.numero}</span>
                          <span className="operacion-page__leccion-titulo">{leccion.titulo}</span>
                          <span className="operacion-page__leccion-tipo">
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
