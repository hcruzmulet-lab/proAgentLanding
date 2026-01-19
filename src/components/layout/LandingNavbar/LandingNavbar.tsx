'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import Icon from '@mdi/react';
import { mdiMenu, mdiClose } from '@mdi/js';
import { LanguageSelector } from '@/components/shared/LanguageSelector';
import './LandingNavbar.scss';

export function LandingNavbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const t = useTranslations('landing.nav');

  const navItems = [
    { label: t('whyProAgent'), href: '#why' },
    { label: t('howItWorks'), href: '#how-it-works' },
    { label: t('plans'), href: '#pricing' },
    { label: t('faq'), href: '#faq' },
  ];

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const targetId = href.replace('#', '');
    const targetSection = document.getElementById(targetId);
    if (targetSection) {
      targetSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    closeMenu();
  };

  return (
    <nav className="landing-navbar">
      <div className="landing-navbar__container">
        <Link href="/" className="landing-navbar__logo">
          <Image src="/logo.svg" alt="ProAgent" width={118} height={34} priority />
        </Link>

        {/* Desktop Navigation */}
        <div className="landing-navbar__nav landing-navbar__desktop-only">
          {navItems.map((item) => (
            <Link 
              key={item.href} 
              href={item.href} 
              className="landing-navbar__link"
              onClick={(e) => handleNavClick(e, item.href)}
            >
              {item.label}
            </Link>
          ))}
        </div>

        {/* Desktop Actions */}
        <div className="landing-navbar__actions landing-navbar__desktop-only">
          <LanguageSelector />
        </div>

        {/* Mobile Menu Button */}
        <button
          type="button"
          className="landing-navbar__hamburger landing-navbar__mobile-only"
          onClick={toggleMenu}
          aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={isMenuOpen}
        >
          <Icon path={isMenuOpen ? mdiClose : mdiMenu} size={1.2} />
        </button>
      </div>

      {/* Mobile Menu */}
      <div className={`landing-navbar__mobile-menu ${isMenuOpen ? 'landing-navbar__mobile-menu--open' : ''}`}>
        <div className="landing-navbar__mobile-nav">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="landing-navbar__mobile-link"
              onClick={(e) => handleNavClick(e, item.href)}
            >
              {item.label}
            </Link>
          ))}
        </div>
        <div className="landing-navbar__mobile-actions">
          <div className="landing-navbar__mobile-language">
            <LanguageSelector />
          </div>
        </div>
      </div>

      {/* Overlay */}
      {isMenuOpen && (
        <div className="landing-navbar__overlay" onClick={closeMenu} />
      )}
    </nav>
  );
}
