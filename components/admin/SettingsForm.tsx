'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { Upload, X, Loader2 } from 'lucide-react'

interface SettingsFormProps {
  newsQuote?: {
    id: string
    key: string
    value: string
    valueEn?: string | null
  } | null
  newsTitle?: {
    id: string
    key: string
    value: string
    valueEn?: string | null
  } | null
  figuresTitle?: {
    id: string
    key: string
    value: string
  } | null
  figuresTitleEn?: {
    id: string
    key: string
    value: string
  } | null
  figuresBackground?: {
    id: string
    key: string
    value: string
  } | null
}

export function SettingsForm({ newsQuote, newsTitle, figuresTitle, figuresTitleEn, figuresBackground }: SettingsFormProps) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [uploading, setUploading] = useState(false)
  const [previewBackground, setPreviewBackground] = useState<string | null>(
    figuresBackground?.value || null
  )

  const { register, handleSubmit, setValue, watch } = useForm({
    defaultValues: {
      newsQuote: newsQuote?.value || 'Integrating Knowledge and Faith for a Brighter Tomorrow',
      newsQuoteEn: newsQuote?.valueEn || '',
      newsTitle: newsTitle?.value || 'Berita Terbaru',
      newsTitleEn: newsTitle?.valueEn || 'Latest News',
      figuresTitle: figuresTitle?.value || 'Tokoh-Tokoh Al Azhar IIBS',
      figuresTitleEn: figuresTitleEn?.value || 'Figures of Al Azhar IIBS',
      figuresBackground: figuresBackground?.value || '',
    }
  })

  const figuresBackgroundValue = watch('figuresBackground')

  const handleBackgroundUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    if (!file.type.startsWith('image/')) {
      setError('File harus berupa gambar')
      return
    }

    if (file.size > 10 * 1024 * 1024) {
      setError('Ukuran file maksimal 10MB')
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
      setValue('figuresBackground', data.url, { shouldValidate: true })
      setPreviewBackground(data.url)
    } catch (err: any) {
      setError(err.message || 'Gagal mengupload gambar')
    } finally {
      setUploading(false)
    }
  }

  const handleRemoveBackground = () => {
    setValue('figuresBackground', '', { shouldValidate: true })
    setPreviewBackground(null)
  }

  const onSubmit = async (data: any) => {
    setIsLoading(true)
    setError('')
    setSuccess('')

    try {
      // Update or create news_section_quote
      if (newsQuote) {
        await fetch('/api/admin/settings/news_section_quote', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            value: data.newsQuote,
            valueEn: data.newsQuoteEn || null,
          }),
        })
      } else {
        await fetch('/api/admin/settings', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            key: 'news_section_quote',
            value: data.newsQuote,
            valueEn: data.newsQuoteEn || null,
            type: 'text',
          }),
        })
      }

      // Update or create news_section_title
      if (newsTitle) {
        await fetch('/api/admin/settings/news_section_title', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            value: data.newsTitle,
            valueEn: data.newsTitleEn || null,
          }),
        })
      } else {
        await fetch('/api/admin/settings', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            key: 'news_section_title',
            value: data.newsTitle,
            valueEn: data.newsTitleEn || null,
            type: 'text',
          }),
        })
      }

      // Update or create figures_section_title
      if (figuresTitle) {
        await fetch('/api/admin/settings/figures_section_title', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            value: data.figuresTitle,
          }),
        })
      } else {
        await fetch('/api/admin/settings', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            key: 'figures_section_title',
            value: data.figuresTitle,
            type: 'text',
          }),
        })
      }

      // Update or create figures_section_title_en
      if (figuresTitleEn) {
        await fetch('/api/admin/settings/figures_section_title_en', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            value: data.figuresTitleEn,
          }),
        })
      } else {
        await fetch('/api/admin/settings', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            key: 'figures_section_title_en',
            value: data.figuresTitleEn,
            type: 'text',
          }),
        })
      }

      // Update or create figures_section_background
      if (figuresBackground) {
        await fetch('/api/admin/settings/figures_section_background', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            value: data.figuresBackground || '',
          }),
        })
      } else {
        await fetch('/api/admin/settings', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            key: 'figures_section_background',
            value: data.figuresBackground || '',
            type: 'text',
          }),
        })
      }

      setSuccess('Pengaturan berhasil disimpan!')
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

      {success && (
        <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded">
          {success}
        </div>
      )}

      <div className="border-b border-gray-200 pb-6">
        <h2 className="text-2xl font-bold mb-4">Pengaturan Section Berita</h2>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Quote Section Berita (ID) *
            </label>
            <input
              {...register('newsQuote', { required: true })}
              type="text"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              placeholder="Integrating Knowledge and Faith for a Brighter Tomorrow"
            />
            <p className="mt-1 text-xs text-gray-500">Quote yang ditampilkan di atas section berita</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Quote Section Berita (EN)
            </label>
            <input
              {...register('newsQuoteEn')}
              type="text"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              placeholder="Integrating Knowledge and Faith for a Brighter Tomorrow"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Title Section Berita (ID) *
            </label>
            <input
              {...register('newsTitle', { required: true })}
              type="text"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              placeholder="Berita Terbaru"
            />
            <p className="mt-1 text-xs text-gray-500">Judul section berita</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Title Section Berita (EN)
            </label>
            <input
              {...register('newsTitleEn')}
              type="text"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              placeholder="Latest News"
            />
          </div>
        </div>
      </div>

      <div className="border-b border-gray-200 pb-6">
        <h2 className="text-2xl font-bold mb-4">Pengaturan Section Tokoh-Tokoh</h2>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Title Section Tokoh (ID) *
            </label>
            <input
              {...register('figuresTitle', { required: true })}
              type="text"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              placeholder="Tokoh-Tokoh Al Azhar IIBS"
            />
            <p className="mt-1 text-xs text-gray-500">Judul section tokoh-tokoh</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Title Section Tokoh (EN)
            </label>
            <input
              {...register('figuresTitleEn')}
              type="text"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              placeholder="Figures of Al Azhar IIBS"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Background Image Section Tokoh
            </label>
            
            {previewBackground ? (
              <div className="relative mb-4">
                <img
                  src={previewBackground}
                  alt="Background Preview"
                  className="h-48 w-full object-cover rounded-lg border border-gray-300"
                />
                <button
                  type="button"
                  onClick={handleRemoveBackground}
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
                  onChange={handleBackgroundUpload}
                  disabled={uploading}
                  className="hidden"
                  id="figures-background-upload"
                />
                <label
                  htmlFor="figures-background-upload"
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
                      <span className="text-gray-600 mb-1">Klik untuk upload background image</span>
                      <span className="text-sm text-gray-500">PNG, JPG, GIF maksimal 10MB</span>
                    </>
                  )}
                </label>
              </div>
            )}
            
            <input
              {...register('figuresBackground')}
              type="hidden"
            />
            <p className="mt-1 text-xs text-gray-500">Background image untuk section tokoh-tokoh (dengan sky gradient dan gedung)</p>
          </div>
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
          disabled={isLoading}
          className="px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? 'Menyimpan...' : 'Simpan'}
        </button>
      </div>
    </form>
  )
}

