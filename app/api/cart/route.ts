import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import * as jwt from 'jsonwebtoken';

const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET || 'secret';

export async function POST(request: NextRequest) {
  try {
    const token = request.cookies.get('token')?.value || request.cookies.get('auth_token')?.value;
    if (!token) return NextResponse.json({ error: 'No auth' }, { status: 401 });

    const decoded = jwt.verify(token, JWT_SECRET) as { id: string };
    const { items } = await request.json();

    const cart = await prisma.cart.upsert({
      where: { userId: decoded.id },
      update: {},
      create: { userId: decoded.id }
    });

    await prisma.cartItem.deleteMany({ where: { cartId: cart.id } });

    if (items && items.length > 0) {
      const dbItems = items.map((i: any) => ({
        cartId: cart.id,
        productId: i.productId,
        quantity: i.quantity
      }));
      await prisma.cartItem.createMany({ data: dbItems });
    }

    return NextResponse.json({ success: true, cartId: cart.id });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to sync cart' }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  try {
    const token = request.cookies.get('token')?.value || request.cookies.get('auth_token')?.value;
    if (!token) return NextResponse.json({ error: 'No auth' }, { status: 401 });

    const decoded = jwt.verify(token, JWT_SECRET) as { id: string };
    const cart = await prisma.cart.findUnique({
      where: { userId: decoded.id },
      include: { items: { include: { product: true } } }
    });

    return NextResponse.json({ cart });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch cart' }, { status: 500 });
  }
}
