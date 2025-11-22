import { getSession } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { PartnershipForm } from '@/components/admin/PartnershipForm'

export const dynamic = 'force-dynamic'

export default async function NewPartnershipPage() {
  const session = await getSession()
  if (!session) {
    redirect('/login?callbackUrl=/admin/partnerships/new')
  }

  return (
    <div className="w-full">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Tambah Kerjasama Baru</h1>
        <PartnershipForm />
      </div>
    </div>
  )
}

