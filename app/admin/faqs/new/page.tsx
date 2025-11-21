import { getSession } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { FAQForm } from '@/components/admin/FAQForm'

export const dynamic = 'force-dynamic'

export default async function NewFAQPage() {
  const session = await getSession()
  if (!session) {
    redirect('/login?callbackUrl=/admin/faqs/new')
  }

  return (
    <div className="w-full">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Tambah FAQ Baru</h1>
        <FAQForm />
      </div>
    </div>
  )
}

