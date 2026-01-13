'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { LandingNavbar } from '@/components/layout/LandingNavbar';
import './SubscriptionPlans.scss';

type BillingPeriod = 'monthly' | 'annual';
type PlanType = 'plus' | 'master' | 'elite';

export function SubscriptionPlans() {
  const router = useRouter();
  const [billingPeriod, setBillingPeriod] = useState<BillingPeriod>('monthly');
  const [selectedPlan, setSelectedPlan] = useState<PlanType | null>(null);

  const handleBack = () => {
    router.push('/suscripcion/paso-3');
  };

  const handleSelectPlan = (plan: PlanType) => {
    setSelectedPlan(plan);
    // TODO: Pass selected plan data to payment page
    router.push('/suscripcion/pago');
  };

  const handleLogin = () => {
    router.push('/login');
  };

  const handleJoin = () => {
    router.push('/suscripcion');
  };

  // Precios según período de facturación
  const prices = {
    monthly: {
      plus: '$39',
      master: '$99',
      elite: '$199',
    },
    annual: {
      plus: '$390',
      master: '$990',
      elite: '$1,990',
    },
  };

  const currentPrices = prices[billingPeriod];

  return (
    <div className="subscription-plans">
      {/* Navbar */}
      <LandingNavbar onLoginClick={handleLogin} onJoinClick={handleJoin} />

      {/* Main Container */}
      <div className="subscription-plans__container">
        {/* Card */}
        <div className="subscription-plans__card">
          {/* Header */}
          <div className="subscription-plans__header">
            <h1 className="subscription-plans__title">Planes de Suscripción</h1>
            
            {/* Billing Period Tabs */}
            <div className="subscription-plans__tabs">
              <button
                className={`subscription-plans__tab ${billingPeriod === 'monthly' ? 'subscription-plans__tab--active' : ''}`}
                onClick={() => setBillingPeriod('monthly')}
              >
                Mensual
              </button>
              <button
                className={`subscription-plans__tab ${billingPeriod === 'annual' ? 'subscription-plans__tab--active' : ''}`}
                onClick={() => setBillingPeriod('annual')}
              >
                Anual
              </button>
            </div>
          </div>

          {/* Pricing Table */}
          <div className="subscription-plans__table-wrapper">
            <table className="subscription-plans__table">
              <thead>
                <tr className="subscription-plans__table-header-row">
                  <th className="subscription-plans__table-header">Características</th>
                  <th className="subscription-plans__table-header">ProAgent Plus</th>
                  <th className="subscription-plans__table-header">ProAgent Master</th>
                  <th className="subscription-plans__table-header">ProAgent Elite</th>
                </tr>
              </thead>
              <tbody>
                {/* Precio */}
                <tr>
                  <td className="subscription-plans__table-cell subscription-plans__table-cell--label">Valor USD</td>
                  <td className="subscription-plans__table-cell subscription-plans__table-cell--price">{currentPrices.plus}</td>
                  <td className="subscription-plans__table-cell subscription-plans__table-cell--price">{currentPrices.master}</td>
                  <td className="subscription-plans__table-cell subscription-plans__table-cell--price">{currentPrices.elite}</td>
                </tr>
                
                {/* Comisión */}
                <tr>
                  <td className="subscription-plans__table-cell subscription-plans__table-cell--label">*Comisión / Split</td>
                  <td className="subscription-plans__table-cell">70/30</td>
                  <td className="subscription-plans__table-cell">80/20**</td>
                  <td className="subscription-plans__table-cell">90/10**</td>
                </tr>
                
                {/* Motores integrados */}
                <tr>
                  <td className="subscription-plans__table-cell subscription-plans__table-cell--label">Motores integrados</td>
                  <td className="subscription-plans__table-cell subscription-plans__table-cell--small">paquetes, circuitos, trenes, actividades, seguros , esim</td>
                  <td className="subscription-plans__table-cell subscription-plans__table-cell--small">Igual ProAgent Plus + sport/event+renta de autos+routing+grupos</td>
                  <td className="subscription-plans__table-cell subscription-plans__table-cell--small">Igual ProAgent Master+ Cruceros+Disney+LUJO</td>
                </tr>
                
                {/* Paquetes */}
                <tr>
                  <td className="subscription-plans__table-cell subscription-plans__table-cell--label">Paquetes</td>
                  <td className="subscription-plans__table-cell">Dinámicos+Propios</td>
                  <td className="subscription-plans__table-cell">Igual</td>
                  <td className="subscription-plans__table-cell">Igual</td>
                </tr>
                
                {/* CRM */}
                <tr>
                  <td className="subscription-plans__table-cell subscription-plans__table-cell--label">CRM</td>
                  <td className="subscription-plans__table-cell">incluido</td>
                  <td className="subscription-plans__table-cell">incluido</td>
                  <td className="subscription-plans__table-cell">incluido</td>
                </tr>
                
                {/* IA */}
                <tr>
                  <td className="subscription-plans__table-cell subscription-plans__table-cell--label">Inteligencia artificial</td>
                  <td className="subscription-plans__table-cell">incluido</td>
                  <td className="subscription-plans__table-cell">incluido</td>
                  <td className="subscription-plans__table-cell">incluido</td>
                </tr>
                
                {/* Constructor de planes */}
                <tr>
                  <td className="subscription-plans__table-cell subscription-plans__table-cell--label">Constructor de planes a medidas</td>
                  <td className="subscription-plans__table-cell">incluido</td>
                  <td className="subscription-plans__table-cell">incluido</td>
                  <td className="subscription-plans__table-cell">incluido</td>
                </tr>
                
                {/* Marketing Pro */}
                <tr>
                  <td className="subscription-plans__table-cell subscription-plans__table-cell--label">Marketing Pro</td>
                  <td className="subscription-plans__table-cell subscription-plans__table-cell--small">Recursos y herramientas</td>
                  <td className="subscription-plans__table-cell subscription-plans__table-cell--small">Recursos y herramientas + Activación de campañas META</td>
                  <td className="subscription-plans__table-cell subscription-plans__table-cell--small">Recursos y herramientas + Activación de campañas MULTICANAL</td>
                </tr>
                
                {/* Correo corporativo */}
                <tr>
                  <td className="subscription-plans__table-cell subscription-plans__table-cell--label">Correo corporativo</td>
                  <td className="subscription-plans__table-cell">incluido</td>
                  <td className="subscription-plans__table-cell">incluido</td>
                  <td className="subscription-plans__table-cell">incluido</td>
                </tr>
                
                {/* Página web */}
                <tr>
                  <td className="subscription-plans__table-cell subscription-plans__table-cell--label">Página web</td>
                  <td className="subscription-plans__table-cell">Microsite</td>
                  <td className="subscription-plans__table-cell subscription-plans__table-cell--small">Tu propia página web B2C</td>
                  <td className="subscription-plans__table-cell subscription-plans__table-cell--small">+ Landing page+Generador de QR ilimitado.</td>
                </tr>
                
                {/* Academia */}
                <tr>
                  <td className="subscription-plans__table-cell subscription-plans__table-cell--label">Academia ProAgent</td>
                  <td className="subscription-plans__table-cell">incluido</td>
                  <td className="subscription-plans__table-cell">incluido</td>
                  <td className="subscription-plans__table-cell">incluido</td>
                </tr>
                
                {/* Proveedores */}
                <tr>
                  <td className="subscription-plans__table-cell subscription-plans__table-cell--label">Proveedores</td>
                  <td className="subscription-plans__table-cell subscription-plans__table-cell--small">Todos los del Motor principal+ Marketplace</td>
                  <td className="subscription-plans__table-cell subscription-plans__table-cell--small">Motor + Marketplace+Proveedores premium</td>
                  <td className="subscription-plans__table-cell subscription-plans__table-cell--small">Motor + Marketplace+Proveedores premium+lujo</td>
                </tr>
                
                {/* Soporte */}
                <tr>
                  <td className="subscription-plans__table-cell subscription-plans__table-cell--label">Soporte</td>
                  <td className="subscription-plans__table-cell">Estándar</td>
                  <td className="subscription-plans__table-cell">Prioritario</td>
                  <td className="subscription-plans__table-cell">VIP</td>
                </tr>
                
                {/* Cuota primer afiliación */}
                <tr>
                  <td className="subscription-plans__table-cell subscription-plans__table-cell--label subscription-plans__table-cell--red">Cuota primer afiliación</td>
                  <td className="subscription-plans__table-cell subscription-plans__table-cell--bold">$450</td>
                  <td className="subscription-plans__table-cell subscription-plans__table-cell--bold">$450</td>
                  <td className="subscription-plans__table-cell subscription-plans__table-cell--bold">$450</td>
                </tr>
                
                {/* Botones */}
                <tr>
                  <td className="subscription-plans__table-cell"></td>
                  <td className="subscription-plans__table-cell subscription-plans__table-cell--button">
                    <Button
                      className="subscription-plans__select-button"
                      onClick={() => handleSelectPlan('plus')}
                    >
                      Seleccionar
                    </Button>
                  </td>
                  <td className="subscription-plans__table-cell subscription-plans__table-cell--button">
                    <Button
                      className="subscription-plans__select-button"
                      onClick={() => handleSelectPlan('master')}
                    >
                      Seleccionar
                    </Button>
                  </td>
                  <td className="subscription-plans__table-cell subscription-plans__table-cell--button">
                    <Button
                      className="subscription-plans__select-button"
                      onClick={() => handleSelectPlan('elite')}
                    >
                      Seleccionar
                    </Button>
                  </td>
                </tr>
              </tbody>
            </table>
            
            {/* Footnotes */}
            <div className="subscription-plans__footnotes">
              <p>* Comisión más alta para el agente.</p>
              <p>** El split no se activa de forma automática.</p>
            </div>
          </div>

          {/* Back Button */}
          <div className="subscription-plans__actions">
            <Button
              variant="outline"
              className="subscription-plans__back-button"
              onClick={handleBack}
            >
              Regresar
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
