import { Navigation } from '@/components/Navigation'
import { Footer } from '@/components/Footer'
import { WhatsAppButton } from '@/components/WhatsAppButton'
import { prisma } from '@/lib/prisma'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { Search, ChevronRight } from 'lucide-react'
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

  const post = await prisma.post.findUnique({
    where: { slug: params.slug },
    select: {
      title: true,
      titleEn: true,
      excerpt: true,
      excerptEn: true,
      isPublished: true,
    }
  })

  if (!post || !post.isPublished) {
    return {
      title: siteName,
      icons: websiteFavicon?.value ? {
        icon: websiteFavicon.value,
        shortcut: websiteFavicon.value,
        apple: websiteFavicon.value,
      } : undefined,
    }
  }

  const postTitle = locale === 'en' && post.titleEn ? post.titleEn : post.title
  const description = locale === 'en' && post.excerptEn ? post.excerptEn : post.excerpt || `${postTitle} - ${siteName}`

  return {
    title: `${postTitle} | ${siteName}`,
    description: description,
    icons: websiteFavicon?.value ? {
      icon: websiteFavicon.value,
      shortcut: websiteFavicon.value,
      apple: websiteFavicon.value,
    } : undefined,
  }
}

export default async function PostPage({
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

  const post = await prisma.post.findUnique({
    where: { slug: params.slug },
    include: { author: { select: { name: true } } }
  })

  if (!post || !post.isPublished) {
    notFound()
  }

  // Get all posts for next/prev navigation
  const allPosts = await prisma.post.findMany({
    where: { isPublished: true },
    orderBy: { publishedAt: 'desc' },
    select: { id: true, slug: true, title: true, titleEn: true }
  })

  const currentIndex = allPosts.findIndex(p => p.id === post.id)
  const nextPost = currentIndex > 0 ? allPosts[currentIndex - 1] : null

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

  // Get latest posts for sidebar
  const latestPosts = await prisma.post.findMany({
    where: { 
      isPublished: true,
      id: { not: post.id }
    },
    orderBy: { publishedAt: 'desc' },
    take: 5,
    select: {
      id: true,
      slug: true,
      title: true,
      titleEn: true,
      publishedAt: true
    }
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

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <article className="lg:col-span-2">
            {post.featuredImage && (
              <div className="mb-8">
                <img
                  src={post.featuredImage}
                  alt={post.title}
                  className="w-full h-auto object-cover rounded-lg"
                />
              </div>
            )}

            <header className="mb-8">
              <h1 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
                {locale === 'en' && post.titleEn ? post.titleEn : post.title}
              </h1>
              <div className="flex items-center space-x-4 text-gray-600 text-sm">
                <span>{post.publishedAt && new Date(post.publishedAt).toLocaleDateString('id-ID', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}</span>
                <span>•</span>
                <span>{post.category || 'alazhar'}</span>
                <span>•</span>
                <span>0</span> {/* Comment count - bisa ditambahkan nanti */}
              </div>
            </header>

            <div
              className="prose prose-lg max-w-none mb-8"
              dangerouslySetInnerHTML={{
                __html: locale === 'en' && post.contentEn ? post.contentEn : post.content
              }}
            />

            {/* Next Post Navigation */}
            {nextPost && (
              <div className="mt-12 pt-8 border-t border-gray-200">
                <Link 
                  href={`/berita/${nextPost.slug}`}
                  className="flex items-center text-primary-600 hover:text-primary-700 font-medium"
                >
                  <span>Next</span>
                  <ChevronRight size={20} className="ml-2" />
                  <span className="ml-2">
                    {locale === 'en' && nextPost.titleEn ? nextPost.titleEn : nextPost.title}
                  </span>
                </Link>
              </div>
            )}

            {/* Comment Section */}
            <div className="mt-12 pt-8 border-t border-gray-200">
              <h3 className="text-2xl font-bold mb-6">Tinggalkan Balasan</h3>
              <p className="text-sm text-gray-600 mb-4">
                Alamat email Anda tidak akan dipublikasikan. Ruas yang wajib ditandai *
              </p>
              <form className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nama *
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Situs Web
                  </label>
                  <input
                    type="url"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Komentar *
                  </label>
                  <textarea
                    rows={6}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="bg-primary-600 text-white px-6 py-3 rounded-lg hover:bg-primary-700 transition-colors font-medium"
                >
                  KIRIM KOMENTAR
                </button>
              </form>
            </div>
          </article>

          {/* Sidebar */}
          <aside className="lg:col-span-1">
            {/* Search */}
            <div className="mb-8">
              <form className="flex">
                <input
                  type="search"
                  placeholder="Cari..."
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-l-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
                <button
                  type="submit"
                  className="bg-orange-500 text-white px-4 py-2 rounded-r-lg hover:bg-orange-600 transition-colors"
                >
                  <Search size={20} />
                </button>
              </form>
            </div>

            {/* Latest News */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-8">
              <h3 className="text-xl font-bold mb-4 text-gray-900">Berita Terbaru</h3>
              <ul className="space-y-3">
                {latestPosts.map((latestPost: any) => (
                  <li key={latestPost.id}>
                    <Link
                      href={`/berita/${latestPost.slug}`}
                      className="text-gray-700 hover:text-primary-600 transition-colors block"
                    >
                      {locale === 'en' && latestPost.titleEn ? latestPost.titleEn : latestPost.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
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

