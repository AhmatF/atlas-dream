const conciergeContent = {
  en: {
    title: 'Concierge Services',
    subtitle: 'Five-star service, 24/7 support for your perfect stay',
    description: 'Experience Marrakech like a local with our premium concierge services. From restaurant reservations to private tours, we handle every detail of your journey.',
    packs: {
      title: 'Service Packages',
      items: [
        {
          tier: 'Essential',
          name: 'Essential',
          description: 'Perfect for short stays',
          features: [
            'Restaurant reservations',
            'Activity recommendations',
            'Local tips & guidance',
            'WhatsApp support',
          ],
          priceNote: 'From €50/day',
        },
        {
          tier: 'Signature',
          name: 'Signature',
          description: 'Our most popular choice',
          features: [
            'Everything in Essential',
            'Private tours & experiences',
            'Airport fast-track',
            'Personal driver on-call',
            '24/7 phone support',
          ],
          priceNote: 'From €150/day',
          highlighted: true,
        },
        {
          tier: 'Prestige',
          name: 'Prestige',
          description: 'Ultimate luxury experience',
          features: [
            'Everything in Signature',
            'Dedicated concierge agent',
            'Exclusive event access',
            'Private chef arrangements',
            'Luxury shopping assistance',
            'VIP experiences',
          ],
          priceNote: 'From €350/day',
        },
      ],
    },
    alacarte: {
      title: 'À-la-carte Services',
      categories: [
        {
          name: 'Dining',
          services: ['Restaurant reservations', 'Private chef', 'Food tours'],
        },
        {
          name: 'Activities',
          services: ['Desert excursions', 'Hot air balloon', 'Spa bookings', 'Golf arrangements'],
        },
        {
          name: 'Shopping',
          services: ['Souk tours', 'Personal shopper', 'Artisan visits'],
        },
        {
          name: 'Transport',
          services: ['Airport transfers', 'Private driver', 'Helicopter tours'],
        },
      ],
    },
    cta: {
      title: 'Ready to elevate your stay?',
      subtitle: 'Contact us to customize your concierge package',
      whatsapp: 'Discuss on WhatsApp',
      call: 'Call us',
    },
  },
  fr: {
    title: 'Services de conciergerie',
    subtitle: 'Service 5 étoiles, assistance 24/7 pour votre séjour',
    description: 'Découvrez Marrakech comme un local avec nos services de conciergerie premium. Des réservations de restaurants aux visites privées, nous gérons chaque détail de votre voyage.',
    packs: {
      title: 'Forfaits de services',
      items: [
        {
          tier: 'Essential',
          name: 'Essentiel',
          description: 'Parfait pour les courts séjours',
          features: [
            'Réservations de restaurants',
            'Recommandations d\'activités',
            'Conseils locaux',
            'Support WhatsApp',
          ],
          priceNote: 'À partir de 50€/jour',
        },
        {
          tier: 'Signature',
          name: 'Signature',
          description: 'Notre choix le plus populaire',
          features: [
            'Tout l\'Essentiel',
            'Tours et expériences privés',
            'Fast-track aéroport',
            'Chauffeur personnel sur appel',
            'Support téléphonique 24/7',
          ],
          priceNote: 'À partir de 150€/jour',
          highlighted: true,
        },
        {
          tier: 'Prestige',
          name: 'Prestige',
          description: 'Expérience de luxe ultime',
          features: [
            'Tout le Signature',
            'Agent de conciergerie dédié',
            'Accès événements exclusifs',
            'Chef privé',
            'Assistance shopping de luxe',
            'Expériences VIP',
          ],
          priceNote: 'À partir de 350€/jour',
        },
      ],
    },
    alacarte: {
      title: 'Services à la carte',
      categories: [
        {
          name: 'Restauration',
          services: ['Réservations restaurants', 'Chef privé', 'Tours gastronomiques'],
        },
        {
          name: 'Activités',
          services: ['Excursions désert', 'Montgolfière', 'Réservations spa', 'Golf'],
        },
        {
          name: 'Shopping',
          services: ['Tours des souks', 'Personal shopper', 'Visites artisans'],
        },
        {
          name: 'Transport',
          services: ['Transferts aéroport', 'Chauffeur privé', 'Tours en hélicoptère'],
        },
      ],
    },
    cta: {
      title: 'Prêt à sublimer votre séjour ?',
      subtitle: 'Contactez-nous pour personnaliser votre forfait',
      whatsapp: 'Discuter sur WhatsApp',
      call: 'Appelez-nous',
    },
  },
};

export default async function ConciergePage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const content = conciergeContent[lang as 'en' | 'fr'] || conciergeContent.en;

  const whatsappNumber = '+212774885461';
  const whatsappMessage = lang === 'en'
    ? 'Hello, I would like to get information about concierge services.'
    : 'Bonjour, je souhaite obtenir des informations sur les services de conciergerie.';
  const whatsappLink = `https://wa.me/${whatsappNumber.replace('+', '').replace(/\s/g, '')}?text=${encodeURIComponent(whatsappMessage)}`;
  const callLink = `tel:${whatsappNumber.replace(/\s/g, '')}`;

  return (
    <>
      {/* Header */}
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
            <p className="text-xl text-[var(--color-muted)] mb-8">
              {content.subtitle}
            </p>
            <p className="text-lg leading-relaxed text-[var(--color-ebony)]">
              {content.description}
            </p>
          </div>
        </div>
      </section>

      {/* Service Packages */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <h2
            className="text-center mb-12"
            style={{
              fontFamily: 'var(--font-cormorant)',
            }}
          >
            {content.packs.title}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {content.packs.items.map((pack, index) => (
              <div
                key={index}
                className={`card p-8 transition-all duration-300 ${
                  pack.highlighted
                    ? 'ring-2 ring-[var(--color-brass)] transform scale-105'
                    : ''
                }`}
              >
                {pack.highlighted && (
                  <div className="badge mb-4">Popular</div>
                )}
                <h3
                  className="text-2xl mb-2"
                  style={{
                    fontFamily: 'var(--font-cormorant)',
                  }}
                >
                  {pack.name}
                </h3>
                <p className="text-[var(--color-muted)] mb-4">{pack.description}</p>
                <p className="text-xl font-semibold text-[var(--color-brass)] mb-6">
                  {pack.priceNote}
                </p>
                <ul className="space-y-3 mb-8">
                  {pack.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <svg
                        className="w-5 h-5 text-[var(--color-brass)] flex-shrink-0 mt-0.5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* À-la-carte Services */}
      <section className="py-20 bg-[var(--color-ivory)]">
        <div className="container mx-auto px-6">
          <h2
            className="text-center mb-12"
            style={{
              fontFamily: 'var(--font-cormorant)',
            }}
          >
            {content.alacarte.title}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {content.alacarte.categories.map((category, index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-6 transition-all duration-300 hover:shadow-md"
              >
                <h4 className="font-semibold text-lg mb-4 text-[var(--color-ebony)]">
                  {category.name}
                </h4>
                <ul className="space-y-2">
                  {category.services.map((service, idx) => (
                    <li key={idx} className="text-sm text-[var(--color-muted)] flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-brass)]" />
                      {service}
                    </li>
                  ))}
                </ul>
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
              {content.cta.whatsapp}
            </a>
            <a
              href={callLink}
              className="btn btn-ghost border-white/30 hover:bg-white/10 inline-flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              {content.cta.call}
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
