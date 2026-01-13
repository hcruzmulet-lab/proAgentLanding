'use client';

import './QuickAction.scss';

interface QuickActionProps {
  title: string;
  icon: string;
  onClick?: () => void;
}

export function QuickAction({ title, icon, onClick }: QuickActionProps) {
  return (
    <button className="quick-action" onClick={onClick}>
      <span className="material-symbols-outlined quick-action__icon">{icon}</span>
      <span>{title}</span>
    </button>
  );
}
