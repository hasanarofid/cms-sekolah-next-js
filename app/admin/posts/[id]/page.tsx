import { notFound, redirect } from 'next/navigation'
import { getSession } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { PostForm } from '@/components/admin/PostForm'

export const dynamic = 'force-dynamic'

export default async function EditPostPage({
  params,
}: {
  params: { id: string }
}) {
  const session = await getSession()
  if (!session) {
    redirect('/login?callbackUrl=/admin/posts')
  }

  const post = await prisma.post.findUnique({
    where: { id: params.id }
  })

  if (!post) {
    notFound()
  }

  const menus = await prisma.menu.findMany({
    where: { isActive: true },
    orderBy: { order: 'asc' }
  })

  const categories = await (prisma as any).category.findMany({
    where: { isActive: true },
    orderBy: { order: 'asc' },
    select: { id: true, name: true, slug: true }
  })

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold mb-6">Edit Post</h1>
        <PostForm post={post} menus={menus} categories={categories} />
      </div>
    </div>
  )
}

