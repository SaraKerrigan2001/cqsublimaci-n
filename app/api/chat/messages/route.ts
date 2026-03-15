import { NextRequest, NextResponse } from 'next/server'
import jwt from 'jsonwebtoken'
import { prisma } from '@/lib/db'

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key'

function getUser(request: NextRequest) {
  const token = request.cookies.get('token')?.value
  if (!token) return null
  try {
    return jwt.verify(token, JWT_SECRET) as { userId: string; role: string }
  } catch {
    return null
  }
}

// GET - obtener mensajes de una conversación
export async function GET(request: NextRequest) {
  const user = getUser(request)
  if (!user) return NextResponse.json({ error: 'No autorizado' }, { status: 401 })

  const { searchParams } = new URL(request.url)
  const conversationId = searchParams.get('conversationId')
  if (!conversationId) return NextResponse.json({ error: 'conversationId requerido' }, { status: 400 })

  const conversation = await prisma.chatConversation.findUnique({
    where: { id: conversationId },
    include: { messages: { orderBy: { createdAt: 'asc' } } },
  })

  if (!conversation) return NextResponse.json({ error: 'No encontrada' }, { status: 404 })
  if (user.role !== 'ADMIN' && conversation.userId !== user.userId) {
    return NextResponse.json({ error: 'No autorizado' }, { status: 403 })
  }

  // Marcar mensajes como leídos
  const readerRole = user.role === 'ADMIN' ? 'USER' : 'ADMIN'
  await prisma.chatMessage.updateMany({
    where: { conversationId, senderRole: readerRole, read: false },
    data: { read: true },
  })

  return NextResponse.json({ messages: conversation.messages })
}

// POST - enviar mensaje
export async function POST(request: NextRequest) {
  const user = getUser(request)
  if (!user) return NextResponse.json({ error: 'No autorizado' }, { status: 401 })

  const { conversationId, content } = await request.json()
  if (!content?.trim()) return NextResponse.json({ error: 'Mensaje vacío' }, { status: 400 })

  const conversation = await prisma.chatConversation.findUnique({ where: { id: conversationId } })
  if (!conversation) return NextResponse.json({ error: 'No encontrada' }, { status: 404 })
  if (user.role !== 'ADMIN' && conversation.userId !== user.userId) {
    return NextResponse.json({ error: 'No autorizado' }, { status: 403 })
  }

  const message = await prisma.chatMessage.create({
    data: {
      conversationId,
      senderId: user.userId,
      senderRole: user.role,
      content: content.trim(),
    },
  })

  await prisma.chatConversation.update({
    where: { id: conversationId },
    data: { updatedAt: new Date() },
  })

  return NextResponse.json({ message })
}
