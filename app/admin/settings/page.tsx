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

  // Fetch website settings
  const websiteLogo = await prisma.setting.findUnique({
    where: { key: 'website_logo' }
  })
  const websiteFavicon = await prisma.setting.findUnique({
    where: { key: 'website_favicon' }
  })
  const websiteTitle = await prisma.setting.findUnique({
    where: { key: 'website_title' }
  })
  const showWebsiteName = await prisma.setting.findUnique({
    where: { key: 'show_website_name' }
  })

  // Fetch WhatsApp settings
  const whatsappPhone = await prisma.setting.findUnique({
    where: { key: 'whatsapp_phone' }
  })
  const whatsappMessage = await prisma.setting.findUnique({
    where: { key: 'whatsapp_message' }
  })

  // Fetch Footer settings
  const footerAddress = await prisma.setting.findUnique({
    where: { key: 'footer_address' }
  })
  const footerPhone = await prisma.setting.findUnique({
    where: { key: 'footer_phone' }
  })
  const footerEmail = await prisma.setting.findUnique({
    where: { key: 'footer_email' }
  })
  const androidAppUrl = await prisma.setting.findUnique({
    where: { key: 'android_app_url' }
  })
  const iosAppUrl = await prisma.setting.findUnique({
    where: { key: 'ios_app_url' }
  })
  const facebookUrl = await prisma.setting.findUnique({
    where: { key: 'facebook_url' }
  })
  const instagramUrl = await prisma.setting.findUnique({
    where: { key: 'instagram_url' }
  })
  const youtubeUrl = await prisma.setting.findUnique({
    where: { key: 'youtube_url' }
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
          websiteLogo={websiteLogo}
          websiteFavicon={websiteFavicon}
          websiteTitle={websiteTitle}
          showWebsiteName={showWebsiteName}
          whatsappPhone={whatsappPhone}
          whatsappMessage={whatsappMessage}
          footerAddress={footerAddress}
          footerPhone={footerPhone}
          footerEmail={footerEmail}
          androidAppUrl={androidAppUrl}
          iosAppUrl={iosAppUrl}
          facebookUrl={facebookUrl}
          instagramUrl={instagramUrl}
          youtubeUrl={youtubeUrl}
        />
      </div>
    </div>
  )
}

