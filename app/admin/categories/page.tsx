import { prisma } from '@/lib/prisma'
import Link from 'next/link'
import { Plus, Edit } from 'lucide-react'
import { DeleteButton } from '@/components/admin/DeleteButton'

export const dynamic = 'force-dynamic'

const categoryTypeLabels: Record<string, string> = {
  'program': 'Program',
  'facility': 'Fasilitas',
  'academic': 'Akademik',
  'general': 'Umum',
}

export default async function CategoriesPage() {
  const categories = await (prisma as any).category.findMany({
    where: { parentId: null },
    include: { children: { orderBy: { order: 'asc' } } },
    orderBy: { order: 'asc' }
  })

  return (
    <div className="w-full">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Kelola Kategori</h1>
          <Link
            href="/admin/categories/new"
            className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors flex items-center space-x-2"
          >
            <Plus size={20} />
            <span>Tambah Kategori</span>
          </Link>
        </div>

        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="divide-y divide-gray-200">
            {categories.map((category) => (
              <div key={category.id} className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    {category.image && (
                      <img
                        src={category.image}
                        alt={category.name}
                        className="h-16 w-16 object-cover rounded"
                      />
                    )}
                    <div>
                      <h3 className="text-lg font-semibold">{category.name}</h3>
                      {category.nameEn && (
                        <p className="text-sm text-gray-600">{category.nameEn}</p>
                      )}
                      <div className="flex items-center space-x-2 mt-1">
                        <p className="text-sm text-gray-500">/{category.slug}</p>
                        <span className="text-xs px-2 py-1 bg-primary-100 text-primary-700 rounded">
                          {categoryTypeLabels[category.categoryType] || category.categoryType}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Link
                      href={`/admin/categories/${category.id}`}
                      className="text-primary-600 hover:text-primary-700"
                    >
                      <Edit size={18} />
                    </Link>
                    <DeleteButton
                      id={category.id}
                      apiEndpoint="/api/admin/categories"
                      confirmMessage="Yakin ingin menghapus kategori ini?"
                    />
                  </div>
                </div>
                {category.children.length > 0 && (
                  <div className="mt-4 ml-6 space-y-2">
                    {category.children.map((child) => (
                      <div
                        key={child.id}
                        className="flex items-center justify-between p-3 bg-gray-50 rounded"
                      >
                        <div>
                          <p className="font-medium">{child.name}</p>
                          <p className="text-sm text-gray-500">/{child.slug}</p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Link
                            href={`/admin/categories/${child.id}`}
                            className="text-primary-600 hover:text-primary-700"
                          >
                            <Edit size={16} />
                          </Link>
                          <DeleteButton
                            id={child.id}
                            apiEndpoint="/api/admin/categories"
                            confirmMessage="Yakin ingin menghapus kategori ini?"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

