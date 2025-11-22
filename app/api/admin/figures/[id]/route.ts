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
      name,
      nameEn,
      position,
      positionEn,
      image,
      order,
      isActive,
    } = body

    const existingFigure = await prisma.figure.findUnique({
      where: { id: params.id },
    })

    if (!existingFigure) {
      return NextResponse.json({ error: 'Figure not found' }, { status: 404 })
    }

    const figure = await prisma.figure.update({
      where: { id: params.id },
      data: {
        name,
        nameEn: nameEn || null,
        position,
        positionEn: positionEn || null,
        image,
        order: order || 0,
        isActive: isActive !== undefined ? isActive : true,
      },
    })

    return NextResponse.json(figure)
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

    const existingFigure = await prisma.figure.findUnique({
      where: { id: params.id },
    })

    if (!existingFigure) {
      return NextResponse.json({ error: 'Figure not found' }, { status: 404 })
    }

    await prisma.figure.delete({
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

