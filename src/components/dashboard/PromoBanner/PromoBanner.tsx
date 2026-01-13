'use client';

import Image from 'next/image';
import './PromoBanner.scss';

interface PromoBannerProps {
  title: string;
  subtitle: string;
  imageUrl: string;
  buttonText?: string;
  onButtonClick?: () => void;
  size?: 'large' | 'medium';
}

export function PromoBanner({
  title,
  subtitle,
  imageUrl,
  buttonText = 'Ver oferta',
  onButtonClick,
  size = 'medium',
}: PromoBannerProps) {
  return (
    <div className={`promo-banner promo-banner--${size}`} onClick={onButtonClick}>
      <Image
        src={imageUrl}
        alt={title}
        fill
        className="promo-banner__image"
        sizes="(max-width: 768px) 100vw, 50vw"
      />
      <div className="promo-banner__overlay" />
      <div className="promo-banner__content">
        <p className="promo-banner__subtitle">{subtitle}</p>
        <h3 className="promo-banner__title" dangerouslySetInnerHTML={{ __html: title }} />
      </div>
    </div>
  );
}
