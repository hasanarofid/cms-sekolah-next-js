import { getSession } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { FigureForm } from '@/components/admin/FigureForm'

export const dynamic = 'force-dynamic'

export default async function NewFigurePage() {
  const session = await getSession()
  if (!session) {
    redirect('/login?callbackUrl=/admin/figures/new')
  }

  return (
    <div className="w-full">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Tambah Tokoh Baru</h1>
        <FigureForm />
      </div>
    </div>
  )
}

