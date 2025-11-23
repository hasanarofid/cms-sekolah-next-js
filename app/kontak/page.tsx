import { Navigation } from '@/components/Navigation'
import { Footer } from '@/components/Footer'
import { WhatsAppButton } from '@/components/WhatsAppButton'
import { prisma } from '@/lib/prisma'
import { ContactForm } from '@/components/ContactForm'
import type { Metadata } from 'next'

export async function generateMetadata({
  searchParams,
}: {
  searchParams: { locale?: string }
}): Promise<Metadata> {
  const locale = (searchParams.locale as 'id' | 'en') || 'id'
  
  const websiteTitle = await prisma.setting.findUnique({
    where: { key: 'website_title' }
  })
  const websiteFavicon = await prisma.setting.findUnique({
    where: { key: 'website_favicon' }
  })

  const siteName = websiteTitle?.value || 'Al Azhar IIBS'
  const pageTitle = locale === 'en' ? 'Contact' : 'Kontak'

  return {
    title: `${pageTitle} | ${siteName}`,
    description: locale === 'en' 
      ? `Contact ${siteName} - Get in touch with us`
      : `Hubungi ${siteName} - Hubungi kami`,
    icons: websiteFavicon?.value ? {
      icon: websiteFavicon.value,
      shortcut: websiteFavicon.value,
      apple: websiteFavicon.value,
    } : undefined,
  }
}

export default async function KontakPage({
  searchParams,
}: {
  searchParams: { locale?: string }
}) {
  const locale = (searchParams.locale as 'id' | 'en') || 'id'

  const menusData = await prisma.menu.findMany({
    where: { parentId: null, isActive: true },
    include: { 
      children: { 
        where: { isActive: true }, 
        orderBy: { order: 'asc' },
        include: {
          children: {
            where: { isActive: true },
            orderBy: { order: 'asc' }
          }
        }
      } 
    },
    orderBy: { order: 'asc' }
  })

  const menus = menusData.map(menu => ({
    ...menu,
    titleEn: menu.titleEn ?? undefined,
    children: menu.children.map(child => ({
      ...child,
      titleEn: child.titleEn ?? undefined,
      children: child.children?.map((grandchild: any) => ({
        ...grandchild,
        titleEn: grandchild.titleEn ?? undefined,
      })) || [],
    })),
  }))

  // Fetch website settings
  const websiteLogo = await prisma.setting.findUnique({
    where: { key: 'website_logo' }
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
    <div className="min-h-screen">
      <Navigation 
        menus={menus} 
        locale={locale}
        logo={websiteLogo?.value || null}
        websiteName={websiteTitle?.value || null}
        showWebsiteName={showWebsiteName?.value === 'true'}
      />

      <div className="bg-primary-600 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold">Kontak</h1>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-2xl font-bold mb-4">Alamat</h2>
            <p className="text-gray-600 mb-4">
              Jl. Raya Solo - Tawangmangu, Gedangan, Salam,<br />
              Kec. Karangpandan, Kabupaten Karanganyar,<br />
              Jawa Tengah 57791
            </p>
            <div className="space-y-2">
              <p className="text-gray-600">
                <strong>Call Center:</strong> 0811 2020 101
              </p>
              <p className="text-gray-600">
                <strong>Email:</strong> aaiibs@alazhariibs.sch.id
              </p>
            </div>
          </div>
          <div>
            <ContactForm />
          </div>
        </div>
      </div>

      <Footer 
        locale={locale}
        address={footerAddress?.value || null}
        phone={footerPhone?.value || null}
        email={footerEmail?.value || null}
        androidAppUrl={androidAppUrl?.value || null}
        iosAppUrl={iosAppUrl?.value || null}
        facebookUrl={facebookUrl?.value || null}
        instagramUrl={instagramUrl?.value || null}
        youtubeUrl={youtubeUrl?.value || null}
      />

      <WhatsAppButton 
        phoneNumber={whatsappPhone?.value || null}
        defaultMessage={whatsappMessage?.value || null}
      />
    </div>
  )
}

