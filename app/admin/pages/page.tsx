import { prisma } from '@/lib/prisma'
import Link from 'next/link'
import { Plus, Edit, Eye } from 'lucide-react'
import { DeleteButton } from '@/components/admin/DeleteButton'

export const dynamic = 'force-dynamic'

export default async function PagesPage({
  searchParams,
}: {
  searchParams: { slug?: string }
}) {
  // Filter pages based on slug if provided
  const whereClause = searchParams.slug
    ? {
        OR: [
          { slug: searchParams.slug },
          { slug: { contains: `-${searchParams.slug}` } },
          { slug: { startsWith: `${searchParams.slug}-` } },
        ],
      }
    : {}

  const pages = await prisma.page.findMany({
    where: whereClause,
    orderBy: { createdAt: 'desc' },
    include: { author: { select: { name: true } } }
  })

  // Get title based on filter
  const pageTitle = searchParams.slug === 'smp' 
    ? 'Kelola Halaman SMP' 
    : searchParams.slug === 'sma' 
    ? 'Kelola Halaman SMA' 
    : 'Kelola Halaman'

  return (
    <div className="w-full">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold">{pageTitle}</h1>
            {searchParams.slug && (
              <p className="text-sm text-gray-500 mt-1">
                Menampilkan halaman untuk {searchParams.slug.toUpperCase()}
              </p>
            )}
          </div>
          <div className="flex space-x-2">
            {searchParams.slug && (
              <Link
                href="/admin/pages"
                className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors flex items-center space-x-2"
              >
                <span>Semua Halaman</span>
              </Link>
            )}
            <Link
              href="/admin/pages/new"
              className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors flex items-center space-x-2"
            >
              <Plus size={20} />
              <span>Tambah Halaman</span>
            </Link>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Judul
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Slug
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Penulis
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Aksi
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {pages.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-gray-500">
                    {searchParams.slug 
                      ? `Tidak ada halaman ditemukan untuk ${searchParams.slug.toUpperCase()}` 
                      : 'Tidak ada halaman ditemukan'}
                  </td>
                </tr>
              ) : (
                pages.map((page) => (
                  <tr key={page.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{page.title}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">/{page.slug}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          page.isPublished
                            ? 'bg-green-100 text-green-800'
                            : 'bg-gray-100 text-gray-800'
                        }`}
                      >
                        {page.isPublished ? 'Published' : 'Draft'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">{page.author.name}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex justify-end space-x-2">
                        <Link
                          href={`/${page.slug}`}
                          target="_blank"
                          className="text-blue-600 hover:text-blue-900"
                        >
                          <Eye size={18} />
                        </Link>
                        <Link
                          href={`/admin/pages/${page.id}`}
                          className="text-primary-600 hover:text-primary-900"
                        >
                          <Edit size={18} />
                        </Link>
                        <DeleteButton
                          id={page.id}
                          apiEndpoint="/api/admin/pages"
                          confirmMessage="Yakin ingin menghapus halaman ini?"
                        />
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

