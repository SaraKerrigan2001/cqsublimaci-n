import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    const {
      nombreCompleto,
      email,
      whatsapp,
      cotizacionDirigida,
      tipoCliente,
      urgenciaProyecto,
      descripcionProyecto
    } = body;

    // Validaciones básicas
    if (!nombreCompleto || !email || !descripcionProyecto) {
      return NextResponse.json(
        { error: 'Nombre completo, email y descripción del proyecto son requeridos' },
        { status: 400 }
      );
    }

    // Crear la cotización en la base de datos
    const cotizacion = await prisma.cotizacion.create({
      data: {
        nombreCompleto,
        email,
        whatsapp: whatsapp || null,
        cotizacionDirigida: cotizacionDirigida || null,
        tipoCliente: tipoCliente || null,
        urgenciaProyecto,
        descripcionProyecto,
        estado: 'PENDIENTE',
        fechaCreacion: new Date()
      }
    });

    return NextResponse.json({
      message: 'Cotización enviada exitosamente',
      cotizacion: {
        id: cotizacion.id,
        nombreCompleto: cotizacion.nombreCompleto,
        email: cotizacion.email,
        estado: cotizacion.estado
      }
    });

  } catch (error) {
    console.error('Error al crear cotización:', error);
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}

import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

export async function GET(request: NextRequest) {
  try {
    const token = request.cookies.get('token')?.value;
    if (!token) {
      return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
    }

    const decoded = jwt.verify(token, JWT_SECRET) as { userId: string };
    const user = await prisma.user.findUnique({ where: { id: decoded.userId } });

    if (!user) {
      return NextResponse.json({ error: 'Usuario no encontrado' }, { status: 404 });
    }

    const whereClause = user.role === 'ADMIN' ? {} : { email: user.email };

    const cotizaciones = await prisma.cotizacion.findMany({
      where: whereClause,
      orderBy: {
        fechaCreacion: 'desc'
      }
    });

    return NextResponse.json(cotizaciones);
  } catch (error) {
    console.error('Error al obtener cotizaciones:', error);
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}