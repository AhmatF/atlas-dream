'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import Logo from './Logo';

interface NavbarProps {
  lang: string;
}

const navigation = {
  en: [
    { name: 'Home', href: '/en' },
    { name: 'Cars', href: '/en/cars' },
    { name: 'Villas', href: '/en/villas' },
    { name: 'Concierge', href: '/en/concierge' },
    { name: 'Blog', href: '/en/blog' },
  ],
  fr: [
    { name: 'Accueil', href: '/fr' },
    { name: 'Voitures', href: '/fr/cars' },
    { name: 'Villas', href: '/fr/villas' },
    { name: 'Conciergerie', href: '/fr/concierge' },
    { name: 'Blog', href: '/fr/blog' },
  ],
};

export default function Navbar({ lang }: NavbarProps) {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const currentLang = lang as 'en' | 'fr';
  const otherLang = lang === 'en' ? 'fr' : 'en';
  const navItems = navigation[currentLang] || navigation.en;

  // Replace current language in pathname
  const getLocalizedPath = (targetLang: string) => {
    return pathname.replace(`/${lang}`, `/${targetLang}`);
  };

  const whatsappNumber = '+212774885461';
  const whatsappMessage = lang === 'en'
    ? 'Hello, I would like to get more information about Saphir Travel services.'
    : 'Bonjour, je souhaite obtenir plus d\'informations sur les services Saphir Travel.';
  const whatsappLink = `https://wa.me/${whatsappNumber.replace('+', '')}?text=${encodeURIComponent(whatsappMessage)}`;
  const callLink = `tel:${whatsappNumber}`;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-100">
      <div className="container mx-auto px-3 sm:px-6">
        <div className="flex items-center justify-between h-[72px]">
          {/* Logo */}
          <Link href={`/${lang}`} className="flex items-center flex-shrink-0">
            <Logo className="h-7 sm:h-10 md:h-12" style={{ maxWidth: '140px' }} />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`text-sm font-medium transition-colors duration-200 ${
                  pathname === item.href
                    ? 'text-[var(--color-majorelle)]'
                    : 'text-[var(--color-ebony)] hover:text-[var(--color-brass)]'
                }`}
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Right side actions */}
          <div className="flex items-center gap-2 sm:gap-3 lg:gap-4">
            {/* Language Switcher - Same size as icon buttons */}
            <Link
              href={getLocalizedPath(otherLang)}
              className="w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center text-xs sm:text-sm font-medium rounded-full border-2 border-[var(--color-brass)] hover:bg-[var(--color-brass)] hover:text-white text-[var(--color-brass)] transition-all duration-200 flex-shrink-0"
            >
              {otherLang.toUpperCase()}
            </Link>

            {/* WhatsApp - Uniform size */}
            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center rounded-full border-2 border-[var(--color-brass)] hover:bg-[var(--color-brass)] hover:text-white text-[var(--color-brass)] transition-all duration-200 flex-shrink-0"
              aria-label="WhatsApp"
            >
              <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
              </svg>
            </a>

            {/* Call - Uniform size */}
            <a
              href={callLink}
              className="w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center rounded-full border-2 border-[var(--color-brass)] hover:bg-[var(--color-brass)] hover:text-white text-[var(--color-brass)] transition-all duration-200 flex-shrink-0"
              aria-label="Call"
            >
              <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
            </a>

            {/* Mobile menu button - Only visible on mobile */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 flex-shrink-0"
              aria-label="Toggle menu"
            >
              <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {mobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden py-4 border-t border-gray-100">
            <div className="flex flex-col gap-4">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`text-base font-medium transition-colors ${
                    pathname === item.href
                      ? 'text-[var(--color-majorelle)]'
                      : 'text-[var(--color-ebony)]'
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
