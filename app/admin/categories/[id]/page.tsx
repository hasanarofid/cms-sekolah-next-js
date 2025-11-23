import { getSession } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { redirect, notFound } from 'next/navigation'
import { CategoryForm } from '@/components/admin/CategoryForm'

export const dynamic = 'force-dynamic'

export default async function EditCategoryPage({
  params,
}: {
  params: { id: string }
}) {
  const session = await getSession()
  if (!session) {
    redirect('/login?callbackUrl=/admin/categories')
  }

  const category = await (prisma as any).category.findUnique({
    where: { id: params.id },
  })

  if (!category) {
    notFound()
  }

  const parentCategories = await (prisma as any).category.findMany({
    where: { 
      parentId: null, 
      isActive: true,
      id: { not: params.id } // Exclude current category
    },
    orderBy: { order: 'asc' },
    select: { id: true, name: true, slug: true }
  })

  return (
    <div className="w-full">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Edit Kategori</h1>
        <CategoryForm category={category} parentCategories={parentCategories} />
      </div>
    </div>
  )
}

