import { getSession } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { redirect, notFound } from 'next/navigation'
import { HomeSectionForm } from '@/components/admin/HomeSectionForm'

export const dynamic = 'force-dynamic'

export default async function EditHomeSectionPage({
  params,
}: {
  params: { id: string }
}) {
  const session = await getSession()
  if (!session) {
    redirect('/login?callbackUrl=/admin/home-sections')
  }

  const section = await prisma.homeSection.findUnique({
    where: { id: params.id },
  })

  if (!section) {
    notFound()
  }

  // Parse images if exists
  const sectionData = {
    ...section,
    images: section.images ? JSON.parse(section.images) : null,
  }

  return (
    <div className="w-full">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Edit Home Section</h1>
        <HomeSectionForm section={sectionData} />
      </div>
    </div>
  )
}

