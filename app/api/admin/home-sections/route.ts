import { getSession } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const sections = await prisma.homeSection.findMany({
      where: { isActive: true },
      orderBy: { order: 'asc' }
    })

    return NextResponse.json(sections)
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
      type,
      title,
      titleEn,
      subtitle,
      subtitleEn,
      content,
      contentEn,
      image,
      images,
      videoUrl,
      buttonText,
      buttonTextEn,
      buttonUrl,
      order,
      isActive,
    } = body

    const section = await prisma.homeSection.create({
      data: {
        type,
        title: title || null,
        titleEn: titleEn || null,
        subtitle: subtitle || null,
        subtitleEn: subtitleEn || null,
        content: content || null,
        contentEn: contentEn || null,
        image: image || null,
        images: images ? JSON.stringify(images) : null,
        videoUrl: videoUrl || null,
        buttonText: buttonText || null,
        buttonTextEn: buttonTextEn || null,
        buttonUrl: buttonUrl || null,
        order: order || 0,
        isActive: isActive !== undefined ? isActive : true,
      },
    })

    return NextResponse.json(section)
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Terjadi kesalahan' },
      { status: 500 }
    )
  }
}

