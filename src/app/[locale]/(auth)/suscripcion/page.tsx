'use client';

import { useRouter } from 'next/navigation';
import { SubscriptionIntro } from '@/components/subscription/SubscriptionIntro';

export default function SuscripcionPage() {
  const router = useRouter();

  const handleStart = () => {
    router.push('/suscripcion/paso-1');
  };

  return <SubscriptionIntro onStart={handleStart} />;
}
