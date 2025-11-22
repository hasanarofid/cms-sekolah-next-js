'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Upload, X, Loader2 } from 'lucide-react'

const sectionSchema = z.object({
  type: z.enum(['motto', 'video-profile', 'admission', 'feature', 'split-screen', 'masjid-al-fatih', 'university-map', 'global-stage'], {
    errorMap: () => ({ message: 'Pilih tipe section' })
  }),
  title: z.string().optional(),
  titleEn: z.string().optional(),
  subtitle: z.string().optional(),
  subtitleEn: z.string().optional(),
  content: z.string().optional(),
  contentEn: z.string().optional(),
  image: z.string().optional(),
  images: z.array(z.string()).optional(),
  videoUrl: z.string().optional(),
  buttonText: z.string().optional(),
  buttonTextEn: z.string().optional(),
  buttonUrl: z.string().refine(
    (val) => !val || val.startsWith('/') || val.startsWith('http://') || val.startsWith('https://'),
    { message: 'URL harus dimulai dengan / untuk path relatif atau http:///https:// untuk URL lengkap' }
  ).optional().or(z.literal('')),
  order: z.number().int().min(0).default(0),
  isActive: z.boolean().default(true),
})

type SectionFormData = z.infer<typeof sectionSchema>

interface HomeSectionFormProps {
  section?: {
    id: string
    type: string
    title?: string | null
    titleEn?: string | null
    subtitle?: string | null
    subtitleEn?: string | null
    content?: string | null
    contentEn?: string | null
    image?: string | null
    images?: string[] | null
    videoUrl?: string | null
    buttonText?: string | null
    buttonTextEn?: string | null
    buttonUrl?: string | null
    order: number
    isActive: boolean
  }
  defaultType?: 'motto' | 'video-profile' | 'admission' | 'feature' | 'split-screen' | 'masjid-al-fatih' | 'university-map' | 'global-stage'
}

export function HomeSectionForm({ section, defaultType }: HomeSectionFormProps) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [uploading, setUploading] = useState(false)
  const [previewImage, setPreviewImage] = useState<string | null>(
    section?.image || null
  )
  const [previewImages, setPreviewImages] = useState<string[]>(
    section?.images || []
  )

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<SectionFormData>({
    resolver: zodResolver(sectionSchema),
        defaultValues: section
      ? {
          type: section.type as 'motto' | 'video-profile' | 'admission' | 'feature' | 'split-screen' | 'masjid-al-fatih' | 'university-map' | 'global-stage',
          title: section.title || '',
          titleEn: section.titleEn || '',
          subtitle: section.subtitle || '',
          subtitleEn: section.subtitleEn || '',
          content: section.content || '',
          contentEn: section.contentEn || '',
          image: section.image || '',
          images: section.images || [],
          videoUrl: section.videoUrl || '',
          buttonText: section.buttonText || '',
          buttonTextEn: section.buttonTextEn || '',
          buttonUrl: section.buttonUrl || '',
          order: section.order,
          isActive: section.isActive,
        }
      : {
          type: defaultType || 'feature',
          order: 0,
          isActive: true,
          images: [],
        },
  })

  const sectionType = watch('type')
  const watchedImages = watch('images')

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

      const response = await fetch('/api/admin/upload', {
        method: 'POST',
        body: formData,
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Gagal mengupload gambar')
      }

      const data = await response.json()
      setValue('image', data.url)
      setPreviewImage(data.url)
    } catch (err: any) {
      setError(err.message || 'Gagal mengupload gambar')
    } finally {
      setUploading(false)
    }
  }

  const handleMultipleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files || files.length === 0) return

    setUploading(true)
    setError('')

    try {
      const uploadedUrls: string[] = []

      for (let i = 0; i < files.length; i++) {
        const file = files[i]
        if (!file.type.startsWith('image/')) continue
        if (file.size > 5 * 1024 * 1024) continue

        const formData = new FormData()
        formData.append('file', file)

        const response = await fetch('/api/admin/upload', {
          method: 'POST',
          body: formData,
        })

        if (response.ok) {
          const data = await response.json()
          uploadedUrls.push(data.url)
        }
      }

      const currentImages = watchedImages || []
      const newImages = [...currentImages, ...uploadedUrls]
      setValue('images', newImages, { shouldValidate: true })
      setPreviewImages(newImages)
    } catch (err: any) {
      setError(err.message || 'Gagal mengupload gambar')
    } finally {
      setUploading(false)
    }
  }

  const handleRemoveImage = () => {
    setValue('image', '')
    setPreviewImage(null)
  }

  const handleRemoveMultipleImage = (index: number) => {
    const currentImages = watchedImages || []
    const newImages = currentImages.filter((_, i) => i !== index)
    setValue('images', newImages, { shouldValidate: true })
    setPreviewImages(newImages)
  }

  const onSubmit = async (data: SectionFormData) => {
    setIsLoading(true)
    setError('')

    try {
      const url = section ? `/api/admin/home-sections/${section.id}` : '/api/admin/home-sections'
      const method = section ? 'PUT' : 'POST'

      // Prepare form data - ensure images is properly handled
      const imagesArray = Array.isArray(data.images) ? data.images : (watchedImages || [])
      
      const formData = {
        type: data.type,
        title: data.title || null,
        titleEn: data.titleEn || null,
        subtitle: data.subtitle || null,
        subtitleEn: data.subtitleEn || null,
        content: data.content || null,
        contentEn: data.contentEn || null,
        image: data.image || null,
        images: imagesArray.length > 0 ? imagesArray : null,
        videoUrl: data.videoUrl || null,
        buttonText: data.buttonText || null,
        buttonTextEn: data.buttonTextEn || null,
        buttonUrl: data.buttonUrl || null,
        order: data.order || 0,
        isActive: data.isActive !== undefined ? data.isActive : true,
      }
      
      console.log('Submitting form data:', formData)

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Terjadi kesalahan')
      }

      // Redirect based on section type
      let redirectPath = '/admin/home-sections'
      if (data.type === 'split-screen') {
        redirectPath = '/admin/split-screens'
      } else if (data.type === 'masjid-al-fatih') {
        redirectPath = '/admin/masjid-al-fatih'
      } else if (data.type === 'university-map') {
        redirectPath = '/admin/university-maps'
      } else if (data.type === 'global-stage') {
        redirectPath = '/admin/global-stages'
      }
      router.push(redirectPath)
      router.refresh()
    } catch (err: any) {
      console.error('Submit error:', err)
      setError(err.message || 'Terjadi kesalahan saat menyimpan')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit, (errors) => {
      console.error('Form validation errors:', errors)
      setError('Mohon lengkapi semua field yang wajib diisi')
    })} className="bg-white rounded-lg shadow p-6 space-y-6">
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      )}
      {Object.keys(errors).length > 0 && (
        <div className="bg-yellow-50 border border-yellow-200 text-yellow-700 px-4 py-3 rounded">
          <p className="font-semibold mb-2">Terdapat kesalahan pada form:</p>
          <ul className="list-disc list-inside space-y-1">
            {Object.entries(errors).map(([key, error]: [string, any]) => (
              <li key={key}>{error?.message || `${key}: ${JSON.stringify(error)}`}</li>
            ))}
          </ul>
        </div>
      )}

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Tipe Section *
        </label>
        <select
          {...register('type')}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
        >
          <option value="motto">Motto</option>
          <option value="video-profile">Video Profile</option>
          <option value="admission">Admission (Penerimaan)</option>
          <option value="split-screen">Split Screen (Yellow Background)</option>
              <option value="masjid-al-fatih">Masjid AL FATIH</option>
              <option value="university-map">University Map (Peta Universitas)</option>
          <option value="global-stage">Global Stage (International Program)</option>
          <option value="feature">Feature</option>
        </select>
        {errors.type && (
          <p className="mt-1 text-sm text-red-600">{errors.type.message}</p>
        )}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Title (ID) {sectionType === 'masjid-al-fatih' && '*'}
          </label>
          <input
            {...register('title')}
            type="text"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            placeholder={sectionType === 'masjid-al-fatih' ? 'Masjid AL FATIH' : ''}
          />
          {sectionType === 'masjid-al-fatih' && (
            <p className="mt-1 text-xs text-gray-500">Title yang ditampilkan di panel kanan (contoh: Masjid AL FATIH)</p>
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
            placeholder={sectionType === 'masjid-al-fatih' ? 'Al-Fatih Mosque' : ''}
          />
        </div>
      </div>

      {/* Subtitle - Show for global-stage, hide for university-map */}
      {sectionType !== 'university-map' && (
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Subtitle / Quote (ID) {sectionType === 'masjid-al-fatih' && '*'}
            </label>
            <input
              {...register('subtitle')}
              type="text"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              placeholder={sectionType === 'masjid-al-fatih' ? 'Shaping Future Leaders with Islamic Values' : ''}
            />
            {sectionType === 'masjid-al-fatih' && (
              <p className="mt-1 text-xs text-gray-500">Quote yang ditampilkan di atas section (contoh: "Shaping Future Leaders with Islamic Values")</p>
            )}
            {sectionType === 'global-stage' && (
              <p className="mt-1 text-xs text-gray-500">Quote yang ditampilkan di atas section (contoh: "Empowering Success on a Global Stage")</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Subtitle / Quote (EN)
            </label>
            <input
              {...register('subtitleEn')}
              type="text"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              placeholder={sectionType === 'masjid-al-fatih' ? 'Shaping Future Leaders with Islamic Values' : ''}
            />
          </div>
        </div>
      )}

      {(sectionType === 'admission' || sectionType === 'feature' || sectionType === 'split-screen' || sectionType === 'masjid-al-fatih') && (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Content / Deskripsi (ID) {sectionType === 'masjid-al-fatih' && '*'}
          </label>
          <textarea
            {...register('content')}
            rows={sectionType === 'masjid-al-fatih' ? 8 : 4}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            placeholder={sectionType === 'masjid-al-fatih' ? "Untuk menciptakan Generasi yang berbeda, maka perlu persiapan dan suasana baru yang spesial..." : "Deskripsi atau konten section"}
          />
          {sectionType === 'masjid-al-fatih' && (
            <p className="mt-1 text-xs text-gray-500">Text yang akan ditampilkan di panel kanan (bisa HTML)</p>
          )}
        </div>
      )}

      {(sectionType === 'admission' || sectionType === 'feature' || sectionType === 'split-screen' || sectionType === 'masjid-al-fatih') && (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Content / Deskripsi (EN)
          </label>
          <textarea
            {...register('contentEn')}
            rows={sectionType === 'masjid-al-fatih' ? 8 : 4}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            placeholder={sectionType === 'masjid-al-fatih' ? "To create a different Generation, special preparation and a new atmosphere are needed..." : "Description or content (English)"}
          />
        </div>
      )}

      {sectionType === 'video-profile' && (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Video URL
          </label>
          <input
            {...register('videoUrl')}
            type="url"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            placeholder="https://youtube.com/watch?v=..."
          />
        </div>
      )}

      {/* Single Image Upload */}
      {(sectionType === 'motto' || sectionType === 'video-profile' || sectionType === 'admission' || sectionType === 'split-screen' || sectionType === 'masjid-al-fatih' || sectionType === 'university-map' || sectionType === 'global-stage') && (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Gambar Utama 
            {sectionType === 'masjid-al-fatih' && ' (Interior Masjid - Kiri)'}
            {sectionType === 'university-map' && ' (Peta Universitas)'}
          </label>
          {sectionType === 'masjid-al-fatih' && (
            <p className="mb-2 text-xs text-gray-500">Gambar interior masjid yang ditampilkan di panel kiri</p>
          )}
          {sectionType === 'university-map' && (
            <p className="mb-2 text-xs text-gray-500">Gambar peta dunia dengan logo universitas (contoh: infographic peta universitas)</p>
          )}
          {sectionType === 'global-stage' && (
            <p className="mb-2 text-xs text-gray-500">Gambar untuk panel kanan (contoh: foto grup di gedung bersejarah seperti Hagia Sophia)</p>
          )}
          
          {previewImage ? (
            <div className="relative">
              <img
                src={previewImage}
                alt="Preview"
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
                id="image-upload"
              />
              <label
                htmlFor="image-upload"
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
      )}

      {/* Background Image for Masjid AL FATIH (right side) */}
      {sectionType === 'masjid-al-fatih' && (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Background Image Kanan (Gambar Gedung Subtle)
          </label>
          <p className="mb-2 text-xs text-gray-500">Gambar gedung yang akan digunakan sebagai background subtle di panel kanan</p>
          
          {previewImages.length > 0 && previewImages[0] ? (
            <div className="relative">
              <img
                src={previewImages[0]}
                alt="Background Preview"
                className="h-48 w-full object-cover rounded-lg border border-gray-300"
              />
              <button
                type="button"
                onClick={() => handleRemoveMultipleImage(0)}
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
                onChange={(e) => {
                  const file = e.target.files?.[0]
                  if (file) {
                    const formData = new FormData()
                    formData.append('file', file)
                    formData.append('type', 'home-sections')
                    setUploading(true)
                    fetch('/api/admin/upload', {
                      method: 'POST',
                      body: formData,
                    })
                      .then(res => res.json())
                      .then(data => {
                        const currentImages = watch('images') || []
                        setValue('images', [data.url], { shouldValidate: true })
                        setPreviewImages([data.url])
                        setUploading(false)
                      })
                      .catch(err => {
                        setError('Gagal mengupload gambar')
                        setUploading(false)
                      })
                  }
                }}
                disabled={uploading}
                className="hidden"
                id="bg-image-upload"
              />
              <label
                htmlFor="bg-image-upload"
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
                    <span className="text-sm text-gray-500">PNG, JPG, GIF maksimal 5MB</span>
                  </>
                )}
              </label>
            </div>
          )}
        </div>
      )}

      {/* Multiple Images Upload (for admission collage) */}
      {sectionType === 'admission' && (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Gambar Collage (Multiple)
          </label>
          
          {previewImages.length > 0 && (
            <div className="grid grid-cols-3 gap-4 mb-4">
              {previewImages.map((img, index) => (
                <div key={index} className="relative">
                  <img
                    src={img}
                    alt={`Preview ${index + 1}`}
                    className="h-32 w-full object-cover rounded-lg border border-gray-300"
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveMultipleImage(index)}
                    className="absolute top-1 right-1 bg-red-600 text-white p-1 rounded-full hover:bg-red-700 transition-colors"
                  >
                    <X size={14} />
                  </button>
                </div>
              ))}
            </div>
          )}

          <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleMultipleFileUpload}
              disabled={uploading}
              className="hidden"
              id="images-upload"
            />
            <label
              htmlFor="images-upload"
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
                  <span className="text-gray-600 mb-1">Klik untuk upload multiple gambar</span>
                  <span className="text-sm text-gray-500">PNG, JPG, GIF maksimal 5MB per gambar</span>
                </>
              )}
            </label>
          </div>
          
          <input
            type="hidden"
            {...register('images', { value: watchedImages || [] })}
          />
        </div>
      )}

      {/* Button Fields - Show for global-stage, hide for university-map */}
      {(sectionType !== 'university-map' && sectionType !== 'masjid-al-fatih') && (
        <>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Button Text (ID)
              </label>
              <input
                {...register('buttonText')}
                type="text"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="Daftar Sekarang"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Button Text (EN)
              </label>
              <input
                {...register('buttonTextEn')}
                type="text"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="Register Now"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Button URL
            </label>
            <input
              {...register('buttonUrl')}
              type="text"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              placeholder="/pendaftaran atau https://example.com"
            />
            <p className="mt-1 text-sm text-gray-500">
              Gunakan path relatif (contoh: /pendaftaran) atau URL lengkap (contoh: https://example.com)
            </p>
            {errors.buttonUrl && (
              <p className="mt-1 text-sm text-red-600">{errors.buttonUrl.message}</p>
            )}
          </div>
        </>
      )}

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
          disabled={isLoading}
          className="px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? 'Menyimpan...' : 'Simpan'}
        </button>
      </div>
    </form>
  )
}

