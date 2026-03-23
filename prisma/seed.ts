import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Iniciando seed de la base de datos...')

  // Crear usuario administrador
  const adminPassword = await bcrypt.hash('admin123', 12)
  const admin = await prisma.user.upsert({
    where: { email: 'admin@cqsublimacion.com' },
    update: {},
    create: {
      email: 'admin@cqsublimacion.com',
      name: 'Administrador',
      password: adminPassword,
      role: 'ADMIN'
    }
  })

  // Crear usuario regular
  const userPassword = await bcrypt.hash('user123', 12)
  const user = await prisma.user.upsert({
    where: { email: 'usuario@example.com' },
    update: {},
    create: {
      email: 'usuario@example.com',
      name: 'Usuario Demo',
      password: userPassword,
      role: 'USER'
    }
  })

  // Crear categorías
  const sublimacionCategory = await prisma.category.upsert({
    where: { name: 'Sublimación' },
    update: {},
    create: {
      name: 'Sublimación',
      description: 'Productos de sublimación en tazas, camisetas y más'
    }
  })

  const impresion3dCategory = await prisma.category.upsert({
    where: { name: 'Impresión 3D' },
    update: {},
    create: {
      name: 'Impresión 3D',
      description: 'Productos y servicios de impresión 3D personalizados'
    }
  })

  const disenoCategory = await prisma.category.upsert({
    where: { name: 'Diseño Gráfico' },
    update: {},
    create: {
      name: 'Diseño Gráfico',
      description: 'Servicios de diseño gráfico y personalización'
    }
  })

  // Crear productos de sublimación
  const sublimacionProducts = [
    {
      name: 'Taza Personalizada Premium',
      description: 'Taza de cerámica de alta calidad con sublimación de alta definición. Resistente a microondas y lavavajillas.',
      price: 15.00,
      categoryId: sublimacionCategory.id,
      isActive: true,
      isFeatured: true,
      likes: 24,
      rating: 5.0,
      image: '/images/taza.png'
    },
    {
      name: 'Camiseta Gamer Edition',
      description: 'Camiseta técnica transpirable con diseño exclusivo para gamers. Impresión duradera y colores vibrantes.',
      price: 25.00,
      categoryId: sublimacionCategory.id,
      isActive: true,
      isFeatured: true,
      likes: 18,
      rating: 5.0,
      image: '/images/camiseta.png'
    },
    {
      name: 'Mouse Pad Gaming',
      description: 'Alfombrilla de ratón de gran tamaño con superficie de baja fricción y bordes cosidos. Ideal para gaming.',
      price: 12.00,
      categoryId: sublimacionCategory.id,
      isActive: true,
      isFeatured: true,
      likes: 28,
      rating: 5.0,
      image: '/images/mousepad.png'
    }
  ];

  for (const product of sublimacionProducts) {
    await prisma.product.upsert({
      where: { id: product.name.toLowerCase().replace(/ /g, '-') }, // Using name as ID for seed consistency if needed, but cuid is default
      update: product,
      create: { ...product, id: undefined } as any
    });
  }

  // Crear productos de impresión 3D
  const impresion3dProducts = [
    {
      name: 'Figura 3D Personalizada',
      description: 'Figura impresa en 3D con gran detalle. Material PLA biodegradable de alta resistencia.',
      price: 45.00,
      categoryId: impresion3dCategory.id,
      isActive: true,
      isFeatured: true,
      likes: 32,
      rating: 5.0,
      image: '/images/figura3d.png'
    },
    {
      name: 'Llavero 3D',
      description: 'Llavero personalizado impreso en 3D.',
      price: 8.99,
      categoryId: impresion3dCategory.id,
      isActive: true
    }
  ];

  for (const product of impresion3dProducts) {
    await prisma.product.upsert({
      where: { id: product.name.toLowerCase().replace(/ /g, '-') },
      update: product,
      create: { ...product, id: undefined } as any
    });
  }

  // Crear servicios de diseño
  const disenoProducts = [
    {
      name: 'Logo Corporativo',
      description: 'Diseño de identidad visual para empresas. Incluye variaciones de logo y manual de marca básico.',
      price: 50.00,
      categoryId: disenoCategory.id,
      isActive: true,
      isFeatured: true,
      likes: 15,
      rating: 5.0,
      image: '/images/logo.png'
    },
    {
      name: 'Diseño para Sublimación',
      description: 'Diseño gráfico optimizado para sublimación.',
      price: 20.99,
      categoryId: disenoCategory.id,
      isActive: true
    }
  ];

  for (const product of disenoProducts) {
    await prisma.product.upsert({
      where: { id: product.name.toLowerCase().replace(/ /g, '-') },
      update: product,
      create: { ...product, id: undefined } as any
    });
  }

  console.log('✅ Seed completado exitosamente!')
  console.log(`👤 Usuario admin: admin@cqsublimacion.com / admin123`)
  console.log(`👤 Usuario demo: usuario@example.com / user123`)
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })