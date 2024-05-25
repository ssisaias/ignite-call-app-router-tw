import { auth } from '@/lib/auth'
import { NextResponse } from 'next/server'

export async function POST() {
  const session = await auth()

  if (!session?.user) return null

  return NextResponse.json(session)
}
