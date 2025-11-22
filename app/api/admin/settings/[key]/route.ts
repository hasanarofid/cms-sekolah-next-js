import { getSession } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function PUT(
  req: Request,
  { params }: { params: { key: string } }
) {
  try {
    const session = await getSession()
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await req.json()
    const { value, valueEn } = body

    const setting = await prisma.setting.upsert({
      where: { key: params.key },
      update: {
        value,
        valueEn: valueEn || null,
      },
      create: {
        key: params.key,
        value,
        valueEn: valueEn || null,
        type: 'text',
      },
    })

    return NextResponse.json(setting)
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Terjadi kesalahan' },
      { status: 500 }
    )
  }
}

