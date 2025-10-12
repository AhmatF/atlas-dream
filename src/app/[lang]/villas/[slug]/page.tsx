import { getPayload } from 'payload';
import config from '@payload-config';
import Image from 'next/image';
import { normalizeMediaUrl } from '@/lib/env';
import { notFound } from 'next/navigation';

// Force dynamic rendering for this page
export const dynamic = 'force-dynamic';
export const revalidate = 0;

const villaDetailContent = {
  en: {
    backToVillas: '← Back to Villas',
    overview: 'Overview',
    bedrooms: 'Bedrooms',
    bathrooms: 'Bathrooms',
    guests: 'Max Guests',
    district: 'District',
    highlights: 'Highlights',
    amenities: 'Amenities',
    conciergeIncluded: 'Concierge services included',
    pricing: 'Pricing',
    pricePerNight: 'Price per night',
    minNights: 'Minimum stay',
    nights: 'nights',
    policies: 'Policies',
    location: 'Location',
    cta: {
      title: 'Reserve this villa',
      subtitle: 'Contact us for availability and booking',
      whatsapp: 'Reserve via WhatsApp',
      call: 'Call us',
    },
  },
  fr: {
    backToVillas: '← Retour aux villas',
    overview: 'Vue d\'ensemble',
    bedrooms: 'Chambres',
    bathrooms: 'Salles de bain',
    guests: 'Personnes max',
    district: 'Quartier',
    highlights: 'Points forts',
    amenities: 'Équipements',
    conciergeIncluded: 'Services de conciergerie inclus',
    pricing: 'Tarification',
    pricePerNight: 'Prix par nuit',
    minNights: 'Séjour minimum',
    nights: 'nuits',
    policies: 'Politiques',
    location: 'Emplacement',
    cta: {
      title: 'Réserver cette villa',
      subtitle: 'Contactez-nous pour les disponibilités et la réservation',
      whatsapp: 'Réserver via WhatsApp',
      call: 'Appelez-nous',
    },
  },
};

export default async function VillaDetailPage({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}) {
  const { lang, slug } = await params;
  const content = villaDetailContent[lang as 'en' | 'fr'] || villaDetailContent.en;

  // Fetch the villa from Payload CMS
  const payload = await getPayload({ config });
  const villasResult = await payload.find({
    collection: 'villas',
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

  if (villasResult.docs.length === 0) {
    notFound();
  }

  const villa = villasResult.docs[0] as any;

  const whatsappNumber = '+212774885461';
  const whatsappMessage = lang === 'en'
    ? `Hello, I would like to reserve ${villa.name}.`
    : `Bonjour, je souhaite réserver ${villa.name}.`;
  const whatsappLink = `https://wa.me/${whatsappNumber.replace('+', '').replace(/\s/g, '')}?text=${encodeURIComponent(whatsappMessage)}`;
  const callLink = `tel:${whatsappNumber.replace(/\s/g, '')}`;

  return (
    <>
      {/* Back Navigation */}
      <section className="py-6 bg-[var(--color-ivory)]">
        <div className="container mx-auto px-6">
          <a
            href={`/${lang}/villas`}
            className="text-[var(--color-brass)] hover:text-[var(--color-ebony)] transition-colors inline-flex items-center gap-2"
          >
            {content.backToVillas}
          </a>
        </div>
      </section>

      {/* Hero Section with Image Gallery */}
      <section className="py-12 bg-[var(--color-ivory)]">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            {/* District Badge */}
            {villa.district && (
              <div className="inline-block px-4 py-2 bg-[var(--color-brass)]/10 text-[var(--color-brass)] rounded-full text-sm font-medium mb-4">
                {villa.district}
              </div>
            )}

            {/* Villa Name */}
            <h1
              className="mb-8"
              style={{
                fontFamily: 'var(--font-cormorant)',
              }}
            >
              {villa.name}
            </h1>

            {/* Image Gallery */}
            {villa.images && villa.images.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                {villa.images.map((item: any, index: number) => {
                  const image = item.image;
                  const imageUrlRaw = typeof image === 'object' && image?.url ? image.url : null;
                  const imageUrl = imageUrlRaw ? normalizeMediaUrl(imageUrlRaw) : null;
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
                        alt={villa.name || 'Villa image'}
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
              {/* Overview */}
              <div className="card p-8">
                <h2
                  className="text-3xl mb-6"
                  style={{
                    fontFamily: 'var(--font-cormorant)',
                  }}
                >
                  {content.overview}
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  {villa.bedrooms && (
                    <div className="flex items-start gap-3">
                      <svg className="w-5 h-5 text-[var(--color-brass)] mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                      </svg>
                      <div>
                        <div className="text-sm text-[var(--color-muted)]">{content.bedrooms}</div>
                        <div className="font-medium text-[var(--color-ebony)]">{villa.bedrooms}</div>
                      </div>
                    </div>
                  )}
                  {villa.bathrooms && (
                    <div className="flex items-start gap-3">
                      <svg className="w-5 h-5 text-[var(--color-brass)] mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <div>
                        <div className="text-sm text-[var(--color-muted)]">{content.bathrooms}</div>
                        <div className="font-medium text-[var(--color-ebony)]">{villa.bathrooms}</div>
                      </div>
                    </div>
                  )}
                  {villa.guests && (
                    <div className="flex items-start gap-3">
                      <svg className="w-5 h-5 text-[var(--color-brass)] mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                      <div>
                        <div className="text-sm text-[var(--color-muted)]">{content.guests}</div>
                        <div className="font-medium text-[var(--color-ebony)]">{villa.guests}</div>
                      </div>
                    </div>
                  )}
                  {villa.district && (
                    <div className="flex items-start gap-3">
                      <svg className="w-5 h-5 text-[var(--color-brass)] mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      <div>
                        <div className="text-sm text-[var(--color-muted)]">{content.district}</div>
                        <div className="font-medium text-[var(--color-ebony)]">{villa.district}</div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Highlights */}
              {villa.highlights && villa.highlights.length > 0 && (
                <div className="card p-8">
                  <h2
                    className="text-3xl mb-6"
                    style={{
                      fontFamily: 'var(--font-cormorant)',
                    }}
                  >
                    {content.highlights}
                  </h2>
                  <ul className="space-y-3">
                    {villa.highlights.map((highlight: any, idx: number) => (
                      <li key={idx} className="flex items-start gap-3">
                        <svg className="w-5 h-5 text-[var(--color-brass)] flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="text-[var(--color-ebony)]">{highlight.text}</span>
                      </li>
                    ))}
                  </ul>
                  {villa.conciergeIncluded && (
                    <div className="mt-4 pt-4 border-t border-[var(--color-tadelakt)]">
                      <div className="flex items-start gap-3">
                        <svg className="w-5 h-5 text-[var(--color-brass)] flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="text-[var(--color-ebony)] font-medium">{content.conciergeIncluded}</span>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Amenities */}
              {villa.amenities && villa.amenities.length > 0 && (
                <div className="card p-8">
                  <h2
                    className="text-3xl mb-6"
                    style={{
                      fontFamily: 'var(--font-cormorant)',
                    }}
                  >
                    {content.amenities}
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {villa.amenities.map((amenity: any, idx: number) => (
                      <div key={idx} className="flex items-start gap-3 p-3 rounded-lg bg-[var(--color-ivory)]">
                        <svg className="w-5 h-5 text-[var(--color-brass)] flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="text-[var(--color-ebony)]">{amenity.text}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Policies */}
              {villa.policies && (
                <div className="card p-8">
                  <h2
                    className="text-3xl mb-6"
                    style={{
                      fontFamily: 'var(--font-cormorant)',
                    }}
                  >
                    {content.policies}
                  </h2>
                  <div className="prose prose-slate max-w-none">
                    {/* Render rich text content - simplified for now */}
                    <div className="text-[var(--color-ebony)]">
                      {typeof villa.policies === 'string'
                        ? villa.policies
                        : JSON.stringify(villa.policies)
                      }
                    </div>
                  </div>
                </div>
              )}

              {/* Location */}
              {villa.mapCoords && (
                <div className="card p-8">
                  <h2
                    className="text-3xl mb-6"
                    style={{
                      fontFamily: 'var(--font-cormorant)',
                    }}
                  >
                    {content.location}
                  </h2>
                  <div className="bg-[var(--color-ivory)] rounded-lg p-6">
                    <p className="text-[var(--color-muted)] text-center">
                      Map coordinates: {villa.mapCoords.coordinates?.[1]}, {villa.mapCoords.coordinates?.[0]}
                    </p>
                    {/* TODO: Integrate actual map component here */}
                  </div>
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

                {villa.pricePerNightNote && (
                  <div className="mb-4 pb-4 border-b border-[var(--color-tadelakt)]">
                    <div className="text-sm text-[var(--color-muted)] mb-1">{content.pricePerNight}</div>
                    <div className="text-2xl font-semibold text-[var(--color-ebony)]">
                      {villa.pricePerNightNote}
                    </div>
                  </div>
                )}

                {villa.minNights && villa.minNights > 1 && (
                  <div className="mb-6">
                    <div className="text-sm text-[var(--color-muted)] mb-1">{content.minNights}</div>
                    <div className="text-base text-[var(--color-ebony)]">
                      {villa.minNights} {content.nights}
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
