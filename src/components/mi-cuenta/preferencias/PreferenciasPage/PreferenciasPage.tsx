'use client';

import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import './PreferenciasPage.scss';

export function PreferenciasPage() {
  const [preferencias, setPreferencias] = useState({
    idioma: 'es',
    moneda: 'USD',
    husoHorario: 'America/New_York',
    notificacionesCorreo: true,
    notificacionesSMS: false
  });

  const idiomas = [
    { value: 'es', label: 'Español' },
    { value: 'en', label: 'English' },
    { value: 'pt', label: 'Português' }
  ];

  const monedas = [
    { value: 'USD', label: 'USD - Dólar Estadounidense' },
    { value: 'EUR', label: 'EUR - Euro' },
    { value: 'MXN', label: 'MXN - Peso Mexicano' },
    { value: 'COP', label: 'COP - Peso Colombiano' }
  ];

  const husosHorarios = [
    { value: 'America/New_York', label: 'EST/EDT (Miami, Nueva York)' },
    { value: 'America/Chicago', label: 'CST/CDT (Chicago)' },
    { value: 'America/Denver', label: 'MST/MDT (Denver)' },
    { value: 'America/Los_Angeles', label: 'PST/PDT (Los Angeles)' },
    { value: 'America/Mexico_City', label: 'CST (Ciudad de México)' },
    { value: 'America/Bogota', label: 'COT (Bogotá)' }
  ];

  const handleSave = () => {
    // Aquí se guardarían las preferencias
    console.log('Guardando preferencias:', preferencias);
  };

  return (
    <div className="preferencias-page">
      <div className="preferencias-page__header">
        <div className="preferencias-page__header-content">
          <h1 className="preferencias-page__title">Preferencias de la plataforma</h1>
        </div>
        <p className="preferencias-page__subtitle">
          Configura tus preferencias y ajustes de la plataforma
        </p>
      </div>

      <div className="preferencias-page__content">
        <div className="preferencias-page__form-card">
          <div className="preferencias-page__form-section">
            <h2 className="preferencias-page__section-title">Configuración Regional</h2>
            
            <div className="preferencias-page__form-row">
              <div className="preferencias-page__form-group">
                <label className="preferencias-page__label">
                  Idioma
                </label>
                <select
                  value={preferencias.idioma}
                  onChange={(e) => setPreferencias({...preferencias, idioma: e.target.value})}
                  className="preferencias-page__select"
                >
                  {idiomas.map((idioma) => (
                    <option key={idioma.value} value={idioma.value}>
                      {idioma.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="preferencias-page__form-group">
                <label className="preferencias-page__label">
                  Moneda
                </label>
                <select
                  value={preferencias.moneda}
                  onChange={(e) => setPreferencias({...preferencias, moneda: e.target.value})}
                  className="preferencias-page__select"
                >
                  {monedas.map((moneda) => (
                    <option key={moneda.value} value={moneda.value}>
                      {moneda.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="preferencias-page__form-group preferencias-page__form-group--full">
              <label className="preferencias-page__label">
                Huso horario
              </label>
              <select
                value={preferencias.husoHorario}
                onChange={(e) => setPreferencias({...preferencias, husoHorario: e.target.value})}
                className="preferencias-page__select"
              >
                {husosHorarios.map((huso) => (
                  <option key={huso.value} value={huso.value}>
                    {huso.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="preferencias-page__form-section">
            <h2 className="preferencias-page__section-title">Notificaciones</h2>
            
            <div className="preferencias-page__form-row">
              <div className="preferencias-page__form-group">
                <label className="preferencias-page__checkbox-label">
                  <input
                    type="checkbox"
                    checked={preferencias.notificacionesCorreo}
                    onChange={(e) => setPreferencias({...preferencias, notificacionesCorreo: e.target.checked})}
                    className="preferencias-page__checkbox"
                  />
                  <span className="preferencias-page__checkbox-text">
                    Recibir notificaciones por correo electrónico
                  </span>
                </label>
                <p className="preferencias-page__checkbox-description">
                  Recibirás notificaciones importantes en tu correo electrónico
                </p>
              </div>

              <div className="preferencias-page__form-group">
                <label className="preferencias-page__checkbox-label">
                  <input
                    type="checkbox"
                    checked={preferencias.notificacionesSMS}
                    onChange={(e) => setPreferencias({...preferencias, notificacionesSMS: e.target.checked})}
                    className="preferencias-page__checkbox"
                  />
                  <span className="preferencias-page__checkbox-text">
                    Recibir notificaciones por SMS
                  </span>
                </label>
                <p className="preferencias-page__checkbox-description">
                  Recibirás notificaciones importantes por mensaje de texto
                </p>
              </div>
            </div>

            <div className="preferencias-page__form-actions">
              <Button
                onClick={handleSave}
                className="preferencias-page__save-button"
              >
                Guardar Cambios
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
