import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { BackToTop } from '@/components/BackToTop'
import { ChatWidget } from '@/components/ChatWidget'
import { CartProvider } from '@/contexts/CartContext'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'CQ Sublimación - Diseña, Personaliza y Hazlo Real',
  description: 'Impresión 3D y sublimación de tazas y camisetas con estilo moderno, creativo y totalmente personalizado.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body className={inter.className} suppressHydrationWarning>
        <CartProvider>
          {children}
          <BackToTop />
          <ChatWidget />
        </CartProvider>
      </body>
    </html>
  )
}