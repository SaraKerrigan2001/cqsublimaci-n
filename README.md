# CQ Sublimación - Admin Dashboard

Dashboard administrativo para CQ Sublimación con barra lateral colapsable, modo oscuro/claro y gestión completa de productos, clientes y pedidos.

## 🚀 Características

- ✅ **Dashboard Administrativo** con métricas en tiempo real
- ✅ **Barra Lateral Colapsable** con navegación intuitiva
- ✅ **Modo Oscuro/Claro** completamente funcional
- ✅ **Autenticación** de usuarios y administradores
- ✅ **Gestión de Productos, Clientes y Pedidos**
- ✅ **Formularios de Cotización** integrados
- ✅ **Base de datos** con Prisma y SQLite
- ✅ **Diseño Responsivo** con Tailwind CSS

## 🛠️ Tecnologías

- **Next.js 14** - Framework React
- **TypeScript** - Tipado estático
- **Tailwind CSS** - Estilos
- **Prisma** - ORM para base de datos
- **SQLite** - Base de datos (desarrollo)
- **Lucide React** - Iconos

## 📦 Instalación Local

```bash
# Clonar repositorio
git clone [URL_DEL_REPO]
cd cq-sublimacion

# Instalar dependencias
npm install

# Configurar base de datos
cp .env.example .env
npm run db:push
npm run db:seed

# Ejecutar en desarrollo
npm run dev
```

## 🌐 Despliegue en Vercel

### Opción 1: Desde GitHub
1. Sube el código a GitHub
2. Ve a [vercel.com](https://vercel.com)
3. Conecta tu repositorio
4. Configura las variables de entorno
5. ¡Despliega!

### Opción 2: Vercel CLI
```bash
# Instalar Vercel CLI
npm i -g vercel

# Desplegar
vercel

# Configurar variables de entorno en Vercel dashboard
```

## 🔐 Credenciales de Administrador

- **Email:** `admin@cqsublimacion.com`
- **Contraseña:** `admin123`

## 📁 Estructura del Proyecto

```
├── app/                    # App Router de Next.js
│   ├── admin/             # Páginas del dashboard
│   ├── api/               # API Routes
│   └── servicios/         # Páginas públicas
├── components/            # Componentes React
│   ├── admin/            # Componentes del dashboard
│   └── ui/               # Componentes UI reutilizables
├── lib/                  # Utilidades y configuración
├── prisma/               # Esquema y seeds de base de datos
└── types/                # Tipos de TypeScript
```

## 🎨 Funcionalidades del Dashboard

- **Overview:** Métricas principales y gráficos
- **Customers:** Gestión de clientes
- **Orders:** Administración de pedidos
- **Products:** Catálogo de productos
- **Settings:** Configuración del sistema

## 📱 Responsive Design

- ✅ Desktop (1024px+)
- ✅ Tablet (768px - 1023px)
- ✅ Mobile (320px - 767px)

## 🔧 Variables de Entorno

```env
DATABASE_URL="file:./dev.db"
JWT_SECRET="your-super-secret-jwt-key-here"
NEXTAUTH_SECRET="your-nextauth-secret-here"
NEXTAUTH_URL="http://localhost:3000"
```

## 📄 Licencia

Este proyecto es privado y pertenece a CQ Sublimación.

---

Desarrollado con ❤️ para CQ Sublimación