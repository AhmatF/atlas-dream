'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

interface HeroProps {
  headline: string;
  subheadline: string;
  imageSrc: string;
  lang: string;
}

const ctaLabels = {
  en: {
    primary: 'Explore Cars',
    secondary: 'View Villas',
  },
  fr: {
    primary: 'Voir les voitures',
    secondary: 'Voir les villas',
  },
};

export default function Hero({ headline, subheadline, imageSrc, lang }: HeroProps) {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const parallaxOffset = scrollY * 0.06; // 6% parallax strength as per design tokens
  const ctas = ctaLabels[lang as 'en' | 'fr'] || ctaLabels.en;

  return (
    <section className="relative h-[720px] overflow-hidden">
      {/* Background Image with Parallax */}
      <div
        className="absolute inset-0 parallax"
        style={{
          transform: `translateY(${parallaxOffset}px)`,
          backgroundImage: `url(${imageSrc})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        {/* Overlay Gradient */}
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(180deg, rgba(0,0,0,0.0) 0%, rgba(0,0,0,0.32) 100%)',
          }}
        />

        {/* Pattern Overlay - Lattice Gold */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: `url(/patterns/pattern_lattice_gold.svg)`,
            backgroundRepeat: 'repeat',
            backgroundSize: '100px 100px',
            opacity: 0.06,
          }}
        />
      </div>

      {/* Content */}
      <div className="relative h-full flex items-center">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl">
            <h1
              className="text-white mb-6 animate-fade-in-up"
              style={{
                fontFamily: 'var(--font-cormorant)',
                animationDelay: '100ms',
              }}
            >
              {headline}
            </h1>
            <p
              className="text-white/90 text-xl md:text-2xl mb-8 leading-relaxed animate-fade-in-up"
              style={{
                animationDelay: '200ms',
              }}
            >
              {subheadline}
            </p>
            <div
              className="flex flex-col sm:flex-row gap-4 animate-fade-in-up"
              style={{
                animationDelay: '300ms',
              }}
            >
              <Link href={`/${lang}/cars`} className="btn btn-primary">
                {ctas.primary}
              </Link>
              <Link href={`/${lang}/villas`} className="btn btn-ghost-light">
                {ctas.secondary}
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <svg
          className="w-6 h-6 text-white/70"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 14l-7 7m0 0l-7-7m7 7V3"
          />
        </svg>
      </div>
    </section>
  );
}
