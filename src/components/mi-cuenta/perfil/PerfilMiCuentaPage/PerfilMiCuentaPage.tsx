'use client';

import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import './PerfilMiCuentaPage.scss';

export function PerfilMiCuentaPage() {
  const [formData, setFormData] = useState({
    nombre: 'Arieldi Marrero',
    correo: 'arieldi.marrero@proagent.com',
    correoRecuperacion: '',
    telefono: '+1 (305) 555-0123',
    direccion: '1234 Main Street, Miami, FL 33101'
  });

  const handleSave = () => {
    // Aquí se guardaría la información
    console.log('Guardando datos:', formData);
  };

  return (
    <div className="perfil-mi-cuenta-page">
      <div className="perfil-mi-cuenta-page__header">
        <div className="perfil-mi-cuenta-page__header-content">
          <h1 className="perfil-mi-cuenta-page__title">Mi Cuenta</h1>
        </div>
        <p className="perfil-mi-cuenta-page__subtitle">
          Gestiona tu información personal y configuración de cuenta
        </p>
      </div>

      <div className="perfil-mi-cuenta-page__content">
        <div className="perfil-mi-cuenta-page__form-card">
          <div className="perfil-mi-cuenta-page__form-section">
            <div className="perfil-mi-cuenta-page__form-row">
              <div className="perfil-mi-cuenta-page__form-group">
                <label className="perfil-mi-cuenta-page__label">
                  Nombre completo
                </label>
                <Input
                  type="text"
                  value={formData.nombre}
                  onChange={(e) => setFormData({...formData, nombre: e.target.value})}
                  className="perfil-mi-cuenta-page__input"
                  placeholder="Ingresa tu nombre completo"
                />
              </div>

              <div className="perfil-mi-cuenta-page__form-group">
                <label className="perfil-mi-cuenta-page__label">
                  Teléfono
                </label>
                <Input
                  type="tel"
                  value={formData.telefono}
                  onChange={(e) => setFormData({...formData, telefono: e.target.value})}
                  className="perfil-mi-cuenta-page__input"
                  placeholder="+1 (305) 555-0123"
                />
              </div>
            </div>

            <div className="perfil-mi-cuenta-page__form-row">
              <div className="perfil-mi-cuenta-page__form-group">
                <label className="perfil-mi-cuenta-page__label">
                  Correo electrónico
                </label>
                <Input
                  type="email"
                  value={formData.correo}
                  onChange={(e) => setFormData({...formData, correo: e.target.value})}
                  className="perfil-mi-cuenta-page__input"
                  placeholder="tu@correo.com"
                />
              </div>

              <div className="perfil-mi-cuenta-page__form-group">
                <label className="perfil-mi-cuenta-page__label">
                  Correo de recuperación
                </label>
                <Input
                  type="email"
                  value={formData.correoRecuperacion}
                  onChange={(e) => setFormData({...formData, correoRecuperacion: e.target.value})}
                  className="perfil-mi-cuenta-page__input"
                  placeholder="correo.recuperacion@ejemplo.com"
                />
              </div>
            </div>

            <div className="perfil-mi-cuenta-page__form-group perfil-mi-cuenta-page__form-group--full">
              <label className="perfil-mi-cuenta-page__label">
                Dirección
              </label>
              <Input
                type="text"
                value={formData.direccion}
                onChange={(e) => setFormData({...formData, direccion: e.target.value})}
                className="perfil-mi-cuenta-page__input"
                placeholder="Ingresa tu dirección completa"
              />
              <p className="perfil-mi-cuenta-page__help-text">
                El correo de recuperación se utilizará para recuperar tu cuenta en caso de olvidar tu contraseña
              </p>
            </div>

            <div className="perfil-mi-cuenta-page__form-actions">
              <Button
                onClick={handleSave}
                className="perfil-mi-cuenta-page__save-button"
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
