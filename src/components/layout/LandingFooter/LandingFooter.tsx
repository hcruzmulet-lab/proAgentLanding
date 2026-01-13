'use client';

import Link from 'next/link';
import Image from 'next/image';
import './LandingFooter.scss';

interface FooterLink {
  label: string;
  href: string;
}

interface LandingFooterProps {
  productLinks: FooterLink[];
  companyLinks: FooterLink[];
  legalLinks: FooterLink[];
  copyrightText: string;
}

export function LandingFooter({
  productLinks,
  companyLinks,
  legalLinks,
  copyrightText,
}: LandingFooterProps) {
  const currentYear = new Date().getFullYear();

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith('#')) {
      e.preventDefault();
      const targetId = href.replace('#', '');
      const targetSection = document.getElementById(targetId);
      if (targetSection) {
        targetSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  return (
    <footer className="landing-footer">
      <div className="landing-footer__container">
        <div className="landing-footer__content">
          <div className="landing-footer__brand">
            <Image src="/logo.svg" alt="ProAgent" width={118} height={34} />
            <p className="landing-footer__tagline">
              La plataforma B2B para agencias de viaje
            </p>
          </div>

          <div className="landing-footer__links">
            <div className="landing-footer__section">
              <h4 className="landing-footer__title">Producto</h4>
              <ul className="landing-footer__list">
                {productLinks.map((link) => (
                  <li key={link.href}>
                    <Link 
                      href={link.href} 
                      className="landing-footer__link"
                      onClick={(e) => handleLinkClick(e, link.href)}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="landing-footer__section">
              <h4 className="landing-footer__title">Empresa</h4>
              <ul className="landing-footer__list">
                {companyLinks.map((link) => (
                  <li key={link.href}>
                    <Link 
                      href={link.href} 
                      className="landing-footer__link"
                      onClick={(e) => handleLinkClick(e, link.href)}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="landing-footer__section">
              <h4 className="landing-footer__title">Legal</h4>
              <ul className="landing-footer__list">
                {legalLinks.map((link) => (
                  <li key={link.href}>
                    <Link 
                      href={link.href} 
                      className="landing-footer__link"
                      onClick={(e) => handleLinkClick(e, link.href)}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="landing-footer__bottom">
          <p className="landing-footer__copyright">
            © {currentYear} ProAgent. {copyrightText}
          </p>
        </div>
      </div>
    </footer>
  );
}
