import { Navigation } from '@/components/Navigation'
import { Footer } from '@/components/Footer'
import { WhatsAppButton } from '@/components/WhatsAppButton'
import { prisma } from '@/lib/prisma'
import Link from 'next/link'
import Image from 'next/image'
import type { Metadata } from 'next'

export async function generateMetadata({
  searchParams,
}: {
  searchParams: { locale?: string; page?: string }
}): Promise<Metadata> {
  const locale = (searchParams.locale as 'id' | 'en') || 'id'
  
  const websiteTitle = await prisma.setting.findUnique({
    where: { key: 'website_title' }
  })
  const websiteFavicon = await prisma.setting.findUnique({
    where: { key: 'website_favicon' }
  })

  const siteName = websiteTitle?.value || 'Al Azhar IIBS'
  const pageTitle = locale === 'en' ? 'News' : 'Berita'

  return {
    title: `${pageTitle} | ${siteName}`,
    description: locale === 'en' 
      ? `Latest news and updates from ${siteName}`
      : `Berita dan informasi terbaru dari ${siteName}`,
    icons: websiteFavicon?.value ? {
      icon: websiteFavicon.value,
      shortcut: websiteFavicon.value,
      apple: websiteFavicon.value,
    } : undefined,
  }
}

export default async function BeritaPage({
  searchParams,
}: {
  searchParams: { locale?: string; page?: string }
}) {
  const locale = (searchParams.locale as 'id' | 'en') || 'id'
  const page = parseInt(searchParams.page || '1')
  const perPage = 9

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

  const posts = await prisma.post.findMany({
    where: { isPublished: true },
    orderBy: { publishedAt: 'desc' },
    skip: (page - 1) * perPage,
    take: perPage,
    include: { author: { select: { name: true } } }
  })

  const totalPosts = await prisma.post.count({
    where: { isPublished: true }
  })

  const totalPages = Math.ceil(totalPosts / perPage)

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

  return (
    <div className="min-h-screen">
      <Navigation 
        menus={menus} 
        locale={locale}
        logo={websiteLogo?.value || null}
        websiteName={websiteTitle?.value || null}
        showWebsiteName={showWebsiteName?.value === 'true'}
      />

      <div className="bg-primary-600 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold">Berita Terbaru</h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <Link key={post.id} href={`/berita/${post.slug}`}>
              <article className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow">
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
                  <h2 className="text-xl font-semibold mb-2 line-clamp-2">
                    {locale === 'en' && post.titleEn ? post.titleEn : post.title}
                  </h2>
                  {post.excerpt && (
                    <p className="text-gray-600 line-clamp-3 mb-4">
                      {locale === 'en' && post.excerptEn ? post.excerptEn : post.excerpt}
                    </p>
                  )}
                  <span className="text-primary-600 font-medium">
                    Selengkapnya →
                  </span>
                </div>
              </article>
            </Link>
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="mt-12 flex justify-center space-x-2">
            {page > 1 && (
              <Link
                href={`/berita?page=${page - 1}`}
                className="px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Sebelumnya
              </Link>
            )}
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
              <Link
                key={p}
                href={`/berita?page=${p}`}
                className={`px-4 py-2 rounded-lg ${
                  p === page
                    ? 'bg-primary-600 text-white'
                    : 'bg-white border border-gray-300 hover:bg-gray-50'
                }`}
              >
                {p}
              </Link>
            ))}
            {page < totalPages && (
              <Link
                href={`/berita?page=${page + 1}`}
                className="px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Selanjutnya
              </Link>
            )}
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

