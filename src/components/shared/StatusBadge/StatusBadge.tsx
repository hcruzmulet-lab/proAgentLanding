import { useTranslations } from 'next-intl';
import { Badge } from '@/components/ui/badge';
import './StatusBadge.scss';

interface StatusBadgeProps {
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function StatusBadge({ status, size = 'md', className }: StatusBadgeProps) {
  const t = useTranslations('bookings');

  return (
    <Badge
      className={`status-badge status-badge--${size} ${className || ''}`}
      variant={status}
    >
      {t(status)}
    </Badge>
  );
}
