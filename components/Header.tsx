"use client"

import { useState } from "react";
import { Button } from "@/components/ui/button";
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
    <header className="relative z-50 bg-gradient-to-r from-[#050012]/95 via-[#0b0430]/95 to-[#120046]/95 backdrop-blur-sm border-b border-white/10">
      <div className="container mx-auto px-5 md:px-10">
        <div className="flex items-center justify-between py-5">
          {/* Logo */}
          <div className="flex items-center">
            <a href="/" className="flex items-center hover:opacity-80 transition-opacity">
              <h1 className="text-lg md:text-xl font-bold tracking-wide text-white">
                CQ Sublimación
              </h1>
            </a>
          </div>

          {/* Desktop Menu */}
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

          {/* Desktop Auth & CTA */}
          <div className="hidden md:flex items-center gap-4">
            <AuthButtons />
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-white hover:bg-white/10"
            >
              {mobileMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden fixed inset-x-0 top-[73px] bottom-0 bg-[#050012]/98 backdrop-blur-xl z-50 overflow-y-auto">
            <div className="px-6 py-8 flex flex-col h-full">
              {/* Mobile Navigation */}
              <nav className="space-y-6 flex-1">
                {menuItems.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className="block text-2xl font-bold text-gray-300 hover:text-white transition-colors duration-200"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.name}
                  </a>
                ))}
              </nav>
              
              {/* Mobile Auth */}
              <div className="pt-8 border-t border-white/10 mt-auto">
                <AuthButtons />
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}