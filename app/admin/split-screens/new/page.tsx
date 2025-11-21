import { getSession } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { HomeSectionForm } from '@/components/admin/HomeSectionForm'

export const dynamic = 'force-dynamic'

export default async function NewSplitScreenPage() {
  const session = await getSession()
  if (!session) {
    redirect('/login?callbackUrl=/admin/split-screens/new')
  }

  return (
    <div className="w-full">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Tambah Split Screen Section Baru</h1>
        <HomeSectionForm defaultType="split-screen" />
      </div>
    </div>
  )
}

