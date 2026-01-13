import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Icon from '@mdi/react';
import { mdiCheck } from '@mdi/js';
import './PricingCard.scss';

interface PricingCardProps {
  name: string;
  price: string;
  period?: string;
  features: string[];
  highlighted?: boolean;
  onSelectPlan: () => void;
  ctaText: string;
}

export function PricingCard({
  name,
  price,
  period,
  features,
  highlighted,
  onSelectPlan,
  ctaText,
}: PricingCardProps) {
  return (
    <Card className={`pricing-card ${highlighted ? 'pricing-card--highlighted' : ''}`}>
      <CardHeader>
        <CardTitle className="pricing-card__name">{name}</CardTitle>
        <div className="pricing-card__price-wrapper">
          <span className="pricing-card__price">{price}</span>
          {period && <span className="pricing-card__period">{period}</span>}
        </div>
      </CardHeader>
      <CardContent>
        <ul className="pricing-card__features">
          {features.map((feature, index) => (
            <li key={index} className="pricing-card__feature">
              <Icon path={mdiCheck} size={0.8} className="pricing-card__check" />
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      </CardContent>
      <CardFooter>
        <Button
          onClick={onSelectPlan}
          variant={highlighted ? 'default' : 'outline'}
          size="lg"
          className="pricing-card__cta"
        >
          {ctaText}
        </Button>
      </CardFooter>
    </Card>
  );
}
