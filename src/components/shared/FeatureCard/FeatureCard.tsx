import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
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
          <span 
            className="material-symbols-outlined feature-card__icon"
            style={{ 
              fontSize: '64px',
              width: '64px',
              height: '64px'
            }}
          >
            {icon}
          </span>
        </div>
        <CardTitle className="feature-card__title">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="feature-card__description">{description}</p>
      </CardContent>
    </Card>
  );
}
