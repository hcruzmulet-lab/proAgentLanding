import Icon from '@mdi/react';
import { mdiInboxArrowDown } from '@mdi/js';
import './EmptyState.scss';

interface EmptyStateProps {
  message: string;
  description?: string;
  icon?: string;
  action?: React.ReactNode;
}

export function EmptyState({ message, description, icon, action }: EmptyStateProps) {
  return (
    <div className="empty-state">
      <div className="empty-state__icon">
        <Icon path={icon || mdiInboxArrowDown} size={3} />
      </div>
      <h3 className="empty-state__message">{message}</h3>
      {description && <p className="empty-state__description">{description}</p>}
      {action && <div className="empty-state__action">{action}</div>}
    </div>
  );
}
