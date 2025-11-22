import { getSession } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { HomeSectionForm } from '@/components/admin/HomeSectionForm'

export const dynamic = 'force-dynamic'

export default async function NewUniversityMapPage() {
  const session = await getSession()
  if (!session) {
    redirect('/login?callbackUrl=/admin/university-maps/new')
  }

  return (
    <div className="w-full">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Tambah University Map Section Baru</h1>
        <HomeSectionForm defaultType="university-map" />
      </div>
    </div>
  )
}

