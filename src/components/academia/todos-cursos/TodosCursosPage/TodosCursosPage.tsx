'use client';

import React, { useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import Image from 'next/image';
import './TodosCursosPage.scss';

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
  categoria: string;
  categoriaRoute: string;
}

// Datos mock de todas las secciones
const todosLosCursos: Curso[] = [
  // Imprescindibles
  {
    id: 'imp-1',
    titulo: 'Bienvenida a ProAgent',
    descripcion: 'Conoce la plataforma y comienza tu viaje como asesor de viajes profesional',
    totalLecciones: 2,
    duracionTotal: 12,
    progreso: 50,
    imagen: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800&h=400&fit=crop',
    expandido: false,
    categoria: 'Imprescindibles',
    categoriaRoute: 'imprescindibles',
    lecciones: [],
  },
  {
    id: 'imp-2',
    titulo: 'Orientación e Industria del Turismo',
    descripcion: 'Fundamentos esenciales de la industria del turismo y cómo funciona el negocio de viajes',
    totalLecciones: 5,
    duracionTotal: 17,
    progreso: 60,
    imagen: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=400&fit=crop',
    expandido: false,
    categoria: 'Imprescindibles',
    categoriaRoute: 'imprescindibles',
    lecciones: [],
  },
  // Proveedores
  {
    id: 'prov-1',
    titulo: 'Principales Proveedores de Vuelos',
    descripcion: 'Aprende a trabajar con las principales aerolíneas y sistemas de reservas de vuelos',
    totalLecciones: 4,
    duracionTotal: 18,
    progreso: 0,
    imagen: 'https://images.unsplash.com/photo-1436491865332-7a61a0ccd75c?w=800&h=400&fit=crop',
    expandido: false,
    categoria: 'Proveedores',
    categoriaRoute: 'proveedores',
    lecciones: [],
  },
  {
    id: 'prov-2',
    titulo: 'Hoteles y Alojamientos',
    descripcion: 'Domina la gestión de reservas hoteleras y relaciones con cadenas hoteleras',
    totalLecciones: 5,
    duracionTotal: 22,
    progreso: 30,
    imagen: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&h=400&fit=crop',
    expandido: false,
    categoria: 'Proveedores',
    categoriaRoute: 'proveedores',
    lecciones: [],
  },
  // Destinos
  {
    id: 'dest-1',
    titulo: 'Destinos del Caribe',
    descripcion: 'Descubre los destinos más populares del Caribe y cómo venderlos a tus clientes',
    totalLecciones: 5,
    duracionTotal: 25,
    progreso: 0,
    imagen: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&h=400&fit=crop',
    expandido: false,
    categoria: 'Destinos',
    categoriaRoute: 'destinos',
    lecciones: [],
  },
  {
    id: 'dest-2',
    titulo: 'Europa: Ciudades y Países',
    descripcion: 'Aprende sobre los destinos europeos más demandados y cómo planificar viajes',
    totalLecciones: 6,
    duracionTotal: 30,
    progreso: 40,
    imagen: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800&h=400&fit=crop',
    expandido: false,
    categoria: 'Destinos',
    categoriaRoute: 'destinos',
    lecciones: [],
  },
  // Marketing
  {
    id: 'mark-1',
    titulo: 'Marketing Digital para Agentes de Viajes',
    descripcion: 'Aprende estrategias de marketing digital para promocionar tus servicios y atraer más clientes',
    totalLecciones: 5,
    duracionTotal: 28,
    progreso: 0,
    imagen: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=400&fit=crop',
    expandido: false,
    categoria: 'Marketing & Ventas',
    categoriaRoute: 'marketing',
    lecciones: [],
  },
  {
    id: 'mark-2',
    titulo: 'Técnicas de Ventas para Viajes',
    descripcion: 'Domina las técnicas de ventas específicas para el sector de viajes y turismo',
    totalLecciones: 6,
    duracionTotal: 32,
    progreso: 25,
    imagen: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=400&fit=crop',
    expandido: false,
    categoria: 'Marketing & Ventas',
    categoriaRoute: 'marketing',
    lecciones: [],
  },
  // Operación
  {
    id: 'op-1',
    titulo: 'Gestión de Reservas y Documentación',
    descripcion: 'Aprende a gestionar eficientemente las reservas y la documentación de viajes',
    totalLecciones: 5,
    duracionTotal: 26,
    progreso: 0,
    imagen: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&h=400&fit=crop',
    expandido: false,
    categoria: 'Operación & Soporte',
    categoriaRoute: 'operacion',
    lecciones: [],
  },
  {
    id: 'op-2',
    titulo: 'Manejo de Modificaciones y Cancelaciones',
    descripcion: 'Domina el proceso de modificaciones y cancelaciones de reservas',
    totalLecciones: 4,
    duracionTotal: 20,
    progreso: 50,
    imagen: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=400&fit=crop',
    expandido: false,
    categoria: 'Operación & Soporte',
    categoriaRoute: 'operacion',
    lecciones: [],
  },
  // Webinars
  {
    id: 'web-1',
    titulo: 'Webinar: Tendencias del Turismo 2024',
    descripcion: 'Conoce las tendencias más importantes del turismo para este año',
    totalLecciones: 1,
    duracionTotal: 60,
    progreso: 0,
    imagen: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=400&fit=crop',
    expandido: false,
    categoria: 'Webinars',
    categoriaRoute: 'webinar',
    lecciones: [],
  },
  {
    id: 'web-2',
    titulo: 'Webinar: Nuevos Destinos Emergentes',
    descripcion: 'Descubre los destinos que están ganando popularidad',
    totalLecciones: 1,
    duracionTotal: 45,
    progreso: 0,
    imagen: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800&h=400&fit=crop',
    expandido: false,
    categoria: 'Webinars',
    categoriaRoute: 'webinar',
    lecciones: [],
  },
];

export function TodosCursosPage() {
  const router = useRouter();
  const [cursos, setCursos] = useState<Curso[]>(todosLosCursos);
  const [busqueda, setBusqueda] = useState('');
  const [categoriaFiltro, setCategoriaFiltro] = useState<string>('Todas');
  const [expandirTodos, setExpandirTodos] = useState(false);

  const categorias = ['Todas', ...Array.from(new Set(cursos.map(c => c.categoria)))];

  const cursosFiltrados = useMemo(() => {
    let filtrados = cursos;

    if (categoriaFiltro !== 'Todas') {
      filtrados = filtrados.filter(curso => curso.categoria === categoriaFiltro);
    }

    if (busqueda) {
      filtrados = filtrados.filter(curso =>
        curso.titulo.toLowerCase().includes(busqueda.toLowerCase()) ||
        curso.descripcion.toLowerCase().includes(busqueda.toLowerCase()) ||
        curso.categoria.toLowerCase().includes(busqueda.toLowerCase())
      );
    }

    return filtrados;
  }, [cursos, busqueda, categoriaFiltro]);

  const totalLecciones = cursosFiltrados.reduce((acc, curso) => acc + curso.totalLecciones, 0);

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

  const handleCursoClick = (categoriaRoute: string) => {
    router.push(`/academia/${categoriaRoute}`);
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

  return (
    <div className="todos-cursos-page">
      <div className="todos-cursos-page__header">
        <div className="todos-cursos-page__title-section">
          <h1 className="todos-cursos-page__title">Todos los cursos</h1>
          <span className="todos-cursos-page__stats-text">{cursosFiltrados.length} cursos • {totalLecciones} lecciones</span>
        </div>
        <div className="todos-cursos-page__header-row">
          <div className="todos-cursos-page__search">
            <div className="todos-cursos-page__search-wrapper">
              <span className="material-symbols-outlined todos-cursos-page__search-icon" style={{ fontVariationSettings: "'FILL' 0, 'wght' 200, 'GRAD' 0, 'opsz' 20" }}>
                search
              </span>
              <Input
                type="text"
                placeholder="Buscar cursos"
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
                className="todos-cursos-page__search-input"
              />
            </div>
          </div>
          <select
            className="todos-cursos-page__filter"
            value={categoriaFiltro}
            onChange={(e) => setCategoriaFiltro(e.target.value)}
          >
            {categorias.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
          <button
            className="todos-cursos-page__expand-button"
            onClick={toggleExpandirTodos}
          >
            <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 0, 'wght' 200, 'GRAD' 0, 'opsz' 20" }}>
              {expandirTodos ? 'expand_less' : 'expand_more'}
            </span>
            {expandirTodos ? 'Contraer Todo' : 'Expandir Todo'}
          </button>
        </div>
      </div>

      <div className="todos-cursos-page__content">
        <div className="todos-cursos-page__cursos">
          {cursosFiltrados.map((curso) => (
            <Card key={curso.id} className="todos-cursos-page__curso-card">
              <div className="todos-cursos-page__curso-content">
                <div className="todos-cursos-page__curso-imagen">
                  <Image
                    src={curso.imagen}
                    alt={curso.titulo}
                    fill
                    className="object-cover"
                    unoptimized
                  />
                </div>
                <div className="todos-cursos-page__curso-info">
                  <div className="todos-cursos-page__curso-header">
                    <span className="todos-cursos-page__curso-categoria">{curso.categoria}</span>
                    <button
                      className="todos-cursos-page__curso-link"
                      onClick={() => handleCursoClick(curso.categoriaRoute)}
                    >
                      Ver en {curso.categoria} {'>'}
                    </button>
                  </div>
                  <h3 className="todos-cursos-page__curso-titulo">{curso.titulo}</h3>
                  <div className="todos-cursos-page__curso-lecciones-count">
                    <span>{curso.totalLecciones} lecciones</span>
                  </div>
                  <div className="todos-cursos-page__curso-meta">
                    <span className="todos-cursos-page__curso-duracion">
                      <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 0, 'wght' 200, 'GRAD' 0, 'opsz' 20" }}>
                        schedule
                      </span>
                      {curso.duracionTotal} mins
                    </span>
                  </div>
                  <div className="todos-cursos-page__progreso">
                    <div className="todos-cursos-page__progreso-bar">
                      <div 
                        className="todos-cursos-page__progreso-fill"
                        style={{ width: `${curso.progreso}%` }}
                      ></div>
                    </div>
                    <span className="todos-cursos-page__progreso-text">{curso.progreso}%</span>
                    <button
                      className="todos-cursos-page__expand-curso"
                      onClick={() => toggleExpandirCurso(curso.id)}
                    >
                      <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24" }}>
                        {curso.expandido ? 'expand_less' : 'expand_more'}
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
