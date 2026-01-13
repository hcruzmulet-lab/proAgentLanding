'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { LandingNavbar } from '@/components/layout/LandingNavbar';
import './SubscriptionStep3.scss';

export function SubscriptionStep3() {
  const router = useRouter();
  const [motivation, setMotivation] = useState('');

  const handleBack = () => {
    router.push('/suscripcion/paso-2');
  };

  const handleContinue = () => {
    // TODO: Validate and submit all subscription data
    router.push('/dashboard');
  };

  const handleLogin = () => {
    router.push('/login');
  };

  const handleJoin = () => {
    router.push('/suscripcion');
  };

  return (
    <div className="subscription-step3">
      {/* Navbar */}
      <LandingNavbar onLoginClick={handleLogin} onJoinClick={handleJoin} />

      {/* Main Container */}
      <div className="subscription-step3__container">
        {/* Card */}
        <div className="subscription-step3__card">
          {/* Header */}
          <div className="subscription-step3__header">
            <h2 className="subscription-step3__title">Paso 3 de 3</h2>
            <p className="subscription-step3__subtitle">Alineación y compromiso</p>
          </div>

          {/* Progress Bar */}
          <div className="subscription-step3__progress">
            <div className="subscription-step3__progress-bar subscription-step3__progress-bar--complete" />
            <div className="subscription-step3__progress-bar subscription-step3__progress-bar--complete" />
            <div className="subscription-step3__progress-bar subscription-step3__progress-bar--active" />
          </div>

          {/* Question Section */}
          <div className="subscription-step3__section">
            <label htmlFor="motivation" className="subscription-step3__label">
              En tus propias palabras, ¿por qué crees que ProAgent puede ser una buena opción para ti y por qué deberíamos tenerte en cuenta dentro de nuestra red?
            </label>
            <textarea
              id="motivation"
              className="subscription-step3__textarea"
              placeholder="Ingresa tu respuesta"
              value={motivation}
              onChange={(e) => setMotivation(e.target.value)}
              rows={8}
            />
            <p className="subscription-step3__help-text">
              Esta pregunta nos permite conocerte mejor, entender tu motivación y asegurarnos de que ProAgent sea una buena decisión tanto para ti como para la comunidad.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="subscription-step3__actions">
            <Button
              variant="outline"
              className="subscription-step3__button subscription-step3__button--back"
              onClick={handleBack}
            >
              Regresar
            </Button>
            <Button
              className="subscription-step3__button subscription-step3__button--continue"
              onClick={handleContinue}
            >
              Continuar
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
