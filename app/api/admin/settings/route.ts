import { getSession } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  try {
    const session = await getSession()
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await req.json()
    const { key, value, valueEn, type } = body

    const setting = await prisma.setting.upsert({
      where: { key },
      update: {
        value,
        valueEn: valueEn || null,
        type: type || 'text',
      },
      create: {
        key,
        value,
        valueEn: valueEn || null,
        type: type || 'text',
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

