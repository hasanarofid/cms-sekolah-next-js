import { getSession } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'

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

    const existingSection = await prisma.homeSection.findUnique({
      where: { id: params.id },
    })

    if (!existingSection) {
      return NextResponse.json({ error: 'Section not found' }, { status: 404 })
    }

    const section = await prisma.homeSection.update({
      where: { id: params.id },
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

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getSession()
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const existingSection = await prisma.homeSection.findUnique({
      where: { id: params.id },
    })

    if (!existingSection) {
      return NextResponse.json({ error: 'Section not found' }, { status: 404 })
    }

    await prisma.homeSection.delete({
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

