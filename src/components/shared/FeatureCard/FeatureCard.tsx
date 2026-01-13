import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import Icon from '@mdi/react';
import './FeatureCard.scss';

interface FeatureCardProps {
  icon: string;
  title: string;
  description: string;
}

export function FeatureCard({ icon, title, description }: FeatureCardProps) {
  return (
    <Card className="feature-card">
      <CardHeader>
        <div className="feature-card__icon-wrapper">
          <Icon path={icon} size={2} className="feature-card__icon" />
        </div>
        <CardTitle className="feature-card__title">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="feature-card__description">{description}</p>
      </CardContent>
    </Card>
  );
}
