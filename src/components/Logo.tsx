'use client';

import Image from 'next/image';
import { CSSProperties } from 'react';

interface LogoProps {
  className?: string;
  style?: CSSProperties;
}

export default function Logo({ className = 'h-10 md:h-12', style }: LogoProps) {
  return (
    <Image
      src="/logo/saphir-travel-logo.png"
      alt="Saphir Travel - Luxury Travel in Marrakech"
      width={1024}
      height={1024}
      className={className}
      style={{ width: 'auto', height: 'auto', objectFit: 'contain', ...style }}
      priority
    />
  );
}
