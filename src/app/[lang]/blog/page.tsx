const blogContent = {
  en: {
    title: 'Travel Journal',
    subtitle: 'Stories, guides, and insider tips for Marrakech',
    description: 'Discover the best of Marrakech through our curated articles, local insights, and travel guides.',
    comingSoon: 'Our travel journal is coming soon',
    comingSoonDesc: 'We\'re crafting beautiful stories and guides to help you make the most of your Marrakech experience.',
    categories: [
      { name: 'Guides', icon: '📖' },
      { name: 'Culture', icon: '🎨' },
      { name: 'Food & Dining', icon: '🍽️' },
      { name: 'Activities', icon: '🏃' },
    ],
    cta: {
      title: 'Stay informed',
      subtitle: 'Get travel tips and updates via WhatsApp',
      whatsapp: 'Subscribe on WhatsApp',
      call: 'Call us',
    },
  },
  fr: {
    title: 'Journal de voyage',
    subtitle: 'Histoires, guides et conseils d\'initiés pour Marrakech',
    description: 'Découvrez le meilleur de Marrakech à travers nos articles sélectionnés, nos aperçus locaux et nos guides de voyage.',
    comingSoon: 'Notre journal de voyage arrive bientôt',
    comingSoonDesc: 'Nous préparons de belles histoires et guides pour vous aider à profiter au maximum de votre expérience à Marrakech.',
    categories: [
      { name: 'Guides', icon: '📖' },
      { name: 'Culture', icon: '🎨' },
      { name: 'Gastronomie', icon: '🍽️' },
      { name: 'Activités', icon: '🏃' },
    ],
    cta: {
      title: 'Restez informé',
      subtitle: 'Recevez nos conseils de voyage via WhatsApp',
      whatsapp: 'S\'abonner sur WhatsApp',
      call: 'Appelez-nous',
    },
  },
};

export default async function BlogPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const content = blogContent[lang as 'en' | 'fr'] || blogContent.en;

  const whatsappNumber = '+212774885461';
  const whatsappMessage = lang === 'en'
    ? 'Hello, I would like to receive travel tips and updates about Marrakech.'
    : 'Bonjour, je souhaite recevoir des conseils de voyage et des mises à jour sur Marrakech.';
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

      {/* Categories */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            {content.categories.map((category, index) => (
              <div
                key={index}
                className="p-6 rounded-xl bg-[var(--color-ivory)] text-center transition-all duration-300 hover:shadow-md hover:translate-y-[-2px]"
              >
                <div className="text-4xl mb-3">{category.icon}</div>
                <h4 className="font-semibold text-[var(--color-ebony)]">
                  {category.name}
                </h4>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Coming Soon */}
      <section className="py-20 bg-[var(--color-ivory)]">
        <div className="container mx-auto px-6">
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
                    d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
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
              <p className="text-[var(--color-muted)] max-w-2xl mx-auto">
                {content.comingSoonDesc}
              </p>
            </div>
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
