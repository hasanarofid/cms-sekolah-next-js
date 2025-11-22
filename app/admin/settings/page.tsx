import { getSession } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { redirect } from 'next/navigation'
import { SettingsForm } from '@/components/admin/SettingsForm'

export const dynamic = 'force-dynamic'

export default async function SettingsPage() {
  const session = await getSession()
  if (!session) {
    redirect('/login?callbackUrl=/admin/settings')
  }

  // Fetch news section settings
  const newsQuote = await prisma.setting.findUnique({
    where: { key: 'news_section_quote' }
  })
  const newsTitle = await prisma.setting.findUnique({
    where: { key: 'news_section_title' }
  })

  // Fetch figures section settings
  const figuresTitle = await prisma.setting.findUnique({
    where: { key: 'figures_section_title' }
  })
  const figuresTitleEn = await prisma.setting.findUnique({
    where: { key: 'figures_section_title_en' }
  })
  const figuresBackground = await prisma.setting.findUnique({
    where: { key: 'figures_section_background' }
  })

  return (
    <div className="w-full">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Pengaturan</h1>
        <SettingsForm 
          newsQuote={newsQuote}
          newsTitle={newsTitle}
          figuresTitle={figuresTitle}
          figuresTitleEn={figuresTitleEn}
          figuresBackground={figuresBackground}
        />
      </div>
    </div>
  )
}

