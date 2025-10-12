import { getPayload } from 'payload';
import config from '@payload-config';
import Image from 'next/image';
import { normalizeMediaUrl } from '@/lib/env';

// Force dynamic rendering for this page
export const dynamic = 'force-dynamic';
export const revalidate = 0;

const carsContent = {
  en: {
    title: 'Luxury Car Rental',
    subtitle: 'Airport meet & greet • English-speaking drivers • Transparent pricing',
    description: 'Arrive in style with our premium fleet. All vehicles include airport meet & greet service, English-speaking drivers, and transparent pricing with no hidden fees.',
    features: [
      'Airport meet & greet included',
      'Professional English-speaking drivers',
      'Wi-Fi & child seats available',
      'Extended insurance options',
      'Flexible delivery & return',
    ],
    cta: {
      title: 'Ready to reserve?',
      subtitle: 'Contact us to get your personalized quote',
      whatsapp: 'Get Quote via WhatsApp',
      call: 'Call us',
    },
    comingSoon: 'Our car inventory is coming soon. Contact us for availability.',
    seats: 'seats',
    transmission: 'Transmission',
    from: 'From',
    day: '/day',
    withDriver: 'With driver',
    viewDetails: 'View Details',
  },
  fr: {
    title: 'Location de voiture de luxe',
    subtitle: 'Accueil aéroport • Chauffeurs anglophones • Prix transparents',
    description: 'Arrivez avec style grâce à notre flotte premium. Tous les véhicules incluent un service d\'accueil à l\'aéroport, des chauffeurs anglophones et des prix transparents sans frais cachés.',
    features: [
      'Accueil aéroport inclus',
      'Chauffeurs professionnels anglophones',
      'Wi-Fi et sièges enfants disponibles',
      'Options d\'assurance étendue',
      'Livraison et retour flexibles',
    ],
    cta: {
      title: 'Prêt à réserver ?',
      subtitle: 'Contactez-nous pour obtenir votre devis personnalisé',
      whatsapp: 'Devis via WhatsApp',
      call: 'Appelez-nous',
    },
    comingSoon: 'Notre inventaire de voitures arrive bientôt. Contactez-nous pour connaître les disponibilités.',
    seats: 'places',
    transmission: 'Transmission',
    from: 'À partir de',
    day: '/jour',
    withDriver: 'Avec chauffeur',
    viewDetails: 'Voir les détails',
  },
};

export default async function CarsPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const content = carsContent[lang as 'en' | 'fr'] || carsContent.en;

  // Fetch cars from Payload CMS with error handling
  let cars = [];
  try {
    const payload = await getPayload({ config });
    const carsResult = await payload.find({
      collection: 'cars',
      where: {
        published: {
          equals: true,
        },
      },
      locale: lang as 'en' | 'fr',
      depth: 2, // To populate image relationships
    });
    cars = carsResult.docs;
  } catch (error) {
    console.error('[Cars Page] Error fetching cars:', error);
    // Return empty array to show "coming soon" message instead of crashing
    cars = [];
  }

  const whatsappNumber = '+212774885461';
  const whatsappMessage = lang === 'en'
    ? 'Hello, I would like to get information about car rental services.'
    : 'Bonjour, je souhaite obtenir des informations sur la location de voiture.';
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

      {/* Features */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {content.features.map((feature, index) => (
                <div
                  key={index}
                  className="flex items-start gap-3 p-4 rounded-xl bg-[var(--color-ivory)] transition-all duration-300 hover:shadow-md"
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

      {/* Cars Grid */}
      <section className="py-20 bg-[var(--color-ivory)]">
        <div className="container mx-auto px-6">
          {cars.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
              {cars.map((car: any) => {
                const firstImage = car.images?.[0]?.image;
                const imageUrlRaw = typeof firstImage === 'object' && firstImage?.url ? firstImage.url : null;
                const imageUrl = imageUrlRaw ? normalizeMediaUrl(imageUrlRaw) : null;

                return (
                  <div
                    key={car.id}
                    className="card overflow-hidden transition-all duration-300 hover:shadow-xl hover:translate-y-[-4px]"
                  >
                    {/* Car Image */}
                    {imageUrl && (
                      <div className="relative h-64 w-full bg-[var(--color-tadelakt)]">
                        <Image
                          src={imageUrl}
                          alt={car.name || 'Car'}
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                      </div>
                    )}

                    {/* Car Info */}
                    <div className="p-6">
                      {/* Brand Badge */}
                      {car.brand && (
                        <div className="inline-block px-3 py-1 bg-[var(--color-brass)]/10 text-[var(--color-brass)] rounded-full text-sm font-medium mb-3">
                          {car.brand}
                        </div>
                      )}

                      {/* Car Name */}
                      <h3
                        className="text-2xl mb-3"
                        style={{
                          fontFamily: 'var(--font-cormorant)',
                        }}
                      >
                        {car.name}
                      </h3>

                      {/* Car Stats */}
                      <div className="flex flex-wrap gap-4 mb-4 text-sm text-[var(--color-muted)]">
                        {car.seats && (
                          <div className="flex items-center gap-1">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                            </svg>
                            <span>{car.seats} {content.seats}</span>
                          </div>
                        )}
                        {car.transmission && (
                          <div className="flex items-center gap-1">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                            </svg>
                            <span>{car.transmission}</span>
                          </div>
                        )}
                        {car.year && (
                          <div className="flex items-center gap-1">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            <span>{car.year}</span>
                          </div>
                        )}
                      </div>

                      {/* Included Items */}
                      {car.included && car.included.length > 0 && (
                        <div className="mb-4">
                          <ul className="space-y-1">
                            {car.included.slice(0, 3).map((item: any, idx: number) => (
                              <li key={idx} className="text-sm text-[var(--color-ebony)] flex items-start gap-2">
                                <svg className="w-4 h-4 text-[var(--color-brass)] flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                                <span>{item.text}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {/* Price & CTA */}
                      <div className="mt-6 pt-4 border-t border-[var(--color-tadelakt)]">
                        {car.priceDayNote && (
                          <div className="mb-3">
                            <div className="text-xs text-[var(--color-muted)] mb-1">{content.from}</div>
                            <div className="text-lg font-semibold text-[var(--color-ebony)]">
                              {car.priceDayNote}
                            </div>
                          </div>
                        )}
                        {car.priceWithDriverNote && (
                          <div className="mb-3">
                            <div className="text-xs text-[var(--color-muted)] mb-1">{content.withDriver}</div>
                            <div className="text-sm font-medium text-[var(--color-ebony)]">
                              {car.priceWithDriverNote}
                            </div>
                          </div>
                        )}

                        <a
                          href={`/${lang}/cars/${car.slug}`}
                          className="btn btn-ghost text-[var(--color-brass)] hover:bg-[var(--color-brass)]/10 w-full"
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
                      d="M13 10V3L4 14h7v7l9-11h-7z"
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
