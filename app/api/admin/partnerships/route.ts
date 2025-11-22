import { getSession } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const partnerships = await prisma.partnership.findMany({
      where: { isActive: true },
      orderBy: [{ category: 'asc' }, { order: 'asc' }]
    })

    return NextResponse.json(partnerships)
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
      name,
      nameEn,
      logo,
      category,
      order,
      isActive,
    } = body

    const partnership = await prisma.partnership.create({
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

