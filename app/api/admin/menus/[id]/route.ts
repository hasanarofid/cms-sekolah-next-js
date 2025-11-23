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

    const existingMenu = await prisma.menu.findUnique({
      where: { id: params.id },
    })

    if (!existingMenu) {
      return NextResponse.json({ error: 'Menu not found' }, { status: 404 })
    }

    // For parent menus with slug "#", make it unique by adding a timestamp or random string
    // But we'll store it as "#" in the database by using a workaround
    let finalSlug = slug
    if (slug === '#' && !parentId) {
      // For parent menu with slug "#", check if current menu already has "#" slug
      // If it's the same menu, keep the existing slug
      if (existingMenu.slug.startsWith('#-')) {
        finalSlug = existingMenu.slug // Keep existing unique slug
      } else {
        // Generate new unique slug for "#"
        finalSlug = `#-${Date.now()}-${Math.random().toString(36).substring(7)}`
      }
    } else if (slug !== '#') {
      // Check if slug already exists (only for non-"#" slugs and if slug changed)
      if (slug !== existingMenu.slug) {
        const slugExists = await prisma.menu.findUnique({
          where: { slug },
        })
        if (slugExists) {
          return NextResponse.json(
            { error: 'Slug sudah digunakan' },
            { status: 400 }
          )
        }
      }
    } else if (slug === '#' && existingMenu.slug.startsWith('#-')) {
      // If changing to "#" and current slug is already a unique "#" variant, keep it
      finalSlug = existingMenu.slug
    }

    const menu = await prisma.menu.update({
      where: { id: params.id },
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

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getSession()
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const existingMenu = await prisma.menu.findUnique({
      where: { id: params.id },
    })

    if (!existingMenu) {
      return NextResponse.json({ error: 'Menu not found' }, { status: 404 })
    }

    await prisma.menu.delete({
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

