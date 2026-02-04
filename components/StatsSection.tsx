import { Printer, Users, Palette, Zap } from "lucide-react";

export function StatsSection() {
  const stats = [
    {
      icon: Palette,
      value: "+300",
      label: "Diseños",
      description: "Creados",
      color: "from-indigo-500 to-blue-500"
    },
    {
      icon: Users,
      value: "+120",
      label: "Clientes",
      description: "Satisfechos",
      color: "from-purple-500 to-pink-500"
    },
    {
      icon: Printer,
      value: "Impresión",
      label: "3D",
      description: "Profesional",
      color: "from-green-500 to-emerald-500"
    },
    {
      icon: Zap,
      value: "Sublimación",
      label: "HD",
      description: "Alta Calidad",
      color: "from-orange-500 to-red-500"
    }
  ];

  return (
    <section className="relative py-16 md:py-20">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#120046] via-[#0b0430] to-[#050012]" />
      
      <div className="relative container mx-auto px-5 md:px-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {stats.map((stat, index) => {
            const IconComponent = stat.icon;
            
            return (
              <div
                key={index}
                className="group relative overflow-hidden rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 p-4 md:p-6 text-center hover:bg-white/10 transition-all duration-300 hover:scale-105"
              >
                {/* Background Gradient */}
                <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />
                
                {/* Icon */}
                <div className="relative mb-3 flex justify-center">
                  <div className={`p-3 rounded-xl bg-gradient-to-br ${stat.color} shadow-lg`}>
                    <IconComponent className="w-6 h-6 text-white" />
                  </div>
                </div>

                {/* Content */}
                <div className="relative space-y-1">
                  <div className="text-xl md:text-2xl font-bold text-white">
                    {stat.value}
                  </div>
                  <div className="text-sm md:text-base font-semibold text-gray-200">
                    {stat.label}
                  </div>
                  <div className="text-xs text-gray-400">
                    {stat.description}
                  </div>
                </div>

                {/* Hover Effect */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform -skew-x-12" />
              </div>
            );
          })}
        </div>

        {/* Bottom Text */}
        <div className="text-center mt-12">
          <p className="text-gray-400 text-sm md:text-base">
            Más de <span className="text-indigo-400 font-semibold">3 años</span> creando 
            experiencias únicas para nuestros clientes
          </p>
        </div>
      </div>
    </section>
  );
}