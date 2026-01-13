'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import './LoginForm.scss';

interface LoginFormProps {
  onSubmit?: (data: { email: string; password: string; rememberMe: boolean }) => void;
  isLoading?: boolean;
}

export function LoginForm({ onSubmit, isLoading = false }: LoginFormProps) {
  const t = useTranslations('auth');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit?.({ email, password, rememberMe });
  };

  return (
    <div className="login-form">
      <Link href="/landing" className="login-form__logo">
        <Image
          src="/logo-full.svg"
          alt="ProAgent"
          width={222}
          height={63}
          priority
        />
      </Link>

      <form className="login-form__form" onSubmit={handleSubmit}>
        <div className="login-form__field">
          <Label htmlFor="email" className="login-form__label">
            Email
          </Label>
          <Input
            id="email"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="login-form__input"
            required
          />
        </div>

        <div className="login-form__field">
          <Label htmlFor="password" className="login-form__label">
            {t('password')}
          </Label>
          <Input
            id="password"
            type="password"
            placeholder={t('password')}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="login-form__input"
            required
          />
        </div>

        <div className="login-form__checkbox-wrapper">
          <input
            type="checkbox"
            id="rememberMe"
            checked={rememberMe}
            onChange={(e) => setRememberMe(e.target.checked)}
            className="login-form__checkbox"
          />
          <label htmlFor="rememberMe" className="login-form__checkbox-label">
            {t('rememberUser')}
          </label>
        </div>

        <Button
          type="submit"
          className="login-form__submit"
          disabled={isLoading}
        >
          {isLoading ? t('loading') : t('enter')}
        </Button>

        <Link href="/forgot-password" className="login-form__forgot-link">
          {t('forgotPasswordLink')}
        </Link>
      </form>
    </div>
  );
}
