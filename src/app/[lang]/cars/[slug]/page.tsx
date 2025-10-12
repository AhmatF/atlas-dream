import { getPayload } from 'payload';
import config from '@payload-config';
import Image from 'next/image';
import { notFound } from 'next/navigation';

const carDetailContent = {
  en: {
    backToCars: '← Back to Cars',
    specifications: 'Specifications',
    seats: 'Seats',
    transmission: 'Transmission',
    year: 'Year',
    color: 'Color',
    brand: 'Brand',
    pricing: 'Pricing',
    pricePerDay: 'Price per day',
    priceWithDriver: 'With driver',
    deposit: 'Deposit',
    included: 'Included',
    options: 'Available Options',
    airportMeet: 'Airport meet & greet included',
    availability: 'Availability',
    availableIn: 'Available in',
    cta: {
      title: 'Ready to reserve this vehicle?',
      subtitle: 'Contact us to get your personalized quote',
      whatsapp: 'Reserve via WhatsApp',
      call: 'Call us',
    },
  },
  fr: {
    backToCars: '← Retour aux voitures',
    specifications: 'Spécifications',
    seats: 'Places',
    transmission: 'Transmission',
    year: 'Année',
    color: 'Couleur',
    brand: 'Marque',
    pricing: 'Tarification',
    pricePerDay: 'Prix par jour',
    priceWithDriver: 'Avec chauffeur',
    deposit: 'Dépôt',
    included: 'Inclus',
    options: 'Options disponibles',
    airportMeet: 'Accueil aéroport inclus',
    availability: 'Disponibilité',
    availableIn: 'Disponible à',
    cta: {
      title: 'Prêt à réserver ce véhicule ?',
      subtitle: 'Contactez-nous pour obtenir votre devis personnalisé',
      whatsapp: 'Réserver via WhatsApp',
      call: 'Appelez-nous',
    },
  },
};

export default async function CarDetailPage({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}) {
  const { lang, slug } = await params;
  const content = carDetailContent[lang as 'en' | 'fr'] || carDetailContent.en;

  // Fetch the car from Payload CMS
  const payload = await getPayload({ config });
  const carsResult = await payload.find({
    collection: 'cars',
    where: {
      slug: {
        equals: slug,
      },
      published: {
        equals: true,
      },
    },
    locale: lang as 'en' | 'fr',
    depth: 2,
    limit: 1,
  });

  if (carsResult.docs.length === 0) {
    notFound();
  }

  const car = carsResult.docs[0] as any;

  const whatsappNumber = '+212774885461';
  const whatsappMessage = lang === 'en'
    ? `Hello, I would like to reserve the ${car.name}.`
    : `Bonjour, je souhaite réserver ${car.name}.`;
  const whatsappLink = `https://wa.me/${whatsappNumber.replace('+', '').replace(/\s/g, '')}?text=${encodeURIComponent(whatsappMessage)}`;
  const callLink = `tel:${whatsappNumber.replace(/\s/g, '')}`;

  return (
    <>
      {/* Back Navigation */}
      <section className="py-6 bg-[var(--color-ivory)]">
        <div className="container mx-auto px-6">
          <a
            href={`/${lang}/cars`}
            className="text-[var(--color-brass)] hover:text-[var(--color-ebony)] transition-colors inline-flex items-center gap-2"
          >
            {content.backToCars}
          </a>
        </div>
      </section>

      {/* Hero Section with Image Gallery */}
      <section className="py-12 bg-[var(--color-ivory)]">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            {/* Brand Badge */}
            {car.brand && (
              <div className="inline-block px-4 py-2 bg-[var(--color-brass)]/10 text-[var(--color-brass)] rounded-full text-sm font-medium mb-4">
                {car.brand}
              </div>
            )}

            {/* Car Name */}
            <h1
              className="mb-8"
              style={{
                fontFamily: 'var(--font-cormorant)',
              }}
            >
              {car.name}
            </h1>

            {/* Image Gallery */}
            {car.images && car.images.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                {car.images.map((item: any, index: number) => {
                  const image = item.image;
                  const imageUrl = typeof image === 'object' && image?.url ? image.url : null;
                  if (!imageUrl) return null;

                  return (
                    <div
                      key={index}
                      className={`relative rounded-xl overflow-hidden ${
                        index === 0 ? 'md:col-span-2 h-96' : 'h-64'
                      }`}
                    >
                      <Image
                        src={imageUrl}
                        alt={car.name || 'Car image'}
                        fill
                        className="object-cover"
                        sizes={index === 0 ? '100vw' : '(max-width: 768px) 100vw, 50vw'}
                        priority={index === 0}
                      />
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Details Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Specifications */}
              <div className="card p-8">
                <h2
                  className="text-3xl mb-6"
                  style={{
                    fontFamily: 'var(--font-cormorant)',
                  }}
                >
                  {content.specifications}
                </h2>
                <div className="grid grid-cols-2 gap-6">
                  {car.seats && (
                    <div className="flex items-start gap-3">
                      <svg className="w-5 h-5 text-[var(--color-brass)] mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                      <div>
                        <div className="text-sm text-[var(--color-muted)]">{content.seats}</div>
                        <div className="font-medium text-[var(--color-ebony)]">{car.seats}</div>
                      </div>
                    </div>
                  )}
                  {car.transmission && (
                    <div className="flex items-start gap-3">
                      <svg className="w-5 h-5 text-[var(--color-brass)] mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                      </svg>
                      <div>
                        <div className="text-sm text-[var(--color-muted)]">{content.transmission}</div>
                        <div className="font-medium text-[var(--color-ebony)]">{car.transmission}</div>
                      </div>
                    </div>
                  )}
                  {car.year && (
                    <div className="flex items-start gap-3">
                      <svg className="w-5 h-5 text-[var(--color-brass)] mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <div>
                        <div className="text-sm text-[var(--color-muted)]">{content.year}</div>
                        <div className="font-medium text-[var(--color-ebony)]">{car.year}</div>
                      </div>
                    </div>
                  )}
                  {car.color && (
                    <div className="flex items-start gap-3">
                      <svg className="w-5 h-5 text-[var(--color-brass)] mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                      </svg>
                      <div>
                        <div className="text-sm text-[var(--color-muted)]">{content.color}</div>
                        <div className="font-medium text-[var(--color-ebony)]">{car.color}</div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Included Items */}
              {car.included && car.included.length > 0 && (
                <div className="card p-8">
                  <h2
                    className="text-3xl mb-6"
                    style={{
                      fontFamily: 'var(--font-cormorant)',
                    }}
                  >
                    {content.included}
                  </h2>
                  <ul className="space-y-3">
                    {car.included.map((item: any, idx: number) => (
                      <li key={idx} className="flex items-start gap-3">
                        <svg className="w-5 h-5 text-[var(--color-brass)] flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="text-[var(--color-ebony)]">{item.text}</span>
                      </li>
                    ))}
                  </ul>
                  {car.airportMeet && (
                    <div className="mt-4 pt-4 border-t border-[var(--color-tadelakt)]">
                      <div className="flex items-start gap-3">
                        <svg className="w-5 h-5 text-[var(--color-brass)] flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="text-[var(--color-ebony)] font-medium">{content.airportMeet}</span>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Options */}
              {car.options && car.options.length > 0 && (
                <div className="card p-8">
                  <h2
                    className="text-3xl mb-6"
                    style={{
                      fontFamily: 'var(--font-cormorant)',
                    }}
                  >
                    {content.options}
                  </h2>
                  <div className="space-y-4">
                    {car.options.map((option: any, idx: number) => (
                      <div key={idx} className="flex items-center justify-between p-4 rounded-lg bg-[var(--color-ivory)]">
                        <span className="text-[var(--color-ebony)] font-medium">{option.name}</span>
                        {option.priceNote && (
                          <span className="text-[var(--color-muted)]">{option.priceNote}</span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Availability */}
              {(car.availabilityNote || (car.districts && car.districts.length > 0)) && (
                <div className="card p-8">
                  <h2
                    className="text-3xl mb-6"
                    style={{
                      fontFamily: 'var(--font-cormorant)',
                    }}
                  >
                    {content.availability}
                  </h2>
                  {car.availabilityNote && (
                    <p className="text-[var(--color-ebony)] mb-4 whitespace-pre-line">{car.availabilityNote}</p>
                  )}
                  {car.districts && car.districts.length > 0 && (
                    <div>
                      <div className="text-sm text-[var(--color-muted)] mb-2">{content.availableIn}</div>
                      <div className="flex flex-wrap gap-2">
                        {car.districts.map((district: string, idx: number) => (
                          <span
                            key={idx}
                            className="px-3 py-1 bg-[var(--color-brass)]/10 text-[var(--color-brass)] rounded-full text-sm"
                          >
                            {district}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Sidebar - Pricing & CTA */}
            <div className="lg:col-span-1">
              <div className="card p-8 sticky top-6">
                <h2
                  className="text-2xl mb-6"
                  style={{
                    fontFamily: 'var(--font-cormorant)',
                  }}
                >
                  {content.pricing}
                </h2>

                {car.priceDayNote && (
                  <div className="mb-4 pb-4 border-b border-[var(--color-tadelakt)]">
                    <div className="text-sm text-[var(--color-muted)] mb-1">{content.pricePerDay}</div>
                    <div className="text-2xl font-semibold text-[var(--color-ebony)]">
                      {car.priceDayNote}
                    </div>
                  </div>
                )}

                {car.priceWithDriverNote && (
                  <div className="mb-4 pb-4 border-b border-[var(--color-tadelakt)]">
                    <div className="text-sm text-[var(--color-muted)] mb-1">{content.priceWithDriver}</div>
                    <div className="text-lg font-medium text-[var(--color-ebony)]">
                      {car.priceWithDriverNote}
                    </div>
                  </div>
                )}

                {car.depositNote && (
                  <div className="mb-6">
                    <div className="text-sm text-[var(--color-muted)] mb-1">{content.deposit}</div>
                    <div className="text-base text-[var(--color-ebony)]">
                      {car.depositNote}
                    </div>
                  </div>
                )}

                {/* CTAs */}
                <div className="space-y-3">
                  <a
                    href={whatsappLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-primary bg-[var(--color-brass)] hover:bg-[#b38a48] w-full inline-flex items-center justify-center gap-2"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                    </svg>
                    {content.cta.whatsapp}
                  </a>
                  <a
                    href={callLink}
                    className="btn btn-ghost w-full inline-flex items-center justify-center gap-2"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    {content.cta.call}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
