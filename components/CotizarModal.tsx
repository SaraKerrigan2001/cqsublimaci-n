"use client"

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CustomSelect, Option } from "@/components/ui/select-custom";

interface CotizarModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CotizarModal({ open, onOpenChange }: CotizarModalProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const [cotizarForm, setCotizarForm] = useState({
    nombreCompleto: "",
    email: "",
    whatsapp: "",
    cotizacionDirigida: "",
    tipoCliente: "",
    urgenciaProyecto: "Normal (2-3 semanas)",
    descripcionProyecto: ""
  });

  const tipoClienteOptions: Option[] = [
    { value: "empresa", label: "Empresa" },
    { value: "particular", label: "Particular" },
    { value: "organizacion", label: "Organización" },
    { value: "otro", label: "Otro" }
  ];

  const urgenciaOptions: Option[] = [
    { value: "Normal (2-3 semanas)", label: "Normal (2-3 semanas)" },
    { value: "Urgente (1 semana)", label: "Urgente (1 semana)" },
    { value: "Express (3-5 días)", label: "Express (3-5 días)" }
  ];

  const handleCotizar = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const response = await fetch('/api/cotizaciones', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(cotizarForm)
      });

      if (response.ok) {
        setSuccess('Cotización enviada exitosamente. Te contactaremos pronto.');
        setError(null);
        setCotizarForm({
          nombreCompleto: "",
          email: "",
          whatsapp: "",
          cotizacionDirigida: "",
          tipoCliente: "",
          urgenciaProyecto: "Normal (2-3 semanas)",
          descripcionProyecto: ""
        });
        setTimeout(() => {
          onOpenChange(false);
          setSuccess(null);
        }, 3000);
      } else {
        setError('Error al enviar la cotización. Intenta nuevamente.');
      }
    } catch (error) {
      setError('Error de conexión. Intenta nuevamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto bg-gradient-to-br from-[#050012] via-[#0b0430] to-[#120046] border border-white/10">
        <DialogHeader>
          <DialogTitle className="text-white text-xl font-bold">
            Solicitar Cotización
          </DialogTitle>
          <DialogDescription className="text-gray-300">
            Completa el formulario y te contactaremos para brindarte una cotización personalizada
          </DialogDescription>
        </DialogHeader>

        {error && (
          <div className="bg-red-500/10 border border-red-500 text-red-500 px-4 py-2 rounded-md text-sm mb-4 animate-in fade-in slide-in-from-top-1">
            {error}
          </div>
        )}

        {success && (
          <div className="bg-green-500/10 border border-green-500 text-green-500 px-4 py-2 rounded-md text-sm mb-4 animate-in fade-in slide-in-from-top-1">
            {success}
          </div>
        )}
        
        <form onSubmit={handleCotizar} className="space-y-6">
          <div className="space-y-4">
            <h3 className="text-white font-semibold text-lg border-l-4 border-indigo-500 pl-3">
              Tus datos de contacto
            </h3>
            
            <div>
              <Label htmlFor="cotizar-nombre" className="text-white font-medium">
                Nombre completo *
              </Label>
              <Input
                id="cotizar-nombre"
                placeholder="Por ejemplo: Raquel Ramírez"
                value={cotizarForm.nombreCompleto}
                onChange={(e) => setCotizarForm({ ...cotizarForm, nombreCompleto: e.target.value })}
                className="mt-1 bg-gray-800/50 border border-gray-600 text-white placeholder:text-gray-400 focus:border-indigo-500"
                required
              />
            </div>

            <div>
              <Label htmlFor="cotizar-email" className="text-white font-medium">
                Email *
              </Label>
              <Input
                id="cotizar-email"
                type="email"
                placeholder="Por ejemplo: tucorreo@elsitio.com"
                value={cotizarForm.email}
                onChange={(e) => setCotizarForm({ ...cotizarForm, email: e.target.value })}
                className="mt-1 bg-gray-800/50 border border-gray-600 text-white placeholder:text-gray-400 focus:border-indigo-500"
                required
              />
            </div>

            <div>
              <Label htmlFor="cotizar-whatsapp" className="text-white font-medium">
                WhatsApp (Opcional)
              </Label>
              <Input
                id="cotizar-whatsapp"
                placeholder="Por ejemplo: +57 XXX XXX XXXX"
                value={cotizarForm.whatsapp}
                onChange={(e) => setCotizarForm({ ...cotizarForm, whatsapp: e.target.value })}
                className="mt-1 bg-gray-800/50 border border-gray-600 text-white placeholder:text-gray-400 focus:border-indigo-500"
              />
            </div>

            <div>
              <Label htmlFor="cotizar-dirigida" className="text-white font-medium">
                Cotización dirigida a:
              </Label>
              <Input
                id="cotizar-dirigida"
                placeholder="Por ejemplo: Organización S.A.S"
                value={cotizarForm.cotizacionDirigida}
                onChange={(e) => setCotizarForm({ ...cotizarForm, cotizacionDirigida: e.target.value })}
                className="mt-1 bg-gray-800/50 border border-gray-600 text-white placeholder:text-gray-400 focus:border-indigo-500"
              />
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-white font-semibold text-lg border-l-4 border-indigo-500 pl-3">
              Detalles del proyecto
            </h3>

            <div>
              <Label htmlFor="cotizar-tipo-cliente" className="text-white font-medium">
                Tipo de cliente (opcional)
              </Label>
              <div className="mt-1">
                <CustomSelect
                  value={tipoClienteOptions.find(option => option.value === cotizarForm.tipoCliente)}
                  onChange={(selectedOption) => {
                    setCotizarForm({ 
                      ...cotizarForm, 
                      tipoCliente: selectedOption?.value || "" 
                    });
                  }}
                  options={tipoClienteOptions}
                  placeholder="Selecciona una opción"
                  className="[&_.react-select__control]:bg-gray-800/50 [&_.react-select__control]:border-gray-600 [&_.react-select__single-value]:text-white [&_.react-select__placeholder]:text-gray-400 [&_.react-select__menu]:bg-gray-800 [&_.react-select__option]:text-white [&_.react-select__option--is-focused]:bg-indigo-600"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="cotizar-urgencia" className="text-white font-medium">
                Urgencia del proyecto
              </Label>
              <div className="mt-1">
                <CustomSelect
                  value={urgenciaOptions.find(option => option.value === cotizarForm.urgenciaProyecto)}
                  onChange={(selectedOption) => {
                    setCotizarForm({ 
                      ...cotizarForm, 
                      urgenciaProyecto: selectedOption?.value || "Normal (2-3 semanas)" 
                    });
                  }}
                  options={urgenciaOptions}
                  placeholder="Selecciona urgencia"
                  className="[&_.react-select__control]:bg-gray-800/50 [&_.react-select__control]:border-gray-600 [&_.react-select__single-value]:text-white [&_.react-select__placeholder]:text-gray-400 [&_.react-select__menu]:bg-gray-800 [&_.react-select__option]:text-white [&_.react-select__option--is-focused]:bg-indigo-600"
                />
              </div>
            </div>

            <div className="bg-indigo-500/20 border border-indigo-400/30 rounded-lg p-3">
              <div className="flex items-start gap-2">
                <div className="w-5 h-5 bg-indigo-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-white text-xs font-bold">i</span>
                </div>
                <p className="text-gray-300 text-sm">
                  Los proyectos express y urgentes tienen costo adicional
                </p>
              </div>
            </div>

            <div>
              <Label htmlFor="cotizar-descripcion" className="text-white font-medium">
                Describe tu proyecto *
              </Label>
              <textarea
                id="cotizar-descripcion"
                placeholder="Por ejemplo: ...la base de datos que..."
                value={cotizarForm.descripcionProyecto}
                onChange={(e) => setCotizarForm({ ...cotizarForm, descripcionProyecto: e.target.value })}
                className="mt-1 w-full min-h-[120px] p-3 rounded-md bg-gray-800/50 border border-gray-600 text-white placeholder:text-gray-400 resize-none focus:border-indigo-500 focus:outline-none"
                required
              />
            </div>
          </div>

          <Button 
            type="submit" 
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3" 
            disabled={loading}
          >
            {loading ? "Enviando cotización..." : "Enviar Cotización"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
