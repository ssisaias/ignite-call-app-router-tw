import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const username = new URL(request.url || '').searchParams.get('username')

  return NextResponse.json(
    {
      username,
    },
    { status: 200, headers: { 'Content-Type': 'application/json' } },
  )
}
