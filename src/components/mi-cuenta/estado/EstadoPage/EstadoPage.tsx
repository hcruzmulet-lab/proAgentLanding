'use client';

import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import './EstadoPage.scss';

type PlanType = 'plus' | 'master' | 'elite';
type BillingPeriod = 'monthly' | 'annual';

interface Plan {
  id: PlanType;
  name: string;
  price: {
    monthly: string;
    annual: string;
  };
  commission: string;
  features: string[];
}

const plans: Plan[] = [
  {
    id: 'plus',
    name: 'ProAgent Plus',
    price: {
      monthly: '$39',
      annual: '$390'
    },
    commission: '70/30',
    features: [
      'Motores: Hoteles, vuelos, traslados, paquetes, circuitos, trenes, actividades, seguros, esim',
      'Paquetes dinámicos y propios',
      'CRM incluido',
      'Inteligencia artificial incluida',
      'Constructor de planes a medida',
      'Marketing Pro: Recursos y herramientas',
      'Correo corporativo',
      'Microsite',
      'Academia ProAgent',
      'Soporte estándar'
    ]
  },
  {
    id: 'master',
    name: 'ProAgent Master',
    price: {
      monthly: '$99',
      annual: '$990'
    },
    commission: '80/20',
    features: [
      'Todo lo de Plus +',
      'Sport/Event + Renta de autos + Routing + Grupos',
      'Marketing Pro + Activación de campañas META',
      'Tu propia página web B2C',
      'Proveedores premium',
      'Soporte prioritario'
    ]
  },
  {
    id: 'elite',
    name: 'ProAgent Elite',
    price: {
      monthly: '$199',
      annual: '$1,990'
    },
    commission: '90/10',
    features: [
      'Todo lo de Master +',
      'Cruceros + Disney + LUJO',
      'Marketing Pro + Activación de campañas MULTICANAL',
      'Landing pages + Generador de QR ilimitado',
      'Proveedores premium + lujo',
      'Soporte VIP'
    ]
  }
];

// Mock data - en producción vendría de la API
const currentSubscription = {
  plan: 'plus' as PlanType,
  billingPeriod: 'monthly' as BillingPeriod,
  fechaInicio: '15/01/2024',
  proximaRenovacion: '15/02/2025',
  monto: '$39',
  estado: 'activa',
  cuotaActivacion: '$450'
};

export function EstadoPage() {
  const router = useRouter();
  const [showUpgrade, setShowUpgrade] = useState(false);

  const currentPlan = plans.find(p => p.id === currentSubscription.plan)!;
  const availableUpgrades = plans.filter(p => {
    const planOrder = ['plus', 'master', 'elite'];
    return planOrder.indexOf(p.id) > planOrder.indexOf(currentSubscription.plan);
  });

  const handleUpgrade = (planId: PlanType) => {
    // Aquí se redirigiría a la página de pago/upgrade
    router.push(`/suscripcion/planes?upgrade=${planId}`);
  };

  return (
    <div className="estado-page">
      <div className="estado-page__header">
        <h1 className="estado-page__title">Estado de Suscripción</h1>
        <p className="estado-page__subtitle">
          Consulta el estado de tu cuenta y suscripción
        </p>
      </div>

      <div className="estado-page__content">
        {/* Resumen de Suscripción Actual */}
        <Card className="estado-page__summary-card">
          <div className="estado-page__summary-header">
            <div>
              <h2 className="estado-page__summary-title">Suscripción Actual</h2>
              <p className="estado-page__summary-plan">{currentPlan.name}</p>
            </div>
            <span className={`estado-page__status-badge estado-page__status-badge--${currentSubscription.estado}`}>
              {currentSubscription.estado === 'activa' ? 'Activa' : 'Inactiva'}
            </span>
          </div>

          <div className="estado-page__summary-details">
            <div className="estado-page__detail-item">
              <span className="estado-page__detail-label">
                <span className="material-symbols-outlined">calendar_today</span>
                Fecha de inicio
              </span>
              <span className="estado-page__detail-value">{currentSubscription.fechaInicio}</span>
            </div>

            <div className="estado-page__detail-item">
              <span className="estado-page__detail-label">
                <span className="material-symbols-outlined">event</span>
                Próxima renovación
              </span>
              <span className="estado-page__detail-value">{currentSubscription.proximaRenovacion}</span>
            </div>

            <div className="estado-page__detail-item">
              <span className="estado-page__detail-label">
                <span className="material-symbols-outlined">attach_money</span>
                Monto mensual
              </span>
              <span className="estado-page__detail-value estado-page__detail-value--price">
                {currentSubscription.monto}
                <span className="estado-page__detail-period">/mes</span>
              </span>
            </div>

            <div className="estado-page__detail-item">
              <span className="estado-page__detail-label">
                <span className="material-symbols-outlined">percent</span>
                Comisión / Split
              </span>
              <span className="estado-page__detail-value">{currentPlan.commission}</span>
            </div>

            <div className="estado-page__detail-item">
              <span className="estado-page__detail-label">
                <span className="material-symbols-outlined">payments</span>
                Cuota de activación
              </span>
              <span className="estado-page__detail-value">{currentSubscription.cuotaActivacion}</span>
            </div>
          </div>

          {availableUpgrades.length > 0 && (
            <div className="estado-page__upgrade-section">
              <Button
                onClick={() => setShowUpgrade(!showUpgrade)}
                className="estado-page__upgrade-button"
              >
                <span className="material-symbols-outlined">trending_up</span>
                {showUpgrade ? 'Ocultar' : 'Ver'} Planes de Upgrade
              </Button>
            </div>
          )}
        </Card>

        {/* Planes de Upgrade */}
        {showUpgrade && availableUpgrades.length > 0 && (
          <div className="estado-page__upgrade-plans">
            <h3 className="estado-page__upgrade-title">Planes Disponibles para Upgrade</h3>
            <div className="estado-page__plans-grid">
              {availableUpgrades.map((plan) => (
                <Card key={plan.id} className="estado-page__plan-card">
                  <div className="estado-page__plan-header">
                    <h4 className="estado-page__plan-name">{plan.name}</h4>
                    <div className="estado-page__plan-price">
                      <span className="estado-page__plan-price-amount">
                        {currentSubscription.billingPeriod === 'monthly' 
                          ? plan.price.monthly 
                          : plan.price.annual}
                      </span>
                      <span className="estado-page__plan-price-period">
                        /{currentSubscription.billingPeriod === 'monthly' ? 'mes' : 'año'}
                      </span>
                    </div>
                  </div>

                  <div className="estado-page__plan-commission">
                    <span className="estado-page__plan-commission-label">Comisión:</span>
                    <span className="estado-page__plan-commission-value">{plan.commission}</span>
                  </div>

                  <ul className="estado-page__plan-features">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="estado-page__plan-feature">
                        <span className="material-symbols-outlined">check_circle</span>
                        {feature}
                      </li>
                    ))}
                  </ul>

                  <Button
                    onClick={() => handleUpgrade(plan.id)}
                    className="estado-page__plan-upgrade-button"
                  >
                    Hacer Upgrade
                  </Button>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Características del Plan Actual */}
        <Card className="estado-page__features-card">
          <h3 className="estado-page__features-title">Características de tu Plan</h3>
          <ul className="estado-page__features-list">
            {currentPlan.features.map((feature, index) => (
              <li key={index} className="estado-page__feature-item">
                <span className="material-symbols-outlined">check_circle</span>
                {feature}
              </li>
            ))}
          </ul>
        </Card>
      </div>
    </div>
  );
}
