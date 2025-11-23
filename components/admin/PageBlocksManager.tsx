'use client'

import { useState, useEffect } from 'react'
import { Plus, Trash2, Edit2, GripVertical, ChevronDown, ChevronUp, X, Upload, Loader2 } from 'lucide-react'

interface PageBlock {
  id: string
  type: string
  data: string
  order: number
  isActive: boolean
}

interface PageBlocksManagerProps {
  pageId: string
  initialBlocks?: PageBlock[]
}

const BLOCK_TYPES = [
  { value: 'hero-slider', label: 'Hero Slider' },
  { value: 'home-section', label: 'Home Section' },
  { value: 'faq-section', label: 'FAQ Section' },
  { value: 'figures-section', label: 'Figures Section' },
  { value: 'partnership-section', label: 'Partnership Section' },
  { value: 'split-screen', label: 'Split Screen' },
  { value: 'gallery-carousel', label: 'Gallery Carousel' },
  { value: 'video-section', label: 'Video Section' },
  { value: 'text', label: 'Text' },
  { value: 'image', label: 'Image' },
  { value: 'two-column', label: 'Two Column' },
  { value: 'accordion', label: 'Accordion' },
  { value: 'cards', label: 'Cards' },
]

export function PageBlocksManager({ pageId, initialBlocks = [] }: PageBlocksManagerProps) {
  const [blocks, setBlocks] = useState<PageBlock[]>(initialBlocks)
  const [editingBlock, setEditingBlock] = useState<PageBlock | null>(null)
  const [showAddForm, setShowAddForm] = useState(false)
  const [newBlockType, setNewBlockType] = useState('text')
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    fetchBlocks()
  }, [pageId])

  const fetchBlocks = async () => {
    try {
      const response = await fetch(`/api/admin/pages/${pageId}/blocks`)
      if (response.ok) {
        const data = await response.json()
        setBlocks(data)
      }
    } catch (error) {
      console.error('Error fetching blocks:', error)
    }
  }

  const handleAddBlock = async (e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault()
      e.stopPropagation()
    }
    if (!newBlockType) return

    setIsLoading(true)
    try {
      // Default data based on block type
      let defaultData: any = {}
      
      switch (newBlockType) {
        case 'hero-slider':
          defaultData = { sliders: [] }
          break
        case 'home-section':
          defaultData = { sections: [] }
          break
        case 'faq-section':
          defaultData = { faqs: [] }
          break
        case 'figures-section':
          defaultData = { figures: [] }
          break
        case 'partnership-section':
          defaultData = { partnerships: [] }
          break
        case 'split-screen':
          defaultData = { sections: [] }
          break
        case 'gallery-carousel':
          defaultData = { title: '', subtitle: '', items: [] }
          break
        case 'video-section':
          defaultData = { title: '', videos: [] }
          break
        case 'text':
          defaultData = { content: '' }
          break
        case 'image':
          defaultData = { image: '', alt: '' }
          break
        case 'two-column':
          defaultData = { leftContent: '', rightContent: '' }
          break
        case 'accordion':
          defaultData = { items: [] }
          break
        case 'cards':
          defaultData = { cards: [], columns: 3 }
          break
      }

      const response = await fetch(`/api/admin/pages/${pageId}/blocks`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: newBlockType,
          data: defaultData,
        }),
      })

      if (response.ok) {
        await fetchBlocks()
        setShowAddForm(false)
        setNewBlockType('text')
      }
    } catch (error) {
      console.error('Error adding block:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleDeleteBlock = async (blockId: string, e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault()
      e.stopPropagation()
    }
    if (!confirm('Apakah Anda yakin ingin menghapus block ini?')) return

    try {
      const response = await fetch(`/api/admin/pages/${pageId}/blocks/${blockId}`, {
        method: 'DELETE',
      })

      if (response.ok) {
        await fetchBlocks()
      }
    } catch (error) {
      console.error('Error deleting block:', error)
    }
  }

  const handleMoveBlock = async (blockId: string, direction: 'up' | 'down', e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault()
      e.stopPropagation()
    }
    const blockIndex = blocks.findIndex(b => b.id === blockId)
    if (blockIndex === -1) return

    const newIndex = direction === 'up' ? blockIndex - 1 : blockIndex + 1
    if (newIndex < 0 || newIndex >= blocks.length) return

    // Swap orders
    const updatedBlocks = [...blocks]
    const tempOrder = updatedBlocks[blockIndex].order
    updatedBlocks[blockIndex].order = updatedBlocks[newIndex].order
    updatedBlocks[newIndex].order = tempOrder

    setBlocks(updatedBlocks)

    // Update in database
    try {
      await fetch(`/api/admin/pages/${pageId}/blocks/${blockId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ order: updatedBlocks[blockIndex].order }),
      })
      await fetch(`/api/admin/pages/${pageId}/blocks/${updatedBlocks[newIndex].id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ order: updatedBlocks[newIndex].order }),
      })
      await fetchBlocks()
    } catch (error) {
      console.error('Error moving block:', error)
      await fetchBlocks()
    }
  }

  const handleToggleActive = async (blockId: string, isActive: boolean, e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault()
      e.stopPropagation()
    }
    try {
      await fetch(`/api/admin/pages/${pageId}/blocks/${blockId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isActive: !isActive }),
      })
      await fetchBlocks()
    } catch (error) {
      console.error('Error toggling block:', error)
    }
  }

  return (
    <div className="mt-8 border-t border-gray-200 pt-8">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-bold">Page Blocks</h3>
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault()
            e.stopPropagation()
            setShowAddForm(!showAddForm)
          }}
          className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors flex items-center space-x-2"
        >
          <Plus size={18} />
          <span>Tambah Block</span>
        </button>
      </div>

      {showAddForm && (
        <div className="mb-6 p-4 bg-gray-50 rounded-lg border border-gray-200" onClick={(e) => e.stopPropagation()}>
          <div className="flex items-center space-x-4">
            <select
              value={newBlockType}
              onChange={(e) => {
                e.stopPropagation()
                setNewBlockType(e.target.value)
              }}
              onClick={(e) => e.stopPropagation()}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              {BLOCK_TYPES.map((type) => (
                <option key={type.value} value={type.value}>
                  {type.label}
                </option>
              ))}
            </select>
            <button
              type="button"
              onClick={handleAddBlock}
              disabled={isLoading}
              className="bg-primary-600 text-white px-6 py-2 rounded-lg hover:bg-primary-700 transition-colors disabled:opacity-50"
            >
              {isLoading ? 'Menambah...' : 'Tambah'}
            </button>
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault()
                e.stopPropagation()
                setShowAddForm(false)
              }}
              className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Batal
            </button>
          </div>
          <p className="mt-2 text-sm text-gray-500">
            Block akan dibuat dengan data default. Anda dapat mengeditnya setelah dibuat.
          </p>
        </div>
      )}

      <div className="space-y-4">
        {blocks.length === 0 ? (
          <p className="text-gray-500 text-center py-8">Belum ada blocks. Tambahkan block untuk mulai membangun halaman.</p>
        ) : (
          blocks.map((block, index) => {
            const blockTypeLabel = BLOCK_TYPES.find(t => t.value === block.type)?.label || block.type
            const blockData = JSON.parse(block.data || '{}')

            return (
              <div
                key={block.id}
                className={`border rounded-lg p-4 ${
                  block.isActive ? 'bg-white border-gray-200' : 'bg-gray-50 border-gray-300 opacity-60'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3 flex-1">
                    <GripVertical className="text-gray-400 cursor-move" size={20} />
                    <div className="flex-1">
                      <div className="flex items-center space-x-2">
                        <span className="font-semibold text-gray-900">{blockTypeLabel}</span>
                        <span className="text-xs text-gray-500">(Order: {block.order})</span>
                        {!block.isActive && (
                          <span className="text-xs bg-gray-200 text-gray-600 px-2 py-1 rounded">Inactive</span>
                        )}
                      </div>
                      <p className="text-sm text-gray-500 mt-1">
                        {block.type === 'hero-slider' && `${blockData.sliders?.length || 0} slider(s)`}
                        {block.type === 'home-section' && `${blockData.sections?.length || 0} section(s)`}
                        {block.type === 'faq-section' && `${blockData.faqs?.length || 0} FAQ(s)`}
                        {block.type === 'text' && `${blockData.content?.substring(0, 50) || ''}...`}
                        {block.type === 'image' && blockData.image ? 'Image: ' + blockData.image.substring(0, 30) + '...' : 'No image'}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button
                      type="button"
                      onClick={(e) => handleMoveBlock(block.id, 'up', e)}
                      disabled={index === 0}
                      className="p-2 text-gray-600 hover:text-gray-900 disabled:opacity-30 disabled:cursor-not-allowed"
                      title="Move up"
                    >
                      <ChevronUp size={18} />
                    </button>
                    <button
                      type="button"
                      onClick={(e) => handleMoveBlock(block.id, 'down', e)}
                      disabled={index === blocks.length - 1}
                      className="p-2 text-gray-600 hover:text-gray-900 disabled:opacity-30 disabled:cursor-not-allowed"
                      title="Move down"
                    >
                      <ChevronDown size={18} />
                    </button>
                    <button
                      type="button"
                      onClick={(e) => handleToggleActive(block.id, block.isActive, e)}
                      className={`p-2 ${
                        block.isActive ? 'text-green-600 hover:text-green-700' : 'text-gray-400 hover:text-gray-600'
                      }`}
                      title={block.isActive ? 'Deactivate' : 'Activate'}
                    >
                      {block.isActive ? '✓' : '○'}
                    </button>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.preventDefault()
                        e.stopPropagation()
                        setEditingBlock(block)
                      }}
                      className="p-2 text-blue-600 hover:text-blue-700"
                      title="Edit"
                    >
                      <Edit2 size={18} />
                    </button>
                    <button
                      type="button"
                      onClick={(e) => handleDeleteBlock(block.id, e)}
                      className="p-2 text-red-600 hover:text-red-700"
                      title="Delete"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              </div>
            )
          })
        )}
      </div>

      {editingBlock && (
        <BlockEditor
          pageId={pageId}
          block={editingBlock}
          onClose={() => setEditingBlock(null)}
          onSave={async () => {
            await fetchBlocks()
            setEditingBlock(null)
          }}
        />
      )}
    </div>
  )
}

// Block Editor Component with specific forms for each block type
function BlockEditor({ pageId, block, onClose, onSave }: {
  pageId: string
  block: PageBlock
  onClose: () => void
  onSave: () => void
}) {
  const [blockData, setBlockData] = useState(JSON.parse(block.data || '{}'))
  const [isSaving, setIsSaving] = useState(false)
  const [uploading, setUploading] = useState(false)

  const handleSave = async () => {
    setIsSaving(true)
    try {
      await fetch(`/api/admin/pages/${pageId}/blocks/${block.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          data: blockData,
        }),
      })
      onSave()
    } catch (error) {
      console.error('Error saving block:', error)
    } finally {
      setIsSaving(false)
    }
  }

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>, sliderIndex?: number) => {
    const file = e.target.files?.[0]
    if (!file) return

    setUploading(true)
    try {
      const formData = new FormData()
      formData.append('file', file)

      const response = await fetch('/api/admin/upload', {
        method: 'POST',
        body: formData,
      })

      if (response.ok) {
        const data = await response.json()
        if (block.type === 'hero-slider' && sliderIndex !== undefined) {
          // Update specific slider's image
          const sliders = [...(blockData.sliders || [])]
          if (sliders[sliderIndex]) {
            sliders[sliderIndex] = {
              ...sliders[sliderIndex],
              image: data.url
            }
            setBlockData({
              ...blockData,
              sliders
            })
          }
        } else if (block.type === 'gallery-carousel') {
          // Support both old format (images) and new format (items)
          const currentItems = blockData.items || (blockData.images || []).map((img: string, idx: number) => ({
            image: img,
            label: blockData.labels?.[idx] || `Item ${idx + 1}`
          }))
          setBlockData({
            ...blockData,
            items: [...currentItems, { image: data.url, label: '' }]
          })
        } else if (block.type === 'image') {
          setBlockData({
            ...blockData,
            image: data.url
          })
        }
      }
    } catch (error) {
      console.error('Error uploading image:', error)
    } finally {
      setUploading(false)
    }
  }

  const handleRemoveImage = (index: number) => {
    if (block.type === 'gallery-carousel') {
      const currentItems = blockData.items || (blockData.images || []).map((img: string, idx: number) => ({
        image: img,
        label: blockData.labels?.[idx] || `Item ${idx + 1}`
      }))
      const newItems = [...currentItems]
      newItems.splice(index, 1)
      setBlockData({
        ...blockData,
        items: newItems
      })
    }
  }

  const handleMoveImage = (index: number, direction: 'up' | 'down') => {
    if (block.type === 'gallery-carousel') {
      const currentItems = blockData.items || (blockData.images || []).map((img: string, idx: number) => ({
        image: img,
        label: blockData.labels?.[idx] || `Item ${idx + 1}`
      }))
      const newItems = [...currentItems]
      const newIndex = direction === 'up' ? index - 1 : index + 1
      if (newIndex < 0 || newIndex >= newItems.length) return
      
      const temp = newItems[index]
      newItems[index] = newItems[newIndex]
      newItems[newIndex] = temp
      
      setBlockData({
        ...blockData,
        items: newItems
      })
    }
  }

  // Render specific form based on block type
  const renderForm = () => {
    switch (block.type) {
      case 'hero-slider':
        const sliders = blockData.sliders || []
        
        return (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <label className="block text-sm font-medium text-gray-700">
                Hero Sliders
              </label>
              <button
                type="button"
                onClick={() => {
                  const newSlider = {
                    id: `slider-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
                    title: '',
                    titleEn: '',
                    subtitle: '',
                    subtitleEn: '',
                    image: '',
                    buttonText: '',
                    buttonTextEn: '',
                    buttonUrl: '',
                    isActive: true
                  }
                  setBlockData({
                    ...blockData,
                    sliders: [...sliders, newSlider]
                  })
                }}
                className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors flex items-center space-x-2"
              >
                <Plus size={18} />
                <span>Tambah Slider</span>
              </button>
            </div>

            {sliders.length === 0 ? (
              <div className="text-center py-8 text-gray-500 border-2 border-dashed border-gray-300 rounded-lg">
                <p>Belum ada slider. Klik "Tambah Slider" untuk menambahkan.</p>
              </div>
            ) : (
              <div className="space-y-6">
                {sliders.map((slider: any, index: number) => (
                  <div key={slider.id || index} className="border border-gray-200 rounded-lg p-6 bg-gray-50">
                    <div className="flex justify-between items-center mb-4">
                      <h4 className="font-semibold text-gray-800">Slider {index + 1}</h4>
                      <div className="flex items-center space-x-2">
                        <button
                          type="button"
                          onClick={() => {
                            const newSliders = [...sliders]
                            newSliders[index] = {
                              ...newSliders[index],
                              isActive: !newSliders[index].isActive
                            }
                            setBlockData({ ...blockData, sliders: newSliders })
                          }}
                          className={`px-3 py-1 rounded text-sm ${
                            slider.isActive !== false
                              ? 'bg-green-100 text-green-700'
                              : 'bg-gray-100 text-gray-600'
                          }`}
                        >
                          {slider.isActive !== false ? 'Aktif' : 'Nonaktif'}
                        </button>
                        {index > 0 && (
                          <button
                            type="button"
                            onClick={() => {
                              const newSliders = [...sliders]
                              const temp = newSliders[index]
                              newSliders[index] = newSliders[index - 1]
                              newSliders[index - 1] = temp
                              setBlockData({ ...blockData, sliders: newSliders })
                            }}
                            className="p-2 bg-gray-200 hover:bg-gray-300 rounded text-gray-700"
                            title="Move up"
                          >
                            <ChevronUp size={16} />
                          </button>
                        )}
                        {index < sliders.length - 1 && (
                          <button
                            type="button"
                            onClick={() => {
                              const newSliders = [...sliders]
                              const temp = newSliders[index]
                              newSliders[index] = newSliders[index + 1]
                              newSliders[index + 1] = temp
                              setBlockData({ ...blockData, sliders: newSliders })
                            }}
                            className="p-2 bg-gray-200 hover:bg-gray-300 rounded text-gray-700"
                            title="Move down"
                          >
                            <ChevronDown size={16} />
                          </button>
                        )}
                        <button
                          type="button"
                          onClick={() => {
                            const newSliders = sliders.filter((_: any, i: number) => i !== index)
                            setBlockData({ ...blockData, sliders: newSliders })
                          }}
                          className="p-2 bg-red-100 hover:bg-red-200 rounded text-red-700"
                          title="Delete"
                        >
                          <X size={16} />
                        </button>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* Image Upload */}
                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Background Image *
                        </label>
                        {slider.image ? (
                          <div className="relative mb-4">
                            <img
                              src={slider.image}
                              alt={`Slider ${index + 1}`}
                              className="w-full h-48 object-cover rounded-lg border border-gray-300"
                            />
                            <button
                              type="button"
                              onClick={() => {
                                const newSliders = [...sliders]
                                newSliders[index] = { ...newSliders[index], image: '' }
                                setBlockData({ ...blockData, sliders: newSliders })
                              }}
                              className="absolute top-2 right-2 bg-red-600 text-white p-2 rounded-full hover:bg-red-700"
                            >
                              <X size={16} />
                            </button>
                          </div>
                        ) : (
                          <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                            <input
                              type="file"
                              accept="image/*"
                              onChange={(e) => handleImageUpload(e, index)}
                              disabled={uploading}
                              className="hidden"
                              id={`slider-image-${index}`}
                            />
                            <label
                              htmlFor={`slider-image-${index}`}
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
                      </div>

                      {/* Title (ID) */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Title (ID) *
                        </label>
                        <input
                          type="text"
                          value={slider.title || ''}
                          onChange={(e) => {
                            const newSliders = [...sliders]
                            newSliders[index] = { ...newSliders[index], title: e.target.value }
                            setBlockData({ ...blockData, sliders: newSliders })
                          }}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                          placeholder="Al Azhar International Islamic Boarding School"
                        />
                      </div>

                      {/* Title (EN) */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Title (EN)
                        </label>
                        <input
                          type="text"
                          value={slider.titleEn || ''}
                          onChange={(e) => {
                            const newSliders = [...sliders]
                            newSliders[index] = { ...newSliders[index], titleEn: e.target.value }
                            setBlockData({ ...blockData, sliders: newSliders })
                          }}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                          placeholder="Al Azhar International Islamic Boarding School"
                        />
                      </div>

                      {/* Subtitle (ID) */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Subtitle (ID)
                        </label>
                        <textarea
                          value={slider.subtitle || ''}
                          onChange={(e) => {
                            const newSliders = [...sliders]
                            newSliders[index] = { ...newSliders[index], subtitle: e.target.value }
                            setBlockData({ ...blockData, sliders: newSliders })
                          }}
                          rows={2}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                          placeholder="Qur'anic Learning, Courtesy Oriented and World Class Education"
                        />
                      </div>

                      {/* Subtitle (EN) */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Subtitle (EN)
                        </label>
                        <textarea
                          value={slider.subtitleEn || ''}
                          onChange={(e) => {
                            const newSliders = [...sliders]
                            newSliders[index] = { ...newSliders[index], subtitleEn: e.target.value }
                            setBlockData({ ...blockData, sliders: newSliders })
                          }}
                          rows={2}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                          placeholder="Qur'anic Learning, Courtesy Oriented and World Class Education"
                        />
                      </div>

                      {/* Button Text (ID) */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Button Text (ID)
                        </label>
                        <input
                          type="text"
                          value={slider.buttonText || ''}
                          onChange={(e) => {
                            const newSliders = [...sliders]
                            newSliders[index] = { ...newSliders[index], buttonText: e.target.value }
                            setBlockData({ ...blockData, sliders: newSliders })
                          }}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                          placeholder="Pendaftaran Murid Baru"
                        />
                      </div>

                      {/* Button Text (EN) */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Button Text (EN)
                        </label>
                        <input
                          type="text"
                          value={slider.buttonTextEn || ''}
                          onChange={(e) => {
                            const newSliders = [...sliders]
                            newSliders[index] = { ...newSliders[index], buttonTextEn: e.target.value }
                            setBlockData({ ...blockData, sliders: newSliders })
                          }}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                          placeholder="New Student Registration"
                        />
                      </div>

                      {/* Button URL */}
                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Button URL
                        </label>
                        <input
                          type="text"
                          value={slider.buttonUrl || ''}
                          onChange={(e) => {
                            const newSliders = [...sliders]
                            newSliders[index] = { ...newSliders[index], buttonUrl: e.target.value }
                            setBlockData({ ...blockData, sliders: newSliders })
                          }}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                          placeholder="/pendaftaran atau https://example.com"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )

      case 'gallery-carousel':
        // Convert old format (images array) to new format (items array)
        const items = blockData.items || (blockData.images || []).map((img: string, idx: number) => ({
          image: img,
          label: blockData.labels?.[idx] || `Item ${idx + 1}`
        }))

        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Title
              </label>
              <input
                type="text"
                value={blockData.title || ''}
                onChange={(e) => setBlockData({ ...blockData, title: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="Gedung & Fasilitas"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Subtitle (opsional)
              </label>
              <textarea
                value={blockData.subtitle || ''}
                onChange={(e) => setBlockData({ ...blockData, subtitle: e.target.value })}
                rows={2}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="Jelajahi Fasilitas Bertaraf International di SMP Islam Al Azhar 51 International Islamic Boarding School Karanganyar"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Gallery Items
              </label>
              
              {/* Upload Button */}
              <div className="mb-4">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  disabled={uploading}
                  className="hidden"
                  id="gallery-upload"
                />
                <label
                  htmlFor="gallery-upload"
                  className={`inline-flex items-center space-x-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors cursor-pointer ${
                    uploading ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                >
                  {uploading ? (
                    <>
                      <Loader2 className="animate-spin" size={18} />
                      <span>Uploading...</span>
                    </>
                  ) : (
                    <>
                      <Upload size={18} />
                      <span>Tambah Gambar</span>
                    </>
                  )}
                </label>
              </div>

              {/* Items List */}
              <div className="space-y-4">
                {items.map((item: any, index: number) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex gap-4">
                      <div className="relative group flex-shrink-0">
                        <img
                          src={item.image || item}
                          alt={`Gallery ${index + 1}`}
                          className="w-32 h-32 object-cover rounded-lg border border-gray-300"
                        />
                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
                          <button
                            type="button"
                            onClick={() => {
                              const newItems = [...items]
                              newItems.splice(index, 1)
                              setBlockData({ ...blockData, items: newItems })
                            }}
                            className="p-2 bg-red-600 hover:bg-red-700 rounded text-white"
                            title="Remove"
                          >
                            <X size={16} />
                          </button>
                        </div>
                      </div>
                      <div className="flex-1">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Label
                        </label>
                        <input
                          type="text"
                          value={item.label || ''}
                          onChange={(e) => {
                            const newItems = [...items]
                            newItems[index] = { ...newItems[index], label: e.target.value }
                            setBlockData({ ...blockData, items: newItems })
                          }}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm"
                          placeholder="Ruang Kelas"
                        />
                      </div>
                      <div className="flex flex-col justify-center space-y-2">
                        <button
                          type="button"
                          onClick={() => {
                            if (index > 0) {
                              const newItems = [...items]
                              const temp = newItems[index]
                              newItems[index] = newItems[index - 1]
                              newItems[index - 1] = temp
                              setBlockData({ ...blockData, items: newItems })
                            }
                          }}
                          disabled={index === 0}
                          className="p-2 bg-gray-100 hover:bg-gray-200 rounded text-gray-800 disabled:opacity-30"
                          title="Move up"
                        >
                          <ChevronUp size={16} />
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            if (index < items.length - 1) {
                              const newItems = [...items]
                              const temp = newItems[index]
                              newItems[index] = newItems[index + 1]
                              newItems[index + 1] = temp
                              setBlockData({ ...blockData, items: newItems })
                            }
                          }}
                          disabled={index === items.length - 1}
                          className="p-2 bg-gray-100 hover:bg-gray-200 rounded text-gray-800 disabled:opacity-30"
                          title="Move down"
                        >
                          <ChevronDown size={16} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {items.length === 0 && (
                <p className="text-gray-500 text-sm text-center py-8">
                  Belum ada gambar. Klik "Tambah Gambar" untuk menambahkan.
                </p>
              )}
            </div>
          </div>
        )

      case 'image':
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Image
              </label>
              {blockData.image ? (
                <div className="relative mb-4">
                  <img
                    src={blockData.image}
                    alt="Preview"
                    className="w-full h-64 object-cover rounded-lg border border-gray-300"
                  />
                  <button
                    type="button"
                    onClick={() => setBlockData({ ...blockData, image: '' })}
                    className="absolute top-2 right-2 bg-red-600 text-white p-2 rounded-full hover:bg-red-700"
                  >
                    <X size={18} />
                  </button>
                </div>
              ) : (
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    disabled={uploading}
                    className="hidden"
                    id="image-upload"
                  />
                  <label
                    htmlFor="image-upload"
                    className={`cursor-pointer flex flex-col items-center ${
                      uploading ? 'opacity-50 cursor-not-allowed' : ''
                    }`}
                  >
                    {uploading ? (
                      <>
                        <Loader2 className="animate-spin text-primary-600 mb-2" size={32} />
                        <span className="text-gray-600">Uploading...</span>
                      </>
                    ) : (
                      <>
                        <Upload className="text-gray-400 mb-2" size={32} />
                        <span className="text-gray-600">Klik untuk upload gambar</span>
                      </>
                    )}
                  </label>
                </div>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Alt Text
              </label>
              <input
                type="text"
                value={blockData.alt || ''}
                onChange={(e) => setBlockData({ ...blockData, alt: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="Image description"
              />
            </div>
          </div>
        )

      case 'text':
        return (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Content
            </label>
            <textarea
              value={blockData.content || ''}
              onChange={(e) => setBlockData({ ...blockData, content: e.target.value })}
              rows={10}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              placeholder="Enter text content..."
            />
          </div>
        )

      default:
        return (
          <div>
            <p className="text-gray-600 mb-4">
              Editor untuk block type "{block.type}". Untuk mengedit data block, silakan gunakan form yang sesuai dengan tipe block.
            </p>
            <div className="bg-gray-50 p-4 rounded-lg mb-4">
              <pre className="text-xs overflow-auto">
                {JSON.stringify(blockData, null, 2)}
              </pre>
            </div>
          </div>
        )
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm" onClick={onClose}>
      <div className="bg-white rounded-lg shadow-2xl w-full max-w-4xl mx-4 max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center">
          <h3 className="text-xl font-bold">Edit Block: {block.type}</h3>
          <button
            type="button"
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <X size={24} />
          </button>
        </div>
        <div className="p-6">
          {renderForm()}
          <div className="flex justify-end space-x-4 mt-6 pt-6 border-t border-gray-200">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              Batal
            </button>
            <button
              type="button"
              onClick={handleSave}
              disabled={isSaving}
              className="px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 disabled:opacity-50"
            >
              {isSaving ? 'Menyimpan...' : 'Simpan'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

