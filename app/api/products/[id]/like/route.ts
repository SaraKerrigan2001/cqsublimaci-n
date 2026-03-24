import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const product = await prisma.product.update({
      where: { id },
      data: {
        likes: {
          increment: 1
        }
      }
    });

    return NextResponse.json({ 
      success: true, 
      likes: product.likes 
    });
  } catch (error) {
    console.error('Error liking product:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
