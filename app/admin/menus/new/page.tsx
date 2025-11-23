import { getSession } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { redirect } from 'next/navigation'
import { MenuForm } from '@/components/admin/MenuForm'

export const dynamic = 'force-dynamic'

export default async function NewMenuPage() {
  const session = await getSession()
  if (!session) {
    redirect('/login?callbackUrl=/admin/menus/new')
  }

  const parentMenus = await prisma.menu.findMany({
    where: { parentId: null, isActive: true },
    orderBy: { order: 'asc' },
    select: { id: true, title: true, slug: true }
  })

  return (
    <div className="w-full">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Tambah Menu Baru</h1>
        <MenuForm parentMenus={parentMenus} />
      </div>
    </div>
  )
}

