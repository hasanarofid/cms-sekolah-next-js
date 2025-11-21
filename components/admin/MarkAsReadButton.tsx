'use client'

import { Check } from 'lucide-react'
import { useRouter } from 'next/navigation'

interface MarkAsReadButtonProps {
  onMarkAsRead: () => Promise<void>
}

export function MarkAsReadButton({ onMarkAsRead }: MarkAsReadButtonProps) {
  const router = useRouter()

  const handleClick = async () => {
    try {
      await onMarkAsRead()
      router.refresh()
    } catch (error) {
      console.error('Error marking as read:', error)
      alert('Terjadi kesalahan')
    }
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      className="ml-4 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2"
    >
      <Check size={16} />
      <span>Tandai Dibaca</span>
    </button>
  )
}

