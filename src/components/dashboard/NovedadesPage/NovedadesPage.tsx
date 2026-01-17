'use client';

import { useState, useMemo } from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import './NovedadesPage.scss';

interface NewsItem {
  id: string;
  title: string;
  date: string;
  category: 'comunicados' | 'noticias' | 'lanzamientos' | 'actualidad';
  excerpt?: string;
}

const allNews: NewsItem[] = [
  // Comunicados
  { 
    id: '1', 
    title: 'La unión europea activa su nuevo sistema de fronteras EES', 
    date: '02/01/2026',
    category: 'comunicados',
    excerpt: 'El nuevo Sistema de Entrada y Salida (EES) de la UE entrará en vigor próximamente, afectando a todos los viajeros no comunitarios.'
  },
  { 
    id: '2', 
    title: 'Actualización de políticas de cancelación para 2026', 
    date: '03/01/2026',
    category: 'comunicados',
    excerpt: 'Nuevas políticas de cancelación y reembolso aplicables a partir del primer trimestre de 2026.'
  },
  { 
    id: '3', 
    title: 'Cambios en requisitos de documentación para viajes internacionales', 
    date: '04/01/2026',
    category: 'comunicados',
    excerpt: 'Actualización importante sobre los documentos requeridos para viajes internacionales en 2026.'
  },
  
  // Noticias
  { 
    id: '4', 
    title: 'Raynair - Nueva tarjeta digital de embarque', 
    date: '02/01/2026',
    category: 'noticias',
    excerpt: 'Raynair implementa un nuevo sistema de tarjetas de embarque digitales para agilizar el proceso de check-in.'
  },
  { 
    id: '5', 
    title: 'Aerolíneas aumentan frecuencias a destinos del Caribe', 
    date: '05/01/2026',
    category: 'noticias',
    excerpt: 'Varias aerolíneas principales anuncian aumentos en la frecuencia de vuelos a destinos caribeños para la temporada alta.'
  },
  { 
    id: '6', 
    title: 'Nuevas rutas directas desde Miami a destinos europeos', 
    date: '06/01/2026',
    category: 'noticias',
    excerpt: 'Se anuncian nuevas rutas directas que conectan Miami con importantes destinos europeos.'
  },
  
  // Lanzamientos
  { 
    id: '7', 
    title: 'Mundomar Cruceros - Nuevo proveedor', 
    date: '02/01/2026',
    category: 'lanzamientos',
    excerpt: 'Mundomar Cruceros se une a nuestra red de proveedores, ofreciendo nuevas opciones de cruceros premium.'
  },
  { 
    id: '8', 
    title: 'Lanzamiento de nueva plataforma de reservas en tiempo real', 
    date: '07/01/2026',
    category: 'lanzamientos',
    excerpt: 'Presentamos nuestra nueva plataforma de reservas con actualizaciones en tiempo real y mejor experiencia de usuario.'
  },
  { 
    id: '9', 
    title: 'Nueva app móvil para asesores de viajes', 
    date: '08/01/2026',
    category: 'lanzamientos',
    excerpt: 'Lanzamos nuestra nueva aplicación móvil diseñada específicamente para asesores de viajes profesionales.'
  },
  
  // Actualidad
  { 
    id: '10', 
    title: 'Tendencias de viaje para 2026: destinos más populares', 
    date: '09/01/2026',
    category: 'actualidad',
    excerpt: 'Análisis de las tendencias de viaje más importantes para 2026 y los destinos que están ganando popularidad.'
  },
  { 
    id: '11', 
    title: 'Impacto del cambio climático en el turismo sostenible', 
    date: '10/01/2026',
    category: 'actualidad',
    excerpt: 'Cómo el cambio climático está influyendo en las preferencias de los viajeros hacia opciones más sostenibles.'
  },
  { 
    id: '12', 
    title: 'El futuro del turismo post-pandemia: nuevas expectativas', 
    date: '11/01/2026',
    category: 'actualidad',
    excerpt: 'Exploramos cómo han cambiado las expectativas de los viajeros después de la pandemia y qué significa para la industria.'
  },
];

const categories = [
  { id: 'todos', label: 'Todos', icon: 'article' },
  { id: 'comunicados', label: 'Comunicados', icon: 'campaign' },
  { id: 'noticias', label: 'Noticias', icon: 'newspaper' },
  { id: 'lanzamientos', label: 'Lanzamientos', icon: 'rocket_launch' },
  { id: 'actualidad', label: 'Actualidad', icon: 'trending_up' },
];

export function NovedadesPage() {
  const [activeCategory, setActiveCategory] = useState<string>('todos');

  const filteredNews = useMemo(() => {
    if (activeCategory === 'todos') {
      return allNews;
    }
    return allNews.filter(item => item.category === activeCategory);
  }, [activeCategory]);

  const getCategoryLabel = (category: string) => {
    return categories.find(cat => cat.id === category)?.label || category;
  };

  const getCategoryIcon = (category: string) => {
    return categories.find(cat => cat.id === category)?.icon || 'article';
  };

  return (
    <div className="novedades-page">
      <h1 className="novedades-page__title">Novedades</h1>

      <Tabs value={activeCategory} onValueChange={setActiveCategory} className="novedades-page__tabs">
        <TabsList className="novedades-page__tabs-list">
          {categories.map((category) => (
            <TabsTrigger 
              key={category.id} 
              value={category.id}
              className="novedades-page__tab-trigger"
            >
              <span className="material-symbols-outlined">{category.icon}</span>
              {category.label}
            </TabsTrigger>
          ))}
        </TabsList>

        {categories.map((category) => (
          <TabsContent key={category.id} value={category.id} className="novedades-page__tabs-content">
            <div className="novedades-page__news-grid">
              {filteredNews.length === 0 ? (
                <div className="novedades-page__empty">
                  <span className="material-symbols-outlined">article</span>
                  <p>No hay artículos en esta categoría</p>
                </div>
              ) : (
                filteredNews.map((item) => (
                  <Card key={item.id} className="novedades-page__news-card">
                    <div className="novedades-page__news-header">
                      <Badge 
                        variant="secondary" 
                        className={`novedades-page__news-badge novedades-page__news-badge--${item.category}`}
                      >
                        {getCategoryLabel(item.category)}
                      </Badge>
                      <span className="novedades-page__news-date">{item.date}</span>
                    </div>
                    <h3 className="novedades-page__news-title">{item.title}</h3>
                    {item.excerpt && (
                      <p className="novedades-page__news-excerpt">{item.excerpt}</p>
                    )}
                    <div className="novedades-page__news-footer">
                      <span className="material-symbols-outlined novedades-page__news-icon">
                        arrow_circle_right
                      </span>
                      <span className="novedades-page__news-link">Leer más</span>
                    </div>
                  </Card>
                ))
              )}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
