"use client"

import { useState, useEffect } from "react";
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
import { User, Shield } from "lucide-react";
import { CotizarModal } from "./CotizarModal";

export function AuthButtons() {
  const [loginOpen, setLoginOpen] = useState(false);
  const [registerOpen, setRegisterOpen] = useState(false);
  const [adminLoginOpen, setAdminLoginOpen] = useState(false);
  const [cotizarOpen, setCotizarOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  // Estados para formularios
  const [loginForm, setLoginForm] = useState({ email: "", password: "" });
  const [registerForm, setRegisterForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "USER" as "USER" | "ADMIN"
  });

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
        setError(null);
        setLoginForm({ email: "", password: "" });
        
        // Redirigir según el rol
        if (data.user.role === 'ADMIN') {
          window.location.href = '/admin';
        } else {
          window.location.href = '/usuario';
        }
      } else {
        if (data.details && data.details.length > 0) {
          setError(data.details[0].message);
        } else {
          setError(data.error || 'Error en el login');
        }
      }
    } catch (error) {
      setError('Error de conexión');
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
        setError(null);
        setSuccess('¡Registro exitoso!');
        setRegisterForm({ name: "", email: "", password: "", role: "USER" });
        
        setTimeout(() => {
          setRegisterOpen(false);
          setSuccess(null);
          // Redirigir según el rol (el token ya debería estar en las cookies)
          window.location.href = registerForm.role === 'ADMIN' ? '/admin' : '/usuario';
        }, 1500);
      } else {
        if (data.details && data.details.length > 0) {
          setError(data.details[0].message);
        } else {
          setError(data.error || 'Error en el registro');
        }
      }
    } catch (error) {
      setError('Error de conexión');
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
        setError(null);
        setLoginForm({ email: "", password: "" });
        // Redirigir al dashboard de admin
        window.location.href = '/admin';
      } else {
        setError('Acceso denegado. Solo administradores.');
      }
    } catch (error) {
      setError('Error de conexión');
    } finally {
      setLoading(false);
    }
  };

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);


  if (!mounted) return null;

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
              onClick={() => { setError(null); setSuccess(null); setLoginOpen(true); }}
            >
              Iniciar Sesión
            </DropdownMenuItem>
            <DropdownMenuItem 
              className="text-white hover:bg-gray-800 cursor-pointer"
              onClick={() => { setError(null); setSuccess(null); setRegisterOpen(true); }}
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
              onClick={() => { setError(null); setSuccess(null); setAdminLoginOpen(true); }}
            >
              Acceso Admin
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Botón Cotizar */}
        <button 
          className="inline-flex items-center justify-center h-9 px-4 rounded-md text-sm font-medium bg-indigo-600 hover:bg-indigo-700 text-white transition-colors"
          onClick={() => { setError(null); setSuccess(null); setCotizarOpen(true); }}
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

          {error && (
            <div className="bg-red-500/10 border border-red-500 text-red-500 px-4 py-2 rounded-md text-sm mb-4 animate-in fade-in slide-in-from-top-1">
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <Label htmlFor="login-email">Email</Label>
              <Input
                id="login-email"
                type="email"
                placeholder="ejemplo@correo.com"
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
                placeholder="••••••••"
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
          
          <form onSubmit={handleRegister} className="space-y-6">
            <div>
              <Label htmlFor="register-name" className="text-white font-medium mb-2 block">
                Nombre
              </Label>
              <Input
                id="register-name"
                placeholder="Nombre"
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
                placeholder="correo@.com"
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

          {error && (
            <div className="bg-red-500/10 border border-red-500 text-red-500 px-4 py-2 rounded-md text-sm mb-4 animate-in fade-in slide-in-from-top-1">
              {error}
            </div>
          )}
          
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
      <CotizarModal open={cotizarOpen} onOpenChange={setCotizarOpen} />
    </>
  );
}