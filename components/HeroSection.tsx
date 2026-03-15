'use client';

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";
import { Mug3D } from "@/components/Mug3D";

export function HeroSection() {
  return (
    <section id="inicio" className="relative overflow-hidden min-h-[calc(100vh-65px)] flex items-center">
      <div className="absolute inset-0 bg-gradient-to-br from-[#050012] via-[#0b0430] to-[#120046]" />

      <div className="relative w-full container mx-auto px-6 md:px-10 py-6 md:py-14">

        {/* MOBILE */}
        <div className="flex flex-col md:hidden items-center gap-4 text-center">

          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/20 border border-indigo-500/30 text-indigo-300 text-xs">
            <Sparkles className="w-3 h-3" />
            Tecnolog&iacute;a + Creatividad
          </div>

          <h1 className="text-2xl font-bold leading-tight text-white">
            Dise&ntilde;a, Personaliza{" "}
            <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              y Hazlo Real
            </span>
          </h1>

          <p className="text-xs text-gray-300 leading-relaxed max-w-[260px]">
            Impresi&oacute;n 3D y sublimaci&oacute;n con estilo moderno y totalmente personalizado.
          </p>

          <div className="w-[150px] h-[160px] relative mx-auto">
            <div className="absolute inset-0 bg-purple-500/20 blur-xl rounded-full pointer-events-none" />
            <Mug3D />
          </div>

          <div className="flex gap-2 w-full mt-4">
            <Link href="/servicios" passHref className="flex-1">
              <Button size="sm" className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-xs">
                Explorar <ArrowRight className="w-3 h-3 ml-1" />
              </Button>
            </Link>
            <Link href="/servicios#proceso" passHref className="flex-1">
              <Button size="sm" variant="outline" className="w-full border-gray-500 text-white hover:bg-white/10 text-xs">
                Crear dise&ntilde;o
              </Button>
            </Link>
          </div>

          <div className="flex items-center justify-center gap-5">
            <div className="text-center">
              <div className="text-base font-bold text-white">300+</div>
              <div className="text-xs text-gray-400">Dise&ntilde;os</div>
            </div>
            <div className="w-px h-6 bg-gray-600" />
            <div className="text-center">
              <div className="text-base font-bold text-white">120+</div>
              <div className="text-xs text-gray-400">Clientes</div>
            </div>
            <div className="w-px h-6 bg-gray-600" />
            <div className="text-center">
              <div className="text-base font-bold text-white">24h</div>
              <div className="text-xs text-gray-400">Entrega</div>
            </div>
          </div>

        </div>

        {/* DESKTOP */}
        <div className="hidden md:grid md:grid-cols-2 md:gap-8 md:items-center">
          <div className="text-left space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-500/20 border border-indigo-500/30 text-indigo-300 text-sm">
              <Sparkles className="w-4 h-4" />
              Tecnolog&iacute;a + Creatividad
            </div>
            <h1 className="text-5xl lg:text-6xl font-bold leading-[1.1] text-white">
              Dise&ntilde;a, Personaliza{" "}
              <br />
              <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                y Hazlo Real
              </span>
            </h1>
            <p className="text-lg text-gray-300 max-w-xl leading-relaxed">
              Impresi&oacute;n 3D y sublimaci&oacute;n de tazas y camisetas con estilo moderno, creativo y totalmente personalizado.
            </p>
            <div className="flex gap-4">
              <Link href="/servicios" passHref>
                <Button size="lg" className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
                  Explorar <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
              <Link href="/servicios#proceso" passHref>
                <Button size="lg" variant="outline" className="border-gray-500 text-white hover:bg-white/10">
                  Crear dise&ntilde;o
                </Button>
              </Link>
            </div>
            <div className="flex items-center gap-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-white">300+</div>
                <div className="text-sm text-gray-400">Dise&ntilde;os</div>
              </div>
              <div className="w-px h-10 bg-gray-600" />
              <div className="text-center">
                <div className="text-2xl font-bold text-white">120+</div>
                <div className="text-sm text-gray-400">Clientes</div>
              </div>
              <div className="w-px h-10 bg-gray-600" />
              <div className="text-center">
                <div className="text-2xl font-bold text-white">24h</div>
                <div className="text-sm text-gray-400">Entrega</div>
              </div>
            </div>
          </div>
          <div className="relative flex justify-center items-center">
            <div className="absolute inset-0 bg-purple-500/20 blur-3xl rounded-full pointer-events-none" />
            <div className="w-[340px] h-[380px]">
              <Mug3D />
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}