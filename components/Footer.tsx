import Link from 'next/link'
import { Facebook, Instagram, Youtube, Mail, Phone } from 'lucide-react'

interface FooterProps {
  locale?: 'id' | 'en'
}

export function Footer({ locale = 'id' }: FooterProps) {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About */}
          <div>
            <h3 className="text-xl font-bold mb-4">Al Azhar IIBS</h3>
            <p className="text-gray-400 text-sm mb-4">
              {locale === 'en' 
                ? 'Qur\'anic Learning, Courtesy Oriented and World Class Education'
                : 'Qur\'anic Learning, Courtesy Oriented and World Class Education'}
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Youtube size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">
              {locale === 'en' ? 'Quick Links' : 'Tautan Cepat'}
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/tentang-kami" className="text-gray-400 hover:text-white transition-colors">
                  {locale === 'en' ? 'About Us' : 'Tentang Kami'}
                </Link>
              </li>
              <li>
                <Link href="/akademik" className="text-gray-400 hover:text-white transition-colors">
                  {locale === 'en' ? 'Academic' : 'Akademik'}
                </Link>
              </li>
              <li>
                <Link href="/program" className="text-gray-400 hover:text-white transition-colors">
                  {locale === 'en' ? 'Programs' : 'Program'}
                </Link>
              </li>
              <li>
                <Link href="/berita" className="text-gray-400 hover:text-white transition-colors">
                  {locale === 'en' ? 'News' : 'Berita'}
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-4">
              {locale === 'en' ? 'Contact' : 'Kontak'}
            </h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li className="flex items-center space-x-2">
                <Phone size={16} />
                <span>0811 2020 101</span>
              </li>
              <li className="flex items-center space-x-2">
                <Mail size={16} />
                <span>aaiibs@alazhariibs.sch.id</span>
              </li>
            </ul>
            <p className="text-sm text-gray-400 mt-4">
              Jl. Raya Solo - Tawangmangu, Gedangan, Salam,<br />
              Kec. Karangpandan, Kabupaten Karanganyar,<br />
              Jawa Tengah 57791
            </p>
          </div>

          {/* Download App */}
          <div>
            <h4 className="font-semibold mb-4">
              {locale === 'en' ? 'Download App' : 'Unduh Aplikasi'}
            </h4>
            <div className="space-y-2">
              <a href="#" className="block">
                <div className="bg-gray-800 hover:bg-gray-700 px-4 py-2 rounded text-sm transition-colors">
                  {locale === 'en' ? 'Android Users' : 'Pengguna Android'}
                </div>
              </a>
              <a href="#" className="block">
                <div className="bg-gray-800 hover:bg-gray-700 px-4 py-2 rounded text-sm transition-colors">
                  {locale === 'en' ? 'iOS Users' : 'Pengguna IOS'}
                </div>
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
          <p>&copy; {new Date().getFullYear()} Al Azhar IIBS. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

