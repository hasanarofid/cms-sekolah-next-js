import { getSession } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import Link from 'next/link'
import { FileText, Newspaper, Image, Menu, Settings, Sliders, Layout } from 'lucide-react'

export const dynamic = 'force-dynamic'

export default async function AdminDashboard() {
  const session = await getSession()

  const stats = {
    pages: await prisma.page.count(),
    posts: await prisma.post.count(),
    publishedPosts: await prisma.post.count({ where: { isPublished: true } }),
    menus: await prisma.menu.count(),
    media: await prisma.media.count(),
    contacts: await prisma.contact.count({ where: { isRead: false } }),
  }

  return (
    <div className="w-full">
      <div className="max-w-7xl mx-auto">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Total Halaman</p>
                <p className="text-3xl font-bold mt-2">{stats.pages}</p>
              </div>
              <FileText className="text-primary-600" size={32} />
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Total Post</p>
                <p className="text-3xl font-bold mt-2">{stats.posts}</p>
              </div>
              <Newspaper className="text-primary-600" size={32} />
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Post Terpublikasi</p>
                <p className="text-3xl font-bold mt-2">{stats.publishedPosts}</p>
              </div>
              <Newspaper className="text-green-600" size={32} />
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Kontak Baru</p>
                <p className="text-3xl font-bold mt-2">{stats.contacts}</p>
              </div>
              <FileText className="text-yellow-600" size={32} />
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <h2 className="text-xl font-bold mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Link
              href="/admin/pages"
              className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <FileText size={24} className="text-primary-600" />
              <span>Kelola Halaman</span>
            </Link>
            <Link
              href="/admin/posts"
              className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <Newspaper size={24} className="text-primary-600" />
              <span>Kelola Berita</span>
            </Link>
            <Link
              href="/admin/menus"
              className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <Menu size={24} className="text-primary-600" />
              <span>Kelola Menu</span>
            </Link>
            <Link
              href="/admin/media"
              className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <Image size={24} className="text-primary-600" />
              <span>Kelola Media</span>
            </Link>
            <Link
              href="/admin/galleries"
              className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <Image size={24} className="text-primary-600" />
              <span>Kelola Galeri</span>
            </Link>
            <Link
              href="/admin/sliders"
              className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <Sliders size={24} className="text-primary-600" />
              <span>Kelola Slider</span>
            </Link>
            <Link
              href="/admin/home-sections"
              className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <Layout size={24} className="text-primary-600" />
              <span>Kelola Home Sections</span>
            </Link>
            <Link
              href="/admin/contacts"
              className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <FileText size={24} className="text-primary-600" />
              <span>Kontak</span>
            </Link>
            <Link
              href="/admin/settings"
              className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <Settings size={24} className="text-primary-600" />
              <span>Pengaturan</span>
            </Link>
          </div>
        </div>

        {/* Recent Posts */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-bold mb-4">Post Terbaru</h2>
          <div className="space-y-4">
            {(await prisma.post.findMany({
              take: 5,
              orderBy: { createdAt: 'desc' },
              include: { author: { select: { name: true } } }
            })).map((post) => (
              <div key={post.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                <div>
                  <h3 className="font-semibold">{post.title}</h3>
                  <p className="text-sm text-gray-600">
                    oleh {post.author.name} • {new Date(post.createdAt).toLocaleDateString('id-ID')}
                  </p>
                </div>
                <Link
                  href={`/admin/posts/${post.id}`}
                  className="text-primary-600 hover:text-primary-700"
                >
                  Edit
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

