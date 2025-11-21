import { getSession } from '@/lib/auth'
import { LogoutButton } from '@/components/LogoutButton'

export async function AdminHeader() {
  const session = await getSession()

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-30">
      <div className="px-6 py-4">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
          <div className="flex items-center space-x-4">
            <span className="text-gray-600">Selamat datang, {session?.user?.name}</span>
            <LogoutButton />
          </div>
        </div>
      </div>
    </header>
  )
}

