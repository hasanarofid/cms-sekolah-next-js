import { getSession } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'
import { slugify } from '@/lib/utils'

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
      category,
      tags,
      isPublished,
    } = body

    const finalSlug = slug || slugify(title)

    const post = await prisma.post.create({
      data: {
        title,
        titleEn: titleEn || null,
        slug: finalSlug,
        content,
        contentEn: contentEn || null,
        excerpt: excerpt || null,
        excerptEn: excerptEn || null,
        featuredImage: featuredImage || null,
        category: category || null,
        tags: tags ? JSON.stringify(tags) : '[]',
        isPublished: isPublished || false,
        publishedAt: isPublished ? new Date() : null,
        authorId: (session.user as any).id,
      },
    })

    return NextResponse.json(post)
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Terjadi kesalahan' },
      { status: 500 }
    )
  }
}

