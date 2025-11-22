import { getSession } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import Link from 'next/link'
import { Plus, Edit } from 'lucide-react'
import { DeleteButton } from '@/components/admin/DeleteButton'

export const dynamic = 'force-dynamic'

export default async function FiguresPage() {
  const figures = await prisma.figure.findMany({
    orderBy: { order: 'asc' }
  })

  return (
    <div className="w-full">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Kelola Tokoh-Tokoh Al Azhar IIBS</h1>
          <Link
            href="/admin/figures/new"
            className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors flex items-center space-x-2"
          >
            <Plus size={20} />
            <span>Tambah Tokoh</span>
          </Link>
        </div>

        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Foto
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Nama
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Posisi
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Order
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Aksi
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {figures.map((figure: any) => (
                <tr key={figure.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {figure.image ? (
                      <img
                        src={figure.image}
                        alt={figure.name}
                        className="h-16 w-16 object-cover rounded-full"
                      />
                    ) : (
                      <div className="h-16 w-16 bg-gray-200 rounded-full"></div>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm font-medium text-gray-900">
                      {figure.name}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-500">
                      {figure.position}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {figure.order}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                      figure.isActive
                        ? 'bg-green-100 text-green-800'
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      {figure.isActive ? 'Aktif' : 'Nonaktif'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex justify-end space-x-2">
                      <Link
                        href={`/admin/figures/${figure.id}`}
                        className="text-primary-600 hover:text-primary-900"
                      >
                        <Edit size={18} />
                      </Link>
                      <DeleteButton
                        id={figure.id}
                        apiEndpoint="/api/admin/figures"
                        confirmMessage="Yakin ingin menghapus tokoh ini?"
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {figures.length === 0 && (
            <div className="text-center py-12 text-gray-500">
              Belum ada tokoh. Klik "Tambah Tokoh" untuk membuat baru.
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

