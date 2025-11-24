const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const rootDir = path.resolve(__dirname, '..');
const deploy2Dir = path.join(rootDir, 'deploy2');
const nextDir = path.join(rootDir, '.next');

console.log('🚀 Memulai persiapan folder deploy2...\n');

// 1. Hapus folder deploy2 jika sudah ada
if (fs.existsSync(deploy2Dir)) {
  console.log('📁 Menghapus folder deploy2 yang sudah ada...');
  fs.rmSync(deploy2Dir, { recursive: true, force: true });
}

// 2. Buat folder deploy2
console.log('📁 Membuat folder deploy2...');
fs.mkdirSync(deploy2Dir, { recursive: true });

// 3. Build aplikasi Next.js
console.log('\n🔨 Membangun aplikasi Next.js...');
try {
  execSync('npm run build', { 
    cwd: rootDir, 
    stdio: 'inherit',
    env: { ...process.env, NODE_ENV: 'production' }
  });
  console.log('✅ Build berhasil!\n');
} catch (error) {
  console.error('❌ Build gagal!', error.message);
  process.exit(1);
}

// 4. Copy file dari .next/standalone
const standaloneDir = path.join(nextDir, 'standalone');
if (!fs.existsSync(standaloneDir)) {
  console.error('❌ Folder .next/standalone tidak ditemukan!');
  process.exit(1);
}

console.log('📦 Menyalin file dari .next/standalone...');
copyRecursiveSync(standaloneDir, deploy2Dir);

// 5. Copy .next/static
const staticDir = path.join(nextDir, 'static');
if (fs.existsSync(staticDir)) {
  console.log('📦 Menyalin .next/static...');
  const targetStaticDir = path.join(deploy2Dir, '.next', 'static');
  fs.mkdirSync(path.dirname(targetStaticDir), { recursive: true });
  copyRecursiveSync(staticDir, targetStaticDir);
}

// 6. Copy prisma schema
console.log('📦 Menyalin Prisma schema...');
const prismaSourceDir = path.join(rootDir, 'prisma');
const prismaTargetDir = path.join(deploy2Dir, 'prisma');
if (fs.existsSync(prismaSourceDir)) {
  fs.mkdirSync(prismaTargetDir, { recursive: true });
  copyRecursiveSync(prismaSourceDir, prismaTargetDir);
  // Hapus file database dev jika ada
  const devDb = path.join(prismaTargetDir, 'dev.db');
  if (fs.existsSync(devDb)) {
    fs.unlinkSync(devDb);
  }
}

// 7. Copy public folder
console.log('📦 Menyalin folder public...');
const publicSourceDir = path.join(rootDir, 'public');
const publicTargetDir = path.join(deploy2Dir, 'public');
if (fs.existsSync(publicSourceDir)) {
  copyRecursiveSync(publicSourceDir, publicTargetDir);
}

// 8. Copy server.js dari deploy folder (atau buat baru)
console.log('📦 Menyalin server.js...');
const serverJsSource = path.join(rootDir, 'deploy', 'server.js');
const serverJsTarget = path.join(deploy2Dir, 'server.js');
if (fs.existsSync(serverJsSource)) {
  fs.copyFileSync(serverJsSource, serverJsTarget);
} else {
  // Buat server.js baru
  const serverJsContent = `const path = require('path')

const dir = path.join(__dirname)

process.env.NODE_ENV = 'production'
process.chdir(__dirname)

const currentPort = parseInt(process.env.PORT, 10) || 3000
const hostname = process.env.HOSTNAME || '0.0.0.0'

let keepAliveTimeout = parseInt(process.env.KEEP_ALIVE_TIMEOUT, 10)

require('next')
const { startServer } = require('next/dist/server/lib/start-server')

if (
  Number.isNaN(keepAliveTimeout) ||
  !Number.isFinite(keepAliveTimeout) ||
  keepAliveTimeout < 0
) {
  keepAliveTimeout = undefined
}

startServer({
  dir,
  isDev: false,
  hostname,
  port: currentPort,
  allowRetry: false,
  keepAliveTimeout,
}).catch((err) => {
  console.error(err);
  process.exit(1);
});
`;
  fs.writeFileSync(serverJsTarget, serverJsContent);
}

// 9. Copy package.json (production only)
console.log('📦 Menyalin package.json...');
const packageJsonSource = path.join(rootDir, 'package.json');
const packageJsonTarget = path.join(deploy2Dir, 'package.json');
const packageJson = JSON.parse(fs.readFileSync(packageJsonSource, 'utf8'));

// Hapus devDependencies dan scripts yang tidak diperlukan
const productionPackageJson = {
  name: packageJson.name,
  version: packageJson.version,
  private: packageJson.private,
  scripts: {
    start: 'node server.js',
    'db:generate': 'prisma generate',
    'db:push': 'prisma db push',
  },
  dependencies: packageJson.dependencies,
  prisma: packageJson.prisma,
};

fs.writeFileSync(packageJsonTarget, JSON.stringify(productionPackageJson, null, 2));

// 10. Install dependencies di deploy2
console.log('\n📦 Menginstall dependencies...');
try {
  execSync('npm install --production', { 
    cwd: deploy2Dir, 
    stdio: 'inherit' 
  });
  console.log('✅ Dependencies berhasil di-install!\n');
} catch (error) {
  console.error('❌ Install dependencies gagal!', error.message);
  process.exit(1);
}

// 11. Generate Prisma Client di deploy2
console.log('🔧 Generate Prisma Client...');
try {
  execSync('npx prisma generate', { 
    cwd: deploy2Dir, 
    stdio: 'inherit' 
  });
  console.log('✅ Prisma Client berhasil di-generate!\n');
} catch (error) {
  console.error('❌ Generate Prisma Client gagal!', error.message);
  process.exit(1);
}

// 12. Buat file .env.example
console.log('📝 Membuat file .env.example...');
const envExample = `# Database
DATABASE_URL="file:./prisma/prod.db"

# NextAuth
NEXTAUTH_SECRET="generate-dengan-openssl-rand-base64-32"
NEXTAUTH_URL="https://aicjatibening.com/"

# Environment
NODE_ENV="production"

# Server (optional)
PORT=3000
HOSTNAME="0.0.0.0"
`;
fs.writeFileSync(path.join(deploy2Dir, '.env.example'), envExample);

// 13. Buat file README.md untuk deploy2
console.log('📝 Membuat file README.md...');
const readmeContent = `# CMS Sekolah - File Deployment

Folder ini berisi file-file yang siap untuk di-upload ke server Hostinger.

## 📋 File yang Terdapat di Folder Ini

- \`server.js\` - File utama server Next.js
- \`package.json\` - Dependencies production
- \`node_modules/\` - Dependencies yang sudah di-install
- \`.next/\` - Build output dari Next.js
- \`prisma/\` - Schema database dan Prisma Client
- \`public/\` - File static (images, dll)
- \`.env.example\` - Template file environment variables

## 🚀 Cara Upload ke Hostinger

Lihat file \`INSTALASI.md\` untuk panduan lengkap instalasi.

## ⚠️ Catatan Penting

1. **JANGAN** commit folder ini ke Git (sudah di-ignore)
2. Pastikan file \`.env\` dibuat di server dengan konfigurasi yang benar
3. Database akan dibuat otomatis saat pertama kali menjalankan \`prisma db push\`
`;
fs.writeFileSync(path.join(deploy2Dir, 'README.md'), readmeContent);

console.log('\n✅ Persiapan folder deploy2 selesai!');
console.log(`📁 Folder deploy2 berada di: ${deploy2Dir}`);
console.log('\n📝 Langkah selanjutnya:');
console.log('1. Upload semua file di folder deploy2 ke server Hostinger');
console.log('2. Ikuti panduan di file INSTALASI.md yang akan dibuat');

// Helper function untuk copy recursive
function copyRecursiveSync(src, dest) {
  const exists = fs.existsSync(src);
  const stats = exists && fs.statSync(src);
  const isDirectory = exists && stats.isDirectory();
  
  if (isDirectory) {
    if (!fs.existsSync(dest)) {
      fs.mkdirSync(dest, { recursive: true });
    }
    fs.readdirSync(src).forEach(childItemName => {
      copyRecursiveSync(
        path.join(src, childItemName),
        path.join(dest, childItemName)
      );
    });
  } else {
    fs.copyFileSync(src, dest);
  }
}

