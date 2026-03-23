'use client';

import { useState, useEffect, useRef } from 'react';
import { 
  ShoppingCart, 
  Package, 
  User,
  Moon,
  Sun,
  Bell,
  Search,
  LogOut,
  FileText,
  Clock,
  CheckCircle,
  Truck,
  Home,
  Menu,
  ChevronLeft,
  ChevronRight,
  Settings,
  MoreHorizontal,
  TrendingUp,
  Star,
  LayoutGrid,
  ShoppingBag,
  Calendar,
  MessageCircle,
  Upload
} from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { UserChat } from '@/components/usuario/UserChat';

interface UserDashboardProps {
  darkMode: boolean;
  toggleDarkMode: () => void;
}

export function UserDashboard({ darkMode, toggleDarkMode }: UserDashboardProps) {
  const [activeTab, setActiveTab] = useState('inicio');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dashboardView, setDashboardView] = useState<'dashboard' | 'activity'>('dashboard');
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const profileMenuRef = useRef<HTMLDivElement>(null);
  const notificationsRef = useRef<HTMLDivElement>(null);

  // Notificaciones de ejemplo
  const notifications = [
    { id: 1, title: 'Nuevo pedido', message: 'Has recibido un nuevo pedido de Taza Personalizada.', time: 'Hace 5 min', read: false },
    { id: 2, title: 'Entrega completada', message: 'Tu pedido #1234 ha sido entregado.', time: 'Hace 2 horas', read: true },
  ];

  // Estado del usuario (reemplaza datos de ejemplo)
  const [userData, setUserData] = useState<{
    name: string;
    email: string;
    memberSince: string;
    avatar: string;
    role: string; // Added role for profile card
  } | null>(null);

  const [isLoadingUser, setIsLoadingUser] = useState(true);

  // Fetch real user data
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch('/api/auth/me');
        if (response.ok) {
          const data = await response.json();
          setUserData({
            name: data.user.name,
            email: data.user.email,
            memberSince: data.user.createdAt,
            avatar: data.user.name.split(' ').map((n: string) => n[0]).join('').slice(0, 2).toUpperCase(),
            role: data.user.role || 'USER' // Default role if not provided
          });
        } else if (response.status === 401) {
          // Si no está autorizado, volver al inicio para que inicie sesión
          window.location.href = '/';
        }
      } catch (error) {
        console.error('Error fetching user:', error);
      } finally {
        setIsLoadingUser(false);
      }
    };
    fetchUser();
  }, []);

  // Pedidos reales e historiales
  const [userOrders, setUserOrders] = useState<any[]>([
    { id: 'PED-001', product: 'Taza Personalizada', status: 'entregado', date: '2024-03-01', total: '$15,000', image: '🏺' },
  ]);
  const [userCotizaciones, setUserCotizaciones] = useState<any[]>([]);
  const [userDesigns, setUserDesigns] = useState<any[]>([]);

  useEffect(() => {
    if (!userData) return;
    const fetchRealData = async () => {
      try {
        const [oRes, cRes, dRes] = await Promise.all([
          fetch('/api/orders'),
          fetch('/api/cotizaciones'),
          fetch('/api/designs')
        ]);
        if (oRes.ok) {
           const db = await oRes.json();
           if(db.length > 0) {
              setUserOrders(db.map((o: any) => ({
                  id: o.id.slice(0,8),
                  product: o.orderItems?.[0]?.product?.name || 'Pedido Personalizado',
                  status: o.status.toLowerCase() === 'completed' ? 'entregado' : (o.status.toLowerCase() === 'processing' ? 'procesando' : 'pendiente'),
                  date: o.createdAt,
                  total: `$${o.total.toLocaleString()}`,
                  image: '📦'
              })));
           }
        }
        if (cRes.ok) setUserCotizaciones(await cRes.json());
        if (dRes.ok) setUserDesigns(await dRes.json());
      } catch (e) {}
    };
    fetchRealData();
  }, [userData]);

  // Productos disponibles
  const availableProducts = [
    { id: 1, name: 'Taza Personalizada', price: '$15,000', image: '🏺', category: 'Sublimación', rating: 4.8 },
    { id: 2, name: 'Camiseta Sublimada', price: '$25,000', image: '👕', category: 'Sublimación', rating: 4.9 },
    { id: 3, name: 'Figura 3D', price: '$45,000', image: '🎨', category: 'Impresión 3D', rating: 4.7 },
    { id: 4, name: 'Llavero 3D', price: '$8,000', image: '🔑', category: 'Impresión 3D', rating: 4.5 },
    { id: 5, name: 'Diseño Gráfico', price: '$50,000', image: '🎯', category: 'Diseño', rating: 5.0 },
    { id: 6, name: 'Taza Mágica', price: '$20,000', image: '☕', category: 'Sublimación', rating: 4.9 },
  ];

  // Actividad de ejemplo
  const userActivities = [
    { id: 1, type: 'order', title: 'Pedido Realizado', description: 'Has comprado "Taza Personalizada"', time: 'Hace 2 horas', icon: ShoppingBag, color: 'green' },
    { id: 2, type: 'profile', title: 'Perfil Actualizado', description: 'Cambiaste tu foto de perfil', time: 'Ayer, 4:32 PM', icon: User, color: 'blue' },
    { id: 3, type: 'coupon', title: 'Cupón Aplicado', description: 'Usaste el código BIENVENIDA20', time: '5 de mar, 2024', icon: Star, color: 'yellow' },
    { id: 4, type: 'order', title: 'Pedido Entregado', description: 'Tu pedido PED-001 ha llegado', time: '1 de mar, 2024', icon: CheckCircle, color: 'green' },
  ];

  // Close profile menu and notifications when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (profileMenuRef.current && !profileMenuRef.current.contains(event.target as Node)) {
        setShowProfileMenu(false);
      }
      if (notificationsRef.current && !notificationsRef.current.contains(event.target as Node)) {
        setShowNotifications(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Auto-collapse sidebar on mobile
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setSidebarCollapsed(true);
      } else {
        setSidebarCollapsed(false);
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'entregado': return 'bg-green-500';
      case 'en-camino': return 'bg-blue-500';
      case 'procesando': return 'bg-yellow-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'entregado': return 'Entregado';
      case 'en-camino': return 'En Camino';
      case 'procesando': return 'Procesando';
      default: return 'Pendiente';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'entregado': return <CheckCircle size={16} />;
      case 'en-camino': return <Truck size={16} />;
      case 'procesando': return <Clock size={16} />;
      default: return <Package size={16} />;
    }
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'pedidos':
        return (
          <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h2 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>Mis Pedidos</h2>
                <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Historial de tus compras y estado actual</p>
              </div>
              <Button className="bg-green-600 hover:bg-green-700 text-white">
                <FileText size={16} className="mr-2" />
                Descargar Historial
              </Button>
            </div>

            <div className="grid grid-cols-1 gap-4">
              {userOrders.map((order) => (
                <Card key={order.id} className={`p-6 transition-all hover:shadow-lg ${
                  darkMode ? 'bg-gray-950 border-green-500/20' : 'bg-white border-green-100'
                }`}>
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 bg-gradient-to-br from-green-500/20 to-green-600/20 rounded-xl flex items-center justify-center text-4xl shadow-inner">
                        {order.image}
                      </div>
                      <div>
                        <h3 className={`font-bold text-lg ${darkMode ? 'text-white' : 'text-gray-900'}`}>{order.product}</h3>
                        <div className="flex flex-wrap gap-x-4 gap-y-1 mt-1">
                          <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>ID: {order.id}</p>
                          <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Fecha: {new Date(order.date).toLocaleDateString('es-ES')}</p>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col items-start md:items-end gap-3">
                      <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-white text-xs font-semibold shadow-sm ${getStatusColor(order.status)}`}>
                        {getStatusIcon(order.status)}
                        {getStatusLabel(order.status)}
                      </div>
                      <p className={`text-xl font-bold ${darkMode ? 'text-green-500' : 'text-green-600'}`}>{order.total}</p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        );

      case 'productos':
        return (
          <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h2 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>Productos</h2>
                <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Explora nuestro catálogo exclusivo</p>
              </div>
              <div className="flex gap-2">
                <div className="relative">
                  <Search size={18} className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`} />
                  <input
                    type="text"
                    placeholder="Buscar producto..."
                    className={`pl-10 pr-4 py-2 rounded-lg border text-sm focus:ring-2 focus:ring-green-500 outline-none transition-all ${
                      darkMode ? 'bg-gray-900 border-gray-700 text-white' : 'bg-gray-50 border-gray-200 text-gray-900'
                    }`}
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {availableProducts.map((product) => (
                <Card key={product.id} className={`p-6 group transition-all hover:-translate-y-1 hover:shadow-xl ${
                  darkMode ? 'bg-gray-950 border-green-500/10 hover:border-green-500/30' : 'bg-white border-green-50'
                }`}>
                  <div className="relative mb-4">
                    <div className="w-full h-40 bg-gradient-to-br from-green-500/5 to-green-600/10 rounded-2xl flex items-center justify-center text-7xl transition-transform group-hover:scale-105">
                      {product.image}
                    </div>
                    <div className="absolute top-2 right-2 flex items-center gap-1 bg-white/90 dark:bg-black/80 px-2 py-1 rounded-lg text-xs font-bold text-yellow-500">
                      <Star size={12} fill="currentColor" />
                      {product.rating}
                    </div>
                  </div>
                  <h3 className={`font-bold text-lg mb-1 ${darkMode ? 'text-white' : 'text-gray-900'}`}>{product.name}</h3>
                  <p className={`text-sm mb-4 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{product.category}</p>
                  <div className="flex items-center justify-between mt-auto">
                    <p className={`text-2xl font-black ${darkMode ? 'text-green-500' : 'text-green-600'}`}>{product.price}</p>
                    <Button className="bg-green-600 hover:bg-green-700 text-white rounded-xl">
                      Cotizar
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        );

      case 'perfil':
        return (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div>
              <h2 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>Ver Perfil</h2>
              <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Gestiona tu información y preferencias de cuenta</p>
            </div>

            {userData && (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <Card className={`p-8 lg:col-span-2 ${darkMode ? 'bg-gray-950 border-green-500/20' : 'bg-white border-green-100'}`}>
                  <div className="flex items-center gap-6 mb-8">
                    <div className="w-24 h-24 bg-gradient-to-br from-green-500 to-green-700 rounded-3xl flex items-center justify-center text-3xl font-bold text-white shadow-lg">
                      {userData.avatar}
                    </div>
                    <div>
                      <h3 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>{userData.name}</h3>
                      <p className="text-green-600 font-bold uppercase tracking-wider text-sm mb-1">
                        {userData.role === 'ADMIN' ? 'Administrador' : 'Coordinador'}
                      </p>
                      <p className={darkMode ? 'text-gray-400' : 'text-gray-600'}>{userData.email}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 border-t dark:border-white/5 border-gray-100">
                    <div className="space-y-1">
                      <p className={`text-xs font-bold uppercase tracking-wider ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>Nombre Completo</p>
                      <p className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>{userData.name}</p>
                    </div>
                    <div className="space-y-1">
                      <p className={`text-xs font-bold uppercase tracking-wider ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>Correo Electrónico</p>
                      <p className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>{userData.email}</p>
                    </div>
                  </div>

                  <Button className="mt-8 bg-green-600 hover:bg-green-700 text-white px-8">
                    Editar Perfil
                  </Button>
                </Card>

                <div className="space-y-6">
                  <Card className={`p-6 ${darkMode ? 'bg-gray-950 border-green-500/20' : 'bg-white border-green-100'}`}>
                    <h4 className={`font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Resumen de Cuenta</h4>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className={darkMode ? 'text-gray-400' : 'text-gray-600'}>Total Pedidos</span>
                        <span className="font-bold text-lg">{userOrders.length}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className={darkMode ? 'text-gray-400' : 'text-gray-600'}>Entregados</span>
                        <span className="font-bold text-lg text-green-500">{userOrders.filter(o => o.status === 'entregado').length}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className={darkMode ? 'text-gray-400' : 'text-gray-600'}>En Proceso</span>
                        <span className="font-bold text-lg text-blue-500">{userOrders.filter(o => o.status !== 'entregado').length}</span>
                      </div>
                    </div>
                  </Card>

                  <Card className={`p-6 ${darkMode ? 'bg-gray-950 border-green-500/20' : 'bg-white border-green-100'}`}>
                    <h4 className={`font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Seguridad</h4>
                    <Button variant="ghost" className="w-full justify-start text-red-500 hover:bg-red-500/10">
                      Cambiar Contraseña
                    </Button>
                  </Card>
                </div>
              </div>
            )}
          </div>
        );

      default: // inicio
        return (
          <div className="space-y-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h2 className={`text-3xl font-black ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                  Hola, <span className="text-green-500">{userData?.name.split(' ')[0] || 'Usuario'}</span> 👋
                </h2>
                <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Bienvenido de nuevo a tu panel de CQ Sublimación</p>
              </div>
              <div className={`p-1 rounded-2xl ${darkMode ? 'bg-gray-900 border border-white/5' : 'bg-gray-100'} hidden md:flex`}>
                <button 
                  onClick={() => setDashboardView('dashboard')}
                  className={`px-6 py-2 rounded-xl text-xs font-black uppercase tracking-wider transition-all ${
                    dashboardView === 'dashboard' 
                      ? (darkMode ? 'bg-green-600 text-white shadow-lg shadow-green-600/20' : 'bg-white text-green-600 shadow-md')
                      : (darkMode ? 'text-gray-400 hover:text-white' : 'text-gray-500 hover:text-gray-700')
                  }`}
                >
                  Dashboard
                </button>
                <button 
                  onClick={() => setDashboardView('activity')}
                  className={`px-6 py-2 rounded-xl text-xs font-black uppercase tracking-wider transition-all ${
                    dashboardView === 'activity' 
                      ? (darkMode ? 'bg-green-600 text-white shadow-lg shadow-green-600/20' : 'bg-white text-green-600 shadow-md')
                      : (darkMode ? 'text-gray-400 hover:text-white' : 'text-gray-500 hover:text-gray-700')
                  }`}
                >
                  Actividad
                </button>
              </div>
            </div>

            {dashboardView === 'dashboard' ? (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[
                    { label: 'Total Pedidos', value: userOrders.length, icon: Package, color: 'green' },
                    { label: 'En Camino', value: userOrders.filter(o => o.status === 'en-camino').length, icon: Truck, color: 'blue' },
                    { label: 'Procesando', value: userOrders.filter(o => o.status === 'procesando').length, icon: Clock, color: 'yellow' }
                  ].map((stat, i) => (
                    <Card key={i} className={`p-6 border-none shadow-sm transition-transform hover:scale-[1.02] ${
                      darkMode ? 'bg-gray-950 ring-1 ring-green-500/10' : 'bg-white shadow-green-200/50'
                    }`}>
                      <div className="flex items-center gap-5">
                        <div className={`p-4 rounded-2xl bg-${stat.color}-500/10 text-${stat.color}-500`}>
                          <stat.icon size={28} />
                        </div>
                        <div>
                          <p className={`text-sm font-bold tracking-tight ${darkMode ? 'text-gray-400' : 'text-gray-500 uppercase'}`}>{stat.label}</p>
                          <p className={`text-3xl font-black ${darkMode ? 'text-white' : 'text-gray-900'}`}>{stat.value}</p>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>Pedidos Recientes</h3>
                      <button onClick={() => setActiveTab('pedidos')} className="text-green-500 font-bold hover:underline">Ver todos</button>
                    </div>
                    <div className="space-y-4">
                      {userOrders.slice(0, 2).map((order) => (
                        <Card key={order.id} className={`p-6 shadow-none flex items-center justify-between border-transparent hover:border-green-500/30 transition-all ${
                          darkMode ? 'bg-gray-950 ring-1 ring-white/5' : 'bg-gray-50'
                        }`}>
                          <div className="flex items-center gap-4">
                            <div className="text-3xl p-2 bg-white dark:bg-gray-900 rounded-xl shadow-sm">{order.image}</div>
                            <div>
                              <h4 className={`font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>{order.product}</h4>
                              <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{new Date(order.date).toLocaleDateString()}</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className={`px-2 py-0.5 rounded-lg text-[10px] font-black uppercase mb-1 inline-block text-white ${getStatusColor(order.status)}`}>
                              {getStatusLabel(order.status)}
                            </div>
                            <p className={`font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>{order.total}</p>
                          </div>
                        </Card>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>Sugerencias para ti</h3>
                    <Card className={`p-6 h-[calc(100%-3rem)] overflow-hidden relative border-none ${
                       darkMode ? 'bg-gradient-to-br from-green-600/20 to-green-900/40 text-white' : 'bg-gradient-to-br from-green-500 to-green-600 text-white'
                    }`}>
                      <div className="relative z-10 w-2/3">
                        <h4 className="text-2xl font-black mb-2 italic">Nueva Colección 2024</h4>
                        <p className="text-sm opacity-90 mb-6 font-medium">Personaliza tus tazas con los diseños más exclusivos de la temporada.</p>
                        <Button onClick={() => setActiveTab('productos')} className="bg-white text-green-600 hover:bg-gray-100 font-bold rounded-xl px-6">
                          Explorar ahora
                        </Button>
                      </div>
                      <div className="absolute -bottom-10 -right-10 text-[10rem] opacity-20 rotate-12 select-none">🏺</div>
                    </Card>
                  </div>
                </div>
              </>
            ) : (
              <Card className={`p-8 ${darkMode ? 'bg-gray-950 border-white/5' : 'bg-white shadow-xl shadow-green-100/20 border-green-50'} rounded-[2rem]`}>
                <div className="flex items-center justify-between mb-10">
                  <h3 className={`text-2xl font-black ${darkMode ? 'text-white' : 'text-gray-900'}`}>Actividad Reciente</h3>
                  <div className={`flex items-center gap-2 px-4 py-2 rounded-xl border ${darkMode ? 'bg-gray-900 border-white/10 text-gray-400' : 'bg-gray-50 border-gray-100 text-gray-500'}`}>
                    <Calendar size={16} />
                    <span className="text-sm font-bold uppercase tracking-wider">Últimos 30 días</span>
                  </div>
                </div>

                <div className="space-y-8 relative after:absolute after:left-[23px] after:top-2 after:bottom-2 after:w-px after:bg-gradient-to-b after:from-green-500/50 after:to-transparent">
                  {userActivities.map((activity, i) => {
                    const Icon = activity.icon;
                    return (
                      <div key={activity.id} className="flex gap-6 animate-in fade-in slide-in-from-left-4 duration-500" style={{ animationDelay: `${i * 100}ms` }}>
                        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 z-10 shadow-lg ${
                          activity.color === 'green' ? 'bg-green-500 text-white shadow-green-500/30' : 
                          activity.color === 'blue' ? 'bg-blue-500 text-white shadow-blue-500/30' : 
                          'bg-yellow-500 text-white shadow-yellow-500/30'
                        }`}>
                          <Icon size={20} />
                        </div>
                        <div className="flex-1 pb-8 group">
                          <div className="flex justify-between items-start mb-1">
                            <h4 className={`text-lg font-bold group-hover:text-green-500 transition-colors ${darkMode ? 'text-white' : 'text-gray-900'}`}>{activity.title}</h4>
                            <span className={`text-xs font-black uppercase tracking-widest ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>{activity.time}</span>
                          </div>
                          <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{activity.description}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </Card>
            )}
          </div>
        );

      case 'chat':
        return (
          <div className="space-y-4">
            <div>
              <h2 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>Chat con Soporte</h2>
              <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Habla directamente con el administrador</p>
            </div>
            <UserChat darkMode={darkMode} />
          </div>
        );

      case 'mis-disenos':
        return (
          <div className="space-y-4">
            <div>
              <h2 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>Mis Diseños</h2>
              <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Sube y gestiona tus propios diseños para sublimar o imprimir</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className={`p-6 border-dashed border-2 flex flex-col items-center justify-center min-h-[200px] cursor-pointer hover:bg-white/5 transition-colors ${darkMode ? 'border-white/20' : 'border-gray-200'} text-gray-500`}>
                <Upload size={32} className="mb-2" />
                <span className="font-bold">Subir Nuevo Diseño</span>
              </Card>
              {userDesigns.map(design => (
                <Card key={design.id} className={`p-4 overflow-hidden group ${darkMode ? 'bg-white/5' : 'bg-white'}`}>
                  <div className="w-full h-32 bg-gray-100 rounded-lg mb-2 relative overflow-hidden">
                    {design.imageUrl ? <img src={design.imageUrl} className="w-full h-full object-cover" /> : <div className="absolute inset-0 bg-green-100 flex items-center justify-center font-bold text-green-500">DISEÑO</div>}
                  </div>
                  <h4 className="font-bold text-sm truncate">{design.name}</h4>
                  <p className="text-xs text-gray-500">{new Date(design.createdAt).toLocaleDateString()}</p>
                </Card>
              ))}
            </div>
          </div>
        );

      case 'cotizaciones':
        return (
          <div className="space-y-4">
            <div>
              <h2 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>Mis Cotizaciones</h2>
              <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Historial y estado de tus proyectos a medida</p>
            </div>
            <div className="grid grid-cols-1 gap-4">
              {userCotizaciones.length === 0 ? (
                <Card className={`p-6 ${darkMode ? 'bg-white/5 border-white/10' : 'bg-gray-50 border-gray-100'} text-center text-gray-400`}>
                  No tienes cotizaciones activas
                </Card>
              ) : userCotizaciones.map((cotiz) => (
                <Card key={cotiz.id} className={`p-6 ${darkMode ? 'bg-gray-950 border-white/10' : 'bg-white border-green-50'}`}>
                  <div className="flex justify-between items-start mb-2">
                    <h4 className={`font-bold text-lg ${darkMode ? 'text-white' : 'text-gray-900'}`}>{cotiz.descripcionProyecto}</h4>
                    <span className={`px-2 py-1 rounded text-xs font-bold text-white ${cotiz.estado === 'COMPLETADA' ? 'bg-green-500' : (cotiz.estado === 'PENDIENTE' ? 'bg-yellow-500' : 'bg-blue-500')}`}>{cotiz.estado}</span>
                  </div>
                  <div className="text-sm text-gray-500 space-y-1">
                    <p><span className="font-semibold">Urgencia:</span> {cotiz.urgenciaProyecto}</p>
                    {cotiz.cotizacionDirigida && <p><span className="font-semibold">Objetivo:</span> {cotiz.cotizacionDirigida}</p>}
                    <p><span className="font-semibold">Fecha:</span> {new Date(cotiz.fechaCreacion).toLocaleDateString()}</p>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        );
    }
  };

  return (
    <div className={`flex min-h-screen transition-colors duration-500 ${
      darkMode ? 'bg-black text-white' : 'bg-[#FAFAFA] text-gray-900'
    } font-sans`}>
      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-0 h-full z-50 transition-all duration-500 ease-in-out flex flex-col ${
          sidebarCollapsed ? 'w-24' : 'w-72'
        } ${darkMode ? 'bg-gray-950 border-r border-white/5' : 'bg-[#f0f9f4] border-r border-green-100/50'}`}
      >
        {/* Sidebar Header */}
        <div className="p-6 mb-4 flex items-center justify-between">
          <div 
            className="flex items-center gap-3 overflow-hidden cursor-pointer hover:opacity-80 transition-opacity"
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
          >
            <div className="w-12 h-12 bg-green-500 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-green-500/20 shrink-0">
              <img src="/logo-icon.png" alt="" className="w-7 h-7 hidden" />
              <div className="w-7 h-7 border-2 border-white/30 rounded-lg flex items-center justify-center">
                <div className="w-3 h-3 bg-white rounded-sm"></div>
              </div>
            </div>
            {!sidebarCollapsed && (
              <div className="flex flex-col">
                <span className={`text-xl font-black tracking-tighter ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                  CQ <span className="text-green-500">SUBLIM</span>
                </span>
                <span className={`text-[10px] font-bold uppercase tracking-[0.2em] ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                  Personalización
                </span>
              </div>
            )}
          </div>

        </div>

        {/* Sidebar Navigation */}
        <nav className="flex-1 px-4 space-y-8 overflow-y-auto custom-scrollbar">
          {/* Categoría: PANEL PRINCIPAL */}
          <div className="space-y-2">
            {!sidebarCollapsed && (
              <p className={`px-4 text-[10px] font-black uppercase tracking-[0.2em] ${darkMode ? 'text-gray-700' : 'text-gray-400'}`}>
                PANEL PRINCIPAL
              </p>
            )}
            <button
              onClick={() => setActiveTab('inicio')}
              className={`w-full group relative flex items-center gap-4 px-4 py-3.5 rounded-2xl transition-all duration-300 ${
                activeTab === 'inicio'
                  ? (darkMode ? 'bg-green-500/10 text-green-400 shadow-[inset_0_0_0_1px_rgba(34,197,94,0.2)]' : 'bg-white text-green-600 shadow-sm')
                  : (darkMode ? 'text-gray-400 hover:bg-white/5 hover:text-white' : 'text-gray-500 hover:bg-white/50 hover:text-green-600')
              }`}
            >
              {activeTab === 'inicio' && (
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-green-500 rounded-r-full" />
              )}
              <div className={`p-2 rounded-xl transition-all duration-300 ${
                activeTab === 'inicio' ? 'bg-green-500 text-white shadow-md shadow-green-500/30' : 'bg-white/50 text-gray-400'
              }`}>
                <LayoutGrid size={20} />
              </div>
              {!sidebarCollapsed && <span className="font-bold text-sm">Resumen General</span>}
            </button>
          </div>

          {/* Categoría: PRODUCTOS Y PEDIDOS */}
          <div className="space-y-2">
            {!sidebarCollapsed && (
              <p className={`px-4 text-[10px] font-black uppercase tracking-[0.2em] ${darkMode ? 'text-gray-700' : 'text-gray-400'}`}>
                TIENDA Y SEGUIMIENTO
              </p>
            )}
            {[
              { id: 'productos', label: 'Ver Productos', icon: ShoppingBag },
              { id: 'pedidos', label: 'Mis Pedidos', icon: Package },
              { id: 'mis-disenos', label: 'Mis Diseños', icon: Upload },
              { id: 'cotizaciones', label: 'Cotizaciones', icon: FileText },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full group relative flex items-center gap-4 px-4 py-3.5 rounded-2xl transition-all duration-300 ${
                  activeTab === item.id
                    ? (darkMode ? 'bg-green-500/10 text-green-400 shadow-[inset_0_0_0_1px_rgba(34,197,94,0.2)]' : 'bg-white text-green-600 shadow-sm')
                    : (darkMode ? 'text-gray-400 hover:bg-white/5 hover:text-white' : 'text-gray-500 hover:bg-white/50 hover:text-green-600')
                }`}
              >
                {activeTab === item.id && (
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-green-500 rounded-r-full" />
                )}
                <div className={`p-2 rounded-xl transition-all duration-300 ${
                  activeTab === item.id ? 'bg-green-500 text-white shadow-md shadow-green-500/30' : 'bg-white/50 text-gray-400'
                }`}>
                  <item.icon size={20} />
                </div>
                {!sidebarCollapsed && <span className="font-bold text-sm">{item.label}</span>}
              </button>
            ))}
          </div>

          <div className="space-y-2">
            {!sidebarCollapsed && <div className="h-4" />}
            <button
              onClick={() => setActiveTab('chat')}
              className={`w-full group relative flex items-center gap-4 px-4 py-3.5 rounded-2xl transition-all duration-300 ${
                activeTab === 'chat'
                  ? (darkMode ? 'bg-green-500/10 text-green-400 shadow-[inset_0_0_0_1px_rgba(34,197,94,0.2)]' : 'bg-white text-green-600 shadow-sm')
                  : (darkMode ? 'text-gray-400 hover:bg-white/5 hover:text-white' : 'text-gray-500 hover:bg-white/50 hover:text-green-600')
              }`}
            >
              {activeTab === 'chat' && (
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-green-500 rounded-r-full" />
              )}
              <div className={`p-2 rounded-xl transition-all duration-300 ${
                activeTab === 'chat' ? 'bg-green-500 text-white shadow-md shadow-green-500/30' : 'bg-white/50 text-gray-400'
              }`}>
                <MessageCircle size={20} />
              </div>
              {!sidebarCollapsed && <span className="font-bold text-sm">Chat Soporte</span>}
            </button>

            <button
              onClick={() => setActiveTab('perfil')}
              className={`w-full group relative flex items-center gap-4 px-4 py-3.5 rounded-2xl transition-all duration-300 ${
                activeTab === 'perfil'
                  ? (darkMode ? 'bg-green-500/10 text-green-400 shadow-[inset_0_0_0_1px_rgba(34,197,94,0.2)]' : 'bg-white text-green-600 shadow-sm')
                  : (darkMode ? 'text-gray-400 hover:bg-white/5 hover:text-white' : 'text-gray-500 hover:bg-white/50 hover:text-green-600')
              }`}
            >
              {activeTab === 'perfil' && (
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-green-500 rounded-r-full" />
              )}
              <div className={`p-2 rounded-xl transition-all duration-300 ${
                activeTab === 'perfil' ? 'bg-green-500 text-white shadow-md shadow-green-500/30' : 'bg-white/50 text-gray-400'
              }`}>
                <User size={20} />
              </div>
              {!sidebarCollapsed && <span className="font-bold text-sm">Ver Perfil</span>}
            </button>

            <div className="pt-4 border-t border-white/5 mt-4">
              <button
                onClick={() => window.location.href = '/'}
                className={`w-full group relative flex items-center gap-4 px-4 py-3.5 rounded-2xl transition-all duration-300 ${
                  darkMode ? 'text-gray-400 hover:bg-white/5 hover:text-white' : 'text-gray-500 hover:bg-white/50 hover:text-green-600'
                }`}
              >
                <div className={`p-2 rounded-xl transition-all duration-300 ${
                   darkMode ? 'bg-white/5 text-gray-400 group-hover:bg-green-500 group-hover:text-white' : 'bg-white/50 text-gray-400 group-hover:bg-green-500 group-hover:text-white'
                }`}>
                  <Home size={20} />
                </div>
                {!sidebarCollapsed && <span className="font-bold text-sm">Volver al Inicio</span>}
              </button>
            </div>
          </div>
        </nav>

        {/* Sidebar Footer: User Profile Card */}
        <div className="p-4 relative" ref={profileMenuRef}>
          <div className={`p-3 rounded-2xl transition-all duration-300 ${
            sidebarCollapsed ? 'bg-transparent' : (darkMode ? 'bg-gray-900/50 border border-white/5' : 'bg-white shadow-sm border border-green-100')
          }`}>
            <button
              onClick={() => !sidebarCollapsed && setShowProfileMenu(!showProfileMenu)}
              className="w-full flex items-center gap-3 transition-transform active:scale-95"
            >
              <div className={`w-11 h-11 rounded-xl bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center text-white font-black shadow-lg shadow-green-500/20 shrink-0`}>
                {userData?.avatar || 'U'}
              </div>
              {!sidebarCollapsed && (
                <>
                  <div className="flex-1 text-left min-w-0">
                    <p className={`text-sm font-bold truncate ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                      {userData?.name || 'Cargando...'}
                    </p>
                    <p className={`text-[10px] font-bold uppercase tracking-wider ${darkMode ? 'text-gray-500' : 'text-green-600/70'}`}>
                      {userData?.role === 'ADMIN' ? 'Administrador' : 'Usuario Pro'}
                    </p>
                  </div>
                  <MoreHorizontal size={16} className={darkMode ? 'text-gray-600' : 'text-gray-400'} />
                </>
              )}
            </button>
          </div>

          {/* Profile Menu Dropdown */}
          {!sidebarCollapsed && showProfileMenu && (
            <div className={`absolute bottom-full left-4 right-4 mb-2 p-2 rounded-2xl shadow-xl border animate-in fade-in slide-in-from-bottom-2 ${
              darkMode ? 'bg-gray-950 border-white/10' : 'bg-white border-green-100'
            }`}>
              <button
                onClick={() => { setActiveTab('perfil'); setShowProfileMenu(false); }}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-bold transition-all ${
                  darkMode ? 'hover:bg-white/5 text-gray-300 hover:text-white' : 'hover:bg-green-50 text-gray-600 hover:text-green-700'
                }`}
              >
                <User size={16} /> Ver Perfil
              </button>
              <button className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-bold transition-all ${
                darkMode ? 'hover:bg-white/5 text-gray-300 hover:text-white' : 'hover:bg-green-50 text-gray-600 hover:text-green-700'
              }`}>
                <Settings size={16} /> Configuración
              </button>
              <div className={`my-1 border-t ${darkMode ? 'border-white/5' : 'border-green-50'}`} />
              <button
                onClick={async () => {
                  await fetch('/api/auth/logout', { method: 'POST' });
                  window.location.href = '/';
                }}
                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-bold text-red-500 hover:bg-red-500/10 transition-all"
              >
                <LogOut size={16} /> Cerrar Sesión
              </button>
            </div>
          )}
        </div>
      </aside>

      {/* Main Content */}
      <main className={`flex-1 flex flex-col transition-all duration-300 ${sidebarCollapsed ? 'md:ml-24' : 'md:ml-72'}`}>
        {/* Header */}
        <header className={`h-22 flex items-center justify-between px-10 sticky top-0 z-40 ${
          darkMode ? 'bg-gray-950/80' : 'bg-white/70'
        } backdrop-blur-xl transition-all ${darkMode ? '' : 'shadow-[0_1px_0_0_rgba(0,0,0,0.03)]'}`}>
          <div className="flex items-center gap-6">

            <div className="flex items-center gap-3 text-sm font-bold uppercase tracking-wider">
              <div className={`p-2 rounded-lg ${darkMode ? 'bg-green-500/10 text-green-400' : 'bg-green-50 text-green-600'}`}>
                <Home size={16} />
              </div>
              <span className={darkMode ? 'text-gray-500' : 'text-gray-400'}>{activeTab.toUpperCase()}</span>
            </div>
          </div>

          <div className="flex items-center gap-6">
            {/* Buscador Refinado */}
            <div className="hidden lg:flex items-center gap-3 px-4 py-2.5 rounded-2xl bg-white/50 border border-green-100/50 shadow-sm min-w-[320px] transition-all focus-within:ring-2 focus-within:ring-green-500/20 focus-within:bg-white focus-within:border-green-500/30">
              <Search size={18} className="text-gray-400" />
              <input
                type="text"
                placeholder="Buscar algo..."
                className="bg-transparent border-none outline-none text-sm font-medium w-full placeholder:text-gray-300"
              />
            </div>

            {/* Notificaciones Funcionales */}
            <div className="relative" ref={notificationsRef}>
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className={`w-12 h-12 flex items-center justify-center rounded-2xl relative transition-all ${
                  darkMode ? 'bg-gray-900 border-gray-800 text-gray-400' : 'bg-white border-green-100 text-green-600'
                } border shadow-sm hover:scale-105 active:scale-95`}
              >
                <Bell size={20} />
                <span className="absolute top-3.5 right-3.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white" />
              </button>

              {showNotifications && (
                <div className={`absolute top-full right-0 mt-4 w-[360px] rounded-3xl shadow-2xl border overflow-hidden animate-in fade-in zoom-in-95 ${
                  darkMode ? 'bg-gray-950 border-white/10' : 'bg-white border-green-100'
                }`}>
                  <div className="p-5 border-b border-green-100/30 flex items-center justify-between">
                    <h4 className="font-black text-lg">Notificaciones</h4>
                    <span className="text-[10px] font-black uppercase tracking-widest bg-green-500 text-white px-2 py-1 rounded-full">2 Nuevas</span>
                  </div>
                  <div className="max-h-[400px] overflow-y-auto">
                    {notifications.map((notif) => (
                      <div key={notif.id} className={`p-4 flex gap-4 transition-all cursor-pointer ${
                        notif.read ? 'opacity-60' : (darkMode ? 'bg-white/5' : 'bg-green-50/50')
                      } hover:bg-green-50/80`}>
                        <div className={`w-10 h-10 rounded-xl shrink-0 flex items-center justify-center ${
                          notif.read ? 'bg-gray-200 text-gray-400' : 'bg-green-500 text-white shadow-lg shadow-green-500/20'
                        }`}>
                          {notif.id === 1 ? <ShoppingBag size={18} /> : <Package size={18} />}
                        </div>
                        <div className="space-y-1 min-w-0">
                          <p className="font-bold text-sm truncate">{notif.title}</p>
                          <p className="text-xs text-gray-500 line-clamp-2">{notif.message}</p>
                          <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">{notif.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <button className="w-full p-4 text-center text-xs font-black uppercase tracking-widest text-green-600 hover:bg-green-50 transition-all border-t border-green-100/30">
                    Ver todo el historial
                  </button>
                </div>
              )}
            </div>

            {/* User Profile Info Overlay */}
            {/* Theme Toggle Only */}
            <div className="flex items-center gap-4">
              <button
                onClick={toggleDarkMode}
                className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${
                  darkMode ? 'bg-gray-900 text-yellow-500' : 'bg-white border border-green-100 text-gray-400'
                } hover:scale-110`}
              >
                {darkMode ? <Sun size={18} /> : <Moon size={18} />}
              </button>
            </div>
          </div>
        </header>

        {/* Dynamic Content */}
        <section className="flex-1 p-6 md:p-10 max-w-[1600px] w-full mx-auto animate-in fade-in slide-in-from-bottom-2 duration-700">
          {renderContent()}
        </section>

        {/* Footer */}
        <footer className={`mt-auto px-10 py-8 border-t ${darkMode ? 'bg-black border-white/5 text-gray-500' : 'bg-white border-gray-50 text-gray-400'}`}>
           <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-xs font-bold uppercase tracking-widest">© 2024 CQ Sublimación. Todos los derechos reservados.</p>
              <div className="flex gap-8">
                <a href="#" className="text-xs font-black uppercase tracking-widest hover:text-green-500 transition-colors">Terminos</a>
                <a href="#" className="text-xs font-black uppercase tracking-widest hover:text-green-500 transition-colors">Privacidad</a>
              </div>
           </div>
        </footer>
      </main>

      {/* Mobile Overlay */}
      {mobileMenuOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black/50 md:hidden backdrop-blur-sm"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}
    </div>
  );
}
