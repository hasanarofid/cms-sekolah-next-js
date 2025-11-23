import { getSession } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const pages = await prisma.page.findMany({
      orderBy: { createdAt: 'desc' },
      include: { author: { select: { name: true } } }
    })

    return NextResponse.json(pages)
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Terjadi kesalahan' },
      { status: 500 }
    )
  }
}

export async function POST(req: Request) {
  try {
    const session = await getSession()
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await req.json()
    const {
      title,
      titleEn,
      slug,
      content,
      contentEn,
      excerpt,
      excerptEn,
      featuredImage,
      menuId,
      pageType,
      template,
      seoTitle,
      seoDescription,
      seoKeywords,
      isPublished,
    } = body

    const page = await prisma.page.create({
      data: {
        title,
        titleEn: titleEn || null,
        slug,
        content,
        contentEn: contentEn || null,
        excerpt: excerpt || null,
        excerptEn: excerptEn || null,
        featuredImage: featuredImage || null,
        menuId: menuId || null,
        pageType: pageType || 'standard',
        template: template || null,
        seoTitle: seoTitle || null,
        seoDescription: seoDescription || null,
        seoKeywords: seoKeywords || null,
        isPublished: isPublished || false,
        publishedAt: isPublished ? new Date() : null,
        authorId: (session.user as any).id,
      },
    })

    return NextResponse.json(page)
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Terjadi kesalahan' },
      { status: 500 }
    )
  }
}

