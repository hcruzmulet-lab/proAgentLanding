'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { LandingNavbar } from '@/components/layout/LandingNavbar';
import { LandingFooter } from '@/components/layout/LandingFooter';
import { HeroSection } from '@/components/shared/HeroSection';
import { FeatureCard } from '@/components/shared/FeatureCard';
import { FAQItem } from '@/components/shared/FAQItem';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import './LandingPage.scss';

export function LandingPageModule() {
  const router = useRouter();
  const t = useTranslations('landing');
  const tCommon = useTranslations('common');

  const features = [
    {
      icon: t('features.bookings.icon'),
      title: t('features.bookings.title'),
      description: t('features.bookings.description'),
    },
    {
      icon: t('features.clients.icon'),
      title: t('features.clients.title'),
      description: t('features.clients.description'),
    },
    {
      icon: t('features.commissions.icon'),
      title: t('features.commissions.title'),
      description: t('features.commissions.description'),
    },
    {
      icon: t('features.subscriptions.icon'),
      title: t('features.subscriptions.title'),
      description: t('features.subscriptions.description'),
    },
  ];

  const whyReasons = [
    {
      icon: t('why.reasons.professional.icon'),
      title: t('why.reasons.professional.title'),
      description: t('why.reasons.professional.description'),
    },
    {
      icon: t('why.reasons.future.icon'),
      title: t('why.reasons.future.title'),
      description: t('why.reasons.future.description'),
    },
    {
      icon: t('why.reasons.ai.icon'),
      title: t('why.reasons.ai.title'),
      description: t('why.reasons.ai.description'),
    },
    {
      icon: t('why.reasons.copilot.icon'),
      title: t('why.reasons.copilot.title'),
      description: t('why.reasons.copilot.description'),
    },
    {
      icon: t('why.reasons.engine.icon'),
      title: t('why.reasons.engine.title'),
      description: t('why.reasons.engine.description'),
    },
    {
      icon: t('why.reasons.origin.icon'),
      title: t('why.reasons.origin.title'),
      description: t('why.reasons.origin.description'),
    },
    {
      icon: t('why.reasons.allinone.icon'),
      title: t('why.reasons.allinone.title'),
      description: t('why.reasons.allinone.description'),
    },
    {
      icon: t('why.reasons.income.icon'),
      title: t('why.reasons.income.title'),
      description: t('why.reasons.income.description'),
    },
    {
      icon: t('why.reasons.support.icon'),
      title: t('why.reasons.support.title'),
      description: t('why.reasons.support.description'),
    },
  ];

  const faqs = [
    {
      question: t('faq.q1.question'),
      answer: t('faq.q1.answer'),
    },
    {
      question: t('faq.q2.question'),
      answer: t('faq.q2.answer'),
    },
    {
      question: t('faq.q3.question'),
      answer: t('faq.q3.answer'),
    },
    {
      question: t('faq.q4.question'),
      answer: t('faq.q4.answer'),
    },
    {
      question: t('faq.q5.question'),
      answer: t('faq.q5.answer'),
    },
    {
      question: t('faq.q6.question'),
      answer: t('faq.q6.answer'),
    },
    {
      question: t('faq.q7.question'),
      answer: t('faq.q7.answer'),
    },
    {
      question: t('faq.q8.question'),
      answer: t('faq.q8.answer'),
    },
    {
      question: t('faq.q9.question'),
      answer: t('faq.q9.answer'),
    },
    {
      question: t('faq.q10.question'),
      answer: t('faq.q10.answer'),
    },
    {
      question: t('faq.q11.question'),
      answer: t('faq.q11.answer'),
    },
    {
      question: t('faq.q12.question'),
      answer: t('faq.q12.answer'),
    },
    {
      question: t('faq.q13.question'),
      answer: t('faq.q13.answer'),
    },
    {
      question: t('faq.q14.question'),
      answer: t('faq.q14.answer'),
    },
    {
      question: t('faq.q15.question'),
      answer: t('faq.q15.answer'),
    },
    {
      question: t('faq.q16.question'),
      answer: t('faq.q16.answer'),
    },
    {
      question: t('faq.q17.question'),
      answer: t('faq.q17.answer'),
    },
    {
      question: t('faq.q18.question'),
      answer: t('faq.q18.answer'),
    },
    {
      question: t('faq.q19.question'),
      answer: t('faq.q19.answer'),
    },
  ];

  const [demoForm, setDemoForm] = useState({
    name: '',
    email: '',
    phone: '',
  });

  const [billingPeriod, setBillingPeriod] = useState<'monthly' | 'annual'>('monthly');

  // Precios según período de facturación
  const prices = {
    monthly: {
      plus: '$39',
      master: '$99',
      elite: '$199',
    },
    annual: {
      plus: '$390',
      master: '$990',
      elite: '$1,990',
    },
  };

  const currentPrices = prices[billingPeriod];

  const handleLogin = () => {
    router.push('/login');
  };

  const handleJoin = () => {
    router.push('/suscripcion');
  };

  const handleRequestDemo = () => {
    const demoSection = document.getElementById('demo-request');
    if (demoSection) {
      demoSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleDemoSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implementar envío del formulario
    console.log('Demo request:', demoForm);
    alert('¡Gracias por tu interés! Nos pondremos en contacto contigo pronto.');
    setDemoForm({ name: '', email: '', phone: '' });
  };

  const handleDemoChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setDemoForm({ ...demoForm, [e.target.name]: e.target.value });
  };

  return (
    <div className="landing-page-module">
      <LandingNavbar onLoginClick={handleLogin} onJoinClick={handleJoin} />

      <HeroSection
        title={t('hero.title')}
        subtitle={t('hero.subtitle')}
        ctaPrimary={t('hero.cta')}
        ctaSecondary={t('hero.ctaSecondary')}
        onPrimaryClick={handleJoin}
        onSecondaryClick={handleRequestDemo}
      />

      <section id="why" className="landing-page-module__why">
        <div className="landing-page-module__container">
          <h2 className="landing-page-module__section-title">{t('why.title')}</h2>
          <div className="landing-page-module__why-grid">
            {whyReasons.map((reason, index) => (
              <div key={index} className="landing-page-module__why-card">
                <span 
                  className="material-symbols-outlined landing-page-module__why-icon"
                  style={{ 
                    fontSize: '96px',
                    width: '96px',
                    height: '96px'
                  }}
                >
                  {reason.icon}
                </span>
                <h3 className="landing-page-module__why-card-title">{reason.title}</h3>
                <p className="landing-page-module__why-card-description">{reason.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="how-it-works" className="landing-page-module__features">
        <div className="landing-page-module__container">
          <h2 className="landing-page-module__section-title">{t('features.title')}</h2>
          <p className="landing-page-module__section-subtitle">{t('features.subtitle')}</p>
          <div className="landing-page-module__features-grid">
            {features.map((feature, index) => (
              <FeatureCard key={index} {...feature} />
            ))}
          </div>
          <p className="landing-page-module__features-conclusion">{t('features.conclusion')}</p>
        </div>
      </section>

      <section id="partners" className="landing-page-module__partners">
        <div className="landing-page-module__container">
          <h2 className="landing-page-module__section-title">{t('partners.title')}</h2>
          <p className="landing-page-module__section-subtitle">{t('partners.subtitle')}</p>
          <p className="landing-page-module__partners-description">{t('partners.description')}</p>
        </div>
      </section>

      <section id="pricing" className="landing-page-module__pricing">
        <div className="landing-page-module__pricing-container">
          {/* Header */}
          <div className="landing-page-module__pricing-header">
            <h2 className="landing-page-module__section-title">Planes de Suscripción</h2>
            
            {/* Billing Period Tabs */}
            <div className="landing-page-module__pricing-tabs">
              <button
                className={`landing-page-module__pricing-tab ${billingPeriod === 'monthly' ? 'landing-page-module__pricing-tab--active' : ''}`}
                onClick={() => setBillingPeriod('monthly')}
              >
                Mensual
              </button>
              <button
                className={`landing-page-module__pricing-tab ${billingPeriod === 'annual' ? 'landing-page-module__pricing-tab--active' : ''}`}
                onClick={() => setBillingPeriod('annual')}
              >
                Anual
              </button>
            </div>
          </div>

          {/* Pricing Table */}
          <div className="landing-page-module__pricing-table-wrapper">
            <table className="landing-page-module__pricing-table">
              <thead>
                <tr className="landing-page-module__pricing-table-header-row">
                  <th className="landing-page-module__pricing-table-header">Características</th>
                  <th className="landing-page-module__pricing-table-header">ProAgent Plus</th>
                  <th className="landing-page-module__pricing-table-header">ProAgent Master</th>
                  <th className="landing-page-module__pricing-table-header">ProAgent Elite</th>
                </tr>
              </thead>
              <tbody>
                {/* Precio */}
                <tr>
                  <td className="landing-page-module__pricing-table-cell landing-page-module__pricing-table-cell--label">Valor USD</td>
                  <td className="landing-page-module__pricing-table-cell landing-page-module__pricing-table-cell--price">{currentPrices.plus}</td>
                  <td className="landing-page-module__pricing-table-cell landing-page-module__pricing-table-cell--price">{currentPrices.master}</td>
                  <td className="landing-page-module__pricing-table-cell landing-page-module__pricing-table-cell--price">{currentPrices.elite}</td>
                </tr>
                
                {/* Comisión */}
                <tr>
                  <td className="landing-page-module__pricing-table-cell landing-page-module__pricing-table-cell--label">*Comisión / Split</td>
                  <td className="landing-page-module__pricing-table-cell">70/30</td>
                  <td className="landing-page-module__pricing-table-cell">80/20**</td>
                  <td className="landing-page-module__pricing-table-cell">90/10**</td>
                </tr>
                
                {/* Motores integrados */}
                <tr>
                  <td className="landing-page-module__pricing-table-cell landing-page-module__pricing-table-cell--label">Motores integrados</td>
                  <td className="landing-page-module__pricing-table-cell landing-page-module__pricing-table-cell--small">paquetes, circuitos, trenes, actividades, seguros , esim</td>
                  <td className="landing-page-module__pricing-table-cell landing-page-module__pricing-table-cell--small">Igual ProAgent Plus + sport/event+renta de autos+routing+grupos</td>
                  <td className="landing-page-module__pricing-table-cell landing-page-module__pricing-table-cell--small">Igual ProAgent Master+ Cruceros+Disney+LUJO</td>
                </tr>
                
                {/* Paquetes */}
                <tr>
                  <td className="landing-page-module__pricing-table-cell landing-page-module__pricing-table-cell--label">Paquetes</td>
                  <td className="landing-page-module__pricing-table-cell">Dinámicos+Propios</td>
                  <td className="landing-page-module__pricing-table-cell">Igual</td>
                  <td className="landing-page-module__pricing-table-cell">Igual</td>
                </tr>
                
                {/* CRM */}
                <tr>
                  <td className="landing-page-module__pricing-table-cell landing-page-module__pricing-table-cell--label">CRM</td>
                  <td className="landing-page-module__pricing-table-cell">incluido</td>
                  <td className="landing-page-module__pricing-table-cell">incluido</td>
                  <td className="landing-page-module__pricing-table-cell">incluido</td>
                </tr>
                
                {/* IA */}
                <tr>
                  <td className="landing-page-module__pricing-table-cell landing-page-module__pricing-table-cell--label">Inteligencia artificial</td>
                  <td className="landing-page-module__pricing-table-cell">incluido</td>
                  <td className="landing-page-module__pricing-table-cell">incluido</td>
                  <td className="landing-page-module__pricing-table-cell">incluido</td>
                </tr>
                
                {/* Constructor de planes */}
                <tr>
                  <td className="landing-page-module__pricing-table-cell landing-page-module__pricing-table-cell--label">Constructor de planes a medidas</td>
                  <td className="landing-page-module__pricing-table-cell">incluido</td>
                  <td className="landing-page-module__pricing-table-cell">incluido</td>
                  <td className="landing-page-module__pricing-table-cell">incluido</td>
                </tr>
                
                {/* Marketing Pro */}
                <tr>
                  <td className="landing-page-module__pricing-table-cell landing-page-module__pricing-table-cell--label">Marketing Pro</td>
                  <td className="landing-page-module__pricing-table-cell landing-page-module__pricing-table-cell--small">Recursos y herramientas</td>
                  <td className="landing-page-module__pricing-table-cell landing-page-module__pricing-table-cell--small">Recursos y herramientas + Activación de campañas META</td>
                  <td className="landing-page-module__pricing-table-cell landing-page-module__pricing-table-cell--small">Recursos y herramientas + Activación de campañas MULTICANAL</td>
                </tr>
                
                {/* Correo corporativo */}
                <tr>
                  <td className="landing-page-module__pricing-table-cell landing-page-module__pricing-table-cell--label">Correo corporativo</td>
                  <td className="landing-page-module__pricing-table-cell">incluido</td>
                  <td className="landing-page-module__pricing-table-cell">incluido</td>
                  <td className="landing-page-module__pricing-table-cell">incluido</td>
                </tr>
                
                {/* Página web */}
                <tr>
                  <td className="landing-page-module__pricing-table-cell landing-page-module__pricing-table-cell--label">Página web</td>
                  <td className="landing-page-module__pricing-table-cell">Microsite</td>
                  <td className="landing-page-module__pricing-table-cell landing-page-module__pricing-table-cell--small">Tu propia página web B2C</td>
                  <td className="landing-page-module__pricing-table-cell landing-page-module__pricing-table-cell--small">+ Landing page+Generador de QR ilimitado.</td>
                </tr>
                
                {/* Academia */}
                <tr>
                  <td className="landing-page-module__pricing-table-cell landing-page-module__pricing-table-cell--label">Academia ProAgent</td>
                  <td className="landing-page-module__pricing-table-cell">incluido</td>
                  <td className="landing-page-module__pricing-table-cell">incluido</td>
                  <td className="landing-page-module__pricing-table-cell">incluido</td>
                </tr>
                
                {/* Proveedores */}
                <tr>
                  <td className="landing-page-module__pricing-table-cell landing-page-module__pricing-table-cell--label">Proveedores</td>
                  <td className="landing-page-module__pricing-table-cell landing-page-module__pricing-table-cell--small">Todos los del Motor principal+ Marketplace</td>
                  <td className="landing-page-module__pricing-table-cell landing-page-module__pricing-table-cell--small">Motor + Marketplace+Proveedores premium</td>
                  <td className="landing-page-module__pricing-table-cell landing-page-module__pricing-table-cell--small">Motor + Marketplace+Proveedores premium+lujo</td>
                </tr>
                
                {/* Soporte */}
                <tr>
                  <td className="landing-page-module__pricing-table-cell landing-page-module__pricing-table-cell--label">Soporte</td>
                  <td className="landing-page-module__pricing-table-cell">Estándar</td>
                  <td className="landing-page-module__pricing-table-cell">Prioritario</td>
                  <td className="landing-page-module__pricing-table-cell">VIP</td>
                </tr>
                
                {/* Cuota primer afiliación */}
                <tr>
                  <td className="landing-page-module__pricing-table-cell landing-page-module__pricing-table-cell--label landing-page-module__pricing-table-cell--red">Cuota primer afiliación</td>
                  <td className="landing-page-module__pricing-table-cell landing-page-module__pricing-table-cell--bold">$450</td>
                  <td className="landing-page-module__pricing-table-cell landing-page-module__pricing-table-cell--bold">$450</td>
                  <td className="landing-page-module__pricing-table-cell landing-page-module__pricing-table-cell--bold">$450</td>
                </tr>
                
                {/* Botones */}
                <tr>
                  <td className="landing-page-module__pricing-table-cell"></td>
                  <td className="landing-page-module__pricing-table-cell landing-page-module__pricing-table-cell--button">
                    <Button
                      className="landing-page-module__pricing-select-button"
                      onClick={handleJoin}
                    >
                      Seleccionar
                    </Button>
                  </td>
                  <td className="landing-page-module__pricing-table-cell landing-page-module__pricing-table-cell--button">
                    <Button
                      className="landing-page-module__pricing-select-button"
                      onClick={handleJoin}
                    >
                      Seleccionar
                    </Button>
                  </td>
                  <td className="landing-page-module__pricing-table-cell landing-page-module__pricing-table-cell--button">
                    <Button
                      className="landing-page-module__pricing-select-button"
                      onClick={handleJoin}
                    >
                      Seleccionar
                    </Button>
                  </td>
                </tr>
              </tbody>
            </table>
            
            {/* Footnotes */}
            <div className="landing-page-module__pricing-footnotes">
              <p>* Comisión más alta para el agente.</p>
              <p>** El split no se activa de forma automática.</p>
            </div>
          </div>
        </div>
      </section>

      <section id="faq" className="landing-page-module__faq">
        <div className="landing-page-module__container">
          <h2 className="landing-page-module__section-title">{t('faq.title')}</h2>
          <p className="landing-page-module__section-subtitle">{t('faq.subtitle')}</p>
          <div className="landing-page-module__faq-list">
            {faqs.map((faq, index) => (
              <FAQItem key={index} {...faq} />
            ))}
          </div>
        </div>
      </section>

      <section id="demo-request" className="landing-page-module__demo-request">
        <div className="landing-page-module__container">
          <div className="landing-page-module__demo-content">
            <div className="landing-page-module__demo-header">
              <h2 className="landing-page-module__section-title">{t('demoRequest.title')}</h2>
              <p className="landing-page-module__section-subtitle">{t('demoRequest.subtitle')}</p>
            </div>
            <form onSubmit={handleDemoSubmit} className="landing-page-module__demo-form">
              <div className="landing-page-module__form-row">
                <div className="landing-page-module__form-group">
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    required
                    value={demoForm.name}
                    onChange={handleDemoChange}
                    placeholder={t('demoRequest.form.name')}
                    className="landing-page-module__input"
                  />
                </div>
                <div className="landing-page-module__form-group">
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={demoForm.email}
                    onChange={handleDemoChange}
                    placeholder={t('demoRequest.form.email')}
                    className="landing-page-module__input"
                  />
                </div>
                <div className="landing-page-module__form-group">
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    required
                    value={demoForm.phone}
                    onChange={handleDemoChange}
                    placeholder={t('demoRequest.form.phone')}
                    className="landing-page-module__input"
                  />
                </div>
                <Button type="submit" size="lg" className="landing-page-module__demo-submit">
                  {t('demoRequest.form.submit')}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </section>

      <section className="landing-page-module__cta">
        <div className="landing-page-module__container">
          <h2 className="landing-page-module__cta-title">{t('cta.title')}</h2>
          <p className="landing-page-module__cta-subtitle">{t('cta.subtitle')}</p>
          <Button size="lg" onClick={handleJoin} className="landing-page-module__cta-button">
            {t('cta.button')}
          </Button>
        </div>
      </section>

      <LandingFooter
        productLinks={[
          { label: t('nav.whyProAgent'), href: '#why' },
          { label: t('nav.howItWorks'), href: '#how-it-works' },
          { label: t('nav.plans'), href: '#pricing' },
          { label: t('nav.faq'), href: '#faq' },
        ]}
        companyLinks={[
          { label: t('footer.about'), href: '#' },
          { label: t('footer.contact'), href: '#' },
        ]}
        legalLinks={[
          { label: t('footer.privacy'), href: '#' },
          { label: t('footer.terms'), href: '#' },
        ]}
        copyrightText={t('footer.rights')}
      />
    </div>
  );
}
