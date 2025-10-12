// Force dynamic rendering
export const dynamic = 'force-dynamic';
export const revalidate = 0;

const contactContent = {
  en: {
    title: 'Contact Us',
    subtitle: 'Get in touch with our team',
    description:
      'We\'re here to help you plan the perfect stay in Marrakech. Whether you have questions about our villas, need assistance with bookings, or want to discuss custom concierge services, our team is ready to assist you.',
    whatsapp: {
      title: 'WhatsApp',
      description: 'Quick responses, 24/7 availability',
      button: 'Chat on WhatsApp',
    },
    phone: {
      title: 'Phone',
      description: 'Speak directly with our team',
      button: 'Call Us',
    },
    email: {
      title: 'Email',
      description: 'Send us a detailed message',
      address: 'contact@atlasdream.com',
    },
    hours: {
      title: 'Availability',
      description: '24/7 for urgent requests\nMonday-Sunday, 9AM-10PM for general inquiries',
    },
  },
  fr: {
    title: 'Nous Contacter',
    subtitle: 'Entrez en contact avec notre équipe',
    description:
      'Nous sommes là pour vous aider à planifier le séjour parfait à Marrakech. Que vous ayez des questions sur nos villas, besoin d\'aide pour les réservations, ou souhaitiez discuter de services de conciergerie personnalisés, notre équipe est prête à vous aider.',
    whatsapp: {
      title: 'WhatsApp',
      description: 'Réponses rapides, disponibilité 24/7',
      button: 'Discuter sur WhatsApp',
    },
    phone: {
      title: 'Téléphone',
      description: 'Parlez directement avec notre équipe',
      button: 'Nous Appeler',
    },
    email: {
      title: 'Email',
      description: 'Envoyez-nous un message détaillé',
      address: 'contact@atlasdream.com',
    },
    hours: {
      title: 'Disponibilité',
      description: '24/7 pour les demandes urgentes\nLundi-Dimanche, 9h-22h pour les demandes générales',
    },
  },
};

export default async function ContactPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const content = contactContent[lang as 'en' | 'fr'] || contactContent.en;

  const whatsappNumber = '+212774885461';
  const whatsappMessage =
    lang === 'en'
      ? 'Hello, I would like to get more information about Atlas Dream services.'
      : 'Bonjour, je souhaite obtenir plus d\'informations sur les services Atlas Dream.';
  const whatsappLink = `https://wa.me/${whatsappNumber.replace('+', '').replace(/\s/g, '')}?text=${encodeURIComponent(whatsappMessage)}`;
  const callLink = `tel:${whatsappNumber.replace(/\s/g, '')}`;

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
            <p className="text-xl text-[var(--color-muted)] mb-8">
              {content.subtitle}
            </p>
            <p className="text-lg leading-relaxed text-[var(--color-ebony)]">
              {content.description}
            </p>
          </div>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* WhatsApp */}
            <div className="card p-8 text-center">
              <div className="w-16 h-16 bg-[#25D366]/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-[#25D366]" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                </svg>
              </div>
              <h3
                className="text-2xl mb-2"
                style={{
                  fontFamily: 'var(--font-cormorant)',
                }}
              >
                {content.whatsapp.title}
              </h3>
              <p className="text-[var(--color-muted)] mb-6">
                {content.whatsapp.description}
              </p>
              <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary bg-[#25D366] hover:bg-[#20BA5A] w-full"
              >
                {content.whatsapp.button}
              </a>
            </div>

            {/* Phone */}
            <div className="card p-8 text-center">
              <div className="w-16 h-16 bg-[var(--color-brass)]/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-[var(--color-brass)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <h3
                className="text-2xl mb-2"
                style={{
                  fontFamily: 'var(--font-cormorant)',
                }}
              >
                {content.phone.title}
              </h3>
              <p className="text-[var(--color-muted)] mb-4">
                {content.phone.description}
              </p>
              <p className="text-xl font-semibold text-[var(--color-ebony)] mb-6">
                {whatsappNumber}
              </p>
              <a
                href={callLink}
                className="btn btn-ghost text-[var(--color-brass)] hover:bg-[var(--color-brass)]/10 w-full"
              >
                {content.phone.button}
              </a>
            </div>

            {/* Email */}
            <div className="card p-8 text-center">
              <div className="w-16 h-16 bg-[var(--color-brass)]/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-[var(--color-brass)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h3
                className="text-2xl mb-2"
                style={{
                  fontFamily: 'var(--font-cormorant)',
                }}
              >
                {content.email.title}
              </h3>
              <p className="text-[var(--color-muted)] mb-4">
                {content.email.description}
              </p>
              <a
                href={`mailto:${content.email.address}`}
                className="text-lg text-[var(--color-brass)] hover:underline"
              >
                {content.email.address}
              </a>
            </div>

            {/* Hours */}
            <div className="card p-8 text-center">
              <div className="w-16 h-16 bg-[var(--color-brass)]/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-[var(--color-brass)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3
                className="text-2xl mb-2"
                style={{
                  fontFamily: 'var(--font-cormorant)',
                }}
              >
                {content.hours.title}
              </h3>
              <p className="text-[var(--color-ebony)] whitespace-pre-line">
                {content.hours.description}
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

