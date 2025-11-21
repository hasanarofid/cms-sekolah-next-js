import { getSession } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { HomeSectionForm } from '@/components/admin/HomeSectionForm'

export const dynamic = 'force-dynamic'

export default async function NewHomeSectionPage() {
  const session = await getSession()
  if (!session) {
    redirect('/login?callbackUrl=/admin/home-sections/new')
  }

  return (
    <div className="w-full">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Tambah Home Section Baru</h1>
        <HomeSectionForm />
      </div>
    </div>
  )
}

