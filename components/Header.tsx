"use client"

import { useState } from "react";
import { AuthButtons } from "@/components/AuthButtons";
import { Menu, X } from "lucide-react";

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const menuItems = [
    { name: "Inicio", href: "/" },
    { name: "Servicios", href: "/servicios" },
    { name: "Galería", href: "/#galeria" },
    { name: "Contacto", href: "/#contacto" }
  ];

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-[#050012]/95 via-[#0b0430]/95 to-[#120046]/95 backdrop-blur-sm border-b border-white/10">
        <div className="container mx-auto px-5 md:px-10">
          <div className="flex items-center justify-between py-4">
            {/* Logo */}
            <a href="/" className="hover:opacity-80 transition-opacity">
              <h1 className="text-lg md:text-xl font-bold tracking-wide text-white">
                CQ Sublimación
              </h1>
            </a>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-8">
              {menuItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-sm text-gray-300 hover:text-white transition-colors duration-200"
                >
                  {item.name}
                </a>
              ))}
            </nav>

            {/* Desktop Auth */}
            <div className="hidden md:flex items-center gap-4">
              <AuthButtons />
            </div>

            {/* Mobile: hamburger button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden text-white p-2 rounded-md hover:bg-white/10 transition-colors"
              aria-label="Abrir menú"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Spacer para que el contenido no quede debajo del header fijo */}
      <div className="h-[65px] md:h-[65px]" />

      {/* Mobile Menu overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/60"
            onClick={() => setMobileMenuOpen(false)}
          />

          {/* Panel */}
          <div className="absolute top-[65px] left-0 right-0 bg-[#050012] border-b border-white/10 shadow-2xl">
            {/* Nav links */}
            <nav className="px-6 pt-4 pb-2">
              {menuItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="flex items-center py-4 text-lg font-semibold text-gray-300 hover:text-white border-b border-white/10 last:border-0 transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.name}
                </a>
              ))}
            </nav>

            {/* Auth buttons */}
            <div className="px-6 py-5 border-t border-white/10">
              <AuthButtons />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
