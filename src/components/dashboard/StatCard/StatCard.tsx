'use client';

import './StatCard.scss';

interface StatCardProps {
  title: string;
  value: number | string;
  icon: string;
  onClick?: () => void;
}

export function StatCard({ title, value, icon, onClick }: StatCardProps) {
  return (
    <div className="stat-card" onClick={onClick}>
      <div className="stat-card__content">
        <p className="stat-card__title">{title}</p>
        <p className="stat-card__value">{value}</p>
      </div>
      <div className="stat-card__icon">
        <span className="material-symbols-outlined">{icon}</span>
      </div>
    </div>
  );
}
