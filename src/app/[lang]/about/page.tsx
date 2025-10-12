// Force dynamic rendering
export const dynamic = 'force-dynamic';
export const revalidate = 0;

const aboutContent = {
  en: {
    title: 'About Atlas Dream',
    subtitle: 'Your luxury concierge in Marrakech',
    sections: [
      {
        title: 'Who We Are',
        content:
          'Atlas Dream is a premium concierge service dedicated to making your stay in Marrakech unforgettable. With years of local expertise and a passion for excellence, we curate exceptional experiences tailored to your desires.',
      },
      {
        title: 'Our Mission',
        content:
          'We believe that every journey should be extraordinary. Our mission is to provide seamless, personalized service that transforms your Marrakech experience into lasting memories. From luxury villa rentals to private tours, we handle every detail with care.',
      },
      {
        title: 'What Sets Us Apart',
        content:
          'Local expertise, attention to detail, and 24/7 availability. We work with trusted partners across Marrakech to ensure you receive the highest quality service. Whether you need a private chef, airport transfer, or exclusive access to local experiences, we make it happen.',
      },
    ],
    cta: {
      title: 'Ready to experience Marrakech in style?',
      subtitle: 'Contact us to start planning your perfect stay',
      button: 'Get in Touch',
    },
  },
  fr: {
    title: 'À propos d\'Atlas Dream',
    subtitle: 'Votre conciergerie de luxe à Marrakech',
    sections: [
      {
        title: 'Qui Sommes-Nous',
        content:
          'Atlas Dream est un service de conciergerie premium dédié à rendre votre séjour à Marrakech inoubliable. Avec des années d\'expertise locale et une passion pour l\'excellence, nous organisons des expériences exceptionnelles adaptées à vos désirs.',
      },
      {
        title: 'Notre Mission',
        content:
          'Nous croyons que chaque voyage doit être extraordinaire. Notre mission est de fournir un service personnalisé et sans faille qui transforme votre expérience à Marrakech en souvenirs durables. De la location de villas de luxe aux tours privés, nous gérons chaque détail avec soin.',
      },
      {
        title: 'Ce Qui Nous Distingue',
        content:
          'Expertise locale, attention aux détails et disponibilité 24/7. Nous travaillons avec des partenaires de confiance à travers Marrakech pour vous garantir un service de la plus haute qualité. Que vous ayez besoin d\'un chef privé, d\'un transfert aéroport ou d\'un accès exclusif à des expériences locales, nous réalisons vos souhaits.',
      },
    ],
    cta: {
      title: 'Prêt à découvrir Marrakech avec style ?',
      subtitle: 'Contactez-nous pour commencer à planifier votre séjour parfait',
      button: 'Nous Contacter',
    },
  },
};

export default async function AboutPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const content = aboutContent[lang as 'en' | 'fr'] || aboutContent.en;

  return (
    <>
      {/* Hero Section */}
      <section className="py-20 bg-[var(--color-ivory)]">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h1
              className="mb-6"
              style={{
                fontFamily: 'var(--font-cormorant)',
              }}
            >
              {content.title}
            </h1>
            <p className="text-xl text-[var(--color-muted)]">
              {content.subtitle}
            </p>
          </div>
        </div>
      </section>

      {/* Content Sections */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto space-y-16">
            {content.sections.map((section, index) => (
              <div key={index} className="space-y-4">
                <h2
                  className="text-3xl"
                  style={{
                    fontFamily: 'var(--font-cormorant)',
                  }}
                >
                  {section.title}
                </h2>
                <p className="text-lg leading-relaxed text-[var(--color-ebony)]">
                  {section.content}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-[var(--color-ebony)] text-white">
        <div className="container mx-auto px-6 text-center">
          <h2
            className="mb-4"
            style={{
              fontFamily: 'var(--font-cormorant)',
            }}
          >
            {content.cta.title}
          </h2>
          <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
            {content.cta.subtitle}
          </p>
          <a
            href={`/${lang}/contact`}
            className="btn btn-primary bg-[var(--color-brass)] hover:bg-[#b38a48] inline-flex items-center gap-2"
          >
            {content.cta.button}
          </a>
        </div>
      </section>
    </>
  );
}

