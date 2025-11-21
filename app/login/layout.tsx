// Layout untuk halaman login - tidak perlu auth check
export default function LoginLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
