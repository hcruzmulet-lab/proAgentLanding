'use client';

import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import './SeguridadPage.scss';

export function SeguridadPage() {
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const [is2FAEnabled, setIs2FAEnabled] = useState(false);
  const [show2FASetup, setShow2FASetup] = useState(false);
  const [twoFactorCode, setTwoFactorCode] = useState('');

  const handlePasswordChange = () => {
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      alert('Las contraseñas no coinciden');
      return;
    }
    if (passwordData.newPassword.length < 8) {
      alert('La contraseña debe tener al menos 8 caracteres');
      return;
    }
    // Aquí se guardaría la nueva contraseña
    console.log('Cambiando contraseña...');
    setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
    alert('Contraseña actualizada correctamente');
  };

  const handle2FAToggle = () => {
    if (!is2FAEnabled) {
      // Activar 2FA - mostrar configuración
      setShow2FASetup(true);
    } else {
      // Desactivar 2FA
      if (confirm('¿Estás seguro de que deseas desactivar el segundo factor de autenticación?')) {
        setIs2FAEnabled(false);
        setShow2FASetup(false);
        setTwoFactorCode('');
      }
    }
  };

  const handle2FASetup = () => {
    if (twoFactorCode.length !== 6) {
      alert('El código debe tener 6 dígitos');
      return;
    }
    // Aquí se verificaría el código y se activaría el 2FA
    setIs2FAEnabled(true);
    setShow2FASetup(false);
    setTwoFactorCode('');
    alert('Segundo factor de autenticación activado correctamente');
  };

  return (
    <div className="seguridad-page">
      <div className="seguridad-page__header">
        <h1 className="seguridad-page__title">Seguridad</h1>
        <p className="seguridad-page__subtitle">
          Gestiona la seguridad de tu cuenta y contraseña
        </p>
      </div>

      <div className="seguridad-page__content">
        {/* Cambio de Contraseña */}
        <Card className="seguridad-page__section-card">
          <div className="seguridad-page__section-header">
            <div>
              <h2 className="seguridad-page__section-title">Cambiar Contraseña</h2>
              <p className="seguridad-page__section-description">
                Actualiza tu contraseña para mantener tu cuenta segura
              </p>
            </div>
            <span className="material-symbols-outlined seguridad-page__section-icon">
              lock
            </span>
          </div>

          <div className="seguridad-page__form">
            <div className="seguridad-page__form-group">
              <Label htmlFor="currentPassword" className="seguridad-page__form-label">
                Contraseña actual
              </Label>
              <Input
                id="currentPassword"
                type="password"
                value={passwordData.currentPassword}
                onChange={(e) => setPasswordData({...passwordData, currentPassword: e.target.value})}
                placeholder="Ingresa tu contraseña actual"
                className="seguridad-page__form-input"
              />
            </div>

            <div className="seguridad-page__form-group">
              <Label htmlFor="newPassword" className="seguridad-page__form-label">
                Nueva contraseña
              </Label>
              <Input
                id="newPassword"
                type="password"
                value={passwordData.newPassword}
                onChange={(e) => setPasswordData({...passwordData, newPassword: e.target.value})}
                placeholder="Ingresa tu nueva contraseña"
                className="seguridad-page__form-input"
              />
              <p className="seguridad-page__form-hint">
                Mínimo 8 caracteres, incluye mayúsculas, minúsculas, números y símbolos
              </p>
            </div>

            <div className="seguridad-page__form-group">
              <Label htmlFor="confirmPassword" className="seguridad-page__form-label">
                Confirmar nueva contraseña
              </Label>
              <Input
                id="confirmPassword"
                type="password"
                value={passwordData.confirmPassword}
                onChange={(e) => setPasswordData({...passwordData, confirmPassword: e.target.value})}
                placeholder="Confirma tu nueva contraseña"
                className="seguridad-page__form-input"
              />
            </div>

            <Button
              onClick={handlePasswordChange}
              className="seguridad-page__save-button"
              disabled={!passwordData.currentPassword || !passwordData.newPassword || !passwordData.confirmPassword}
            >
              Cambiar Contraseña
            </Button>
          </div>
        </Card>

        {/* Segundo Factor de Autenticación */}
        <Card className="seguridad-page__section-card">
          <div className="seguridad-page__section-header">
            <div>
              <h2 className="seguridad-page__section-title">Segundo Factor de Autenticación</h2>
              <p className="seguridad-page__section-description">
                Agrega una capa adicional de seguridad a tu cuenta
              </p>
            </div>
            <span className="material-symbols-outlined seguridad-page__section-icon">
              security
            </span>
          </div>

          <div className="seguridad-page__2fa-content">
            <div className="seguridad-page__2fa-toggle-section">
              <div className="seguridad-page__2fa-info">
                <h3 className="seguridad-page__2fa-title">Autenticación de dos factores (2FA)</h3>
                <p className="seguridad-page__2fa-description">
                  Cuando esté activado, necesitarás ingresar un código de verificación además de tu contraseña al iniciar sesión.
                </p>
              </div>
              <label className="seguridad-page__toggle">
                <input
                  type="checkbox"
                  checked={is2FAEnabled}
                  onChange={handle2FAToggle}
                  className="seguridad-page__toggle-input"
                />
                <span className="seguridad-page__toggle-slider"></span>
              </label>
            </div>

            {show2FASetup && !is2FAEnabled && (
              <div className="seguridad-page__2fa-setup">
                <div className="seguridad-page__2fa-setup-header">
                  <h4 className="seguridad-page__2fa-setup-title">Configurar 2FA</h4>
                  <button
                    onClick={() => setShow2FASetup(false)}
                    className="seguridad-page__2fa-setup-close"
                  >
                    <span className="material-symbols-outlined">close</span>
                  </button>
                </div>
                
                <div className="seguridad-page__2fa-setup-content">
                  <p className="seguridad-page__2fa-setup-description">
                    1. Escanea el código QR con tu aplicación de autenticación (Google Authenticator, Authy, etc.)
                  </p>
                  <div className="seguridad-page__2fa-qr-placeholder">
                    <span className="material-symbols-outlined">qr_code</span>
                    <p>Código QR aparecerá aquí</p>
                  </div>
                  <p className="seguridad-page__2fa-setup-description">
                    2. Ingresa el código de 6 dígitos generado por tu aplicación
                  </p>
                  <div className="seguridad-page__form-group">
                    <Input
                      type="text"
                      value={twoFactorCode}
                      onChange={(e) => setTwoFactorCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                      placeholder="000000"
                      maxLength={6}
                      className="seguridad-page__2fa-code-input"
                    />
                  </div>
                  <div className="seguridad-page__2fa-setup-actions">
                    <Button
                      variant="outline"
                      onClick={() => {
                        setShow2FASetup(false);
                        setTwoFactorCode('');
                      }}
                      className="seguridad-page__2fa-cancel"
                    >
                      Cancelar
                    </Button>
                    <Button
                      onClick={handle2FASetup}
                      className="seguridad-page__2fa-activate"
                      disabled={twoFactorCode.length !== 6}
                    >
                      Activar 2FA
                    </Button>
                  </div>
                </div>
              </div>
            )}

            {is2FAEnabled && (
              <div className="seguridad-page__2fa-status">
                <div className="seguridad-page__2fa-status-content">
                  <span className="material-symbols-outlined seguridad-page__2fa-status-icon">
                    check_circle
                  </span>
                  <div>
                    <p className="seguridad-page__2fa-status-title">2FA Activado</p>
                    <p className="seguridad-page__2fa-status-description">
                      El segundo factor de autenticación está activo en tu cuenta
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
}
