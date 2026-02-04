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

export async function GET() {
  try {
    const cotizaciones = await prisma.cotizacion.findMany({
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