import { getSession } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { redirect, notFound } from 'next/navigation'
import { PartnershipForm } from '@/components/admin/PartnershipForm'

export const dynamic = 'force-dynamic'

export default async function EditPartnershipPage({
  params,
}: {
  params: { id: string }
}) {
  const session = await getSession()
  if (!session) {
    redirect('/login?callbackUrl=/admin/partnerships')
  }

  const partnership = await prisma.partnership.findUnique({
    where: { id: params.id },
  })

  if (!partnership) {
    notFound()
  }

  return (
    <div className="w-full">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Edit Kerjasama</h1>
        <PartnershipForm partnership={partnership} />
      </div>
    </div>
  )
}

