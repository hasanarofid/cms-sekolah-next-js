import { Navigation } from '@/components/Navigation'
import { Footer } from '@/components/Footer'
import { prisma } from '@/lib/prisma'
import { notFound } from 'next/navigation'
import { formatDate } from '@/lib/utils'

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
    include: { children: { where: { isActive: true }, orderBy: { order: 'asc' } } },
    orderBy: { order: 'asc' }
  })

  const menus = menusData.map(menu => ({
    ...menu,
    titleEn: menu.titleEn ?? undefined,
    children: menu.children.map(child => ({
      ...child,
      titleEn: child.titleEn ?? undefined,
    })),
  }))

  const post = await prisma.post.findUnique({
    where: { slug: params.slug },
    include: { author: { select: { name: true } } }
  })

  if (!post || !post.isPublished) {
    notFound()
  }

  return (
    <div className="min-h-screen">
      <Navigation menus={menus} locale={locale} />

      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {post.featuredImage && (
          <div className="mb-8">
            <img
              src={post.featuredImage}
              alt={post.title}
              className="w-full h-96 object-cover rounded-lg"
            />
          </div>
        )}

        <header className="mb-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            {locale === 'en' && post.titleEn ? post.titleEn : post.title}
          </h1>
          <div className="flex items-center space-x-4 text-gray-600">
            <span>{post.author.name}</span>
            <span>•</span>
            <span>
              {post.publishedAt && formatDate(post.publishedAt)}
            </span>
          </div>
        </header>

        <div
          className="prose prose-lg max-w-none"
          dangerouslySetInnerHTML={{
            __html: locale === 'en' && post.contentEn ? post.contentEn : post.content
          }}
        />
      </article>

      <Footer locale={locale} />
    </div>
  )
}

