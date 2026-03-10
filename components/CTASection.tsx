"use client"

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, Zap, Heart } from "lucide-react";
import { CotizarModal } from "./CotizarModal";

export function CTASection() {
  const [cotizarOpen, setCotizarOpen] = useState(false);

  return (
    <section className="relative py-20 md:py-24 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#120046] via-[#0b0430] to-[#050012]" />
      
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-indigo-500/10 rounded-full blur-xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-24 h-24 bg-purple-500/10 rounded-full blur-xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 right-1/3 w-16 h-16 bg-pink-500/10 rounded-full blur-xl animate-pulse delay-500" />
      </div>

      <div className="relative container mx-auto px-5 md:px-10">
        <div className="max-w-5xl mx-auto">
          {/* Main CTA Card */}
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 p-1">
            {/* Inner Content */}
            <div className="relative bg-gradient-to-r from-indigo-600/90 via-purple-600/90 to-pink-600/90 backdrop-blur-sm rounded-3xl p-8 md:p-12 text-center">
              {/* Decorative Elements */}
              <div className="absolute top-6 left-6 opacity-20">
                <Sparkles className="w-8 h-8 text-white animate-pulse" />
              </div>
              <div className="absolute top-6 right-6 opacity-20">
                <Zap className="w-8 h-8 text-white animate-pulse delay-500" />
              </div>
              <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 opacity-20">
                <Heart className="w-6 h-6 text-white animate-pulse delay-1000" />
              </div>

              {/* Content */}
              <div className="relative z-10 space-y-6">
                {/* Badge */}
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 text-white text-sm">
                  <Sparkles className="w-4 h-4" />
                  ¡Transforma tu idea hoy!
                </div>

                {/* Main Title */}
                <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight">
                  Convierte tu idea en{" "}
                  <span className="relative">
                    algo único
                    <div className="absolute -bottom-2 left-0 right-0 h-1 bg-white/30 rounded-full" />
                  </span>
                </h3>

                {/* Description */}
                <p className="text-lg md:text-xl text-white/90 max-w-3xl mx-auto leading-relaxed">
                  Diseños modernos, impresión precisa y acabados profesionales. 
                  Desde la conceptualización hasta la entrega, hacemos realidad tus proyectos más creativos.
                </p>

                {/* Features */}
                <div className="flex flex-wrap justify-center gap-4 md:gap-8 text-white/80 text-sm md:text-base">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-white rounded-full" />
                    Entrega en 24-48h
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-white rounded-full" />
                    Diseño gratuito
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-white rounded-full" />
                    Garantía de calidad
                  </div>
                </div>

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
                  <Button
                    onClick={() => setCotizarOpen(true)}
                    size="lg"
                    className="bg-white text-indigo-700 hover:bg-gray-100 shadow-xl shadow-black/20 font-semibold px-8"
                  >
                    Cotizar ahora
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                  
                  <Link href="#galeria">
                    <Button
                      size="lg"
                      variant="ghost"
                      className="text-white border-2 border-white/30 hover:bg-white/10 backdrop-blur-sm"
                    >
                      Ver Galería
                    </Button>
                  </Link>
                </div>

                {/* Trust Indicator */}
                <div className="pt-6 border-t border-white/20">
                  <p className="text-white/70 text-sm">
                    Únete a más de <span className="font-semibold text-white">120+ clientes satisfechos</span> que ya confían en nosotros
                  </p>
                  
                  {/* Customer Avatars */}
                  <div className="flex justify-center items-center gap-2 mt-3">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <div
                        key={i}
                        className="w-8 h-8 rounded-full bg-gradient-to-br from-white/20 to-white/10 border border-white/30 flex items-center justify-center text-white text-xs font-semibold"
                      >
                        {String.fromCharCode(65 + i)}
                      </div>
                    ))}
                    <div className="ml-2 text-white/70 text-sm">+115 más</div>
                  </div>
                </div>
              </div>

              {/* Animated Border */}
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-white/20 via-transparent to-white/20 opacity-0 hover:opacity-100 transition-opacity duration-500" />
            </div>
          </div>
        </div>
      </div>

      <CotizarModal open={cotizarOpen} onOpenChange={setCotizarOpen} />
    </section>
  );
}
