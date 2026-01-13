'use client';

import { useRouter } from 'next/navigation';
import { SubscriptionIntro } from '@/components/subscription/SubscriptionIntro';

export default function SuscripcionPage() {
  const router = useRouter();

  const handleStart = () => {
    // TODO: Navegar al siguiente paso del formulario
    console.log('Iniciando proceso de suscripción');
  };

  return <SubscriptionIntro onStart={handleStart} />;
}
