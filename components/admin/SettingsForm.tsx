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
  websiteLogo?: {
    id: string
    key: string
    value: string
  } | null
  websiteFavicon?: {
    id: string
    key: string
    value: string
  } | null
  websiteTitle?: {
    id: string
    key: string
    value: string
  } | null
  showWebsiteName?: {
    id: string
    key: string
    value: string
  } | null
  whatsappPhone?: {
    id: string
    key: string
    value: string
  } | null
  whatsappMessage?: {
    id: string
    key: string
    value: string
  } | null
  footerAddress?: {
    id: string
    key: string
    value: string
  } | null
  footerPhone?: {
    id: string
    key: string
    value: string
  } | null
  footerEmail?: {
    id: string
    key: string
    value: string
  } | null
  androidAppUrl?: {
    id: string
    key: string
    value: string
  } | null
  iosAppUrl?: {
    id: string
    key: string
    value: string
  } | null
  facebookUrl?: {
    id: string
    key: string
    value: string
  } | null
  instagramUrl?: {
    id: string
    key: string
    value: string
  } | null
  youtubeUrl?: {
    id: string
    key: string
    value: string
  } | null
}

export function SettingsForm({ 
  newsQuote, 
  newsTitle, 
  figuresTitle, 
  figuresTitleEn, 
  figuresBackground, 
  websiteLogo, 
  websiteFavicon, 
  websiteTitle, 
  showWebsiteName,
  whatsappPhone,
  whatsappMessage,
  footerAddress,
  footerPhone,
  footerEmail,
  androidAppUrl,
  iosAppUrl,
  facebookUrl,
  instagramUrl,
  youtubeUrl,
}: SettingsFormProps) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [uploading, setUploading] = useState(false)
  const [uploadingLogo, setUploadingLogo] = useState(false)
  const [uploadingFavicon, setUploadingFavicon] = useState(false)
  const [previewBackground, setPreviewBackground] = useState<string | null>(
    figuresBackground?.value || null
  )
  const [previewLogo, setPreviewLogo] = useState<string | null>(
    websiteLogo?.value || null
  )
  const [previewFavicon, setPreviewFavicon] = useState<string | null>(
    websiteFavicon?.value || null
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
      websiteLogo: websiteLogo?.value || '',
      websiteFavicon: websiteFavicon?.value || '',
      websiteTitle: websiteTitle?.value || 'Al Azhar IIBS',
      showWebsiteName: showWebsiteName?.value === 'true' || false,
      whatsappPhone: whatsappPhone?.value || '',
      whatsappMessage: whatsappMessage?.value || 'Assalamualaikum Al Azhar IIBS\nMohon info lebih lanjut untuk pendaftaran murid baru\nTerima Kasih',
      footerAddress: footerAddress?.value || 'Jl. Raya Solo - Tawangmangu, Gedangan, Salam, Kec. Karangpandan, Kabupaten Karanganyar, Jawa Tengah 57791',
      footerPhone: footerPhone?.value || '0811 2020 101',
      footerEmail: footerEmail?.value || 'aaiibs@alazhariibs.sch.id',
      androidAppUrl: androidAppUrl?.value || '',
      iosAppUrl: iosAppUrl?.value || '',
      facebookUrl: facebookUrl?.value || '',
      instagramUrl: instagramUrl?.value || '',
      youtubeUrl: youtubeUrl?.value || '',
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

  const handleLogoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
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

    setUploadingLogo(true)
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
      setValue('websiteLogo', data.url, { shouldValidate: true })
      setPreviewLogo(data.url)
    } catch (err: any) {
      setError(err.message || 'Gagal mengupload gambar')
    } finally {
      setUploadingLogo(false)
    }
  }

  const handleFaviconUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    if (!file.type.startsWith('image/')) {
      setError('File harus berupa gambar')
      return
    }

    if (file.size > 2 * 1024 * 1024) {
      setError('Ukuran file maksimal 2MB')
      return
    }

    setUploadingFavicon(true)
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
      setValue('websiteFavicon', data.url, { shouldValidate: true })
      setPreviewFavicon(data.url)
    } catch (err: any) {
      setError(err.message || 'Gagal mengupload gambar')
    } finally {
      setUploadingFavicon(false)
    }
  }

  const handleRemoveLogo = () => {
    setValue('websiteLogo', '', { shouldValidate: true })
    setPreviewLogo(null)
  }

  const handleRemoveFavicon = () => {
    setValue('websiteFavicon', '', { shouldValidate: true })
    setPreviewFavicon(null)
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

      // Update or create website_logo
      if (websiteLogo) {
        await fetch('/api/admin/settings/website_logo', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            value: data.websiteLogo || '',
          }),
        })
      } else {
        await fetch('/api/admin/settings', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            key: 'website_logo',
            value: data.websiteLogo || '',
            type: 'text',
          }),
        })
      }

      // Update or create website_favicon
      if (websiteFavicon) {
        await fetch('/api/admin/settings/website_favicon', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            value: data.websiteFavicon || '',
          }),
        })
      } else {
        await fetch('/api/admin/settings', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            key: 'website_favicon',
            value: data.websiteFavicon || '',
            type: 'text',
          }),
        })
      }

      // Update or create website_title
      if (websiteTitle) {
        await fetch('/api/admin/settings/website_title', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            value: data.websiteTitle || '',
          }),
        })
      } else {
        await fetch('/api/admin/settings', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            key: 'website_title',
            value: data.websiteTitle || '',
            type: 'text',
          }),
        })
      }

      // Update or create show_website_name
      if (showWebsiteName) {
        await fetch('/api/admin/settings/show_website_name', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            value: data.showWebsiteName ? 'true' : 'false',
          }),
        })
      } else {
        await fetch('/api/admin/settings', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            key: 'show_website_name',
            value: data.showWebsiteName ? 'true' : 'false',
            type: 'text',
          }),
        })
      }

      // Update or create whatsapp_phone
      if (whatsappPhone) {
        await fetch('/api/admin/settings/whatsapp_phone', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            value: data.whatsappPhone || '',
          }),
        })
      } else {
        await fetch('/api/admin/settings', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            key: 'whatsapp_phone',
            value: data.whatsappPhone || '',
            type: 'text',
          }),
        })
      }

      // Update or create whatsapp_message
      if (whatsappMessage) {
        await fetch('/api/admin/settings/whatsapp_message', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            value: data.whatsappMessage || '',
          }),
        })
      } else {
        await fetch('/api/admin/settings', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            key: 'whatsapp_message',
            value: data.whatsappMessage || '',
            type: 'text',
          }),
        })
      }

      // Update or create footer_address
      if (footerAddress) {
        await fetch('/api/admin/settings/footer_address', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            value: data.footerAddress || '',
          }),
        })
      } else {
        await fetch('/api/admin/settings', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            key: 'footer_address',
            value: data.footerAddress || '',
            type: 'text',
          }),
        })
      }

      // Update or create footer_phone
      if (footerPhone) {
        await fetch('/api/admin/settings/footer_phone', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            value: data.footerPhone || '',
          }),
        })
      } else {
        await fetch('/api/admin/settings', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            key: 'footer_phone',
            value: data.footerPhone || '',
            type: 'text',
          }),
        })
      }

      // Update or create footer_email
      if (footerEmail) {
        await fetch('/api/admin/settings/footer_email', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            value: data.footerEmail || '',
          }),
        })
      } else {
        await fetch('/api/admin/settings', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            key: 'footer_email',
            value: data.footerEmail || '',
            type: 'text',
          }),
        })
      }

      // Update or create android_app_url
      if (androidAppUrl) {
        await fetch('/api/admin/settings/android_app_url', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            value: data.androidAppUrl || '',
          }),
        })
      } else {
        await fetch('/api/admin/settings', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            key: 'android_app_url',
            value: data.androidAppUrl || '',
            type: 'text',
          }),
        })
      }

      // Update or create ios_app_url
      if (iosAppUrl) {
        await fetch('/api/admin/settings/ios_app_url', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            value: data.iosAppUrl || '',
          }),
        })
      } else {
        await fetch('/api/admin/settings', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            key: 'ios_app_url',
            value: data.iosAppUrl || '',
            type: 'text',
          }),
        })
      }

      // Update or create facebook_url
      if (facebookUrl) {
        await fetch('/api/admin/settings/facebook_url', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            value: data.facebookUrl || '',
          }),
        })
      } else {
        await fetch('/api/admin/settings', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            key: 'facebook_url',
            value: data.facebookUrl || '',
            type: 'text',
          }),
        })
      }

      // Update or create instagram_url
      if (instagramUrl) {
        await fetch('/api/admin/settings/instagram_url', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            value: data.instagramUrl || '',
          }),
        })
      } else {
        await fetch('/api/admin/settings', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            key: 'instagram_url',
            value: data.instagramUrl || '',
            type: 'text',
          }),
        })
      }

      // Update or create youtube_url
      if (youtubeUrl) {
        await fetch('/api/admin/settings/youtube_url', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            value: data.youtubeUrl || '',
          }),
        })
      } else {
        await fetch('/api/admin/settings', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            key: 'youtube_url',
            value: data.youtubeUrl || '',
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
        <h2 className="text-2xl font-bold mb-4">Pengaturan Website</h2>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Title Website *
            </label>
            <input
              {...register('websiteTitle', { required: true })}
              type="text"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              placeholder="Al Azhar IIBS"
            />
            <p className="mt-1 text-xs text-gray-500">Title website yang akan ditampilkan di browser tab</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Logo Website
            </label>
            
            {previewLogo ? (
              <div className="relative mb-4">
                <img
                  src={previewLogo}
                  alt="Logo Preview"
                  className="h-32 w-auto object-contain rounded-lg border border-gray-300 bg-white p-2"
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
                  onChange={handleLogoUpload}
                  disabled={uploadingLogo}
                  className="hidden"
                  id="logo-upload"
                />
                <label
                  htmlFor="logo-upload"
                  className={`cursor-pointer flex flex-col items-center justify-center ${
                    uploadingLogo ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                >
                  {uploadingLogo ? (
                    <>
                      <Loader2 className="animate-spin text-primary-600 mb-2" size={32} />
                      <span className="text-gray-600">Mengupload...</span>
                    </>
                  ) : (
                    <>
                      <Upload className="text-gray-400 mb-2" size={32} />
                      <span className="text-gray-600 mb-1">Klik untuk upload logo</span>
                      <span className="text-sm text-gray-500">PNG, JPG, GIF maksimal 10MB</span>
                    </>
                  )}
                </label>
              </div>
            )}
            
            <input
              {...register('websiteLogo')}
              type="hidden"
            />
            <p className="mt-1 text-xs text-gray-500">Logo website yang akan ditampilkan di header menu</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Favicon Website
            </label>
            
            {previewFavicon ? (
              <div className="relative mb-4">
                <img
                  src={previewFavicon}
                  alt="Favicon Preview"
                  className="h-16 w-16 object-contain rounded-lg border border-gray-300 bg-white p-2"
                />
                <button
                  type="button"
                  onClick={handleRemoveFavicon}
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
                  onChange={handleFaviconUpload}
                  disabled={uploadingFavicon}
                  className="hidden"
                  id="favicon-upload"
                />
                <label
                  htmlFor="favicon-upload"
                  className={`cursor-pointer flex flex-col items-center justify-center ${
                    uploadingFavicon ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                >
                  {uploadingFavicon ? (
                    <>
                      <Loader2 className="animate-spin text-primary-600 mb-2" size={32} />
                      <span className="text-gray-600">Mengupload...</span>
                    </>
                  ) : (
                    <>
                      <Upload className="text-gray-400 mb-2" size={32} />
                      <span className="text-gray-600 mb-1">Klik untuk upload favicon</span>
                      <span className="text-sm text-gray-500">PNG, ICO, SVG maksimal 2MB (disarankan 32x32 atau 16x16)</span>
                    </>
                  )}
                </label>
              </div>
            )}
            
            <input
              {...register('websiteFavicon')}
              type="hidden"
            />
            <p className="mt-1 text-xs text-gray-500">Favicon yang akan ditampilkan di browser tab</p>
          </div>

          <div className="flex items-center">
            <input
              {...register('showWebsiteName')}
              type="checkbox"
              id="showWebsiteName"
              className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
            />
            <label htmlFor="showWebsiteName" className="ml-2 block text-sm text-gray-700">
              Tampilkan Nama Website di Header Menu
            </label>
          </div>
          <p className="text-xs text-gray-500">Aktifkan untuk menampilkan nama website di header menu</p>
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

      <div className="border-b border-gray-200 pb-6">
        <h2 className="text-2xl font-bold mb-4">Pengaturan WhatsApp</h2>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Nomor WhatsApp *
            </label>
            <input
              {...register('whatsappPhone', { required: true })}
              type="text"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              placeholder="08112020101"
            />
            <p className="mt-1 text-xs text-gray-500">Nomor WhatsApp tujuan (tanpa + atau spasi, contoh: 08112020101)</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Pesan Default WhatsApp *
            </label>
            <textarea
              {...register('whatsappMessage', { required: true })}
              rows={4}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              placeholder="Assalamualaikum Al Azhar IIBS&#10;Mohon info lebih lanjut untuk pendaftaran murid baru&#10;Terima Kasih"
            />
            <p className="mt-1 text-xs text-gray-500">Pesan default yang akan ditampilkan saat user klik tombol WhatsApp</p>
          </div>
        </div>
      </div>

      <div className="border-b border-gray-200 pb-6">
        <h2 className="text-2xl font-bold mb-4">Pengaturan Footer</h2>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Alamat
            </label>
            <textarea
              {...register('footerAddress')}
              rows={3}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              placeholder="Jl. Raya Solo - Tawangmangu, Gedangan, Salam, Kec. Karangpandan, Kabupaten Karanganyar, Jawa Tengah 57791"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nomor Telepon
              </label>
              <input
                {...register('footerPhone')}
                type="text"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="0811 2020 101"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              <input
                {...register('footerEmail')}
                type="email"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="aaiibs@alazhariibs.sch.id"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                URL Aplikasi Android
              </label>
              <input
                {...register('androidAppUrl')}
                type="url"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="https://play.google.com/store/apps/..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                URL Aplikasi iOS
              </label>
              <input
                {...register('iosAppUrl')}
                type="url"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="https://apps.apple.com/..."
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                URL Facebook
              </label>
              <input
                {...register('facebookUrl')}
                type="url"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="https://facebook.com/..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                URL Instagram
              </label>
              <input
                {...register('instagramUrl')}
                type="url"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="https://instagram.com/..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                URL YouTube
              </label>
              <input
                {...register('youtubeUrl')}
                type="url"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="https://youtube.com/..."
              />
            </div>
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

