'use client';

import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import './CertificadoPage.scss';

interface OnboardingStep {
  id: number;
  title: string;
  description: string;
  estado: 'completado' | 'en_progreso' | 'pendiente';
  progreso?: number;
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
    title: 'Completar la formación de la Academia ProAgent al 100%',
    description: 'Completa todos los cursos y lecciones disponibles en la Academia ProAgent para obtener el conocimiento necesario.',
    estado: 'en_progreso',
    progreso: 65,
    icon: 'school',
    imageUrl: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&h=400&fit=crop',
    action: {
      label: 'Ir a Academia',
      href: '/academia'
    }
  },
  {
    id: 2,
    title: 'Obtener la certificación en el Estándar de Atención al Cliente Azúcar',
    description: 'Aproba el examen de certificación sobre el Estándar de Atención al Cliente de Azúcar Travel.',
    estado: 'pendiente',
    icon: 'verified',
    imageUrl: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&h=400&fit=crop',
    action: {
      label: 'Iniciar Certificación',
      onClick: () => console.log('Iniciar certificación')
    }
  },
  {
    id: 3,
    title: 'Completar 3 sesiones de entrenamiento en ventas',
    description: 'Asiste y completa 3 sesiones de entrenamiento en técnicas de ventas con nuestro equipo.',
    estado: 'pendiente',
    icon: 'trending_up',
    imageUrl: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=800&h=400&fit=crop',
    action: {
      label: 'Ver Sesiones Disponibles',
      onClick: () => console.log('Ver sesiones')
    }
  },
  {
    id: 4,
    title: 'Realizar la primera reserva supervisada',
    description: 'Completa tu primera reserva bajo la supervisión de un mentor del equipo Azúcar Travel.',
    estado: 'pendiente',
    icon: 'airplane_ticket',
    imageUrl: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800&h=400&fit=crop',
    action: {
      label: 'Programar Reserva',
      onClick: () => console.log('Programar reserva')
    }
  },
  {
    id: 5,
    title: 'Reunión de aprobación final con el equipo Azúcar',
    description: 'Participa en la reunión final de aprobación con el equipo de Azúcar Travel para obtener tu certificación.',
    estado: 'pendiente',
    icon: 'groups',
    imageUrl: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=400&fit=crop',
    action: {
      label: 'Programar Reunión',
      onClick: () => console.log('Programar reunión')
    }
  }
];

export function CertificadoPage() {
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
        return { text: 'Completado', className: 'certificado-page__badge--completado' };
      case 'en_progreso':
        return { text: 'En Progreso', className: 'certificado-page__badge--en-progreso' };
      case 'pendiente':
        return { text: 'Pendiente', className: 'certificado-page__badge--pendiente' };
      default:
        return { text: estado, className: '' };
    }
  };

  return (
    <div className="certificado-page">
      <div className="certificado-page__header">
        <h1 className="certificado-page__title">Certificación Azúcar Travel</h1>
        <p className="certificado-page__subtitle">
          Completa todos los pasos del onboarding para obtener tu certificación
        </p>
      </div>

      <div className="certificado-page__content">
        {/* Progress Overview */}
        <Card className="certificado-page__progress-card">
          <div className="certificado-page__progress-header">
            <div>
              <h2 className="certificado-page__progress-title">Progreso del Onboarding</h2>
              <p className="certificado-page__progress-subtitle">
                {completedSteps} de {totalSteps} pasos completados
              </p>
            </div>
            <div className="certificado-page__progress-percentage">
              {Math.round(progressPercentage)}%
            </div>
          </div>
          <div className="certificado-page__progress-bar-container">
            <div 
              className="certificado-page__progress-bar-fill"
              style={{ width: `${progressPercentage}%` }}
            ></div>
          </div>
        </Card>

        {/* Steps List */}
        <div className="certificado-page__steps-list">
          {steps.map((step, index) => {
            const estadoBadge = getEstadoBadge(step.estado);
            const isCompleted = step.estado === 'completado';
            const isInProgress = step.estado === 'en_progreso';
            
            return (
              <Card key={step.id} className={`certificado-page__step-card ${isCompleted ? 'certificado-page__step-card--completed' : ''}`}>
                <div className="certificado-page__step-content">
                  {/* Step Image */}
                  <div className="certificado-page__step-image-wrapper">
                    <img
                      src={step.imageUrl}
                      alt={step.title}
                      className="certificado-page__step-image"
                    />
                  </div>

                  {/* Step Content */}
                  <div className="certificado-page__step-main">
                    {/* Step Number and Icon */}
                    <div className="certificado-page__step-header">
                      <div className="certificado-page__step-number-wrapper">
                        {isCompleted ? (
                          <span className="material-symbols-outlined certificado-page__step-check">
                            check_circle
                          </span>
                        ) : (
                          <span className="certificado-page__step-number">{step.id}</span>
                        )}
                      </div>
                      <div className="certificado-page__step-icon-wrapper">
                        <span className={`material-symbols-outlined certificado-page__step-icon certificado-page__step-icon--${step.estado}`}>
                          {step.icon}
                        </span>
                      </div>
                    </div>

                    {/* Step Info */}
                    <div className="certificado-page__step-info">
                    <div className="certificado-page__step-title-row">
                      <h3 className="certificado-page__step-title">{step.title}</h3>
                      <span className={`certificado-page__badge ${estadoBadge.className}`}>
                        {estadoBadge.text}
                      </span>
                    </div>
                    <p className="certificado-page__step-description">{step.description}</p>

                    {/* Progress Bar for in-progress steps */}
                    {isInProgress && step.progreso !== undefined && (
                      <div className="certificado-page__step-progress">
                        <div className="certificado-page__step-progress-bar">
                          <div 
                            className="certificado-page__step-progress-fill"
                            style={{ width: `${step.progreso}%` }}
                          ></div>
                        </div>
                        <span className="certificado-page__step-progress-text">{step.progreso}%</span>
                      </div>
                    )}

                    {/* Action Button */}
                    {step.action && !isCompleted && (
                      <Button
                        onClick={() => handleStepAction(step)}
                        className="certificado-page__step-action"
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
