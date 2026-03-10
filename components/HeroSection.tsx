import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";

export function HeroSection() {
  return (
    <section id="inicio" className="relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#050012] via-[#0b0430] to-[#120046]" />
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3e%3cg fill='none' fill-rule='evenodd'%3e%3cg fill='%23ffffff' fill-opacity='0.1'%3e%3ccircle cx='30' cy='30' r='1'/%3e%3c/g%3e%3c/g%3e%3c/svg%3e")`,
        }} />
      </div>
      
      <div className="relative container mx-auto px-5 md:px-10 py-16 md:py-24">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="text-center md:text-left space-y-8">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-500/20 border border-indigo-500/30 text-indigo-300 text-sm">
              <Sparkles className="w-4 h-4" />
              Tecnología + Creatividad
            </div>

            {/* Main Title */}
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight text-white">
              Diseña, Personaliza{" "}
              <br className="hidden md:block" />
              <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                y Hazlo Real
              </span>
            </h1>

            {/* Description */}
            <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto md:mx-0 leading-relaxed">
              Impresión 3D y sublimación de tazas y camisetas con estilo moderno,
              creativo y totalmente personalizado.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <Link href="/servicios" passHref>
                <Button 
                  size="lg"
                  className="w-full sm:w-auto bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white shadow-lg shadow-indigo-500/25"
                >
                  Explorar
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
              <Link href="/servicios#proceso" passHref>
                <Button
                  size="lg"
                  variant="outline"
                  className="w-full sm:w-auto border-gray-500 text-white hover:bg-white/10 backdrop-blur-sm"
                >
                  Crear diseño
                </Button>
              </Link>
            </div>

            {/* Trust Indicators */}
            <div className="flex items-center justify-center md:justify-start gap-6 pt-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-white">300+</div>
                <div className="text-sm text-gray-400">Diseños</div>
              </div>
              <div className="w-px h-12 bg-gray-600" />
              <div className="text-center">
                <div className="text-2xl font-bold text-white">120+</div>
                <div className="text-sm text-gray-400">Clientes</div>
              </div>
              <div className="w-px h-12 bg-gray-600" />
              <div className="text-center">
                <div className="text-2xl font-bold text-white">24h</div>
                <div className="text-sm text-gray-400">Entrega</div>
              </div>
            </div>
          </div>

          {/* Hero Image */}
          <div className="relative flex justify-center">
            {/* Glow Effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/30 via-purple-500/30 to-pink-500/30 blur-3xl rounded-full scale-75" />
            
            {/* Main Image Container */}
            <div className="relative">
              {/* Floating Elements */}
              <div className="absolute -top-4 -left-4 w-8 h-8 bg-indigo-500 rounded-full animate-pulse" />
              <div className="absolute -bottom-6 -right-6 w-6 h-6 bg-purple-500 rounded-full animate-pulse delay-1000" />
              <div className="absolute top-1/2 -right-8 w-4 h-4 bg-pink-500 rounded-full animate-pulse delay-500" />
              
              {/* Main Image */}
              <div className="relative w-80 h-96 md:w-96 md:h-[480px] rounded-3xl overflow-hidden shadow-2xl shadow-indigo-500/25 border border-white/10">
                {/* Placeholder for hero image */}
                <div className="w-full h-full bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 flex items-center justify-center">
                  <div className="text-center text-white">
                    <div className="text-6xl mb-4">🎨</div>
                    <div className="text-lg font-semibold">Diseño Destacado</div>
                    <div className="text-sm opacity-75">Próximamente imagen real</div>
                  </div>
                </div>
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1200 120" fill="none" className="w-full h-12 text-white/5">
          <path d="M0,60 C300,120 900,0 1200,60 L1200,120 L0,120 Z" fill="currentColor" />
        </svg>
      </div>
    </section>
  );
}