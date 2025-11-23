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

    // For parent menus with slug "#", make it unique by adding a timestamp or random string
    // But we'll store it as "#" in the database by using a workaround
    let finalSlug = slug
    if (slug === '#' && !parentId) {
      // For parent menu with slug "#", we need to make it unique
      // We'll use a combination that's unique but still represents "#"
      finalSlug = `#-${Date.now()}-${Math.random().toString(36).substring(7)}`
    } else if (slug !== '#') {
      // Check if slug already exists (only for non-"#" slugs)
      const existingMenu = await prisma.menu.findUnique({
        where: { slug },
      })
      if (existingMenu) {
        return NextResponse.json(
          { error: 'Slug sudah digunakan' },
          { status: 400 }
        )
      }
    }

    const menu = await prisma.menu.create({
      data: {
        title,
        titleEn: titleEn || null,
        slug: finalSlug,
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

