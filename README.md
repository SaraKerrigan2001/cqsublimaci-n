# CQ Sublimación - Plataforma Web

Una aplicación web completa para CQ Sublimación con Next.js 14, React, Prisma y autenticación.

## 🚀 Características

- **Frontend moderno** con Next.js 14 y React 18
- **Base de datos** con Prisma ORM y SQLite
- **Autenticación** completa con JWT
- **React Select** para selecciones avanzadas
- **API Routes** de Next.js para backend
- **Gestión de productos** y categorías
- **Panel de administración**
- **Diseño responsivo** con Tailwind CSS
- **Componentes UI** con Radix UI

## 📦 Tecnologías

- **Next.js 14** - Framework de React
- **React 18** - Biblioteca de UI
- **TypeScript** - Tipado estático
- **Prisma** - ORM para base de datos
- **SQLite** - Base de datos
- **Tailwind CSS** - Framework de CSS
- **React Select** - Componente de selección avanzado
- **Radix UI** - Componentes primitivos
- **Zod** - Validación de esquemas
- **bcryptjs** - Hashing de contraseñas
- **JWT** - Tokens de autenticación

## 🛠️ Instalación

1. **Clonar el repositorio**
   ```bash
   git clone <repository-url>
   cd cq-sublimacion
   ```

2. **Instalar dependencias**
   ```bash
   npm install
   ```

3. **Configurar variables de entorno**
   ```bash
   cp .env.example .env
   ```
   
   Edita el archivo `.env` con tus configuraciones:
   ```env
   DATABASE_URL="file:./dev.db"
   JWT_SECRET="tu-clave-secreta-jwt-aqui"
   NEXTAUTH_SECRET="tu-clave-nextauth-aqui"
   NEXTAUTH_URL="http://localhost:3000"
   ```

4. **Configurar la base de datos**
   ```bash
   # Generar el cliente de Prisma
   npm run db:generate
   
   # Crear y sincronizar la base de datos
   npm run db:push
   
   # Poblar la base de datos con datos iniciales
   npm run db:seed
   ```

5. **Ejecutar en desarrollo**
   ```bash
   npm run dev
   ```

   La aplicación estará disponible en [http://localhost:3000](http://localhost:3000)

## 📊 Base de Datos

### Esquema Principal

- **Users** - Usuarios del sistema (USER/ADMIN)
- **Categories** - Categorías de productos
- **Products** - Productos disponibles
- **Orders** - Pedidos de clientes
- **OrderItems** - Items individuales de pedidos
- **Designs** - Diseños personalizados

### Usuarios por Defecto

Después del seed, tendrás estos usuarios:

- **Administrador**: `admin@cqsublimacion.com` / `admin123`
- **Usuario Demo**: `usuario@example.com` / `user123`

## 🎯 Funcionalidades

### Para Usuarios
- Registro e inicio de sesión
- Navegación de productos por categorías
- Visualización de catálogo
- Solicitud de cotizaciones

### Para Administradores
- Panel de administración en `/admin`
- Gestión de productos y categorías
- Creación/edición de productos con React Select
- Gestión de usuarios y pedidos

## 🔧 Scripts Disponibles

```bash
# Desarrollo
npm run dev

# Construcción para producción
npm run build
npm run start

# Base de datos
npm run db:generate    # Generar cliente Prisma
npm run db:push       # Sincronizar esquema
npm run db:studio     # Abrir Prisma Studio
npm run db:seed       # Poblar con datos iniciales

# Linting
npm run lint
```

## 📁 Estructura del Proyecto

```
cq-sublimacion/
├── app/                    # App Router de Next.js
│   ├── api/               # API Routes
│   │   ├── auth/         # Endpoints de autenticación
│   │   ├── categories/   # Endpoints de categorías
│   │   └── products/     # Endpoints de productos
│   ├── admin/            # Panel de administración
│   ├── globals.css       # Estilos globales
│   ├── layout.tsx        # Layout principal
│   └── page.tsx          # Página de inicio
├── components/            # Componentes React
│   ├── ui/               # Componentes UI base
│   ├── AuthButtons.tsx   # Botones de autenticación
│   └── ProductManager.tsx # Gestor de productos
├── lib/                  # Utilidades
│   ├── db.ts            # Cliente de Prisma
│   └── utils.ts         # Utilidades generales
├── prisma/              # Configuración de base de datos
│   ├── schema.prisma    # Esquema de la base de datos
│   └── seed.ts          # Datos iniciales
└── public/              # Archivos estáticos
```

## 🎨 Componentes UI

La aplicación utiliza componentes personalizados basados en Radix UI:

- **Button** - Botones con variantes
- **Card** - Tarjetas de contenido
- **Dialog** - Modales y diálogos
- **Input** - Campos de entrada
- **Label** - Etiquetas de formulario
- **CustomSelect** - Select avanzado con React Select
- **DropdownMenu** - Menús desplegables

## 🔐 Autenticación

Sistema completo de autenticación con:

- Registro de usuarios con roles (USER/ADMIN)
- Inicio de sesión con JWT
- Protección de rutas
- Acceso diferenciado por roles
- Logout seguro

## 🚀 Despliegue

Para desplegar en producción:

1. **Configurar variables de entorno de producción**
2. **Cambiar a base de datos PostgreSQL** (recomendado)
3. **Construir la aplicación**:
   ```bash
   npm run build
   ```
4. **Desplegar en tu plataforma preferida** (Vercel, Railway, etc.)

## 📝 Notas de Desarrollo

- La aplicación usa SQLite para desarrollo (fácil setup)
- Para producción, considera PostgreSQL o MySQL
- Los componentes UI son totalmente personalizables
- React Select está configurado con tema oscuro
- Todas las API routes incluyen validación con Zod

## 🤝 Contribución

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE](LICENSE) para detalles.