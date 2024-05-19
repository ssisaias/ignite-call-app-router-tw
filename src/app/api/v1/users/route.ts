import { prisma } from '@/lib/prisma'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  const body = await request.json()

  const { name, username } = body

  const userExists = await prisma.user.findUnique({
    where: {
      username,
    },
  })

  if (userExists) {
    return NextResponse.json(
      {
        message: 'Username already exists',
      },
      {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      },
    )
  }

  const user = await prisma.user.create({
    data: {
      name,
      username,
    },
  })

  return NextResponse.json(user, {
    status: 201,
    headers: {
      'Content-Type': 'application/json',
      'Set-Cookie': `@ignitecall:userid=${user.id}; Path=/; HttpOnly; max-age=${60 * 60 * 24}`, // 7 days
    },
  })
}
