import { getSession } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const menus = await prisma.menu.findMany({
      where: { parentId: null },
      include: { children: { orderBy: { order: 'asc' } } },
      orderBy: { order: 'asc' }
    })

    return NextResponse.json(menus)
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
      slug,
      parentId,
      menuType,
      externalUrl,
      icon,
      description,
      descriptionEn,
      order,
      isActive,
    } = body

    const menu = await prisma.menu.create({
      data: {
        title,
        titleEn: titleEn || null,
        slug,
        parentId: parentId || null,
        menuType: menuType || 'page',
        externalUrl: externalUrl || null,
        icon: icon || null,
        description: description || null,
        descriptionEn: descriptionEn || null,
        order: order || 0,
        isActive: isActive !== undefined ? isActive : true,
      },
    })

    return NextResponse.json(menu)
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Terjadi kesalahan' },
      { status: 500 }
    )
  }
}

