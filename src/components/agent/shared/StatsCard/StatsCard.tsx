import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import Icon from '@mdi/react';
import './StatsCard.scss';

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: string;
  trend?: {
    value: number;
    isPositive: boolean;
  };
}

export function StatsCard({ title, value, icon, trend }: StatsCardProps) {
  return (
    <Card className="stats-card">
      <CardHeader className="stats-card__header">
        <div className="stats-card__header-content">
          <CardTitle className="stats-card__title">{title}</CardTitle>
          <div className="stats-card__icon-wrapper">
            <Icon path={icon} size={1.5} className="stats-card__icon" />
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="stats-card__value">{value}</div>
        {trend && (
          <div className={`stats-card__trend ${trend.isPositive ? 'stats-card__trend--positive' : 'stats-card__trend--negative'}`}>
            {trend.isPositive ? '↑' : '↓'} {Math.abs(trend.value)}%
          </div>
        )}
      </CardContent>
    </Card>
  );
}
