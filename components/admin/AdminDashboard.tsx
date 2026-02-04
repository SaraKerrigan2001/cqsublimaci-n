'use client';

import { useState, useEffect, useRef } from 'react';
import { 
  BarChart3, 
  Users, 
  ShoppingCart, 
  Package, 
  TrendingUp, 
  DollarSign,
  Bell,
  Search,
  Moon,
  Sun,
  Settings,
  MoreHorizontal,
  ArrowUpRight,
  Target,
  Menu,
  User,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface DashboardProps {
  darkMode: boolean;
  toggleDarkMode: () => void;
}

export function AdminDashboard({ darkMode, toggleDarkMode }: DashboardProps) {
  const [activeMenuItem, setActiveMenuItem] = useState('overview');
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const profileMenuRef = useRef<HTMLDivElement>(null);

  // Close profile menu when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (profileMenuRef.current && !profileMenuRef.current.contains(event.target as Node)) {
        setShowProfileMenu(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const menuItems = [
    { id: 'overview', label: 'Overview', icon: BarChart3, href: '/admin' },
    { id: 'customers', label: 'Customers', icon: Users, href: '/admin/customers' },
    { id: 'orders', label: 'Orders', icon: ShoppingCart, href: '/admin/orders' },
    { id: 'products', label: 'Products', icon: Package, href: '/admin/products' },
  ];

  const stats = [
    {
      title: 'Ingresos Netos',
      value: '$3,131,021',
      change: '+4.5% vs mes pasado',
      positive: true,
      icon: DollarSign,
      color: 'green',
      bgColor: 'bg-green-500'
    },
    {
      title: 'ARR',
      value: '$1,511,121',
      change: '+2.3% vs trimestre',
      positive: true,
      icon: TrendingUp,
      color: 'emerald',
      bgColor: 'bg-emerald-500'
    },
    {
      title: 'Meta Trimestral',
      value: '71%',
      change: 'En progreso',
      positive: true,
      icon: Target,
      color: 'teal',
      bgColor: 'bg-teal-500'
    },
    {
      title: 'Nuevos Pedidos',
      value: '18,221',
      change: '+8% vs mes pasado',
      positive: true,
      icon: ShoppingCart,
      color: 'lime',
      bgColor: 'bg-lime-500'
    }
  ];

  const renderContent = () => {
    switch (activeMenuItem) {
      case 'customers':
        return (
          <div className="space-y-6">
            <div>
              <h2 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>Customers</h2>
              <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Gestión de clientes y contactos</p>
            </div>
            <Card className={`p-6 ${
              darkMode 
                ? 'bg-gray-950 border border-green-500/20 shadow-lg shadow-green-500/5' 
                : 'bg-white border border-green-200 shadow-lg shadow-green-100'
            }`}>
              <div className="text-center py-12">
                <Users size={48} className="mx-auto text-green-500 mb-4" />
                <h3 className={`text-xl font-semibold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Customer Management</h3>
                <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Aquí puedes gestionar todos tus clientes</p>
              </div>
            </Card>
          </div>
        );
      
      case 'orders':
        return (
          <div className="space-y-6">
            <div>
              <h2 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>Orders</h2>
              <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Gestión de pedidos y ventas</p>
            </div>
            <Card className={`p-6 ${
              darkMode 
                ? 'bg-gray-950 border border-green-500/20 shadow-lg shadow-green-500/5' 
                : 'bg-white border border-green-200 shadow-lg shadow-green-100'
            }`}>
              <div className="text-center py-12">
                <ShoppingCart size={48} className="mx-auto text-green-500 mb-4" />
                <h3 className={`text-xl font-semibold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Order Management</h3>
                <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Aquí puedes gestionar todos los pedidos</p>
              </div>
            </Card>
          </div>
        );
      
      case 'products':
        return (
          <div className="space-y-6">
            <div>
              <h2 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>Products</h2>
              <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Gestión de productos y servicios</p>
            </div>
            <Card className={`p-6 ${
              darkMode 
                ? 'bg-gray-950 border border-green-500/20 shadow-lg shadow-green-500/5' 
                : 'bg-white border border-green-200 shadow-lg shadow-green-100'
            }`}>
              <div className="text-center py-12">
                <Package size={48} className="mx-auto text-green-500 mb-4" />
                <h3 className={`text-xl font-semibold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Product Management</h3>
                <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Aquí puedes gestionar todos los productos</p>
              </div>
            </Card>
          </div>
        );
      
      case 'settings':
        return (
          <div className="space-y-6">
            <div>
              <h2 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>Settings</h2>
              <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Configuración del sistema</p>
            </div>
            <Card className={`p-6 ${
              darkMode 
                ? 'bg-gray-950 border border-green-500/20 shadow-lg shadow-green-500/5' 
                : 'bg-white border border-green-200 shadow-lg shadow-green-100'
            }`}>
              <div className="text-center py-12">
                <Settings size={48} className="mx-auto text-green-500 mb-4" />
                <h3 className={`text-xl font-semibold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>System Settings</h3>
                <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Aquí puedes configurar el sistema</p>
              </div>
            </Card>
          </div>
        );
      
      default: // overview
        return (
          <div className="grid grid-cols-12 gap-6">
            {/* Header Section */}
            <div className="col-span-12 mb-4">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>Current Performance</h2>
                  <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Monitoreo en tiempo real de métricas clave</p>
                </div>
                <select className={`${
                  darkMode 
                    ? 'bg-black border-green-500/30 text-white focus:border-green-400' 
                    : 'bg-white border-green-300 text-gray-900 focus:border-green-500'
                } rounded-md px-3 py-2 text-sm transition-colors`}>
                  <option>Daily</option>
                  <option>Weekly</option>
                  <option>Monthly</option>
                </select>
              </div>
            </div>

            {/* Stats Cards */}
            <div className="col-span-8 grid grid-cols-4 gap-4 mb-6">
              {stats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <Card key={index} className={`p-6 ${
                    darkMode 
                      ? 'bg-gray-950 border border-green-500/20 hover:border-green-500/40 shadow-lg shadow-green-500/5' 
                      : 'bg-white border border-green-200 hover:border-green-300 shadow-lg shadow-green-100'
                  } transition-all duration-300`}>
                    <div className="flex items-center justify-between mb-4">
                      <div className={`w-14 h-14 ${stat.bgColor} rounded-full flex items-center justify-center shadow-lg ${
                        darkMode ? 'shadow-green-500/25' : 'shadow-green-500/20'
                      }`}>
                        <Icon size={24} className="text-white" />
                      </div>
                      <Button variant="ghost" size="sm" className={`p-1 transition-colors ${
                        darkMode ? 'text-gray-400 hover:text-green-400' : 'text-gray-600 hover:text-green-600'
                      }`}>
                        <MoreHorizontal size={16} />
                      </Button>
                    </div>
                    
                    <div className="space-y-2">
                      <div className={`text-3xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                        {stat.value}
                      </div>
                      <div className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                        {stat.title}
                      </div>
                      <div className="flex items-center gap-1 text-xs text-green-500">
                        <ArrowUpRight size={12} />
                        {stat.change}
                      </div>
                    </div>
                  </Card>
                );
              })}
            </div>

            {/* Performance Score */}
            <div className="col-span-4 mb-6">
              <Card className={`p-6 ${
                darkMode 
                  ? 'bg-gray-950 border border-green-500/20 shadow-lg shadow-green-500/5' 
                  : 'bg-white border border-green-200 shadow-lg shadow-green-100'
              } transition-all duration-300`}>
                <div className="flex items-center justify-between mb-6">
                  <h3 className={`font-semibold text-lg ${darkMode ? 'text-white' : 'text-gray-900'}`}>Performance Score</h3>
                  <Button variant="ghost" size="sm" className={`p-1 transition-colors ${
                    darkMode ? 'text-gray-400 hover:text-green-400' : 'text-gray-600 hover:text-green-600'
                  }`}>
                    <MoreHorizontal size={16} />
                  </Button>
                </div>
                
                <div className="flex items-center justify-center mb-6">
                  <div className="relative w-40 h-40">
                    <svg className="w-40 h-40 transform -rotate-90" viewBox="0 0 36 36">
                      <path
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        fill="none"
                        stroke={darkMode ? "#1f2937" : "#e5e7eb"}
                        strokeWidth="3"
                      />
                      <path
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        fill="none"
                        stroke="#10b981"
                        strokeWidth="3"
                        strokeDasharray="85, 100"
                        className={darkMode ? 'drop-shadow-lg' : ''}
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center">
                        <div className={`text-4xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>85%</div>
                        <div className="text-sm text-green-500">Excellent</div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="text-center">
                  <div className={`text-sm mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Overall Performance</div>
                  <div className={`flex justify-between text-xs ${darkMode ? 'text-gray-500' : 'text-gray-500'}`}>
                    <span>0%</span>
                    <span>100%</span>
                  </div>
                </div>
              </Card>
            </div>

            {/* Revenue Summary Chart */}
            <div className="col-span-8">
              <Card className={`p-6 ${
                darkMode 
                  ? 'bg-gray-950 border border-green-500/20 shadow-lg shadow-green-500/5' 
                  : 'bg-white border border-green-200 shadow-lg shadow-green-100'
              } transition-all duration-300`}>
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className={`font-semibold text-lg ${darkMode ? 'text-white' : 'text-gray-900'}`}>Revenue Summary</h3>
                    <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Tendencia de ingresos mensual</p>
                  </div>
                  <select className={`${
                    darkMode 
                      ? 'bg-black border-green-500/30 text-white focus:border-green-400' 
                      : 'bg-white border-green-300 text-gray-900 focus:border-green-500'
                  } rounded-md px-3 py-2 text-sm transition-colors`}>
                    <option>Yearly</option>
                    <option>Monthly</option>
                    <option>Weekly</option>
                  </select>
                </div>
                
                {/* Chart Area */}
                <div className="h-64 relative">
                  <div className="absolute inset-0 flex items-end justify-between gap-2">
                    {[65, 78, 52, 85, 71, 92, 68, 89, 76, 94, 82, 88].map((height, index) => (
                      <div key={index} className="flex-1 flex flex-col items-center">
                        <div
                          className={`w-full ${
                            darkMode 
                              ? 'bg-gradient-to-t from-green-600 to-green-400 shadow-lg shadow-green-500/25' 
                              : 'bg-gradient-to-t from-green-500 to-green-300 shadow-sm shadow-green-200'
                          } rounded-t-md transition-all hover:from-green-500 hover:to-green-300 cursor-pointer`}
                          style={{ height: `${height}%` }}
                        ></div>
                        <div className={`text-xs mt-2 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                          {['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'][index]}
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  {/* Highlight box */}
                  <div className={`absolute top-4 left-1/2 transform -translate-x-1/2 ${
                    darkMode 
                      ? 'bg-green-600 shadow-lg shadow-green-500/25' 
                      : 'bg-green-500 shadow-md shadow-green-200'
                  } text-white px-3 py-1 rounded text-sm`}>
                    APR 2024 - Peak: $2.1M
                  </div>
                </div>
              </Card>
            </div>

            {/* Sales by Category */}
            <div className="col-span-4">
              <Card className={`p-6 ${
                darkMode 
                  ? 'bg-gray-950 border border-green-500/20 shadow-lg shadow-green-500/5' 
                  : 'bg-white border border-green-200 shadow-lg shadow-green-100'
              } transition-all duration-300`}>
                <div className="flex items-center justify-between mb-6">
                  <h3 className={`font-semibold text-lg ${darkMode ? 'text-white' : 'text-gray-900'}`}>Sales by Category</h3>
                  <Button variant="ghost" size="sm" className={`p-1 transition-colors ${
                    darkMode ? 'text-gray-400 hover:text-green-400' : 'text-gray-600 hover:text-green-600'
                  }`}>
                    <MoreHorizontal size={16} />
                  </Button>
                </div>
                
                <div className="flex items-center justify-center mb-6">
                  <div className="relative w-32 h-32">
                    <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 36 36">
                      {/* Background circle */}
                      <path
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        fill="none"
                        stroke={darkMode ? "#1f2937" : "#e5e7eb"}
                        strokeWidth="3"
                      />
                      {/* Green segment */}
                      <path
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        fill="none"
                        stroke="#10b981"
                        strokeWidth="3"
                        strokeDasharray="40, 100"
                        className={darkMode ? 'drop-shadow-lg' : ''}
                      />
                      {/* Emerald segment */}
                      <path
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        fill="none"
                        stroke="#059669"
                        strokeWidth="3"
                        strokeDasharray="25, 100"
                        strokeDashoffset="-40"
                        className={darkMode ? 'drop-shadow-lg' : ''}
                      />
                      {/* Teal segment */}
                      <path
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        fill="none"
                        stroke="#0d9488"
                        strokeWidth="3"
                        strokeDasharray="20, 100"
                        strokeDashoffset="-65"
                        className={darkMode ? 'drop-shadow-lg' : ''}
                      />
                      {/* Lime segment */}
                      <path
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        fill="none"
                        stroke="#65a30d"
                        strokeWidth="3"
                        strokeDasharray="15, 100"
                        strokeDashoffset="-85"
                        className={darkMode ? 'drop-shadow-lg' : ''}
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center">
                        <div className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>65%</div>
                        <div className={`text-xs ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Total</div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-green-500 rounded-full shadow-sm shadow-green-500/50"></div>
                      <span className={`text-sm ${darkMode ? 'text-gray-200' : 'text-gray-700'}`}>Sublimación</span>
                    </div>
                    <span className={`text-sm font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>$56,640</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-emerald-600 rounded-full shadow-sm shadow-emerald-600/50"></div>
                      <span className={`text-sm ${darkMode ? 'text-gray-200' : 'text-gray-700'}`}>Impresión 3D</span>
                    </div>
                    <span className={`text-sm font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>$31,420</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-teal-600 rounded-full shadow-sm shadow-teal-600/50"></div>
                      <span className={`text-sm ${darkMode ? 'text-gray-200' : 'text-gray-700'}`}>Diseño Gráfico</span>
                    </div>
                    <span className={`text-sm font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>$18,840</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-lime-600 rounded-full shadow-sm shadow-lime-600/50"></div>
                      <span className={`text-sm ${darkMode ? 'text-gray-200' : 'text-gray-700'}`}>Otros</span>
                    </div>
                    <span className={`text-sm font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>$12,120</span>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        );
    }
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      darkMode 
        ? 'bg-black text-white' 
        : 'bg-white text-gray-900'
    }`}>
      {/* Sidebar */}
      <div className={`fixed left-0 top-0 h-full transition-all duration-300 ${
        sidebarCollapsed ? 'w-16' : 'w-64'
      } ${
        darkMode 
          ? 'bg-gray-950 border-r border-green-500/20' 
          : 'bg-green-100 border-r border-green-200'
      } p-6`}>
        
        {/* Collapse/Expand Button - Back to original position */}
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
          className={`absolute -right-3 top-6 w-6 h-6 rounded-full border transition-colors z-10 ${
            darkMode 
              ? 'bg-gray-950 border-green-500/20 text-green-400 hover:bg-gray-800'
              : 'bg-white border-green-200 text-green-600 hover:bg-green-50'
          }`}
        >
          {sidebarCollapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
        </Button>

        {/* Header with Company Logo */}
        <div className="mb-8">
          {/* Company Logo */}
          <div className={`flex items-center ${sidebarCollapsed ? 'justify-center' : 'gap-2'}`}>
            <div className={`${sidebarCollapsed ? 'w-10 h-10' : 'w-8 h-8'} bg-green-500 rounded-lg flex items-center justify-center shadow-lg shadow-green-500/25 transition-all duration-300`}>
              <span className="text-white font-bold">CQ</span>
            </div>
            {!sidebarCollapsed && (
              <span className={`font-semibold transition-opacity duration-300 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                CQ Sublimación
              </span>
            )}
          </div>
        </div>

        <nav className="space-y-2">
          {!sidebarCollapsed && (
            <div className={`text-sm font-medium mb-4 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>DASHBOARD</div>
          )}
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeMenuItem === item.id;
            
            return (
              <button
                key={item.id}
                onClick={() => setActiveMenuItem(item.id)}
                className={`w-full flex items-center ${sidebarCollapsed ? 'justify-center' : 'gap-3'} px-3 py-2 rounded-lg transition-all duration-200 relative ${
                  isActive && !sidebarCollapsed
                    ? 'text-green-400' 
                    : isActive && sidebarCollapsed
                      ? 'bg-green-500 text-white shadow-lg shadow-green-500/25'
                      : darkMode 
                        ? 'text-gray-400 hover:text-white hover:bg-gray-800'
                        : 'text-gray-700 hover:text-gray-900 hover:bg-green-200'
                }`}
                title={sidebarCollapsed ? item.label : ''}
              >
                {/* Green bar indicator for active item when expanded */}
                {isActive && !sidebarCollapsed && (
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-green-400 rounded-r-full"></div>
                )}
                
                {sidebarCollapsed ? (
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 ${
                    isActive 
                      ? 'bg-green-500 text-white shadow-lg shadow-green-500/25'
                      : darkMode 
                        ? 'bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-white'
                        : 'bg-white text-gray-700 hover:bg-green-100 hover:text-gray-900 shadow-sm'
                  }`}>
                    <Icon size={20} />
                  </div>
                ) : (
                  <>
                    <Icon size={20} />
                    {item.label}
                  </>
                )}
              </button>
            );
          })}

          {!sidebarCollapsed && (
            <div className={`text-sm font-medium mb-4 mt-8 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>SETTINGS</div>
          )}
          <button
            onClick={() => setActiveMenuItem('settings')}
            className={`w-full flex items-center ${sidebarCollapsed ? 'justify-center' : 'gap-3'} px-3 py-2 rounded-lg transition-all duration-200 relative ${
              activeMenuItem === 'settings' && !sidebarCollapsed
                ? 'text-green-400'
                : activeMenuItem === 'settings' && sidebarCollapsed
                  ? 'bg-green-500 text-white shadow-lg shadow-green-500/25'
                  : darkMode 
                    ? 'text-gray-400 hover:text-white hover:bg-gray-800'
                    : 'text-gray-700 hover:text-gray-900 hover:bg-green-200'
            }`}
            title={sidebarCollapsed ? 'Settings' : ''}
          >
            {/* Green bar indicator for active settings when expanded */}
            {activeMenuItem === 'settings' && !sidebarCollapsed && (
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-green-400 rounded-r-full"></div>
            )}
            
            {sidebarCollapsed ? (
              <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 ${
                activeMenuItem === 'settings'
                  ? 'bg-green-500 text-white shadow-lg shadow-green-500/25'
                  : darkMode 
                    ? 'bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-white'
                    : 'bg-white text-gray-700 hover:bg-green-100 hover:text-gray-900 shadow-sm'
              }`}>
                <Settings size={20} />
              </div>
            ) : (
              <>
                <Settings size={20} />
                Settings
              </>
            )}
          </button>
        </nav>

        {/* Admin Profile Section - Moved to bottom */}
        <div className="absolute bottom-6 left-6 right-6">
          <div ref={profileMenuRef} className={`relative transition-colors ${
            sidebarCollapsed 
              ? 'flex justify-center' 
              : `p-3 rounded-lg ${
                  darkMode 
                    ? 'bg-gray-900/50 border border-green-500/20' 
                    : 'bg-white/70 border border-green-200'
                }`
          }`}>
            {sidebarCollapsed ? (
              <div 
                className={`w-12 h-12 rounded-full flex items-center justify-center ${
                  darkMode ? 'bg-green-600' : 'bg-green-500'
                } shadow-lg cursor-pointer transition-all duration-300 hover:scale-105`}
                onClick={() => setShowProfileMenu(!showProfileMenu)}
                title="Admin - María Paula"
              >
                <User size={24} className="text-white" />
              </div>
            ) : (
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    darkMode ? 'bg-green-600' : 'bg-green-500'
                  } shadow-lg`}>
                    <User size={20} className="text-white" />
                  </div>
                  <div>
                    <div className={`font-medium text-sm ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                      Admin
                    </div>
                    <div className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      María Paula
                    </div>
                  </div>
                </div>
                
                {/* Hamburger Menu Button */}
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowProfileMenu(!showProfileMenu)}
                  className={`p-2 transition-colors ${
                    darkMode 
                      ? 'text-gray-400 hover:text-green-400 hover:bg-gray-800'
                      : 'text-gray-600 hover:text-green-600 hover:bg-green-200'
                  }`}
                >
                  <Menu size={16} />
                </Button>
              </div>
            )}
            
            {/* Profile Dropdown Menu */}
            {showProfileMenu && (
              <div className={`absolute bottom-full ${sidebarCollapsed ? 'left-full ml-2' : 'left-0 right-0'} mb-2 rounded-lg shadow-lg border z-50 ${
                sidebarCollapsed ? 'w-48' : ''
              } ${
                darkMode 
                  ? 'bg-gray-900 border-green-500/20' 
                  : 'bg-white border-green-200'
              }`}>
                <div className="p-2 space-y-1">
                  <button className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${
                    darkMode 
                      ? 'text-gray-300 hover:text-white hover:bg-gray-800'
                      : 'text-gray-700 hover:text-gray-900 hover:bg-green-50'
                  }`}>
                    Ver Perfil
                  </button>
                  <button className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${
                    darkMode 
                      ? 'text-gray-300 hover:text-white hover:bg-gray-800'
                      : 'text-gray-700 hover:text-gray-900 hover:bg-green-50'
                  }`}>
                    Configuración
                  </button>
                  <hr className={`my-1 ${darkMode ? 'border-gray-700' : 'border-gray-200'}`} />
                  <button 
                    onClick={() => {
                      window.location.href = '/';
                    }}
                    className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${
                      darkMode 
                        ? 'text-red-400 hover:text-red-300 hover:bg-red-900/20'
                        : 'text-red-600 hover:text-red-700 hover:bg-red-50'
                    }`}
                  >
                    Cerrar Sesión
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className={`transition-all duration-300 ${sidebarCollapsed ? 'ml-16' : 'ml-64'} p-6`}>
        {/* Top Header Bar */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <h1 className={`text-3xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              Dashboard
            </h1>
            <div className={`px-3 py-1 rounded-full text-sm ${
              darkMode 
                ? 'bg-green-500/20 text-green-400 border border-green-500/30' 
                : 'bg-green-100 text-green-700 border border-green-200'
            }`}>
              Admin Panel
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            {/* Search */}
            <div className="relative">
              <Search size={18} className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${
                darkMode ? 'text-gray-400' : 'text-gray-500'
              }`} />
              <input
                type="text"
                placeholder="Buscar..."
                className={`pl-10 pr-4 py-2 rounded-lg border transition-colors ${
                  darkMode 
                    ? 'bg-gray-950 border-green-500/20 text-white placeholder:text-gray-400 focus:border-green-400' 
                    : 'bg-white border-green-200 text-gray-900 placeholder:text-gray-500 focus:border-green-500'
                }`}
              />
            </div>
            
            {/* Notifications */}
            <Button variant="ghost" size="sm" className={`relative transition-colors ${
              darkMode 
                ? 'text-gray-400 hover:text-green-400 hover:bg-gray-800'
                : 'text-gray-600 hover:text-green-600 hover:bg-green-50'
            }`}>
              <Bell size={20} />
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
            </Button>
            
            {/* Theme Toggle */}
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={toggleDarkMode}
              className={`transition-colors ${
                darkMode 
                  ? 'text-gray-400 hover:text-green-400 hover:bg-gray-800'
                  : 'text-gray-600 hover:text-green-600 hover:bg-green-50'
              }`}
            >
              {darkMode ? <Sun size={20} /> : <Moon size={20} />}
            </Button>
          </div>
        </div>
        
        {renderContent()}
      </div>
    </div>
  );
}