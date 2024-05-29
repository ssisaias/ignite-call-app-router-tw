import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'

import { auth } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

const updateProfileBodySchema = z.object({
  bio: z.string(),
})

export async function PUT(req: NextRequest) {
  const session = await auth()

  if (!session?.user) return NextResponse.json(null, { status: 401 })

  const reqBody = await req.json()
  const { bio } = updateProfileBodySchema.parse(reqBody)

  await prisma.user.update({
    where: { id: session.user.id },
    data: { bio },
  })

  return new NextResponse(null, { status: 204 })
}
