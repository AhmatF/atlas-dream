import Hero from '@/components/Hero';
import BentoGrid from '@/components/BentoGrid';
import Icon from '@/components/Icon';
import Link from 'next/link';

const homeContent = {
  en: {
    hero: {
      headline: 'Luxury & authenticity in Marrakech — effortless.',
      subheadline: 'Private driver at the airport, curated villas, five‑star concierge — fluent English, transparent pricing.',
    },
    usps: [
      { text: 'Airport meet & greet', icon: 'airport_meet' },
      { text: 'English‑speaking drivers', icon: 'chauffeur' },
      { text: 'Transparent pricing', icon: 'transparent_pricing' },
      { text: 'Curated only • 24/7 support', icon: 'support_24_7' },
    ],
    contact: {
      title: 'Ready to start your journey?',
      subtitle: 'Contact us via WhatsApp or schedule a call',
      whatsapp: 'Message on WhatsApp',
      call: 'Call us',
    },
  },
  fr: {
    hero: {
      headline: 'Le luxe & l\'authentique à Marrakech, sans effort.',
      subheadline: 'Chauffeur privé à l\'aéroport, villas sélectionnées, conciergerie 5★ — en anglais, prix clairs.',
    },
    usps: [
      { text: 'Accueil aéroport', icon: 'airport_meet' },
      { text: 'Chauffeurs anglophones', icon: 'chauffeur' },
      { text: 'Prix 100% clairs', icon: 'transparent_pricing' },
      { text: 'Sélection ultra‑soignée • Assistance 24/7', icon: 'support_24_7' },
    ],
    contact: {
      title: 'Prêt à commencer votre voyage ?',
      subtitle: 'Contactez-nous via WhatsApp ou planifiez un appel',
      whatsapp: 'Message WhatsApp',
      call: 'Appelez-nous',
    },
  },
};

export default async function HomePage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const content = homeContent[lang as 'en' | 'fr'] || homeContent.en;

  const whatsappNumber = '+212774885461';
  const whatsappMessage = lang === 'en'
    ? 'Hello, I would like to get more information about Atlas Dream services.'
    : 'Bonjour, je souhaite obtenir plus d\'informations sur les services Atlas Dream.';
  const whatsappLink = `https://wa.me/${whatsappNumber.replace('+', '').replace(/\s/g, '')}?text=${encodeURIComponent(whatsappMessage)}`;
  const callLink = `tel:${whatsappNumber.replace(/\s/g, '')}`;

  return (
    <>
      {/* Hero Section */}
      <Hero
        headline={content.hero.headline}
        subheadline={content.hero.subheadline}
        imageSrc="/images/hero_ryad.jpg"
        lang={lang}
      />

      {/* USPs Section */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {content.usps.map((usp, index) => (
              <div
                key={index}
                className="flex items-center gap-3 p-4 rounded-xl bg-[var(--color-ivory)] transition-all duration-300 hover:shadow-md"
              >
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-[var(--color-brass)] flex items-center justify-center p-2">
                  <Icon name={usp.icon} className="w-full h-full object-contain brightness-0 invert" />
                </div>
                <p className="text-sm font-medium text-[var(--color-ebony)]">{usp.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bento Grid Section */}
      <BentoGrid lang={lang} />

      {/* Contact CTA Section */}
      <section className="py-20 bg-[var(--color-ebony)] text-white">
        <div className="container mx-auto px-6 text-center">
          <h2
            className="mb-4"
            style={{
              fontFamily: 'var(--font-cormorant)',
            }}
          >
            {content.contact.title}
          </h2>
          <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
            {content.contact.subtitle}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary bg-[var(--color-brass)] hover:bg-[#b38a48] inline-flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
              </svg>
              {content.contact.whatsapp}
            </a>
            <a
              href={callLink}
              className="btn btn-ghost-light inline-flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              {content.contact.call}
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
