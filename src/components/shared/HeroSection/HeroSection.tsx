import { Button } from '@/components/ui/button';
import './HeroSection.scss';

interface HeroSectionProps {
  title: string;
  subtitle: string;
  ctaPrimary: string;
  ctaSecondary: string;
  onPrimaryClick: () => void;
  onSecondaryClick: () => void;
}

export function HeroSection({
  title,
  subtitle,
  ctaPrimary,
  ctaSecondary,
  onPrimaryClick,
  onSecondaryClick,
}: HeroSectionProps) {
  return (
    <section className="hero-section">
      <div className="hero-section__container">
        <div className="hero-section__content">
          <h1 className="hero-section__title">{title}</h1>
          <p className="hero-section__subtitle">{subtitle}</p>
          <div className="hero-section__actions">
            <Button size="lg" onClick={onPrimaryClick} className="hero-section__cta-primary">
              {ctaPrimary}
            </Button>
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
