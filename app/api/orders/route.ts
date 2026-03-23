import { NextRequest, NextResponse } from 'next/server'
import jwt from 'jsonwebtoken'
import { prisma } from '@/lib/db'

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key'

export async function GET(request: NextRequest) {
    try {
        const token = request.cookies.get('token')?.value
        if (!token) return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
        
        const decoded = jwt.verify(token, JWT_SECRET) as any
        const userId = decoded.userId || decoded.id

        const orders = await prisma.order.findMany({
            where: { userId },
            include: {
                orderItems: {
                    include: { 
                        product: true, 
                        design: true 
                    }
                }
            },
            orderBy: { createdAt: 'desc' }
        });

        return NextResponse.json({ orders })
    } catch (error) {
        console.error('Error in orders API:', error)
        return NextResponse.json({ error: 'Token inválido o error del servidor' }, { status: 401 })
    }
}

export async function POST(request: NextRequest) {
    try {
        const token = request.cookies.get('token')?.value || request.cookies.get('auth_token')?.value
        if (!token) return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
        
        const decoded = jwt.verify(token, JWT_SECRET) as any
        const userId = decoded.userId || decoded.id

        const user = await prisma.user.findUnique({ where: { id: userId } })
        if (!user) return NextResponse.json({ error: 'Usuario no encontrado' }, { status: 404 })

        const payload = await request.json()
        const { items, phone, notes, total } = payload

        if (!items || items.length === 0) {
            return NextResponse.json({ error: 'Carrito vacío' }, { status: 400 })
        }

        const validTotal = typeof total === 'number' ? total : 0;

        // Try to create order with real items, if items have fake IDs they will fail. 
        // We catch and throw a nice message.
        const order = await prisma.order.create({
            data: {
                userId,
                total: validTotal,
                status: 'PENDING',
                customerName: user.name || user.email,
                customerEmail: user.email,
                customerPhone: phone || user.phone,
                notes: notes || '',
                orderItems: {
                    create: items.map((i: any) => ({
                        productId: i.productId,
                        quantity: i.quantity,
                        price: i.price || 0
                    }))
                }
            }
        });

        return NextResponse.json({ success: true, order })
    } catch (error: any) {
        console.error('Error creating order:', error)
        if (error.code === 'P2003') {
             return NextResponse.json({ error: 'Uno o más productos en el carrito no existen en la base de datos (Llave foránea fallida).' }, { status: 400 })
        }
        return NextResponse.json({ error: 'Error procesando tu orden' }, { status: 500 })
    }
}
