'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { slugify } from '@/lib/utils'
import { Upload, X, Loader2 } from 'lucide-react'

const categorySchema = z.object({
  name: z.string().min(1, 'Nama wajib diisi'),
  nameEn: z.string().optional(),
  slug: z.string().min(1, 'Slug wajib diisi'),
  description: z.string().optional(),
  descriptionEn: z.string().optional(),
  image: z.string().optional(),
  parentId: z.string().optional(),
  categoryType: z.enum(['program', 'facility', 'academic', 'general']),
  order: z.number().int().min(0).default(0),
  isActive: z.boolean().default(true),
})

type CategoryFormData = z.infer<typeof categorySchema>

interface CategoryFormProps {
  category?: {
    id: string
    name: string
    nameEn?: string | null
    slug: string
    description?: string | null
    descriptionEn?: string | null
    image?: string | null
    parentId?: string | null
    categoryType: string
    order: number
    isActive: boolean
  }
  parentCategories?: Array<{
    id: string
    name: string
    slug: string
  }>
}

export function CategoryForm({ category, parentCategories = [] }: CategoryFormProps) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [uploading, setUploading] = useState(false)
  const [previewImage, setPreviewImage] = useState<string | null>(
    category?.image || null
  )

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<CategoryFormData>({
    resolver: zodResolver(categorySchema),
    defaultValues: category
      ? {
          name: category.name,
          nameEn: category.nameEn || '',
          slug: category.slug,
          description: category.description || '',
          descriptionEn: category.descriptionEn || '',
          image: category.image || '',
          parentId: category.parentId || '',
          categoryType: category.categoryType as 'program' | 'facility' | 'academic' | 'general',
          order: category.order,
          isActive: category.isActive,
        }
      : {
          categoryType: 'general',
          order: 0,
          isActive: true,
        },
  })

  const name = watch('name')

  // Auto-generate slug from name
  useEffect(() => {
    if (!category && name) {
      const generatedSlug = slugify(name)
      setValue('slug', generatedSlug, { shouldValidate: true })
    }
  }, [name, category, setValue])

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
        throw new Error(errorData.error || 'Gagal mengupload gambar')
      }

      const data = await response.json()
      setValue('image', data.url, { shouldValidate: true })
      setPreviewImage(data.url)
    } catch (err: any) {
      setError(err.message || 'Gagal mengupload gambar')
    } finally {
      setUploading(false)
    }
  }

  const handleRemoveImage = () => {
    setValue('image', '', { shouldValidate: true })
    setPreviewImage(null)
  }

  const onSubmit = async (data: CategoryFormData) => {
    setIsLoading(true)
    setError('')

    try {
      const url = category ? `/api/admin/categories/${category.id}` : '/api/admin/categories'
      const method = category ? 'PUT' : 'POST'

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...data,
          parentId: data.parentId || null,
          image: data.image || null,
          description: data.description || null,
          descriptionEn: data.descriptionEn || null,
        }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Terjadi kesalahan')
      }

      router.push('/admin/categories')
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

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Slug *
          </label>
          <input
            {...register('slug')}
            type="text"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            readOnly={!category}
          />
          {errors.slug && (
            <p className="mt-1 text-sm text-red-600">{errors.slug.message}</p>
          )}
          {!category && (
            <p className="mt-1 text-sm text-gray-500">Slug akan otomatis dibuat dari nama</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Tipe Kategori *
          </label>
          <select
            {...register('categoryType')}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          >
            <option value="general">Umum</option>
            <option value="program">Program</option>
            <option value="facility">Fasilitas</option>
            <option value="academic">Akademik</option>
          </select>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Kategori Parent
        </label>
        <select
          {...register('parentId')}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
        >
          <option value="">Tidak ada (Kategori Utama)</option>
          {parentCategories.map((parent) => (
            <option key={parent.id} value={parent.id}>
              {parent.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Gambar
        </label>
        
        {previewImage ? (
          <div className="relative mb-4">
            <img
              src={previewImage}
              alt="Preview"
              className="h-32 w-32 object-cover rounded-lg border border-gray-300"
            />
            <button
              type="button"
              onClick={handleRemoveImage}
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
              id="category-image-upload"
            />
            <label
              htmlFor="category-image-upload"
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
                  <span className="text-gray-600 mb-1">Klik untuk upload gambar</span>
                  <span className="text-sm text-gray-500">PNG, JPG, GIF maksimal 5MB</span>
                </>
              )}
            </label>
          </div>
        )}
        
        <input
          {...register('image')}
          type="hidden"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Deskripsi (ID)
        </label>
        <textarea
          {...register('description')}
          rows={3}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Deskripsi (EN)
        </label>
        <textarea
          {...register('descriptionEn')}
          rows={3}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
        />
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

