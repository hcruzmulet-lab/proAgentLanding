'use client';

import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import {
  mdiCalendarCheck,
  mdiAccountGroup,
  mdiCurrencyUsd,
  mdiCreditCardOutline,
} from '@mdi/js';
import { LandingNavbar } from '@/components/layout/LandingNavbar';
import { LandingFooter } from '@/components/layout/LandingFooter';
import { HeroSection } from '@/components/shared/HeroSection';
import { FeatureCard } from '@/components/shared/FeatureCard';
import { PricingCard } from '@/components/shared/PricingCard';
import { FAQItem } from '@/components/shared/FAQItem';
import { Button } from '@/components/ui/button';
import './LandingPage.scss';

export function LandingPageModule() {
  const router = useRouter();
  const t = useTranslations('landing');
  const tCommon = useTranslations('common');

  const features = [
    {
      icon: mdiCalendarCheck,
      title: t('features.bookings.title'),
      description: t('features.bookings.description'),
    },
    {
      icon: mdiAccountGroup,
      title: t('features.clients.title'),
      description: t('features.clients.description'),
    },
    {
      icon: mdiCurrencyUsd,
      title: t('features.commissions.title'),
      description: t('features.commissions.description'),
    },
    {
      icon: mdiCreditCardOutline,
      title: t('features.subscriptions.title'),
      description: t('features.subscriptions.description'),
    },
  ];

  const pricingPlans = [
    {
      name: t('pricing.free.name'),
      price: t('pricing.free.price'),
      period: t('pricing.free.period'),
      features: [
        t('pricing.free.features.0'),
        t('pricing.free.features.1'),
        t('pricing.free.features.2'),
      ],
      highlighted: false,
    },
    {
      name: t('pricing.pro.name'),
      price: t('pricing.pro.price'),
      period: t('pricing.pro.period'),
      features: [
        t('pricing.pro.features.0'),
        t('pricing.pro.features.1'),
        t('pricing.pro.features.2'),
        t('pricing.pro.features.3'),
        t('pricing.pro.features.4'),
      ],
      highlighted: true,
    },
    {
      name: t('pricing.enterprise.name'),
      price: t('pricing.enterprise.price'),
      period: '',
      features: [
        t('pricing.enterprise.features.0'),
        t('pricing.enterprise.features.1'),
        t('pricing.enterprise.features.2'),
        t('pricing.enterprise.features.3'),
        t('pricing.enterprise.features.4'),
      ],
      highlighted: false,
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

  const handleLogin = () => {
    router.push('/login');
  };

  const handleJoin = () => {
    router.push('/suscripcion');
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
        onSecondaryClick={() => {}}
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
        <div className="landing-page-module__container">
          <h2 className="landing-page-module__section-title">{t('pricing.title')}</h2>
          <p className="landing-page-module__section-subtitle">{t('pricing.subtitle')}</p>
          <div className="landing-page-module__pricing-grid">
            {pricingPlans.map((plan, index) => (
              <PricingCard
                key={index}
                {...plan}
                onSelectPlan={handleJoin}
                ctaText={t('subscriptions.chooseThisPlan')}
              />
            ))}
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
          { label: t('footer.features'), href: '#how-it-works' },
          { label: t('footer.pricing'), href: '#pricing' },
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
