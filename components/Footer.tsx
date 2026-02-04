import { Instagram, MessageCircle, Mail, Phone, MapPin } from "lucide-react";

export function Footer() {
  // Usar un año fijo para evitar problemas de hidratación
  const currentYear = 2026;

  const socialLinks = [
    {
      name: "Instagram",
      icon: Instagram,
      href: "#",
      color: "hover:text-pink-400"
    },
    {
      name: "WhatsApp",
      icon: MessageCircle,
      href: "#",
      color: "hover:text-green-400"
    }
  ];

  const contactInfo = [
    {
      icon: Mail,
      label: "Email",
      value: "info@cqsublimacion.com",
      href: "mailto:info@cqsublimacion.com"
    },
    {
      icon: Phone,
      label: "Teléfono",
      value: "+1 (555) 123-4567",
      href: "tel:+15551234567"
    },
    {
      icon: MapPin,
      label: "Ubicación",
      value: "Tu Ciudad, País",
      href: "#"
    }
  ];

  const quickLinks = [
    { name: "Inicio", href: "#inicio" },
    { name: "Servicios", href: "#servicios" },
    { name: "Galería", href: "#galeria" },
    { name: "Contacto", href: "#contacto" }
  ];

  const services = [
    "Sublimación de Tazas",
    "Camisetas Personalizadas",
    "Impresión 3D",
    "Diseño Gráfico"
  ];

  return (
    <footer className="relative bg-gradient-to-b from-[#050012] to-[#000000] text-white">
      {/* Top Wave */}
      <div className="absolute top-0 left-0 right-0">
        <svg viewBox="0 0 1200 120" fill="none" className="w-full h-12 text-[#050012]">
          <path d="M0,60 C300,0 900,120 1200,60 L1200,0 L0,0 Z" fill="currentColor" />
        </svg>
      </div>

      <div className="relative pt-16 pb-8">
        <div className="container mx-auto px-5 md:px-10">
          {/* Main Footer Content */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            {/* Company Info */}
            <div className="space-y-4">
              <div>
                <h3 className="text-xl font-bold mb-2">CQ Sublimación</h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  Transformamos tus ideas en productos únicos con tecnología de impresión 3D 
                  y sublimación de alta calidad.
                </p>
              </div>
              
              {/* Social Links */}
              <div className="flex gap-4">
                {socialLinks.map((social) => {
                  const IconComponent = social.icon;
                  return (
                    <a
                      key={social.name}
                      href={social.href}
                      className={`p-2 rounded-lg bg-white/5 border border-white/10 ${social.color} transition-all duration-200 hover:bg-white/10 hover:scale-110`}
                      aria-label={social.name}
                    >
                      <IconComponent className="w-5 h-5" />
                    </a>
                  );
                })}
              </div>
            </div>

            {/* Quick Links */}
            <div className="space-y-4">
              <h4 className="text-lg font-semibold">Enlaces Rápidos</h4>
              <ul className="space-y-2">
                {quickLinks.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className="text-gray-400 hover:text-white transition-colors duration-200 text-sm"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Services */}
            <div className="space-y-4">
              <h4 className="text-lg font-semibold">Servicios</h4>
              <ul className="space-y-2">
                {services.map((service) => (
                  <li key={service}>
                    <span className="text-gray-400 text-sm">
                      {service}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Info */}
            <div className="space-y-4">
              <h4 className="text-lg font-semibold">Contacto</h4>
              <div className="space-y-3">
                {contactInfo.map((contact) => {
                  const IconComponent = contact.icon;
                  return (
                    <a
                      key={contact.label}
                      href={contact.href}
                      className="flex items-center gap-3 text-gray-400 hover:text-white transition-colors duration-200 group"
                    >
                      <div className="p-2 rounded-lg bg-white/5 border border-white/10 group-hover:bg-white/10 transition-colors duration-200">
                        <IconComponent className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-xs text-gray-500">{contact.label}</div>
                        <div className="text-sm">{contact.value}</div>
                      </div>
                    </a>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Bottom Section */}
          <div className="border-t border-white/10 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              {/* Copyright */}
              <div className="text-center md:text-left">
                <p className="text-gray-400 text-sm">
                  © {currentYear} CQ Sublimación & Impresión 3D. Todos los derechos reservados.
                </p>
              </div>

              {/* Additional Links */}
              <div className="flex flex-wrap justify-center gap-6 text-sm">
                <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">
                  Política de Privacidad
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">
                  Términos de Servicio
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">
                  FAQ
                </a>
              </div>
            </div>

            {/* Made with love */}
            <div className="text-center mt-6 pt-6 border-t border-white/5">
              <p className="text-gray-500 text-xs">
                Hecho con ❤️ para crear experiencias únicas
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}