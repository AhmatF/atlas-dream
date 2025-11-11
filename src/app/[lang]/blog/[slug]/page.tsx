import { notFound } from 'next/navigation';
import Link from 'next/link';

const content = {
  en: {
    backToBlog: 'Back to Blog',
    relatedArticles: 'Related Articles',
    readMore: 'Read more',
  },
  fr: {
    backToBlog: 'Retour au Blog',
    relatedArticles: 'Articles Connexes',
    readMore: 'Lire plus',
  },
};

async function getBlogPost(slug: string, locale: string) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'}/api/blog-posts?where[slug][equals]=${slug}&locale=${locale}&depth=1`,
      {
        cache: 'no-store',
      }
    );

    if (!res.ok) {
      console.error('Failed to fetch blog post:', res.status);
      return null;
    }

    const data = await res.json();
    return data.docs?.[0] || null;
  } catch (error) {
    console.error('Error fetching blog post:', error);
    return null;
  }
}

async function getRelatedPosts(slug: string, locale: string) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'}/api/blog-posts?where[slug][not_equals]=${slug}&locale=${locale}&limit=3`,
      {
        cache: 'no-store',
      }
    );

    if (!res.ok) return [];

    const data = await res.json();
    return data.docs || [];
  } catch (error) {
    console.error('Error fetching related posts:', error);
    return [];
  }
}

function renderLexicalContent(body: any) {
  if (!body?.root?.children) return null;

  return body.root.children.map((node: any, index: number) => {
    switch (node.type) {
      case 'paragraph':
        return (
          <p key={index} className="mb-6 text-lg leading-relaxed text-[var(--color-ebony)]">
            {node.children?.map((child: any, childIndex: number) => {
              if (child.type === 'text') {
                let text = <span key={childIndex}>{child.text}</span>;
                if (child.format & 1) text = <strong key={childIndex}>{child.text}</strong>;
                if (child.format & 2) text = <em key={childIndex}>{child.text}</em>;
                return text;
              }
              return null;
            })}
          </p>
        );

      case 'heading':
        const HeadingTag = (node.tag || 'h2') as 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
        return (
          <HeadingTag
            key={index}
            className="mb-6 text-[var(--color-sapphire-rich)] font-bold mt-10"
            style={{
              fontFamily: 'var(--font-cormorant)',
              fontSize: node.tag === 'h2' ? '2rem' : '1.5rem',
            }}
          >
            {node.children?.map((child: any) => child.text).join('')}
          </HeadingTag>
        );

      case 'list':
        const ListTag = node.format === 'unordered' ? 'ul' : 'ol';
        return (
          <ListTag key={index} className="mb-6 ml-6 space-y-3">
            {node.children?.map((item: any, itemIndex: number) => (
              <li key={itemIndex} className="text-lg text-[var(--color-ebony)] leading-relaxed">
                {item.children?.map((child: any) => child.text).join('')}
              </li>
            ))}
          </ListTag>
        );

      default:
        return null;
    }
  });
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}) {
  const { lang, slug } = await params;
  const text = content[lang as 'en' | 'fr'] || content.en;

  const post = await getBlogPost(slug, lang);

  if (!post) {
    notFound();
  }

  const relatedPosts = await getRelatedPosts(slug, lang);

  return (
    <>
      {/* Header */}
      <section className="py-12 bg-[var(--color-neutral-sapphire-mist)]">
        <div className="container mx-auto px-6">
          <Link
            href={`/${lang}/blog`}
            className="inline-flex items-center gap-2 text-[var(--color-sapphire-rich)] hover:text-[var(--color-sapphire-medium)] transition-colors mb-8"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            {text.backToBlog}
          </Link>

          <div className="max-w-4xl mx-auto">
            {/* Tags */}
            {post.tags && post.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-6">
                {post.tags.map((tag: any, index: number) => (
                  <span
                    key={index}
                    className="text-sm px-4 py-2 rounded-full bg-[var(--color-sapphire-rich)]/10 text-[var(--color-sapphire-rich)] font-medium"
                  >
                    {tag.tag}
                  </span>
                ))}
              </div>
            )}

            {/* Title */}
            <h1
              className="mb-6 text-[var(--color-sapphire-rich)] text-4xl md:text-5xl lg:text-6xl font-bold"
              style={{
                fontFamily: 'var(--font-cormorant)',
                letterSpacing: '-1px',
              }}
            >
              {post.title}
            </h1>

            {/* Excerpt */}
            {post.excerpt && (
              <p className="text-xl text-[var(--color-sapphire-medium)] leading-relaxed">
                {post.excerpt}
              </p>
            )}
          </div>
        </div>
      </section>

      {/* Cover Image */}
      {post.cover && (
        <section className="relative">
          <div className="aspect-[21/9] overflow-hidden">
            <img
              src={typeof post.cover === 'string' ? post.cover : post.cover.url}
              alt={post.title}
              className="w-full h-full object-cover"
            />
          </div>
        </section>
      )}

      {/* Content */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <article className="max-w-4xl mx-auto prose prose-lg">
            {renderLexicalContent(post.body)}
          </article>
        </div>
      </section>

      {/* Related Articles */}
      {relatedPosts.length > 0 && (
        <section className="py-20 bg-[var(--color-neutral-sapphire-mist)]">
          <div className="container mx-auto px-6">
            <div className="max-w-6xl mx-auto">
              <h2
                className="text-3xl md:text-4xl mb-12 text-center text-[var(--color-sapphire-rich)]"
                style={{
                  fontFamily: 'var(--font-cormorant)',
                  fontWeight: 600,
                }}
              >
                {text.relatedArticles}
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {relatedPosts.map((relatedPost: any) => (
                  <Link
                    key={relatedPost.id}
                    href={`/${lang}/blog/${relatedPost.slug}`}
                    className="card group hover:shadow-xl transition-all duration-300"
                  >
                    {relatedPost.cover && (
                      <div className="aspect-[16/9] overflow-hidden rounded-t-xl">
                        <img
                          src={
                            typeof relatedPost.cover === 'string'
                              ? relatedPost.cover
                              : relatedPost.cover.url
                          }
                          alt={relatedPost.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                    )}

                    <div className="p-6">
                      <h3
                        className="text-lg mb-3 text-[var(--color-ebony)] group-hover:text-[var(--color-sapphire-rich)] transition-colors"
                        style={{
                          fontFamily: 'var(--font-cormorant)',
                          fontWeight: 600,
                        }}
                      >
                        {relatedPost.title}
                      </h3>

                      {relatedPost.excerpt && (
                        <p className="text-[var(--color-muted)] mb-4 line-clamp-2 text-sm">
                          {relatedPost.excerpt}
                        </p>
                      )}

                      <div className="flex items-center gap-2 text-[var(--color-sapphire-rich)] font-medium text-sm">
                        <span>{text.readMore}</span>
                        <svg
                          className="w-4 h-4 group-hover:translate-x-1 transition-transform"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 5l7 7-7 7"
                          />
                        </svg>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-20 bg-[var(--color-ebony)] text-white">
        <div className="container mx-auto px-6 text-center">
          <h2
            className="mb-4 text-3xl md:text-4xl"
            style={{
              fontFamily: 'var(--font-cormorant)',
            }}
          >
            {lang === 'en' ? 'Ready to experience Marrakech?' : 'Prêt à découvrir Marrakech ?'}
          </h2>
          <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
            {lang === 'en'
              ? 'Contact us via WhatsApp for personalized recommendations and bookings.'
              : 'Contactez-nous via WhatsApp pour des recommandations personnalisées et des réservations.'}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={`https://wa.me/212774885461?text=${encodeURIComponent(
                lang === 'en'
                  ? 'Hello, I read your article and would like more information.'
                  : 'Bonjour, j\'ai lu votre article et j\'aimerais plus d\'informations.'
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary bg-[var(--color-sapphire-rich)] hover:bg-[var(--color-gold-shimmer)] inline-flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
              </svg>
              {lang === 'en' ? 'Contact us on WhatsApp' : 'Contactez-nous sur WhatsApp'}
            </a>
            <a
              href="tel:+212774885461"
              className="btn btn-ghost-light inline-flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                />
              </svg>
              {lang === 'en' ? 'Call us' : 'Appelez-nous'}
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
