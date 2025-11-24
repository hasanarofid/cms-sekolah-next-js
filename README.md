# CMS Sekolah - Al Azhar IIBS

Content Management System untuk website sekolah berbasis Next.js 14 dengan TypeScript.

## Fitur

- ✅ Multi-language support (Indonesia/English)
- ✅ Admin Panel untuk mengelola konten
- ✅ Manajemen Halaman (Pages)
- ✅ Manajemen Berita/Post
- ✅ Manajemen Menu
- ✅ Manajemen Media & Galeri
- ✅ Manajemen Kontak
- ✅ Authentication dengan NextAuth
- ✅ Database dengan Prisma & PostgreSQL

## Teknologi

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Database**: SQLite (bisa diganti ke PostgreSQL/MySQL jika diperlukan)
- **ORM**: Prisma
- **Authentication**: NextAuth.js
- **Form Handling**: React Hook Form + Zod

## Instalasi

1. Clone repository
```bash
git clone <repository-url>
cd cmssekolah
```

2. Install dependencies
```bash
npm install
```

3. Setup environment variables
- Copy file `.env.example` ke `.env`:
```bash
cp .env.example .env
```
- Edit file `.env` dan isi `NEXTAUTH_SECRET` (generate dengan: `openssl rand -base64 32`)
- **Catatan**: SQLite sudah siap digunakan untuk development dan production kecil. Untuk production dengan traffic tinggi, bisa diganti ke PostgreSQL dengan mengubah `DATABASE_URL` di `.env`

4. Setup database dan seed data (OTOMATIS)
```bash
npm run setup
```

Script ini akan otomatis:
- ✅ Generate Prisma Client (`prisma generate`)
- ✅ Membuat database schema (`prisma db push`)
- ✅ Mengisi database dengan data awal (`npm run seed`)

**Atau manual step by step:**
```bash
npx prisma generate
npx prisma db push
npm run seed
```

5. Jalankan development server
```bash
npm run dev
```

6. Buka browser di `http://localhost:3000`
7. Akses admin panel di `http://localhost:3000/admin/login`

## Struktur Project

```
cmssekolah/
├── app/                    # Next.js App Router
│   ├── admin/             # Admin panel pages
│   ├── api/               # API routes
│   ├── berita/            # Berita pages
│   └── page.tsx           # Home page
├── components/            # React components
├── lib/                   # Utilities & configs
├── prisma/                # Prisma schema
└── public/                # Static files
```

## Default Admin Credentials

Setelah menjalankan seed script, admin user akan dibuat otomatis:
- **Email**: `admin@example.com`
- **Password**: `admin123`

Atau buat manual melalui Prisma Studio:
```bash
npx prisma studio
```

## SQLite untuk Production

SQLite **bisa digunakan di production** untuk:
- ✅ Aplikasi dengan traffic rendah-sedang
- ✅ Single server deployment
- ✅ CMS sekolah dengan pengunjung terbatas
- ✅ Tidak perlu setup database server terpisah
- ✅ Backup mudah (tinggal copy file .db)

**Pertimbangan untuk upgrade ke PostgreSQL/MySQL jika:**
- Traffic sangat tinggi (ribuan request/detik)
- Perlu multi-server deployment
- Perlu concurrent writes yang tinggi
- Perlu fitur database advanced (replication, clustering)

Untuk CMS sekolah, SQLite biasanya sudah cukup!

## Development

- `npm run setup` - Setup database dan seed data (generate, push, seed)
- `npm run dev` - Jalankan development server
- `npm run build` - Build untuk production
- `npm run start` - Jalankan production server
- `npm run lint` - Lint code
- `npm run seed` - Seed database dengan data awal
- `npx prisma studio` - Buka Prisma Studio untuk manage database
- `npx prisma generate` - Generate Prisma Client
- `npx prisma db push` - Push schema ke database

## License

MIT

