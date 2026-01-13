'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { LandingNavbar } from '@/components/layout/LandingNavbar';
import './SubscriptionStep2.scss';

export function SubscriptionStep2() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    businessGoal: '',
    travelTypes: [] as string[],
    timeCommitment: '',
  });

  const handleBusinessGoalSelect = (goal: string) => {
    setFormData(prev => ({ ...prev, businessGoal: goal }));
  };

  const handleTravelTypeToggle = (type: string) => {
    setFormData(prev => ({
      ...prev,
      travelTypes: prev.travelTypes.includes(type)
        ? prev.travelTypes.filter(t => t !== type)
        : [...prev.travelTypes, type],
    }));
  };

  const handleTimeCommitmentSelect = (time: string) => {
    setFormData(prev => ({ ...prev, timeCommitment: time }));
  };

  const handleBack = () => {
    router.push('/suscripcion/paso-1');
  };

  const handleContinue = () => {
    // TODO: Validate and save data
    router.push('/suscripcion/paso-3');
  };

  const handleLogin = () => {
    router.push('/login');
  };

  const handleJoin = () => {
    router.push('/suscripcion');
  };

  const businessGoalOptions = [
    'Quiero crear mi propio negocio de viajes',
    'Quiero vender viajes bajo una marca reconocida',
    'Quiero aprender y luego decidir',
    'Quiero viajar más y acceder a mejores precios',
  ];

  const travelTypeOptions = [
    ['Hoteles', 'Paquetes todo incluido'],
    ['Vuelos', 'Circuitos y tours'],
    ['Cruceros', 'Viajes de lujo'],
    ['Grupos y viajes temáticos', 'Viajes familiares'],
  ];

  const timeCommitmentOptions = [
    '1 hora o menos al día',
    'Entre 1 y 4 horas al día',
    'Tiempo completo',
  ];

  return (
    <div className="subscription-step2">
      {/* Navbar */}
      <LandingNavbar onLoginClick={handleLogin} onJoinClick={handleJoin} />

      {/* Main Container */}
      <div className="subscription-step2__container">
        {/* Card */}
        <div className="subscription-step2__card">
          {/* Header */}
          <div className="subscription-step2__header">
            <h2 className="subscription-step2__title">Paso 2 de 3</h2>
            <p className="subscription-step2__subtitle">Enfoque, tiempo y expectativas</p>
          </div>

          {/* Progress Bar */}
          <div className="subscription-step2__progress">
            <div className="subscription-step2__progress-bar subscription-step2__progress-bar--complete" />
            <div className="subscription-step2__progress-bar subscription-step2__progress-bar--active" />
            <div className="subscription-step2__progress-bar subscription-step2__progress-bar--inactive" />
          </div>

          {/* Form Sections */}
          <div className="subscription-step2__form">
            {/* Question 1: Business Goal */}
            <div className="subscription-step2__section">
              <div className="subscription-step2__question-wrapper">
                <h3 className="subscription-step2__question">
                  ¿Cuál de estas opciones se acerca más a lo que te gustaría construir?
                </h3>
                <span className="material-symbols-outlined subscription-step2__info-icon">
                  info
                </span>
              </div>
              <div className="subscription-step2__options subscription-step2__options--vertical">
                {businessGoalOptions.map((option) => (
                  <button
                    key={option}
                    className={`subscription-step2__option ${
                      formData.businessGoal === option ? 'subscription-step2__option--selected' : ''
                    }`}
                    onClick={() => handleBusinessGoalSelect(option)}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>

            {/* Question 2: Travel Types */}
            <div className="subscription-step2__section">
              <div className="subscription-step2__question-wrapper">
                <h3 className="subscription-step2__question">
                  ¿Qué tipo de viajes o productos te gustaría vender principalmente?
                </h3>
                <span className="material-symbols-outlined subscription-step2__info-icon">
                  info
                </span>
              </div>
              <div className="subscription-step2__options subscription-step2__options--grid">
                {travelTypeOptions.map((row, rowIndex) => (
                  <div key={rowIndex} className="subscription-step2__options-row">
                    {row.map((option) => (
                      <button
                        key={option}
                        className={`subscription-step2__option subscription-step2__option--grid ${
                          formData.travelTypes.includes(option) ? 'subscription-step2__option--selected' : ''
                        }`}
                        onClick={() => handleTravelTypeToggle(option)}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                ))}
              </div>
            </div>

            {/* Question 3: Time Commitment */}
            <div className="subscription-step2__section">
              <div className="subscription-step2__question-wrapper">
                <h3 className="subscription-step2__question">
                  ¿Cuánto tiempo puedes dedicarle al día
                  <br />a tu proyecto de viajes?
                </h3>
                <span className="material-symbols-outlined subscription-step2__info-icon">
                  info
                </span>
              </div>
              <div className="subscription-step2__options subscription-step2__options--vertical">
                {timeCommitmentOptions.map((option) => (
                  <button
                    key={option}
                    className={`subscription-step2__option ${
                      formData.timeCommitment === option ? 'subscription-step2__option--selected' : ''
                    }`}
                    onClick={() => handleTimeCommitmentSelect(option)}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="subscription-step2__actions">
              <Button
                variant="outline"
                className="subscription-step2__button subscription-step2__button--back"
                onClick={handleBack}
              >
                Regresar
              </Button>
              <Button
                className="subscription-step2__button subscription-step2__button--continue"
                onClick={handleContinue}
              >
                Continuar
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
