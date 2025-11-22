'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Upload, X, Loader2 } from 'lucide-react'

const partnershipSchema = z.object({
  name: z.string().min(1, 'Nama wajib diisi'),
  nameEn: z.string().optional(),
  logo: z.string().min(1, 'Logo wajib diisi'),
  category: z.enum(['international', 'health', 'student-escort'], {
    errorMap: () => ({ message: 'Pilih kategori' })
  }),
  order: z.number().int().min(0).default(0),
  isActive: z.boolean().default(true),
})

type PartnershipFormData = z.infer<typeof partnershipSchema>

interface PartnershipFormProps {
  partnership?: {
    id: string
    name: string
    nameEn?: string | null
    logo: string
    category: string
    order: number
    isActive: boolean
  }
}

export function PartnershipForm({ partnership }: PartnershipFormProps) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [uploading, setUploading] = useState(false)
  const [previewLogo, setPreviewLogo] = useState<string | null>(
    partnership?.logo || null
  )

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<PartnershipFormData>({
    resolver: zodResolver(partnershipSchema),
    defaultValues: partnership
      ? {
          name: partnership.name,
          nameEn: partnership.nameEn || '',
          logo: partnership.logo,
          category: partnership.category as 'international' | 'health' | 'student-escort',
          order: partnership.order,
          isActive: partnership.isActive,
        }
      : {
          order: 0,
          isActive: true,
        },
  })

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    if (!file.type.startsWith('image/')) {
      setError('File harus berupa gambar')
      return
    }

    if (file.size > 5 * 1024 * 1024) {
      setError('Ukuran file maksimal 5MB')
      return
    }

    setUploading(true)
    setError('')

    try {
      const formData = new FormData()
      formData.append('file', file)
      formData.append('type', 'general')

      const response = await fetch('/api/admin/upload', {
        method: 'POST',
        body: formData,
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Gagal mengupload logo')
      }

      const data = await response.json()
      setValue('logo', data.url, { shouldValidate: true })
      setPreviewLogo(data.url)
    } catch (err: any) {
      setError(err.message || 'Gagal mengupload logo')
    } finally {
      setUploading(false)
    }
  }

  const handleRemoveLogo = () => {
    setValue('logo', '', { shouldValidate: true })
    setPreviewLogo(null)
  }

  const onSubmit = async (data: PartnershipFormData) => {
    setIsLoading(true)
    setError('')

    try {
      const url = partnership ? `/api/admin/partnerships/${partnership.id}` : '/api/admin/partnerships'
      const method = partnership ? 'PUT' : 'POST'

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Terjadi kesalahan')
      }

      router.push('/admin/partnerships')
      router.refresh()
    } catch (err: any) {
      setError(err.message || 'Terjadi kesalahan saat menyimpan')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="bg-white rounded-lg shadow p-6 space-y-6">
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      )}

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Nama (ID) *
          </label>
          <input
            {...register('name')}
            type="text"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            placeholder="The Markfield Institute Of Higher Education UK"
          />
          {errors.name && (
            <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Nama (EN)
          </label>
          <input
            {...register('nameEn')}
            type="text"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Kategori *
        </label>
        <select
          {...register('category')}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
        >
          <option value="">Pilih Kategori</option>
          <option value="international">Kerjasama Internasional</option>
          <option value="health">Kerjasama Kesehatan</option>
          <option value="student-escort">Kerjasama Pengawalan Siswa</option>
        </select>
        {errors.category && (
          <p className="mt-1 text-sm text-red-600">{errors.category.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Logo *
        </label>
        
        {previewLogo ? (
          <div className="relative mb-4">
            <img
              src={previewLogo}
              alt="Logo Preview"
              className="h-32 w-64 object-contain bg-gray-50 p-4 rounded-lg border border-gray-300"
            />
            <button
              type="button"
              onClick={handleRemoveLogo}
              className="absolute top-2 right-2 bg-red-600 text-white p-2 rounded-full hover:bg-red-700 transition-colors"
            >
              <X size={18} />
            </button>
          </div>
        ) : (
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center mb-4">
            <input
              type="file"
              accept="image/*"
              onChange={handleFileUpload}
              disabled={uploading}
              className="hidden"
              id="partnership-logo-upload"
            />
            <label
              htmlFor="partnership-logo-upload"
              className={`cursor-pointer flex flex-col items-center justify-center ${
                uploading ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              {uploading ? (
                <>
                  <Loader2 className="animate-spin text-primary-600 mb-2" size={32} />
                  <span className="text-gray-600">Mengupload...</span>
                </>
              ) : (
                <>
                  <Upload className="text-gray-400 mb-2" size={32} />
                  <span className="text-gray-600 mb-1">Klik untuk upload logo</span>
                  <span className="text-sm text-gray-500">PNG, JPG, GIF maksimal 5MB</span>
                </>
              )}
            </label>
          </div>
        )}
        
        <input
          {...register('logo')}
          type="hidden"
        />
        {errors.logo && (
          <p className="mt-1 text-sm text-red-600">{errors.logo.message}</p>
        )}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Order
          </label>
          <input
            {...register('order', { valueAsNumber: true })}
            type="number"
            min="0"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          />
        </div>

        <div className="flex items-center pt-8">
          <input
            {...register('isActive')}
            type="checkbox"
            id="isActive"
            className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
          />
          <label htmlFor="isActive" className="ml-2 block text-sm text-gray-700">
            Aktif
          </label>
        </div>
      </div>

      <div className="flex justify-end space-x-4">
        <button
          type="button"
          onClick={() => router.back()}
          className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
        >
          Batal
        </button>
        <button
          type="submit"
          disabled={isLoading || uploading}
          className="px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? 'Menyimpan...' : 'Simpan'}
        </button>
      </div>
    </form>
  )
}

