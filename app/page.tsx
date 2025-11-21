import Link from 'next/link'
import { Navigation } from '@/components/Navigation'
import { Footer } from '@/components/Footer'
import { HeroSlider } from '@/components/HeroSlider'
import { HomeSections } from '@/components/HomeSections'
import { FAQSection } from '@/components/FAQSection'
import { prisma } from '@/lib/prisma'
import { Play, ArrowRight } from 'lucide-react'

export default async function HomePage({
  searchParams,
}: {
  searchParams: { locale?: string }
}) {
  const locale = (searchParams.locale as 'id' | 'en') || 'id'
  
  // Fetch menus
  const menusData = await prisma.menu.findMany({
    where: { parentId: null, isActive: true },
    include: { children: { where: { isActive: true }, orderBy: { order: 'asc' } } },
    orderBy: { order: 'asc' }
  })

  // Map to ensure type compatibility
  const menus = menusData.map((menu: any) => ({
    ...menu,
    titleEn: menu.titleEn ?? undefined,
    children: menu.children.map((child: any) => ({
      ...child,
      titleEn: child.titleEn ?? undefined,
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

      {/* Vision Section */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6 text-gray-900">
            "Realizing Dreams with Quality Education"
          </h2>
        </div>
      </section>

      {/* Latest News Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Berita Terbaru</h2>
          </div>
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
                    <h3 className="text-xl font-semibold mb-2 line-clamp-2">
                      {locale === 'en' && post.titleEn ? post.titleEn : post.title}
                    </h3>
                    {post.excerpt && (
                      <p className="text-gray-600 line-clamp-3">
                        {locale === 'en' && post.excerptEn ? post.excerptEn : post.excerpt}
                      </p>
                    )}
                    <span className="text-primary-600 font-medium mt-4 inline-block">
                      Selengkapnya →
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link
              href="/berita"
              className="inline-block bg-primary-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-primary-700 transition-colors"
            >
              Lihat Semua Berita
            </Link>
          </div>
        </div>
      </section>


      <Footer locale={locale} />
    </div>
  )
}

