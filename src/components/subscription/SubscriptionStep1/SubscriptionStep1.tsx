'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { LandingNavbar } from '@/components/layout/LandingNavbar';
import './SubscriptionStep1.scss';

const languages = [
  { id: 'es', label: 'Español' },
  { id: 'en', label: 'Inglés' },
  { id: 'pt', label: 'Portugués' },
];

const identityOptions = [
  'Estoy empezando en el mundo de los viajes',
  'Ya vendo viajes de forma independiente',
  'Trabajo o trabajé en una agencia de viajes',
  'Tengo una agencia o equipo de ventas',
  'Soy viajero/a frecuente y quiero viajar a precios de mayorista',
];

export function SubscriptionStep1() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    fullName: '',
    location: '',
    language: 'es',
    email: '',
    phone: '',
    identity: '',
    facebook: '',
    instagram: '',
    tiktok: '',
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleContinue = () => {
    // TODO: Validate and save data
    router.push('/suscripcion/paso-2');
  };

  return (
    <div className="subscription-step1">
      {/* Navbar */}
      <LandingNavbar />

      {/* Main Content */}
      <div className="subscription-step1__container">
        <div className="subscription-step1__card">
          {/* Header */}
          <div className="subscription-step1__header">
            <div className="subscription-step1__header-text">
              <h1 className="subscription-step1__title">Paso 1 de 3</h1>
              <p className="subscription-step1__subtitle">
                Identidad, contexto y punto de partida
              </p>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="subscription-step1__progress">
            <div className="subscription-step1__progress-bar subscription-step1__progress-bar--active" />
            <div className="subscription-step1__progress-bar" />
            <div className="subscription-step1__progress-bar" />
          </div>

          {/* Form Fields */}
          <div className="subscription-step1__form">
            {/* Nombre completo */}
            <div className="subscription-step1__field">
              <Label htmlFor="fullName">Nombre completo</Label>
              <div className="subscription-step1__input-wrapper">
                <Input
                  id="fullName"
                  placeholder="Nombre completo"
                  value={formData.fullName}
                  onChange={(e) => handleInputChange('fullName', e.target.value)}
                />
                <button className="subscription-step1__info-btn" type="button">
                  <span className="material-symbols-outlined">info</span>
                </button>
              </div>
            </div>

            {/* País y ciudad */}
            <div className="subscription-step1__field">
              <Label htmlFor="location">Ubicación</Label>
              <div className="subscription-step1__input-wrapper">
                <Input
                  id="location"
                  placeholder="¿En qué país y ciudad resides actualmente?"
                  value={formData.location}
                  onChange={(e) => handleInputChange('location', e.target.value)}
                />
                <button className="subscription-step1__info-btn" type="button">
                  <span className="material-symbols-outlined">info</span>
                </button>
              </div>
            </div>

            {/* Idioma */}
            <div className="subscription-step1__section">
              <h2 className="subscription-step1__section-title">
                ¿En qué idioma prefieres?
                <button className="subscription-step1__info-btn" type="button">
                  <span className="material-symbols-outlined">info</span>
                </button>
              </h2>
              <div className="subscription-step1__language-grid">
                {languages.map((lang) => (
                  <button
                    key={lang.id}
                    type="button"
                    className={`subscription-step1__language-btn ${
                      formData.language === lang.id ? 'subscription-step1__language-btn--active' : ''
                    }`}
                    onClick={() => handleInputChange('language', lang.id)}
                  >
                    {lang.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Email */}
            <div className="subscription-step1__field">
              <Label htmlFor="email">Correo electrónico</Label>
              <div className="subscription-step1__input-wrapper">
                <Input
                  id="email"
                  type="email"
                  placeholder="Correo electrónico principal"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                />
                <button className="subscription-step1__info-btn" type="button">
                  <span className="material-symbols-outlined">info</span>
                </button>
              </div>
            </div>

            {/* Teléfono */}
            <div className="subscription-step1__field">
              <Label htmlFor="phone">Teléfono</Label>
              <div className="subscription-step1__input-wrapper">
                <Input
                  id="phone"
                  type="tel"
                  placeholder="Número de teléfono (WhatsApp)"
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                />
                <button className="subscription-step1__info-btn" type="button">
                  <span className="material-symbols-outlined">info</span>
                </button>
              </div>
            </div>

            {/* Identificación */}
            <div className="subscription-step1__section">
              <h2 className="subscription-step1__section-title">
                ¿Cómo te identificas actualmente?
              </h2>
              <div className="subscription-step1__identity-list">
                {identityOptions.map((option) => (
                  <button
                    key={option}
                    type="button"
                    className={`subscription-step1__identity-btn ${
                      formData.identity === option ? 'subscription-step1__identity-btn--active' : ''
                    }`}
                    onClick={() => handleInputChange('identity', option)}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>

            {/* Redes sociales */}
            <div className="subscription-step1__section">
              <h2 className="subscription-step1__section-title">
                Comparte tus redes sociales principales
                <button className="subscription-step1__info-btn" type="button">
                  <span className="material-symbols-outlined">info</span>
                </button>
              </h2>
              <div className="subscription-step1__social-fields">
                <Input
                  placeholder="Facebook"
                  value={formData.facebook}
                  onChange={(e) => handleInputChange('facebook', e.target.value)}
                />
                <Input
                  placeholder="Instagram"
                  value={formData.instagram}
                  onChange={(e) => handleInputChange('instagram', e.target.value)}
                />
                <Input
                  placeholder="TikTok"
                  value={formData.tiktok}
                  onChange={(e) => handleInputChange('tiktok', e.target.value)}
                />
              </div>
            </div>

            {/* Continue Button */}
            <Button
              className="subscription-step1__continue-btn"
              onClick={handleContinue}
            >
              Continuar
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
