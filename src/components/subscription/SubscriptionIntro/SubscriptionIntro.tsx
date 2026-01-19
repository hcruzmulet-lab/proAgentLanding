'use client';

import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { LandingNavbar } from '@/components/layout/LandingNavbar';
import './SubscriptionIntro.scss';

interface SubscriptionIntroProps {
  onStart?: () => void;
}

export function SubscriptionIntro({ onStart }: SubscriptionIntroProps) {
  const t = useTranslations('subscription');
  const router = useRouter();

  const handleStart = () => {
    if (onStart) {
      onStart();
    } else {
      router.push('/suscripcion/paso-1');
    }
  };

  return (
    <div className="subscription-intro">
      {/* Navbar */}
      <LandingNavbar />

      {/* Main Content */}
      <div className="subscription-intro__container">
        <div className="subscription-intro__card">
          {/* Left side - Image */}
          <div className="subscription-intro__image-wrapper">
            <Image
              src="https://res.cloudinary.com/ddagvoaq2/image/upload/v1768254512/onboarding_wihgic.png"
              alt="ProAgent Subscription"
              fill
              className="subscription-intro__image"
              priority
              sizes="(max-width: 768px) 100vw, 400px"
            />
          </div>

          {/* Right side - Content */}
          <div className="subscription-intro__content">
            <div className="subscription-intro__header">
              <p className="subscription-intro__label">{t('label')}</p>
              <h1 className="subscription-intro__title">{t('title')}</h1>
            </div>

            <p className="subscription-intro__description">{t('description')}</p>

            <Button 
              onClick={handleStart} 
              className="subscription-intro__button"
            >
              {t('startButton')}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
