'use client'

import { Trash2 } from 'lucide-react'
import { useRouter } from 'next/navigation'

interface DeleteButtonProps {
  id: string
  apiEndpoint: string
  confirmMessage?: string
}

export function DeleteButton({ id, apiEndpoint, confirmMessage = 'Yakin ingin menghapus?' }: DeleteButtonProps) {
  const router = useRouter()

  const handleDelete = async () => {
    if (!confirm(confirmMessage)) {
      return
    }

    try {
      const response = await fetch(`${apiEndpoint}/${id}`, {
        method: 'DELETE',
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Terjadi kesalahan saat menghapus')
      }

      router.refresh()
    } catch (error: any) {
      console.error('Error deleting:', error)
      alert(error.message || 'Terjadi kesalahan saat menghapus')
    }
  }

  return (
    <button
      type="button"
      onClick={handleDelete}
      className="text-red-600 hover:text-red-900"
    >
      <Trash2 size={18} />
    </button>
  )
}

