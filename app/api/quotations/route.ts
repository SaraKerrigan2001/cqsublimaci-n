import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    const {
      fullName,
      email,
      whatsapp,
      targetOrCompany,
      clientType,
      urgency,
      description
    } = body;

    // Basic validation
    if (!fullName || !email || !description) {
      return NextResponse.json(
        { error: 'Full name, email and project description are required' },
        { status: 400 }
      );
    }

    // Get userId from token if available
    const token = request.cookies.get('token')?.value || request.cookies.get('auth_token')?.value;
    let userId = null;
    if (token) {
      try {
        const decoded = jwt.verify(token, JWT_SECRET) as any;
        userId = decoded.userId || decoded.id;
      } catch (e) {
        // Token invalid, proceed as guest
      }
    }

    // Create quotation
    const quotation = await prisma.quotation.create({
      data: {
        fullName,
        email,
        whatsapp: whatsapp || null,
        targetOrCompany: targetOrCompany || null,
        clientType: clientType || null,
        urgency,
        description,
        status: 'PENDING',
        userId
      }
    });

    return NextResponse.json({
      message: 'Quotation sent successfully',
      quotation: {
        id: quotation.id,
        fullName: quotation.fullName,
        email: quotation.email,
        status: quotation.status
      }
    });

  } catch (error) {
    console.error('Error creating quotation:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const token = request.cookies.get('token')?.value || request.cookies.get('auth_token')?.value;
    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const decoded = jwt.verify(token, JWT_SECRET) as any;
    const userId = decoded.userId || decoded.id;

    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    const whereClause = user.role === 'ADMIN' ? {} : { email: user.email };

    const quotations = await prisma.quotation.findMany({
      where: whereClause,
      orderBy: {
        createdAt: 'desc'
      },
      include: {
        user: {
          select: {
            name: true,
            email: true
          }
        }
      }
    });

    return NextResponse.json({ quotations });
  } catch (error) {
    console.error('Error fetching quotations:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
