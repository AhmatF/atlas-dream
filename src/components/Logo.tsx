'use client';

import { CSSProperties } from 'react';

interface LogoProps {
  className?: string;
  style?: CSSProperties;
}

export default function Logo({ className = 'h-10 md:h-12', style }: LogoProps) {
  return (
    <svg
      viewBox="0 0 320 60"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={{ width: 'auto', ...style }}
    >
      <defs>
        {/* Gradient doré luxueux */}
        <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" style={{ stopColor: '#D4AF37', stopOpacity: 1 }} />
          <stop offset="50%" style={{ stopColor: '#FFD700', stopOpacity: 1 }} />
          <stop offset="100%" style={{ stopColor: '#C49A58', stopOpacity: 1 }} />
        </linearGradient>

        {/* Ombre portée élégante */}
        <filter id="elegantShadow">
          <feDropShadow dx="0" dy="2" stdDeviation="3" floodOpacity="0.15" />
        </filter>
      </defs>

      {/* Ornement gauche */}
      <g opacity="0.6">
        <line x1="10" y1="30" x2="30" y2="30" stroke="url(#goldGradient)" strokeWidth="1.5" strokeLinecap="round" />
        <circle cx="8" cy="30" r="2" fill="url(#goldGradient)" />
        <circle cx="32" cy="30" r="2" fill="url(#goldGradient)" />
      </g>

      {/* SAPHIR - Texte principal ultra luxueux */}
      <text
        x="45"
        y="35"
        fontFamily="Cormorant Garamond, serif"
        fontSize="28"
        fontWeight="700"
        fill="#1D232A"
        letterSpacing="3"
        filter="url(#elegantShadow)"
      >
        SAPHIR
      </text>

      {/* Séparateur élégant */}
      <g opacity="0.8">
        <line x1="175" y1="25" x2="175" y2="35" stroke="url(#goldGradient)" strokeWidth="2" strokeLinecap="round" />
        <circle cx="175" cy="22" r="1.5" fill="url(#goldGradient)" />
        <circle cx="175" cy="38" r="1.5" fill="url(#goldGradient)" />
      </g>

      {/* TRAVEL - En or luxueux */}
      <text
        x="188"
        y="35"
        fontFamily="Cormorant Garamond, serif"
        fontSize="28"
        fontWeight="700"
        fill="url(#goldGradient)"
        letterSpacing="3"
        filter="url(#elegantShadow)"
      >
        TRAVEL
      </text>

      {/* Ornement droit */}
      <g opacity="0.6">
        <line x1="290" y1="30" x2="310" y2="30" stroke="url(#goldGradient)" strokeWidth="1.5" strokeLinecap="round" />
        <circle cx="288" cy="30" r="2" fill="url(#goldGradient)" />
        <circle cx="312" cy="30" r="2" fill="url(#goldGradient)" />
      </g>

      {/* Sous-ligne signature */}
      <line x1="45" y1="45" x2="298" y2="45" stroke="url(#goldGradient)" strokeWidth="0.5" opacity="0.4" />
    </svg>
  );
}
