import { Navigation } from '@/components/Navigation'
import { Footer } from '@/components/Footer'
import { WhatsAppButton } from '@/components/WhatsAppButton'
import { BlockRenderer } from '@/components/BlockRenderer'
import { prisma } from '@/lib/prisma'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'

export async function generateMetadata({
  params,
  searchParams,
}: {
  params: { slug: string }
  searchParams: { locale?: string }
}): Promise<Metadata> {
  const locale = (searchParams.locale as 'id' | 'en') || 'id'
  
  const websiteTitle = await prisma.setting.findUnique({
    where: { key: 'website_title' }
  })
  const websiteFavicon = await prisma.setting.findUnique({
    where: { key: 'website_favicon' }
  })

  const siteName = websiteTitle?.value || 'Al Azhar IIBS'

  // Try to find page
  const page = await (prisma as any).page.findUnique({
    where: { slug: params.slug },
    select: {
      title: true,
      titleEn: true,
      seoTitle: true,
      seoDescription: true,
      seoKeywords: true,
      excerpt: true,
      excerptEn: true,
      isPublished: true,
    }
  })

  // If not a page, try to find category
  if (!page) {
    const category = await (prisma as any).category.findUnique({
      where: { slug: params.slug },
      select: {
        name: true,
        nameEn: true,
        description: true,
        descriptionEn: true,
        isActive: true,
      }
    })

    if (category && category.isActive) {
      const pageTitle = locale === 'en' && category.nameEn ? category.nameEn : category.name
      const description = locale === 'en' && category.descriptionEn ? category.descriptionEn : category.description

      return {
        title: `${pageTitle} | ${siteName}`,
        description: description || `${pageTitle} - ${siteName}`,
        icons: websiteFavicon?.value ? {
          icon: websiteFavicon.value,
          shortcut: websiteFavicon.value,
          apple: websiteFavicon.value,
        } : undefined,
      }
    }

    return {
      title: siteName,
      icons: websiteFavicon?.value ? {
        icon: websiteFavicon.value,
        shortcut: websiteFavicon.value,
        apple: websiteFavicon.value,
      } : undefined,
    }
  }

  if (!page.isPublished) {
    return {
      title: siteName,
      icons: websiteFavicon?.value ? {
        icon: websiteFavicon.value,
        shortcut: websiteFavicon.value,
        apple: websiteFavicon.value,
      } : undefined,
    }
  }

  // Use SEO title if available, otherwise use page title
  const pageTitle = page.seoTitle || (locale === 'en' && page.titleEn ? page.titleEn : page.title)
  const description = page.seoDescription || page.excerpt || (locale === 'en' && page.excerptEn ? page.excerptEn : page.excerpt) || `${pageTitle} - ${siteName}`

  return {
    title: `${pageTitle} | ${siteName}`,
    description: description,
    keywords: page.seoKeywords || undefined,
    icons: websiteFavicon?.value ? {
      icon: websiteFavicon.value,
      shortcut: websiteFavicon.value,
      apple: websiteFavicon.value,
    } : undefined,
  }
}

export default async function DynamicPage({
  params,
  searchParams,
}: {
  params: { slug: string }
  searchParams: { locale?: string }
}) {
  const locale = (searchParams.locale as 'id' | 'en') || 'id'

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
  const menus = menusData.map(menu => ({
    ...menu,
    titleEn: menu.titleEn ?? undefined,
    children: menu.children.map(child => ({
      ...child,
      titleEn: child.titleEn ?? undefined,
      children: child.children?.map((grandchild: any) => ({
        ...grandchild,
        titleEn: grandchild.titleEn ?? undefined,
      })) || [],
    })),
  }))

  // Fetch website settings
  const websiteLogo = await prisma.setting.findUnique({
    where: { key: 'website_logo' }
  })
  const websiteTitle = await prisma.setting.findUnique({
    where: { key: 'website_title' }
  })
  const showWebsiteName = await prisma.setting.findUnique({
    where: { key: 'show_website_name' }
  })

  // Fetch WhatsApp settings
  const whatsappPhone = await prisma.setting.findUnique({
    where: { key: 'whatsapp_phone' }
  })
  const whatsappMessage = await prisma.setting.findUnique({
    where: { key: 'whatsapp_message' }
  })

  // Fetch Footer settings
  const footerAddress = await prisma.setting.findUnique({
    where: { key: 'footer_address' }
  })
  const footerPhone = await prisma.setting.findUnique({
    where: { key: 'footer_phone' }
  })
  const footerEmail = await prisma.setting.findUnique({
    where: { key: 'footer_email' }
  })
  const androidAppUrl = await prisma.setting.findUnique({
    where: { key: 'android_app_url' }
  })
  const iosAppUrl = await prisma.setting.findUnique({
    where: { key: 'ios_app_url' }
  })
  const facebookUrl = await prisma.setting.findUnique({
    where: { key: 'facebook_url' }
  })
  const instagramUrl = await prisma.setting.findUnique({
    where: { key: 'instagram_url' }
  })
  const youtubeUrl = await prisma.setting.findUnique({
    where: { key: 'youtube_url' }
  })

  // Try to find page first
  const page = await (prisma as any).page.findUnique({
    where: { slug: params.slug },
    include: { 
      author: { select: { name: true } },
      blocks: {
        where: { isActive: true },
        orderBy: { order: 'asc' }
      }
    }
  })

  // If not a page, try to find category
  if (!page) {
    const category = await (prisma as any).category.findUnique({
      where: { slug: params.slug },
      include: {
        posts: {
          where: { isPublished: true },
          orderBy: { publishedAt: 'desc' },
          include: { author: { select: { name: true } } }
        }
      }
    })

    if (category && category.isActive) {
      return (
        <div className="min-h-screen bg-white">
          <Navigation 
            menus={menus} 
            locale={locale}
            logo={websiteLogo?.value || null}
            websiteName={websiteTitle?.value || null}
            showWebsiteName={showWebsiteName?.value === 'true'}
          />
          
          {/* Dark blue header like other pages */}
          <div className="bg-[#1e3a5f] text-white py-24 md:py-32 lg:py-40 mt-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold">
                {locale === 'en' && category.nameEn ? category.nameEn : category.name}
              </h1>
              {category.description && (
                <p className="text-xl md:text-2xl mt-6 text-gray-200">
                  {locale === 'en' && category.descriptionEn ? category.descriptionEn : category.description}
                </p>
              )}
            </div>
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            {category.posts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {category.posts.map((post: any) => {
                  const publishedDate = post.publishedAt 
                    ? new Date(post.publishedAt).toLocaleDateString('id-ID', { 
                        day: 'numeric', 
                        month: 'long', 
                        year: 'numeric' 
                      })
                    : new Date(post.createdAt).toLocaleDateString('id-ID', { 
                        day: 'numeric', 
                        month: 'long', 
                        year: 'numeric' 
                      })
                  
                  return (
                    <a
                      key={post.id}
                      href={`/berita/${post.slug}`}
                      className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 group"
                    >
                      {post.featuredImage && (
                        <div className="relative h-56 overflow-hidden">
                          <img
                            src={post.featuredImage}
                            alt={post.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                      )}
                      <div className="p-6">
                        <p className="text-sm text-gray-500 mb-3">{publishedDate}</p>
                        <h3 className="text-xl font-bold mb-3 text-gray-900 group-hover:text-primary-600 transition-colors line-clamp-2">
                          {locale === 'en' && post.titleEn ? post.titleEn : post.title}
                        </h3>
                        {post.excerpt && (
                          <p className="text-gray-600 text-sm line-clamp-3 mb-4">
                            {locale === 'en' && post.excerptEn ? post.excerptEn : post.excerpt}
                          </p>
                        )}
                        <span className="text-primary-600 font-medium text-sm hover:underline">
                          Selengkapnya →
                        </span>
                      </div>
                    </a>
                  )
                })}
              </div>
            ) : (
              <div className="text-center py-16">
                <p className="text-gray-500 text-lg">
                  {locale === 'en' ? 'No content available in this category yet.' : 'Belum ada konten di kategori ini.'}
                </p>
              </div>
            )}
          </div>

          <Footer 
            locale={locale}
            address={footerAddress?.value || null}
            phone={footerPhone?.value || null}
            email={footerEmail?.value || null}
            androidAppUrl={androidAppUrl?.value || null}
            iosAppUrl={iosAppUrl?.value || null}
            facebookUrl={facebookUrl?.value || null}
            instagramUrl={instagramUrl?.value || null}
            youtubeUrl={youtubeUrl?.value || null}
          />

          <WhatsAppButton 
            phoneNumber={whatsappPhone?.value || null}
            defaultMessage={whatsappMessage?.value || null}
          />
        </div>
      )
    }

    notFound()
  }

  if (!page.isPublished) {
    notFound()
  }

  // Check if page needs special template (like Tentang Kami with dark blue header)
  const needsSpecialHeader = page.slug === 'tentang-kami' || page.template === 'with-header'
  
  // Check if page is academic template (SMP/SMA)
  const isAcademicTemplate = page.template === 'academic-smp' || page.template === 'academic-sma'

  // Check if first block is hero-slider (for full page layout like homepage)
  const hasHeroSlider = page.blocks && page.blocks.length > 0 && page.blocks[0].type === 'hero-slider'
  const heroSliderBlock = hasHeroSlider ? page.blocks[0] : null
  const otherBlocks = hasHeroSlider ? page.blocks.slice(1) : page.blocks

  return (
    <div className="min-h-screen bg-white">
      {/* If has hero slider, render like homepage with navigation overlay */}
      {hasHeroSlider && heroSliderBlock ? (
        <div className="relative">
          <Navigation 
            menus={menus} 
            locale={locale}
            logo={websiteLogo?.value || null}
            websiteName={websiteTitle?.value || null}
            showWebsiteName={showWebsiteName?.value === 'true'}
          />
          {/* Render hero slider block */}
          <BlockRenderer blocks={[heroSliderBlock]} locale={locale} />
        </div>
      ) : needsSpecialHeader ? (
        <div className="relative bg-[#1e3a5f] text-white">
          <Navigation 
            menus={menus} 
            locale={locale}
            logo={websiteLogo?.value || null}
            websiteName={websiteTitle?.value || null}
            showWebsiteName={showWebsiteName?.value === 'true'}
          />
          <div className="py-24 md:py-32 lg:py-40 pt-32 md:pt-40 lg:pt-48">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-center">
                {locale === 'en' && page.titleEn ? page.titleEn : page.title}
              </h1>
            </div>
          </div>
        </div>
      ) : isAcademicTemplate ? (
        // Academic pages (SMP/SMA) don't need header, content is self-contained
        <div className="relative">
          <Navigation 
            menus={menus} 
            locale={locale}
            logo={websiteLogo?.value || null}
            websiteName={websiteTitle?.value || null}
            showWebsiteName={showWebsiteName?.value === 'true'}
          />
        </div>
      ) : (
        <div className="relative">
          <Navigation 
            menus={menus} 
            locale={locale}
            logo={websiteLogo?.value || null}
            websiteName={websiteTitle?.value || null}
            showWebsiteName={showWebsiteName?.value === 'true'}
          />
          {page.featuredImage && (
            <div className="h-64 md:h-96 bg-gray-200 relative pt-20">
              <img
                src={page.featuredImage}
                alt={page.title}
                className="w-full h-full object-cover"
              />
            </div>
          )}
        </div>
      )}

      {/* Render other blocks (excluding hero slider if it was rendered above) */}
      {otherBlocks && otherBlocks.length > 0 ? (
        <BlockRenderer blocks={otherBlocks} locale={locale} />
      ) : !hasHeroSlider && (
        <article className={`${needsSpecialHeader || isAcademicTemplate ? 'bg-white' : 'max-w-4xl mx-auto'} px-4 sm:px-6 lg:px-8 ${needsSpecialHeader || isAcademicTemplate ? 'py-12 md:py-16' : 'py-12'}`}>
          {!needsSpecialHeader && !isAcademicTemplate && (
            <header className="mb-8">
              <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">
                {locale === 'en' && page.titleEn ? page.titleEn : page.title}
              </h1>
              {page.excerpt && (
                <p className="text-xl text-gray-600">
                  {locale === 'en' && page.excerptEn ? page.excerptEn : page.excerpt}
                </p>
              )}
            </header>
          )}

          <div
            className={`${needsSpecialHeader ? 'max-w-5xl mx-auto' : ''} prose prose-lg max-w-none prose-headings:text-gray-900 prose-p:text-gray-700 prose-p:leading-relaxed prose-p:text-lg prose-h2:text-3xl prose-h2:font-bold prose-h2:mb-6 prose-h3:text-2xl prose-h3:font-bold prose-h3:mb-4 prose-h3:text-gray-800`}
            dangerouslySetInnerHTML={{
              __html: locale === 'en' && page.contentEn ? page.contentEn : page.content
            }}
          />
        </article>
      )}

      <Footer 
        locale={locale}
        address={footerAddress?.value || null}
        phone={footerPhone?.value || null}
        email={footerEmail?.value || null}
        androidAppUrl={androidAppUrl?.value || null}
        iosAppUrl={iosAppUrl?.value || null}
        facebookUrl={facebookUrl?.value || null}
        instagramUrl={instagramUrl?.value || null}
        youtubeUrl={youtubeUrl?.value || null}
      />

      <WhatsAppButton 
        phoneNumber={whatsappPhone?.value || null}
        defaultMessage={whatsappMessage?.value || null}
      />
    </div>
  )
}

