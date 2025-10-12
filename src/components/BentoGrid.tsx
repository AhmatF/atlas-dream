'use client';

import Link from 'next/link';
import { useState } from 'react';

interface BentoCardProps {
  title: string;
  description: string;
  imageSrc: string;
  href: string;
  index: number;
}

function BentoCard({ title, description, imageSrc, href, index }: BentoCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Link
      href={href}
      className="card card-tilt group block overflow-hidden relative h-[400px]"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        animationDelay: `${index * 100}ms`,
      }}
    >
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center transition-transform duration-500"
        style={{
          backgroundImage: `url(${imageSrc})`,
          transform: isHovered ? 'scale(1.05)' : 'scale(1)',
        }}
      >
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative h-full p-8 flex flex-col justify-end">
        <h3
          className="text-white text-3xl mb-3 transition-transform duration-300"
          style={{
            fontFamily: 'var(--font-cormorant)',
            transform: isHovered ? 'translateY(-4px)' : 'translateY(0)',
          }}
        >
          {title}
        </h3>
        <p
          className="text-white/80 text-base mb-4 transition-all duration-300"
          style={{
            opacity: isHovered ? 1 : 0.9,
            transform: isHovered ? 'translateY(-2px)' : 'translateY(0)',
          }}
        >
          {description}
        </p>
        <div
          className="flex items-center gap-2 text-[var(--color-brass)] font-medium transition-all duration-300"
          style={{
            transform: isHovered ? 'translateX(4px)' : 'translateX(0)',
          }}
        >
          <span>Discover</span>
          <svg
            className="w-5 h-5 transition-transform duration-300"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            style={{
              transform: isHovered ? 'translateX(4px)' : 'translateX(0)',
            }}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17 8l4 4m0 0l-4 4m4-4H3"
            />
          </svg>
        </div>
      </div>
    </Link>
  );
}

interface BentoGridProps {
  lang: string;
}

const gridContent = {
  en: {
    title: 'Explore our services',
    subtitle: 'Three ways to travel beautifully',
    cards: [
      {
        title: 'Cars',
        description: 'Airport meet & greet, English-speaking drivers, transparent pricing',
        imageSrc: '/images/car_airport.jpg',
        href: '/en/cars',
      },
      {
        title: 'Villas',
        description: "Curated properties in Marrakech's finest districts",
        imageSrc: '/images/villa_1.jpg',
        href: '/en/villas',
      },
      {
        title: 'Concierge',
        description: 'Five-star service, 24/7 support for your perfect stay',
        imageSrc: '/images/conciergerie.jpg',
        href: '/en/concierge',
      },
    ],
  },
  fr: {
    title: 'Découvrir nos services',
    subtitle: 'Trois portes vers un séjour parfait',
    cards: [
      {
        title: 'Voitures',
        description: 'Accueil aéroport, chauffeurs anglophones, prix 100% clairs',
        imageSrc: '/images/car_airport.jpg',
        href: '/fr/cars',
      },
      {
        title: 'Villas',
        description: 'Propriétés sélectionnées dans les meilleurs quartiers de Marrakech',
        imageSrc: '/images/villa_1.jpg',
        href: '/fr/villas',
      },
      {
        title: 'Conciergerie',
        description: 'Service 5 étoiles, assistance 24/7 pour votre séjour',
        imageSrc: '/images/conciergerie.jpg',
        href: '/fr/concierge',
      },
    ],
  },
};

export default function BentoGrid({ lang }: BentoGridProps) {
  const content = gridContent[lang as 'en' | 'fr'] || gridContent.en;

  return (
    <section className="py-20 lg:py-28">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2
            className="mb-4"
            style={{
              fontFamily: 'var(--font-cormorant)',
            }}
          >
            {content.title}
          </h2>
          <p className="text-xl text-[var(--color-muted)] max-w-2xl mx-auto">
            {content.subtitle}
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {content.cards.map((card, index) => (
            <BentoCard
              key={card.href}
              title={card.title}
              description={card.description}
              imageSrc={card.imageSrc}
              href={card.href}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
