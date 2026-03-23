import { NextRequest, NextResponse } from 'next/server'
import jwt from 'jsonwebtoken'
import { prisma } from '@/lib/db'

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key'

export async function GET(request: NextRequest) {
    try {
        const token = request.cookies.get('token')?.value
        if (!token) return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
        
        const decoded = jwt.verify(token, JWT_SECRET) as { userId: string }

        const designs = await prisma.design.findMany({
            where: { userId: decoded.userId },
            orderBy: { createdAt: 'desc' }
        });

        return NextResponse.json(designs)
    } catch (error) {
        console.error('Error in designs API:', error)
        return NextResponse.json({ error: 'Token inválido' }, { status: 401 })
    }
}
