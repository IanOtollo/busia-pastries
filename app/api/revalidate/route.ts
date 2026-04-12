import { revalidatePath } from 'next/cache'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  try {
    const token = req.headers.get('x-revalidate-token')
    
    if (token !== process.env.REVALIDATE_TOKEN) {
      return NextResponse.json({ error: 'Invalid token' }, { status: 401 })
    }

    revalidatePath('/menu')
    revalidatePath('/')

    return NextResponse.json({ revalidated: true, now: Date.now() })
  } catch (err) {
    return NextResponse.json({ error: 'Error revalidating' }, { status: 500 })
  }
}
