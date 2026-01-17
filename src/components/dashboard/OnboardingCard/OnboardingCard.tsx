'use client';

import Image from 'next/image';
import { useRouter, usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import './OnboardingCard.scss';

interface OnboardingCardProps {
  currentStep?: number;
  totalSteps?: number;
  imageUrl?: string;
  onContinue?: () => void;
}

export function OnboardingCard({
  currentStep = 1,
  totalSteps = 4,
  imageUrl = 'https://res.cloudinary.com/ddagvoaq2/image/upload/v1768254512/onboarding_wihgic.png',
  onContinue,
}: OnboardingCardProps) {
  const router = useRouter();
  const pathname = usePathname();

  const handleContinue = () => {
    if (onContinue) {
      onContinue();
    } else {
      // Obtener el locale actual de la URL
      const locale = pathname.split('/')[1] || 'es';
      router.push(`/${locale}/onboarding`);
    }
  };

  return (
    <div className="onboarding-card">
      {/* Image Section */}
      <div className="onboarding-card__image-section">
        <Image
          src={imageUrl}
          alt="Onboarding"
          fill
          className="onboarding-card__image"
          sizes="50vw"
        />
        <div className="onboarding-card__overlay" />
        <div className="onboarding-card__image-content">
          <span className="onboarding-card__badge">Onboarding</span>
          <div className="onboarding-card__progress">
            <span className="onboarding-card__step">Paso {currentStep} de {totalSteps}</span>
            <div className="onboarding-card__dots">
              {Array.from({ length: totalSteps }).map((_, index) => (
                <span
                  key={index}
                  className={`onboarding-card__dot ${index < currentStep ? 'onboarding-card__dot--active' : ''}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="onboarding-card__content">
        <h3 className="onboarding-card__title">Conoce la plataforma</h3>
        <p className="onboarding-card__description">
          Te guiaremos para que conozcas la plataforma, aprendas herramientas y puedas empezar a vender.
        </p>
        <Button onClick={handleContinue} className="onboarding-card__button">
          Empezar
        </Button>
      </div>
    </div>
  );
}
