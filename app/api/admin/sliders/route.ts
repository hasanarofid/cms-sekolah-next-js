import { getSession } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const sliders = await prisma.slider.findMany({
      where: { isActive: true },
      orderBy: { order: 'asc' }
    })

    return NextResponse.json(sliders)
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
      subtitle,
      subtitleEn,
      image,
      buttonText,
      buttonTextEn,
      buttonUrl,
      order,
      isActive,
    } = body

    const slider = await prisma.slider.create({
      data: {
        title,
        titleEn: titleEn || null,
        subtitle: subtitle || null,
        subtitleEn: subtitleEn || null,
        image,
        buttonText: buttonText || null,
        buttonTextEn: buttonTextEn || null,
        buttonUrl: buttonUrl || null,
        order: order || 0,
        isActive: isActive !== undefined ? isActive : true,
      },
    })

    return NextResponse.json(slider)
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Terjadi kesalahan' },
      { status: 500 }
    )
  }
}

