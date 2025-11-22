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
      logo,
      category,
      order,
      isActive,
    } = body

    const existingPartnership = await prisma.partnership.findUnique({
      where: { id: params.id },
    })

    if (!existingPartnership) {
      return NextResponse.json({ error: 'Partnership not found' }, { status: 404 })
    }

    const partnership = await prisma.partnership.update({
      where: { id: params.id },
      data: {
        name,
        nameEn: nameEn || null,
        logo,
        category,
        order: order || 0,
        isActive: isActive !== undefined ? isActive : true,
      },
    })

    return NextResponse.json(partnership)
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

    const existingPartnership = await prisma.partnership.findUnique({
      where: { id: params.id },
    })

    if (!existingPartnership) {
      return NextResponse.json({ error: 'Partnership not found' }, { status: 404 })
    }

    await prisma.partnership.delete({
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

