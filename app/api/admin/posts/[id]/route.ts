import { getSession } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'
import { slugify } from '@/lib/utils'

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
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
      categoryId,
      tags,
      isPublished,
    } = body

    const existingPost = await prisma.post.findUnique({
      where: { id: params.id },
    })

    if (!existingPost) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 })
    }

    const finalSlug = slug || slugify(title)

    // If publishing for the first time, set publishedAt
    const publishedAt =
      isPublished && !existingPost.isPublished
        ? new Date()
        : existingPost.publishedAt

    const post = await prisma.post.update({
      where: { id: params.id },
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
        categoryId: categoryId || null,
        tags: tags ? JSON.stringify(tags) : '[]',
        isPublished: isPublished || false,
        publishedAt,
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

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getSession()
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    await prisma.post.delete({
      where: { id: params.id },
    })

    return NextResponse.json({ success: true })
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Terjadi kesalahan' },
      { status: 500 }
    )
  }
}

