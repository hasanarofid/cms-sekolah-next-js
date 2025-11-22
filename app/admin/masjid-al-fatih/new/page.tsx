import { getSession } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { HomeSectionForm } from '@/components/admin/HomeSectionForm'

export const dynamic = 'force-dynamic'

export default async function NewMasjidAlFatihPage() {
  const session = await getSession()
  if (!session) {
    redirect('/login?callbackUrl=/admin/masjid-al-fatih/new')
  }

  return (
    <div className="w-full">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Tambah Masjid AL FATIH Section Baru</h1>
        <HomeSectionForm defaultType="masjid-al-fatih" />
      </div>
    </div>
  )
}

