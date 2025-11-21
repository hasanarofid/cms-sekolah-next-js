import { getSession } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { redirect, notFound } from 'next/navigation'
import { FAQForm } from '@/components/admin/FAQForm'

export const dynamic = 'force-dynamic'

export default async function EditFAQPage({
  params,
}: {
  params: { id: string }
}) {
  const session = await getSession()
  if (!session) {
    redirect('/login?callbackUrl=/admin/faqs')
  }

  const faq = await prisma.fAQ.findUnique({
    where: { id: params.id },
  })

  if (!faq) {
    notFound()
  }

  return (
    <div className="w-full">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Edit FAQ</h1>
        <FAQForm faq={faq} />
      </div>
    </div>
  )
}

