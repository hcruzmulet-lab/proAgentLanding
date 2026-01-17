'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import Image from 'next/image';
import './MarketingPage.scss';

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
    titulo: 'Marketing Digital para Agentes de Viajes',
    descripcion: 'Aprende estrategias de marketing digital para promocionar tus servicios y atraer más clientes',
    totalLecciones: 5,
    duracionTotal: 28,
    progreso: 0,
    imagen: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=400&fit=crop',
    expandido: false,
    lecciones: [
      {
        id: '1-1',
        numero: '1.1',
        titulo: 'Fundamentos del Marketing Digital',
        tipo: 'video',
        duracion: 6,
        completada: false,
      },
      {
        id: '1-2',
        numero: '1.2',
        titulo: 'Redes Sociales para Agentes de Viajes',
        tipo: 'video',
        duracion: 6,
        completada: false,
      },
      {
        id: '1-3',
        numero: '1.3',
        titulo: 'Email Marketing y Newsletters',
        tipo: 'lectura',
        duracion: 5,
        completada: false,
      },
      {
        id: '1-4',
        numero: '1.4',
        titulo: 'SEO y Contenido para Viajes',
        tipo: 'video',
        duracion: 6,
        completada: false,
      },
      {
        id: '1-5',
        numero: '1.5',
        titulo: 'Evaluación: Marketing Digital',
        tipo: 'quiz',
        duracion: 5,
        completada: false,
      },
    ],
  },
  {
    id: '2',
    titulo: 'Técnicas de Ventas para Viajes',
    descripcion: 'Domina las técnicas de ventas específicas para el sector de viajes y turismo',
    totalLecciones: 6,
    duracionTotal: 32,
    progreso: 25,
    imagen: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=400&fit=crop',
    expandido: false,
    lecciones: [
      {
        id: '2-1',
        numero: '2.1',
        titulo: 'Proceso de Venta Consultiva',
        tipo: 'video',
        duracion: 6,
        completada: false,
      },
      {
        id: '2-2',
        numero: '2.2',
        titulo: 'Identificación de Necesidades del Cliente',
        tipo: 'video',
        duracion: 5,
        completada: false,
      },
      {
        id: '2-3',
        numero: '2.3',
        titulo: 'Presentación de Propuestas de Viaje',
        tipo: 'video',
        duracion: 6,
        completada: false,
      },
      {
        id: '2-4',
        numero: '2.4',
        titulo: 'Manejo de Objeciones Comunes',
        tipo: 'lectura',
        duracion: 5,
        completada: false,
      },
      {
        id: '2-5',
        numero: '2.5',
        titulo: 'Cierre de Ventas y Seguimiento',
        tipo: 'video',
        duracion: 5,
        completada: false,
      },
      {
        id: '2-6',
        numero: '2.6',
        titulo: 'Evaluación: Técnicas de Ventas',
        tipo: 'quiz',
        duracion: 5,
        completada: false,
      },
    ],
  },
  {
    id: '3',
    titulo: 'Construcción de Marca Personal',
    descripcion: 'Desarrolla tu marca personal como asesor de viajes profesional',
    totalLecciones: 4,
    duracionTotal: 20,
    progreso: 0,
    imagen: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=800&h=400&fit=crop',
    expandido: false,
    lecciones: [
      {
        id: '3-1',
        numero: '3.1',
        titulo: 'Definición de tu Propuesta de Valor',
        tipo: 'video',
        duracion: 5,
        completada: false,
      },
      {
        id: '3-2',
        numero: '3.2',
        titulo: 'Perfil Profesional y Especialización',
        tipo: 'lectura',
        duracion: 5,
        completada: false,
      },
      {
        id: '3-3',
        numero: '3.3',
        titulo: 'Networking en la Industria de Viajes',
        tipo: 'video',
        duracion: 5,
        completada: false,
      },
      {
        id: '3-4',
        numero: '3.4',
        titulo: 'Evaluación: Marca Personal',
        tipo: 'quiz',
        duracion: 5,
        completada: false,
      },
    ],
  },
  {
    id: '4',
    titulo: 'Fidelización de Clientes',
    descripcion: 'Estrategias para mantener y fidelizar a tus clientes a largo plazo',
    totalLecciones: 4,
    duracionTotal: 22,
    progreso: 0,
    imagen: 'https://images.unsplash.com/photo-1556761175-4b46a572b786?w=800&h=400&fit=crop',
    expandido: false,
    lecciones: [
      {
        id: '4-1',
        numero: '4.1',
        titulo: 'Programas de Fidelización',
        tipo: 'video',
        duracion: 6,
        completada: false,
      },
      {
        id: '4-2',
        numero: '4.2',
        titulo: 'Seguimiento Post-Viaje',
        tipo: 'video',
        duracion: 5,
        completada: false,
      },
      {
        id: '4-3',
        numero: '4.3',
        titulo: 'Generación de Referidos',
        tipo: 'lectura',
        duracion: 5,
        completada: false,
      },
      {
        id: '4-4',
        numero: '4.4',
        titulo: 'Evaluación: Fidelización',
        tipo: 'quiz',
        duracion: 6,
        completada: false,
      },
    ],
  },
];

export function MarketingPage() {
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
    router.push(`/academia/marketing/${cursoId}/${leccionId}`);
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
    <div className="marketing-page">
      <div className="marketing-page__header">
        <div className="marketing-page__title-section">
          <h1 className="marketing-page__title">Marketing & Ventas</h1>
          <span className="marketing-page__stats-text">{totalLecciones} lecciones</span>
        </div>
        <div className="marketing-page__header-row">
          <div className="marketing-page__search">
            <div className="marketing-page__search-wrapper">
              <span className="material-symbols-outlined marketing-page__search-icon" style={{ fontVariationSettings: "'FILL' 0, 'wght' 200, 'GRAD' 0, 'opsz' 20" }}>
                search
              </span>
              <Input
                type="text"
                placeholder="Buscar marketing"
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
                className="marketing-page__search-input"
              />
            </div>
          </div>
          <button
            className="marketing-page__expand-button"
            onClick={toggleExpandirTodos}
          >
            <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 0, 'wght' 200, 'GRAD' 0, 'opsz' 20" }}>
              {expandirTodos ? 'expand_less' : 'expand_more'}
            </span>
            {expandirTodos ? 'Contraer Todo' : 'Expandir Todo'}
          </button>
        </div>
      </div>

      <div className="marketing-page__content">
        <div className="marketing-page__cursos">
          {cursosFiltrados.map((curso) => (
            <Card key={curso.id} className="marketing-page__curso-card">
              <div className="marketing-page__curso-content">
                <div className="marketing-page__curso-info">
                  <h3 className="marketing-page__curso-titulo">{curso.titulo}</h3>
                  <div className="marketing-page__curso-lecciones-count">
                    <span>{curso.totalLecciones} lecciones</span>
                  </div>
                  <div className="marketing-page__curso-meta">
                    <span className="marketing-page__curso-duracion">
                      <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 0, 'wght' 200, 'GRAD' 0, 'opsz' 20" }}>
                        schedule
                      </span>
                      {curso.duracionTotal} mins
                    </span>
                  </div>
                  <div className="marketing-page__progreso">
                    <div className="marketing-page__progreso-bar">
                      <div 
                        className="marketing-page__progreso-fill"
                        style={{ width: `${curso.progreso}%` }}
                      ></div>
                    </div>
                    <span className="marketing-page__progreso-text">{curso.progreso}%</span>
                    <button
                      className="marketing-page__expand-curso"
                      onClick={() => toggleExpandirCurso(curso.id)}
                    >
                      <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24" }}>
                        {curso.expandido ? 'expand_less' : 'expand_more'}
                      </span>
                    </button>
                  </div>
                  {curso.expandido && (
                    <div className="marketing-page__lecciones">
                      {curso.lecciones.map((leccion) => (
                        <div
                          key={leccion.id}
                          className="marketing-page__leccion-item"
                          onClick={() => handleLeccionClick(curso.id, leccion.id)}
                        >
                          <span className={`marketing-page__leccion-icon ${leccion.completada ? 'marketing-page__leccion-icon--completada' : ''}`}>
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
                          <span className="marketing-page__leccion-numero">{leccion.numero}</span>
                          <span className="marketing-page__leccion-titulo">{leccion.titulo}</span>
                          <span className="marketing-page__leccion-tipo">
                            {getTipoTexto(leccion.tipo)} {'>'}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                <div className="marketing-page__curso-imagen">
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
