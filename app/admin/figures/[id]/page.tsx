import { getSession } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { redirect, notFound } from 'next/navigation'
import { FigureForm } from '@/components/admin/FigureForm'

export const dynamic = 'force-dynamic'

export default async function EditFigurePage({
  params,
}: {
  params: { id: string }
}) {
  const session = await getSession()
  if (!session) {
    redirect('/login?callbackUrl=/admin/figures')
  }

  const figure = await prisma.figure.findUnique({
    where: { id: params.id },
  })

  if (!figure) {
    notFound()
  }

  return (
    <div className="w-full">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Edit Tokoh</h1>
        <FigureForm figure={figure} />
      </div>
    </div>
  )
}

