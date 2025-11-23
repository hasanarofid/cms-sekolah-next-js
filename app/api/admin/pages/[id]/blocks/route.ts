import { NextResponse } from 'next/server'
import { getSession } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getSession()
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const blocks = await (prisma as any).pageBlock.findMany({
      where: { pageId: params.id },
      orderBy: { order: 'asc' }
    })

    return NextResponse.json(blocks)
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Terjadi kesalahan' },
      { status: 500 }
    )
  }
}

export async function POST(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getSession()
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await req.json()
    const { type, data, order, isActive } = body

    // Get max order for this page
    const maxOrder = await (prisma as any).pageBlock.findFirst({
      where: { pageId: params.id },
      orderBy: { order: 'desc' },
      select: { order: true }
    })

    const newOrder = order !== undefined ? order : (maxOrder?.order || 0) + 1

    const block = await (prisma as any).pageBlock.create({
      data: {
        pageId: params.id,
        type,
        data: typeof data === 'string' ? data : JSON.stringify(data),
        order: newOrder,
        isActive: isActive !== undefined ? isActive : true,
      },
    })

    return NextResponse.json(block)
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Terjadi kesalahan' },
      { status: 500 }
    )
  }
}

