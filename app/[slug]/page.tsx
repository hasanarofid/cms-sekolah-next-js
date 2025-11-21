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
    include: { children: { where: { isActive: true }, orderBy: { order: 'asc' } } },
    orderBy: { order: 'asc' }
  })

  // Map to ensure type compatibility
  const menus = menusData.map(menu => ({
    ...menu,
    titleEn: menu.titleEn ?? undefined,
    children: menu.children.map(child => ({
      ...child,
      titleEn: child.titleEn ?? undefined,
    })),
  }))

  const page = await prisma.page.findUnique({
    where: { slug: params.slug },
    include: { author: { select: { name: true } } }
  })

  if (!page || !page.isPublished) {
    notFound()
  }

  return (
    <div className="min-h-screen">
      <Navigation menus={menus} locale={locale} />

      {page.featuredImage && (
        <div className="h-64 bg-gray-200 relative">
          <img
            src={page.featuredImage}
            alt={page.title}
            className="w-full h-full object-cover"
          />
        </div>
      )}

      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <header className="mb-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            {locale === 'en' && page.titleEn ? page.titleEn : page.title}
          </h1>
          {page.excerpt && (
            <p className="text-xl text-gray-600">
              {locale === 'en' && page.excerptEn ? page.excerptEn : page.excerpt}
            </p>
          )}
        </header>

        <div
          className="prose prose-lg max-w-none"
          dangerouslySetInnerHTML={{
            __html: locale === 'en' && page.contentEn ? page.contentEn : page.content
          }}
        />
      </article>

      <Footer locale={locale} />
    </div>
  )
}

