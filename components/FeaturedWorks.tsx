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
      rating: 5,
      likes: 24
    },
    {
      id: 2,
      title: "Camiseta Gamer Edition",
      subtitle: "Diseño Exclusivo",
      category: "Sublimación",
      gradient: "from-purple-500 to-pink-500",
      rating: 5,
      likes: 18
    },
    {
      id: 3,
      title: "Figura 3D Personalizada",
      subtitle: "Impresión 3D",
      category: "Impresión 3D",
      gradient: "from-green-500 to-emerald-500",
      rating: 5,
      likes: 32
    },
    {
      id: 4,
      title: "Logo Corporativo",
      subtitle: "Diseño Profesional",
      category: "Diseño Gráfico",
      gradient: "from-orange-500 to-red-500",
      rating: 5,
      likes: 15
    },
    {
      id: 5,
      title: "Mouse Pad Gaming",
      subtitle: "Sublimación + LED",
      category: "Sublimación",
      gradient: "from-indigo-500 to-purple-500",
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
    <Card className="min-w-[280px] md:min-w-0 bg-white/5 border-white/10 overflow-hidden group hover:bg-white/10 transition-all duration-300 hover:scale-105">
      <CardContent className="p-0">
        {/* Image Container */}
        <div className="relative h-48 md:h-56 overflow-hidden">
          {/* Placeholder Image with Gradient */}
          <div className={`w-full h-full bg-gradient-to-br ${work.gradient} flex items-center justify-center relative`}>
            {/* Content Overlay */}
            <div className="absolute inset-0 bg-black/20" />
            
            {/* Placeholder Content */}
            <div className="relative text-center text-white z-10">
              <div className="text-4xl mb-2">
                {work.category === 'Sublimación' ? '☕' : 
                 work.category === 'Impresión 3D' ? '🎯' : '🎨'}
              </div>
              <div className="text-sm font-medium opacity-90">
                {work.category}
              </div>
            </div>

            {/* Stats Overlay */}
            <div className="absolute top-3 right-3 flex gap-2">
              <div className="flex items-center gap-1 bg-black/30 backdrop-blur-sm rounded-full px-2 py-1">
                <Heart className="w-3 h-3 text-red-400" />
                <span className="text-xs text-white">{work.likes}</span>
              </div>
            </div>

            {/* Category Badge */}
            <div className="absolute bottom-3 left-3">
              <span className="bg-white/20 backdrop-blur-sm text-white text-xs px-2 py-1 rounded-full">
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