'use client';

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";
import { Mug3D } from "@/components/Mug3D";

export function HeroSection() {
  return (
    <section id="inicio" className="relative overflow-hidden min-h-[calc(100vh-65px)] flex items-center">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#050012] via-[#0b0430] to-[#120046]" />

      <div className="relative w-full container mx-auto px-6 md:px-10 py-8 md:py-14">
        <div className="flex flex-col md:grid md:grid-cols-2 md:gap-8 md:items-center">

          {/* Left: Content */}
          <div className="text-center md:text-left space-y-5 order-1">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-500/20 border border-indigo-500/30 text-indigo-300 text-sm">
              <Sparkles className="w-4 h-4" />
              Tecnología + Creatividad
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.1] text-white">
              Diseña, Personaliza{" "}
              <br className="hidden md:block" />
              <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                y Hazlo Real
              </span>
            </h1>

            <p className="text-sm md:text-lg text-gray-300 max-w-xl mx-auto md:mx-0 leading-relaxed">
              Impresión 3D y sublimación de tazas y camisetas con estilo moderno,
              creativo y totalmente personalizado.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 justify-center md:justify-start">
              <Link href="/servicios" passHref className="w-full sm:w-auto">
                <Button size="lg" className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white">
                  Explorar <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
              <Link href="/servicios#proceso" passHref className="w-full sm:w-auto">
                <Button size="lg" variant="outline" className="w-full border-gray-500 text-white hover:bg-white/10">
                  Crear diseño
                </Button>
              </Link>
            </div>

            {/* Stats */}
            <div className="flex items-center justify-center md:justify-start gap-6 pt-1">
              <div className="text-center">
                <div className="text-xl md:text-2xl font-bold text-white">300+</div>
                <div className="text-xs md:text-sm text-gray-400">Diseños</div>
              </div>
              <div className="w-px h-8 bg-gray-600" />
              <div className="text-center">
                <div className="text-xl md:text-2xl font-bold text-white">120+</div>
                <div className="text-xs md:text-sm text-gray-400">Clientes</div>
              </div>
              <div className="w-px h-8 bg-gray-600" />
              <div className="text-center">
                <div className="text-xl md:text-2xl font-bold text-white">24h</div>
                <div className="text-xs md:text-sm text-gray-400">Entrega</div>
              </div>
            </div>
          </div>

          {/* Right: 3D Mug */}
          <div className="relative flex justify-center items-center order-2 mt-6 md:mt-0">
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/20 via-purple-500/20 to-pink-500/20 blur-3xl rounded-full pointer-events-none" />
            <div className="absolute top-0 left-1/4 w-4 h-4 bg-indigo-500 rounded-full animate-pulse pointer-events-none" />
            <div className="absolute bottom-0 right-1/4 w-3 h-3 bg-purple-500 rounded-full animate-pulse delay-1000 pointer-events-none" />
            {/* Tamaño fijo para que no se desborde en móvil */}
            <div className="w-[240px] h-[280px] sm:w-[280px] sm:h-[320px] md:w-[340px] md:h-[380px]">
              <Mug3D />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
