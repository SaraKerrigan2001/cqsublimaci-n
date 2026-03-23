import { NextRequest, NextResponse } from 'next/server'
import jwt from 'jsonwebtoken'
import { prisma } from '@/lib/db'

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key'

function getUser(request: NextRequest) {
  const token = request.cookies.get('token')?.value || request.cookies.get('auth_token')?.value
  if (!token) return null
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as any
    return {
      userId: decoded.userId || decoded.id,
      role: decoded.role || 'USER'
    }
  } catch {
    return null
  }
}

// GET - obtener conversaciones (admin: todas, user: la suya)
export async function GET(request: NextRequest) {
  const user = getUser(request)
  if (!user) return NextResponse.json({ error: 'No autorizado' }, { status: 401 })

  if (user.role === 'ADMIN') {
    const conversations = await prisma.chatConversation.findMany({
      include: {
        user: { select: { id: true, name: true, email: true } },
        messages: { orderBy: { createdAt: 'desc' }, take: 1 },
      },
      orderBy: { updatedAt: 'desc' },
    })
    return NextResponse.json({ conversations })
  } else {
    let conversation = await prisma.chatConversation.findFirst({
      where: { userId: user.userId },
      include: { messages: { orderBy: { createdAt: 'asc' } } },
    })
    if (!conversation) {
      conversation = await prisma.chatConversation.create({
        data: { userId: user.userId },
        include: { messages: { orderBy: { createdAt: 'asc' } } },
      })
    }
    return NextResponse.json({ conversation })
  }
}
