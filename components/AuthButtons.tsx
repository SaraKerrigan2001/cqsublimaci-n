"use client"

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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
import { User, Shield } from "lucide-react";

export function AuthButtons() {
  const [loginOpen, setLoginOpen] = useState(false);
  const [registerOpen, setRegisterOpen] = useState(false);
  const [adminLoginOpen, setAdminLoginOpen] = useState(false);
  const [cotizarOpen, setCotizarOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  // Estados para formularios
  const [loginForm, setLoginForm] = useState({ email: "", password: "" });
  const [registerForm, setRegisterForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "USER" as "USER" | "ADMIN"
  });
  const [cotizarForm, setCotizarForm] = useState({
    nombreCompleto: "",
    email: "",
    whatsapp: "",
    cotizacionDirigida: "",
    tipoCliente: "",
    urgenciaProyecto: "Normal (2-3 semanas)",
    descripcionProyecto: ""
  });

  const roleOptions: Option[] = [
    { value: "USER", label: "Usuario" },
    { value: "ADMIN", label: "Administrador" }
  ];

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

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(loginForm)
      });

      const data = await response.json();
      
      if (response.ok) {
        alert('Login exitoso');
        setLoginOpen(false);
        setLoginForm({ email: "", password: "" });
        // Aquí puedes manejar el estado de autenticación
      } else {
        alert(data.error || 'Error en el login');
      }
    } catch (error) {
      alert('Error de conexión');
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(registerForm)
      });

      const data = await response.json();
      
      if (response.ok) {
        alert('Registro exitoso');
        setRegisterOpen(false);
        setRegisterForm({ name: "", email: "", password: "", role: "USER" });
      } else {
        alert(data.error || 'Error en el registro');
      }
    } catch (error) {
      alert('Error de conexión');
    } finally {
      setLoading(false);
    }
  };

  const handleAdminLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...loginForm, adminAccess: true })
      });

      const data = await response.json();
      
      if (response.ok && data.user.role === 'ADMIN') {
        alert('Acceso de administrador exitoso');
        setAdminLoginOpen(false);
        setLoginForm({ email: "", password: "" });
        // Redirigir al dashboard de admin
        window.location.href = '/admin';
      } else {
        alert('Acceso denegado. Solo administradores.');
      }
    } catch (error) {
      alert('Error de conexión');
    } finally {
      setLoading(false);
    }
  };

  const handleCotizar = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      // Aquí puedes enviar la cotización a tu API
      const response = await fetch('/api/cotizaciones', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(cotizarForm)
      });

      if (response.ok) {
        alert('Cotización enviada exitosamente. Te contactaremos pronto.');
        setCotizarOpen(false);
        setCotizarForm({
          nombreCompleto: "",
          email: "",
          whatsapp: "",
          cotizacionDirigida: "",
          tipoCliente: "",
          urgenciaProyecto: "Normal (2-3 semanas)",
          descripcionProyecto: ""
        });
      } else {
        alert('Error al enviar la cotización. Intenta nuevamente.');
      }
    } catch (error) {
      alert('Error de conexión. Intenta nuevamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="flex items-center gap-3">
        {/* Usuario */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="inline-flex items-center justify-center h-9 px-3 rounded-md text-sm font-medium border border-gray-500 text-white bg-transparent hover:bg-white/10 transition-colors">
              <User className="w-4 h-4 mr-2" />
              Usuario
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="bg-gray-900 border-gray-700">
            <DropdownMenuItem 
              className="text-white hover:bg-gray-800 cursor-pointer"
              onClick={() => setLoginOpen(true)}
            >
              Iniciar Sesión
            </DropdownMenuItem>
            <DropdownMenuItem 
              className="text-white hover:bg-gray-800 cursor-pointer"
              onClick={() => setRegisterOpen(true)}
            >
              Registrarse
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Administrador */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="inline-flex items-center justify-center h-9 px-3 rounded-md text-sm font-medium border border-orange-500 text-orange-400 bg-transparent hover:bg-orange-500/10 transition-colors">
              <Shield className="w-4 h-4 mr-2" />
              Admin
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="bg-gray-900 border-gray-700">
            <DropdownMenuItem 
              className="text-white hover:bg-gray-800 cursor-pointer"
              onClick={() => setAdminLoginOpen(true)}
            >
              Acceso Admin
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Botón Cotizar original */}
        <button 
          className="inline-flex items-center justify-center h-9 px-4 rounded-md text-sm font-medium bg-indigo-600 hover:bg-indigo-700 text-white transition-colors"
          onClick={() => setCotizarOpen(true)}
        >
          Cotizar
        </button>
      </div>

      {/* Modal de Login */}
      <Dialog open={loginOpen} onOpenChange={setLoginOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Iniciar Sesión</DialogTitle>
            <DialogDescription>
              Ingresa tus credenciales para acceder a tu cuenta
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <Label htmlFor="login-email">Email</Label>
              <Input
                id="login-email"
                type="email"
                value={loginForm.email}
                onChange={(e) => setLoginForm({ ...loginForm, email: e.target.value })}
                required
              />
            </div>
            <div>
              <Label htmlFor="login-password">Contraseña</Label>
              <Input
                id="login-password"
                type="password"
                value={loginForm.password}
                onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                required
              />
            </div>
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Iniciando..." : "Iniciar Sesión"}
            </Button>
          </form>
        </DialogContent>
      </Dialog>

      {/* Modal de Registro */}
      <Dialog open={registerOpen} onOpenChange={setRegisterOpen}>
        <DialogContent className="sm:max-w-md bg-gray-900 border-gray-700 text-white">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-white">Registrarse</DialogTitle>
            <DialogDescription className="text-gray-400">
              Crea una nueva cuenta para comenzar
            </DialogDescription>
          </DialogHeader>
          
          <form onSubmit={handleRegister} className="space-y-6">
            <div>
              <Label htmlFor="register-name" className="text-white font-medium mb-2 block">
                Nombre
              </Label>
              <Input
                id="register-name"
                placeholder="María Paula"
                value={registerForm.name}
                onChange={(e) => setRegisterForm({ ...registerForm, name: e.target.value })}
                className="bg-gray-800 border-gray-600 text-white placeholder:text-gray-400 focus:border-blue-500 focus:ring-blue-500"
                required
              />
            </div>
            
            <div>
              <Label htmlFor="register-email" className="text-white font-medium mb-2 block">
                Email
              </Label>
              <Input
                id="register-email"
                type="email"
                placeholder="paitocapacho5@gmail.com"
                value={registerForm.email}
                onChange={(e) => setRegisterForm({ ...registerForm, email: e.target.value })}
                className="bg-gray-800 border-gray-600 text-white placeholder:text-gray-400 focus:border-blue-500 focus:ring-blue-500"
                required
              />
            </div>
            
            <div>
              <Label htmlFor="register-password" className="text-white font-medium mb-2 block">
                Contraseña
              </Label>
              <Input
                id="register-password"
                type="password"
                placeholder="••••"
                value={registerForm.password}
                onChange={(e) => setRegisterForm({ ...registerForm, password: e.target.value })}
                className="bg-gray-800 border-gray-600 text-white placeholder:text-gray-400 focus:border-blue-500 focus:ring-blue-500"
                required
              />
            </div>
            
            <div>
              <Label htmlFor="register-role" className="text-white font-medium mb-2 block">
                Tipo de Usuario
              </Label>
              <select
                id="register-role"
                value={registerForm.role}
                onChange={(e) => setRegisterForm({ ...registerForm, role: e.target.value as "USER" | "ADMIN" })}
                className="w-full bg-gray-800 border border-gray-600 text-white rounded-md px-3 py-2 focus:border-blue-500 focus:ring-blue-500 focus:outline-none"
              >
                <option value="USER">Usuario</option>
                <option value="ADMIN">Administrador</option>
              </select>
            </div>
            
            <Button 
              type="submit" 
              className="w-full bg-white text-gray-900 hover:bg-gray-100 font-medium py-3 rounded-md transition-colors" 
              disabled={loading}
            >
              {loading ? "Registrando..." : "Registrarse"}
            </Button>
          </form>
        </DialogContent>
      </Dialog>

      {/* Modal de Admin Login */}
      <Dialog open={adminLoginOpen} onOpenChange={setAdminLoginOpen}>
        <DialogContent className="sm:max-w-md bg-gray-900 border-gray-700 text-white">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-white">Acceso de Administrador</DialogTitle>
            <DialogDescription className="text-gray-400">
              Solo usuarios con permisos de administrador pueden acceder
            </DialogDescription>
          </DialogHeader>
          
          <form onSubmit={handleAdminLogin} className="space-y-6">
            <div>
              <Label htmlFor="admin-email" className="text-white font-medium mb-2 block">
                Email
              </Label>
              <Input
                id="admin-email"
                type="email"
                placeholder="paitocapacho5@gmail.com"
                value={loginForm.email}
                onChange={(e) => setLoginForm({ ...loginForm, email: e.target.value })}
                className="bg-gray-800 border-gray-600 text-white placeholder:text-gray-400 focus:border-orange-500 focus:ring-orange-500"
                required
              />
            </div>
            
            <div>
              <Label htmlFor="admin-password" className="text-white font-medium mb-2 block">
                Contraseña
              </Label>
              <Input
                id="admin-password"
                type="password"
                placeholder="••••"
                value={loginForm.password}
                onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                className="bg-gray-800 border-gray-600 text-white placeholder:text-gray-400 focus:border-orange-500 focus:ring-orange-500"
                required
              />
            </div>
            
            <Button 
              type="submit" 
              className="w-full bg-orange-600 text-white hover:bg-orange-700 font-medium py-3 rounded-md transition-colors" 
              disabled={loading}
            >
              {loading ? "Verificando..." : "Acceder como Admin"}
            </Button>
          </form>
        </DialogContent>
      </Dialog>

      {/* Modal de Cotización */}
      <Dialog open={cotizarOpen} onOpenChange={setCotizarOpen}>
        <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto bg-gradient-to-br from-[#050012] via-[#0b0430] to-[#120046] border border-white/10">
          <DialogHeader>
            <DialogTitle className="text-white text-xl font-bold">
              Solicitar Cotización
            </DialogTitle>
            <DialogDescription className="text-gray-300">
              Completa el formulario y te contactaremos para brindarte una cotización personalizada
            </DialogDescription>
          </DialogHeader>
          
          <form onSubmit={handleCotizar} className="space-y-6">
            {/* Sección: Tus datos de contacto */}
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

            {/* Sección: Detalles del proyecto */}
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

              {/* Nota informativa */}
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
    </>
  );
}