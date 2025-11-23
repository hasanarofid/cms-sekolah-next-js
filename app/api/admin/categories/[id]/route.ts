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
      slug,
      description,
      descriptionEn,
      image,
      parentId,
      categoryType,
      order,
      isActive,
    } = body

    const existingCategory = await (prisma as any).category.findUnique({
      where: { id: params.id },
    })

    if (!existingCategory) {
      return NextResponse.json({ error: 'Category not found' }, { status: 404 })
    }

    const category = await (prisma as any).category.update({
      where: { id: params.id },
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

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getSession()
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const existingCategory = await (prisma as any).category.findUnique({
      where: { id: params.id },
    })

    if (!existingCategory) {
      return NextResponse.json({ error: 'Category not found' }, { status: 404 })
    }

    await (prisma as any).category.delete({
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

