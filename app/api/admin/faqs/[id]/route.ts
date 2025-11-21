import { getSession } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getSession()
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await req.json()
    const {
      question,
      questionEn,
      answer,
      answerEn,
      image,
      sectionTitle,
      sectionTitleEn,
      order,
      isActive,
    } = body

    const existingFAQ = await prisma.fAQ.findUnique({
      where: { id: params.id },
    })

    if (!existingFAQ) {
      return NextResponse.json({ error: 'FAQ not found' }, { status: 404 })
    }

    const faq = await prisma.fAQ.update({
      where: { id: params.id },
      data: {
        question,
        questionEn: questionEn || null,
        answer,
        answerEn: answerEn || null,
        image: image || null,
        sectionTitle: sectionTitle || null,
        sectionTitleEn: sectionTitleEn || null,
        order: order || 0,
        isActive: isActive !== undefined ? isActive : true,
      },
    })

    return NextResponse.json(faq)
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Terjadi kesalahan' },
      { status: 500 }
    )
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getSession()
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const existingFAQ = await prisma.fAQ.findUnique({
      where: { id: params.id },
    })

    if (!existingFAQ) {
      return NextResponse.json({ error: 'FAQ not found' }, { status: 404 })
    }

    await prisma.fAQ.delete({
      where: { id: params.id },
    })

    return NextResponse.json({ success: true })
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Terjadi kesalahan' },
      { status: 500 }
    )
  }
}

