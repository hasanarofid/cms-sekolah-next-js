// Layout khusus untuk halaman login - tidak perlu auth check
// Layout ini akan di-wrap oleh parent layout, tapi kita skip auth check
export default function LoginLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // Tidak perlu auth check untuk halaman login
  // Parent layout akan tetap dieksekusi, tapi kita bisa bypass dengan cara lain
  return <>{children}</>
}
