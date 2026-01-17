'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import Image from 'next/image';
import './DestinosPage.scss';

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
    titulo: 'Destinos del Caribe',
    descripcion: 'Descubre los destinos más populares del Caribe y cómo venderlos a tus clientes',
    totalLecciones: 5,
    duracionTotal: 25,
    progreso: 0,
    imagen: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&h=400&fit=crop',
    expandido: false,
    lecciones: [
      {
        id: '1-1',
        numero: '1.1',
        titulo: 'Islas del Caribe: Jamaica, República Dominicana, Aruba',
        tipo: 'video',
        duracion: 6,
        completada: false,
      },
      {
        id: '1-2',
        numero: '1.2',
        titulo: 'Mejores Épocas para Viajar al Caribe',
        tipo: 'video',
        duracion: 5,
        completada: false,
      },
      {
        id: '1-3',
        numero: '1.3',
        titulo: 'Resorts All-Inclusive del Caribe',
        tipo: 'lectura',
        duracion: 5,
        completada: false,
      },
      {
        id: '1-4',
        numero: '1.4',
        titulo: 'Actividades y Excursiones en el Caribe',
        tipo: 'video',
        duracion: 5,
        completada: false,
      },
      {
        id: '1-5',
        numero: '1.5',
        titulo: 'Evaluación: Destinos del Caribe',
        tipo: 'quiz',
        duracion: 4,
        completada: false,
      },
    ],
  },
  {
    id: '2',
    titulo: 'Europa: Ciudades y Países',
    descripcion: 'Aprende sobre los destinos europeos más demandados y cómo planificar viajes',
    totalLecciones: 6,
    duracionTotal: 30,
    progreso: 40,
    imagen: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800&h=400&fit=crop',
    expandido: false,
    lecciones: [
      {
        id: '2-1',
        numero: '2.1',
        titulo: 'Capitales Europeas: París, Londres, Roma',
        tipo: 'video',
        duracion: 6,
        completada: false,
      },
      {
        id: '2-2',
        numero: '2.2',
        titulo: 'España: Madrid, Barcelona, Costa del Sol',
        tipo: 'video',
        duracion: 5,
        completada: false,
      },
      {
        id: '2-3',
        numero: '2.3',
        titulo: 'Italia: Roma, Florencia, Venecia',
        tipo: 'video',
        duracion: 5,
        completada: false,
      },
      {
        id: '2-4',
        numero: '2.4',
        titulo: 'Grecia: Atenas y las Islas Griegas',
        tipo: 'lectura',
        duracion: 5,
        completada: false,
      },
      {
        id: '2-5',
        numero: '2.5',
        titulo: 'Países Nórdicos: Escandinavia',
        tipo: 'video',
        duracion: 5,
        completada: false,
      },
      {
        id: '2-6',
        numero: '2.6',
        titulo: 'Evaluación: Destinos Europeos',
        tipo: 'quiz',
        duracion: 4,
        completada: false,
      },
    ],
  },
  {
    id: '3',
    titulo: 'Destinos de Asia',
    descripcion: 'Conoce los destinos asiáticos más populares y sus características únicas',
    totalLecciones: 4,
    duracionTotal: 22,
    progreso: 0,
    imagen: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=400&fit=crop',
    expandido: false,
    lecciones: [
      {
        id: '3-1',
        numero: '3.1',
        titulo: 'Japón: Tokio, Kioto, Osaka',
        tipo: 'video',
        duracion: 6,
        completada: false,
      },
      {
        id: '3-2',
        numero: '3.2',
        titulo: 'Tailandia: Bangkok y Playas',
        tipo: 'video',
        duracion: 5,
        completada: false,
      },
      {
        id: '3-3',
        numero: '3.3',
        titulo: 'Singapur y Malasia',
        tipo: 'lectura',
        duracion: 5,
        completada: false,
      },
      {
        id: '3-4',
        numero: '3.4',
        titulo: 'Evaluación: Destinos de Asia',
        tipo: 'quiz',
        duracion: 6,
        completada: false,
      },
    ],
  },
  {
    id: '4',
    titulo: 'América del Norte y Sur',
    descripcion: 'Explora los destinos de América del Norte y del Sur más solicitados',
    totalLecciones: 5,
    duracionTotal: 28,
    progreso: 0,
    imagen: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=800&h=400&fit=crop',
    expandido: false,
    lecciones: [
      {
        id: '4-1',
        numero: '4.1',
        titulo: 'Estados Unidos: Nueva York, Los Ángeles, Miami',
        tipo: 'video',
        duracion: 6,
        completada: false,
      },
      {
        id: '4-2',
        numero: '4.2',
        titulo: 'México: Cancún, Riviera Maya, Ciudad de México',
        tipo: 'video',
        duracion: 6,
        completada: false,
      },
      {
        id: '4-3',
        numero: '4.3',
        titulo: 'Brasil: Río de Janeiro, São Paulo',
        tipo: 'lectura',
        duracion: 5,
        completada: false,
      },
      {
        id: '4-4',
        numero: '4.4',
        titulo: 'Argentina: Buenos Aires, Patagonia',
        tipo: 'video',
        duracion: 5,
        completada: false,
      },
      {
        id: '4-5',
        numero: '4.5',
        titulo: 'Evaluación: América del Norte y Sur',
        tipo: 'quiz',
        duracion: 6,
        completada: false,
      },
    ],
  },
];

export function DestinosPage() {
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
    router.push(`/academia/destinos/${cursoId}/${leccionId}`);
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
    <div className="destinos-page">
      <div className="destinos-page__header">
        <div className="destinos-page__title-section">
          <h1 className="destinos-page__title">Destinos</h1>
          <span className="destinos-page__stats-text">{totalLecciones} lecciones</span>
        </div>
        <div className="destinos-page__header-row">
          <div className="destinos-page__search">
            <div className="destinos-page__search-wrapper">
              <span className="material-symbols-outlined destinos-page__search-icon" style={{ fontVariationSettings: "'FILL' 0, 'wght' 200, 'GRAD' 0, 'opsz' 20" }}>
                search
              </span>
              <Input
                type="text"
                placeholder="Buscar destinos"
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
                className="destinos-page__search-input"
              />
            </div>
          </div>
          <button
            className="destinos-page__expand-button"
            onClick={toggleExpandirTodos}
          >
            <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 0, 'wght' 200, 'GRAD' 0, 'opsz' 20" }}>
              {expandirTodos ? 'expand_less' : 'expand_more'}
            </span>
            {expandirTodos ? 'Contraer Todo' : 'Expandir Todo'}
          </button>
        </div>
      </div>

      <div className="destinos-page__content">
        <div className="destinos-page__cursos">
          {cursosFiltrados.map((curso) => (
            <Card key={curso.id} className="destinos-page__curso-card">
              <div className="destinos-page__curso-content">
                <div className="destinos-page__curso-imagen">
                  <Image
                    src={curso.imagen}
                    alt={curso.titulo}
                    fill
                    className="object-cover"
                    unoptimized
                  />
                </div>
                <div className="destinos-page__curso-info">
                  <h3 className="destinos-page__curso-titulo">{curso.titulo}</h3>
                  <div className="destinos-page__curso-lecciones-count">
                    <span>{curso.totalLecciones} lecciones</span>
                  </div>
                  <div className="destinos-page__curso-meta">
                    <span className="destinos-page__curso-duracion">
                      <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 0, 'wght' 200, 'GRAD' 0, 'opsz' 20" }}>
                        schedule
                      </span>
                      {curso.duracionTotal} mins
                    </span>
                  </div>
                  <div className="destinos-page__progreso">
                    <div className="destinos-page__progreso-bar">
                      <div 
                        className="destinos-page__progreso-fill"
                        style={{ width: `${curso.progreso}%` }}
                      ></div>
                    </div>
                    <span className="destinos-page__progreso-text">{curso.progreso}%</span>
                    <button
                      className="destinos-page__expand-curso"
                      onClick={() => toggleExpandirCurso(curso.id)}
                    >
                      <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24" }}>
                        {curso.expandido ? 'expand_less' : 'expand_more'}
                      </span>
                    </button>
                  </div>
                  {curso.expandido && (
                    <div className="destinos-page__lecciones">
                      {curso.lecciones.map((leccion) => (
                        <div
                          key={leccion.id}
                          className="destinos-page__leccion-item"
                          onClick={() => handleLeccionClick(curso.id, leccion.id)}
                        >
                          <span className={`destinos-page__leccion-icon ${leccion.completada ? 'destinos-page__leccion-icon--completada' : ''}`}>
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
                          <span className="destinos-page__leccion-numero">{leccion.numero}</span>
                          <span className="destinos-page__leccion-titulo">{leccion.titulo}</span>
                          <span className="destinos-page__leccion-tipo">
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
