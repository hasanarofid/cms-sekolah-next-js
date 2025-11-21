import { prisma } from '@/lib/prisma'
import { Mail } from 'lucide-react'
import { MarkAsReadButton } from '@/components/admin/MarkAsReadButton'

export const dynamic = 'force-dynamic'

export default async function ContactsPage() {
  const contacts = await prisma.contact.findMany({
    orderBy: { createdAt: 'desc' }
  })

  const markAsReadAction = async (id: string) => {
    'use server'
    await prisma.contact.update({
      where: { id },
      data: { isRead: true }
    })
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold mb-6">Kontak</h1>

        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="divide-y divide-gray-200">
            {contacts.map((contact) => (
              <div
                key={contact.id}
                className={`p-6 ${!contact.isRead ? 'bg-blue-50' : ''}`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <h3 className="text-lg font-semibold">{contact.name}</h3>
                      {!contact.isRead && (
                        <span className="px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-full">
                          Baru
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-gray-600 mb-2">
                      <strong>Email:</strong> {contact.email}
                    </p>
                    {contact.phone && (
                      <p className="text-sm text-gray-600 mb-2">
                        <strong>Telepon:</strong> {contact.phone}
                      </p>
                    )}
                    {contact.subject && (
                      <p className="text-sm text-gray-600 mb-2">
                        <strong>Subjek:</strong> {contact.subject}
                      </p>
                    )}
                    <p className="text-gray-700 mt-3">{contact.message}</p>
                    <p className="text-xs text-gray-500 mt-2">
                      {new Date(contact.createdAt).toLocaleString('id-ID')}
                    </p>
                  </div>
                  {!contact.isRead && (
                    <MarkAsReadButton
                      onMarkAsRead={async () => {
                        await markAsReadAction(contact.id)
                      }}
                    />
                  )}
                </div>
              </div>
            ))}
          </div>
          {contacts.length === 0 && (
            <div className="p-12 text-center text-gray-500">
              <Mail size={48} className="mx-auto mb-4 text-gray-400" />
              <p>Belum ada pesan kontak</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

