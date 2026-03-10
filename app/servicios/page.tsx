import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Printer, 
  Palette, 
  Coffee, 
  Shirt, 
  Zap, 
  Star,
  ArrowRight,
  Check
} from "lucide-react";

export default function ServiciosPage() {
  const services = [
    {
      icon: Coffee,
      title: "Sublimación de Tazas",
      description: "Tazas personalizadas con diseños únicos y colores vibrantes que no se desvanecen.",
      features: ["Cerámica de alta calidad", "Colores vibrantes", "Resistente al lavado", "Diseño personalizado"],
      price: "Desde $15.99",
      gradient: "from-blue-500 to-cyan-500"
    },
    {
      icon: Shirt,
      title: "Camisetas Sublimadas",
      description: "Camisetas 100% poliéster con impresión de alta definición y tacto suave.",
      features: ["Tela 100% poliéster", "Impresión HD", "Tacto suave", "Colores duraderos"],
      price: "Desde $25.99",
      gradient: "from-purple-500 to-pink-500"
    },
    {
      icon: Printer,
      title: "Impresión 3D",
      description: "Figuras, prototipos y objetos personalizados con tecnología de impresión 3D.",
      features: ["Material PLA/ABS", "Alta precisión", "Acabado profesional", "Diseño a medida"],
      price: "Desde $35.99",
      gradient: "from-green-500 to-emerald-500"
    },
    {
      icon: Palette,
      title: "Diseño Gráfico",
      description: "Creación de diseños únicos y profesionales para todos tus proyectos.",
      features: ["Diseño original", "Múltiples formatos", "Revisiones incluidas", "Entrega rápida"],
      price: "Desde $20.99",
      gradient: "from-orange-500 to-red-500"
    }
  ];

  const process = [
    {
      step: "01",
      title: "Consulta",
      description: "Nos cuentas tu idea y definimos los detalles del proyecto."
    },
    {
      step: "02",
      title: "Diseño",
      description: "Creamos o adaptamos el diseño según tus especificaciones."
    },
    {
      step: "03",
      title: "Producción",
      description: "Fabricamos tu producto con la más alta calidad."
    },
    {
      step: "04",
      title: "Entrega",
      description: "Recibes tu producto terminado en tiempo récord."
    }
  ];

  return (
    <main className="min-h-screen">
      <Header />
      
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#050012] via-[#0b0430] to-[#120046]" />
        
        <div className="relative container mx-auto px-5 md:px-10 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Nuestros{" "}
            <span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
              Servicios
            </span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Transformamos tus ideas en productos únicos con tecnología de vanguardia 
            y acabados profesionales
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section id="servicios" className="py-16 md:py-20">
        <div className="container mx-auto px-5 md:px-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => {
              const IconComponent = service.icon;
              
              return (
                <Card key={index} className="bg-white/5 border-white/10 overflow-hidden group hover:bg-white/10 transition-all duration-300">
                  <CardHeader className="pb-4">
                    <div className="flex items-center gap-4 mb-4">
                      <div className={`p-3 rounded-xl bg-gradient-to-br ${service.gradient}`}>
                        <IconComponent className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <CardTitle className="text-white text-xl">{service.title}</CardTitle>
                        <p className="text-indigo-400 font-semibold">{service.price}</p>
                      </div>
                    </div>
                    <p className="text-gray-300">{service.description}</p>
                  </CardHeader>
                  
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      {service.features.map((feature, i) => (
                        <div key={i} className="flex items-center gap-2 text-sm text-gray-300">
                          <Check className="w-4 h-4 text-green-400" />
                          {feature}
                        </div>
                      ))}
                    </div>
                    
                    <Button className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700">
                      Solicitar Cotización
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section id="proceso" className="py-16 md:py-20 bg-gradient-to-b from-[#120046] to-[#050012]">
        <div className="container mx-auto px-5 md:px-10">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Nuestro Proceso
            </h2>
            <p className="text-gray-300 text-lg">
              Desde la idea hasta el producto final en 4 simples pasos
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {process.map((item, index) => (
              <div key={index} className="text-center group">
                <div className="relative mb-6">
                  <div className="w-16 h-16 mx-auto bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-xl group-hover:scale-110 transition-transform duration-300">
                    {item.step}
                  </div>
                  {index < process.length - 1 && (
                    <div className="hidden md:block absolute top-8 left-full w-full h-0.5 bg-gradient-to-r from-indigo-600/50 to-purple-600/50" />
                  )}
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">{item.title}</h3>
                <p className="text-gray-300 text-sm">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-5 md:px-10 text-center">
          <div className="max-w-3xl mx-auto bg-gradient-to-r from-indigo-600/20 to-purple-600/20 backdrop-blur-sm border border-white/10 rounded-3xl p-8 md:p-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              ¿Listo para comenzar tu proyecto?
            </h2>
            <p className="text-gray-300 text-lg mb-8">
              Contáctanos hoy y recibe una cotización personalizada sin compromiso
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700">
                Solicitar Cotización
              </Button>
              <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10">
                Ver Galería
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}