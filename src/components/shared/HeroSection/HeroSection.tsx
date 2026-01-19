import Image from 'next/image';
import { Button } from '@/components/ui/button';
import './HeroSection.scss';

interface HeroSectionProps {
  title: string;
  subtitle: string;
  ctaSecondary: string;
  onSecondaryClick: () => void;
}

export function HeroSection({
  title,
  subtitle,
  ctaSecondary,
  onSecondaryClick,
}: HeroSectionProps) {
  return (
    <section className="hero-section">
      <div className="hero-section__background">
        <Image
          src="https://res.cloudinary.com/ddagvoaq2/image/upload/v1768503047/laptop-phone-call-remote-work-with-man-coffee-shop-communication-networking-computer-conversation-freelance-employee-cafe-restaurant-as-customer-hospitality-service_ntalsi.jpg"
          alt="Hombre feliz usando laptop en café"
          fill
          className="hero-section__background-image"
          priority
          unoptimized
        />
        <div className="hero-section__overlay" />
      </div>
      <div className="hero-section__container">
        <div className="hero-section__content">
          <h1 className="hero-section__title">{title}</h1>
          <p className="hero-section__subtitle">{subtitle}</p>
          <div className="hero-section__actions">
            <Button
              size="lg"
              variant="outline"
              onClick={onSecondaryClick}
              className="hero-section__cta-secondary"
            >
              {ctaSecondary}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
