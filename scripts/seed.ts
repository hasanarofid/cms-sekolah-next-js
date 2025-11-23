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

  // Create main menu BERANDA
  const berandaMenu = await prisma.menu.upsert({
    where: { slug: 'beranda' },
    update: {},
    create: {
      title: 'BERANDA',
      titleEn: 'HOME',
      slug: 'beranda',
      order: 1,
      isActive: true,
      menuType: 'page',
    },
  })

  // Create submenu for BERANDA
  const submenuBeranda = [
    {
      slug: 'tentang-kami',
      title: 'Tentang Kami',
      titleEn: 'About Us',
      order: 1,
      content: `
        <div class="max-w-5xl mx-auto">
          <div class="mb-12">
            <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-6 text-center">
              Tahukah Anda Yayasan Pendidikan Al Azhar sudah hadir di Indonesia lebih dari 60 tahun?
            </h2>
            <p class="text-lg md:text-xl text-gray-700 text-center leading-relaxed mb-8">
              Sekolah islam terbaik yang banyak melahirkan lulusan yang telah berhasil menjadi pribadi sukses, dan menjadi bagian penting kemajuan bangsa Indonesia.
            </p>
            <p class="text-base md:text-lg text-gray-600 text-center leading-relaxed">
              Tahukah anda? bahwa selama 60 tahun lebih berdiri, Yayasan belum memiliki International Boarding School di Indonesia, maka dengan izin Allah ber tepatan di tengah masa pandemi yang memprihatinkan, untuk per tama kalinya dalam sejarah Yayasan Al Azhar, di Awal tahun 2021 kami meresmikan Al Azhar International Islamic Boarding School, sebuah pondok modern dengan standard internasional setingkat SMP dan SMA lahir ke Indonesia untuk memberikan solusi orang tua dalam mencari pendidikan terbaik untuk anak tercinta.
            </p>
          </div>
          
          <div class="mb-12">
            <h3 class="text-2xl md:text-3xl font-bold text-gray-800 mb-6 text-center">
              Al Azhar IIBS: Intip Apa Saja Keunggulan Al Azhar IIBS Yuk!
            </h3>
            <div class="aspect-video bg-gray-900 rounded-lg overflow-hidden shadow-xl">
              <iframe 
                class="w-full h-full" 
                src="https://www.youtube.com/embed/dQw4w9WgXcQ" 
                title="Al Azhar IIBS Video" 
                frameborder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                allowfullscreen>
              </iframe>
            </div>
          </div>

          <div class="space-y-6">
            <div class="text-center mb-12">
              <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Demi Melahirkan Generasi Emas Muslim di Masa yang Akan Datang,
              </h2>
              <h2 class="text-3xl md:text-4xl font-bold text-gray-900">
                Kami Yakin, Kita Perlu Melakukan Sesuatu yang Berbeda dari pada Umumnya
              </h2>
            </div>

            <div class="bg-gradient-to-r from-primary-50 to-primary-100 rounded-lg p-8 md:p-12 mb-12">
              <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-6 text-center">
                # Spirit AL FATIH
              </h2>
              <div class="space-y-4 text-base md:text-lg text-gray-700 leading-relaxed">
                <p>
                  5 Abad yang lalu, hal yang tidak mungkin dimata manusia saat itu, diselesaikan dengan Iman, Taqwa, Kekuatan, Kecerdasan dan Teknologi oleh seorang Pemuda. Pemuda 21 tahun menaklukan Ibu Kota dunia saat itu. Bukan hanya perluasan wilayah yang didapat, namun legitimasi kekuasaan di mata dunia semakin kuat saat konstantinopel (Istambul saat ini) menjadi bagian Kekhalifahan Ustmaniyah.
                </p>
                <p>
                  Keyakinan yang luar biasa dari seorang Sultan muda untuk mewujudkan Hadist Rasulullah bahwa Konstatinopel dan Roma akan dibuka. Dengan semangat dan keyakinan yang sama maka Masjid yang berada di Kompleks Al Azhar International Islamic Boarding School ini dinamakan Masjid Al Fatih.
                </p>
                <p>
                  Untuk menciptakan Generasi yang berbeda, maka perlu persiapan dan suasana baru yang spesial. Desain yang Futuristik menjadi wakil zaman ini dan "Spirit of Ghazi" yang sama diagungkan Muhammad Al Fatih 5 Abad yang lalu menjadi pembeda. Mari kita jadikan Masjid Al Fatih menjadi awal Pemuda Muslim era 5.0 ini memulai mimpi menaklukan sisi sisi lain Dunia dengan Iman, Taqwa, Kekuatan, Kecerdasan dan Teknologi.
                </p>
              </div>
            </div>
          </div>
        </div>
      `,
      contentEn: `
        <div class="max-w-5xl mx-auto">
          <div class="mb-12">
            <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-6 text-center">
              Did you know that Al Azhar Education Foundation has been present in Indonesia for more than 60 years?
            </h2>
            <p class="text-lg md:text-xl text-gray-700 text-center leading-relaxed mb-8">
              The best Islamic school that has produced many successful graduates and become an important part of Indonesia's progress.
            </p>
            <p class="text-base md:text-lg text-gray-600 text-center leading-relaxed">
              Did you know? During more than 60 years of establishment, the Foundation has not had an International Boarding School in Indonesia. With Allah's permission, coinciding in the middle of a concerning pandemic, for the first time in the history of Al Azhar Foundation, in early 2021 we inaugurated Al Azhar International Islamic Boarding School, a modern boarding school with international standards at the junior and senior high school level, born in Indonesia to provide solutions for parents in finding the best education for their beloved children.
            </p>
          </div>
          
          <div class="mb-12">
            <h3 class="text-2xl md:text-3xl font-bold text-gray-800 mb-6 text-center">
              Al Azhar IIBS: Let's Peek at the Advantages of Al Azhar IIBS!
            </h3>
            <div class="aspect-video bg-gray-900 rounded-lg overflow-hidden shadow-xl">
              <iframe 
                class="w-full h-full" 
                src="https://www.youtube.com/embed/dQw4w9WgXcQ" 
                title="Al Azhar IIBS Video" 
                frameborder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                allowfullscreen>
              </iframe>
            </div>
          </div>

          <div class="space-y-6">
            <div class="text-center mb-12">
              <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                To Give Birth to Golden Muslim Generations in the Future,
              </h2>
              <h2 class="text-3xl md:text-4xl font-bold text-gray-900">
                We Believe, We Need to Do Something Different from the Usual
              </h2>
            </div>

            <div class="bg-gradient-to-r from-primary-50 to-primary-100 rounded-lg p-8 md:p-12 mb-12">
              <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-6 text-center">
                # Spirit AL FATIH
              </h2>
              <div class="space-y-4 text-base md:text-lg text-gray-700 leading-relaxed">
                <p>
                  5 Centuries ago, something that seemed impossible in human eyes at that time, was accomplished with Faith, Piety, Strength, Intelligence and Technology by a Young Man. A 21-year-old young man conquered the world's capital at that time. Not only territorial expansion was gained, but the legitimacy of power in the eyes of the world became stronger when Constantinople (now Istanbul) became part of the Ottoman Caliphate.
                </p>
                <p>
                  Extraordinary confidence from a young Sultan to realize the Hadith of the Prophet that Constantinople and Rome will be opened. With the same spirit and confidence, the Mosque located in the Al Azhar International Islamic Boarding School complex is named Al Fatih Mosque.
                </p>
                <p>
                  To create a different Generation, special preparation and a new atmosphere are needed. A Futuristic design represents this era and the same "Spirit of Ghazi" that was exalted by Muhammad Al Fatih 5 centuries ago becomes the difference. Let us make Al Fatih Mosque the beginning for Muslim youth in the 5.0 era to start dreaming of conquering other sides of the World with Faith, Piety, Strength, Intelligence and Technology.
                </p>
              </div>
            </div>
          </div>
        </div>
      `,
    },
    {
      slug: 'visi-dan-misi',
      title: 'Visi dan Misi',
      titleEn: 'Vision and Mission',
      order: 2,
      content: `
        <div class="max-w-4xl mx-auto px-4 py-12">
          <div class="mb-12">
            <h1 class="text-4xl md:text-5xl font-bold text-gray-900 mb-8">Visi dan Misi</h1>
          </div>

          <div class="mb-12">
            <h2 class="text-3xl font-bold text-primary-600 mb-6">Visi</h2>
            <p class="text-lg text-gray-700 leading-relaxed">
              Menjadi lembaga pendidikan Islam terdepan yang menghasilkan generasi unggul, berakhlak mulia, 
              dan siap menghadapi tantangan global dengan mengintegrasikan nilai-nilai Al-Qur'an dalam setiap aspek kehidupan.
            </p>
          </div>

          <div class="mb-12">
            <h2 class="text-3xl font-bold text-primary-600 mb-6">Misi</h2>
            <ul class="space-y-4 text-lg text-gray-700">
              <li class="flex items-start">
                <span class="text-primary-600 mr-3">•</span>
                <span>Menyelenggarakan pendidikan yang mengintegrasikan ilmu pengetahuan modern dengan nilai-nilai Islam</span>
              </li>
              <li class="flex items-start">
                <span class="text-primary-600 mr-3">•</span>
                <span>Mengembangkan karakter dan akhlak mulia berdasarkan Al-Qur'an dan As-Sunnah</span>
              </li>
              <li class="flex items-start">
                <span class="text-primary-600 mr-3">•</span>
                <span>Menyiapkan peserta didik untuk menjadi pemimpin masa depan yang kompeten dan berintegritas</span>
              </li>
              <li class="flex items-start">
                <span class="text-primary-600 mr-3">•</span>
                <span>Membangun lingkungan belajar yang kondusif dan mendukung pengembangan potensi peserta didik</span>
              </li>
            </ul>
          </div>
        </div>
      `,
      contentEn: `
        <div class="max-w-4xl mx-auto px-4 py-12">
          <div class="mb-12">
            <h1 class="text-4xl md:text-5xl font-bold text-gray-900 mb-8">Vision and Mission</h1>
          </div>

          <div class="mb-12">
            <h2 class="text-3xl font-bold text-primary-600 mb-6">Vision</h2>
            <p class="text-lg text-gray-700 leading-relaxed">
              To become a leading Islamic educational institution that produces excellent, noble-charactered generations, 
              ready to face global challenges by integrating Al-Qur'an values into every aspect of life.
            </p>
          </div>

          <div class="mb-12">
            <h2 class="text-3xl font-bold text-primary-600 mb-6">Mission</h2>
            <ul class="space-y-4 text-lg text-gray-700">
              <li class="flex items-start">
                <span class="text-primary-600 mr-3">•</span>
                <span>Organize education that integrates modern knowledge with Islamic values</span>
              </li>
              <li class="flex items-start">
                <span class="text-primary-600 mr-3">•</span>
                <span>Develop character and noble morals based on Al-Qur'an and As-Sunnah</span>
              </li>
              <li class="flex items-start">
                <span class="text-primary-600 mr-3">•</span>
                <span>Prepare students to become competent and integrity future leaders</span>
              </li>
              <li class="flex items-start">
                <span class="text-primary-600 mr-3">•</span>
                <span>Build a conducive learning environment that supports student potential development</span>
              </li>
            </ul>
          </div>
        </div>
      `,
    },
    {
      slug: 'motto',
      title: 'Motto',
      titleEn: 'Motto',
      order: 3,
      content: `
        <div class="max-w-4xl mx-auto px-4 py-12">
          <div class="mb-12 text-center">
            <h1 class="text-4xl md:text-5xl font-bold text-gray-900 mb-8">Motto</h1>
          </div>

          <div class="bg-gradient-to-r from-primary-600 to-primary-800 rounded-lg p-12 text-center text-white mb-12">
            <h2 class="text-3xl md:text-4xl font-bold mb-4 italic">
              "Qur'anic Learning, Courtesy Oriented, and World Class Education"
            </h2>
            <p class="text-xl opacity-90">
              Pembelajaran Al-Qur'an, Berorientasi Kesopanan, dan Pendidikan Kelas Dunia
            </p>
          </div>

          <div class="prose prose-lg max-w-none">
            <p class="text-lg text-gray-700 leading-relaxed mb-4">
              Motto ini mencerminkan komitmen Al Azhar IIBS dalam memberikan pendidikan yang holistik, 
              mengintegrasikan pembelajaran Al-Qur'an, pengembangan karakter yang berorientasi pada kesopanan dan adab, 
              serta standar pendidikan kelas dunia.
            </p>
          </div>
        </div>
      `,
      contentEn: `
        <div class="max-w-4xl mx-auto px-4 py-12">
          <div class="mb-12 text-center">
            <h1 class="text-4xl md:text-5xl font-bold text-gray-900 mb-8">Motto</h1>
          </div>

          <div class="bg-gradient-to-r from-primary-600 to-primary-800 rounded-lg p-12 text-center text-white mb-12">
            <h2 class="text-3xl md:text-4xl font-bold mb-4 italic">
              "Qur'anic Learning, Courtesy Oriented, and World Class Education"
            </h2>
            <p class="text-xl opacity-90">
              Al-Qur'an Learning, Courtesy Oriented, and World Class Education
            </p>
          </div>

          <div class="prose prose-lg max-w-none">
            <p class="text-lg text-gray-700 leading-relaxed mb-4">
              This motto reflects Al Azhar IIBS's commitment to providing holistic education, 
              integrating Al-Qur'an learning, character development oriented towards courtesy and manners, 
              and world-class education standards.
            </p>
          </div>
        </div>
      `,
    },
    {
      slug: 'dewan-yayasan',
      title: 'Dewan Yayasan',
      titleEn: 'Board of Trustees',
      order: 4,
      content: `
        <div class="max-w-4xl mx-auto px-4 py-12">
          <div class="mb-12">
            <h1 class="text-4xl md:text-5xl font-bold text-gray-900 mb-8">Dewan Yayasan</h1>
          </div>

          <div class="prose prose-lg max-w-none">
            <p class="text-lg text-gray-700 leading-relaxed mb-6">
              Dewan Yayasan Al Azhar IIBS terdiri dari para tokoh yang memiliki dedikasi tinggi dalam dunia pendidikan 
              dan komitmen untuk mengembangkan lembaga pendidikan yang berkualitas.
            </p>
            <p class="text-lg text-gray-700 leading-relaxed">
              Informasi detail mengenai anggota Dewan Yayasan akan segera diupdate.
            </p>
          </div>
        </div>
      `,
      contentEn: `
        <div class="max-w-4xl mx-auto px-4 py-12">
          <div class="mb-12">
            <h1 class="text-4xl md:text-5xl font-bold text-gray-900 mb-8">Board of Trustees</h1>
          </div>

          <div class="prose prose-lg max-w-none">
            <p class="text-lg text-gray-700 leading-relaxed mb-6">
              The Al Azhar IIBS Board of Trustees consists of figures who have high dedication in the world of education 
              and commitment to developing quality educational institutions.
            </p>
            <p class="text-lg text-gray-700 leading-relaxed">
              Detailed information about Board of Trustees members will be updated soon.
            </p>
          </div>
        </div>
      `,
    },
    {
      slug: 'dewan-pengarah',
      title: 'Dewan Pengarah',
      titleEn: 'Steering Committee',
      order: 5,
      content: `
        <div class="max-w-4xl mx-auto px-4 py-12">
          <div class="mb-12">
            <h1 class="text-4xl md:text-5xl font-bold text-gray-900 mb-8">Dewan Pengarah</h1>
          </div>

          <div class="prose prose-lg max-w-none">
            <p class="text-lg text-gray-700 leading-relaxed mb-6">
              Dewan Pengarah Al Azhar IIBS bertugas memberikan arahan strategis dan pengawasan terhadap 
              pelaksanaan program pendidikan di lembaga ini.
            </p>
            <p class="text-lg text-gray-700 leading-relaxed">
              Informasi detail mengenai anggota Dewan Pengarah akan segera diupdate.
            </p>
          </div>
        </div>
      `,
      contentEn: `
        <div class="max-w-4xl mx-auto px-4 py-12">
          <div class="mb-12">
            <h1 class="text-4xl md:text-5xl font-bold text-gray-900 mb-8">Steering Committee</h1>
          </div>

          <div class="prose prose-lg max-w-none">
            <p class="text-lg text-gray-700 leading-relaxed mb-6">
              The Al Azhar IIBS Steering Committee is responsible for providing strategic direction and oversight 
              of the implementation of educational programs at this institution.
            </p>
            <p class="text-lg text-gray-700 leading-relaxed">
              Detailed information about Steering Committee members will be updated soon.
            </p>
          </div>
        </div>
      `,
    },
    {
      slug: 'jajaran-direksi',
      title: 'Jajaran Direksi',
      titleEn: 'Board of Directors',
      order: 6,
      content: `
        <div class="max-w-4xl mx-auto px-4 py-12">
          <div class="mb-12">
            <h1 class="text-4xl md:text-5xl font-bold text-gray-900 mb-8">Jajaran Direksi</h1>
          </div>

          <div class="prose prose-lg max-w-none">
            <p class="text-lg text-gray-700 leading-relaxed mb-6">
              Jajaran Direksi Al Azhar IIBS terdiri dari para profesional yang berpengalaman dalam mengelola 
              lembaga pendidikan dan memiliki visi untuk mengembangkan sekolah menjadi lembaga pendidikan terdepan.
            </p>
            <p class="text-lg text-gray-700 leading-relaxed">
              Informasi detail mengenai Jajaran Direksi akan segera diupdate.
            </p>
          </div>
        </div>
      `,
      contentEn: `
        <div class="max-w-4xl mx-auto px-4 py-12">
          <div class="mb-12">
            <h1 class="text-4xl md:text-5xl font-bold text-gray-900 mb-8">Board of Directors</h1>
          </div>

          <div class="prose prose-lg max-w-none">
            <p class="text-lg text-gray-700 leading-relaxed mb-6">
              The Al Azhar IIBS Board of Directors consists of experienced professionals in managing 
              educational institutions and has a vision to develop the school into a leading educational institution.
            </p>
            <p class="text-lg text-gray-700 leading-relaxed">
              Detailed information about the Board of Directors will be updated soon.
            </p>
          </div>
        </div>
      `,
    },
    {
      slug: 'guru-karyawan',
      title: 'Guru & Karyawan',
      titleEn: 'Teachers & Employees',
      order: 7,
      content: `
        <div class="max-w-4xl mx-auto px-4 py-12">
          <div class="mb-12">
            <h1 class="text-4xl md:text-5xl font-bold text-gray-900 mb-8">Guru & Karyawan</h1>
          </div>

          <div class="prose prose-lg max-w-none">
            <p class="text-lg text-gray-700 leading-relaxed mb-6">
              Al Azhar IIBS memiliki tim pendidik dan tenaga kependidikan yang profesional, berdedikasi, 
              dan memiliki komitmen tinggi dalam memberikan pendidikan terbaik bagi peserta didik.
            </p>
            <p class="text-lg text-gray-700 leading-relaxed">
              Informasi detail mengenai Guru & Karyawan akan segera diupdate.
            </p>
          </div>
        </div>
      `,
      contentEn: `
        <div class="max-w-4xl mx-auto px-4 py-12">
          <div class="mb-12">
            <h1 class="text-4xl md:text-5xl font-bold text-gray-900 mb-8">Teachers & Employees</h1>
          </div>

          <div class="prose prose-lg max-w-none">
            <p class="text-lg text-gray-700 leading-relaxed mb-6">
              Al Azhar IIBS has a team of professional, dedicated educators and educational staff 
              with high commitment to providing the best education for students.
            </p>
            <p class="text-lg text-gray-700 leading-relaxed">
              Detailed information about Teachers & Employees will be updated soon.
            </p>
          </div>
        </div>
      `,
    },
    {
      slug: 'rencana-pengembangan',
      title: 'Rencana Pengembangan',
      titleEn: 'Development Plan',
      order: 8,
      content: `
        <div class="max-w-4xl mx-auto px-4 py-12">
          <div class="mb-12">
            <h1 class="text-4xl md:text-5xl font-bold text-gray-900 mb-8">Rencana Pengembangan</h1>
          </div>

          <div class="prose prose-lg max-w-none">
            <p class="text-lg text-gray-700 leading-relaxed mb-6">
              Al Azhar IIBS memiliki rencana pengembangan jangka panjang untuk terus meningkatkan kualitas pendidikan, 
              fasilitas, dan layanan kepada peserta didik dan masyarakat.
            </p>
            <p class="text-lg text-gray-700 leading-relaxed">
              Informasi detail mengenai Rencana Pengembangan akan segera diupdate.
            </p>
          </div>
        </div>
      `,
      contentEn: `
        <div class="max-w-4xl mx-auto px-4 py-12">
          <div class="mb-12">
            <h1 class="text-4xl md:text-5xl font-bold text-gray-900 mb-8">Development Plan</h1>
          </div>

          <div class="prose prose-lg max-w-none">
            <p class="text-lg text-gray-700 leading-relaxed mb-6">
              Al Azhar IIBS has a long-term development plan to continuously improve the quality of education, 
              facilities, and services to students and the community.
            </p>
            <p class="text-lg text-gray-700 leading-relaxed">
              Detailed information about the Development Plan will be updated soon.
            </p>
          </div>
        </div>
      `,
    },
    {
      slug: 'kerjasama',
      title: 'Kerjasama',
      titleEn: 'Partnership',
      order: 9,
      content: `
        <div class="max-w-4xl mx-auto px-4 py-12">
          <div class="mb-12">
            <h1 class="text-4xl md:text-5xl font-bold text-gray-900 mb-8">Kerjasama</h1>
          </div>

          <div class="prose prose-lg max-w-none">
            <p class="text-lg text-gray-700 leading-relaxed mb-6">
              Al Azhar IIBS menjalin kerjasama dengan berbagai institusi pendidikan, organisasi, dan lembaga 
              baik di dalam maupun luar negeri untuk meningkatkan kualitas pendidikan dan memberikan pengalaman 
              belajar yang lebih luas bagi peserta didik.
            </p>
            <p class="text-lg text-gray-700 leading-relaxed">
              Informasi detail mengenai Kerjasama akan segera diupdate.
            </p>
          </div>
        </div>
      `,
      contentEn: `
        <div class="max-w-4xl mx-auto px-4 py-12">
          <div class="mb-12">
            <h1 class="text-4xl md:text-5xl font-bold text-gray-900 mb-8">Partnership</h1>
          </div>

          <div class="prose prose-lg max-w-none">
            <p class="text-lg text-gray-700 leading-relaxed mb-6">
              Al Azhar IIBS establishes partnerships with various educational institutions, organizations, and institutions 
              both domestically and internationally to improve the quality of education and provide a broader learning 
              experience for students.
            </p>
            <p class="text-lg text-gray-700 leading-relaxed">
              Detailed information about Partnerships will be updated soon.
            </p>
          </div>
        </div>
      `,
    },
    {
      slug: 'testimoni-tokoh',
      title: 'Testimoni Tokoh',
      titleEn: 'Testimonials from Figures',
      order: 10,
      content: `
        <div class="max-w-4xl mx-auto px-4 py-12">
          <div class="mb-12">
            <h1 class="text-4xl md:text-5xl font-bold text-gray-900 mb-8">Testimoni Tokoh</h1>
          </div>

          <div class="prose prose-lg max-w-none">
            <p class="text-lg text-gray-700 leading-relaxed mb-6">
              Berbagai tokoh dari berbagai bidang telah memberikan testimoni dan apresiasi terhadap 
              program dan kualitas pendidikan di Al Azhar IIBS.
            </p>
            <p class="text-lg text-gray-700 leading-relaxed">
              Informasi detail mengenai Testimoni Tokoh akan segera diupdate.
            </p>
          </div>
        </div>
      `,
      contentEn: `
        <div class="max-w-4xl mx-auto px-4 py-12">
          <div class="mb-12">
            <h1 class="text-4xl md:text-5xl font-bold text-gray-900 mb-8">Testimonials from Figures</h1>
          </div>

          <div class="prose prose-lg max-w-none">
            <p class="text-lg text-gray-700 leading-relaxed mb-6">
              Various figures from various fields have given testimonials and appreciation for 
              the programs and quality of education at Al Azhar IIBS.
            </p>
            <p class="text-lg text-gray-700 leading-relaxed">
              Detailed information about Testimonials from Figures will be updated soon.
            </p>
          </div>
        </div>
      `,
    },
  ]

  // Create submenu and pages
  for (const submenu of submenuBeranda) {
    const menuItem = await prisma.menu.upsert({
      where: { slug: submenu.slug },
      update: {
        parentId: berandaMenu.id,
        order: submenu.order,
      },
      create: {
        title: submenu.title,
        titleEn: submenu.titleEn,
        slug: submenu.slug,
        parentId: berandaMenu.id,
        order: submenu.order,
        isActive: true,
        menuType: 'page',
      },
    })

    // Create page for each submenu
    await prisma.page.upsert({
      where: { slug: submenu.slug },
      update: {
        content: submenu.content,
        contentEn: submenu.contentEn,
        menuId: menuItem.id,
        template: submenu.slug === 'tentang-kami' ? 'with-header' : null,
      },
      create: {
        title: submenu.title,
        titleEn: submenu.titleEn,
        slug: submenu.slug,
        content: submenu.content,
        contentEn: submenu.contentEn,
        excerpt: `Halaman ${submenu.title}`,
        excerptEn: `${submenu.titleEn} Page`,
        isPublished: true,
        publishedAt: new Date(),
        authorId: admin.id,
        menuId: menuItem.id,
        template: submenu.slug === 'tentang-kami' ? 'with-header' : null,
      },
    })
  }

  const tentangKamiMenu = await prisma.menu.findUnique({
    where: { slug: 'tentang-kami' },
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
      menuType: 'page',
    },
  })

  // Create SMP and SMA submenu
  const smpMenu = await prisma.menu.upsert({
    where: { slug: 'smp' },
    update: {
      parentId: akademikMenu.id,
      order: 1,
    },
    create: {
      title: 'SMP',
      titleEn: 'JUNIOR HIGH',
      slug: 'smp',
      parentId: akademikMenu.id,
      order: 1,
      isActive: true,
      menuType: 'page',
    },
  })

  const smaMenu = await prisma.menu.upsert({
    where: { slug: 'sma' },
    update: {
      parentId: akademikMenu.id,
      order: 2,
    },
    create: {
      title: 'SMA',
      titleEn: 'SENIOR HIGH',
      slug: 'sma',
      parentId: akademikMenu.id,
      order: 2,
      isActive: true,
      menuType: 'page',
    },
  })

  // Create submenu for SMP
  const submenuSMP = [
    {
      slug: 'smpia-51-iibs',
      title: 'SMPIA 51 IIBS',
      titleEn: 'SMPIA 51 IIBS',
      order: 1,
    },
    {
      slug: 'struktur-organisasi-sekolah-smp',
      title: 'Struktur Organisasi Sekolah',
      titleEn: 'School Organization Structure',
      order: 2,
    },
    {
      slug: 'struktur-organisasi-boarding-smp',
      title: 'Struktur Organisasi Boarding',
      titleEn: 'Boarding Organization Structure',
      order: 3,
    },
    {
      slug: 'prestasi-siswa-smp',
      title: 'Prestasi Siswa',
      titleEn: 'Student Achievements',
      order: 4,
    },
    {
      slug: 'profil-lulusan-smp',
      title: 'Profil Lulusan',
      titleEn: 'Graduate Profile',
      order: 5,
    },
    {
      slug: 'kurikulum-smp',
      title: 'Kurikulum',
      titleEn: 'Curriculum',
      order: 6,
    },
    {
      slug: 'ekstrakurikuler-smp',
      title: 'Ekstrakurikuler',
      titleEn: 'Extracurricular',
      order: 7,
    },
    {
      slug: 'kalender-pendidikan-smp',
      title: 'Kalender Pendidikan',
      titleEn: 'Academic Calendar',
      order: 8,
    },
    {
      slug: 'lms-aaiibs-smp',
      title: 'LMS AAIIBS',
      titleEn: 'LMS AAIIBS',
      order: 9,
    },
  ]

  // Create submenu for SMA
  const submenuSMA = [
    {
      slug: 'smaia-28-iibs',
      title: 'SMAIA 28 IIBS',
      titleEn: 'SMAIA 28 IIBS',
      order: 1,
    },
    {
      slug: 'struktur-organisasi-sekolah-sma',
      title: 'Struktur Organisasi Sekolah',
      titleEn: 'School Organization Structure',
      order: 2,
    },
    {
      slug: 'struktur-organisasi-boarding-sma',
      title: 'Struktur Organisasi Boarding',
      titleEn: 'Boarding Organization Structure',
      order: 3,
    },
    {
      slug: 'prestasi-siswa-sma',
      title: 'Prestasi Siswa',
      titleEn: 'Student Achievements',
      order: 4,
    },
    {
      slug: 'profil-lulusan-sma',
      title: 'Profil Lulusan',
      titleEn: 'Graduate Profile',
      order: 5,
    },
    {
      slug: 'alumni-sma',
      title: 'Alumni',
      titleEn: 'Alumni',
      order: 6,
    },
    {
      slug: 'kurikulum-sma',
      title: 'Kurikulum',
      titleEn: 'Curriculum',
      order: 7,
    },
    {
      slug: 'ekstrakurikuler-sma',
      title: 'Ekstrakurikuler',
      titleEn: 'Extracurricular',
      order: 8,
    },
    {
      slug: 'kalender-pendidikan-sma',
      title: 'Kalender Pendidikan',
      titleEn: 'Academic Calendar',
      order: 9,
    },
    {
      slug: 'lms-aaiibs-sma',
      title: 'LMS AAIIBS',
      titleEn: 'LMS AAIIBS',
      order: 10,
    },
    {
      slug: 'laporan-realisasi-bos',
      title: 'Laporan Realisasi BOS',
      titleEn: 'BOS Realization Report',
      order: 11,
    },
  ]

  // Create main SMP page with template 'academic-smp'
  const smpMainPage = await prisma.page.upsert({
    where: { slug: 'smp' },
    update: {
      title: 'SMP ISLAM AL AZHAR 51 KARANGANYAR',
      titleEn: 'JUNIOR HIGH SCHOOL AL AZHAR 51 KARANGANYAR',
      content: `
        <div class="max-w-7xl mx-auto">
          <div class="text-center mb-12">
            <h1 class="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              SMP ISLAM AL AZHAR 51 KARANGANYAR
            </h1>
            <p class="text-xl md:text-2xl text-gray-600 italic">
              "Quranic Learning, Courtesy Oriented, World-Class Education"
            </p>
          </div>

          <div class="bg-gradient-to-r from-primary-50 to-primary-100 rounded-lg p-8 md:p-12 mb-12 text-center">
            <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Akreditasi A</h2>
            <p class="text-lg text-gray-700">
              SMPI Al Azhar 51 IIBS berhasil meraih "Akreditasi A" dari Badan Akreditasi Nasional Pendidikan anak Usia Dini, Pendidikan Dasar, dan Pendidikan Menengah (BAN-PDM) No. : 267/BAN-PDM/SK/2024
            </p>
          </div>

          <div class="mb-12">
            <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-6">SMP Islam Al Azhar 51 IIBS Karanganyar</h2>
            <p class="text-lg text-gray-700 leading-relaxed mb-6">
              Sekolah yang berkomitmen membentuk generasi unggul dengan pendidikan agama yang kuat dan karakter Islami. Dengan visi mencetak lulusan hafidz Quran, brilian, dan berdaya saing global.
            </p>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <div class="bg-white rounded-lg shadow-md p-6">
              <h3 class="text-2xl font-bold text-gray-900 mb-4">International Program</h3>
              <p class="text-gray-700">
                Al Azhar IIBS berkomitmen untuk membentuk pemimpin masa depan yang berakhlak islami, berprestasi akademik, dan berpikiran global.
              </p>
            </div>
            <div class="bg-white rounded-lg shadow-md p-6">
              <h3 class="text-2xl font-bold text-gray-900 mb-4">Student Showcase Report</h3>
              <p class="text-gray-700">
                Laporan perkembangan dan prestasi siswa secara berkala untuk memantau kemajuan belajar.
              </p>
            </div>
          </div>

          <div class="mb-12">
            <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Gedung & Fasilitas</h2>
            <p class="text-lg text-gray-700 mb-6">
              Jelajahi Fasilitas Bertaraf International di SMP Islam Al Azhar 51 International Islamic Boarding School Karanganyar
            </p>
            <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div class="bg-white rounded-lg shadow-md p-4 text-center">
                <h4 class="font-bold text-gray-900 mb-2">Ruang Kelas</h4>
              </div>
              <div class="bg-white rounded-lg shadow-md p-4 text-center">
                <h4 class="font-bold text-gray-900 mb-2">Komunal</h4>
              </div>
              <div class="bg-white rounded-lg shadow-md p-4 text-center">
                <h4 class="font-bold text-gray-900 mb-2">Kamar Asrama</h4>
              </div>
              <div class="bg-white rounded-lg shadow-md p-4 text-center">
                <h4 class="font-bold text-gray-900 mb-2">Perpustakaan</h4>
              </div>
              <div class="bg-white rounded-lg shadow-md p-4 text-center">
                <h4 class="font-bold text-gray-900 mb-2">UKS</h4>
              </div>
              <div class="bg-white rounded-lg shadow-md p-4 text-center">
                <h4 class="font-bold text-gray-900 mb-2">Ruang Makan</h4>
              </div>
            </div>
          </div>

          <div class="mb-12">
            <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Ekstrakurikuler</h2>
            <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div class="bg-white rounded-lg shadow-md p-4 text-center">
                <h4 class="font-bold text-gray-900 mb-2">Basket</h4>
              </div>
              <div class="bg-white rounded-lg shadow-md p-4 text-center">
                <h4 class="font-bold text-gray-900 mb-2">Cinematography</h4>
              </div>
              <div class="bg-white rounded-lg shadow-md p-4 text-center">
                <h4 class="font-bold text-gray-900 mb-2">Coding</h4>
              </div>
              <div class="bg-white rounded-lg shadow-md p-4 text-center">
                <h4 class="font-bold text-gray-900 mb-2">Panahan</h4>
              </div>
              <div class="bg-white rounded-lg shadow-md p-4 text-center">
                <h4 class="font-bold text-gray-900 mb-2">Craft</h4>
              </div>
              <div class="bg-white rounded-lg shadow-md p-4 text-center">
                <h4 class="font-bold text-gray-900 mb-2">Berkuda</h4>
              </div>
              <div class="bg-white rounded-lg shadow-md p-4 text-center">
                <h4 class="font-bold text-gray-900 mb-2">Pramuka</h4>
              </div>
              <div class="bg-white rounded-lg shadow-md p-4 text-center">
                <h4 class="font-bold text-gray-900 mb-2">Mini Soccer</h4>
              </div>
            </div>
          </div>
        </div>
      `,
      contentEn: `
        <div class="max-w-7xl mx-auto">
          <div class="text-center mb-12">
            <h1 class="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              JUNIOR HIGH SCHOOL AL AZHAR 51 KARANGANYAR
            </h1>
            <p class="text-xl md:text-2xl text-gray-600 italic">
              "Quranic Learning, Courtesy Oriented, World-Class Education"
            </p>
          </div>

          <div class="bg-gradient-to-r from-primary-50 to-primary-100 rounded-lg p-8 md:p-12 mb-12 text-center">
            <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Accreditation A</h2>
            <p class="text-lg text-gray-700">
              SMPI Al Azhar 51 IIBS has successfully achieved "Accreditation A" from the National Accreditation Board for Early Childhood Education, Basic Education, and Secondary Education (BAN-PDM) No. : 267/BAN-PDM/SK/2024
            </p>
          </div>

          <div class="mb-12">
            <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-6">SMP Islam Al Azhar 51 IIBS Karanganyar</h2>
            <p class="text-lg text-gray-700 leading-relaxed mb-6">
              A school committed to forming an excellent generation with strong religious education and Islamic character. With a vision to produce Quran hafidz graduates who are brilliant and globally competitive.
            </p>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <div class="bg-white rounded-lg shadow-md p-6">
              <h3 class="text-2xl font-bold text-gray-900 mb-4">International Program</h3>
              <p class="text-gray-700">
                Al Azhar IIBS is committed to forming future leaders with Islamic character, academic excellence, and global thinking.
              </p>
            </div>
            <div class="bg-white rounded-lg shadow-md p-6">
              <h3 class="text-2xl font-bold text-gray-900 mb-4">Student Showcase Report</h3>
              <p class="text-gray-700">
                Regular reports on student development and achievements to monitor learning progress.
              </p>
            </div>
          </div>

          <div class="mb-12">
            <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Building & Facilities</h2>
            <p class="text-lg text-gray-700 mb-6">
              Explore International Standard Facilities at SMP Islam Al Azhar 51 International Islamic Boarding School Karanganyar
            </p>
            <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div class="bg-white rounded-lg shadow-md p-4 text-center">
                <h4 class="font-bold text-gray-900 mb-2">Classrooms</h4>
              </div>
              <div class="bg-white rounded-lg shadow-md p-4 text-center">
                <h4 class="font-bold text-gray-900 mb-2">Communal</h4>
              </div>
              <div class="bg-white rounded-lg shadow-md p-4 text-center">
                <h4 class="font-bold text-gray-900 mb-2">Dormitory Rooms</h4>
              </div>
              <div class="bg-white rounded-lg shadow-md p-4 text-center">
                <h4 class="font-bold text-gray-900 mb-2">Library</h4>
              </div>
              <div class="bg-white rounded-lg shadow-md p-4 text-center">
                <h4 class="font-bold text-gray-900 mb-2">Health Clinic</h4>
              </div>
              <div class="bg-white rounded-lg shadow-md p-4 text-center">
                <h4 class="font-bold text-gray-900 mb-2">Dining Room</h4>
              </div>
            </div>
          </div>

          <div class="mb-12">
            <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Extracurricular</h2>
            <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div class="bg-white rounded-lg shadow-md p-4 text-center">
                <h4 class="font-bold text-gray-900 mb-2">Basketball</h4>
              </div>
              <div class="bg-white rounded-lg shadow-md p-4 text-center">
                <h4 class="font-bold text-gray-900 mb-2">Cinematography</h4>
              </div>
              <div class="bg-white rounded-lg shadow-md p-4 text-center">
                <h4 class="font-bold text-gray-900 mb-2">Coding</h4>
              </div>
              <div class="bg-white rounded-lg shadow-md p-4 text-center">
                <h4 class="font-bold text-gray-900 mb-2">Archery</h4>
              </div>
              <div class="bg-white rounded-lg shadow-md p-4 text-center">
                <h4 class="font-bold text-gray-900 mb-2">Craft</h4>
              </div>
              <div class="bg-white rounded-lg shadow-md p-4 text-center">
                <h4 class="font-bold text-gray-900 mb-2">Horseback Riding</h4>
              </div>
              <div class="bg-white rounded-lg shadow-md p-4 text-center">
                <h4 class="font-bold text-gray-900 mb-2">Scouting</h4>
              </div>
              <div class="bg-white rounded-lg shadow-md p-4 text-center">
                <h4 class="font-bold text-gray-900 mb-2">Mini Soccer</h4>
              </div>
            </div>
          </div>
        </div>
      `,
      pageType: 'academic',
      template: 'academic-smp',
      menuId: smpMenu.id,
      isPublished: true,
      publishedAt: new Date(),
      authorId: admin.id,
    },
    create: {
      title: 'SMP ISLAM AL AZHAR 51 KARANGANYAR',
      titleEn: 'JUNIOR HIGH SCHOOL AL AZHAR 51 KARANGANYAR',
      slug: 'smp',
      content: `
        <div class="max-w-7xl mx-auto">
          <div class="text-center mb-12">
            <h1 class="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              SMP ISLAM AL AZHAR 51 KARANGANYAR
            </h1>
            <p class="text-xl md:text-2xl text-gray-600 italic">
              "Quranic Learning, Courtesy Oriented, World-Class Education"
            </p>
          </div>

          <div class="bg-gradient-to-r from-primary-50 to-primary-100 rounded-lg p-8 md:p-12 mb-12 text-center">
            <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Akreditasi A</h2>
            <p class="text-lg text-gray-700">
              SMPI Al Azhar 51 IIBS berhasil meraih "Akreditasi A" dari Badan Akreditasi Nasional Pendidikan anak Usia Dini, Pendidikan Dasar, dan Pendidikan Menengah (BAN-PDM) No. : 267/BAN-PDM/SK/2024
            </p>
          </div>

          <div class="mb-12">
            <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-6">SMP Islam Al Azhar 51 IIBS Karanganyar</h2>
            <p class="text-lg text-gray-700 leading-relaxed mb-6">
              Sekolah yang berkomitmen membentuk generasi unggul dengan pendidikan agama yang kuat dan karakter Islami. Dengan visi mencetak lulusan hafidz Quran, brilian, dan berdaya saing global.
            </p>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <div class="bg-white rounded-lg shadow-md p-6">
              <h3 class="text-2xl font-bold text-gray-900 mb-4">International Program</h3>
              <p class="text-gray-700">
                Al Azhar IIBS berkomitmen untuk membentuk pemimpin masa depan yang berakhlak islami, berprestasi akademik, dan berpikiran global.
              </p>
            </div>
            <div class="bg-white rounded-lg shadow-md p-6">
              <h3 class="text-2xl font-bold text-gray-900 mb-4">Student Showcase Report</h3>
              <p class="text-gray-700">
                Laporan perkembangan dan prestasi siswa secara berkala untuk memantau kemajuan belajar.
              </p>
            </div>
          </div>

          <div class="mb-12">
            <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Gedung & Fasilitas</h2>
            <p class="text-lg text-gray-700 mb-6">
              Jelajahi Fasilitas Bertaraf International di SMP Islam Al Azhar 51 International Islamic Boarding School Karanganyar
            </p>
            <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div class="bg-white rounded-lg shadow-md p-4 text-center">
                <h4 class="font-bold text-gray-900 mb-2">Ruang Kelas</h4>
              </div>
              <div class="bg-white rounded-lg shadow-md p-4 text-center">
                <h4 class="font-bold text-gray-900 mb-2">Komunal</h4>
              </div>
              <div class="bg-white rounded-lg shadow-md p-4 text-center">
                <h4 class="font-bold text-gray-900 mb-2">Kamar Asrama</h4>
              </div>
              <div class="bg-white rounded-lg shadow-md p-4 text-center">
                <h4 class="font-bold text-gray-900 mb-2">Perpustakaan</h4>
              </div>
              <div class="bg-white rounded-lg shadow-md p-4 text-center">
                <h4 class="font-bold text-gray-900 mb-2">UKS</h4>
              </div>
              <div class="bg-white rounded-lg shadow-md p-4 text-center">
                <h4 class="font-bold text-gray-900 mb-2">Ruang Makan</h4>
              </div>
            </div>
          </div>

          <div class="mb-12">
            <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Ekstrakurikuler</h2>
            <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div class="bg-white rounded-lg shadow-md p-4 text-center">
                <h4 class="font-bold text-gray-900 mb-2">Basket</h4>
              </div>
              <div class="bg-white rounded-lg shadow-md p-4 text-center">
                <h4 class="font-bold text-gray-900 mb-2">Cinematography</h4>
              </div>
              <div class="bg-white rounded-lg shadow-md p-4 text-center">
                <h4 class="font-bold text-gray-900 mb-2">Coding</h4>
              </div>
              <div class="bg-white rounded-lg shadow-md p-4 text-center">
                <h4 class="font-bold text-gray-900 mb-2">Panahan</h4>
              </div>
              <div class="bg-white rounded-lg shadow-md p-4 text-center">
                <h4 class="font-bold text-gray-900 mb-2">Craft</h4>
              </div>
              <div class="bg-white rounded-lg shadow-md p-4 text-center">
                <h4 class="font-bold text-gray-900 mb-2">Berkuda</h4>
              </div>
              <div class="bg-white rounded-lg shadow-md p-4 text-center">
                <h4 class="font-bold text-gray-900 mb-2">Pramuka</h4>
              </div>
              <div class="bg-white rounded-lg shadow-md p-4 text-center">
                <h4 class="font-bold text-gray-900 mb-2">Mini Soccer</h4>
              </div>
            </div>
          </div>
        </div>
      `,
      contentEn: `
        <div class="max-w-7xl mx-auto">
          <div class="text-center mb-12">
            <h1 class="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              JUNIOR HIGH SCHOOL AL AZHAR 51 KARANGANYAR
            </h1>
            <p class="text-xl md:text-2xl text-gray-600 italic">
              "Quranic Learning, Courtesy Oriented, World-Class Education"
            </p>
          </div>

          <div class="bg-gradient-to-r from-primary-50 to-primary-100 rounded-lg p-8 md:p-12 mb-12 text-center">
            <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Accreditation A</h2>
            <p class="text-lg text-gray-700">
              SMPI Al Azhar 51 IIBS has successfully achieved "Accreditation A" from the National Accreditation Board for Early Childhood Education, Basic Education, and Secondary Education (BAN-PDM) No. : 267/BAN-PDM/SK/2024
            </p>
          </div>

          <div class="mb-12">
            <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-6">SMP Islam Al Azhar 51 IIBS Karanganyar</h2>
            <p class="text-lg text-gray-700 leading-relaxed mb-6">
              A school committed to forming an excellent generation with strong religious education and Islamic character. With a vision to produce Quran hafidz graduates who are brilliant and globally competitive.
            </p>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <div class="bg-white rounded-lg shadow-md p-6">
              <h3 class="text-2xl font-bold text-gray-900 mb-4">International Program</h3>
              <p class="text-gray-700">
                Al Azhar IIBS is committed to forming future leaders with Islamic character, academic excellence, and global thinking.
              </p>
            </div>
            <div class="bg-white rounded-lg shadow-md p-6">
              <h3 class="text-2xl font-bold text-gray-900 mb-4">Student Showcase Report</h3>
              <p class="text-gray-700">
                Regular reports on student development and achievements to monitor learning progress.
              </p>
            </div>
          </div>

          <div class="mb-12">
            <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Building & Facilities</h2>
            <p class="text-lg text-gray-700 mb-6">
              Explore International Standard Facilities at SMP Islam Al Azhar 51 International Islamic Boarding School Karanganyar
            </p>
            <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div class="bg-white rounded-lg shadow-md p-4 text-center">
                <h4 class="font-bold text-gray-900 mb-2">Classrooms</h4>
              </div>
              <div class="bg-white rounded-lg shadow-md p-4 text-center">
                <h4 class="font-bold text-gray-900 mb-2">Communal</h4>
              </div>
              <div class="bg-white rounded-lg shadow-md p-4 text-center">
                <h4 class="font-bold text-gray-900 mb-2">Dormitory Rooms</h4>
              </div>
              <div class="bg-white rounded-lg shadow-md p-4 text-center">
                <h4 class="font-bold text-gray-900 mb-2">Library</h4>
              </div>
              <div class="bg-white rounded-lg shadow-md p-4 text-center">
                <h4 class="font-bold text-gray-900 mb-2">Health Clinic</h4>
              </div>
              <div class="bg-white rounded-lg shadow-md p-4 text-center">
                <h4 class="font-bold text-gray-900 mb-2">Dining Room</h4>
              </div>
            </div>
          </div>

          <div class="mb-12">
            <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Extracurricular</h2>
            <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div class="bg-white rounded-lg shadow-md p-4 text-center">
                <h4 class="font-bold text-gray-900 mb-2">Basketball</h4>
              </div>
              <div class="bg-white rounded-lg shadow-md p-4 text-center">
                <h4 class="font-bold text-gray-900 mb-2">Cinematography</h4>
              </div>
              <div class="bg-white rounded-lg shadow-md p-4 text-center">
                <h4 class="font-bold text-gray-900 mb-2">Coding</h4>
              </div>
              <div class="bg-white rounded-lg shadow-md p-4 text-center">
                <h4 class="font-bold text-gray-900 mb-2">Archery</h4>
              </div>
              <div class="bg-white rounded-lg shadow-md p-4 text-center">
                <h4 class="font-bold text-gray-900 mb-2">Craft</h4>
              </div>
              <div class="bg-white rounded-lg shadow-md p-4 text-center">
                <h4 class="font-bold text-gray-900 mb-2">Horseback Riding</h4>
              </div>
              <div class="bg-white rounded-lg shadow-md p-4 text-center">
                <h4 class="font-bold text-gray-900 mb-2">Scouting</h4>
              </div>
              <div class="bg-white rounded-lg shadow-md p-4 text-center">
                <h4 class="font-bold text-gray-900 mb-2">Mini Soccer</h4>
              </div>
            </div>
          </div>
        </div>
      `,
      pageType: 'academic',
      template: 'academic-smp',
      menuId: smpMenu.id,
      isPublished: true,
      publishedAt: new Date(),
      authorId: admin.id,
    },
  })

  // Helper function to get content for SMP submenu pages
  const getSMPSubmenuContent = (slug: string, title: string, titleEn: string) => {
    const contents: Record<string, { id: string; en: string }> = {
      'smpia-51-iibs': {
        id: `
          <div class="max-w-5xl mx-auto">
            <div class="mb-12">
              <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                SMPIA 51 IIBS
              </h2>
              <p class="text-lg md:text-xl text-gray-700 leading-relaxed mb-6">
                SMP Islam Al Azhar 51 International Islamic Boarding School (SMPIA 51 IIBS) adalah sekolah menengah pertama yang berkomitmen untuk membentuk generasi unggul dengan pendidikan agama yang kuat dan karakter Islami. Sekolah ini merupakan bagian dari Yayasan Pendidikan Al Azhar yang telah berpengalaman lebih dari 60 tahun dalam dunia pendidikan.
              </p>
            </div>

            <div class="bg-gradient-to-r from-primary-50 to-primary-100 rounded-lg p-8 md:p-12 mb-12">
              <h3 class="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
                Visi dan Misi SMPIA 51 IIBS
              </h3>
              <div class="space-y-4 text-base md:text-lg text-gray-700 leading-relaxed">
                <p>
                  <strong>Visi:</strong> Mencetak lulusan hafidz Quran, brilian, dan berdaya saing global dengan karakter Islami yang kuat.
                </p>
                <p>
                  <strong>Misi:</strong> Menyelenggarakan pendidikan yang mengintegrasikan ilmu pengetahuan, teknologi, dan nilai-nilai Islam untuk membentuk generasi yang unggul dalam akademik, kuat dalam agama, dan berkarakter mulia.
                </p>
              </div>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div class="bg-white rounded-lg shadow-md p-6">
                <h4 class="text-xl font-bold text-gray-900 mb-4">Program Unggulan</h4>
                <ul class="list-disc list-inside space-y-2 text-gray-700">
                  <li>Super QC (Scientist, Ulama, Professional, Entrepreneur)</li>
                  <li>Program Tahfizh Al-Qur'an 30 Juz</li>
                  <li>Program Adab dan Karakter Islami</li>
                  <li>Program Internasional</li>
                  <li>Language Center (Bahasa Arab & Inggris)</li>
                </ul>
              </div>
              <div class="bg-white rounded-lg shadow-md p-6">
                <h4 class="text-xl font-bold text-gray-900 mb-4">Fasilitas</h4>
                <ul class="list-disc list-inside space-y-2 text-gray-700">
                  <li>Ruang Kelas Modern</li>
                  <li>Asrama yang Nyaman</li>
                  <li>Masjid Al Fatih</li>
                  <li>Laboratorium Sains</li>
                  <li>Perpustakaan</li>
                  <li>Lapangan Olahraga</li>
                </ul>
              </div>
            </div>
          </div>
        `,
        en: `
          <div class="max-w-5xl mx-auto">
            <div class="mb-12">
              <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                SMPIA 51 IIBS
              </h2>
              <p class="text-lg md:text-xl text-gray-700 leading-relaxed mb-6">
                SMP Islam Al Azhar 51 International Islamic Boarding School (SMPIA 51 IIBS) is a junior high school committed to forming an excellent generation with strong religious education and Islamic character. This school is part of Al Azhar Education Foundation which has more than 60 years of experience in education.
              </p>
            </div>

            <div class="bg-gradient-to-r from-primary-50 to-primary-100 rounded-lg p-8 md:p-12 mb-12">
              <h3 class="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
                Vision and Mission of SMPIA 51 IIBS
              </h3>
              <div class="space-y-4 text-base md:text-lg text-gray-700 leading-relaxed">
                <p>
                  <strong>Vision:</strong> To produce Quran hafidz graduates who are brilliant and globally competitive with strong Islamic character.
                </p>
                <p>
                  <strong>Mission:</strong> To organize education that integrates science, technology, and Islamic values to form a generation that excels academically, strong in religion, and has noble character.
                </p>
              </div>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div class="bg-white rounded-lg shadow-md p-6">
                <h4 class="text-xl font-bold text-gray-900 mb-4">Flagship Programs</h4>
                <ul class="list-disc list-inside space-y-2 text-gray-700">
                  <li>Super QC (Scientist, Ulama, Professional, Entrepreneur)</li>
                  <li>Al-Qur'an Tahfizh Program 30 Juz</li>
                  <li>Adab and Islamic Character Program</li>
                  <li>International Program</li>
                  <li>Language Center (Arabic & English)</li>
                </ul>
              </div>
              <div class="bg-white rounded-lg shadow-md p-6">
                <h4 class="text-xl font-bold text-gray-900 mb-4">Facilities</h4>
                <ul class="list-disc list-inside space-y-2 text-gray-700">
                  <li>Modern Classrooms</li>
                  <li>Comfortable Dormitory</li>
                  <li>Al Fatih Mosque</li>
                  <li>Science Laboratory</li>
                  <li>Library</li>
                  <li>Sports Field</li>
                </ul>
              </div>
            </div>
          </div>
        `,
      },
      'struktur-organisasi-boarding-smp': {
        id: `
          <div class="max-w-5xl mx-auto">
            <div class="mb-12">
              <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Struktur Organisasi Boarding SMPIA 51 IIBS
              </h2>
              <p class="text-lg md:text-xl text-gray-700 leading-relaxed mb-6">
                Struktur organisasi boarding yang mengatur kehidupan asrama dan kegiatan kepondokan untuk mendukung pembentukan karakter dan akhlak Islami siswa.
              </p>
            </div>

            <div class="bg-gradient-to-r from-primary-50 to-primary-100 rounded-lg p-8 md:p-12 mb-12">
              <h3 class="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
                Struktur Organisasi Boarding
              </h3>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div class="bg-white rounded-lg shadow-md p-6">
                  <h4 class="text-xl font-bold text-gray-900 mb-4">Kepala Asrama</h4>
                  <p class="text-gray-700">Bertanggung jawab atas pengelolaan asrama dan koordinasi kegiatan kepondokan.</p>
                </div>
                <div class="bg-white rounded-lg shadow-md p-6">
                  <h4 class="text-xl font-bold text-gray-900 mb-4">Musrif/Musrifah</h4>
                  <p class="text-gray-700">Pendamping siswa di asrama yang bertugas membimbing dan mengawasi kegiatan siswa.</p>
                </div>
                <div class="bg-white rounded-lg shadow-md p-6">
                  <h4 class="text-xl font-bold text-gray-900 mb-4">Koordinator Kegiatan</h4>
                  <p class="text-gray-700">Mengkoordinasikan berbagai kegiatan kepondokan dan ekstrakurikuler.</p>
                </div>
                <div class="bg-white rounded-lg shadow-md p-6">
                  <h4 class="text-xl font-bold text-gray-900 mb-4">Staff Administrasi Asrama</h4>
                  <p class="text-gray-700">Mengelola administrasi dan kebutuhan operasional asrama.</p>
                </div>
              </div>
            </div>
          </div>
        `,
        en: `
          <div class="max-w-5xl mx-auto">
            <div class="mb-12">
              <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Boarding Organization Structure of SMPIA 51 IIBS
              </h2>
              <p class="text-lg md:text-xl text-gray-700 leading-relaxed mb-6">
                Boarding organizational structure that regulates dormitory life and boarding activities to support the formation of student character and Islamic morals.
              </p>
            </div>

            <div class="bg-gradient-to-r from-primary-50 to-primary-100 rounded-lg p-8 md:p-12 mb-12">
              <h3 class="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
                Boarding Organization Structure
              </h3>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div class="bg-white rounded-lg shadow-md p-6">
                  <h4 class="text-xl font-bold text-gray-900 mb-4">Dormitory Head</h4>
                  <p class="text-gray-700">Responsible for dormitory management and coordination of boarding activities.</p>
                </div>
                <div class="bg-white rounded-lg shadow-md p-6">
                  <h4 class="text-xl font-bold text-gray-900 mb-4">Musrif/Musrifah</h4>
                  <p class="text-gray-700">Student companions in the dormitory who guide and supervise student activities.</p>
                </div>
                <div class="bg-white rounded-lg shadow-md p-6">
                  <h4 class="text-xl font-bold text-gray-900 mb-4">Activity Coordinator</h4>
                  <p class="text-gray-700">Coordinates various boarding and extracurricular activities.</p>
                </div>
                <div class="bg-white rounded-lg shadow-md p-6">
                  <h4 class="text-xl font-bold text-gray-900 mb-4">Dormitory Administration Staff</h4>
                  <p class="text-gray-700">Manages dormitory administration and operational needs.</p>
                </div>
              </div>
            </div>
          </div>
        `,
      },
      'prestasi-siswa-smp': {
        id: `
          <div class="max-w-5xl mx-auto">
            <div class="mb-12">
              <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Prestasi Siswa SMPIA 51 IIBS
              </h2>
              <p class="text-lg md:text-xl text-gray-700 leading-relaxed mb-6">
                Prestasi-prestasi yang telah diraih oleh siswa SMP Islam Al Azhar 51 IIBS dalam berbagai bidang, baik akademik maupun non-akademik.
              </p>
            </div>

            <div class="bg-gradient-to-r from-primary-50 to-primary-100 rounded-lg p-8 md:p-12 mb-12">
              <h3 class="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
                Prestasi Akademik
              </h3>
              <div class="space-y-4 text-base md:text-lg text-gray-700 leading-relaxed">
                <p>
                  Siswa SMPIA 51 IIBS telah meraih berbagai prestasi akademik di tingkat regional, nasional, dan internasional dalam berbagai bidang seperti sains, matematika, bahasa, dan teknologi.
                </p>
              </div>
            </div>

            <div class="bg-gradient-to-r from-primary-50 to-primary-100 rounded-lg p-8 md:p-12 mb-12">
              <h3 class="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
                Prestasi Non-Akademik
              </h3>
              <div class="space-y-4 text-base md:text-lg text-gray-700 leading-relaxed">
                <p>
                  Selain prestasi akademik, siswa juga aktif meraih prestasi di bidang olahraga, seni, dan kegiatan ekstrakurikuler lainnya.
                </p>
              </div>
            </div>
          </div>
        `,
        en: `
          <div class="max-w-5xl mx-auto">
            <div class="mb-12">
              <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Student Achievements of SMPIA 51 IIBS
              </h2>
              <p class="text-lg md:text-xl text-gray-700 leading-relaxed mb-6">
                Achievements achieved by students of SMP Islam Al Azhar 51 IIBS in various fields, both academic and non-academic.
              </p>
            </div>

            <div class="bg-gradient-to-r from-primary-50 to-primary-100 rounded-lg p-8 md:p-12 mb-12">
              <h3 class="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
                Academic Achievements
              </h3>
              <div class="space-y-4 text-base md:text-lg text-gray-700 leading-relaxed">
                <p>
                  SMPIA 51 IIBS students have achieved various academic achievements at regional, national, and international levels in various fields such as science, mathematics, language, and technology.
                </p>
              </div>
            </div>

            <div class="bg-gradient-to-r from-primary-50 to-primary-100 rounded-lg p-8 md:p-12 mb-12">
              <h3 class="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
                Non-Academic Achievements
              </h3>
              <div class="space-y-4 text-base md:text-lg text-gray-700 leading-relaxed">
                <p>
                  In addition to academic achievements, students are also active in achieving achievements in sports, arts, and other extracurricular activities.
                </p>
              </div>
            </div>
          </div>
        `,
      },
      'struktur-organisasi-sekolah-smp': {
        id: `
          <div class="max-w-7xl mx-auto">
            <div class="mb-12">
              <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Struktur Organisasi Sekolah SMPIA 51 IIBS
              </h2>
              <p class="text-lg md:text-xl text-gray-700 leading-relaxed mb-6">
                Struktur organisasi sekolah yang jelas dan terorganisir untuk mendukung proses pembelajaran yang efektif dan efisien.
              </p>
            </div>

            <div class="bg-gradient-to-r from-primary-50 to-primary-100 rounded-lg p-8 md:p-12 mb-12">
              <div class="text-center mb-8">
                <div class="inline-block bg-white rounded-full p-4 shadow-lg mb-4">
                  <div class="w-24 h-24 bg-primary-200 rounded-full flex items-center justify-center">
                    <span class="text-3xl font-bold text-primary-700">K</span>
                  </div>
                </div>
                <h3 class="text-2xl font-bold text-gray-900 mb-2">Kepala Sekolah SMPIA 51</h3>
                <p class="text-lg text-gray-700">Annisaa' Hayyu Fitriani, S.Si, M.Pd.</p>
              </div>

              <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div class="bg-white rounded-lg shadow-md p-6 text-center">
                  <div class="w-20 h-20 bg-primary-200 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span class="text-xl font-bold text-primary-700">AS</span>
                  </div>
                  <h4 class="text-lg font-bold text-gray-900 mb-2">Staff Administrasi</h4>
                  <p class="text-gray-700">Sandi Setiawan, S.Si.</p>
                </div>
                <div class="bg-white rounded-lg shadow-md p-6 text-center">
                  <div class="w-20 h-20 bg-primary-200 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span class="text-xl font-bold text-primary-700">AS</span>
                  </div>
                  <h4 class="text-lg font-bold text-gray-900 mb-2">Staff Administrasi</h4>
                  <p class="text-gray-700">Nesti Rahmawati Trisnanda, S.Pd., S.Ak.</p>
                </div>
              </div>

              <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                <div class="bg-white rounded-lg shadow-md p-4 text-center">
                  <div class="w-16 h-16 bg-primary-200 rounded-full flex items-center justify-center mx-auto mb-3">
                    <span class="text-lg font-bold text-primary-700">K</span>
                  </div>
                  <h4 class="text-sm font-bold text-gray-900 mb-2">Koordinator Kurikulum</h4>
                  <p class="text-xs text-gray-700">Alif Rohma</p>
                </div>
                <div class="bg-white rounded-lg shadow-md p-4 text-center">
                  <div class="w-16 h-16 bg-primary-200 rounded-full flex items-center justify-center mx-auto mb-3">
                    <span class="text-lg font-bold text-primary-700">K</span>
                  </div>
                  <h4 class="text-sm font-bold text-gray-900 mb-2">Koordinator Kesiswaan</h4>
                  <p class="text-xs text-gray-700">Lukhi Rudy</p>
                </div>
                <div class="bg-white rounded-lg shadow-md p-4 text-center">
                  <div class="w-16 h-16 bg-primary-200 rounded-full flex items-center justify-center mx-auto mb-3">
                    <span class="text-lg font-bold text-primary-700">K</span>
                  </div>
                  <h4 class="text-sm font-bold text-gray-900 mb-2">Koordinator Keislaman</h4>
                  <p class="text-xs text-gray-700">Muh Yoga Oktama</p>
                </div>
                <div class="bg-white rounded-lg shadow-md p-4 text-center">
                  <div class="w-16 h-16 bg-primary-200 rounded-full flex items-center justify-center mx-auto mb-3">
                    <span class="text-lg font-bold text-primary-700">K</span>
                  </div>
                  <h4 class="text-sm font-bold text-gray-900 mb-2">Koordinator Sarpras</h4>
                  <p class="text-xs text-gray-700">Awit Khumanggana</p>
                </div>
                <div class="bg-white rounded-lg shadow-md p-4 text-center">
                  <div class="w-16 h-16 bg-primary-200 rounded-full flex items-center justify-center mx-auto mb-3">
                    <span class="text-lg font-bold text-primary-700">K</span>
                  </div>
                  <h4 class="text-sm font-bold text-gray-900 mb-2">Koordinator Kedisiplinan</h4>
                  <p class="text-xs text-gray-700">Murawan, S.Pd</p>
                </div>
                <div class="bg-white rounded-lg shadow-md p-4 text-center">
                  <div class="w-16 h-16 bg-primary-200 rounded-full flex items-center justify-center mx-auto mb-3">
                    <span class="text-lg font-bold text-primary-700">K</span>
                  </div>
                  <h4 class="text-sm font-bold text-gray-900 mb-2">Koordinator Digital</h4>
                  <p class="text-xs text-gray-700">Pradana Priya</p>
                </div>
              </div>
            </div>
          </div>
        `,
        en: `
          <div class="max-w-7xl mx-auto">
            <div class="mb-12">
              <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                School Organization Structure of SMPIA 51 IIBS
              </h2>
              <p class="text-lg md:text-xl text-gray-700 leading-relaxed mb-6">
                A clear and organized school organizational structure to support effective and efficient learning processes.
              </p>
            </div>

            <div class="bg-gradient-to-r from-primary-50 to-primary-100 rounded-lg p-8 md:p-12 mb-12">
              <div class="text-center mb-8">
                <div class="inline-block bg-white rounded-full p-4 shadow-lg mb-4">
                  <div class="w-24 h-24 bg-primary-200 rounded-full flex items-center justify-center">
                    <span class="text-3xl font-bold text-primary-700">P</span>
                  </div>
                </div>
                <h3 class="text-2xl font-bold text-gray-900 mb-2">Principal of SMPIA 51</h3>
                <p class="text-lg text-gray-700">Annisaa' Hayyu Fitriani, S.Si, M.Pd.</p>
              </div>

              <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div class="bg-white rounded-lg shadow-md p-6 text-center">
                  <div class="w-20 h-20 bg-primary-200 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span class="text-xl font-bold text-primary-700">AS</span>
                  </div>
                  <h4 class="text-lg font-bold text-gray-900 mb-2">Administration Staff</h4>
                  <p class="text-gray-700">Sandi Setiawan, S.Si.</p>
                </div>
                <div class="bg-white rounded-lg shadow-md p-6 text-center">
                  <div class="w-20 h-20 bg-primary-200 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span class="text-xl font-bold text-primary-700">AS</span>
                  </div>
                  <h4 class="text-lg font-bold text-gray-900 mb-2">Administration Staff</h4>
                  <p class="text-gray-700">Nesti Rahmawati Trisnanda, S.Pd., S.Ak.</p>
                </div>
              </div>

              <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                <div class="bg-white rounded-lg shadow-md p-4 text-center">
                  <div class="w-16 h-16 bg-primary-200 rounded-full flex items-center justify-center mx-auto mb-3">
                    <span class="text-lg font-bold text-primary-700">C</span>
                  </div>
                  <h4 class="text-sm font-bold text-gray-900 mb-2">Curriculum Coordinator</h4>
                  <p class="text-xs text-gray-700">Alif Rohma</p>
                </div>
                <div class="bg-white rounded-lg shadow-md p-4 text-center">
                  <div class="w-16 h-16 bg-primary-200 rounded-full flex items-center justify-center mx-auto mb-3">
                    <span class="text-lg font-bold text-primary-700">C</span>
                  </div>
                  <h4 class="text-sm font-bold text-gray-900 mb-2">Student Affairs Coordinator</h4>
                  <p class="text-xs text-gray-700">Lukhi Rudy</p>
                </div>
                <div class="bg-white rounded-lg shadow-md p-4 text-center">
                  <div class="w-16 h-16 bg-primary-200 rounded-full flex items-center justify-center mx-auto mb-3">
                    <span class="text-lg font-bold text-primary-700">C</span>
                  </div>
                  <h4 class="text-sm font-bold text-gray-900 mb-2">Islamic Affairs Coordinator</h4>
                  <p class="text-xs text-gray-700">Muh Yoga Oktama</p>
                </div>
                <div class="bg-white rounded-lg shadow-md p-4 text-center">
                  <div class="w-16 h-16 bg-primary-200 rounded-full flex items-center justify-center mx-auto mb-3">
                    <span class="text-lg font-bold text-primary-700">C</span>
                  </div>
                  <h4 class="text-sm font-bold text-gray-900 mb-2">Facilities Coordinator</h4>
                  <p class="text-xs text-gray-700">Awit Khumanggana</p>
                </div>
                <div class="bg-white rounded-lg shadow-md p-4 text-center">
                  <div class="w-16 h-16 bg-primary-200 rounded-full flex items-center justify-center mx-auto mb-3">
                    <span class="text-lg font-bold text-primary-700">C</span>
                  </div>
                  <h4 class="text-sm font-bold text-gray-900 mb-2">Discipline Coordinator</h4>
                  <p class="text-xs text-gray-700">Murawan, S.Pd</p>
                </div>
                <div class="bg-white rounded-lg shadow-md p-4 text-center">
                  <div class="w-16 h-16 bg-primary-200 rounded-full flex items-center justify-center mx-auto mb-3">
                    <span class="text-lg font-bold text-primary-700">C</span>
                  </div>
                  <h4 class="text-sm font-bold text-gray-900 mb-2">Digital Programs Coordinator</h4>
                  <p class="text-xs text-gray-700">Pradana Priya</p>
                </div>
              </div>
            </div>
          </div>
        `,
      },
    }

    // Default content for other pages
    const defaultContent = {
      id: `
        <div class="max-w-5xl mx-auto">
          <div class="mb-12">
            <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              ${title}
            </h2>
            <p class="text-lg md:text-xl text-gray-700 leading-relaxed mb-6">
              Halaman ${title} untuk SMP Islam Al Azhar 51 IIBS. Informasi lengkap akan segera tersedia.
            </p>
          </div>

          <div class="bg-gradient-to-r from-primary-50 to-primary-100 rounded-lg p-8 md:p-12">
            <h3 class="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
              Informasi
            </h3>
            <p class="text-base md:text-lg text-gray-700 leading-relaxed">
              Konten untuk halaman ini sedang dalam proses pengembangan. Silakan kembali lagi nanti untuk informasi yang lebih lengkap.
            </p>
          </div>
        </div>
      `,
      en: `
        <div class="max-w-5xl mx-auto">
          <div class="mb-12">
            <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              ${titleEn}
            </h2>
            <p class="text-lg md:text-xl text-gray-700 leading-relaxed mb-6">
              ${titleEn} page for SMP Islam Al Azhar 51 IIBS. Complete information will be available soon.
            </p>
          </div>

          <div class="bg-gradient-to-r from-primary-50 to-primary-100 rounded-lg p-8 md:p-12">
            <h3 class="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
              Information
            </h3>
            <p class="text-base md:text-lg text-gray-700 leading-relaxed">
              Content for this page is currently under development. Please check back later for more complete information.
            </p>
          </div>
        </div>
      `,
    }

    return contents[slug] || defaultContent
  }

  // Helper function to get content for SMA submenu pages
  const getSMASubmenuContent = (slug: string, title: string, titleEn: string) => {
    const contents: Record<string, { id: string; en: string }> = {
      'smaia-28-iibs': {
        id: `
          <div class="max-w-5xl mx-auto">
            <div class="mb-12">
              <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                SMAIA 28 IIBS
              </h2>
              <p class="text-lg md:text-xl text-gray-700 leading-relaxed mb-6">
                SMA Islam Al Azhar 28 International Islamic Boarding School (SMAIA 28 IIBS) adalah sekolah menengah atas yang berkomitmen untuk membentuk generasi unggul dengan pendidikan agama yang kuat dan karakter Islami. Sekolah ini mempersiapkan siswa untuk melanjutkan pendidikan ke perguruan tinggi terkemuka di dalam dan luar negeri.
              </p>
            </div>

            <div class="bg-gradient-to-r from-primary-50 to-primary-100 rounded-lg p-8 md:p-12 mb-12">
              <h3 class="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
                Visi dan Misi SMAIA 28 IIBS
              </h3>
              <div class="space-y-4 text-base md:text-lg text-gray-700 leading-relaxed">
                <p>
                  <strong>Visi:</strong> Mencetak lulusan hafidz Quran, brilian, dan berdaya saing global dengan karakter Islami yang kuat, siap melanjutkan ke perguruan tinggi terkemuka.
                </p>
                <p>
                  <strong>Misi:</strong> Menyelenggarakan pendidikan menengah atas yang mengintegrasikan ilmu pengetahuan, teknologi, dan nilai-nilai Islam untuk membentuk generasi yang unggul dalam akademik, kuat dalam agama, dan berkarakter mulia.
                </p>
              </div>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div class="bg-white rounded-lg shadow-md p-6">
                <h4 class="text-xl font-bold text-gray-900 mb-4">Program Unggulan</h4>
                <ul class="list-disc list-inside space-y-2 text-gray-700">
                  <li>Super QC (Scientist, Ulama, Professional, Entrepreneur)</li>
                  <li>Program Tahfizh Al-Qur'an 30 Juz</li>
                  <li>Program Adab dan Karakter Islami</li>
                  <li>Program Internasional</li>
                  <li>Language Center (Bahasa Arab & Inggris)</li>
                  <li>Program Persiapan PTN</li>
                </ul>
              </div>
              <div class="bg-white rounded-lg shadow-md p-6">
                <h4 class="text-xl font-bold text-gray-900 mb-4">Fasilitas</h4>
                <ul class="list-disc list-inside space-y-2 text-gray-700">
                  <li>Ruang Kelas Modern</li>
                  <li>Asrama yang Nyaman</li>
                  <li>Masjid Al Fatih</li>
                  <li>Laboratorium Sains</li>
                  <li>Perpustakaan</li>
                  <li>Lapangan Olahraga</li>
                </ul>
              </div>
            </div>
          </div>
        `,
        en: `
          <div class="max-w-5xl mx-auto">
            <div class="mb-12">
              <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                SMAIA 28 IIBS
              </h2>
              <p class="text-lg md:text-xl text-gray-700 leading-relaxed mb-6">
                SMA Islam Al Azhar 28 International Islamic Boarding School (SMAIA 28 IIBS) is a senior high school committed to forming an excellent generation with strong religious education and Islamic character. This school prepares students to continue their education to leading universities both domestically and internationally.
              </p>
            </div>

            <div class="bg-gradient-to-r from-primary-50 to-primary-100 rounded-lg p-8 md:p-12 mb-12">
              <h3 class="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
                Vision and Mission of SMAIA 28 IIBS
              </h3>
              <div class="space-y-4 text-base md:text-lg text-gray-700 leading-relaxed">
                <p>
                  <strong>Vision:</strong> To produce Quran hafidz graduates who are brilliant and globally competitive with strong Islamic character, ready to continue to leading universities.
                </p>
                <p>
                  <strong>Mission:</strong> To organize senior high school education that integrates science, technology, and Islamic values to form a generation that excels academically, strong in religion, and has noble character.
                </p>
              </div>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div class="bg-white rounded-lg shadow-md p-6">
                <h4 class="text-xl font-bold text-gray-900 mb-4">Flagship Programs</h4>
                <ul class="list-disc list-inside space-y-2 text-gray-700">
                  <li>Super QC (Scientist, Ulama, Professional, Entrepreneur)</li>
                  <li>Al-Qur'an Tahfizh Program 30 Juz</li>
                  <li>Adab and Islamic Character Program</li>
                  <li>International Program</li>
                  <li>Language Center (Arabic & English)</li>
                  <li>State University Preparation Program</li>
                </ul>
              </div>
              <div class="bg-white rounded-lg shadow-md p-6">
                <h4 class="text-xl font-bold text-gray-900 mb-4">Facilities</h4>
                <ul class="list-disc list-inside space-y-2 text-gray-700">
                  <li>Modern Classrooms</li>
                  <li>Comfortable Dormitory</li>
                  <li>Al Fatih Mosque</li>
                  <li>Science Laboratory</li>
                  <li>Library</li>
                  <li>Sports Field</li>
                </ul>
              </div>
            </div>
          </div>
        `,
      },
      'struktur-organisasi-boarding-sma': {
        id: `
          <div class="max-w-5xl mx-auto">
            <div class="mb-12">
              <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Struktur Organisasi Boarding SMAIA 28 IIBS
              </h2>
              <p class="text-lg md:text-xl text-gray-700 leading-relaxed mb-6">
                Struktur organisasi boarding yang mengatur kehidupan asrama dan kegiatan kepondokan untuk mendukung pembentukan karakter dan akhlak Islami siswa di tingkat SMA.
              </p>
            </div>

            <div class="bg-gradient-to-r from-primary-50 to-primary-100 rounded-lg p-8 md:p-12 mb-12">
              <h3 class="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
                Struktur Organisasi Boarding
              </h3>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div class="bg-white rounded-lg shadow-md p-6">
                  <h4 class="text-xl font-bold text-gray-900 mb-4">Kepala Asrama</h4>
                  <p class="text-gray-700">Bertanggung jawab atas pengelolaan asrama dan koordinasi kegiatan kepondokan.</p>
                </div>
                <div class="bg-white rounded-lg shadow-md p-6">
                  <h4 class="text-xl font-bold text-gray-900 mb-4">Musrif/Musrifah</h4>
                  <p class="text-gray-700">Pendamping siswa di asrama yang bertugas membimbing dan mengawasi kegiatan siswa.</p>
                </div>
                <div class="bg-white rounded-lg shadow-md p-6">
                  <h4 class="text-xl font-bold text-gray-900 mb-4">Koordinator Kegiatan</h4>
                  <p class="text-gray-700">Mengkoordinasikan berbagai kegiatan kepondokan dan ekstrakurikuler.</p>
                </div>
                <div class="bg-white rounded-lg shadow-md p-6">
                  <h4 class="text-xl font-bold text-gray-900 mb-4">Staff Administrasi Asrama</h4>
                  <p class="text-gray-700">Mengelola administrasi dan kebutuhan operasional asrama.</p>
                </div>
              </div>
            </div>
          </div>
        `,
        en: `
          <div class="max-w-5xl mx-auto">
            <div class="mb-12">
              <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Boarding Organization Structure of SMAIA 28 IIBS
              </h2>
              <p class="text-lg md:text-xl text-gray-700 leading-relaxed mb-6">
                Boarding organizational structure that regulates dormitory life and boarding activities to support the formation of student character and Islamic morals at the senior high school level.
              </p>
            </div>

            <div class="bg-gradient-to-r from-primary-50 to-primary-100 rounded-lg p-8 md:p-12 mb-12">
              <h3 class="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
                Boarding Organization Structure
              </h3>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div class="bg-white rounded-lg shadow-md p-6">
                  <h4 class="text-xl font-bold text-gray-900 mb-4">Dormitory Head</h4>
                  <p class="text-gray-700">Responsible for dormitory management and coordination of boarding activities.</p>
                </div>
                <div class="bg-white rounded-lg shadow-md p-6">
                  <h4 class="text-xl font-bold text-gray-900 mb-4">Musrif/Musrifah</h4>
                  <p class="text-gray-700">Student companions in the dormitory who guide and supervise student activities.</p>
                </div>
                <div class="bg-white rounded-lg shadow-md p-6">
                  <h4 class="text-xl font-bold text-gray-900 mb-4">Activity Coordinator</h4>
                  <p class="text-gray-700">Coordinates various boarding and extracurricular activities.</p>
                </div>
                <div class="bg-white rounded-lg shadow-md p-6">
                  <h4 class="text-xl font-bold text-gray-900 mb-4">Dormitory Administration Staff</h4>
                  <p class="text-gray-700">Manages dormitory administration and operational needs.</p>
                </div>
              </div>
            </div>
          </div>
        `,
      },
      'prestasi-siswa-sma': {
        id: `
          <div class="max-w-5xl mx-auto">
            <div class="mb-12">
              <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Prestasi Siswa SMAIA 28 IIBS
              </h2>
              <p class="text-lg md:text-xl text-gray-700 leading-relaxed mb-6">
                Prestasi-prestasi yang telah diraih oleh siswa SMA Islam Al Azhar 28 IIBS dalam berbagai bidang, baik akademik maupun non-akademik.
              </p>
            </div>

            <div class="bg-gradient-to-r from-primary-50 to-primary-100 rounded-lg p-8 md:p-12 mb-12">
              <h3 class="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
                Prestasi Akademik
              </h3>
              <div class="space-y-4 text-base md:text-lg text-gray-700 leading-relaxed">
                <p>
                  Siswa SMAIA 28 IIBS telah meraih berbagai prestasi akademik di tingkat regional, nasional, dan internasional dalam berbagai bidang seperti sains, matematika, bahasa, dan teknologi.
                </p>
              </div>
            </div>

            <div class="bg-gradient-to-r from-primary-50 to-primary-100 rounded-lg p-8 md:p-12 mb-12">
              <h3 class="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
                Prestasi Non-Akademik
              </h3>
              <div class="space-y-4 text-base md:text-lg text-gray-700 leading-relaxed">
                <p>
                  Selain prestasi akademik, siswa juga aktif meraih prestasi di bidang olahraga, seni, dan kegiatan ekstrakurikuler lainnya.
                </p>
              </div>
            </div>
          </div>
        `,
        en: `
          <div class="max-w-5xl mx-auto">
            <div class="mb-12">
              <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Student Achievements of SMAIA 28 IIBS
              </h2>
              <p class="text-lg md:text-xl text-gray-700 leading-relaxed mb-6">
                Achievements achieved by students of SMA Islam Al Azhar 28 IIBS in various fields, both academic and non-academic.
              </p>
            </div>

            <div class="bg-gradient-to-r from-primary-50 to-primary-100 rounded-lg p-8 md:p-12 mb-12">
              <h3 class="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
                Academic Achievements
              </h3>
              <div class="space-y-4 text-base md:text-lg text-gray-700 leading-relaxed">
                <p>
                  SMAIA 28 IIBS students have achieved various academic achievements at regional, national, and international levels in various fields such as science, mathematics, language, and technology.
                </p>
              </div>
            </div>

            <div class="bg-gradient-to-r from-primary-50 to-primary-100 rounded-lg p-8 md:p-12 mb-12">
              <h3 class="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
                Non-Academic Achievements
              </h3>
              <div class="space-y-4 text-base md:text-lg text-gray-700 leading-relaxed">
                <p>
                  In addition to academic achievements, students are also active in achieving achievements in sports, arts, and other extracurricular activities.
                </p>
              </div>
            </div>
          </div>
        `,
      },
      'struktur-organisasi-sekolah-sma': {
        id: `
          <div class="max-w-7xl mx-auto">
            <div class="mb-12">
              <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Struktur Organisasi Sekolah SMAIA 28 IIBS
              </h2>
              <p class="text-lg md:text-xl text-gray-700 leading-relaxed mb-6">
                Struktur organisasi sekolah yang jelas dan terorganisir untuk mendukung proses pembelajaran yang efektif dan efisien di tingkat SMA.
              </p>
            </div>

            <div class="bg-gradient-to-r from-primary-50 to-primary-100 rounded-lg p-8 md:p-12 mb-12">
              <div class="text-center mb-8">
                <div class="inline-block bg-white rounded-full p-4 shadow-lg mb-4">
                  <div class="w-24 h-24 bg-primary-200 rounded-full flex items-center justify-center">
                    <span class="text-3xl font-bold text-primary-700">K</span>
                  </div>
                </div>
                <h3 class="text-2xl font-bold text-gray-900 mb-2">Kepala Sekolah SMAIA 28</h3>
                <p class="text-lg text-gray-700">[Nama Kepala Sekolah]</p>
              </div>

              <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div class="bg-white rounded-lg shadow-md p-6 text-center">
                  <div class="w-20 h-20 bg-primary-200 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span class="text-xl font-bold text-primary-700">AS</span>
                  </div>
                  <h4 class="text-lg font-bold text-gray-900 mb-2">Staff Administrasi</h4>
                  <p class="text-gray-700">[Nama Staff]</p>
                </div>
                <div class="bg-white rounded-lg shadow-md p-6 text-center">
                  <div class="w-20 h-20 bg-primary-200 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span class="text-xl font-bold text-primary-700">AS</span>
                  </div>
                  <h4 class="text-lg font-bold text-gray-900 mb-2">Staff Administrasi</h4>
                  <p class="text-gray-700">[Nama Staff]</p>
                </div>
              </div>

              <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                <div class="bg-white rounded-lg shadow-md p-4 text-center">
                  <div class="w-16 h-16 bg-primary-200 rounded-full flex items-center justify-center mx-auto mb-3">
                    <span class="text-lg font-bold text-primary-700">K</span>
                  </div>
                  <h4 class="text-sm font-bold text-gray-900 mb-2">Koordinator Kurikulum</h4>
                  <p class="text-xs text-gray-700">[Nama]</p>
                </div>
                <div class="bg-white rounded-lg shadow-md p-4 text-center">
                  <div class="w-16 h-16 bg-primary-200 rounded-full flex items-center justify-center mx-auto mb-3">
                    <span class="text-lg font-bold text-primary-700">K</span>
                  </div>
                  <h4 class="text-sm font-bold text-gray-900 mb-2">Koordinator Kesiswaan</h4>
                  <p class="text-xs text-gray-700">[Nama]</p>
                </div>
                <div class="bg-white rounded-lg shadow-md p-4 text-center">
                  <div class="w-16 h-16 bg-primary-200 rounded-full flex items-center justify-center mx-auto mb-3">
                    <span class="text-lg font-bold text-primary-700">K</span>
                  </div>
                  <h4 class="text-sm font-bold text-gray-900 mb-2">Koordinator Keislaman</h4>
                  <p class="text-xs text-gray-700">[Nama]</p>
                </div>
                <div class="bg-white rounded-lg shadow-md p-4 text-center">
                  <div class="w-16 h-16 bg-primary-200 rounded-full flex items-center justify-center mx-auto mb-3">
                    <span class="text-lg font-bold text-primary-700">K</span>
                  </div>
                  <h4 class="text-sm font-bold text-gray-900 mb-2">Koordinator Sarpras</h4>
                  <p class="text-xs text-gray-700">[Nama]</p>
                </div>
                <div class="bg-white rounded-lg shadow-md p-4 text-center">
                  <div class="w-16 h-16 bg-primary-200 rounded-full flex items-center justify-center mx-auto mb-3">
                    <span class="text-lg font-bold text-primary-700">K</span>
                  </div>
                  <h4 class="text-sm font-bold text-gray-900 mb-2">Koordinator Kedisiplinan</h4>
                  <p class="text-xs text-gray-700">[Nama]</p>
                </div>
                <div class="bg-white rounded-lg shadow-md p-4 text-center">
                  <div class="w-16 h-16 bg-primary-200 rounded-full flex items-center justify-center mx-auto mb-3">
                    <span class="text-lg font-bold text-primary-700">K</span>
                  </div>
                  <h4 class="text-sm font-bold text-gray-900 mb-2">Koordinator Digital</h4>
                  <p class="text-xs text-gray-700">[Nama]</p>
                </div>
              </div>
            </div>
          </div>
        `,
        en: `
          <div class="max-w-7xl mx-auto">
            <div class="mb-12">
              <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                School Organization Structure of SMAIA 28 IIBS
              </h2>
              <p class="text-lg md:text-xl text-gray-700 leading-relaxed mb-6">
                A clear and organized school organizational structure to support effective and efficient learning processes at the senior high school level.
              </p>
            </div>

            <div class="bg-gradient-to-r from-primary-50 to-primary-100 rounded-lg p-8 md:p-12 mb-12">
              <div class="text-center mb-8">
                <div class="inline-block bg-white rounded-full p-4 shadow-lg mb-4">
                  <div class="w-24 h-24 bg-primary-200 rounded-full flex items-center justify-center">
                    <span class="text-3xl font-bold text-primary-700">P</span>
                  </div>
                </div>
                <h3 class="text-2xl font-bold text-gray-900 mb-2">Principal of SMAIA 28</h3>
                <p class="text-lg text-gray-700">[Principal Name]</p>
              </div>

              <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div class="bg-white rounded-lg shadow-md p-6 text-center">
                  <div class="w-20 h-20 bg-primary-200 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span class="text-xl font-bold text-primary-700">AS</span>
                  </div>
                  <h4 class="text-lg font-bold text-gray-900 mb-2">Administration Staff</h4>
                  <p class="text-gray-700">[Staff Name]</p>
                </div>
                <div class="bg-white rounded-lg shadow-md p-6 text-center">
                  <div class="w-20 h-20 bg-primary-200 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span class="text-xl font-bold text-primary-700">AS</span>
                  </div>
                  <h4 class="text-lg font-bold text-gray-900 mb-2">Administration Staff</h4>
                  <p class="text-gray-700">[Staff Name]</p>
                </div>
              </div>

              <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                <div class="bg-white rounded-lg shadow-md p-4 text-center">
                  <div class="w-16 h-16 bg-primary-200 rounded-full flex items-center justify-center mx-auto mb-3">
                    <span class="text-lg font-bold text-primary-700">C</span>
                  </div>
                  <h4 class="text-sm font-bold text-gray-900 mb-2">Curriculum Coordinator</h4>
                  <p class="text-xs text-gray-700">[Name]</p>
                </div>
                <div class="bg-white rounded-lg shadow-md p-4 text-center">
                  <div class="w-16 h-16 bg-primary-200 rounded-full flex items-center justify-center mx-auto mb-3">
                    <span class="text-lg font-bold text-primary-700">C</span>
                  </div>
                  <h4 class="text-sm font-bold text-gray-900 mb-2">Student Affairs Coordinator</h4>
                  <p class="text-xs text-gray-700">[Name]</p>
                </div>
                <div class="bg-white rounded-lg shadow-md p-4 text-center">
                  <div class="w-16 h-16 bg-primary-200 rounded-full flex items-center justify-center mx-auto mb-3">
                    <span class="text-lg font-bold text-primary-700">C</span>
                  </div>
                  <h4 class="text-sm font-bold text-gray-900 mb-2">Islamic Affairs Coordinator</h4>
                  <p class="text-xs text-gray-700">[Name]</p>
                </div>
                <div class="bg-white rounded-lg shadow-md p-4 text-center">
                  <div class="w-16 h-16 bg-primary-200 rounded-full flex items-center justify-center mx-auto mb-3">
                    <span class="text-lg font-bold text-primary-700">C</span>
                  </div>
                  <h4 class="text-sm font-bold text-gray-900 mb-2">Facilities Coordinator</h4>
                  <p class="text-xs text-gray-700">[Name]</p>
                </div>
                <div class="bg-white rounded-lg shadow-md p-4 text-center">
                  <div class="w-16 h-16 bg-primary-200 rounded-full flex items-center justify-center mx-auto mb-3">
                    <span class="text-lg font-bold text-primary-700">C</span>
                  </div>
                  <h4 class="text-sm font-bold text-gray-900 mb-2">Discipline Coordinator</h4>
                  <p class="text-xs text-gray-700">[Name]</p>
                </div>
                <div class="bg-white rounded-lg shadow-md p-4 text-center">
                  <div class="w-16 h-16 bg-primary-200 rounded-full flex items-center justify-center mx-auto mb-3">
                    <span class="text-lg font-bold text-primary-700">C</span>
                  </div>
                  <h4 class="text-sm font-bold text-gray-900 mb-2">Digital Programs Coordinator</h4>
                  <p class="text-xs text-gray-700">[Name]</p>
                </div>
              </div>
            </div>
          </div>
        `,
      },
    }

    // Default content for other pages
    const defaultContent = {
      id: `
        <div class="max-w-5xl mx-auto">
          <div class="mb-12">
            <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              ${title}
            </h2>
            <p class="text-lg md:text-xl text-gray-700 leading-relaxed mb-6">
              Halaman ${title} untuk SMA Islam Al Azhar 28 IIBS. Informasi lengkap akan segera tersedia.
            </p>
          </div>

          <div class="bg-gradient-to-r from-primary-50 to-primary-100 rounded-lg p-8 md:p-12">
            <h3 class="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
              Informasi
            </h3>
            <p class="text-base md:text-lg text-gray-700 leading-relaxed">
              Konten untuk halaman ini sedang dalam proses pengembangan. Silakan kembali lagi nanti untuk informasi yang lebih lengkap.
            </p>
          </div>
        </div>
      `,
      en: `
        <div class="max-w-5xl mx-auto">
          <div class="mb-12">
            <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              ${titleEn}
            </h2>
            <p class="text-lg md:text-xl text-gray-700 leading-relaxed mb-6">
              ${titleEn} page for SMA Islam Al Azhar 28 IIBS. Complete information will be available soon.
            </p>
          </div>

          <div class="bg-gradient-to-r from-primary-50 to-primary-100 rounded-lg p-8 md:p-12">
            <h3 class="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
              Information
            </h3>
            <p class="text-base md:text-lg text-gray-700 leading-relaxed">
              Content for this page is currently under development. Please check back later for more complete information.
            </p>
          </div>
        </div>
      `,
    }

    return contents[slug] || defaultContent
  }

  // Create submenu and pages for SMP
  for (const submenu of submenuSMP) {
    const menuItem = await prisma.menu.upsert({
      where: { slug: submenu.slug },
      update: {
        parentId: smpMenu.id,
        order: submenu.order,
      },
      create: {
        title: submenu.title,
        titleEn: submenu.titleEn,
        slug: submenu.slug,
        parentId: smpMenu.id,
        order: submenu.order,
        isActive: true,
        menuType: 'page',
      },
    })

    const content = getSMPSubmenuContent(submenu.slug, submenu.title, submenu.titleEn)

    // Create page for each submenu
    await prisma.page.upsert({
      where: { slug: submenu.slug },
      update: {
        content: content.id,
        contentEn: content.en,
        menuId: menuItem.id,
        pageType: 'academic',
        template: 'with-header',
      },
      create: {
        title: submenu.title,
        titleEn: submenu.titleEn,
        slug: submenu.slug,
        content: content.id,
        contentEn: content.en,
        excerpt: `Halaman ${submenu.title}`,
        excerptEn: `${submenu.titleEn} Page`,
        isPublished: true,
        publishedAt: new Date(),
        authorId: admin.id,
        menuId: menuItem.id,
        pageType: 'academic',
        template: 'with-header',
      },
    })
  }

  // Create main SMA page with template 'academic-sma'
  const smaMainPage = await prisma.page.upsert({
    where: { slug: 'sma' },
    update: {
      title: 'SMA ISLAM AL AZHAR 28 KARANGANYAR',
      titleEn: 'SENIOR HIGH SCHOOL AL AZHAR 28 KARANGANYAR',
      content: `
        <div class="max-w-7xl mx-auto">
          <div class="text-center mb-12">
            <h1 class="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              SMA ISLAM AL AZHAR 28 KARANGANYAR
            </h1>
          </div>

          <div class="bg-gradient-to-r from-primary-50 to-primary-100 rounded-lg p-8 md:p-12 mb-12 text-center">
            <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Akreditasi A</h2>
            <p class="text-lg text-gray-700">
              SMAI Al Azhar 28 IIBS berhasil meraih "Akreditasi A" dari Badan Akreditasi Nasional Pendidikan anak Usia Dini, Pendidikan Dasar, dan Pendidikan Menengah (BAN-PDM)
            </p>
          </div>

          <div class="mb-12">
            <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-6">SMA Islam Al Azhar 28 IIBS Karanganyar</h2>
            <p class="text-lg text-gray-700 leading-relaxed mb-6">
              Sekolah menengah atas yang berkomitmen membentuk generasi unggul dengan pendidikan agama yang kuat dan karakter Islami. Dengan visi mencetak lulusan hafidz Quran, brilian, dan berdaya saing global.
            </p>
          </div>

          <div class="mb-12">
            <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Ekstrakurikuler</h2>
            <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div class="bg-white rounded-lg shadow-md p-4 text-center">
                <h4 class="font-bold text-gray-900 mb-2">Basket</h4>
              </div>
              <div class="bg-white rounded-lg shadow-md p-4 text-center">
                <h4 class="font-bold text-gray-900 mb-2">Cinematography</h4>
              </div>
              <div class="bg-white rounded-lg shadow-md p-4 text-center">
                <h4 class="font-bold text-gray-900 mb-2">Coding</h4>
              </div>
              <div class="bg-white rounded-lg shadow-md p-4 text-center">
                <h4 class="font-bold text-gray-900 mb-2">Panahan</h4>
              </div>
              <div class="bg-white rounded-lg shadow-md p-4 text-center">
                <h4 class="font-bold text-gray-900 mb-2">Craft</h4>
              </div>
              <div class="bg-white rounded-lg shadow-md p-4 text-center">
                <h4 class="font-bold text-gray-900 mb-2">Berkuda</h4>
              </div>
              <div class="bg-white rounded-lg shadow-md p-4 text-center">
                <h4 class="font-bold text-gray-900 mb-2">Pramuka</h4>
              </div>
              <div class="bg-white rounded-lg shadow-md p-4 text-center">
                <h4 class="font-bold text-gray-900 mb-2">Mini Soccer</h4>
              </div>
            </div>
          </div>

          <div class="mb-12">
            <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Alumni Berhasil Diterima di Universitas Terkemuka</h2>
            <p class="text-lg text-gray-700 mb-6">
              Alumni SMA Islam Al Azhar 28 IIBS telah berhasil diterima di berbagai universitas terkemuka di dalam dan luar negeri.
            </p>
          </div>
        </div>
      `,
      contentEn: `
        <div class="max-w-7xl mx-auto">
          <div class="text-center mb-12">
            <h1 class="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              SENIOR HIGH SCHOOL AL AZHAR 28 KARANGANYAR
            </h1>
          </div>

          <div class="bg-gradient-to-r from-primary-50 to-primary-100 rounded-lg p-8 md:p-12 mb-12 text-center">
            <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Accreditation A</h2>
            <p class="text-lg text-gray-700">
              SMAI Al Azhar 28 IIBS has successfully achieved "Accreditation A" from the National Accreditation Board for Early Childhood Education, Basic Education, and Secondary Education (BAN-PDM)
            </p>
          </div>

          <div class="mb-12">
            <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-6">SMA Islam Al Azhar 28 IIBS Karanganyar</h2>
            <p class="text-lg text-gray-700 leading-relaxed mb-6">
              A senior high school committed to forming an excellent generation with strong religious education and Islamic character. With a vision to produce Quran hafidz graduates who are brilliant and globally competitive.
            </p>
          </div>

          <div class="mb-12">
            <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Extracurricular</h2>
            <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div class="bg-white rounded-lg shadow-md p-4 text-center">
                <h4 class="font-bold text-gray-900 mb-2">Basketball</h4>
              </div>
              <div class="bg-white rounded-lg shadow-md p-4 text-center">
                <h4 class="font-bold text-gray-900 mb-2">Cinematography</h4>
              </div>
              <div class="bg-white rounded-lg shadow-md p-4 text-center">
                <h4 class="font-bold text-gray-900 mb-2">Coding</h4>
              </div>
              <div class="bg-white rounded-lg shadow-md p-4 text-center">
                <h4 class="font-bold text-gray-900 mb-2">Archery</h4>
              </div>
              <div class="bg-white rounded-lg shadow-md p-4 text-center">
                <h4 class="font-bold text-gray-900 mb-2">Craft</h4>
              </div>
              <div class="bg-white rounded-lg shadow-md p-4 text-center">
                <h4 class="font-bold text-gray-900 mb-2">Horseback Riding</h4>
              </div>
              <div class="bg-white rounded-lg shadow-md p-4 text-center">
                <h4 class="font-bold text-gray-900 mb-2">Scouting</h4>
              </div>
              <div class="bg-white rounded-lg shadow-md p-4 text-center">
                <h4 class="font-bold text-gray-900 mb-2">Mini Soccer</h4>
              </div>
            </div>
          </div>

          <div class="mb-12">
            <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Alumni Successfully Accepted at Leading Universities</h2>
            <p class="text-lg text-gray-700 mb-6">
              Alumni of SMA Islam Al Azhar 28 IIBS have been successfully accepted at various leading universities both domestically and internationally.
            </p>
          </div>
        </div>
      `,
      pageType: 'academic',
      template: 'academic-sma',
      menuId: smaMenu.id,
      isPublished: true,
      publishedAt: new Date(),
      authorId: admin.id,
    },
    create: {
      title: 'SMA ISLAM AL AZHAR 28 KARANGANYAR',
      titleEn: 'SENIOR HIGH SCHOOL AL AZHAR 28 KARANGANYAR',
      slug: 'sma',
      content: `
        <div class="max-w-7xl mx-auto">
          <div class="text-center mb-12">
            <h1 class="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              SMA ISLAM AL AZHAR 28 KARANGANYAR
            </h1>
          </div>

          <div class="bg-gradient-to-r from-primary-50 to-primary-100 rounded-lg p-8 md:p-12 mb-12 text-center">
            <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Akreditasi A</h2>
            <p class="text-lg text-gray-700">
              SMAI Al Azhar 28 IIBS berhasil meraih "Akreditasi A" dari Badan Akreditasi Nasional Pendidikan anak Usia Dini, Pendidikan Dasar, dan Pendidikan Menengah (BAN-PDM)
            </p>
          </div>

          <div class="mb-12">
            <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-6">SMA Islam Al Azhar 28 IIBS Karanganyar</h2>
            <p class="text-lg text-gray-700 leading-relaxed mb-6">
              Sekolah menengah atas yang berkomitmen membentuk generasi unggul dengan pendidikan agama yang kuat dan karakter Islami. Dengan visi mencetak lulusan hafidz Quran, brilian, dan berdaya saing global.
            </p>
          </div>

          <div class="mb-12">
            <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Ekstrakurikuler</h2>
            <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div class="bg-white rounded-lg shadow-md p-4 text-center">
                <h4 class="font-bold text-gray-900 mb-2">Basket</h4>
              </div>
              <div class="bg-white rounded-lg shadow-md p-4 text-center">
                <h4 class="font-bold text-gray-900 mb-2">Cinematography</h4>
              </div>
              <div class="bg-white rounded-lg shadow-md p-4 text-center">
                <h4 class="font-bold text-gray-900 mb-2">Coding</h4>
              </div>
              <div class="bg-white rounded-lg shadow-md p-4 text-center">
                <h4 class="font-bold text-gray-900 mb-2">Panahan</h4>
              </div>
              <div class="bg-white rounded-lg shadow-md p-4 text-center">
                <h4 class="font-bold text-gray-900 mb-2">Craft</h4>
              </div>
              <div class="bg-white rounded-lg shadow-md p-4 text-center">
                <h4 class="font-bold text-gray-900 mb-2">Berkuda</h4>
              </div>
              <div class="bg-white rounded-lg shadow-md p-4 text-center">
                <h4 class="font-bold text-gray-900 mb-2">Pramuka</h4>
              </div>
              <div class="bg-white rounded-lg shadow-md p-4 text-center">
                <h4 class="font-bold text-gray-900 mb-2">Mini Soccer</h4>
              </div>
            </div>
          </div>

          <div class="mb-12">
            <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Alumni Berhasil Diterima di Universitas Terkemuka</h2>
            <p class="text-lg text-gray-700 mb-6">
              Alumni SMA Islam Al Azhar 28 IIBS telah berhasil diterima di berbagai universitas terkemuka di dalam dan luar negeri.
            </p>
          </div>
        </div>
      `,
      contentEn: `
        <div class="max-w-7xl mx-auto">
          <div class="text-center mb-12">
            <h1 class="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              SENIOR HIGH SCHOOL AL AZHAR 28 KARANGANYAR
            </h1>
          </div>

          <div class="bg-gradient-to-r from-primary-50 to-primary-100 rounded-lg p-8 md:p-12 mb-12 text-center">
            <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Accreditation A</h2>
            <p class="text-lg text-gray-700">
              SMAI Al Azhar 28 IIBS has successfully achieved "Accreditation A" from the National Accreditation Board for Early Childhood Education, Basic Education, and Secondary Education (BAN-PDM)
            </p>
          </div>

          <div class="mb-12">
            <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-6">SMA Islam Al Azhar 28 IIBS Karanganyar</h2>
            <p class="text-lg text-gray-700 leading-relaxed mb-6">
              A senior high school committed to forming an excellent generation with strong religious education and Islamic character. With a vision to produce Quran hafidz graduates who are brilliant and globally competitive.
            </p>
          </div>

          <div class="mb-12">
            <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Extracurricular</h2>
            <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div class="bg-white rounded-lg shadow-md p-4 text-center">
                <h4 class="font-bold text-gray-900 mb-2">Basketball</h4>
              </div>
              <div class="bg-white rounded-lg shadow-md p-4 text-center">
                <h4 class="font-bold text-gray-900 mb-2">Cinematography</h4>
              </div>
              <div class="bg-white rounded-lg shadow-md p-4 text-center">
                <h4 class="font-bold text-gray-900 mb-2">Coding</h4>
              </div>
              <div class="bg-white rounded-lg shadow-md p-4 text-center">
                <h4 class="font-bold text-gray-900 mb-2">Archery</h4>
              </div>
              <div class="bg-white rounded-lg shadow-md p-4 text-center">
                <h4 class="font-bold text-gray-900 mb-2">Craft</h4>
              </div>
              <div class="bg-white rounded-lg shadow-md p-4 text-center">
                <h4 class="font-bold text-gray-900 mb-2">Horseback Riding</h4>
              </div>
              <div class="bg-white rounded-lg shadow-md p-4 text-center">
                <h4 class="font-bold text-gray-900 mb-2">Scouting</h4>
              </div>
              <div class="bg-white rounded-lg shadow-md p-4 text-center">
                <h4 class="font-bold text-gray-900 mb-2">Mini Soccer</h4>
              </div>
            </div>
          </div>

          <div class="mb-12">
            <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Alumni Successfully Accepted at Leading Universities</h2>
            <p class="text-lg text-gray-700 mb-6">
              Alumni of SMA Islam Al Azhar 28 IIBS have been successfully accepted at various leading universities both domestically and internationally.
            </p>
          </div>
        </div>
      `,
      pageType: 'academic',
      template: 'academic-sma',
      menuId: smaMenu.id,
      isPublished: true,
      publishedAt: new Date(),
      authorId: admin.id,
    },
  })

  // Create submenu and pages for SMA
  for (const submenu of submenuSMA) {
    const menuItem = await prisma.menu.upsert({
      where: { slug: submenu.slug },
      update: {
        parentId: smaMenu.id,
        order: submenu.order,
      },
      create: {
        title: submenu.title,
        titleEn: submenu.titleEn,
        slug: submenu.slug,
        parentId: smaMenu.id,
        order: submenu.order,
        isActive: true,
        menuType: 'page',
      },
    })

    const content = getSMASubmenuContent(submenu.slug, submenu.title, submenu.titleEn)

    // Create page for each submenu
    await prisma.page.upsert({
      where: { slug: submenu.slug },
      update: {
        content: content.id,
        contentEn: content.en,
        menuId: menuItem.id,
        pageType: 'academic',
        template: 'with-header',
      },
      create: {
        title: submenu.title,
        titleEn: submenu.titleEn,
        slug: submenu.slug,
        content: content.id,
        contentEn: content.en,
        excerpt: `Halaman ${submenu.title}`,
        excerptEn: `${submenu.titleEn} Page`,
        isPublished: true,
        publishedAt: new Date(),
        authorId: admin.id,
        menuId: menuItem.id,
        pageType: 'academic',
        template: 'with-header',
      },
    })
  }

  const programMenu = await prisma.menu.upsert({
    where: { slug: 'program' },
    update: {},
    create: {
      title: 'PROGRAM',
      titleEn: 'PROGRAMS',
      slug: 'program',
      order: 4,
      isActive: true,
      menuType: 'page',
    },
  })

  // Create submenu for PROGRAM
  const submenuProgram = [
    {
      slug: 'super-qc',
      title: 'Super QC',
      titleEn: 'Super QC',
      order: 1,
      content: `
        <div class="max-w-5xl mx-auto">
          <div class="mb-12">
            <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Super QC
            </h2>
            <p class="text-lg md:text-xl text-gray-700 leading-relaxed mb-6">
              SUPER QC merupakan Program Pengembangan Pribadi Muslim yang didesain dan dikembangkan oleh Al Azhar International Islamic Boarding School (AAIIBS). Program ini secara umum digali dari sifat-sifat Rasulullah SAW, yaitu FAST : Fathonah, Amanah, Shidiq, dan Tabligh. Secara khusus SUPER QC digali dari pribadi ulama' besar Indonesia, Buya Hamka rahimahullah.
            </p>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <div class="flex items-center justify-center">
              <div class="w-full max-w-md">
                <img 
                  src="https://via.placeholder.com/400x400?text=Buya+Hamka" 
                  alt="Buya Hamka" 
                  class="w-full h-auto rounded-lg shadow-lg"
                />
              </div>
            </div>
            <div class="flex items-center">
              <div class="space-y-4 text-base md:text-lg text-gray-700 leading-relaxed">
                <p>
                  Buya Hamka adalah ulama' besar tanah air yang memiliki talenta komplit dengan karakter: Scientist yang menguasai berbagai ilmu, diantara buah karya beliau adalah mendisain Sekolah Islam pertama yang mengintegrasikan Islam dan sains modern. Ulama' yang karena ke-'alim-an beliau mendapatkan gelar kehormatan Prof. Dr., meskipun beliau tidak pernah mengenyam pendidikan tinggi.
                </p>
                <p>
                  Seorang Professional, yang tidak hanya piawai dalam menemukan ide-ide pengembangan pendidikan dan dakwah, namun juga piawai dalam menerapkannya dalam keluarga dan masyarakat luas.
                </p>
                <p>
                  Beliau juga seorang Entrepreneur yang mampu memimpin majalah beroplah tinggi, salah satu diantaranya yaitu majalah Panji Masyarakat.
                </p>
              </div>
            </div>
          </div>

          <div class="bg-gradient-to-r from-primary-50 to-primary-100 rounded-lg p-8 md:p-12">
            <h3 class="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
              Program Super QC
            </h3>
            <div class="space-y-4 text-base md:text-lg text-gray-700 leading-relaxed">
              <p>
                Program Super QC dirancang untuk mengembangkan potensi peserta didik dalam 4 bidang utama:
              </p>
              <ul class="list-disc list-inside space-y-2 ml-4">
                <li><strong>Scientist:</strong> Mengembangkan kemampuan sains dan teknologi</li>
                <li><strong>Ulama':</strong> Memperdalam pemahaman agama dan keilmuan Islam</li>
                <li><strong>Professional:</strong> Membentuk karakter profesional yang kompeten</li>
                <li><strong>Entrepreneur:</strong> Mengembangkan jiwa kewirausahaan</li>
              </ul>
            </div>
          </div>
        </div>
      `,
      contentEn: `
        <div class="max-w-5xl mx-auto">
          <div class="mb-12">
            <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Super QC
            </h2>
            <p class="text-lg md:text-xl text-gray-700 leading-relaxed mb-6">
              SUPER QC is a Muslim Personal Development Program designed and developed by Al Azhar International Islamic Boarding School (AAIIBS). This program is generally derived from the characteristics of the Prophet Muhammad SAW, namely FAST: Fathonah (Intelligence), Amanah (Trustworthy), Shidiq (Truthful), and Tabligh (Conveying). Specifically, SUPER QC is derived from the personality of Indonesia's great scholar, Buya Hamka rahimahullah.
            </p>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <div class="flex items-center justify-center">
              <div class="w-full max-w-md">
                <img 
                  src="https://via.placeholder.com/400x400?text=Buya+Hamka" 
                  alt="Buya Hamka" 
                  class="w-full h-auto rounded-lg shadow-lg"
                />
              </div>
            </div>
            <div class="flex items-center">
              <div class="space-y-4 text-base md:text-lg text-gray-700 leading-relaxed">
                <p>
                  Buya Hamka is a great scholar of the homeland who has complete talents with character: A Scientist who masters various sciences, among his works is designing the first Islamic School that integrates Islam and modern science. A Scholar who because of his knowledge received the honorary title of Prof. Dr., even though he never attended higher education.
                </p>
                <p>
                  A Professional, who is not only skilled in finding ideas for educational and da'wah development, but also skilled in applying them in families and the wider community.
                </p>
                <p>
                  He is also an Entrepreneur who was able to lead high-circulation magazines, one of which is Panji Masyarakat magazine.
                </p>
              </div>
            </div>
          </div>

          <div class="bg-gradient-to-r from-primary-50 to-primary-100 rounded-lg p-8 md:p-12">
            <h3 class="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
              Super QC Program
            </h3>
            <div class="space-y-4 text-base md:text-lg text-gray-700 leading-relaxed">
              <p>
                The Super QC Program is designed to develop student potential in 4 main areas:
              </p>
              <ul class="list-disc list-inside space-y-2 ml-4">
                <li><strong>Scientist:</strong> Developing science and technology capabilities</li>
                <li><strong>Ulama':</strong> Deepening understanding of religion and Islamic knowledge</li>
                <li><strong>Professional:</strong> Forming competent professional character</li>
                <li><strong>Entrepreneur:</strong> Developing entrepreneurial spirit</li>
              </ul>
            </div>
          </div>
        </div>
      `,
    },
    {
      slug: 'tahfizh',
      title: 'Tahfizh',
      titleEn: 'Tahfizh',
      order: 2,
      content: `
        <div class="max-w-5xl mx-auto">
          <div class="mb-12">
            <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Program Tahfizh
            </h2>
            <p class="text-lg md:text-xl text-gray-700 leading-relaxed mb-6">
              Program Tahfizh Al Azhar IIBS dirancang untuk membantu peserta didik menghafal Al-Qur'an dengan metode yang efektif dan menyenangkan. Program ini mengintegrasikan hafalan Al-Qur'an dengan pembelajaran akademik dan pengembangan karakter.
            </p>
          </div>

          <div class="bg-gradient-to-r from-primary-50 to-primary-100 rounded-lg p-8 md:p-12 mb-12">
            <h3 class="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
              Target Program Tahfizh
            </h3>
            <div class="space-y-4 text-base md:text-lg text-gray-700 leading-relaxed">
              <p>
                Program Tahfizh di Al Azhar IIBS memiliki target hafalan Al-Qur'an 30 juz untuk seluruh peserta didik. Program ini dilaksanakan secara bertahap dan terstruktur dengan pendampingan yang intensif dari para ustadz dan ustadzah yang berpengalaman.
              </p>
            </div>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div class="bg-white rounded-lg shadow-md p-6">
              <h4 class="text-xl font-bold text-gray-900 mb-4">Metode Pembelajaran</h4>
              <p class="text-gray-700">
                Menggunakan metode yang telah terbukti efektif dalam menghafal Al-Qur'an dengan pendekatan yang menyenangkan dan tidak membebani peserta didik.
              </p>
            </div>
            <div class="bg-white rounded-lg shadow-md p-6">
              <h4 class="text-xl font-bold text-gray-900 mb-4">Pendampingan Intensif</h4>
              <p class="text-gray-700">
                Setiap peserta didik didampingi oleh ustadz/ustadzah yang berpengalaman dalam bidang tahfizh untuk memastikan kualitas hafalan.
              </p>
            </div>
          </div>
        </div>
      `,
      contentEn: `
        <div class="max-w-5xl mx-auto">
          <div class="mb-12">
            <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Tahfizh Program
            </h2>
            <p class="text-lg md:text-xl text-gray-700 leading-relaxed mb-6">
              The Al Azhar IIBS Tahfizh Program is designed to help students memorize the Al-Qur'an with effective and enjoyable methods. This program integrates Al-Qur'an memorization with academic learning and character development.
            </p>
          </div>

          <div class="bg-gradient-to-r from-primary-50 to-primary-100 rounded-lg p-8 md:p-12 mb-12">
            <h3 class="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
              Tahfizh Program Target
            </h3>
            <div class="space-y-4 text-base md:text-lg text-gray-700 leading-relaxed">
              <p>
                The Tahfizh Program at Al Azhar IIBS has a target of memorizing 30 juz of Al-Qur'an for all students. This program is implemented gradually and structured with intensive guidance from experienced ustadz and ustadzah.
              </p>
            </div>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div class="bg-white rounded-lg shadow-md p-6">
              <h4 class="text-xl font-bold text-gray-900 mb-4">Learning Method</h4>
              <p class="text-gray-700">
                Using proven effective methods in memorizing Al-Qur'an with an enjoyable approach that does not burden students.
              </p>
            </div>
            <div class="bg-white rounded-lg shadow-md p-6">
              <h4 class="text-xl font-bold text-gray-900 mb-4">Intensive Guidance</h4>
              <p class="text-gray-700">
                Each student is guided by experienced ustadz/ustadzah in the field of tahfizh to ensure the quality of memorization.
              </p>
            </div>
          </div>
        </div>
      `,
    },
    {
      slug: 'adab',
      title: 'Adab',
      titleEn: 'Adab',
      order: 3,
      content: `
        <div class="max-w-5xl mx-auto">
          <div class="mb-12">
            <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Program Adab
            </h2>
            <p class="text-lg md:text-xl text-gray-700 leading-relaxed mb-6">
              Program Adab di Al Azhar IIBS dirancang untuk membentuk karakter dan akhlak mulia peserta didik berdasarkan nilai-nilai Islam. Program ini mengintegrasikan pembelajaran adab dalam setiap aspek kehidupan di pondok pesantren.
            </p>
          </div>

          <div class="bg-gradient-to-r from-primary-50 to-primary-100 rounded-lg p-8 md:p-12 mb-12">
            <h3 class="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
              Pembelajaran Adab
            </h3>
            <div class="space-y-4 text-base md:text-lg text-gray-700 leading-relaxed">
              <p>
                Program Adab mencakup pembelajaran adab kepada Allah SWT, adab kepada Rasulullah SAW, adab kepada orang tua, adab kepada guru, adab kepada teman, dan adab dalam kehidupan sehari-hari. Program ini dilaksanakan melalui kurikulum khusus, materi kepondokan, dan praktik langsung dalam kehidupan sehari-hari.
              </p>
            </div>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div class="bg-white rounded-lg shadow-md p-6">
              <h4 class="text-xl font-bold text-gray-900 mb-4">Adab kepada Allah</h4>
              <p class="text-gray-700">
                Pembelajaran tentang adab beribadah, berdoa, dan berzikir kepada Allah SWT.
              </p>
            </div>
            <div class="bg-white rounded-lg shadow-md p-6">
              <h4 class="text-xl font-bold text-gray-900 mb-4">Adab kepada Rasul</h4>
              <p class="text-gray-700">
                Pembelajaran tentang cinta dan mengikuti sunnah Rasulullah SAW dalam kehidupan sehari-hari.
              </p>
            </div>
            <div class="bg-white rounded-lg shadow-md p-6">
              <h4 class="text-xl font-bold text-gray-900 mb-4">Adab Sosial</h4>
              <p class="text-gray-700">
                Pembelajaran tentang adab kepada orang tua, guru, teman, dan masyarakat.
              </p>
            </div>
          </div>
        </div>
      `,
      contentEn: `
        <div class="max-w-5xl mx-auto">
          <div class="mb-12">
            <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Adab Program
            </h2>
            <p class="text-lg md:text-xl text-gray-700 leading-relaxed mb-6">
              The Adab Program at Al Azhar IIBS is designed to form the character and noble morals of students based on Islamic values. This program integrates adab learning in every aspect of life in the boarding school.
            </p>
          </div>

          <div class="bg-gradient-to-r from-primary-50 to-primary-100 rounded-lg p-8 md:p-12 mb-12">
            <h3 class="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
              Adab Learning
            </h3>
            <div class="space-y-4 text-base md:text-lg text-gray-700 leading-relaxed">
              <p>
                The Adab Program includes learning adab to Allah SWT, adab to the Prophet Muhammad SAW, adab to parents, adab to teachers, adab to friends, and adab in daily life. This program is implemented through a special curriculum, boarding materials, and direct practice in daily life.
              </p>
            </div>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div class="bg-white rounded-lg shadow-md p-6">
              <h4 class="text-xl font-bold text-gray-900 mb-4">Adab to Allah</h4>
              <p class="text-gray-700">
                Learning about adab in worship, prayer, and dhikr to Allah SWT.
              </p>
            </div>
            <div class="bg-white rounded-lg shadow-md p-6">
              <h4 class="text-xl font-bold text-gray-900 mb-4">Adab to the Prophet</h4>
              <p class="text-gray-700">
                Learning about love and following the sunnah of the Prophet Muhammad SAW in daily life.
              </p>
            </div>
            <div class="bg-white rounded-lg shadow-md p-6">
              <h4 class="text-xl font-bold text-gray-900 mb-4">Social Adab</h4>
              <p class="text-gray-700">
                Learning about adab to parents, teachers, friends, and society.
              </p>
            </div>
          </div>
        </div>
      `,
    },
    {
      slug: 'program-internasional',
      title: 'Program Internasional',
      titleEn: 'International Program',
      order: 4,
      content: `
        <div class="max-w-5xl mx-auto">
          <div class="mb-12">
            <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Program Internasional
            </h2>
            <p class="text-lg md:text-xl text-gray-700 leading-relaxed mb-6">
              Program Internasional Al Azhar IIBS dirancang untuk memberikan pengalaman belajar yang global kepada peserta didik. Program ini mencakup berbagai kegiatan internasional seperti student exchange, overseas program, dan kerjasama dengan institusi pendidikan di berbagai negara.
            </p>
          </div>

          <div class="bg-gradient-to-r from-primary-50 to-primary-100 rounded-lg p-8 md:p-12 mb-12">
            <h3 class="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
              Program Internasional
            </h3>
            <div class="space-y-4 text-base md:text-lg text-gray-700 leading-relaxed">
              <p>
                International Program designed to provide students with a world-class education while immersing them in a global learning environment. Our program is tailored to foster academic excellence, cultural awareness, and personal growth.
              </p>
              <p>
                Program ini memberikan kesempatan kepada peserta didik untuk belajar di berbagai negara, berinteraksi dengan budaya yang berbeda, dan mengembangkan kemampuan bahasa asing, terutama bahasa Arab dan bahasa Inggris.
              </p>
            </div>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div class="bg-white rounded-lg shadow-md p-6">
              <h4 class="text-xl font-bold text-gray-900 mb-4">Student Exchange</h4>
              <p class="text-gray-700">
                Program pertukaran pelajar dengan sekolah-sekolah mitra di berbagai negara untuk memberikan pengalaman belajar yang berbeda.
              </p>
            </div>
            <div class="bg-white rounded-lg shadow-md p-6">
              <h4 class="text-xl font-bold text-gray-900 mb-4">Overseas Program</h4>
              <p class="text-gray-700">
                Program kunjungan belajar ke berbagai negara seperti Mekkah, Madinah, Australia, Jepang, dan negara-negara lainnya.
              </p>
            </div>
          </div>
        </div>
      `,
      contentEn: `
        <div class="max-w-5xl mx-auto">
          <div class="mb-12">
            <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              International Program
            </h2>
            <p class="text-lg md:text-xl text-gray-700 leading-relaxed mb-6">
              The Al Azhar IIBS International Program is designed to provide a global learning experience for students. This program includes various international activities such as student exchange, overseas programs, and cooperation with educational institutions in various countries.
            </p>
          </div>

          <div class="bg-gradient-to-r from-primary-50 to-primary-100 rounded-lg p-8 md:p-12 mb-12">
            <h3 class="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
              International Program
            </h3>
            <div class="space-y-4 text-base md:text-lg text-gray-700 leading-relaxed">
              <p>
                International Program designed to provide students with a world-class education while immersing them in a global learning environment. Our program is tailored to foster academic excellence, cultural awareness, and personal growth.
              </p>
              <p>
                This program provides opportunities for students to study in various countries, interact with different cultures, and develop foreign language skills, especially Arabic and English.
              </p>
            </div>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div class="bg-white rounded-lg shadow-md p-6">
              <h4 class="text-xl font-bold text-gray-900 mb-4">Student Exchange</h4>
              <p class="text-gray-700">
                Student exchange program with partner schools in various countries to provide different learning experiences.
              </p>
            </div>
            <div class="bg-white rounded-lg shadow-md p-6">
              <h4 class="text-xl font-bold text-gray-900 mb-4">Overseas Program</h4>
              <p class="text-gray-700">
                Study visit programs to various countries such as Mecca, Medina, Australia, Japan, and other countries.
              </p>
            </div>
          </div>
        </div>
      `,
    },
    {
      slug: 'language-center',
      title: 'Language Center',
      titleEn: 'Language Center',
      order: 5,
      content: `
        <div class="max-w-5xl mx-auto">
          <div class="mb-12">
            <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Language Center
            </h2>
            <p class="text-lg md:text-xl text-gray-700 leading-relaxed mb-6">
              Language Center Al Azhar IIBS menyediakan program pembelajaran bahasa Arab dan bahasa Inggris yang intensif untuk peserta didik. Program ini dirancang untuk mengembangkan kemampuan berbahasa peserta didik baik secara lisan maupun tulisan.
            </p>
          </div>

          <div class="bg-gradient-to-r from-primary-50 to-primary-100 rounded-lg p-8 md:p-12 mb-12">
            <h3 class="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
              Program Bahasa
            </h3>
            <div class="space-y-4 text-base md:text-lg text-gray-700 leading-relaxed">
              <p>
                Language Center menyediakan pembelajaran bahasa Arab dan bahasa Inggris dengan metode yang modern dan efektif. Program ini mencakup pembelajaran grammar, conversation, reading, dan writing untuk kedua bahasa tersebut.
              </p>
              <p>
                Pengembangan kemampuan bahasa Arab dan bahasa Inggris yang intensif merupakan salah satu program unggulan di Al Azhar IIBS untuk mempersiapkan peserta didik menghadapi tantangan global.
              </p>
            </div>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div class="bg-white rounded-lg shadow-md p-6">
              <h4 class="text-xl font-bold text-gray-900 mb-4">Bahasa Arab</h4>
              <p class="text-gray-700">
                Program pembelajaran bahasa Arab yang mencakup grammar, conversation, reading, dan writing dengan pendekatan yang menyenangkan dan efektif.
              </p>
            </div>
            <div class="bg-white rounded-lg shadow-md p-6">
              <h4 class="text-xl font-bold text-gray-900 mb-4">Bahasa Inggris</h4>
              <p class="text-gray-700">
                Program pembelajaran bahasa Inggris yang dirancang untuk mengembangkan kemampuan komunikasi dalam bahasa internasional ini.
              </p>
            </div>
          </div>
        </div>
      `,
      contentEn: `
        <div class="max-w-5xl mx-auto">
          <div class="mb-12">
            <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Language Center
            </h2>
            <p class="text-lg md:text-xl text-gray-700 leading-relaxed mb-6">
              The Al Azhar IIBS Language Center provides intensive Arabic and English language learning programs for students. This program is designed to develop students' language skills both orally and in writing.
            </p>
          </div>

          <div class="bg-gradient-to-r from-primary-50 to-primary-100 rounded-lg p-8 md:p-12 mb-12">
            <h3 class="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
              Language Program
            </h3>
            <div class="space-y-4 text-base md:text-lg text-gray-700 leading-relaxed">
              <p>
                The Language Center provides Arabic and English language learning with modern and effective methods. This program includes grammar, conversation, reading, and writing learning for both languages.
              </p>
              <p>
                Intensive development of Arabic and English language skills is one of the flagship programs at Al Azhar IIBS to prepare students to face global challenges.
              </p>
            </div>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div class="bg-white rounded-lg shadow-md p-6">
              <h4 class="text-xl font-bold text-gray-900 mb-4">Arabic Language</h4>
              <p class="text-gray-700">
                Arabic language learning program that includes grammar, conversation, reading, and writing with an enjoyable and effective approach.
              </p>
            </div>
            <div class="bg-white rounded-lg shadow-md p-6">
              <h4 class="text-xl font-bold text-gray-900 mb-4">English Language</h4>
              <p class="text-gray-700">
                English language learning program designed to develop communication skills in this international language.
              </p>
            </div>
          </div>
        </div>
      `,
    },
  ]

  // Create submenu and pages for PROGRAM
  for (const submenu of submenuProgram) {
    const menuItem = await prisma.menu.upsert({
      where: { slug: submenu.slug },
      update: {
        parentId: programMenu.id,
        order: submenu.order,
      },
      create: {
        title: submenu.title,
        titleEn: submenu.titleEn,
        slug: submenu.slug,
        parentId: programMenu.id,
        order: submenu.order,
        isActive: true,
        menuType: 'page',
      },
    })

    // Create page for each submenu with template "with-header"
    await prisma.page.upsert({
      where: { slug: submenu.slug },
      update: {
        content: submenu.content,
        contentEn: submenu.contentEn,
        menuId: menuItem.id,
        template: 'with-header',
      },
      create: {
        title: submenu.title,
        titleEn: submenu.titleEn,
        slug: submenu.slug,
        content: submenu.content,
        contentEn: submenu.contentEn,
        excerpt: `Halaman ${submenu.title}`,
        excerptEn: `${submenu.titleEn} Page`,
        isPublished: true,
        publishedAt: new Date(),
        authorId: admin.id,
        menuId: menuItem.id,
        template: 'with-header',
      },
    })
  }

  const fasilitasMenu = await prisma.menu.upsert({
    where: { slug: 'fasilitas' },
    update: {},
    create: {
      title: 'FASILITAS',
      titleEn: 'FACILITIES',
      slug: 'fasilitas',
      order: 5,
      isActive: true,
      menuType: 'page',
    },
  })

  // Create submenu for FASILITAS
  const submenuFasilitas = [
    {
      slug: 'sarana-prasarana',
      title: 'Sarana Prasarana',
      titleEn: 'Infrastructure',
      order: 1,
      content: `
        <div class="max-w-5xl mx-auto">
          <div class="mb-12">
            <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Sarana Prasarana
            </h2>
            <p class="text-lg md:text-xl text-gray-700 leading-relaxed mb-6">
              Al Azhar International Islamic Boarding School dilengkapi dengan sarana dan prasarana yang modern dan lengkap untuk mendukung proses pembelajaran yang optimal. Fasilitas-fasilitas ini dirancang untuk memberikan kenyamanan dan kemudahan bagi peserta didik dalam menuntut ilmu.
            </p>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <div class="bg-white rounded-lg shadow-md p-6">
              <h3 class="text-2xl font-bold text-gray-900 mb-4">Gedung Sekolah</h3>
              <p class="text-gray-700">
                Gedung sekolah yang modern dengan ruang kelas yang nyaman dan dilengkapi dengan teknologi pembelajaran terkini untuk mendukung proses belajar mengajar yang efektif.
              </p>
            </div>
            <div class="bg-white rounded-lg shadow-md p-6">
              <h3 class="text-2xl font-bold text-gray-900 mb-4">Asrama</h3>
              <p class="text-gray-700">
                Asrama yang nyaman dan aman dengan fasilitas lengkap untuk mendukung kehidupan santri selama berada di pondok pesantren.
              </p>
            </div>
            <div class="bg-white rounded-lg shadow-md p-6">
              <h3 class="text-2xl font-bold text-gray-900 mb-4">Masjid</h3>
              <p class="text-gray-700">
                Masjid Al Fatih yang megah dan modern sebagai pusat kegiatan ibadah dan pembelajaran agama bagi seluruh warga sekolah.
              </p>
            </div>
            <div class="bg-white rounded-lg shadow-md p-6">
              <h3 class="text-2xl font-bold text-gray-900 mb-4">Laboratorium</h3>
              <p class="text-gray-700">
                Laboratorium sains yang lengkap dengan peralatan modern untuk mendukung pembelajaran praktikum dan penelitian.
              </p>
            </div>
            <div class="bg-white rounded-lg shadow-md p-6">
              <h3 class="text-2xl font-bold text-gray-900 mb-4">Perpustakaan</h3>
              <p class="text-gray-700">
                Perpustakaan dengan koleksi buku yang lengkap dan ruang baca yang nyaman untuk mendukung budaya literasi.
              </p>
            </div>
            <div class="bg-white rounded-lg shadow-md p-6">
              <h3 class="text-2xl font-bold text-gray-900 mb-4">Lapangan Olahraga</h3>
              <p class="text-gray-700">
                Lapangan olahraga yang luas dan lengkap untuk mendukung kegiatan olahraga dan ekstrakurikuler.
              </p>
            </div>
          </div>

          <div class="bg-gradient-to-r from-primary-50 to-primary-100 rounded-lg p-8 md:p-12">
            <h3 class="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
              Fasilitas Pendukung
            </h3>
            <div class="space-y-4 text-base md:text-lg text-gray-700 leading-relaxed">
              <p>
                Selain fasilitas utama, Al Azhar IIBS juga dilengkapi dengan berbagai fasilitas pendukung seperti kantin, klinik kesehatan, ruang multimedia, dan area hijau yang luas untuk menciptakan lingkungan belajar yang kondusif dan menyenangkan.
              </p>
            </div>
          </div>
        </div>
      `,
      contentEn: `
        <div class="max-w-5xl mx-auto">
          <div class="mb-12">
            <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Infrastructure
            </h2>
            <p class="text-lg md:text-xl text-gray-700 leading-relaxed mb-6">
              Al Azhar International Islamic Boarding School is equipped with modern and complete facilities to support optimal learning processes. These facilities are designed to provide comfort and convenience for students in seeking knowledge.
            </p>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <div class="bg-white rounded-lg shadow-md p-6">
              <h3 class="text-2xl font-bold text-gray-900 mb-4">School Building</h3>
              <p class="text-gray-700">
                Modern school building with comfortable classrooms equipped with the latest learning technology to support effective teaching and learning processes.
              </p>
            </div>
            <div class="bg-white rounded-lg shadow-md p-6">
              <h3 class="text-2xl font-bold text-gray-900 mb-4">Boarding House</h3>
              <p class="text-gray-700">
                Comfortable and safe boarding house with complete facilities to support student life during their stay at the boarding school.
              </p>
            </div>
            <div class="bg-white rounded-lg shadow-md p-6">
              <h3 class="text-2xl font-bold text-gray-900 mb-4">Mosque</h3>
              <p class="text-gray-700">
                The magnificent and modern Al Fatih Mosque as the center of worship and religious learning activities for all school members.
              </p>
            </div>
            <div class="bg-white rounded-lg shadow-md p-6">
              <h3 class="text-2xl font-bold text-gray-900 mb-4">Laboratory</h3>
              <p class="text-gray-700">
                Complete science laboratory with modern equipment to support practical learning and research.
              </p>
            </div>
            <div class="bg-white rounded-lg shadow-md p-6">
              <h3 class="text-2xl font-bold text-gray-900 mb-4">Library</h3>
              <p class="text-gray-700">
                Library with complete book collection and comfortable reading room to support literacy culture.
              </p>
            </div>
            <div class="bg-white rounded-lg shadow-md p-6">
              <h3 class="text-2xl font-bold text-gray-900 mb-4">Sports Field</h3>
              <p class="text-gray-700">
                Wide and complete sports field to support sports activities and extracurricular activities.
              </p>
            </div>
          </div>

          <div class="bg-gradient-to-r from-primary-50 to-primary-100 rounded-lg p-8 md:p-12">
            <h3 class="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
              Supporting Facilities
            </h3>
            <div class="space-y-4 text-base md:text-lg text-gray-700 leading-relaxed">
              <p>
                In addition to the main facilities, Al Azhar IIBS is also equipped with various supporting facilities such as canteen, health clinic, multimedia room, and extensive green areas to create a conducive and enjoyable learning environment.
              </p>
            </div>
          </div>
        </div>
      `,
    },
    {
      slug: 'parent-corner',
      title: 'Parent Corner',
      titleEn: 'Parent Corner',
      order: 2,
      content: `
        <div class="max-w-5xl mx-auto">
          <div class="mb-12">
            <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Parent Corner
            </h2>
            <p class="text-lg md:text-xl text-gray-700 leading-relaxed mb-6">
              Parent Corner adalah ruang khusus bagi orang tua untuk mendapatkan informasi terkini tentang perkembangan anak, kegiatan sekolah, dan berbagai informasi penting lainnya. Kami memahami bahwa komunikasi yang baik antara sekolah dan orang tua sangat penting untuk kesuksesan pendidikan anak.
            </p>
          </div>

          <div class="bg-gradient-to-r from-primary-50 to-primary-100 rounded-lg p-8 md:p-12 mb-12">
            <h3 class="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
              Informasi untuk Orang Tua
            </h3>
            <div class="space-y-4 text-base md:text-lg text-gray-700 leading-relaxed">
              <p>
                Di Parent Corner, orang tua dapat mengakses berbagai informasi penting seperti:
              </p>
              <ul class="list-disc list-inside space-y-2 ml-4">
                <li>Laporan perkembangan anak secara berkala</li>
                <li>Jadwal kegiatan sekolah dan pondok</li>
                <li>Informasi akademik dan prestasi anak</li>
                <li>Kegiatan ekstrakurikuler dan program khusus</li>
                <li>Informasi keuangan dan pembayaran</li>
                <li>Kontak penting dan prosedur komunikasi</li>
              </ul>
            </div>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div class="bg-white rounded-lg shadow-md p-6">
              <h4 class="text-xl font-bold text-gray-900 mb-4">Portal Orang Tua</h4>
              <p class="text-gray-700">
                Akses portal online untuk melihat perkembangan akademik dan non-akademik anak secara real-time.
              </p>
            </div>
            <div class="bg-white rounded-lg shadow-md p-6">
              <h4 class="text-xl font-bold text-gray-900 mb-4">Komunikasi</h4>
              <p class="text-gray-700">
                Saluran komunikasi yang mudah dan efektif antara orang tua dengan wali kelas, musrif, dan pihak sekolah.
              </p>
            </div>
          </div>
        </div>
      `,
      contentEn: `
        <div class="max-w-5xl mx-auto">
          <div class="mb-12">
            <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Parent Corner
            </h2>
            <p class="text-lg md:text-xl text-gray-700 leading-relaxed mb-6">
              Parent Corner is a special space for parents to get the latest information about their child's development, school activities, and other important information. We understand that good communication between school and parents is very important for children's educational success.
            </p>
          </div>

          <div class="bg-gradient-to-r from-primary-50 to-primary-100 rounded-lg p-8 md:p-12 mb-12">
            <h3 class="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
              Information for Parents
            </h3>
            <div class="space-y-4 text-base md:text-lg text-gray-700 leading-relaxed">
              <p>
                In Parent Corner, parents can access various important information such as:
              </p>
              <ul class="list-disc list-inside space-y-2 ml-4">
                <li>Periodic child development reports</li>
                <li>School and boarding activity schedules</li>
                <li>Academic information and child achievements</li>
                <li>Extracurricular activities and special programs</li>
                <li>Financial information and payments</li>
                <li>Important contacts and communication procedures</li>
              </ul>
            </div>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div class="bg-white rounded-lg shadow-md p-6">
              <h4 class="text-xl font-bold text-gray-900 mb-4">Parent Portal</h4>
              <p class="text-gray-700">
                Access online portal to view child's academic and non-academic development in real-time.
              </p>
            </div>
            <div class="bg-white rounded-lg shadow-md p-6">
              <h4 class="text-xl font-bold text-gray-900 mb-4">Communication</h4>
              <p class="text-gray-700">
                Easy and effective communication channels between parents and homeroom teachers, musrif, and school administration.
              </p>
            </div>
          </div>
        </div>
      `,
    },
    {
      slug: 'parent-handbook',
      title: 'Parent Handbook',
      titleEn: 'Parent Handbook',
      order: 3,
      content: `
        <div class="max-w-5xl mx-auto">
          <div class="mb-12">
            <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Parent Handbook
            </h2>
            <p class="text-lg md:text-xl text-gray-700 leading-relaxed mb-6">
              Parent Handbook adalah panduan lengkap bagi orang tua untuk memahami sistem pendidikan, kebijakan sekolah, dan berbagai informasi penting lainnya di Al Azhar International Islamic Boarding School. Buku panduan ini dirancang untuk membantu orang tua memahami bagaimana sekolah beroperasi dan bagaimana mereka dapat terlibat dalam pendidikan anak mereka.
            </p>
          </div>

          <div class="bg-gradient-to-r from-primary-50 to-primary-100 rounded-lg p-8 md:p-12 mb-12">
            <h3 class="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
              Isi Parent Handbook
            </h3>
            <div class="space-y-4 text-base md:text-lg text-gray-700 leading-relaxed">
              <p>
                Parent Handbook mencakup berbagai informasi penting seperti:
              </p>
              <ul class="list-disc list-inside space-y-2 ml-4">
                <li>Visi, misi, dan nilai-nilai sekolah</li>
                <li>Kurikulum dan sistem pembelajaran</li>
                <li>Kebijakan dan peraturan sekolah</li>
                <li>Prosedur akademik dan administrasi</li>
                <li>Kegiatan ekstrakurikuler dan program khusus</li>
                <li>Kebijakan disiplin dan kode etik</li>
                <li>Informasi kesehatan dan keamanan</li>
                <li>Prosedur komunikasi dan pertemuan orang tua</li>
                <li>Informasi keuangan dan pembayaran</li>
                <li>Kontak penting dan alamat</li>
              </ul>
            </div>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div class="bg-white rounded-lg shadow-md p-6">
              <h4 class="text-xl font-bold text-gray-900 mb-4">Panduan Lengkap</h4>
              <p class="text-gray-700">
                Buku panduan yang komprehensif mencakup semua aspek kehidupan sekolah dan pondok pesantren.
              </p>
            </div>
            <div class="bg-white rounded-lg shadow-md p-6">
              <h4 class="text-xl font-bold text-gray-900 mb-4">Update Berkala</h4>
              <p class="text-gray-700">
                Parent Handbook diperbarui secara berkala untuk memastikan informasi yang diberikan selalu terkini dan akurat.
              </p>
            </div>
          </div>
        </div>
      `,
      contentEn: `
        <div class="max-w-5xl mx-auto">
          <div class="mb-12">
            <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Parent Handbook
            </h2>
            <p class="text-lg md:text-xl text-gray-700 leading-relaxed mb-6">
              Parent Handbook is a complete guide for parents to understand the education system, school policies, and other important information at Al Azhar International Islamic Boarding School. This guidebook is designed to help parents understand how the school operates and how they can be involved in their children's education.
            </p>
          </div>

          <div class="bg-gradient-to-r from-primary-50 to-primary-100 rounded-lg p-8 md:p-12 mb-12">
            <h3 class="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
              Parent Handbook Contents
            </h3>
            <div class="space-y-4 text-base md:text-lg text-gray-700 leading-relaxed">
              <p>
                Parent Handbook includes various important information such as:
              </p>
              <ul class="list-disc list-inside space-y-2 ml-4">
                <li>School vision, mission, and values</li>
                <li>Curriculum and learning system</li>
                <li>School policies and regulations</li>
                <li>Academic and administrative procedures</li>
                <li>Extracurricular activities and special programs</li>
                <li>Discipline policies and code of ethics</li>
                <li>Health and safety information</li>
                <li>Communication procedures and parent meetings</li>
                <li>Financial information and payments</li>
                <li>Important contacts and addresses</li>
              </ul>
            </div>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div class="bg-white rounded-lg shadow-md p-6">
              <h4 class="text-xl font-bold text-gray-900 mb-4">Complete Guide</h4>
              <p class="text-gray-700">
                Comprehensive guidebook covering all aspects of school and boarding life.
              </p>
            </div>
            <div class="bg-white rounded-lg shadow-md p-6">
              <h4 class="text-xl font-bold text-gray-900 mb-4">Regular Updates</h4>
              <p class="text-gray-700">
                Parent Handbook is updated regularly to ensure the information provided is always current and accurate.
              </p>
            </div>
          </div>
        </div>
      `,
    },
    {
      slug: 'aaiibs-paydia',
      title: 'AAIIBS Paydia',
      titleEn: 'AAIIBS Paydia',
      order: 4,
      content: `
        <div class="max-w-5xl mx-auto">
          <div class="mb-12">
            <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              AAIIBS Paydia
            </h2>
            <p class="text-lg md:text-xl text-gray-700 leading-relaxed mb-6">
              AAIIBS Paydia adalah sistem pembayaran digital yang memudahkan orang tua untuk melakukan pembayaran berbagai keperluan sekolah secara online. Sistem ini dirancang untuk memberikan kemudahan, keamanan, dan transparansi dalam proses pembayaran.
            </p>
          </div>

          <div class="bg-gradient-to-r from-primary-50 to-primary-100 rounded-lg p-8 md:p-12 mb-12">
            <h3 class="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
              Fitur AAIIBS Paydia
            </h3>
            <div class="space-y-4 text-base md:text-lg text-gray-700 leading-relaxed">
              <p>
                AAIIBS Paydia menyediakan berbagai fitur untuk memudahkan pembayaran, antara lain:
              </p>
              <ul class="list-disc list-inside space-y-2 ml-4">
                <li>Pembayaran SPP (Sumbangan Pembinaan Pendidikan) bulanan</li>
                <li>Pembayaran uang makan dan kebutuhan pondok</li>
                <li>Pembayaran kegiatan ekstrakurikuler dan program khusus</li>
                <li>Pembayaran uang saku untuk anak</li>
                <li>Riwayat transaksi lengkap dan real-time</li>
                <li>Notifikasi pembayaran otomatis</li>
                <li>Berbagai metode pembayaran yang aman</li>
              </ul>
            </div>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            <div class="bg-white rounded-lg shadow-md p-6">
              <h4 class="text-xl font-bold text-gray-900 mb-4">Kemudahan</h4>
              <p class="text-gray-700">
                Pembayaran dapat dilakukan kapan saja dan di mana saja melalui aplikasi mobile atau website.
              </p>
            </div>
            <div class="bg-white rounded-lg shadow-md p-6">
              <h4 class="text-xl font-bold text-gray-900 mb-4">Keamanan</h4>
              <p class="text-gray-700">
                Sistem pembayaran yang aman dengan enkripsi data dan perlindungan transaksi untuk menjaga keamanan informasi finansial.
              </p>
            </div>
            <div class="bg-white rounded-lg shadow-md p-6">
              <h4 class="text-xl font-bold text-gray-900 mb-4">Transparansi</h4>
              <p class="text-gray-700">
                Riwayat transaksi yang lengkap dan detail untuk memudahkan orang tua memantau semua pembayaran yang telah dilakukan.
              </p>
            </div>
            <div class="bg-white rounded-lg shadow-md p-6">
              <h4 class="text-xl font-bold text-gray-900 mb-4">Notifikasi</h4>
              <p class="text-gray-700">
                Notifikasi otomatis untuk setiap transaksi yang dilakukan, memastikan orang tua selalu terinformasi.
              </p>
            </div>
          </div>

          <div class="bg-blue-50 rounded-lg p-8 md:p-12">
            <h3 class="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
              Unduh Aplikasi
            </h3>
            <p class="text-base md:text-lg text-gray-700 mb-6">
              AAIIBS Paydia tersedia untuk pengguna Android dan iOS. Unduh aplikasi sekarang untuk kemudahan pembayaran.
            </p>
            <div class="flex flex-col sm:flex-row gap-4">
              <a href="#" class="inline-flex items-center justify-center px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition">
                <span class="mr-2">📱</span>
                Download untuk Android
              </a>
              <a href="#" class="inline-flex items-center justify-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
                <span class="mr-2">📱</span>
                Download untuk iOS
              </a>
            </div>
          </div>
        </div>
      `,
      contentEn: `
        <div class="max-w-5xl mx-auto">
          <div class="mb-12">
            <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              AAIIBS Paydia
            </h2>
            <p class="text-lg md:text-xl text-gray-700 leading-relaxed mb-6">
              AAIIBS Paydia is a digital payment system that makes it easy for parents to make various school payments online. This system is designed to provide convenience, security, and transparency in the payment process.
            </p>
          </div>

          <div class="bg-gradient-to-r from-primary-50 to-primary-100 rounded-lg p-8 md:p-12 mb-12">
            <h3 class="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
              AAIIBS Paydia Features
            </h3>
            <div class="space-y-4 text-base md:text-lg text-gray-700 leading-relaxed">
              <p>
                AAIIBS Paydia provides various features to facilitate payments, including:
              </p>
              <ul class="list-disc list-inside space-y-2 ml-4">
                <li>Monthly SPP (Educational Development Contribution) payments</li>
                <li>Food and boarding needs payments</li>
                <li>Extracurricular activities and special program payments</li>
                <li>Pocket money for children</li>
                <li>Complete and real-time transaction history</li>
                <li>Automatic payment notifications</li>
                <li>Various secure payment methods</li>
              </ul>
            </div>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            <div class="bg-white rounded-lg shadow-md p-6">
              <h4 class="text-xl font-bold text-gray-900 mb-4">Convenience</h4>
              <p class="text-gray-700">
                Payments can be made anytime and anywhere through mobile app or website.
              </p>
            </div>
            <div class="bg-white rounded-lg shadow-md p-6">
              <h4 class="text-xl font-bold text-gray-900 mb-4">Security</h4>
              <p class="text-gray-700">
                Secure payment system with data encryption and transaction protection to maintain financial information security.
              </p>
            </div>
            <div class="bg-white rounded-lg shadow-md p-6">
              <h4 class="text-xl font-bold text-gray-900 mb-4">Transparency</h4>
              <p class="text-gray-700">
                Complete and detailed transaction history to help parents monitor all payments made.
              </p>
            </div>
            <div class="bg-white rounded-lg shadow-md p-6">
              <h4 class="text-xl font-bold text-gray-900 mb-4">Notifications</h4>
              <p class="text-gray-700">
                Automatic notifications for every transaction made, ensuring parents are always informed.
              </p>
            </div>
          </div>

          <div class="bg-blue-50 rounded-lg p-8 md:p-12">
            <h3 class="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
              Download App
            </h3>
            <p class="text-base md:text-lg text-gray-700 mb-6">
              AAIIBS Paydia is available for Android and iOS users. Download the app now for payment convenience.
            </p>
            <div class="flex flex-col sm:flex-row gap-4">
              <a href="#" class="inline-flex items-center justify-center px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition">
                <span class="mr-2">📱</span>
                Download for Android
              </a>
              <a href="#" class="inline-flex items-center justify-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
                <span class="mr-2">📱</span>
                Download for iOS
              </a>
            </div>
          </div>
        </div>
      `,
    },
  ]

  // Create submenu and pages for FASILITAS
  for (const submenu of submenuFasilitas) {
    const menuItem = await prisma.menu.upsert({
      where: { slug: submenu.slug },
      update: {
        parentId: fasilitasMenu.id,
        order: submenu.order,
      },
      create: {
        title: submenu.title,
        titleEn: submenu.titleEn,
        slug: submenu.slug,
        parentId: fasilitasMenu.id,
        order: submenu.order,
        isActive: true,
        menuType: 'page',
      },
    })

    // Create page for each submenu with template "with-header"
    await prisma.page.upsert({
      where: { slug: submenu.slug },
      update: {
        content: submenu.content,
        contentEn: submenu.contentEn,
        menuId: menuItem.id,
        template: 'with-header',
      },
      create: {
        title: submenu.title,
        titleEn: submenu.titleEn,
        slug: submenu.slug,
        content: submenu.content,
        contentEn: submenu.contentEn,
        excerpt: `Halaman ${submenu.title}`,
        excerptEn: `${submenu.titleEn} Page`,
        isPublished: true,
        publishedAt: new Date(),
        authorId: admin.id,
        menuId: menuItem.id,
        template: 'with-header',
      },
    })
  }

  const beritaMenu = await prisma.menu.upsert({
    where: { slug: 'berita' },
    update: {},
    create: {
      title: 'BERITA',
      titleEn: 'NEWS',
      slug: 'berita',
      order: 6,
      isActive: true,
      menuType: 'page',
    },
  })

  // Create submenu and categories for BERITA
  const submenuBerita = [
    {
      slug: 'berita-terbaru',
      title: 'Berita Terbaru',
      titleEn: 'Latest News',
      order: 1,
      postType: 'post',
      description: 'Berita dan informasi terbaru dari Al Azhar IIBS',
      descriptionEn: 'Latest news and information from Al Azhar IIBS',
    },
    {
      slug: 'jurnal-hamka',
      title: 'Jurnal Hamka',
      titleEn: 'Hamka Journal',
      order: 2,
      postType: 'article',
      description: 'Jurnal dan artikel ilmiah dari Al Azhar IIBS',
      descriptionEn: 'Scientific journals and articles from Al Azhar IIBS',
    },
    {
      slug: 'galeri-kegiatan',
      title: 'Galeri Kegiatan',
      titleEn: 'Activity Gallery',
      order: 3,
      postType: 'gallery',
      description: 'Galeri foto kegiatan dan acara di Al Azhar IIBS',
      descriptionEn: 'Photo gallery of activities and events at Al Azhar IIBS',
    },
    {
      slug: 'kegiatan-murid',
      title: 'Kegiatan Murid',
      titleEn: 'Student Activities',
      order: 4,
      postType: 'post',
      description: 'Berita dan informasi tentang kegiatan murid',
      descriptionEn: 'News and information about student activities',
    },
    {
      slug: 'artikel',
      title: 'Artikel',
      titleEn: 'Articles',
      order: 5,
      postType: 'article',
      description: 'Artikel dan tulisan menarik dari Al Azhar IIBS',
      descriptionEn: 'Interesting articles and writings from Al Azhar IIBS',
    },
    {
      slug: 'testimoni',
      title: 'Testimoni',
      titleEn: 'Testimonials',
      order: 6,
      postType: 'testimonial',
      description: 'Testimoni dari alumni, orang tua, dan mitra',
      descriptionEn: 'Testimonials from alumni, parents, and partners',
    },
    {
      slug: 'aaiibs-dalam-berita',
      title: 'AAIIBS dalam Berita',
      titleEn: 'AAIIBS in News',
      order: 7,
      postType: 'post',
      description: 'Liputan media tentang Al Azhar IIBS',
      descriptionEn: 'Media coverage about Al Azhar IIBS',
    },
    {
      slug: 'acara-mendatang',
      title: 'Acara Mendatang',
      titleEn: 'Upcoming Events',
      order: 8,
      postType: 'event',
      description: 'Informasi tentang acara dan kegiatan yang akan datang',
      descriptionEn: 'Information about upcoming events and activities',
    },
  ]

  // Create submenu and categories for BERITA
  for (const submenu of submenuBerita) {
    // Create category first
    const category = await (prisma as any).category.upsert({
      where: { slug: submenu.slug },
      update: {
        name: submenu.title,
        nameEn: submenu.titleEn,
        description: submenu.description,
        descriptionEn: submenu.descriptionEn,
        categoryType: 'general',
      },
      create: {
        name: submenu.title,
        nameEn: submenu.titleEn,
        slug: submenu.slug,
        description: submenu.description,
        descriptionEn: submenu.descriptionEn,
        categoryType: 'general',
        order: submenu.order,
        isActive: true,
      },
    })

    // Create menu item linked to category
    const menuItem = await prisma.menu.upsert({
      where: { slug: submenu.slug },
      update: {
        parentId: beritaMenu.id,
        order: submenu.order,
        menuType: 'category',
      },
      create: {
        title: submenu.title,
        titleEn: submenu.titleEn,
        slug: submenu.slug,
        parentId: beritaMenu.id,
        order: submenu.order,
        isActive: true,
        menuType: 'category',
        description: submenu.description,
        descriptionEn: submenu.descriptionEn,
      },
    })
  }

  const pendaftaranMenu = await prisma.menu.upsert({
    where: { slug: 'pendaftaran' },
    update: {},
    create: {
      title: 'PENDAFTARAN',
      titleEn: 'REGISTRATION',
      slug: 'pendaftaran',
      order: 7,
      isActive: true,
      menuType: 'page',
    },
  })

  // Create submenu for PENDAFTARAN
  const submenuPendaftaran = [
    {
      slug: 'alur-pendaftaran',
      title: 'Alur Pendaftaran',
      titleEn: 'Registration Process',
      order: 1,
      content: `
        <div class="max-w-5xl mx-auto">
          <div class="mb-12">
            <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Alur Pendaftaran
            </h2>
            <p class="text-lg md:text-xl text-gray-700 leading-relaxed mb-6">
              Al Azhar International Islamic Boarding School membuka pendaftaran untuk SMP Islam Al Azhar 51 IIBS Karanganyar dan SMA Islam Al Azhar 28 IIBS Karanganyar. Berikut adalah alur pendaftaran yang perlu diikuti oleh calon murid dan orang tua.
            </p>
          </div>

          <div class="bg-gradient-to-r from-primary-50 to-primary-100 rounded-lg p-8 md:p-12 mb-12">
            <h3 class="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
              Langkah-langkah Pendaftaran
            </h3>
            <div class="space-y-6">
              <div class="flex items-start">
                <div class="flex-shrink-0 w-10 h-10 bg-primary-600 text-white rounded-full flex items-center justify-center font-bold text-lg mr-4">
                  1
                </div>
                <div>
                  <h4 class="text-xl font-bold text-gray-900 mb-2">Mengirim Softfile Scan PDF Surat Pernyataan Pembiayaan</h4>
                  <p class="text-gray-700">
                    WAJIB dikirim sebelum melakukan transfer biaya pendaftaran. Download formulir:
                  </p>
                  <div class="mt-2 space-y-2">
                    <a href="#" class="text-red-600 hover:text-red-700 font-medium">SMP - Pakta Integritas Pembiayaan</a><br>
                    <a href="#" class="text-red-600 hover:text-red-700 font-medium">SMA - Pakta Integritas Pembiayaan</a>
                  </div>
                </div>
              </div>
              <div class="flex items-start">
                <div class="flex-shrink-0 w-10 h-10 bg-primary-600 text-white rounded-full flex items-center justify-center font-bold text-lg mr-4">
                  2
                </div>
                <div>
                  <h4 class="text-xl font-bold text-gray-900 mb-2">Transfer Biaya Pendaftaran</h4>
                  <p class="text-gray-700">
                    Lakukan transfer biaya pendaftaran sesuai dengan ketentuan yang berlaku.
                  </p>
                </div>
              </div>
              <div class="flex items-start">
                <div class="flex-shrink-0 w-10 h-10 bg-primary-600 text-white rounded-full flex items-center justify-center font-bold text-lg mr-4">
                  3
                </div>
                <div>
                  <h4 class="text-xl font-bold text-gray-900 mb-2">Mengisi Formulir Pendaftaran Online</h4>
                  <p class="text-gray-700">
                    Isi formulir pendaftaran online dengan lengkap dan benar sesuai dengan data yang diminta.
                  </p>
                </div>
              </div>
              <div class="flex items-start">
                <div class="flex-shrink-0 w-10 h-10 bg-primary-600 text-white rounded-full flex items-center justify-center font-bold text-lg mr-4">
                  4
                </div>
                <div>
                  <h4 class="text-xl font-bold text-gray-900 mb-2">Verifikasi Dokumen</h4>
                  <p class="text-gray-700">
                    Tim pendaftaran akan melakukan verifikasi dokumen yang telah dikirim.
                  </p>
                </div>
              </div>
              <div class="flex items-start">
                <div class="flex-shrink-0 w-10 h-10 bg-primary-600 text-white rounded-full flex items-center justify-center font-bold text-lg mr-4">
                  5
                </div>
                <div>
                  <h4 class="text-xl font-bold text-gray-900 mb-2">Pengumuman Hasil</h4>
                  <p class="text-gray-700">
                    Pengumuman hasil pendaftaran akan disampaikan melalui website atau kontak yang terdaftar.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div class="bg-blue-50 rounded-lg p-8 md:p-12">
            <h3 class="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
              Informasi Penting
            </h3>
            <p class="text-base md:text-lg text-gray-700">
              Untuk informasi lebih lanjut mengenai pendaftaran, silakan hubungi Call Center: <strong>0811 2020 101</strong> atau email: <strong>aaiibs@alazhariibs.sch.id</strong>
            </p>
          </div>
        </div>
      `,
      contentEn: `
        <div class="max-w-5xl mx-auto">
          <div class="mb-12">
            <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Registration Process
            </h2>
            <p class="text-lg md:text-xl text-gray-700 leading-relaxed mb-6">
              Al Azhar International Islamic Boarding School opens registration for SMP Islam Al Azhar 51 IIBS Karanganyar and SMA Islam Al Azhar 28 IIBS Karanganyar. The following is the registration process that needs to be followed by prospective students and parents.
            </p>
          </div>

          <div class="bg-gradient-to-r from-primary-50 to-primary-100 rounded-lg p-8 md:p-12 mb-12">
            <h3 class="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
              Registration Steps
            </h3>
            <div class="space-y-6">
              <div class="flex items-start">
                <div class="flex-shrink-0 w-10 h-10 bg-primary-600 text-white rounded-full flex items-center justify-center font-bold text-lg mr-4">
                  1
                </div>
                <div>
                  <h4 class="text-xl font-bold text-gray-900 mb-2">Send PDF Scan of Financing Statement</h4>
                  <p class="text-gray-700">
                    MANDATORY to send before making registration fee transfer. Download form:
                  </p>
                  <div class="mt-2 space-y-2">
                    <a href="#" class="text-red-600 hover:text-red-700 font-medium">Junior High - Financing Integrity Pact</a><br>
                    <a href="#" class="text-red-600 hover:text-red-700 font-medium">Senior High - Financing Integrity Pact</a>
                  </div>
                </div>
              </div>
              <div class="flex items-start">
                <div class="flex-shrink-0 w-10 h-10 bg-primary-600 text-white rounded-full flex items-center justify-center font-bold text-lg mr-4">
                  2
                </div>
                <div>
                  <h4 class="text-xl font-bold text-gray-900 mb-2">Transfer Registration Fee</h4>
                  <p class="text-gray-700">
                    Make registration fee transfer according to applicable regulations.
                  </p>
                </div>
              </div>
              <div class="flex items-start">
                <div class="flex-shrink-0 w-10 h-10 bg-primary-600 text-white rounded-full flex items-center justify-center font-bold text-lg mr-4">
                  3
                </div>
                <div>
                  <h4 class="text-xl font-bold text-gray-900 mb-2">Fill Online Registration Form</h4>
                  <p class="text-gray-700">
                    Fill out the online registration form completely and correctly according to the requested data.
                  </p>
                </div>
              </div>
              <div class="flex items-start">
                <div class="flex-shrink-0 w-10 h-10 bg-primary-600 text-white rounded-full flex items-center justify-center font-bold text-lg mr-4">
                  4
                </div>
                <div>
                  <h4 class="text-xl font-bold text-gray-900 mb-2">Document Verification</h4>
                  <p class="text-gray-700">
                    The registration team will verify the documents that have been sent.
                  </p>
                </div>
              </div>
              <div class="flex items-start">
                <div class="flex-shrink-0 w-10 h-10 bg-primary-600 text-white rounded-full flex items-center justify-center font-bold text-lg mr-4">
                  5
                </div>
                <div>
                  <h4 class="text-xl font-bold text-gray-900 mb-2">Result Announcement</h4>
                  <p class="text-gray-700">
                    Registration results will be announced through the website or registered contact.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div class="bg-blue-50 rounded-lg p-8 md:p-12">
            <h3 class="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
              Important Information
            </h3>
            <p class="text-base md:text-lg text-gray-700">
              For more information about registration, please contact Call Center: <strong>0811 2020 101</strong> or email: <strong>aaiibs@alazhariibs.sch.id</strong>
            </p>
          </div>
        </div>
      `,
    },
    {
      slug: 'program-al-fatih-academy',
      title: 'Program Al Fatih Academy',
      titleEn: 'Al Fatih Academy Program',
      order: 2,
      content: `
        <div class="max-w-5xl mx-auto">
          <div class="mb-12">
            <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Program Al Fatih Academy
            </h2>
            <p class="text-lg md:text-xl text-gray-700 leading-relaxed mb-6">
              Program Al Fatih Academy adalah program khusus yang dirancang untuk mengembangkan potensi peserta didik dengan pendekatan yang terintegrasi antara pendidikan akademik, pendidikan agama, dan pengembangan karakter. Program ini mengadopsi semangat "Spirit of Ghazi" yang sama dengan yang digaungkan Muhammad Al Fatih lima abad yang lalu.
            </p>
          </div>

          <div class="bg-gradient-to-r from-primary-50 to-primary-100 rounded-lg p-8 md:p-12 mb-12">
            <h3 class="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
              Keunggulan Program Al Fatih Academy
            </h3>
            <div class="space-y-4 text-base md:text-lg text-gray-700 leading-relaxed">
              <ul class="list-disc list-inside space-y-2 ml-4">
                <li>Pendidikan terintegrasi antara akademik dan agama</li>
                <li>Pengembangan karakter berbasis nilai-nilai Islam</li>
                <li>Program tahfizh Al-Qur'an dengan target 30 juz</li>
                <li>Pembelajaran bahasa Arab dan Inggris yang intensif</li>
                <li>Program internasional dan student exchange</li>
                <li>Fasilitas modern dan lengkap</li>
                <li>Pendampingan intensif dari ustadz dan ustadzah berpengalaman</li>
              </ul>
            </div>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div class="bg-white rounded-lg shadow-md p-6">
              <h4 class="text-xl font-bold text-gray-900 mb-4">Target Program</h4>
              <p class="text-gray-700">
                Mengembangkan peserta didik menjadi generasi yang unggul dalam akademik, kuat dalam agama, dan berkarakter mulia.
              </p>
            </div>
            <div class="bg-white rounded-lg shadow-md p-6">
              <h4 class="text-xl font-bold text-gray-900 mb-4">Metode Pembelajaran</h4>
              <p class="text-gray-700">
                Menggunakan metode pembelajaran yang modern, efektif, dan menyenangkan dengan pendekatan yang terintegrasi.
              </p>
            </div>
          </div>
        </div>
      `,
      contentEn: `
        <div class="max-w-5xl mx-auto">
          <div class="mb-12">
            <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Al Fatih Academy Program
            </h2>
            <p class="text-lg md:text-xl text-gray-700 leading-relaxed mb-6">
              Al Fatih Academy Program is a special program designed to develop student potential with an integrated approach between academic education, religious education, and character development. This program adopts the "Spirit of Ghazi" that was echoed by Muhammad Al Fatih five centuries ago.
            </p>
          </div>

          <div class="bg-gradient-to-r from-primary-50 to-primary-100 rounded-lg p-8 md:p-12 mb-12">
            <h3 class="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
              Al Fatih Academy Program Advantages
            </h3>
            <div class="space-y-4 text-base md:text-lg text-gray-700 leading-relaxed">
              <ul class="list-disc list-inside space-y-2 ml-4">
                <li>Integrated education between academic and religious</li>
                <li>Character development based on Islamic values</li>
                <li>Al-Qur'an tahfizh program with 30 juz target</li>
                <li>Intensive Arabic and English language learning</li>
                <li>International programs and student exchange</li>
                <li>Modern and complete facilities</li>
                <li>Intensive guidance from experienced ustadz and ustadzah</li>
              </ul>
            </div>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div class="bg-white rounded-lg shadow-md p-6">
              <h4 class="text-xl font-bold text-gray-900 mb-4">Program Target</h4>
              <p class="text-gray-700">
                Developing students to become a generation that excels academically, strong in religion, and has noble character.
              </p>
            </div>
            <div class="bg-white rounded-lg shadow-md p-6">
              <h4 class="text-xl font-bold text-gray-900 mb-4">Learning Methods</h4>
              <p class="text-gray-700">
                Using modern, effective, and enjoyable learning methods with an integrated approach.
              </p>
            </div>
          </div>
        </div>
      `,
    },
    {
      slug: 'program-murid-inden',
      title: 'Program Murid Inden',
      titleEn: 'Pre-Registration Program',
      order: 3,
      content: `
        <div class="max-w-5xl mx-auto">
          <div class="mb-12">
            <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Program Murid Inden
            </h2>
            <p class="text-lg md:text-xl text-gray-700 leading-relaxed mb-6">
              Oleh karena ketersediaan kuota murid yang terbatas, penerimaan murid baru di Al Azhar International Islamic Boarding School membuka sistem pendaftaran inden. Program ini memungkinkan orang tua untuk mendaftarkan anak mereka sejak dini, bahkan sejak kelas 1 SD/MI.
            </p>
          </div>

          <div class="bg-gradient-to-r from-primary-50 to-primary-100 rounded-lg p-8 md:p-12 mb-12">
            <h3 class="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
              Keuntungan Program Murid Inden
            </h3>
            <div class="space-y-4 text-base md:text-lg text-gray-700 leading-relaxed">
              <ul class="list-disc list-inside space-y-2 ml-4">
                <li>Memastikan kuota tersedia untuk anak Anda</li>
                <li>Dapat mendaftar sejak kelas 1 SD/MI</li>
                <li>Persiapan yang lebih matang untuk masuk ke Al Azhar IIBS</li>
                <li>Prioritas dalam proses seleksi</li>
                <li>Informasi dan update program secara berkala</li>
              </ul>
            </div>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            <div class="bg-white rounded-lg shadow-md p-6">
              <h4 class="text-xl font-bold text-gray-900 mb-4">Siapa yang Bisa Mendaftar?</h4>
              <p class="text-gray-700">
                Program Murid Inden terbuka untuk calon murid mulai dari kelas 1 SD/MI hingga kelas 6 SD/MI yang ingin melanjutkan pendidikan ke SMP Islam Al Azhar 51 IIBS atau SMA Islam Al Azhar 28 IIBS.
              </p>
            </div>
            <div class="bg-white rounded-lg shadow-md p-6">
              <h4 class="text-xl font-bold text-gray-900 mb-4">Cara Mendaftar</h4>
              <p class="text-gray-700">
                Orang tua dapat mendaftarkan anak mereka melalui formulir pendaftaran inden yang tersedia di website atau langsung menghubungi Call Center: 0811 2020 101.
              </p>
            </div>
          </div>

          <div class="bg-blue-50 rounded-lg p-8 md:p-12">
            <h3 class="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
              Informasi Lebih Lanjut
            </h3>
            <p class="text-base md:text-lg text-gray-700">
              Untuk informasi lebih detail mengenai Program Murid Inden, silakan hubungi Call Center: <strong>0811 2020 101</strong> atau email: <strong>aaiibs@alazhariibs.sch.id</strong>
            </p>
          </div>
        </div>
      `,
      contentEn: `
        <div class="max-w-5xl mx-auto">
          <div class="mb-12">
            <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Pre-Registration Program
            </h2>
            <p class="text-lg md:text-xl text-gray-700 leading-relaxed mb-6">
              Due to limited student quota availability, new student admissions at Al Azhar International Islamic Boarding School opens a pre-registration system. This program allows parents to register their children early, even from grade 1 of elementary school.
            </p>
          </div>

          <div class="bg-gradient-to-r from-primary-50 to-primary-100 rounded-lg p-8 md:p-12 mb-12">
            <h3 class="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
              Pre-Registration Program Benefits
            </h3>
            <div class="space-y-4 text-base md:text-lg text-gray-700 leading-relaxed">
              <ul class="list-disc list-inside space-y-2 ml-4">
                <li>Ensure quota availability for your child</li>
                <li>Can register from grade 1 of elementary school</li>
                <li>Better preparation for entering Al Azhar IIBS</li>
                <li>Priority in the selection process</li>
                <li>Regular program information and updates</li>
              </ul>
            </div>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            <div class="bg-white rounded-lg shadow-md p-6">
              <h4 class="text-xl font-bold text-gray-900 mb-4">Who Can Register?</h4>
              <p class="text-gray-700">
                Pre-Registration Program is open to prospective students from grade 1 to grade 6 of elementary school who want to continue their education to SMP Islam Al Azhar 51 IIBS or SMA Islam Al Azhar 28 IIBS.
              </p>
            </div>
            <div class="bg-white rounded-lg shadow-md p-6">
              <h4 class="text-xl font-bold text-gray-900 mb-4">How to Register</h4>
              <p class="text-gray-700">
                Parents can register their children through the pre-registration form available on the website or directly contact Call Center: 0811 2020 101.
              </p>
            </div>
          </div>

          <div class="bg-blue-50 rounded-lg p-8 md:p-12">
            <h3 class="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
              More Information
            </h3>
            <p class="text-base md:text-lg text-gray-700">
              For more detailed information about the Pre-Registration Program, please contact Call Center: <strong>0811 2020 101</strong> or email: <strong>aaiibs@alazhariibs.sch.id</strong>
            </p>
          </div>
        </div>
      `,
    },
    {
      slug: 'data-awal-animo-calon-murid',
      title: 'Data Awal Animo Calon Murid',
      titleEn: 'Initial Interest Data of Prospective Students',
      order: 4,
      content: `
        <div class="max-w-5xl mx-auto">
          <div class="mb-12">
            <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Data Awal Animo Calon Murid
            </h2>
            <p class="text-lg md:text-xl text-gray-700 leading-relaxed mb-6">
              Formulir ini digunakan untuk mengumpulkan data awal minat calon murid dan orang tua terhadap Al Azhar International Islamic Boarding School. Data ini akan membantu kami dalam merencanakan dan mempersiapkan penerimaan murid baru dengan lebih baik.
            </p>
          </div>

          <div class="bg-gradient-to-r from-primary-50 to-primary-100 rounded-lg p-8 md:p-12 mb-12">
            <h3 class="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
              Informasi yang Diperlukan
            </h3>
            <div class="space-y-4 text-base md:text-lg text-gray-700 leading-relaxed">
              <p>
                Formulir Data Awal Animo Calon Murid mencakup informasi berikut:
              </p>
              <ul class="list-disc list-inside space-y-2 ml-4">
                <li>Data calon murid (nama, tanggal lahir, kelas saat ini, dll)</li>
                <li>Data orang tua/wali (nama, kontak, pekerjaan, dll)</li>
                <li>Minat dan motivasi mendaftar ke Al Azhar IIBS</li>
                <li>Program yang diminati (SMP atau SMA)</li>
                <li>Rencana waktu pendaftaran</li>
                <li>Pertanyaan atau informasi tambahan yang diperlukan</li>
              </ul>
            </div>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div class="bg-white rounded-lg shadow-md p-6">
              <h4 class="text-xl font-bold text-gray-900 mb-4">Tujuan Pengumpulan Data</h4>
              <p class="text-gray-700">
                Data ini digunakan untuk membantu sekolah dalam merencanakan kuota, menyiapkan fasilitas, dan memberikan informasi yang tepat kepada calon murid dan orang tua.
              </p>
            </div>
            <div class="bg-white rounded-lg shadow-md p-6">
              <h4 class="text-xl font-bold text-gray-900 mb-4">Kerahasiaan Data</h4>
              <p class="text-gray-700">
                Semua data yang dikumpulkan akan dijaga kerahasiaannya dan hanya digunakan untuk keperluan administrasi dan perencanaan sekolah.
              </p>
            </div>
          </div>
        </div>
      `,
      contentEn: `
        <div class="max-w-5xl mx-auto">
          <div class="mb-12">
            <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Initial Interest Data of Prospective Students
            </h2>
            <p class="text-lg md:text-xl text-gray-700 leading-relaxed mb-6">
              This form is used to collect initial interest data from prospective students and parents regarding Al Azhar International Islamic Boarding School. This data will help us in planning and preparing for new student admissions better.
            </p>
          </div>

          <div class="bg-gradient-to-r from-primary-50 to-primary-100 rounded-lg p-8 md:p-12 mb-12">
            <h3 class="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
              Required Information
            </h3>
            <div class="space-y-4 text-base md:text-lg text-gray-700 leading-relaxed">
              <p>
                Initial Interest Data Form includes the following information:
              </p>
              <ul class="list-disc list-inside space-y-2 ml-4">
                <li>Prospective student data (name, date of birth, current grade, etc.)</li>
                <li>Parent/guardian data (name, contact, occupation, etc.)</li>
                <li>Interest and motivation to register at Al Azhar IIBS</li>
                <li>Program of interest (Junior High or Senior High)</li>
                <li>Registration time plan</li>
                <li>Questions or additional information needed</li>
              </ul>
            </div>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div class="bg-white rounded-lg shadow-md p-6">
              <h4 class="text-xl font-bold text-gray-900 mb-4">Data Collection Purpose</h4>
              <p class="text-gray-700">
                This data is used to help the school in planning quotas, preparing facilities, and providing accurate information to prospective students and parents.
              </p>
            </div>
            <div class="bg-white rounded-lg shadow-md p-6">
              <h4 class="text-xl font-bold text-gray-900 mb-4">Data Confidentiality</h4>
              <p class="text-gray-700">
                All collected data will be kept confidential and only used for school administration and planning purposes.
              </p>
            </div>
          </div>
        </div>
      `,
    },
    {
      slug: 'qna',
      title: 'QnA (Question & Answer)',
      titleEn: 'QnA (Question & Answer)',
      order: 5,
      content: `
        <div class="max-w-5xl mx-auto">
          <div class="mb-12">
            <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              QnA (Question & Answer)
            </h2>
            <p class="text-lg md:text-xl text-gray-700 leading-relaxed mb-6">
              Berikut adalah pertanyaan yang sering diajukan (FAQ) mengenai Al Azhar International Islamic Boarding School. Jika Anda memiliki pertanyaan yang belum terjawab di sini, silakan hubungi kami melalui kontak yang tersedia.
            </p>
          </div>

          <div class="space-y-6">
            <div class="bg-white rounded-lg shadow-md p-6">
              <h3 class="text-2xl font-bold text-gray-900 mb-4">Apa Program Unggulan Al Azhar IIBS?</h3>
              <p class="text-gray-700">
                1. Super QC merupakan 4 program unggulan di AAIIBS, yang mengarahkan para murid untuk belajar sesuai dengan minat bakatnya yaitu menjadi saintis, ulama, profesional, atau Entrepreneur yang dibungkus dengan nilai-nilai Al-Qur'an dan adab islami.<br>
                2. Pengembangan kemampuan bahasa Arab dan bahasa Inggris yang intensif<br>
                3. Pembekalan pemahaman agama melalui kurikulum adab, materi kepondokan, dan target hafalan Al-Qur'an 30 juz
              </p>
            </div>

            <div class="bg-white rounded-lg shadow-md p-6">
              <h3 class="text-2xl font-bold text-gray-900 mb-4">Apakah Bisa Mendaftarkan Anak yang Masih Kelas 4 SD?</h3>
              <p class="text-gray-700">
                Bisa, AAIIBS menerima pendaftaran inden sejak kelas 1 SD/MI. Program Murid Inden memungkinkan orang tua untuk mendaftarkan anak mereka sejak dini untuk memastikan kuota tersedia.
              </p>
            </div>

            <div class="bg-white rounded-lg shadow-md p-6">
              <h3 class="text-2xl font-bold text-gray-900 mb-4">Apakah Lulusan AAIIBS Bisa Diterima di PTN?</h3>
              <p class="text-gray-700">
                Bisa, InsyaAllah. AAIIBS adalah lembaga pendidikan formal yang menginduk pada dinas pendidikan Provinsi Jawa Tengah sehingga tidak perlu penyetaraan ijazah lagi. Juga sudah terjalinnya kerjasama antara Al Azhar dengan beberapa PTN yang ternama di dalam negeri maupun di luar negeri.
              </p>
            </div>

            <div class="bg-white rounded-lg shadow-md p-6">
              <h3 class="text-2xl font-bold text-gray-900 mb-4">Bagaimana Orangtua Mendapat Report Tentang Anaknya?</h3>
              <p class="text-gray-700">
                Setiap saat wali santri dapat mengetahui perkembangan santri melalui musrif dan musrifah. Wali santri juga dapat memantau kegiatan santri baik di sekolah maupun di asrama melalui online melalui Parent Corner dan portal yang tersedia.
              </p>
            </div>

            <div class="bg-white rounded-lg shadow-md p-6">
              <h3 class="text-2xl font-bold text-gray-900 mb-4">Berapa Biaya Pendaftaran?</h3>
              <p class="text-gray-700">
                Untuk informasi lengkap mengenai biaya pendaftaran dan biaya pendidikan, silakan hubungi Call Center: 0811 2020 101 atau email: aaiibs@alazhariibs.sch.id
              </p>
            </div>

            <div class="bg-white rounded-lg shadow-md p-6">
              <h3 class="text-2xl font-bold text-gray-900 mb-4">Apa Saja Dokumen yang Diperlukan untuk Pendaftaran?</h3>
              <p class="text-gray-700">
                Dokumen yang diperlukan meliputi: Surat Pernyataan Pembiayaan (Pakta Integritas), fotokopi akta kelahiran, fotokopi KTP orang tua, fotokopi KK, pas foto, dan dokumen pendukung lainnya. Informasi lengkap dapat dilihat di halaman Alur Pendaftaran.
              </p>
            </div>
          </div>

          <div class="mt-12 bg-blue-50 rounded-lg p-8 md:p-12">
            <h3 class="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
              Masih Ada Pertanyaan?
            </h3>
            <p class="text-base md:text-lg text-gray-700">
              Jika Anda masih memiliki pertanyaan yang belum terjawab, silakan hubungi kami melalui Call Center: <strong>0811 2020 101</strong> atau email: <strong>aaiibs@alazhariibs.sch.id</strong>
            </p>
          </div>
        </div>
      `,
      contentEn: `
        <div class="max-w-5xl mx-auto">
          <div class="mb-12">
            <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              QnA (Question & Answer)
            </h2>
            <p class="text-lg md:text-xl text-gray-700 leading-relaxed mb-6">
              The following are frequently asked questions (FAQ) about Al Azhar International Islamic Boarding School. If you have questions that are not answered here, please contact us through the available contacts.
            </p>
          </div>

          <div class="space-y-6">
            <div class="bg-white rounded-lg shadow-md p-6">
              <h3 class="text-2xl font-bold text-gray-900 mb-4">What are the Flagship Programs of Al Azhar IIBS?</h3>
              <p class="text-gray-700">
                1. Super QC is 4 flagship programs at AAIIBS, which direct students to learn according to their interests and talents, namely becoming scientists, scholars, professionals, or Entrepreneurs wrapped in Al-Qur'an values and Islamic adab.<br>
                2. Intensive development of Arabic and English language skills<br>
                3. Religious understanding through adab curriculum, boarding materials, and Al-Qur'an memorization target of 30 juz
              </p>
            </div>

            <div class="bg-white rounded-lg shadow-md p-6">
              <h3 class="text-2xl font-bold text-gray-900 mb-4">Can I Register a Child Who is Still in Grade 4 of Elementary School?</h3>
              <p class="text-gray-700">
                Yes, AAIIBS accepts pre-registration from grade 1 of elementary school. The Pre-Registration Program allows parents to register their children early to ensure quota availability.
              </p>
            </div>

            <div class="bg-white rounded-lg shadow-md p-6">
              <h3 class="text-2xl font-bold text-gray-900 mb-4">Can AAIIBS Graduates Be Accepted at State Universities?</h3>
              <p class="text-gray-700">
                Yes, InshaAllah. AAIIBS is a formal educational institution under the Central Java Provincial Education Office, so there is no need for diploma equivalency. There is also cooperation between Al Azhar and several well-known state universities both domestically and abroad.
              </p>
            </div>

            <div class="bg-white rounded-lg shadow-md p-6">
              <h3 class="text-2xl font-bold text-gray-900 mb-4">How Do Parents Get Reports About Their Children?</h3>
              <p class="text-gray-700">
                At any time, guardians can find out about student development through musrif and musrifah. Guardians can also monitor student activities both at school and in the dormitory online through Parent Corner and the available portal.
              </p>
            </div>

            <div class="bg-white rounded-lg shadow-md p-6">
              <h3 class="text-2xl font-bold text-gray-900 mb-4">What is the Registration Fee?</h3>
              <p class="text-gray-700">
                For complete information about registration fees and education costs, please contact Call Center: 0811 2020 101 or email: aaiibs@alazhariibs.sch.id
              </p>
            </div>

            <div class="bg-white rounded-lg shadow-md p-6">
              <h3 class="text-2xl font-bold text-gray-900 mb-4">What Documents are Required for Registration?</h3>
              <p class="text-gray-700">
                Required documents include: Financing Statement (Integrity Pact), birth certificate copy, parent ID card copy, family card copy, photos, and other supporting documents. Complete information can be found on the Registration Process page.
              </p>
            </div>
          </div>

          <div class="mt-12 bg-blue-50 rounded-lg p-8 md:p-12">
            <h3 class="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
              Still Have Questions?
            </h3>
            <p class="text-base md:text-lg text-gray-700">
              If you still have unanswered questions, please contact us through Call Center: <strong>0811 2020 101</strong> or email: <strong>aaiibs@alazhariibs.sch.id</strong>
            </p>
          </div>
        </div>
      `,
    },
    {
      slug: 'brosur',
      title: 'Brosur',
      titleEn: 'Brochure',
      order: 6,
      content: `
        <div class="max-w-5xl mx-auto">
          <div class="mb-12">
            <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Brosur
            </h2>
            <p class="text-lg md:text-xl text-gray-700 leading-relaxed mb-6">
              Download brosur Al Azhar International Islamic Boarding School untuk mendapatkan informasi lengkap tentang program pendidikan, fasilitas, dan berbagai informasi penting lainnya.
            </p>
          </div>

          <div class="bg-gradient-to-r from-primary-50 to-primary-100 rounded-lg p-8 md:p-12 mb-12">
            <h3 class="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
              Brosur Tersedia
            </h3>
            <div class="space-y-4">
              <div class="bg-white rounded-lg shadow-md p-6">
                <h4 class="text-xl font-bold text-gray-900 mb-4">Brosur SMP Islam Al Azhar 51 IIBS</h4>
                <p class="text-gray-700 mb-4">
                  Brosur lengkap untuk SMP Islam Al Azhar 51 IIBS Karanganyar yang mencakup informasi program, kurikulum, fasilitas, dan informasi pendaftaran.
                </p>
                <a href="#" class="inline-flex items-center px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition">
                  <span class="mr-2">📄</span>
                  Download Brosur SMP
                </a>
              </div>
              <div class="bg-white rounded-lg shadow-md p-6">
                <h4 class="text-xl font-bold text-gray-900 mb-4">Brosur SMA Islam Al Azhar 28 IIBS</h4>
                <p class="text-gray-700 mb-4">
                  Brosur lengkap untuk SMA Islam Al Azhar 28 IIBS Karanganyar yang mencakup informasi program, kurikulum, fasilitas, dan informasi pendaftaran.
                </p>
                <a href="#" class="inline-flex items-center px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition">
                  <span class="mr-2">📄</span>
                  Download Brosur SMA
                </a>
              </div>
              <div class="bg-white rounded-lg shadow-md p-6">
                <h4 class="text-xl font-bold text-gray-900 mb-4">Brosur Umum Al Azhar IIBS</h4>
                <p class="text-gray-700 mb-4">
                  Brosur umum yang mencakup informasi lengkap tentang Al Azhar International Islamic Boarding School, program unggulan, dan visi misi sekolah.
                </p>
                <a href="#" class="inline-flex items-center px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition">
                  <span class="mr-2">📄</span>
                  Download Brosur Umum
                </a>
              </div>
            </div>
          </div>

          <div class="bg-blue-50 rounded-lg p-8 md:p-12">
            <h3 class="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
              Informasi Tambahan
            </h3>
            <p class="text-base md:text-lg text-gray-700">
              Untuk mendapatkan brosur dalam bentuk fisik atau informasi lebih lanjut, silakan hubungi Call Center: <strong>0811 2020 101</strong> atau email: <strong>aaiibs@alazhariibs.sch.id</strong>
            </p>
          </div>
        </div>
      `,
      contentEn: `
        <div class="max-w-5xl mx-auto">
          <div class="mb-12">
            <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Brochure
            </h2>
            <p class="text-lg md:text-xl text-gray-700 leading-relaxed mb-6">
              Download Al Azhar International Islamic Boarding School brochure to get complete information about educational programs, facilities, and other important information.
            </p>
          </div>

          <div class="bg-gradient-to-r from-primary-50 to-primary-100 rounded-lg p-8 md:p-12 mb-12">
            <h3 class="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
              Available Brochures
            </h3>
            <div class="space-y-4">
              <div class="bg-white rounded-lg shadow-md p-6">
                <h4 class="text-xl font-bold text-gray-900 mb-4">Junior High School Brochure</h4>
                <p class="text-gray-700 mb-4">
                  Complete brochure for SMP Islam Al Azhar 51 IIBS Karanganyar covering program information, curriculum, facilities, and registration information.
                </p>
                <a href="#" class="inline-flex items-center px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition">
                  <span class="mr-2">📄</span>
                  Download Junior High Brochure
                </a>
              </div>
              <div class="bg-white rounded-lg shadow-md p-6">
                <h4 class="text-xl font-bold text-gray-900 mb-4">Senior High School Brochure</h4>
                <p class="text-gray-700 mb-4">
                  Complete brochure for SMA Islam Al Azhar 28 IIBS Karanganyar covering program information, curriculum, facilities, and registration information.
                </p>
                <a href="#" class="inline-flex items-center px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition">
                  <span class="mr-2">📄</span>
                  Download Senior High Brochure
                </a>
              </div>
              <div class="bg-white rounded-lg shadow-md p-6">
                <h4 class="text-xl font-bold text-gray-900 mb-4">General Brochure</h4>
                <p class="text-gray-700 mb-4">
                  General brochure covering complete information about Al Azhar International Islamic Boarding School, flagship programs, and school vision and mission.
                </p>
                <a href="#" class="inline-flex items-center px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition">
                  <span class="mr-2">📄</span>
                  Download General Brochure
                </a>
              </div>
            </div>
          </div>

          <div class="bg-blue-50 rounded-lg p-8 md:p-12">
            <h3 class="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
              Additional Information
            </h3>
            <p class="text-base md:text-lg text-gray-700">
              To get physical brochures or more information, please contact Call Center: <strong>0811 2020 101</strong> or email: <strong>aaiibs@alazhariibs.sch.id</strong>
            </p>
          </div>
        </div>
      `,
    },
  ]

  // Create submenu and pages for PENDAFTARAN
  for (const submenu of submenuPendaftaran) {
    const menuItem = await prisma.menu.upsert({
      where: { slug: submenu.slug },
      update: {
        parentId: pendaftaranMenu.id,
        order: submenu.order,
      },
      create: {
        title: submenu.title,
        titleEn: submenu.titleEn,
        slug: submenu.slug,
        parentId: pendaftaranMenu.id,
        order: submenu.order,
        isActive: true,
        menuType: 'page',
      },
    })

    // Create page for each submenu with template "with-header"
    await prisma.page.upsert({
      where: { slug: submenu.slug },
      update: {
        content: submenu.content,
        contentEn: submenu.contentEn,
        menuId: menuItem.id,
        template: 'with-header',
      },
      create: {
        title: submenu.title,
        titleEn: submenu.titleEn,
        slug: submenu.slug,
        content: submenu.content,
        contentEn: submenu.contentEn,
        excerpt: `Halaman ${submenu.title}`,
        excerptEn: `${submenu.titleEn} Page`,
        isPublished: true,
        publishedAt: new Date(),
        authorId: admin.id,
        menuId: menuItem.id,
        template: 'with-header',
      },
    })
  }

  const kontakMenu = await prisma.menu.upsert({
    where: { slug: 'kontak' },
    update: {},
    create: {
      title: 'KONTAK',
      titleEn: 'CONTACT',
      slug: 'kontak',
      order: 8,
      isActive: true,
      menuType: 'page',
    },
  })

  // Create submenu for KONTAK
  const submenuKontak = [
    {
      slug: 'alamat',
      title: 'Alamat',
      titleEn: 'Address',
      order: 1,
      content: `
        <div class="max-w-5xl mx-auto">
          <div class="mb-12">
            <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Alamat
            </h2>
            <p class="text-lg md:text-xl text-gray-700 leading-relaxed mb-6">
              Hubungi kami atau kunjungi kampus Al Azhar International Islamic Boarding School. Kami siap membantu Anda dengan informasi lebih lanjut tentang program pendidikan, pendaftaran, dan berbagai informasi lainnya.
            </p>
          </div>

          <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            <div class="space-y-6">
              <div class="bg-white rounded-lg shadow-md p-6">
                <div class="flex items-start">
                  <div class="flex-shrink-0 w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mr-4">
                    <svg class="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                    </svg>
                  </div>
                  <div>
                    <h3 class="text-xl font-bold text-gray-900 mb-2">Alamat Kantor</h3>
                    <p class="text-gray-700">
                      Jl. Raya Solo - Tawangmangu, Gedangan, Salam, Kec. Karangpandan, Kabupaten Karanganyar, Jawa Tengah 57791
                    </p>
                  </div>
                </div>
              </div>

              <div class="bg-white rounded-lg shadow-md p-6">
                <div class="flex items-start">
                  <div class="flex-shrink-0 w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mr-4">
                    <svg class="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                    </svg>
                  </div>
                  <div>
                    <h3 class="text-xl font-bold text-gray-900 mb-2">Email</h3>
                    <p class="text-gray-700">
                      <a href="mailto:aaiibs@alazhariibs.sch.id" class="text-primary-600 hover:text-primary-700">aaiibs@alazhariibs.sch.id</a>
                    </p>
                  </div>
                </div>
              </div>

              <div class="bg-white rounded-lg shadow-md p-6">
                <div class="flex items-start">
                  <div class="flex-shrink-0 w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mr-4">
                    <svg class="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                    </svg>
                  </div>
                  <div>
                    <h3 class="text-xl font-bold text-gray-900 mb-2">Call Center</h3>
                    <p class="text-gray-700">
                      <a href="tel:08112020101" class="text-primary-600 hover:text-primary-700">0811 2020 101</a>
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div class="bg-white rounded-lg shadow-md p-6">
              <h3 class="text-xl font-bold text-gray-900 mb-4">Peta Lokasi</h3>
              <div class="aspect-video bg-gray-200 rounded-lg overflow-hidden">
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3954.1234567890123!2d110.987654321!3d-7.654321098765432!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zN8KwMzknMTUuNiJTIDExMMKwNTknMTUuNiJF!5e0!3m2!1sid!2sid!4v1234567890123!5m2!1sid!2sid" 
                  width="100%" 
                  height="100%" 
                  style="border:0;" 
                  allowfullscreen="" 
                  loading="lazy" 
                  referrerpolicy="no-referrer-when-downgrade"
                  class="w-full h-full">
                </iframe>
              </div>
              <p class="text-sm text-gray-600 mt-4">
                Al Azhar International Islamic Boarding School<br>
                Jl. Raya Solo - Tawangmangu, Gedangan, Salam, Kec. Karangpandan, Kabupaten Karanganyar, Jawa Tengah 57791
              </p>
            </div>
          </div>

          <div class="bg-gradient-to-r from-primary-50 to-primary-100 rounded-lg p-8 md:p-12">
            <h3 class="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
              Jam Operasional
            </h3>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-base md:text-lg text-gray-700">
              <div>
                <p><strong>Senin - Jumat:</strong> 08:00 - 16:00 WIB</p>
                <p><strong>Sabtu:</strong> 08:00 - 12:00 WIB</p>
                <p><strong>Minggu:</strong> Tutup</p>
              </div>
              <div>
                <p>Untuk kunjungan di luar jam operasional, silakan hubungi terlebih dahulu melalui Call Center atau email untuk membuat janji temu.</p>
              </div>
            </div>
          </div>
        </div>
      `,
      contentEn: `
        <div class="max-w-5xl mx-auto">
          <div class="mb-12">
            <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Address
            </h2>
            <p class="text-lg md:text-xl text-gray-700 leading-relaxed mb-6">
              Contact us or visit Al Azhar International Islamic Boarding School campus. We are ready to help you with further information about educational programs, registration, and other information.
            </p>
          </div>

          <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            <div class="space-y-6">
              <div class="bg-white rounded-lg shadow-md p-6">
                <div class="flex items-start">
                  <div class="flex-shrink-0 w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mr-4">
                    <svg class="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                    </svg>
                  </div>
                  <div>
                    <h3 class="text-xl font-bold text-gray-900 mb-2">Office Address</h3>
                    <p class="text-gray-700">
                      Jl. Raya Solo - Tawangmangu, Gedangan, Salam, Kec. Karangpandan, Kabupaten Karanganyar, Jawa Tengah 57791
                    </p>
                  </div>
                </div>
              </div>

              <div class="bg-white rounded-lg shadow-md p-6">
                <div class="flex items-start">
                  <div class="flex-shrink-0 w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mr-4">
                    <svg class="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                    </svg>
                  </div>
                  <div>
                    <h3 class="text-xl font-bold text-gray-900 mb-2">Email</h3>
                    <p class="text-gray-700">
                      <a href="mailto:aaiibs@alazhariibs.sch.id" class="text-primary-600 hover:text-primary-700">aaiibs@alazhariibs.sch.id</a>
                    </p>
                  </div>
                </div>
              </div>

              <div class="bg-white rounded-lg shadow-md p-6">
                <div class="flex items-start">
                  <div class="flex-shrink-0 w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mr-4">
                    <svg class="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                    </svg>
                  </div>
                  <div>
                    <h3 class="text-xl font-bold text-gray-900 mb-2">Call Center</h3>
                    <p class="text-gray-700">
                      <a href="tel:08112020101" class="text-primary-600 hover:text-primary-700">0811 2020 101</a>
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div class="bg-white rounded-lg shadow-md p-6">
              <h3 class="text-xl font-bold text-gray-900 mb-4">Location Map</h3>
              <div class="aspect-video bg-gray-200 rounded-lg overflow-hidden">
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3954.1234567890123!2d110.987654321!3d-7.654321098765432!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zN8KwMzknMTUuNiJTIDExMMKwNTknMTUuNiJF!5e0!3m2!1sid!2sid!4v1234567890123!5m2!1sid!2sid" 
                  width="100%" 
                  height="100%" 
                  style="border:0;" 
                  allowfullscreen="" 
                  loading="lazy" 
                  referrerpolicy="no-referrer-when-downgrade"
                  class="w-full h-full">
                </iframe>
              </div>
              <p class="text-sm text-gray-600 mt-4">
                Al Azhar International Islamic Boarding School<br>
                Jl. Raya Solo - Tawangmangu, Gedangan, Salam, Kec. Karangpandan, Kabupaten Karanganyar, Jawa Tengah 57791
              </p>
            </div>
          </div>

          <div class="bg-gradient-to-r from-primary-50 to-primary-100 rounded-lg p-8 md:p-12">
            <h3 class="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
              Operating Hours
            </h3>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-base md:text-lg text-gray-700">
              <div>
                <p><strong>Monday - Friday:</strong> 08:00 - 16:00 WIB</p>
                <p><strong>Saturday:</strong> 08:00 - 12:00 WIB</p>
                <p><strong>Sunday:</strong> Closed</p>
              </div>
              <div>
                <p>For visits outside operating hours, please contact us first via Call Center or email to make an appointment.</p>
              </div>
            </div>
          </div>
        </div>
      `,
    },
    {
      slug: 'form-kunjungan',
      title: 'Form Kunjungan',
      titleEn: 'Visit Form',
      order: 2,
      content: `
        <div class="max-w-5xl mx-auto">
          <div class="mb-12">
            <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Form Kunjungan
            </h2>
            <p class="text-lg md:text-xl text-gray-700 leading-relaxed mb-6">
              Isi formulir di bawah ini untuk mengajukan kunjungan ke Al Azhar International Islamic Boarding School. Tim kami akan menghubungi Anda untuk konfirmasi dan mengatur jadwal kunjungan.
            </p>
          </div>

          <div class="bg-white rounded-lg shadow-md p-8 md:p-12">
            <form class="space-y-6">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label for="nama" class="block text-sm font-medium text-gray-700 mb-2">Nama Lengkap *</label>
                  <input type="text" id="nama" name="nama" required class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500">
                </div>
                <div>
                  <label for="email" class="block text-sm font-medium text-gray-700 mb-2">Email *</label>
                  <input type="email" id="email" name="email" required class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500">
                </div>
              </div>

              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label for="telepon" class="block text-sm font-medium text-gray-700 mb-2">Nomor Telepon *</label>
                  <input type="tel" id="telepon" name="telepon" required class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500">
                </div>
                <div>
                  <label for="tanggal" class="block text-sm font-medium text-gray-700 mb-2">Tanggal Kunjungan yang Diinginkan *</label>
                  <input type="date" id="tanggal" name="tanggal" required class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500">
                </div>
              </div>

              <div>
                <label for="jumlah" class="block text-sm font-medium text-gray-700 mb-2">Jumlah Pengunjung *</label>
                <input type="number" id="jumlah" name="jumlah" min="1" required class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500">
              </div>

              <div>
                <label for="tujuan" class="block text-sm font-medium text-gray-700 mb-2">Tujuan Kunjungan *</label>
                <select id="tujuan" name="tujuan" required class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500">
                  <option value="">Pilih Tujuan Kunjungan</option>
                  <option value="informasi-pendaftaran">Informasi Pendaftaran</option>
                  <option value="kunjungan-sekolah">Kunjungan Sekolah</option>
                  <option value="kunjungan-fasilitas">Kunjungan Fasilitas</option>
                  <option value="pertemuan-dengan-pimpinan">Pertemuan dengan Pimpinan</option>
                  <option value="lainnya">Lainnya</option>
                </select>
              </div>

              <div>
                <label for="pesan" class="block text-sm font-medium text-gray-700 mb-2">Pesan atau Pertanyaan</label>
                <textarea id="pesan" name="pesan" rows="4" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"></textarea>
              </div>

              <div class="flex items-start">
                <input type="checkbox" id="setuju" name="setuju" required class="mt-1 mr-2">
                <label for="setuju" class="text-sm text-gray-700">
                  Saya menyetujui bahwa data yang saya berikan akan digunakan untuk keperluan komunikasi dan konfirmasi kunjungan. *
                </label>
              </div>

              <div>
                <button type="submit" class="w-full md:w-auto px-8 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition font-medium">
                  Kirim Formulir
                </button>
              </div>
            </form>
          </div>

          <div class="mt-12 bg-blue-50 rounded-lg p-8 md:p-12">
            <h3 class="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
              Informasi Tambahan
            </h3>
            <p class="text-base md:text-lg text-gray-700">
              Setelah mengirim formulir, tim kami akan menghubungi Anda dalam 1-2 hari kerja untuk konfirmasi dan mengatur jadwal kunjungan. Jika Anda memiliki pertanyaan mendesak, silakan hubungi Call Center: <strong>0811 2020 101</strong> atau email: <strong>aaiibs@alazhariibs.sch.id</strong>
            </p>
          </div>
        </div>
      `,
      contentEn: `
        <div class="max-w-5xl mx-auto">
          <div class="mb-12">
            <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Visit Form
            </h2>
            <p class="text-lg md:text-xl text-gray-700 leading-relaxed mb-6">
              Fill out the form below to request a visit to Al Azhar International Islamic Boarding School. Our team will contact you for confirmation and to schedule your visit.
            </p>
          </div>

          <div class="bg-white rounded-lg shadow-md p-8 md:p-12">
            <form class="space-y-6">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label for="nama" class="block text-sm font-medium text-gray-700 mb-2">Full Name *</label>
                  <input type="text" id="nama" name="nama" required class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500">
                </div>
                <div>
                  <label for="email" class="block text-sm font-medium text-gray-700 mb-2">Email *</label>
                  <input type="email" id="email" name="email" required class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500">
                </div>
              </div>

              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label for="telepon" class="block text-sm font-medium text-gray-700 mb-2">Phone Number *</label>
                  <input type="tel" id="telepon" name="telepon" required class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500">
                </div>
                <div>
                  <label for="tanggal" class="block text-sm font-medium text-gray-700 mb-2">Preferred Visit Date *</label>
                  <input type="date" id="tanggal" name="tanggal" required class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500">
                </div>
              </div>

              <div>
                <label for="jumlah" class="block text-sm font-medium text-gray-700 mb-2">Number of Visitors *</label>
                <input type="number" id="jumlah" name="jumlah" min="1" required class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500">
              </div>

              <div>
                <label for="tujuan" class="block text-sm font-medium text-gray-700 mb-2">Visit Purpose *</label>
                <select id="tujuan" name="tujuan" required class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500">
                  <option value="">Select Visit Purpose</option>
                  <option value="informasi-pendaftaran">Registration Information</option>
                  <option value="kunjungan-sekolah">School Visit</option>
                  <option value="kunjungan-fasilitas">Facility Visit</option>
                  <option value="pertemuan-dengan-pimpinan">Meeting with Leadership</option>
                  <option value="lainnya">Others</option>
                </select>
              </div>

              <div>
                <label for="pesan" class="block text-sm font-medium text-gray-700 mb-2">Message or Questions</label>
                <textarea id="pesan" name="pesan" rows="4" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"></textarea>
              </div>

              <div class="flex items-start">
                <input type="checkbox" id="setuju" name="setuju" required class="mt-1 mr-2">
                <label for="setuju" class="text-sm text-gray-700">
                  I agree that the data I provide will be used for communication and visit confirmation purposes. *
                </label>
              </div>

              <div>
                <button type="submit" class="w-full md:w-auto px-8 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition font-medium">
                  Submit Form
                </button>
              </div>
            </form>
          </div>

          <div class="mt-12 bg-blue-50 rounded-lg p-8 md:p-12">
            <h3 class="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
              Additional Information
            </h3>
            <p class="text-base md:text-lg text-gray-700">
              After submitting the form, our team will contact you within 1-2 business days for confirmation and to schedule your visit. If you have urgent questions, please contact Call Center: <strong>0811 2020 101</strong> or email: <strong>aaiibs@alazhariibs.sch.id</strong>
            </p>
          </div>
        </div>
      `,
    },
    {
      slug: 'karir',
      title: 'Karir',
      titleEn: 'Career',
      order: 3,
      content: `
        <div class="max-w-5xl mx-auto">
          <div class="mb-12">
            <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Karir
            </h2>
            <p class="text-lg md:text-xl text-gray-700 leading-relaxed mb-6">
              Bergabunglah dengan tim Al Azhar International Islamic Boarding School! Kami mencari individu yang berdedikasi, profesional, dan memiliki semangat untuk berkontribusi dalam dunia pendidikan Islam yang berkualitas.
            </p>
          </div>

          <div class="bg-gradient-to-r from-primary-50 to-primary-100 rounded-lg p-8 md:p-12 mb-12">
            <h3 class="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
              Mengapa Bergabung dengan Al Azhar IIBS?
            </h3>
            <div class="space-y-4 text-base md:text-lg text-gray-700 leading-relaxed">
              <ul class="list-disc list-inside space-y-2 ml-4">
                <li>Lingkungan kerja yang profesional dan kondusif</li>
                <li>Kesempatan untuk berkontribusi dalam pendidikan Islam berkualitas</li>
                <li>Program pengembangan karir dan pelatihan berkelanjutan</li>
                <li>Tim yang solid dan kolaboratif</li>
                <li>Fasilitas modern dan lengkap</li>
                <li>Paket kompensasi yang kompetitif</li>
              </ul>
            </div>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            <div class="bg-white rounded-lg shadow-md p-6">
              <h4 class="text-xl font-bold text-gray-900 mb-4">Posisi yang Dibutuhkan</h4>
              <ul class="space-y-2 text-gray-700">
                <li>• Guru Mata Pelajaran (Berbagai Bidang)</li>
                <li>• Ustadz/Ustadzah</li>
                <li>• Musrif/Musrifah</li>
                <li>• Staff Administrasi</li>
                <li>• Staff IT</li>
                <li>• Staff Keuangan</li>
                <li>• Staff HRD</li>
                <li>• Staff Marketing</li>
              </ul>
            </div>
            <div class="bg-white rounded-lg shadow-md p-6">
              <h4 class="text-xl font-bold text-gray-900 mb-4">Kualifikasi Umum</h4>
              <ul class="space-y-2 text-gray-700">
                <li>• Memiliki komitmen terhadap nilai-nilai Islam</li>
                <li>• Profesional dan berdedikasi</li>
                <li>• Memiliki kemampuan komunikasi yang baik</li>
                <li>• Mampu bekerja dalam tim</li>
                <li>• Memiliki pengalaman relevan (sesuai posisi)</li>
              </ul>
            </div>
          </div>

          <div class="bg-white rounded-lg shadow-md p-8 md:p-12">
            <h3 class="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
              Cara Melamar
            </h3>
            <div class="space-y-4 text-base md:text-lg text-gray-700">
              <p>
                Untuk melamar posisi yang tersedia, silakan kirimkan:
              </p>
              <ul class="list-disc list-inside space-y-2 ml-4">
                <li>CV/Resume lengkap</li>
                <li>Surat lamaran</li>
                <li>Fotokopi ijazah dan sertifikat</li>
                <li>Fotokopi KTP</li>
                <li>Pas foto terbaru</li>
              </ul>
              <p class="mt-4">
                Kirimkan lamaran Anda melalui email ke: <strong>aaiibs@alazhariibs.sch.id</strong> dengan subject: <strong>"Lamaran - [Nama Posisi]"</strong>
              </p>
              <p>
                Atau hubungi Call Center: <strong>0811 2020 101</strong> untuk informasi lebih lanjut.
              </p>
            </div>
          </div>
        </div>
      `,
      contentEn: `
        <div class="max-w-5xl mx-auto">
          <div class="mb-12">
            <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Career
            </h2>
            <p class="text-lg md:text-xl text-gray-700 leading-relaxed mb-6">
              Join the Al Azhar International Islamic Boarding School team! We are looking for dedicated, professional individuals with a passion to contribute to quality Islamic education.
            </p>
          </div>

          <div class="bg-gradient-to-r from-primary-50 to-primary-100 rounded-lg p-8 md:p-12 mb-12">
            <h3 class="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
              Why Join Al Azhar IIBS?
            </h3>
            <div class="space-y-4 text-base md:text-lg text-gray-700 leading-relaxed">
              <ul class="list-disc list-inside space-y-2 ml-4">
                <li>Professional and conducive work environment</li>
                <li>Opportunity to contribute to quality Islamic education</li>
                <li>Career development programs and continuous training</li>
                <li>Solid and collaborative team</li>
                <li>Modern and complete facilities</li>
                <li>Competitive compensation package</li>
              </ul>
            </div>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            <div class="bg-white rounded-lg shadow-md p-6">
              <h4 class="text-xl font-bold text-gray-900 mb-4">Available Positions</h4>
              <ul class="space-y-2 text-gray-700">
                <li>• Subject Teachers (Various Fields)</li>
                <li>• Ustadz/Ustadzah</li>
                <li>• Musrif/Musrifah</li>
                <li>• Administrative Staff</li>
                <li>• IT Staff</li>
                <li>• Finance Staff</li>
                <li>• HRD Staff</li>
                <li>• Marketing Staff</li>
              </ul>
            </div>
            <div class="bg-white rounded-lg shadow-md p-6">
              <h4 class="text-xl font-bold text-gray-900 mb-4">General Qualifications</h4>
              <ul class="space-y-2 text-gray-700">
                <li>• Commitment to Islamic values</li>
                <li>• Professional and dedicated</li>
                <li>• Good communication skills</li>
                <li>• Ability to work in a team</li>
                <li>• Relevant experience (according to position)</li>
              </ul>
            </div>
          </div>

          <div class="bg-white rounded-lg shadow-md p-8 md:p-12">
            <h3 class="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
              How to Apply
            </h3>
            <div class="space-y-4 text-base md:text-lg text-gray-700">
              <p>
                To apply for available positions, please send:
              </p>
              <ul class="list-disc list-inside space-y-2 ml-4">
                <li>Complete CV/Resume</li>
                <li>Cover letter</li>
                <li>Diploma and certificate copies</li>
                <li>ID card copy</li>
                <li>Recent photo</li>
              </ul>
              <p class="mt-4">
                Send your application via email to: <strong>aaiibs@alazhariibs.sch.id</strong> with subject: <strong>"Application - [Position Name]"</strong>
              </p>
              <p>
                Or contact Call Center: <strong>0811 2020 101</strong> for more information.
              </p>
            </div>
          </div>
        </div>
      `,
    },
  ]

  // Create submenu and pages for KONTAK
  for (const submenu of submenuKontak) {
    const menuItem = await prisma.menu.upsert({
      where: { slug: submenu.slug },
      update: {
        parentId: kontakMenu.id,
        order: submenu.order,
      },
      create: {
        title: submenu.title,
        titleEn: submenu.titleEn,
        slug: submenu.slug,
        parentId: kontakMenu.id,
        order: submenu.order,
        isActive: true,
        menuType: 'page',
      },
    })

    // Create page for each submenu with template "with-header"
    await prisma.page.upsert({
      where: { slug: submenu.slug },
      update: {
        content: submenu.content,
        contentEn: submenu.contentEn,
        menuId: menuItem.id,
        template: 'with-header',
      },
      create: {
        title: submenu.title,
        titleEn: submenu.titleEn,
        slug: submenu.slug,
        content: submenu.content,
        contentEn: submenu.contentEn,
        excerpt: `Halaman ${submenu.title}`,
        excerptEn: `${submenu.titleEn} Page`,
        isPublished: true,
        publishedAt: new Date(),
        authorId: admin.id,
        menuId: menuItem.id,
        template: 'with-header',
      },
    })
  }

  console.log('✅ Created menus')

  console.log('✅ Created BERANDA submenu and pages')
  console.log('✅ Created AKADEMIK submenu (SMP & SMA) and pages')
  console.log('✅ Created PROGRAM submenu and pages')
  console.log('✅ Created FASILITAS submenu and pages')
  console.log('✅ Created PENDAFTARAN submenu and pages')
  console.log('✅ Created KONTAK submenu and pages')
  console.log('✅ Created BERITA submenu and categories')

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

