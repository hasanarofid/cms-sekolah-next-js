'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { slugify } from '@/lib/utils'

const menuSchema = z.object({
  title: z.string().min(1, 'Judul wajib diisi'),
  titleEn: z.string().optional(),
  slug: z.string().min(1, 'Slug wajib diisi'),
  parentId: z.string().optional(),
  menuType: z.enum(['page', 'external', 'category', 'post-list']),
  externalUrl: z.string().optional(),
  icon: z.string().optional(),
  description: z.string().optional(),
  descriptionEn: z.string().optional(),
  order: z.number().int().min(0).default(0),
  isActive: z.boolean().default(true),
})

type MenuFormData = z.infer<typeof menuSchema>

interface MenuFormProps {
  menu?: {
    id: string
    title: string
    titleEn?: string | null
    slug: string
    parentId?: string | null
    menuType: string
    externalUrl?: string | null
    icon?: string | null
    description?: string | null
    descriptionEn?: string | null
    order: number
    isActive: boolean
  }
  parentMenus?: Array<{
    id: string
    title: string
    slug: string
  }>
}

export function MenuForm({ menu, parentMenus = [] }: MenuFormProps) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<MenuFormData>({
    resolver: zodResolver(menuSchema),
    defaultValues: menu
      ? {
          title: menu.title,
          titleEn: menu.titleEn || '',
          slug: menu.slug,
          parentId: menu.parentId || '',
          menuType: menu.menuType as 'page' | 'external' | 'category' | 'post-list',
          externalUrl: menu.externalUrl || '',
          icon: menu.icon || '',
          description: menu.description || '',
          descriptionEn: menu.descriptionEn || '',
          order: menu.order,
          isActive: menu.isActive,
        }
      : {
          menuType: 'page',
          order: 0,
          isActive: true,
        },
  })

  const menuType = watch('menuType')
  const title = watch('title')

  // Auto-generate slug from title
  useEffect(() => {
    if (!menu && title) {
      const generatedSlug = slugify(title)
      setValue('slug', generatedSlug, { shouldValidate: true })
    }
  }, [title, menu, setValue])

  const onSubmit = async (data: MenuFormData) => {
    setIsLoading(true)
    setError('')

    try {
      const url = menu ? `/api/admin/menus/${menu.id}` : '/api/admin/menus'
      const method = menu ? 'PUT' : 'POST'

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...data,
          parentId: data.parentId || null,
          externalUrl: data.externalUrl || null,
          icon: data.icon || null,
          description: data.description || null,
          descriptionEn: data.descriptionEn || null,
        }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Terjadi kesalahan')
      }

      router.push('/admin/menus')
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
            Judul (ID) *
          </label>
          <input
            {...register('title')}
            type="text"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          />
          {errors.title && (
            <p className="mt-1 text-sm text-red-600">{errors.title.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Judul (EN)
          </label>
          <input
            {...register('titleEn')}
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
            readOnly={!menu}
          />
          {errors.slug && (
            <p className="mt-1 text-sm text-red-600">{errors.slug.message}</p>
          )}
          {!menu && (
            <p className="mt-1 text-sm text-gray-500">Slug akan otomatis dibuat dari judul</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Menu Parent
          </label>
          <select
            {...register('parentId')}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          >
            <option value="">Tidak ada (Menu Utama)</option>
            {parentMenus.map((parent) => (
              <option key={parent.id} value={parent.id}>
                {parent.title}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Tipe Menu *
        </label>
        <select
          {...register('menuType')}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
        >
          <option value="page">Halaman</option>
          <option value="external">Link Eksternal</option>
          <option value="category">Kategori</option>
          <option value="post-list">Daftar Post</option>
        </select>
        {errors.menuType && (
          <p className="mt-1 text-sm text-red-600">{errors.menuType.message}</p>
        )}
      </div>

      {menuType === 'external' && (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            URL Eksternal *
          </label>
          <input
            {...register('externalUrl')}
            type="url"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            placeholder="https://example.com"
          />
        </div>
      )}

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Icon (opsional)
          </label>
          <input
            {...register('icon')}
            type="text"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            placeholder="icon-name atau class CSS"
          />
        </div>

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

      <div className="flex items-center">
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
          disabled={isLoading}
          className="px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? 'Menyimpan...' : 'Simpan'}
        </button>
      </div>
    </form>
  )
}

