import { prisma } from '@/lib/prisma'
import Link from 'next/link'
import { Plus, Edit } from 'lucide-react'
import { DeleteButton } from '@/components/admin/DeleteButton'

export const dynamic = 'force-dynamic'

export default async function MenusPage() {
  const menus = await prisma.menu.findMany({
    where: { parentId: null },
    include: { children: { orderBy: { order: 'asc' } } },
    orderBy: { order: 'asc' }
  })

  return (
    <div className="w-full">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Kelola Menu</h1>
          <Link
            href="/admin/menus/new"
            className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors flex items-center space-x-2"
          >
            <Plus size={20} />
            <span>Tambah Menu</span>
          </Link>
        </div>

        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="divide-y divide-gray-200">
            {menus.map((menu) => (
              <div key={menu.id} className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-semibold">{menu.title}</h3>
                    {menu.titleEn && (
                      <p className="text-sm text-gray-600">{menu.titleEn}</p>
                    )}
                    <p className="text-sm text-gray-500">/{menu.slug}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Link
                      href={`/admin/menus/${menu.id}`}
                      className="text-primary-600 hover:text-primary-700"
                    >
                      <Edit size={18} />
                    </Link>
                    <DeleteButton
                      id={menu.id}
                      apiEndpoint="/api/admin/menus"
                      confirmMessage="Yakin ingin menghapus menu ini?"
                    />
                  </div>
                </div>
                {menu.children.length > 0 && (
                  <div className="mt-4 ml-6 space-y-2">
                    {menu.children.map((child) => (
                      <div
                        key={child.id}
                        className="flex items-center justify-between p-3 bg-gray-50 rounded"
                      >
                        <div>
                          <p className="font-medium">{child.title}</p>
                          <p className="text-sm text-gray-500">/{child.slug}</p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Link
                            href={`/admin/menus/${child.id}`}
                            className="text-primary-600 hover:text-primary-700"
                          >
                            <Edit size={16} />
                          </Link>
                          <DeleteButton
                            id={child.id}
                            apiEndpoint="/api/admin/menus"
                            confirmMessage="Yakin ingin menghapus menu ini?"
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

