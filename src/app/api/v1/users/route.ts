import { prisma } from '@/lib/prisma'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  // const username = new URL(request.url || '').searchParams.get('username')
  const body = await request.json()

  const { name, username } = body

  const user = await prisma.user.create({
    data: {
      name,
      username,
    },
  })

  return NextResponse.json(user, {
    status: 201,
    headers: { 'Content-Type': 'application/json' },
  })
}
