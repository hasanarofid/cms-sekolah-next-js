import { getSession } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { redirect } from 'next/navigation'
import { CategoryForm } from '@/components/admin/CategoryForm'

export const dynamic = 'force-dynamic'

export default async function NewCategoryPage() {
  const session = await getSession()
  if (!session) {
    redirect('/login?callbackUrl=/admin/categories/new')
  }

  const parentCategories = await (prisma as any).category.findMany({
    where: { parentId: null, isActive: true },
    orderBy: { order: 'asc' },
    select: { id: true, name: true, slug: true }
  })

  return (
    <div className="w-full">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Tambah Kategori Baru</h1>
        <CategoryForm parentCategories={parentCategories} />
      </div>
    </div>
  )
}

