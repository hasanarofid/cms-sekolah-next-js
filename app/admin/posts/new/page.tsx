import { redirect } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import { PostForm } from '@/components/admin/PostForm'

export default async function NewPostPage() {
  const menus = await prisma.menu.findMany({
    where: { isActive: true },
    orderBy: { order: 'asc' }
  })

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold mb-6">Tambah Post Baru</h1>
        <PostForm menus={menus} />
      </div>
    </div>
  )
}

