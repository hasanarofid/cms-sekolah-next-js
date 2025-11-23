import { getSession } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { redirect } from 'next/navigation'
import { PageForm } from '@/components/admin/PageForm'

export const dynamic = 'force-dynamic'

export default async function NewPagePage() {
  const session = await getSession()
  if (!session) {
    redirect('/login?callbackUrl=/admin/pages/new')
  }

  const menus = await prisma.menu.findMany({
    where: { isActive: true },
    orderBy: { order: 'asc' },
    select: { id: true, title: true, slug: true }
  })

  return (
    <div className="w-full">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Tambah Halaman Baru</h1>
        <PageForm menus={menus} />
      </div>
    </div>
  )
}

