'use client'

import { signOut } from 'next-auth/react'
import { LogOut } from 'lucide-react'

export function LogoutButton() {
  const handleLogout = async () => {
    await signOut({ redirect: true, callbackUrl: '/login' })
  }

  return (
    <button
      onClick={handleLogout}
      className="flex items-center space-x-2 text-red-600 hover:text-red-700"
    >
      <LogOut size={20} />
      <span>Logout</span>
    </button>
  )
}

