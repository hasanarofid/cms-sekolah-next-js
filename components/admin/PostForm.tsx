'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import dynamic from 'next/dynamic'
import { slugify } from '@/lib/utils'
import { Upload, X, Loader2 } from 'lucide-react'

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false })
import 'react-quill/dist/quill.snow.css'

const postSchema = z.object({
  title: z.string().min(1, 'Judul wajib diisi'),
  titleEn: z.string().optional(),
  slug: z.string().min(1, 'Slug wajib diisi'),
  content: z.string().min(1, 'Konten wajib diisi'),
  contentEn: z.string().optional(),
  excerpt: z.string().optional(),
  excerptEn: z.string().optional(),
  featuredImage: z.string().optional(),
  category: z.string().optional(),
  tags: z.string().optional(),
  isPublished: z.boolean().default(false),
})

type PostFormData = z.infer<typeof postSchema>

interface PostFormProps {
  post?: {
    id: string
    title: string
    titleEn?: string | null
    slug: string
    content: string
    contentEn?: string | null
    excerpt?: string | null
    excerptEn?: string | null
    featuredImage?: string | null
    category?: string | null
    tags: string // JSON string
    isPublished: boolean
  }
  menus?: Array<{ id: string; title: string }>
}

export function PostForm({ post, menus }: PostFormProps) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [uploading, setUploading] = useState(false)
  const [previewImage, setPreviewImage] = useState<string | null>(
    post?.featuredImage || null
  )

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<PostFormData>({
    resolver: zodResolver(postSchema),
    defaultValues: post
      ? {
          title: post.title,
          titleEn: post.titleEn || '',
          slug: post.slug,
          content: post.content,
          contentEn: post.contentEn || '',
          excerpt: post.excerpt || '',
          excerptEn: post.excerptEn || '',
          featuredImage: post.featuredImage || '',
          category: post.category || '',
          tags: post.tags ? (() => {
            try {
              const parsed = JSON.parse(post.tags)
              return Array.isArray(parsed) ? parsed.join(', ') : ''
            } catch {
              return ''
            }
          })() : '',
          isPublished: post.isPublished,
        }
      : {
          isPublished: false,
        },
  })

  const content = watch('content')
  const contentEn = watch('contentEn')
  const title = watch('title')
  const slug = watch('slug')

  // Auto-generate slug from title
  useEffect(() => {
    if (title) {
      const generatedSlug = slugify(title)
      // Auto-generate on create
      if (!post) {
        setValue('slug', generatedSlug, { shouldValidate: true })
      } else {
        // On edit: also auto-update slug if title changes
        setValue('slug', generatedSlug, { shouldValidate: true })
      }
    }
  }, [title, post, setValue])

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
      formData.append('type', 'general') // Upload to general folder

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

  const onSubmit = async (data: PostFormData) => {
    setIsLoading(true)
    setError('')

    try {
      const tags = data.tags
        ? data.tags.split(',').map((tag) => tag.trim()).filter(Boolean)
        : []

      const url = post ? `/api/admin/posts/${post.id}` : '/api/admin/posts'
      const method = post ? 'PUT' : 'POST'

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...data,
          tags,
        }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Terjadi kesalahan')
      }

      router.push('/admin/posts')
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
            Title (EN)
          </label>
          <input
            {...register('titleEn')}
            type="text"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Slug *
        </label>
        <input
          {...register('slug')}
          type="text"
          readOnly
          className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 cursor-not-allowed"
        />
        {errors.slug && (
          <p className="mt-1 text-sm text-red-600">{errors.slug.message}</p>
        )}
        <p className="mt-1 text-xs text-gray-500">
          Slug di-generate otomatis dari judul (ID). Field ini readonly dan akan ter-update saat judul berubah.
        </p>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Featured Image
        </label>
        
        {previewImage ? (
          <div className="relative">
            <img
              src={previewImage}
              alt="Featured Image Preview"
              className="h-48 w-full object-cover rounded-lg border border-gray-300"
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
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
            <input
              type="file"
              accept="image/*"
              onChange={handleFileUpload}
              disabled={uploading}
              className="hidden"
              id="featured-image-upload"
            />
            <label
              htmlFor="featured-image-upload"
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

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Konten (ID) *
        </label>
        {typeof window !== 'undefined' && (
          <ReactQuill
            theme="snow"
            value={content || ''}
            onChange={(value) => setValue('content', value)}
            className="bg-white"
          />
        )}
        {errors.content && (
          <p className="mt-1 text-sm text-red-600">{errors.content.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Content (EN)
        </label>
        {typeof window !== 'undefined' && (
          <ReactQuill
            theme="snow"
            value={contentEn || ''}
            onChange={(value) => setValue('contentEn', value)}
            className="bg-white"
          />
        )}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Category
          </label>
          <input
            {...register('category')}
            type="text"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Tags (pisahkan dengan koma)
          </label>
          <input
            {...register('tags')}
            type="text"
            placeholder="tag1, tag2, tag3"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          />
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
          Publikasikan
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

