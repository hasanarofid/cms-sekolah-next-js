import Link from 'next/link'
import { Navigation } from '@/components/Navigation'
import { Footer } from '@/components/Footer'
import { HeroSlider } from '@/components/HeroSlider'
import { HomeSections } from '@/components/HomeSections'
import { FAQSection } from '@/components/FAQSection'
import { FiguresSection } from '@/components/FiguresSection'
import { PartnershipsSection } from '@/components/PartnershipsSection'
import { prisma } from '@/lib/prisma'
import { Play, ArrowRight } from 'lucide-react'

export default async function HomePage({
  searchParams,
}: {
  searchParams: { locale?: string }
}) {
  const locale = (searchParams.locale as 'id' | 'en') || 'id'
  
  // Fetch menus with nested children (level 2)
  const menusData = await prisma.menu.findMany({
    where: { parentId: null, isActive: true },
    include: { 
      children: { 
        where: { isActive: true }, 
        orderBy: { order: 'asc' },
        include: {
          children: {
            where: { isActive: true },
            orderBy: { order: 'asc' }
          }
        }
      } 
    },
    orderBy: { order: 'asc' }
  })

  // Map to ensure type compatibility
  const menus = menusData.map((menu: any) => ({
    ...menu,
    titleEn: menu.titleEn ?? undefined,
    children: menu.children.map((child: any) => ({
      ...child,
      titleEn: child.titleEn ?? undefined,
      children: child.children?.map((grandchild: any) => ({
        ...grandchild,
        titleEn: grandchild.titleEn ?? undefined,
      })) || [],
    })),
  }))

  // Fetch latest posts
  const latestPosts = await prisma.post.findMany({
    where: { isPublished: true },
    orderBy: { publishedAt: 'desc' },
    take: 6,
    include: { author: { select: { name: true } } }
  })

  // Fetch active sliders
  const sliders = await prisma.slider.findMany({
    where: { isActive: true },
    orderBy: { order: 'asc' }
  })

  // Fetch home sections
  const homeSections = await prisma.homeSection.findMany({
    where: { isActive: true },
    orderBy: { order: 'asc' }
  })

  // Fetch active FAQs
  const faqs = await prisma.fAQ.findMany({
    where: { isActive: true },
    orderBy: { order: 'asc' }
  })

  // Fetch active figures
  const figures = await (prisma as any).figure.findMany({
    where: { isActive: true },
    orderBy: { order: 'asc' }
  })

  // Fetch active partnerships
  const partnerships = await (prisma as any).partnership.findMany({
    where: { isActive: true },
    orderBy: [{ category: 'asc' }, { order: 'asc' }]
  })

  // Fetch news section settings
  const newsQuote = await prisma.setting.findUnique({
    where: { key: 'news_section_quote' }
  })
  const newsTitle = await prisma.setting.findUnique({
    where: { key: 'news_section_title' }
  })

  // Fetch figures section settings
  const figuresTitle = await prisma.setting.findUnique({
    where: { key: 'figures_section_title' }
  })
  const figuresTitleEn = await prisma.setting.findUnique({
    where: { key: 'figures_section_title_en' }
  })
  const figuresBackground = await prisma.setting.findUnique({
    where: { key: 'figures_section_background' }
  })

  return (
    <div className="min-h-screen">
      {/* Hero Slider Section with Navigation Overlay */}
      {sliders.length > 0 ? (
        <div className="relative">
          <Navigation menus={menus} locale={locale} />
          <HeroSlider sliders={sliders} locale={locale} />
        </div>
      ) : (
        <>
          <Navigation menus={menus} locale={locale} />
          {/* Hero Section (Fallback if no sliders) */}
          <section className="relative bg-gradient-to-r from-primary-600 to-primary-800 text-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
              <div className="text-center">
                <h1 className="text-5xl md:text-6xl font-bold mb-6">
                  Al Azhar International Islamic Boarding School
                </h1>
                <p className="text-xl md:text-2xl mb-8 text-primary-100">
                  Qur'anic Learning, Courtesy Oriented and World Class Education
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link
                    href="/pendaftaran"
                    className="bg-white text-primary-700 px-8 py-3 rounded-lg font-semibold hover:bg-primary-50 transition-colors inline-flex items-center justify-center"
                  >
                    Pendaftaran Murid Baru
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                  <button className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-primary-700 transition-colors inline-flex items-center justify-center">
                    <Play className="mr-2 h-5 w-5" />
                    Putar Video
                  </button>
                </div>
              </div>
            </div>
          </section>
        </>
      )}

      {/* Home Sections (Motto, Video Profiles, Admission, Split Screen, Features) */}
      <HomeSections sections={homeSections} locale={locale} />

      {/* FAQ Section - After Split Screen */}
      <FAQSection faqs={faqs} locale={locale} />

      {/* Masjid AL FATIH Section - After FAQ */}
      {(() => {
        const masjidSections = homeSections.filter((s: any) => s.type === 'masjid-al-fatih' && s.isActive)
        if (masjidSections.length === 0) return null
        
        return masjidSections.map((section: any) => {
          const bgImages = section.images ? JSON.parse(section.images) : []
          const bgImage = bgImages.length > 0 ? bgImages[0] : null
          
          return (
            <section key={section.id} className="py-16 bg-white">
              {/* Header Quote */}
              {section.subtitle && (
                <div className="text-center mb-12">
                  <h2 className="text-3xl md:text-4xl font-serif italic text-gray-900">
                    "{locale === 'en' && section.subtitleEn ? section.subtitleEn : section.subtitle}"
                  </h2>
                </div>
              )}

              {/* Two Column Layout: Image Left, Text Right with Background */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
                {/* Left: Masjid Interior Image */}
                {section.image && (
                  <div className="relative min-h-[500px] lg:min-h-[600px]">
                    <img
                      src={section.image}
                      alt="Masjid AL FATIH Interior"
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}

                {/* Right: Dark Background with Text and Subtle Building */}
                <div 
                  className="relative min-h-[500px] lg:min-h-[600px] flex items-center justify-center p-8 lg:p-12 xl:p-16"
                  style={{
                    backgroundColor: '#1e3a5f',
                    backgroundImage: bgImage ? `url(${bgImage})` : 'none',
                    backgroundSize: 'cover',
                    backgroundPosition: 'bottom right',
                    backgroundBlendMode: 'overlay',
                  }}
                >
                  {/* Overlay for better text readability */}
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-900/90 to-blue-800/80"></div>
                  
                  {/* Content */}
                  <div className="relative z-10 text-white max-w-xl">
                    {section.title && (
                      <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold mb-6 leading-tight">
                        {locale === 'en' && section.titleEn ? section.titleEn : section.title}
                      </h2>
                    )}
                    {section.content && (
                      <div
                        className="text-base md:text-lg leading-relaxed prose prose-invert max-w-none"
                        style={{ color: 'rgba(255, 255, 255, 0.95)' }}
                        dangerouslySetInnerHTML={{ 
                          __html: locale === 'en' && section.contentEn ? section.contentEn : section.content 
                        }}
                      />
                    )}
                  </div>
                </div>
              </div>
            </section>
          )
        })
      })()}

      {/* Latest News Section - After Masjid */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header Quote */}
          {(newsQuote?.value || newsQuote?.valueEn) && (
            <div className="text-center mb-8">
              <h2 className="text-3xl md:text-4xl font-serif italic text-gray-900 mb-4">
                "{locale === 'en' && newsQuote.valueEn ? newsQuote.valueEn : newsQuote.value}"
              </h2>
            </div>
          )}
          
          {/* Section Title */}
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
              {locale === 'en' && newsTitle?.valueEn ? newsTitle.valueEn : (newsTitle?.value || 'Berita Terbaru')}
            </h2>
          </div>

          {/* News Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {latestPosts.map((post: any) => (
              <Link key={post.id} href={`/berita/${post.slug}`}>
                <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow">
                  {post.featuredImage && (
                    <div className="h-48 bg-gray-200 relative">
                      <img
                        src={post.featuredImage}
                        alt={post.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                  <div className="p-6">
                    <p className="text-sm text-gray-500 mb-2">
                      {post.publishedAt && new Date(post.publishedAt).toLocaleDateString('id-ID', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </p>
                    <h3 className="text-xl font-semibold mb-2 line-clamp-2 text-gray-900">
                      {locale === 'en' && post.titleEn ? post.titleEn : post.title}
                    </h3>
                    {post.excerpt && (
                      <p className="text-gray-600 line-clamp-3 mb-4">
                        {locale === 'en' && post.excerptEn ? post.excerptEn : post.excerpt}
                      </p>
                    )}
                    <span className="text-primary-600 font-medium hover:text-primary-700 transition-colors">
                      Selengkapnya →
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* University Map Section - After News */}
      {(() => {
        const universityMapSections = homeSections.filter((s: any) => s.type === 'university-map' && s.isActive)
        if (universityMapSections.length === 0) return null
        
        return universityMapSections.map((section: any) => (
          <section key={section.id} className="py-16 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              {/* Title */}
              {section.title && (
                <div className="text-center mb-12">
                  <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900">
                    {locale === 'en' && section.titleEn ? section.titleEn : section.title}
                  </h2>
                </div>
              )}

              {/* Map Image */}
              {section.image && (
                <div className="w-full">
                  <img
                    src={section.image}
                    alt={locale === 'en' && section.titleEn ? section.titleEn : section.title || 'University Map'}
                    className="w-full h-auto object-contain mx-auto"
                  />
                </div>
              )}
            </div>
          </section>
        ))
      })()}

      {/* Figures Section - After University Map */}
      <FiguresSection 
        figures={figures} 
        locale={locale}
        sectionTitle={figuresTitle?.value || 'Tokoh-Tokoh Al Azhar IIBS'}
        sectionTitleEn={figuresTitleEn?.value || undefined}
        backgroundImage={figuresBackground?.value || undefined}
      />

      {/* Global Stage Section - After Figures */}
      {(() => {
        const globalStageSections = homeSections.filter((s: any) => s.type === 'global-stage' && s.isActive)
        if (globalStageSections.length === 0) return null
        
        return globalStageSections.map((section: any) => {
          const isExternalUrl = (url: string | null | undefined) => 
            url && (url.startsWith('http://') || url.startsWith('https://'))
          
          return (
            <section key={section.id} className="py-16 bg-white">
              <div className="w-full">
                {/* Quote Title */}
                {section.subtitle && (
                  <div className="text-center mb-12 px-4 sm:px-6 lg:px-8">
                    <h2 className="text-3xl md:text-4xl font-serif italic text-gray-900 mb-4">
                      "{locale === 'en' && section.subtitleEn ? section.subtitleEn : section.subtitle}"
                    </h2>
                  </div>
                )}

                {/* Two Column Layout: Dark Blue Panel Left (Full Width), Image Right */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 items-stretch">
                  {/* Left: Dark Blue Panel - Full Width from Left */}
                  <div className="bg-[#1e3a5f] rounded-r-2xl lg:rounded-l-none p-6 lg:p-8 xl:p-10 text-white flex flex-col justify-between shadow-xl">
                    <div>
                      {section.title && (
                        <h3 className="text-2xl md:text-3xl lg:text-4xl font-serif font-bold mb-4 leading-tight">
                          {locale === 'en' && section.titleEn ? section.titleEn : section.title}
                        </h3>
                      )}
                      {section.content && (
                        <p className="text-sm md:text-base lg:text-lg leading-relaxed text-white/95 mb-6">
                          {locale === 'en' && section.contentEn ? section.contentEn : section.content}
                        </p>
                      )}
                    </div>
                    {section.buttonText && section.buttonUrl && (
                      <div className="mt-auto">
                        <Link
                          href={isExternalUrl(section.buttonUrl) ? section.buttonUrl : section.buttonUrl}
                          target={isExternalUrl(section.buttonUrl) ? '_blank' : undefined}
                          rel={isExternalUrl(section.buttonUrl) ? 'noopener noreferrer' : undefined}
                          className="inline-block bg-white text-[#1e3a5f] px-6 py-2.5 rounded-lg font-semibold hover:bg-gray-50 transition-all duration-200 shadow-md hover:shadow-lg text-sm"
                        >
                          {locale === 'en' && section.buttonTextEn ? section.buttonTextEn : section.buttonText}
                        </Link>
                      </div>
                    )}
                  </div>

                  {/* Right: Image */}
                  {section.image && (
                    <div className="relative h-[400px] lg:h-[500px] xl:h-[600px] rounded-l-2xl lg:rounded-r-2xl lg:rounded-l-none overflow-hidden shadow-xl">
                      <img
                        src={section.image}
                        alt={section.title || 'International Program'}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                </div>
              </div>
            </section>
          )
        })
      })()}

      {/* Partnerships Section - After Global Stage */}
      <PartnershipsSection partnerships={partnerships} locale={locale} />

      <Footer locale={locale} />
    </div>
  )
}

