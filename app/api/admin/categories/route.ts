import { getSession } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const categories = await (prisma as any).category.findMany({
      where: { parentId: null },
      include: { children: { orderBy: { order: 'asc' } } },
      orderBy: { order: 'asc' }
    })

    return NextResponse.json(categories)
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
      slug,
      description,
      descriptionEn,
      image,
      parentId,
      categoryType,
      order,
      isActive,
    } = body

    const category = await (prisma as any).category.create({
      data: {
        name,
        nameEn: nameEn || null,
        slug,
        description: description || null,
        descriptionEn: descriptionEn || null,
        image: image || null,
        parentId: parentId || null,
        categoryType: categoryType || 'general',
        order: order || 0,
        isActive: isActive !== undefined ? isActive : true,
      },
    })

    return NextResponse.json(category)
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Terjadi kesalahan' },
      { status: 500 }
    )
  }
}

