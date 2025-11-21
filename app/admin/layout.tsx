import { getSession } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { AdminSidebar } from '@/components/admin/AdminSidebar'
import { AdminHeader } from '@/components/admin/AdminHeader'

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  let session
  try {
    session = await getSession()
    console.log('Admin layout - Session check:', session ? 'Found' : 'Not found')
    if (session) {
      console.log('Session user:', session.user?.email)
    }
  } catch (error) {
    console.error('Error getting session:', error)
    redirect('/login')
  }

  // Check auth for all admin pages
  if (!session) {
    console.log('❌ No session found, redirecting to login')
    redirect('/login?callbackUrl=/admin')
  }

  console.log('✅ Session found:', session.user?.email)

  return (
    <div className="flex min-h-screen bg-gray-50">
      <AdminSidebar />
      <div className="flex-1 ml-64">
        <AdminHeader />
        <main className="p-6">
          {children}
        </main>
      </div>
    </div>
  )
}
