import { getSession } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const faqs = await prisma.fAQ.findMany({
      where: { isActive: true },
      orderBy: { order: 'asc' }
    })

    return NextResponse.json(faqs)
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Terjadi kesalahan' },
      { status: 500 }
    )
  }
}

export async function POST(req: Request) {
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

    const faq = await prisma.fAQ.create({
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

