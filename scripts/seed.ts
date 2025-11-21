import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Seeding database...')

  // Create admin user
  const hashedPassword = await bcrypt.hash('admin123', 10)
  const admin = await prisma.user.upsert({
    where: { email: 'admin@example.com' },
    update: {},
    create: {
      email: 'admin@example.com',
      password: hashedPassword,
      name: 'Admin',
      role: 'admin',
    },
  })
  console.log('✅ Created admin user:', admin.email)

  // Create menus
  const berandaMenu = await prisma.menu.upsert({
    where: { slug: 'beranda' },
    update: {},
    create: {
      title: 'BERANDA',
      titleEn: 'HOME',
      slug: 'beranda',
      order: 1,
      isActive: true,
    },
  })

  const tentangKamiMenu = await prisma.menu.upsert({
    where: { slug: 'tentang-kami' },
    update: {},
    create: {
      title: 'Tentang Kami',
      titleEn: 'About Us',
      slug: 'tentang-kami',
      order: 2,
      isActive: true,
    },
  })

  const akademikMenu = await prisma.menu.upsert({
    where: { slug: 'akademik' },
    update: {},
    create: {
      title: 'AKADEMIK',
      titleEn: 'ACADEMIC',
      slug: 'akademik',
      order: 3,
      isActive: true,
    },
  })

  const programMenu = await prisma.menu.upsert({
    where: { slug: 'program' },
    update: {},
    create: {
      title: 'PROGRAM',
      titleEn: 'PROGRAMS',
      slug: 'program',
      order: 4,
      isActive: true,
    },
  })

  const fasilitasMenu = await prisma.menu.upsert({
    where: { slug: 'fasilitas' },
    update: {},
    create: {
      title: 'FASILITAS',
      titleEn: 'FACILITIES',
      slug: 'fasilitas',
      order: 5,
      isActive: true,
    },
  })

  const beritaMenu = await prisma.menu.upsert({
    where: { slug: 'berita' },
    update: {},
    create: {
      title: 'BERITA',
      titleEn: 'NEWS',
      slug: 'berita',
      order: 6,
      isActive: true,
    },
  })

  const pendaftaranMenu = await prisma.menu.upsert({
    where: { slug: 'pendaftaran' },
    update: {},
    create: {
      title: 'PENDAFTARAN',
      titleEn: 'REGISTRATION',
      slug: 'pendaftaran',
      order: 7,
      isActive: true,
    },
  })

  const kontakMenu = await prisma.menu.upsert({
    where: { slug: 'kontak' },
    update: {},
    create: {
      title: 'KONTAK',
      titleEn: 'CONTACT',
      slug: 'kontak',
      order: 8,
      isActive: true,
    },
  })

  console.log('✅ Created menus')

  // Create sample page
  const samplePage = await prisma.page.upsert({
    where: { slug: 'tentang-kami' },
    update: {},
    create: {
      title: 'Tentang Kami',
      titleEn: 'About Us',
      slug: 'tentang-kami',
      content: '<h2>Selamat Datang di Al Azhar IIBS</h2><p>Al Azhar International Islamic Boarding School adalah lembaga pendidikan yang berkomitmen untuk memberikan pendidikan berkualitas tinggi dengan mengintegrasikan nilai-nilai Islam dalam setiap aspek pembelajaran.</p>',
      contentEn: '<h2>Welcome to Al Azhar IIBS</h2><p>Al Azhar International Islamic Boarding School is an educational institution committed to providing high-quality education by integrating Islamic values into every aspect of learning.</p>',
      excerpt: 'Tentang Al Azhar International Islamic Boarding School',
      excerptEn: 'About Al Azhar International Islamic Boarding School',
      isPublished: true,
      publishedAt: new Date(),
      authorId: admin.id,
    },
  })
  console.log('✅ Created sample page')

  // Create sample post
  const samplePost = await prisma.post.upsert({
    where: { slug: 'contoh-berita' },
    update: {},
    create: {
      title: 'Contoh Berita Terbaru',
      titleEn: 'Latest News Example',
      slug: 'contoh-berita',
      content: '<h2>Ini adalah contoh berita</h2><p>Konten berita akan ditampilkan di sini.</p>',
      contentEn: '<h2>This is a news example</h2><p>News content will be displayed here.</p>',
      excerpt: 'Ini adalah contoh berita terbaru dari Al Azhar IIBS',
      excerptEn: 'This is a latest news example from Al Azhar IIBS',
      category: 'Berita',
      tags: JSON.stringify(['berita', 'contoh']),
      isPublished: true,
      publishedAt: new Date(),
      authorId: admin.id,
    },
  })
  console.log('✅ Created sample post')

  console.log('🎉 Seeding completed!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })

