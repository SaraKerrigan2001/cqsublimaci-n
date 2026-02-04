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
  await prisma.product.createMany({
    data: [
      {
        name: 'Taza Personalizada',
        description: 'Taza de cerámica blanca con sublimación personalizada',
        price: 15.99,
        categoryId: sublimacionCategory.id,
        isActive: true
      },
      {
        name: 'Camiseta Sublimada',
        description: 'Camiseta 100% poliéster con diseño sublimado',
        price: 25.99,
        categoryId: sublimacionCategory.id,
        isActive: true
      },
      {
        name: 'Mouse Pad Personalizado',
        description: 'Mouse pad con base antideslizante y diseño personalizado',
        price: 12.99,
        categoryId: sublimacionCategory.id,
        isActive: true
      }
    ]
  })

  // Crear productos de impresión 3D
  await prisma.product.createMany({
    data: [
      {
        name: 'Figura Personalizada 3D',
        description: 'Figura impresa en 3D según tu diseño personalizado',
        price: 35.99,
        categoryId: impresion3dCategory.id,
        isActive: true
      },
      {
        name: 'Llavero 3D',
        description: 'Llavero personalizado impreso en 3D',
        price: 8.99,
        categoryId: impresion3dCategory.id,
        isActive: true
      },
      {
        name: 'Prototipo 3D',
        description: 'Servicio de prototipado rápido en 3D',
        price: 45.99,
        categoryId: impresion3dCategory.id,
        isActive: true
      }
    ]
  })

  // Crear servicios de diseño
  await prisma.product.createMany({
    data: [
      {
        name: 'Diseño de Logo',
        description: 'Diseño profesional de logotipo personalizado',
        price: 75.99,
        categoryId: disenoCategory.id,
        isActive: true
      },
      {
        name: 'Diseño para Sublimación',
        description: 'Diseño gráfico optimizado para sublimación',
        price: 20.99,
        categoryId: disenoCategory.id,
        isActive: true
      }
    ]
  })

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