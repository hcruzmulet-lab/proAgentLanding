'use client';

import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { LoginForm } from '@/components/auth/LoginForm';
import './LoginPage.scss';

interface LoginPageProps {
  cityName?: string;
  backgroundImage?: string;
}

export function LoginPage({
  cityName = 'NUEVA\nYORK',
  backgroundImage = 'https://res.cloudinary.com/ddagvoaq2/image/upload/v1768248449/Nueva-York_gu5w4a.jpg',
}: LoginPageProps) {
  const t = useTranslations('auth');
  const router = useRouter();

  const handleLogin = (data: { email: string; password: string; rememberMe: boolean }) => {
    console.log('Login data:', data);
    // Redirect to dashboard
    router.push('/dashboard');
  };

  return (
    <div className="login-page">
      {/* Left side - Background with city */}
      <div className="login-page__background">
        <Image
          src={backgroundImage}
          alt={cityName.replace('\n', ' ')}
          fill
          className="login-page__background-image"
          priority
          sizes="(max-width: 768px) 100vw, 65vw"
        />
        <div className="login-page__overlay" />
        
        <div className="login-page__city-name">
          {cityName.split('\n').map((line, index) => (
            <span key={index}>{line}</span>
          ))}
        </div>

        <footer className="login-page__footer">
          <span className="login-page__footer-text">2025 © Powered By</span>
          <Image
            src="/azucar-travel.svg"
            alt="Azucar Travel"
            width={120}
            height={21}
            className="login-page__footer-logo"
          />
        </footer>
      </div>

      {/* Right side - Login form */}
      <div className="login-page__form-container">
        <LoginForm onSubmit={handleLogin} />
      </div>
    </div>
  );
}
