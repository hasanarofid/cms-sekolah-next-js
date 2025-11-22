import { getSession } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import Link from 'next/link'
import { Plus, Edit } from 'lucide-react'
import { DeleteButton } from '@/components/admin/DeleteButton'

export const dynamic = 'force-dynamic'

const categoryLabels: Record<string, string> = {
  'international': 'Kerjasama Internasional',
  'health': 'Kerjasama Kesehatan',
  'student-escort': 'Kerjasama Pengawalan Siswa',
}

export default async function PartnershipsPage() {
  const partnerships = await prisma.partnership.findMany({
    orderBy: [{ category: 'asc' }, { order: 'asc' }]
  })

  const groupedPartnerships = partnerships.reduce((acc: any, partnership: any) => {
    if (!acc[partnership.category]) {
      acc[partnership.category] = []
    }
    acc[partnership.category].push(partnership)
    return acc
  }, {})

  return (
    <div className="w-full">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Kelola Kerjasama</h1>
          <Link
            href="/admin/partnerships/new"
            className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors flex items-center space-x-2"
          >
            <Plus size={20} />
            <span>Tambah Kerjasama</span>
          </Link>
        </div>

        {Object.keys(groupedPartnerships).map((category) => (
          <div key={category} className="bg-white rounded-lg shadow overflow-hidden mb-6">
            <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
              <h2 className="text-xl font-bold text-gray-800">
                {categoryLabels[category] || category}
              </h2>
            </div>
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Logo
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Nama
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
                {groupedPartnerships[category].map((partnership: any) => (
                  <tr key={partnership.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {partnership.logo ? (
                        <img
                          src={partnership.logo}
                          alt={partnership.name}
                          className="h-16 w-32 object-contain bg-gray-50 p-2 rounded"
                        />
                      ) : (
                        <div className="h-16 w-32 bg-gray-200 rounded"></div>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm font-medium text-gray-900">
                        {partnership.name}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {partnership.order}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                        partnership.isActive
                          ? 'bg-green-100 text-green-800'
                          : 'bg-gray-100 text-gray-800'
                      }`}>
                        {partnership.isActive ? 'Aktif' : 'Nonaktif'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex justify-end space-x-2">
                        <Link
                          href={`/admin/partnerships/${partnership.id}`}
                          className="text-primary-600 hover:text-primary-900"
                        >
                          <Edit size={18} />
                        </Link>
                        <DeleteButton
                          id={partnership.id}
                          apiEndpoint="/api/admin/partnerships"
                          confirmMessage="Yakin ingin menghapus kerjasama ini?"
                        />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ))}

        {partnerships.length === 0 && (
          <div className="bg-white rounded-lg shadow p-12 text-center text-gray-500">
            Belum ada kerjasama. Klik "Tambah Kerjasama" untuk membuat baru.
          </div>
        )}
      </div>
    </div>
  )
}

