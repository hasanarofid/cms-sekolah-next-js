import { getSession } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { redirect, notFound } from 'next/navigation'
import { MenuForm } from '@/components/admin/MenuForm'

export const dynamic = 'force-dynamic'

export default async function EditMenuPage({
  params,
}: {
  params: { id: string }
}) {
  const session = await getSession()
  if (!session) {
    redirect('/login?callbackUrl=/admin/menus')
  }

  const menu = await prisma.menu.findUnique({
    where: { id: params.id },
  })

  if (!menu) {
    notFound()
  }

  const parentMenus = await prisma.menu.findMany({
    where: { 
      parentId: null, 
      isActive: true,
      id: { not: params.id } // Exclude current menu
    },
    orderBy: { order: 'asc' },
    select: { id: true, title: true, slug: true }
  })

  return (
    <div className="w-full">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Edit Menu</h1>
        <MenuForm menu={menu} parentMenus={parentMenus} />
      </div>
    </div>
  )
}

