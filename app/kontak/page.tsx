import { Navigation } from '@/components/Navigation'
import { Footer } from '@/components/Footer'
import { prisma } from '@/lib/prisma'
import { ContactForm } from '@/components/ContactForm'

export default async function KontakPage({
  searchParams,
}: {
  searchParams: { locale?: string }
}) {
  const locale = (searchParams.locale as 'id' | 'en') || 'id'

  const menusData = await prisma.menu.findMany({
    where: { parentId: null, isActive: true },
    include: { children: { where: { isActive: true }, orderBy: { order: 'asc' } } },
    orderBy: { order: 'asc' }
  })

  const menus = menusData.map(menu => ({
    ...menu,
    titleEn: menu.titleEn ?? undefined,
    children: menu.children.map(child => ({
      ...child,
      titleEn: child.titleEn ?? undefined,
    })),
  }))

  return (
    <div className="min-h-screen">
      <Navigation menus={menus} locale={locale} />

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

      <Footer locale={locale} />
    </div>
  )
}

