'use client';

import React from 'react';
import './TodosCursosPage.scss';

export function TodosCursosPage() {
  return (
    <div className="todos-cursos-page">
      <div className="todos-cursos-page__header">
        <h1 className="todos-cursos-page__title">Todos los cursos</h1>
        <p className="todos-cursos-page__subtitle">
          Explora el catálogo completo de cursos disponibles
        </p>
      </div>

      <div className="todos-cursos-page__content">
        <div className="todos-cursos-page__empty-state">
          <span className="material-symbols-outlined todos-cursos-page__empty-icon">
            book_2
          </span>
          <h2 className="todos-cursos-page__empty-title">Catálogo de cursos</h2>
          <p className="todos-cursos-page__empty-description">
            Aquí encontrarás todos los cursos disponibles
          </p>
        </div>
      </div>
    </div>
  );
}
