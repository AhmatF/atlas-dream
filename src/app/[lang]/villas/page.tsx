import { getPayload } from 'payload';
import config from '@payload-config';
import Image from 'next/image';

const villasContent = {
  en: {
    title: 'Luxury Villas',
    subtitle: 'Curated properties in Marrakech\'s finest districts',
    description: 'Discover handpicked villas in the most sought-after neighborhoods of Marrakech. Each property is carefully selected to ensure the perfect blend of luxury, authenticity, and comfort.',
    districts: {
      title: 'Explore by district',
      list: [
        { name: 'Palmeraie', description: 'Palm grove oasis' },
        { name: 'Hivernage', description: 'Modern luxury district' },
        { name: 'Agdal', description: 'Garden district' },
        { name: 'Guéliz', description: 'Contemporary Marrakech' },
        { name: 'Route de l\'Ourika', description: 'Mountain views' },
        { name: 'Amelkis', description: 'Golf resort area' },
        { name: 'Al Maaden', description: 'Exclusive residences' },
        { name: 'Médina', description: 'Historic heart' },
      ],
    },
    features: [
      'Concierge services available',
      'Private pools & gardens',
      'Housekeeping included',
      'Airport transfers',
      'Flexible check-in/out',
    ],
    cta: {
      title: 'Find your perfect villa',
      subtitle: 'Contact us to discover available properties',
      whatsapp: 'Browse Villas on WhatsApp',
      call: 'Call us',
    },
    comingSoon: 'Our villa catalog is coming soon. Contact us to discuss your requirements.',
    allDistricts: 'All districts',
    bedrooms: 'bedrooms',
    bathrooms: 'bathrooms',
    guests: 'guests',
    from: 'From',
    night: '/night',
    minNights: 'min nights',
    viewDetails: 'View Details',
  },
  fr: {
    title: 'Villas de luxe',
    subtitle: 'Propriétés sélectionnées dans les meilleurs quartiers de Marrakech',
    description: 'Découvrez des villas triées sur le volet dans les quartiers les plus prisés de Marrakech. Chaque propriété est soigneusement sélectionnée pour garantir le mélange parfait de luxe, d\'authenticité et de confort.',
    districts: {
      title: 'Explorer par quartier',
      list: [
        { name: 'Palmeraie', description: 'Oasis de palmeraie' },
        { name: 'Hivernage', description: 'Quartier de luxe moderne' },
        { name: 'Agdal', description: 'Quartier des jardins' },
        { name: 'Guéliz', description: 'Marrakech contemporain' },
        { name: 'Route de l\'Ourika', description: 'Vue sur les montagnes' },
        { name: 'Amelkis', description: 'Zone de golf' },
        { name: 'Al Maaden', description: 'Résidences exclusives' },
        { name: 'Médina', description: 'Cœur historique' },
      ],
    },
    features: [
      'Services de conciergerie disponibles',
      'Piscines privées et jardins',
      'Ménage inclus',
      'Transferts aéroport',
      'Arrivée/départ flexibles',
    ],
    cta: {
      title: 'Trouvez votre villa idéale',
      subtitle: 'Contactez-nous pour découvrir les propriétés disponibles',
      whatsapp: 'Parcourir les villas sur WhatsApp',
      call: 'Appelez-nous',
    },
    comingSoon: 'Notre catalogue de villas arrive bientôt. Contactez-nous pour discuter de vos besoins.',
    allDistricts: 'Tous les quartiers',
    bedrooms: 'chambres',
    bathrooms: 'salles de bain',
    guests: 'personnes',
    from: 'À partir de',
    night: '/nuit',
    minNights: 'nuits minimum',
    viewDetails: 'Voir les détails',
  },
};

export default async function VillasPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const content = villasContent[lang as 'en' | 'fr'] || villasContent.en;

  // Fetch villas from Payload CMS
  const payload = await getPayload({ config });
  const villasResult = await payload.find({
    collection: 'villas',
    where: {
      published: {
        equals: true,
      },
    },
    locale: lang as 'en' | 'fr',
    depth: 2, // To populate image relationships
  });

  const villas = villasResult.docs;

  const whatsappNumber = '+212774885461';
  const whatsappMessage = lang === 'en'
    ? 'Hello, I would like to get information about villa rentals.'
    : 'Bonjour, je souhaite obtenir des informations sur la location de villas.';
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

      {/* Districts */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <h3
            className="text-3xl mb-8 text-center"
            style={{
              fontFamily: 'var(--font-cormorant)',
            }}
          >
            {content.districts.title}
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-6xl mx-auto">
            {content.districts.list.map((district, index) => (
              <div
                key={index}
                className="p-4 rounded-xl bg-[var(--color-ivory)] transition-all duration-300 hover:shadow-md hover:translate-y-[-2px]"
              >
                <h4 className="font-semibold text-[var(--color-ebony)] mb-1">
                  {district.name}
                </h4>
                <p className="text-sm text-[var(--color-muted)]">{district.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-[var(--color-ivory)]">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {content.features.map((feature, index) => (
                <div
                  key={index}
                  className="flex items-start gap-3 p-4 rounded-xl bg-white transition-all duration-300 hover:shadow-md"
                >
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[var(--color-brass)] flex items-center justify-center">
                    <svg
                      className="w-4 h-4 text-white"
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
                  </div>
                  <p className="text-base text-[var(--color-ebony)] font-medium">{feature}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Villas Grid */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          {villas.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
              {villas.map((villa: any) => {
                const firstImage = villa.images?.[0]?.image;
                const imageUrl = typeof firstImage === 'object' && firstImage?.url ? firstImage.url : null;

                return (
                  <div
                    key={villa.id}
                    className="card overflow-hidden transition-all duration-300 hover:shadow-xl hover:translate-y-[-4px]"
                  >
                    {/* Villa Image */}
                    {imageUrl && (
                      <div className="relative h-64 w-full bg-[var(--color-tadelakt)]">
                        <Image
                          src={imageUrl}
                          alt={villa.name || 'Villa'}
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                      </div>
                    )}

                    {/* Villa Info */}
                    <div className="p-6">
                      {/* District Badge */}
                      {villa.district && (
                        <div className="inline-block px-3 py-1 bg-[var(--color-brass)]/10 text-[var(--color-brass)] rounded-full text-sm font-medium mb-3">
                          {villa.district}
                        </div>
                      )}

                      {/* Villa Name */}
                      <h3
                        className="text-2xl mb-3"
                        style={{
                          fontFamily: 'var(--font-cormorant)',
                        }}
                      >
                        {villa.name}
                      </h3>

                      {/* Villa Stats */}
                      <div className="flex flex-wrap gap-4 mb-4 text-sm text-[var(--color-muted)]">
                        {villa.bedrooms && (
                          <div className="flex items-center gap-1">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                            </svg>
                            <span>{villa.bedrooms} {content.bedrooms}</span>
                          </div>
                        )}
                        {villa.bathrooms && (
                          <div className="flex items-center gap-1">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            <span>{villa.bathrooms} {content.bathrooms}</span>
                          </div>
                        )}
                        {villa.guests && (
                          <div className="flex items-center gap-1">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                            </svg>
                            <span>{villa.guests} {content.guests}</span>
                          </div>
                        )}
                      </div>

                      {/* Highlights */}
                      {villa.highlights && villa.highlights.length > 0 && (
                        <div className="mb-4">
                          <ul className="space-y-1">
                            {villa.highlights.slice(0, 3).map((highlight: any, idx: number) => (
                              <li key={idx} className="text-sm text-[var(--color-ebony)] flex items-start gap-2">
                                <svg className="w-4 h-4 text-[var(--color-brass)] flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                                <span>{highlight.text}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {/* Price & CTA */}
                      <div className="mt-6 pt-4 border-t border-[var(--color-tadelakt)] flex items-center justify-between">
                        {villa.pricePerNightNote && (
                          <div>
                            <div className="text-xs text-[var(--color-muted)] mb-1">{content.from}</div>
                            <div className="text-lg font-semibold text-[var(--color-ebony)]">
                              {villa.pricePerNightNote}
                            </div>
                            {villa.minNights && villa.minNights > 1 && (
                              <div className="text-xs text-[var(--color-muted)]">
                                {villa.minNights} {content.minNights}
                              </div>
                            )}
                          </div>
                        )}

                        <a
                          href={`/${lang}/villas/${villa.slug}`}
                          className="btn btn-ghost text-[var(--color-brass)] hover:bg-[var(--color-brass)]/10"
                        >
                          {content.viewDetails}
                        </a>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="max-w-4xl mx-auto text-center">
              <div className="card p-12">
                <div className="w-20 h-20 bg-[var(--color-brass)]/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg
                    className="w-10 h-10 text-[var(--color-brass)]"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                    />
                  </svg>
                </div>
                <h3
                  className="text-2xl mb-4"
                  style={{
                    fontFamily: 'var(--font-cormorant)',
                  }}
                >
                  {content.comingSoon}
                </h3>
              </div>
            </div>
          )}
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
              className="btn btn-ghost-light inline-flex items-center gap-2"
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
