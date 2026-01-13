import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import Icon from '@mdi/react';
import { mdiHandWave } from '@mdi/js';
import './WelcomeCard.scss';

interface WelcomeCardProps {
  userName: string;
  title: string;
  description: string;
}

export function WelcomeCard({ userName, title, description }: WelcomeCardProps) {
  return (
    <Card className="welcome-card">
      <CardHeader>
        <div className="welcome-card__header">
          <Icon path={mdiHandWave} size={2} className="welcome-card__icon" />
          <div>
            <CardTitle className="welcome-card__title">{title}</CardTitle>
            <CardDescription className="welcome-card__description">{description}</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <p className="welcome-card__greeting">{userName}</p>
      </CardContent>
    </Card>
  );
}
