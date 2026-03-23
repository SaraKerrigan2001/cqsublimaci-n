import Link from "next/link";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Heart, Star } from "lucide-react";

export function FeaturedWorks() {
  const works = [
    {
      id: 1,
      title: "Taza Personalizada Premium",
      subtitle: "Sublimación HD",
      category: "Sublimación",
      gradient: "from-blue-500 to-cyan-500",
      image: "/images/taza.png",
      rating: 5,
      likes: 24
    },
    {
      id: 2,
      title: "Camiseta Gamer Edition",
      subtitle: "Diseño Exclusivo",
      category: "Sublimación",
      gradient: "from-purple-500 to-pink-500",
      image: "/images/camiseta.png",
      rating: 5,
      likes: 18
    },
    {
      id: 3,
      title: "Figura 3D Personalizada",
      subtitle: "Impresión 3D",
      category: "Impresión 3D",
      gradient: "from-green-500 to-emerald-500",
      image: "/images/figura3d.png",
      rating: 5,
      likes: 32
    },
    {
      id: 4,
      title: "Logo Corporativo",
      subtitle: "Diseño Profesional",
      category: "Diseño Gráfico",
      gradient: "from-orange-500 to-red-500",
      image: "/images/logo.png",
      rating: 5,
      likes: 15
    },
    {
      id: 5,
      title: "Mouse Pad Gaming",
      subtitle: "Sublimación + LED",
      category: "Sublimación",
      gradient: "from-indigo-500 to-purple-500",
      image: "/images/mousepad.png",
      rating: 5,
      likes: 28
    }
  ];

  return (
    <section id="galeria" className="relative py-16 md:py-20">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#050012] via-[#0b0430] to-[#120046]" />
      
      <div className="relative container mx-auto px-5 md:px-10">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
            Trabajos{" "}
            <span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
              Destacados
            </span>
          </h2>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Descubre algunos de nuestros proyectos más creativos y populares
          </p>
        </div>

        {/* Works Grid */}
        <div className="relative">
          {/* Mobile: Horizontal Scroll */}
          <div className="flex md:hidden gap-6 overflow-x-auto pb-4 scrollbar-hide">
            {works.map((work) => (
              <WorkCard key={work.id} work={work} />
            ))}
          </div>

          {/* Desktop: Grid */}
          <div className="hidden md:grid md:grid-cols-5 gap-6">
            {works.map((work) => (
              <WorkCard key={work.id} work={work} />
            ))}
          </div>

          {/* Scroll Indicator (Mobile) */}
          <div className="md:hidden flex justify-center mt-4 gap-2">
            {works.map((_, index) => (
              <div
                key={index}
                className="w-2 h-2 rounded-full bg-white/20"
              />
            ))}
          </div>
        </div>

        <div className="text-center mt-12">
          <Link href="/servicios">
            <Button
              size="lg"
              variant="outline"
              className="border-indigo-500 text-indigo-400 hover:bg-indigo-500/10"
            >
              Ver Todos los Servicios
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}

function WorkCard({ work }: { work: any }) {
  return (
    <Card className="min-w-[280px] md:min-w-0 bg-white/5 border-white/10 overflow-hidden group hover:bg-white/10 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-indigo-500/20" style={{ transformStyle: 'preserve-3d', perspective: '1000px' }}>
      <CardContent className="p-0">
        {/* Image Container */}
        <div className="relative h-48 md:h-56 overflow-hidden">
          {/* Real Image with 3D Effect Hover */}
          <div className={`w-full h-full bg-gradient-to-br ${work.gradient} flex items-center justify-center relative group-hover:scale-110 group-hover:rotate-1 transition-transform duration-700`}>
            {work.image ? (
              <Image 
                src={work.image} 
                alt={work.title} 
                fill 
                className="object-cover mix-blend-overlay opacity-80 group-hover:opacity-100 group-hover:mix-blend-normal transition-all duration-700"
                sizes="(max-width: 768px) 100vw, 20vw"
              />
            ) : (
              <div className="absolute inset-0 bg-black/20" />
            )}
            
            {/* Shadow Overlay for depth */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#050012]/90 via-[#050012]/30 to-transparent z-10 pointer-events-none" />

            {/* Stats Overlay */}
            <div className="absolute top-3 right-3 flex gap-2 z-20 group-hover:-translate-y-1 group-hover:scale-105 transition-all duration-500">
              <div className="flex items-center gap-1 bg-black/40 backdrop-blur-md rounded-full px-2 py-1 border border-white/10 shadow-xl">
                <Heart className="w-3 h-3 text-red-400 drop-shadow-md" />
                <span className="text-xs font-bold text-white">{work.likes}</span>
              </div>
            </div>

            {/* Category Badge */}
            <div className="absolute bottom-3 left-3 z-20 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:scale-105 transition-all duration-500">
              <span className="bg-white/10 backdrop-blur-md text-white text-xs font-bold px-3 py-1.5 rounded-full border border-white/20 shadow-xl">
                {work.category}
              </span>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-4 space-y-3">
          <div>
            <h4 className="font-semibold text-white text-sm md:text-base line-clamp-1">
              {work.title}
            </h4>
            <p className="text-xs md:text-sm text-gray-400">
              {work.subtitle}
            </p>
          </div>

          {/* Rating */}
          <div className="flex items-center gap-1">
            {[...Array(work.rating)].map((_, i) => (
              <Star key={i} className="w-3 h-3 fill-yellow-400 text-yellow-400" />
            ))}
            <span className="text-xs text-gray-400 ml-1">({work.rating}.0)</span>
          </div>

          {/* Action */}
          <Button
            size="sm"
            variant="ghost"
            className="w-full text-indigo-400 hover:text-indigo-300 hover:bg-indigo-500/10"
          >
            Ver Detalles
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}