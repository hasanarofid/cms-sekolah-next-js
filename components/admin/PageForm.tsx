'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import dynamic from 'next/dynamic'
import { slugify } from '@/lib/utils'
import { Upload, X, Loader2 } from 'lucide-react'
import { PageBlocksManager } from './PageBlocksManager'

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false })
import 'react-quill/dist/quill.snow.css'

const pageSchema = z.object({
  title: z.string().min(1, 'Judul wajib diisi'),
  titleEn: z.string().optional(),
  slug: z.string().min(1, 'Slug wajib diisi'),
  content: z.string().min(1, 'Konten wajib diisi'),
  contentEn: z.string().optional(),
  excerpt: z.string().optional(),
  excerptEn: z.string().optional(),
  featuredImage: z.string().optional(),
  menuId: z.string().optional(),
  pageType: z.enum(['standard', 'program', 'facility', 'academic']).default('standard'),
  template: z.string().optional(),
  seoTitle: z.string().optional(),
  seoDescription: z.string().optional(),
  seoKeywords: z.string().optional(),
  isPublished: z.boolean().default(false),
})

type PageFormData = z.infer<typeof pageSchema>

interface PageFormProps {
  page?: {
    id: string
    title: string
    titleEn?: string | null
    slug: string
    content: string
    contentEn?: string | null
    excerpt?: string | null
    excerptEn?: string | null
    featuredImage?: string | null
    menuId?: string | null
    pageType: string
    template?: string | null
    seoTitle?: string | null
    seoDescription?: string | null
    seoKeywords?: string | null
    isPublished: boolean
    blocks?: Array<{
      id: string
      type: string
      data: string
      order: number
      isActive: boolean
    }>
  }
  menus?: Array<{ id: string; title: string; slug: string }>
}

export function PageForm({ page, menus = [] }: PageFormProps) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [uploading, setUploading] = useState(false)
  const [previewImage, setPreviewImage] = useState<string | null>(
    page?.featuredImage || null
  )

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<PageFormData>({
    resolver: zodResolver(pageSchema),
    defaultValues: page
      ? {
          title: page.title,
          titleEn: page.titleEn || '',
          slug: page.slug,
          content: page.content,
          contentEn: page.contentEn || '',
          excerpt: page.excerpt || '',
          excerptEn: page.excerptEn || '',
          featuredImage: page.featuredImage || '',
          menuId: page.menuId || '',
          pageType: page.pageType as 'standard' | 'program' | 'facility' | 'academic',
          template: page.template || '',
          seoTitle: page.seoTitle || '',
          seoDescription: page.seoDescription || '',
          seoKeywords: page.seoKeywords || '',
          isPublished: page.isPublished,
        }
      : {
          pageType: 'standard',
          isPublished: false,
        },
  })

  const content = watch('content')
  const contentEn = watch('contentEn')
  const title = watch('title')
  const slug = watch('slug')

  // Auto-generate slug from title
  useEffect(() => {
    if (!page && title) {
      const generatedSlug = slugify(title)
      setValue('slug', generatedSlug, { shouldValidate: true })
    }
  }, [title, page, setValue])

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
      setValue('featuredImage', data.url, { shouldValidate: true })
      setPreviewImage(data.url)
    } catch (err: any) {
      setError(err.message || 'Gagal mengupload gambar')
    } finally {
      setUploading(false)
    }
  }

  const handleRemoveImage = () => {
    setValue('featuredImage', '', { shouldValidate: true })
    setPreviewImage(null)
  }

  const onSubmit = async (data: PageFormData) => {
    setIsLoading(true)
    setError('')

    try {
      const url = page ? `/api/admin/pages/${page.id}` : '/api/admin/pages'
      const method = page ? 'PUT' : 'POST'

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...data,
          menuId: data.menuId || null,
          featuredImage: data.featuredImage || null,
          template: data.template || null,
          seoTitle: data.seoTitle || null,
          seoDescription: data.seoDescription || null,
          seoKeywords: data.seoKeywords || null,
        }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Terjadi kesalahan')
      }

      router.push('/admin/pages')
      router.refresh()
    } catch (err: any) {
      setError(err.message || 'Terjadi kesalahan saat menyimpan')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
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
            readOnly={!!page}
          />
          {errors.slug && (
            <p className="mt-1 text-sm text-red-600">{errors.slug.message}</p>
          )}
          {!page && (
            <p className="mt-1 text-sm text-gray-500">Slug akan otomatis dibuat dari judul</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Tipe Halaman
          </label>
          <select
            {...register('pageType')}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          >
            <option value="standard">Standard</option>
            <option value="program">Program</option>
            <option value="facility">Fasilitas</option>
            <option value="academic">Akademik</option>
          </select>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Menu (opsional)
        </label>
        <select
          {...register('menuId')}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
        >
          <option value="">Tidak ada menu</option>
          {menus.map((menu) => (
            <option key={menu.id} value={menu.id}>
              {menu.title}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Featured Image
        </label>
        
        {previewImage ? (
          <div className="relative mb-4">
            <img
              src={previewImage}
              alt="Preview"
              className="h-64 w-full object-cover rounded-lg border border-gray-300"
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
              id="page-image-upload"
            />
            <label
              htmlFor="page-image-upload"
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
          {...register('featuredImage')}
          type="hidden"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Konten (ID) *
        </label>
        <ReactQuill
          theme="snow"
          value={content || ''}
          onChange={(value) => setValue('content', value, { shouldValidate: true })}
          className="bg-white"
        />
        {errors.content && (
          <p className="mt-1 text-sm text-red-600">{errors.content.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Konten (EN)
        </label>
        <ReactQuill
          theme="snow"
          value={contentEn || ''}
          onChange={(value) => setValue('contentEn', value)}
          className="bg-white"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Excerpt (ID)
          </label>
          <textarea
            {...register('excerpt')}
            rows={3}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Excerpt (EN)
          </label>
          <textarea
            {...register('excerptEn')}
            rows={3}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          />
        </div>
      </div>

      <div className="border-t pt-6">
        <h3 className="text-lg font-semibold mb-4">SEO Settings</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              SEO Title
            </label>
            <input
              {...register('seoTitle')}
              type="text"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              SEO Description
            </label>
            <textarea
              {...register('seoDescription')}
              rows={3}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              SEO Keywords
            </label>
            <input
              {...register('seoKeywords')}
              type="text"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              placeholder="keyword1, keyword2, keyword3"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Template
            </label>
            <input
              {...register('template')}
              type="text"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              placeholder="with-header (untuk header biru gelap)"
            />
          </div>
        </div>
      </div>

      <div className="flex items-center">
        <input
          {...register('isPublished')}
          type="checkbox"
          id="isPublished"
          className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
        />
        <label htmlFor="isPublished" className="ml-2 block text-sm text-gray-700">
          Published
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
          disabled={isLoading || uploading}
          className="px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? 'Menyimpan...' : 'Simpan'}
        </button>
      </div>
    </form>

    {/* Page Blocks Manager - Only show when editing existing page, placed outside form */}
    {page && (
      <div className="mt-8">
        <PageBlocksManager 
          pageId={page.id} 
          initialBlocks={page.blocks || []}
        />
      </div>
    )}
    </>
  )
}

