'use client';

import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import './NewsCard.scss';

interface NewsItem {
  id: string;
  title: string;
  date: string;
}

interface NewsCardProps {
  news?: NewsItem[];
}

const defaultNews: NewsItem[] = [
  { id: '1', title: 'La unión europea activa su nuevo sistema de fronteras...', date: '02/01/2026' },
  { id: '2', title: 'Raynair - Nueva tarjeta digital de embarque', date: '02/01/2026' },
  { id: '3', title: 'Mundomar Cruceros - Nuevo proveedor', date: '02/01/2026' },
];

export function NewsCard({ news = defaultNews }: NewsCardProps) {
  const router = useRouter();

  const handleVerMas = () => {
    router.push('/dashboard/novedades');
  };

  return (
    <div className="news-card">
      <div className="news-card__header">
        <h3 className="news-card__title">Novedades</h3>
        <Button variant="ghost" size="sm" className="news-card__more-btn" onClick={handleVerMas}>
          Ver más
        </Button>
      </div>

      <div className="news-card__list">
        {news.map((item) => (
          <div key={item.id} className="news-card__item">
            <div className="news-card__item-left">
              <span className="material-symbols-outlined news-card__item-icon">arrow_circle_right</span>
              <span className="news-card__item-title">{item.title}</span>
            </div>
            <span className="news-card__item-date">{item.date}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
