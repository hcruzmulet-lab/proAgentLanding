'use client';

import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import './OnboardingPage.scss';

interface OnboardingStep {
  id: number;
  title: string;
  description: string;
  estado: 'completado' | 'en_progreso' | 'pendiente';
  icon: string;
  imageUrl: string;
  action?: {
    label: string;
    href?: string;
    onClick?: () => void;
  };
}

const onboardingSteps: OnboardingStep[] = [
  {
    id: 1,
    title: 'Ver el video de bienvenida',
    description: 'Introducción a ProAgent, su visión y cómo aprovechar la plataforma desde el primer día.',
    estado: 'pendiente',
    icon: 'play_circle',
    imageUrl: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=400&fit=crop',
    action: {
      label: 'Ver Video',
      onClick: () => console.log('Abrir video de bienvenida')
    }
  },
  {
    id: 2,
    title: 'Agendar una llamada inicial con el equipo ProAgent',
    description: 'Sesión guiada para la explicación general de la plataforma, flujo de trabajo y resolución de dudas.',
    estado: 'pendiente',
    icon: 'phone_in_talk',
    imageUrl: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=800&h=400&fit=crop',
    action: {
      label: 'Agendar Llamada',
      onClick: () => console.log('Agendar llamada')
    }
  },
  {
    id: 3,
    title: 'Completar la sesión de "Imprescindibles" de la Academia',
    description: 'Contenidos clave para entender el sistema, los productos y las bases para comenzar a vender.',
    estado: 'pendiente',
    icon: 'school',
    imageUrl: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&h=400&fit=crop',
    action: {
      label: 'Ir a Imprescindibles',
      href: '/academia/imprescindibles'
    }
  },
  {
    id: 4,
    title: 'Realizar la primera reserva',
    description: 'Aplicación práctica del aprendizaje con acompañamiento, para comenzar a operar de forma real.',
    estado: 'pendiente',
    icon: 'airplane_ticket',
    imageUrl: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800&h=400&fit=crop',
    action: {
      label: 'Crear Reserva',
      href: '/crm/reservas'
    }
  }
];

export function OnboardingPage() {
  const router = useRouter();
  const [steps, setSteps] = useState<OnboardingStep[]>(onboardingSteps);

  const completedSteps = steps.filter(s => s.estado === 'completado').length;
  const totalSteps = steps.length;
  const progressPercentage = (completedSteps / totalSteps) * 100;

  const handleStepAction = (step: OnboardingStep) => {
    if (step.action?.href) {
      router.push(step.action.href);
    } else if (step.action?.onClick) {
      step.action.onClick();
    }
  };

  const getEstadoBadge = (estado: string) => {
    switch (estado) {
      case 'completado':
        return { text: 'Completado', className: 'onboarding-page__badge--completado' };
      case 'en_progreso':
        return { text: 'En Progreso', className: 'onboarding-page__badge--en-progreso' };
      case 'pendiente':
        return { text: 'Pendiente', className: 'onboarding-page__badge--pendiente' };
      default:
        return { text: estado, className: '' };
    }
  };

  return (
    <div className="onboarding-page">
      <div className="onboarding-page__header">
        <div>
          <h1 className="onboarding-page__title">Onboarding Inicial ProAgent</h1>
          <p className="onboarding-page__subtitle">
            Completa estos pasos para comenzar a utilizar la plataforma de manera efectiva
          </p>
        </div>
      </div>

      <div className="onboarding-page__content">
        {/* Progress Overview */}
        <Card className="onboarding-page__progress-card">
          <div className="onboarding-page__progress-header">
            <div>
              <h2 className="onboarding-page__progress-title">Progreso del Onboarding</h2>
              <p className="onboarding-page__progress-subtitle">
                {completedSteps} de {totalSteps} pasos completados
              </p>
            </div>
            <div className="onboarding-page__progress-percentage">
              {Math.round(progressPercentage)}%
            </div>
          </div>
          <div className="onboarding-page__progress-bar-container">
            <div 
              className="onboarding-page__progress-bar-fill"
              style={{ width: `${progressPercentage}%` }}
            ></div>
          </div>
        </Card>

        {/* Steps List */}
        <div className="onboarding-page__steps-list">
          {steps.map((step, index) => {
            const estadoBadge = getEstadoBadge(step.estado);
            const isCompleted = step.estado === 'completado';
            const isInProgress = step.estado === 'en_progreso';
            
            return (
              <Card key={step.id} className={`onboarding-page__step-card ${isCompleted ? 'onboarding-page__step-card--completed' : ''}`}>
                <div className="onboarding-page__step-content">
                  {/* Step Image */}
                  <div className="onboarding-page__step-image-wrapper">
                    <img
                      src={step.imageUrl}
                      alt={step.title}
                      className="onboarding-page__step-image"
                    />
                  </div>

                  {/* Step Content */}
                  <div className="onboarding-page__step-main">
                    {/* Step Number and Icon */}
                    <div className="onboarding-page__step-header">
                      <div className="onboarding-page__step-number-wrapper">
                        {isCompleted ? (
                          <span className="material-symbols-outlined onboarding-page__step-check">
                            check_circle
                          </span>
                        ) : (
                          <span className="onboarding-page__step-number">{step.id}</span>
                        )}
                      </div>
                      <div className="onboarding-page__step-icon-wrapper">
                        <span className={`material-symbols-outlined onboarding-page__step-icon onboarding-page__step-icon--${step.estado}`}>
                          {step.icon}
                        </span>
                      </div>
                    </div>

                    {/* Step Info */}
                    <div className="onboarding-page__step-info">
                    <div className="onboarding-page__step-title-row">
                      <h3 className="onboarding-page__step-title">{step.title}</h3>
                      <span className={`onboarding-page__badge ${estadoBadge.className}`}>
                        {estadoBadge.text}
                      </span>
                    </div>
                    <p className="onboarding-page__step-description">{step.description}</p>

                    {/* Action Button */}
                    {step.action && !isCompleted && (
                      <Button
                        onClick={() => handleStepAction(step)}
                        className="onboarding-page__step-action"
                        variant={isInProgress ? 'default' : 'outline'}
                      >
                        {step.action.label}
                      </Button>
                    )}
                    </div>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
}
