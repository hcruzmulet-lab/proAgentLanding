'use client';

import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { LandingNavbar } from '@/components/layout/LandingNavbar';
import './SubscriptionConfirmation.scss';

export function SubscriptionConfirmation() {
  const router = useRouter();

  const handleGoToAccount = () => {
    router.push('/login');
  };

  return (
    <div className="subscription-confirmation">
      {/* Navbar */}
      <LandingNavbar />

      {/* Main Container */}
      <div className="subscription-confirmation__container">
        {/* Card */}
        <div className="subscription-confirmation__card">
          <div className="subscription-confirmation__content">
            {/* Success Icon */}
            <div className="subscription-confirmation__icon-wrapper">
              <span className="material-symbols-outlined subscription-confirmation__icon">
                check_circle
              </span>
            </div>

            {/* Message */}
            <div className="subscription-confirmation__message">
              <h1 className="subscription-confirmation__title">
                ¡Solicitud de suscripción en revisión!
              </h1>
              <p className="subscription-confirmation__description">
                Hemos recibido tu solicitud y la estamos evaluando.
                <br />
                Te daremos respuesta en las próximas 48 horas.
              </p>
            </div>

            {/* Button */}
            <div className="subscription-confirmation__actions">
              <Button
                className="subscription-confirmation__button"
                onClick={handleGoToAccount}
              >
                Ir a Mi Cuenta
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
