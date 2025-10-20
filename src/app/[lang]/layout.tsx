import type { Metadata } from 'next';
import { Inter, Cormorant_Garamond } from 'next/font/google';
import '../globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['600', '700'],
  variable: '--font-cormorant',
});

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;

  const titles = {
    en: 'Saphir Travel | Luxury Travel Marrakech',
    fr: 'Saphir Travel | Voyage de luxe Marrakech',
  };

  const descriptions = {
    en: 'Luxury car rentals, villa bookings, and concierge services in Marrakech. Airport meet & greet, English-speaking drivers, transparent pricing.',
    fr: 'Location de voitures de luxe, villas et services de conciergerie à Marrakech. Accueil aéroport, chauffeurs anglophones, prix transparents.',
  };

  return {
    title: titles[lang as 'en' | 'fr'] || titles.en,
    description: descriptions[lang as 'en' | 'fr'] || descriptions.en,
  };
}

export default async function LangLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;

  return (
    <html lang={lang} className={`${inter.variable} ${cormorant.variable}`}>
      <body>
        <Navbar lang={lang} />
        <main className="pt-[72px]">{children}</main>
        <Footer lang={lang} />
      </body>
    </html>
  );
}
