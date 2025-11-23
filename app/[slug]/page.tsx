import { Navigation } from '@/components/Navigation'
import { Footer } from '@/components/Footer'
import { prisma } from '@/lib/prisma'
import { notFound } from 'next/navigation'

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
          <Navigation menus={menus} locale={locale} />
          
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

          <Footer locale={locale} />
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

  return (
    <div className="min-h-screen bg-white">
      <Navigation menus={menus} locale={locale} />

      {needsSpecialHeader ? (
        <div className="bg-[#1e3a5f] text-white py-24 md:py-32 lg:py-40 mt-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-center">
              {locale === 'en' && page.titleEn ? page.titleEn : page.title}
            </h1>
          </div>
        </div>
      ) : isAcademicTemplate ? (
        // Academic pages (SMP/SMA) don't need header, content is self-contained
        null
      ) : (
        <>
          {page.featuredImage && (
            <div className="h-64 md:h-96 bg-gray-200 relative mt-20">
              <img
                src={page.featuredImage}
                alt={page.title}
                className="w-full h-full object-cover"
              />
            </div>
          )}
        </>
      )}

      <article className={`${needsSpecialHeader || isAcademicTemplate ? 'bg-white' : 'max-w-4xl mx-auto'} px-4 sm:px-6 lg:px-8 ${needsSpecialHeader || isAcademicTemplate ? 'py-12 md:py-16' : 'py-12'} ${isAcademicTemplate ? 'mt-20' : ''}`}>
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

        {/* Render page blocks if available */}
        {page.blocks && page.blocks.length > 0 ? (
          <div className="space-y-8">
            {page.blocks.map((block: any) => {
              const blockData = JSON.parse(block.data)
              // Render different block types here
              // For now, fallback to content
              return (
                <div key={block.id} className="prose prose-lg max-w-none">
                  {block.type === 'text' && (
                    <div dangerouslySetInnerHTML={{ __html: blockData.content || '' }} />
                  )}
                  {block.type === 'image' && blockData.image && (
                    <img src={blockData.image} alt={blockData.alt || ''} className="w-full rounded-lg" />
                  )}
                  {/* Add more block types as needed */}
                </div>
              )
            })}
          </div>
        ) : (
          <div
            className={`${needsSpecialHeader ? 'max-w-5xl mx-auto' : ''} prose prose-lg max-w-none prose-headings:text-gray-900 prose-p:text-gray-700 prose-p:leading-relaxed prose-p:text-lg prose-h2:text-3xl prose-h2:font-bold prose-h2:mb-6 prose-h3:text-2xl prose-h3:font-bold prose-h3:mb-4 prose-h3:text-gray-800`}
            dangerouslySetInnerHTML={{
              __html: locale === 'en' && page.contentEn ? page.contentEn : page.content
            }}
          />
        )}
      </article>

      <Footer locale={locale} />
    </div>
  )
}

