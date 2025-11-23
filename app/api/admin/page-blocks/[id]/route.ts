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
      data,
      order,
      isActive,
    } = body

    const existingBlock = await prisma.pageBlock.findUnique({
      where: { id: params.id },
    })

    if (!existingBlock) {
      return NextResponse.json({ error: 'Block not found' }, { status: 404 })
    }

    const block = await prisma.pageBlock.update({
      where: { id: params.id },
      data: {
        type,
        data: JSON.stringify(data),
        order: order || 0,
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

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getSession()
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const existingBlock = await prisma.pageBlock.findUnique({
      where: { id: params.id },
    })

    if (!existingBlock) {
      return NextResponse.json({ error: 'Block not found' }, { status: 404 })
    }

    await prisma.pageBlock.delete({
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

