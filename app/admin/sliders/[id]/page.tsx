import { notFound } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import { SliderForm } from '@/components/admin/SliderForm'

export default async function EditSliderPage({
  params,
}: {
  params: { id: string }
}) {
  const slider = await prisma.slider.findUnique({
    where: { id: params.id }
  })

  if (!slider) {
    notFound()
  }

  return (
    <div className="w-full">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Edit Slider</h1>
        <SliderForm slider={slider} />
      </div>
    </div>
  )
}

