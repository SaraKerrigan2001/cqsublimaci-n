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
  Home,
  ChevronLeft,
  ChevronRight,
  Calendar,
  Shield,
  Mail,
  Lock,
  Globe,
  Phone,
  MapPin,
  Edit,
  Trash2,
  Plus,
  Filter,
  Download,
  Eye,
  Clock,
  Truck,
  CheckCircle,
  XCircle,
  X,
  MessageCircle,
  FileText
} from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AdminChat } from '@/components/admin/AdminChat';

interface DashboardProps {
  darkMode: boolean;
  toggleDarkMode: () => void;
}

export function AdminDashboard({ darkMode, toggleDarkMode }: DashboardProps) {
  const [activeMenuItem, setActiveMenuItem] = useState('overview');
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const profileMenuRef = useRef<HTMLDivElement>(null);

  // Estados para modales de clientes
  const [viewCustomerModal, setViewCustomerModal] = useState(false);
  const [editCustomerModal, setEditCustomerModal] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState<any>(null);

  // Estados para modales de pedidos
  const [viewOrderModal, setViewOrderModal] = useState(false);
  const [editOrderModal, setEditOrderModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<any>(null);

  // Estados para modales de productos
  const [viewProductModal, setViewProductModal] = useState(false);
  const [editProductModal, setEditProductModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);

  // Estados para confirmación de eliminación
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [customerToDelete, setCustomerToDelete] = useState<any>(null);
  const [showDeleteOrderConfirm, setShowDeleteOrderConfirm] = useState(false);
  const [orderToDelete, setOrderToDelete] = useState<any>(null);
  const [showDeleteProductConfirm, setShowDeleteProductConfirm] = useState(false);
  const [productToDelete, setProductToDelete] = useState<any>(null);

  // Estados para formularios de agregar
  const [showAddCustomerModal, setShowAddCustomerModal] = useState(false);
  const [showAddOrderModal, setShowAddOrderModal] = useState(false);
  const [showAddProductModal, setShowAddProductModal] = useState(false);

  // Estados para notificaciones
  const [notification, setNotification] = useState<{
    show: boolean;
    message: string;
    type: 'success' | 'error' | 'info';
  }>({ show: false, message: '', type: 'success' });

  // Función para mostrar notificación
  const showNotification = (message: string, type: 'success' | 'error' | 'info' = 'success') => {
    setNotification({ show: true, message, type });
    setTimeout(() => {
      setNotification({ show: false, message: '', type: 'success' });
    }, 3000);
  };

  const [ordersData, setOrdersData] = useState<any[]>([]);
  const [cotizacionesData, setCotizacionesData] = useState<any[]>([]);
  const [isLoadingData, setIsLoadingData] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [ordersRes, cotRes] = await Promise.all([
          fetch('/api/orders'),
          fetch('/api/cotizaciones')
        ]);
        if (ordersRes.ok) {
          const oFormat = await ordersRes.json();
          setOrdersData(oFormat.orders || []);
        }
        if (cotRes.ok) {
          const cFormat = await cotRes.json();
          setCotizacionesData(cFormat.cotizaciones || []);
        }
      } catch (error) {
        console.error('Error fetching admin data:', error);
      } finally {
        setIsLoadingData(false);
      }
    };
    fetchData();
  }, []);

  // Funciones para clientes
  const handleViewCustomer = (customer: any) => {
    setSelectedCustomer(customer);
    setViewCustomerModal(true);
  };

  const handleEditCustomer = (customer: any) => {
    setSelectedCustomer(customer);
    setEditCustomerModal(true);
  };

  const handleDeleteCustomer = (customer: any) => {
    setCustomerToDelete(customer);
    setShowDeleteConfirm(true);
  };

  const confirmDeleteCustomer = () => {
    showNotification(`Cliente ${customerToDelete.name} eliminado exitosamente`, 'success');
    setShowDeleteConfirm(false);
    setCustomerToDelete(null);
  };

  // Funciones para pedidos
  const handleViewOrder = (order: any) => {
    setSelectedOrder(order);
    setViewOrderModal(true);
  };

  const handleEditOrder = (order: any) => {
    setSelectedOrder(order);
    setEditOrderModal(true);
  };

  const handleDeleteOrder = (order: any) => {
    setOrderToDelete(order);
    setShowDeleteOrderConfirm(true);
  };

  const confirmDeleteOrder = () => {
    showNotification(`Pedido ${orderToDelete.id} eliminado exitosamente`, 'success');
    setShowDeleteOrderConfirm(false);
    setOrderToDelete(null);
  };

  // Funciones para productos
  const handleViewProduct = (product: any) => {
    setSelectedProduct(product);
    setViewProductModal(true);
  };

  const handleEditProduct = (product: any) => {
    setSelectedProduct(product);
    setEditProductModal(true);
  };

  const handleDeleteProduct = (product: any) => {
    setProductToDelete(product);
    setShowDeleteProductConfirm(true);
  };

  const confirmDeleteProduct = () => {
    showNotification(`Producto ${productToDelete.name} eliminado exitosamente`, 'success');
    setShowDeleteProductConfirm(false);
    setProductToDelete(null);
  };

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

  // Auto-collapse sidebar on mobile
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setSidebarCollapsed(true);
        setMobileMenuOpen(false);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const menuItems = [
    { id: 'overview', label: 'Resumen', icon: BarChart3, href: '/admin' },
    { id: 'customers', label: 'Clientes', icon: Users, href: '/admin/customers' },
    { id: 'orders', label: 'Pedidos', icon: ShoppingCart, href: '/admin/orders' },
    { id: 'products', label: 'Productos', icon: Package, href: '/admin/products' },
    { id: 'cotizaciones', label: 'Cotizaciones', icon: FileText, href: '/admin/cotizaciones' },
    { id: 'chat', label: 'Chat', icon: MessageCircle, href: '#' },
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
        const customers = [
          { id: 1, name: 'María González', email: 'maria@email.com', phone: '+57 300 123 4567', location: 'Bogotá, Colombia', orders: 15, totalSpent: '$1,250,000', status: 'active', avatar: 'MG', joinDate: '2024-01-15' },
          { id: 2, name: 'Carlos Rodríguez', email: 'carlos@email.com', phone: '+57 310 987 6543', location: 'Medellín, Colombia', orders: 8, totalSpent: '$890,500', status: 'active', avatar: 'CR', joinDate: '2024-02-20' },
          { id: 3, name: 'Ana Martínez', email: 'ana@email.com', phone: '+57 320 456 7890', location: 'Cali, Colombia', orders: 22, totalSpent: '$2,100,750', status: 'vip', avatar: 'AM', joinDate: '2023-11-10' },
          { id: 4, name: 'Luis Fernández', email: 'luis@email.com', phone: '+57 315 321 6549', location: 'Barranquilla, Colombia', orders: 3, totalSpent: '$180,250', status: 'new', avatar: 'LF', joinDate: '2024-03-05' },
          { id: 5, name: 'Elena Ruiz', email: 'elena@email.com', phone: '+57 305 789 1234', location: 'Cartagena, Colombia', orders: 12, totalSpent: '$950,000', status: 'active', avatar: 'ER', joinDate: '2024-01-28' },
        ];

        const getStatusColor = (status: string) => {
          switch (status) {
            case 'vip': return 'bg-yellow-500';
            case 'active': return 'bg-green-500';
            case 'new': return 'bg-blue-500';
            default: return 'bg-gray-500';
          }
        };

        const getStatusLabel = (status: string) => {
          switch (status) {
            case 'vip': return 'VIP';
            case 'active': return 'Activo';
            case 'new': return 'Nuevo';
            default: return 'Inactivo';
          }
        };

        return (
          <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h2 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>Clientes</h2>
                <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Gestión de clientes y contactos</p>
              </div>
              <div className="flex gap-2">
                <Button className={`${darkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-gray-200 hover:bg-gray-300'} text-gray-900`}>
                  <Filter size={16} className="mr-2" />
                  Filtrar
                </Button>
                <Button 
                  onClick={() => setShowAddCustomerModal(true)}
                  className="bg-green-600 hover:bg-green-700 text-white"
                >
                  <Plus size={16} className="mr-2" />
                  Agregar Cliente
                </Button>
              </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card className={`p-4 ${darkMode ? 'bg-gray-950 border-green-500/20' : 'bg-white border-green-200'}`}>
                <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'} mb-1`}>Total Clientes</div>
                <div className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>1,247</div>
                <div className="text-xs text-green-500">+12% este mes</div>
              </Card>
              <Card className={`p-4 ${darkMode ? 'bg-gray-950 border-green-500/20' : 'bg-white border-green-200'}`}>
                <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'} mb-1`}>Clientes Activos</div>
                <div className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>892</div>
                <div className="text-xs text-green-500">+8% este mes</div>
              </Card>
              <Card className={`p-4 ${darkMode ? 'bg-gray-950 border-green-500/20' : 'bg-white border-green-200'}`}>
                <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'} mb-1`}>Clientes VIP</div>
                <div className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>156</div>
                <div className="text-xs text-yellow-500">+5% este mes</div>
              </Card>
              <Card className={`p-4 ${darkMode ? 'bg-gray-950 border-green-500/20' : 'bg-white border-green-200'}`}>
                <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'} mb-1`}>Nuevos este mes</div>
                <div className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>89</div>
                <div className="text-xs text-blue-500">+23% vs mes anterior</div>
              </Card>
            </div>

            {/* Customers Table */}
            <Card className={`${darkMode ? 'bg-gray-950 border-green-500/20' : 'bg-white border-green-200'}`}>
              <div className="p-4 md:p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>Lista de Clientes</h3>
                  <Button variant="ghost" size="sm">
                    <Download size={16} className="mr-2" />
                    Exportar
                  </Button>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className={`border-b ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                        <th className={`text-left py-3 px-2 text-sm font-medium ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Cliente</th>
                        <th className={`text-left py-3 px-2 text-sm font-medium ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Contacto</th>
                        <th className={`text-left py-3 px-2 text-sm font-medium ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Pedidos</th>
                        <th className={`text-left py-3 px-2 text-sm font-medium ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Total Gastado</th>
                        <th className={`text-left py-3 px-2 text-sm font-medium ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Estado</th>
                        <th className={`text-left py-3 px-2 text-sm font-medium ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Acciones</th>
                      </tr>
                    </thead>
                    <tbody>
                      {customers.map((customer) => (
                        <tr key={customer.id} className={`border-b ${darkMode ? 'border-gray-800' : 'border-gray-100'}`}>
                          <td className="py-4 px-2">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center text-white text-sm font-medium">
                                {customer.avatar}
                              </div>
                              <div>
                                <div className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>{customer.name}</div>
                                <div className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>ID: #{customer.id.toString().padStart(4, '0')}</div>
                              </div>
                            </div>
                          </td>
                          <td className="py-4 px-2">
                            <div className="space-y-1">
                              <div className="flex items-center gap-2">
                                <Mail size={14} className={darkMode ? 'text-gray-400' : 'text-gray-600'} />
                                <span className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>{customer.email}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <Phone size={14} className={darkMode ? 'text-gray-400' : 'text-gray-600'} />
                                <span className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>{customer.phone}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <MapPin size={14} className={darkMode ? 'text-gray-400' : 'text-gray-600'} />
                                <span className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>{customer.location}</span>
                              </div>
                            </div>
                          </td>
                          <td className={`py-4 px-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>{customer.orders}</td>
                          <td className={`py-4 px-2 font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>{customer.totalSpent}</td>
                          <td className="py-4 px-2">
                            <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium text-white ${getStatusColor(customer.status)}`}>
                              {getStatusLabel(customer.status)}
                            </span>
                          </td>
                          <td className="py-4 px-2">
                            <div className="flex gap-2">
                              <Button 
                                size="sm" 
                                onClick={() => handleViewCustomer(customer)}
                                className={`px-3 py-2 ${
                                  darkMode 
                                    ? 'bg-blue-600 hover:bg-blue-700 text-white' 
                                    : 'bg-blue-500 hover:bg-blue-600 text-white'
                                }`}
                              >
                                <Eye size={16} className="mr-1" />
                                Ver
                              </Button>
                              <Button 
                                size="sm" 
                                onClick={() => handleEditCustomer(customer)}
                                className={`px-3 py-2 ${
                                  darkMode 
                                    ? 'bg-gray-700 hover:bg-gray-600 text-white' 
                                    : 'bg-gray-600 hover:bg-gray-700 text-white'
                                }`}
                              >
                                <Edit size={16} className="mr-1" />
                                Editar
                              </Button>
                              <Button 
                                size="sm" 
                                onClick={() => handleDeleteCustomer(customer)}
                                className="px-3 py-2 bg-red-600 hover:bg-red-700 text-white"
                              >
                                <Trash2 size={16} className="mr-1" />
                                Eliminar
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </Card>
          </div>
        );
      
      case 'orders':
        const orders = ordersData.map(o => ({
          id: o.id.substring(0, 8).toUpperCase(),
          originalId: o.id,
          customer: o.user?.name || o.user?.email || 'Desconocido',
          products: o.orderItems?.map((item: any) => item.product?.name || item.design?.title || 'Producto') || [],
          total: new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP' }).format(o.totalAmount || 0),
          status: o.status.toLowerCase(),
          date: o.createdAt,
          paymentStatus: o.status === 'PENDING' ? 'pending' : 'paid'
        }));

        const getOrderStatusIcon = (status: string) => {
          switch (status) {
            case 'pending': return <Clock size={16} className="text-yellow-500" />;
            case 'processing': return <Package size={16} className="text-blue-500" />;
            case 'shipped': return <Truck size={16} className="text-purple-500" />;
            case 'delivered': return <CheckCircle size={16} className="text-green-500" />;
            default: return <XCircle size={16} className="text-gray-500" />;
          }
        };

        const getOrderStatusColor = (status: string) => {
          switch (status) {
            case 'pending': return 'bg-yellow-500';
            case 'processing': return 'bg-blue-500';
            case 'shipped': return 'bg-purple-500';
            case 'delivered': return 'bg-green-500';
            default: return 'bg-gray-500';
          }
        };

        const getOrderStatusLabel = (status: string) => {
          switch (status) {
            case 'pending': return 'Pendiente';
            case 'processing': return 'Procesando';
            case 'shipped': return 'Enviado';
            case 'delivered': return 'Entregado';
            default: return 'Cancelado';
          }
        };

        return (
          <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h2 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>Pedidos</h2>
                <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Gestión de pedidos y ventas</p>
              </div>
              <div className="flex gap-2">
                <Button className={`${darkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-gray-200 hover:bg-gray-300'} text-gray-900`}>
                  <Filter size={16} className="mr-2" />
                  Filtrar
                </Button>
                <Button 
                  onClick={() => setShowAddOrderModal(true)}
                  className="bg-green-600 hover:bg-green-700 text-white"
                >
                  <Plus size={16} className="mr-2" />
                  Nuevo Pedido
                </Button>
              </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card className={`p-4 ${darkMode ? 'bg-gray-950 border-green-500/20' : 'bg-white border-green-200'}`}>
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-yellow-500/20 rounded-lg">
                    <Clock size={20} className="text-yellow-500" />
                  </div>
                  <div>
                    <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Pendientes</div>
                    <div className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>23</div>
                  </div>
                </div>
              </Card>
              <Card className={`p-4 ${darkMode ? 'bg-gray-950 border-green-500/20' : 'bg-white border-green-200'}`}>
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-500/20 rounded-lg">
                    <Package size={20} className="text-blue-500" />
                  </div>
                  <div>
                    <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Procesando</div>
                    <div className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>15</div>
                  </div>
                </div>
              </Card>
              <Card className={`p-4 ${darkMode ? 'bg-gray-950 border-green-500/20' : 'bg-white border-green-200'}`}>
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-purple-500/20 rounded-lg">
                    <Truck size={20} className="text-purple-500" />
                  </div>
                  <div>
                    <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Enviados</div>
                    <div className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>8</div>
                  </div>
                </div>
              </Card>
              <Card className={`p-4 ${darkMode ? 'bg-gray-950 border-green-500/20' : 'bg-white border-green-200'}`}>
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-green-500/20 rounded-lg">
                    <CheckCircle size={20} className="text-green-500" />
                  </div>
                  <div>
                    <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Entregados</div>
                    <div className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>142</div>
                  </div>
                </div>
              </Card>
            </div>

            {/* Orders Table */}
            <Card className={`${darkMode ? 'bg-gray-950 border-green-500/20' : 'bg-white border-green-200'}`}>
              <div className="p-4 md:p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>Pedidos Recientes</h3>
                  <Button variant="ghost" size="sm">
                    <Download size={16} className="mr-2" />
                    Exportar
                  </Button>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className={`border-b ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                        <th className={`text-left py-3 px-2 text-sm font-medium ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Pedido</th>
                        <th className={`text-left py-3 px-2 text-sm font-medium ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Cliente</th>
                        <th className={`text-left py-3 px-2 text-sm font-medium ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Productos</th>
                        <th className={`text-left py-3 px-2 text-sm font-medium ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Total</th>
                        <th className={`text-left py-3 px-2 text-sm font-medium ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Estado</th>
                        <th className={`text-left py-3 px-2 text-sm font-medium ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Fecha</th>
                        <th className={`text-left py-3 px-2 text-sm font-medium ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Acciones</th>
                      </tr>
                    </thead>
                    <tbody>
                      {orders.map((order) => (
                        <tr key={order.id} className={`border-b ${darkMode ? 'border-gray-800' : 'border-gray-100'}`}>
                          <td className="py-4 px-2">
                            <div className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>{order.id}</div>
                          </td>
                          <td className={`py-4 px-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>{order.customer}</td>
                          <td className="py-4 px-2">
                            <div className="space-y-1">
                              {order.products.map((product: string, index: number) => (
                                <div key={index} className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>• {product}</div>
                              ))}
                            </div>
                          </td>
                          <td className={`py-4 px-2 font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>{order.total}</td>
                          <td className="py-4 px-2">
                            <div className="flex items-center gap-2">
                              {getOrderStatusIcon(order.status)}
                              <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium text-white ${getOrderStatusColor(order.status)}`}>
                                {getOrderStatusLabel(order.status)}
                              </span>
                            </div>
                          </td>
                          <td className={`py-4 px-2 text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                            {new Date(order.date).toLocaleDateString('es-ES')}
                          </td>
                          <td className="py-4 px-2">
                            <div className="flex gap-2">
                              <Button 
                                size="sm" 
                                onClick={() => handleViewOrder(order)}
                                className={`px-3 py-2 ${
                                  darkMode 
                                    ? 'bg-blue-600 hover:bg-blue-700 text-white' 
                                    : 'bg-blue-500 hover:bg-blue-600 text-white'
                                }`}
                              >
                                <Eye size={16} className="mr-1" />
                                Ver
                              </Button>
                              <Button 
                                size="sm" 
                                onClick={() => handleEditOrder(order)}
                                className={`px-3 py-2 ${
                                  darkMode 
                                    ? 'bg-gray-700 hover:bg-gray-600 text-white' 
                                    : 'bg-gray-600 hover:bg-gray-700 text-white'
                                }`}
                              >
                                <Edit size={16} className="mr-1" />
                                Editar
                              </Button>
                              <Button 
                                size="sm" 
                                onClick={() => handleDeleteOrder(order)}
                                className="px-3 py-2 bg-red-600 hover:bg-red-700 text-white"
                              >
                                <Trash2 size={16} className="mr-1" />
                                Eliminar
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </Card>
          </div>
        );
      
      case 'products':
        const products = [
          { id: 1, name: 'Taza Personalizada', category: 'Sublimación', price: '$15,000', stock: 45, status: 'active', image: '🏺', sales: 234 },
          { id: 2, name: 'Camiseta Sublimada', category: 'Sublimación', price: '$25,000', stock: 32, status: 'active', image: '👕', sales: 189 },
          { id: 3, name: 'Figura 3D Personalizada', category: 'Impresión 3D', price: '$45,000', stock: 12, status: 'active', image: '🎨', sales: 67 },
          { id: 4, name: 'Llavero 3D', category: 'Impresión 3D', price: '$8,000', stock: 78, status: 'active', image: '🔑', sales: 456 },
          { id: 5, name: 'Diseño Gráfico Logo', category: 'Diseño', price: '$50,000', stock: 0, status: 'service', image: '🎯', sales: 123 },
        ];

        return (
          <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h2 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>Productos</h2>
                <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Gestión de productos y servicios</p>
              </div>
              <div className="flex gap-2">
                <Button className={`${darkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-gray-200 hover:bg-gray-300'} text-gray-900`}>
                  <Filter size={16} className="mr-2" />
                  Filtrar
                </Button>
                <Button 
                  onClick={() => setShowAddProductModal(true)}
                  className="bg-green-600 hover:bg-green-700 text-white"
                >
                  <Plus size={16} className="mr-2" />
                  Agregar Producto
                </Button>
              </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card className={`p-4 ${darkMode ? 'bg-gray-950 border-green-500/20' : 'bg-white border-green-200'}`}>
                <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'} mb-1`}>Total Productos</div>
                <div className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>156</div>
                <div className="text-xs text-green-500">+8 este mes</div>
              </Card>
              <Card className={`p-4 ${darkMode ? 'bg-gray-950 border-green-500/20' : 'bg-white border-green-200'}`}>
                <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'} mb-1`}>En Stock</div>
                <div className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>1,234</div>
                <div className="text-xs text-blue-500">Unidades</div>
              </Card>
              <Card className={`p-4 ${darkMode ? 'bg-gray-950 border-green-500/20' : 'bg-white border-green-200'}`}>
                <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'} mb-1`}>Bajo Stock</div>
                <div className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>12</div>
                <div className="text-xs text-yellow-500">Requiere atención</div>
              </Card>
              <Card className={`p-4 ${darkMode ? 'bg-gray-950 border-green-500/20' : 'bg-white border-green-200'}`}>
                <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'} mb-1`}>Categorías</div>
                <div className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>8</div>
                <div className="text-xs text-purple-500">Activas</div>
              </Card>
            </div>

            {/* Products Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {products.map((product) => (
                <Card key={product.id} className={`p-4 ${darkMode ? 'bg-gray-950 border-green-500/20' : 'bg-white border-green-200'}`}>
                  <div className="flex items-start justify-between mb-3">
                    <div className="text-4xl">{product.image}</div>
                    <Button variant="ghost" size="sm" className="p-1">
                      <MoreHorizontal size={16} />
                    </Button>
                  </div>
                  <h4 className={`font-semibold mb-1 ${darkMode ? 'text-white' : 'text-gray-900'}`}>{product.name}</h4>
                  <p className={`text-sm mb-2 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{product.category}</p>
                  <div className="flex items-center justify-between mb-3">
                    <span className={`text-lg font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>{product.price}</span>
                    <span className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      {product.status === 'service' ? 'Servicio' : `Stock: ${product.stock}`}
                    </span>
                  </div>
                  <div className={`text-xs mb-3 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    Ventas: {product.sales}
                  </div>
                  <div className="flex gap-2">
                    <Button 
                      size="sm" 
                      onClick={() => handleEditProduct(product)}
                      className="flex-1 bg-green-600 hover:bg-green-700 text-white"
                    >
                      <Edit size={14} className="mr-1" />
                      Editar
                    </Button>
                    <Button 
                      size="sm" 
                      onClick={() => handleDeleteProduct(product)}
                      className="text-red-500 hover:bg-red-500/10"
                      variant="ghost"
                    >
                      <Trash2 size={14} />
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        );
      
      case 'settings':
        return (
          <div className="space-y-6">
            <div>
              <h2 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>Configuración</h2>
              <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Configuración del sistema y preferencias</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* General Settings */}
              <Card className={`p-6 ${darkMode ? 'bg-gray-950 border-green-500/20' : 'bg-white border-green-200'}`}>
                <h3 className={`text-lg font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  Configuración General
                </h3>
                <div className="space-y-4">
                  <div>
                    <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      Nombre del Negocio
                    </label>
                    <input
                      type="text"
                      defaultValue="CQ Sublimación"
                      className={`w-full px-3 py-2 rounded-lg border ${
                        darkMode 
                          ? 'bg-gray-800 border-gray-600 text-white' 
                          : 'bg-white border-gray-300 text-gray-900'
                      }`}
                    />
                  </div>
                  <div>
                    <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      Email de Contacto
                    </label>
                    <input
                      type="email"
                      defaultValue="contacto@cqsublimacion.com"
                      className={`w-full px-3 py-2 rounded-lg border ${
                        darkMode 
                          ? 'bg-gray-800 border-gray-600 text-white' 
                          : 'bg-white border-gray-300 text-gray-900'
                      }`}
                    />
                  </div>
                  <div>
                    <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      Teléfono
                    </label>
                    <input
                      type="tel"
                      defaultValue="+57 300 123 4567"
                      className={`w-full px-3 py-2 rounded-lg border ${
                        darkMode 
                          ? 'bg-gray-800 border-gray-600 text-white' 
                          : 'bg-white border-gray-300 text-gray-900'
                      }`}
                    />
                  </div>
                  <div>
                    <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      Dirección
                    </label>
                    <textarea
                      defaultValue="Calle 123 #45-67, Bogotá, Colombia"
                      rows={3}
                      className={`w-full px-3 py-2 rounded-lg border ${
                        darkMode 
                          ? 'bg-gray-800 border-gray-600 text-white' 
                          : 'bg-white border-gray-300 text-gray-900'
                      }`}
                    />
                  </div>
                  <Button className="w-full bg-green-600 hover:bg-green-700 text-white">
                    Guardar Cambios
                  </Button>
                </div>
              </Card>

              {/* Notifications */}
              <Card className={`p-6 ${darkMode ? 'bg-gray-950 border-green-500/20' : 'bg-white border-green-200'}`}>
                <h3 className={`text-lg font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  Notificaciones
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between py-3 border-b border-gray-700">
                    <div>
                      <p className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                        Notificaciones por Email
                      </p>
                      <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                        Recibe actualizaciones por correo
                      </p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" defaultChecked className="sr-only peer" />
                      <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-800 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
                    </label>
                  </div>
                  <div className="flex items-center justify-between py-3 border-b border-gray-700">
                    <div>
                      <p className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                        Notificaciones de Pedidos
                      </p>
                      <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                        Alertas de nuevos pedidos
                      </p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" defaultChecked className="sr-only peer" />
                      <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-800 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
                    </label>
                  </div>
                  <div className="flex items-center justify-between py-3 border-b border-gray-700">
                    <div>
                      <p className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                        Notificaciones de Stock
                      </p>
                      <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                        Alertas de productos con bajo stock
                      </p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" defaultChecked className="sr-only peer" />
                      <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-800 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
                    </label>
                  </div>
                  <div className="flex items-center justify-between py-3">
                    <div>
                      <p className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                        Reportes Semanales
                      </p>
                      <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                        Resumen semanal de ventas
                      </p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" />
                      <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-800 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
                    </label>
                  </div>
                </div>
              </Card>

              {/* Appearance */}
              <Card className={`p-6 ${darkMode ? 'bg-gray-950 border-green-500/20' : 'bg-white border-green-200'}`}>
                <h3 className={`text-lg font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  Apariencia
                </h3>
                <div className="space-y-4">
                  <div>
                    <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      Tema
                    </label>
                    <select
                      className={`w-full px-3 py-2 rounded-lg border ${
                        darkMode 
                          ? 'bg-gray-800 border-gray-600 text-white' 
                          : 'bg-white border-gray-300 text-gray-900'
                      }`}
                    >
                      <option value="light">Claro</option>
                      <option value="dark">Oscuro</option>
                      <option value="auto">Automático</option>
                    </select>
                  </div>
                  <div>
                    <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      Idioma
                    </label>
                    <select
                      className={`w-full px-3 py-2 rounded-lg border ${
                        darkMode 
                          ? 'bg-gray-800 border-gray-600 text-white' 
                          : 'bg-white border-gray-300 text-gray-900'
                      }`}
                    >
                      <option value="es">Español</option>
                      <option value="en">English</option>
                    </select>
                  </div>
                  <div>
                    <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      Zona Horaria
                    </label>
                    <select
                      className={`w-full px-3 py-2 rounded-lg border ${
                        darkMode 
                          ? 'bg-gray-800 border-gray-600 text-white' 
                          : 'bg-white border-gray-300 text-gray-900'
                      }`}
                    >
                      <option value="America/Bogota">Bogotá (GMT-5)</option>
                      <option value="America/Mexico_City">Ciudad de México (GMT-6)</option>
                      <option value="America/Buenos_Aires">Buenos Aires (GMT-3)</option>
                    </select>
                  </div>
                </div>
              </Card>

              {/* Security */}
              <Card className={`p-6 ${darkMode ? 'bg-gray-950 border-green-500/20' : 'bg-white border-green-200'}`}>
                <h3 className={`text-lg font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  Seguridad
                </h3>
                <div className="space-y-4">
                  <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-gray-50'}`}>
                    <div className="flex items-center gap-2 mb-2">
                      <Lock size={18} className="text-green-500" />
                      <p className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                        Cambiar Contraseña
                      </p>
                    </div>
                    <p className={`text-sm mb-3 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      Última actualización: Hace 30 días
                    </p>
                    <Button className="w-full bg-green-600 hover:bg-green-700 text-white">
                      Actualizar Contraseña
                    </Button>
                  </div>
                  <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-gray-50'}`}>
                    <div className="flex items-center gap-2 mb-2">
                      <Shield size={18} className="text-blue-500" />
                      <p className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                        Autenticación de Dos Factores
                      </p>
                    </div>
                    <p className={`text-sm mb-3 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      Agrega una capa extra de seguridad
                    </p>
                    <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                      Activar 2FA
                    </Button>
                  </div>
                  <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-gray-50'}`}>
                    <div className="flex items-center gap-2 mb-2">
                      <Calendar size={18} className="text-purple-500" />
                      <p className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                        Sesiones Activas
                      </p>
                    </div>
                    <p className={`text-sm mb-3 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      2 dispositivos conectados
                    </p>
                    <Button variant="ghost" className="w-full text-red-500">
                      Cerrar Todas las Sesiones
                    </Button>
                  </div>
                </div>
              </Card>
            </div>
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
            <div className="col-span-12 lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              {stats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <Card key={index} className={`p-4 md:p-6 ${
                    darkMode 
                      ? 'bg-gray-950 border border-green-500/20 hover:border-green-500/40 shadow-lg shadow-green-500/5' 
                      : 'bg-white border border-green-200 hover:border-green-300 shadow-lg shadow-green-100'
                  } transition-all duration-300`}>
                    <div className="flex items-center justify-between mb-4">
                      <div className={`w-12 h-12 md:w-14 md:h-14 ${stat.bgColor} rounded-full flex items-center justify-center shadow-lg ${
                        darkMode ? 'shadow-green-500/25' : 'shadow-green-500/20'
                      }`}>
                        <Icon size={20} className="text-white md:w-6 md:h-6" />
                      </div>
                      <Button variant="ghost" size="sm" className={`p-1 transition-colors ${
                        darkMode ? 'text-gray-400 hover:text-green-400' : 'text-gray-600 hover:text-green-600'
                      }`}>
                        <MoreHorizontal size={16} />
                      </Button>
                    </div>
                    
                    <div className="space-y-2">
                      <div className={`text-2xl md:text-3xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                        {stat.value}
                      </div>
                      <div className={`text-xs md:text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
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
            <div className="col-span-12 lg:col-span-4 mb-6">
              <Card className={`p-4 md:p-6 ${
                darkMode 
                  ? 'bg-gray-950 border border-green-500/20 shadow-lg shadow-green-500/5' 
                  : 'bg-white border border-green-200 shadow-lg shadow-green-100'
              } transition-all duration-300`}>
                <div className="flex items-center justify-between mb-6">
                  <h3 className={`font-semibold text-base md:text-lg ${darkMode ? 'text-white' : 'text-gray-900'}`}>Performance Score</h3>
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
            <div className="col-span-12 lg:col-span-8">
              <Card className={`p-4 md:p-6 ${
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
            <div className="col-span-12 lg:col-span-4">
              <Card className={`p-4 md:p-6 ${
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

      case 'cotizaciones':
        return (
          <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h2 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>Cotizaciones</h2>
                <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Gestión de solicitudes de cotización</p>
              </div>
            </div>
            
            <Card className={`${darkMode ? 'bg-gray-950 border-green-500/20' : 'bg-white border-green-200'} p-4 md:p-6`}>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className={`border-b ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                      <th className={`text-left py-3 px-2 text-sm font-medium ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>ID</th>
                      <th className={`text-left py-3 px-2 text-sm font-medium ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Cliente</th>
                      <th className={`text-left py-3 px-2 text-sm font-medium ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Descripción</th>
                      <th className={`text-left py-3 px-2 text-sm font-medium ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Fecha Creada</th>
                      <th className={`text-left py-3 px-2 text-sm font-medium ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Estado</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cotizacionesData.length === 0 ? (
                       <tr>
                         <td colSpan={5} className="py-4 text-center text-gray-500">No hay cotizaciones solicitadas</td>
                       </tr>
                    ) : (
                      cotizacionesData.map(cot => (
                        <tr key={cot.id} className={`border-b ${darkMode ? 'border-gray-800' : 'border-gray-100'}`}>
                          <td className={`py-4 px-2 font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>{cot.id.substring(0,8).toUpperCase()}</td>
                          <td className={`py-4 px-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>{cot.user?.name || cot.user?.email || 'Usuario'}</td>
                          <td className={`py-4 px-2 text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'} max-w-xs truncate`}>{cot.description}</td>
                          <td className={`py-4 px-2 text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>{new Date(cot.createdAt).toLocaleDateString()}</td>
                          <td className="py-4 px-2">
                            <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium text-white ${
                              cot.status === 'PENDING' ? 'bg-yellow-500' :
                              cot.status === 'APPROVED' ? 'bg-green-500' :
                              cot.status === 'REJECTED' ? 'bg-red-500' : 'bg-blue-500'
                            }`}>
                              {cot.status}
                            </span>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </Card>
          </div>
        );

      case 'chat':
        return (
          <div className="space-y-4">
            <div>
              <h2 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>Chat con Usuarios</h2>
              <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Responde mensajes de tus clientes en tiempo real</p>
            </div>
            <AdminChat darkMode={darkMode} />
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
      {/* Notificación Toast */}
      {notification.show && (
        <div className="fixed top-4 right-4 z-[60] animate-in slide-in-from-top">
          <div className={`px-6 py-4 rounded-lg shadow-lg border flex items-center gap-3 ${
            notification.type === 'success' 
              ? 'bg-green-600 border-green-500 text-white' 
              : notification.type === 'error'
              ? 'bg-red-600 border-red-500 text-white'
              : 'bg-blue-600 border-blue-500 text-white'
          }`}>
            {notification.type === 'success' && <CheckCircle size={20} />}
            {notification.type === 'error' && <XCircle size={20} />}
            {notification.type === 'info' && <Bell size={20} />}
            <span className="font-medium">{notification.message}</span>
          </div>
        </div>
      )}

      {/* Mobile Menu Button */}
      <button
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        className={`fixed top-4 left-4 z-50 md:hidden p-2 rounded-lg ${
          darkMode 
            ? 'bg-gray-950 border border-green-500/20 text-white' 
            : 'bg-white border border-green-200 text-gray-900'
        } shadow-lg`}
      >
        <Menu size={24} />
      </button>

      {/* Mobile Overlay */}
      {mobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`fixed left-0 top-0 h-full transition-all duration-300 z-40 ${
        sidebarCollapsed ? 'w-16' : 'w-64'
      } ${
        darkMode 
          ? 'bg-gray-950 border-r border-green-500/20' 
          : 'bg-green-100 border-r border-green-200'
      } p-6 ${
        mobileMenuOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
      }`}>
        
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
            <div className={`text-sm font-medium mb-4 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>PANEL</div>
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
            <div className={`text-sm font-medium mb-4 mt-8 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>CONFIGURACIÓN</div>
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
            title={sidebarCollapsed ? 'Configuración' : ''}
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
                Configuración
              </>
            )}
          </button>
          <button
            onClick={() => window.location.href = '/'}
            className={`w-full flex items-center ${sidebarCollapsed ? 'justify-center' : 'gap-3'} px-3 py-2 mt-4 rounded-lg transition-all duration-200 relative ${
              darkMode 
                ? 'text-gray-400 hover:text-white hover:bg-gray-800'
                : 'text-gray-700 hover:text-gray-900 hover:bg-green-200'
            }`}
            title={sidebarCollapsed ? 'Volver al Inicio' : ''}
          >
            {sidebarCollapsed ? (
              <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 ${
                darkMode 
                  ? 'bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-white'
                  : 'bg-white text-gray-700 hover:bg-green-100 hover:text-gray-900 shadow-sm'
              }`}>
                <Home size={20} />
              </div>
            ) : (
              <>
                <Home size={20} />
                Volver al Inicio
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
                  <button 
                    onClick={() => window.location.href = '/admin/profile'}
                    className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${
                      darkMode 
                        ? 'text-gray-300 hover:text-white hover:bg-gray-800'
                        : 'text-gray-700 hover:text-gray-900 hover:bg-green-50'
                    }`}
                  >
                    Ver Perfil
                  </button>
                  <button 
                    onClick={() => {
                      setActiveMenuItem('settings');
                      setShowProfileMenu(false);
                    }}
                    className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${
                      darkMode 
                        ? 'text-gray-300 hover:text-white hover:bg-gray-800'
                        : 'text-gray-700 hover:text-gray-900 hover:bg-green-50'
                    }`}
                  >
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
      <div className={`transition-all duration-300 ${sidebarCollapsed ? 'md:ml-16' : 'md:ml-64'} p-4 md:p-6 pt-20 md:pt-6`}>
        {/* Top Header Bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
          <div className="flex items-center gap-4">
            <h1 className={`text-2xl md:text-3xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              {activeMenuItem === 'overview' && 'Resumen'}
              {activeMenuItem === 'customers' && 'Clientes'}
              {activeMenuItem === 'orders' && 'Pedidos'}
              {activeMenuItem === 'products' && 'Productos'}
              {activeMenuItem === 'settings' && 'Configuración'}
              {activeMenuItem === 'chat' && 'Chat con Usuarios'}
            </h1>
          </div>
          
          <div className="flex items-center gap-2 md:gap-3">
            {/* Search */}
            <div className="relative flex-1 md:flex-initial">
              <Search size={18} className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${
                darkMode ? 'text-gray-400' : 'text-gray-500'
              }`} />
              <input
                type="text"
                placeholder="Buscar..."
                className={`w-full md:w-auto pl-10 pr-4 py-2 rounded-lg border transition-colors text-sm ${
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

      {/* Modal Ver Cliente */}
      {viewCustomerModal && selectedCustomer && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className={`max-w-2xl w-full rounded-lg p-6 ${
            darkMode ? 'bg-gray-950 border border-green-500/20' : 'bg-white border border-green-200'
          }`}>
            <div className="flex items-center justify-between mb-6">
              <h2 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                Detalles del Cliente
              </h2>
              <Button
                variant="ghost"
                onClick={() => setViewCustomerModal(false)}
                className={darkMode ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'}
              >
                <X size={24} />
              </Button>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-20 h-20 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center text-white text-2xl font-medium">
                  {selectedCustomer.avatar}
                </div>
                <div>
                  <h3 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                    {selectedCustomer.name}
                  </h3>
                  <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    ID: #{selectedCustomer.id.toString().padStart(4, '0')}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Email</p>
                  <p className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>{selectedCustomer.email}</p>
                </div>
                <div>
                  <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Teléfono</p>
                  <p className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>{selectedCustomer.phone}</p>
                </div>
                <div>
                  <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Ubicación</p>
                  <p className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>{selectedCustomer.location}</p>
                </div>
                <div>
                  <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Estado</p>
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium text-white ${
                    selectedCustomer.status === 'vip' ? 'bg-yellow-500' :
                    selectedCustomer.status === 'active' ? 'bg-green-500' : 'bg-blue-500'
                  }`}>
                    {selectedCustomer.status === 'vip' ? 'VIP' : selectedCustomer.status === 'active' ? 'Activo' : 'Nuevo'}
                  </span>
                </div>
                <div>
                  <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Total Pedidos</p>
                  <p className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>{selectedCustomer.orders}</p>
                </div>
                <div>
                  <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Total Gastado</p>
                  <p className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>{selectedCustomer.totalSpent}</p>
                </div>
              </div>

              <div className="flex gap-2 pt-4">
                <Button
                  onClick={() => {
                    setViewCustomerModal(false);
                    handleEditCustomer(selectedCustomer);
                  }}
                  className="bg-green-600 hover:bg-green-700 text-white"
                >
                  Editar Cliente
                </Button>
                <Button
                  onClick={() => setViewCustomerModal(false)}
                  variant="ghost"
                  className={darkMode ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'}
                >
                  Cerrar
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal Editar Cliente */}
      {editCustomerModal && selectedCustomer && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className={`max-w-2xl w-full rounded-lg p-6 ${
            darkMode ? 'bg-gray-950 border border-green-500/20' : 'bg-white border border-green-200'
          }`}>
            <div className="flex items-center justify-between mb-6">
              <h2 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                Editar Cliente
              </h2>
              <Button
                variant="ghost"
                onClick={() => setEditCustomerModal(false)}
                className={darkMode ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'}
              >
                <X size={24} />
              </Button>
            </div>
            
            <form className="space-y-4" onSubmit={(e) => {
              e.preventDefault();
              showNotification('Cliente actualizado exitosamente', 'success');
              setEditCustomerModal(false);
            }}>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    Nombre
                  </label>
                  <input
                    type="text"
                    defaultValue={selectedCustomer.name}
                    className={`w-full px-3 py-2 rounded-lg border ${
                      darkMode 
                        ? 'bg-gray-800 border-gray-600 text-white' 
                        : 'bg-white border-gray-300 text-gray-900'
                    }`}
                  />
                </div>
                <div>
                  <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    Email
                  </label>
                  <input
                    type="email"
                    defaultValue={selectedCustomer.email}
                    className={`w-full px-3 py-2 rounded-lg border ${
                      darkMode 
                        ? 'bg-gray-800 border-gray-600 text-white' 
                        : 'bg-white border-gray-300 text-gray-900'
                    }`}
                  />
                </div>
                <div>
                  <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    Teléfono
                  </label>
                  <input
                    type="tel"
                    defaultValue={selectedCustomer.phone}
                    className={`w-full px-3 py-2 rounded-lg border ${
                      darkMode 
                        ? 'bg-gray-800 border-gray-600 text-white' 
                        : 'bg-white border-gray-300 text-gray-900'
                    }`}
                  />
                </div>
                <div>
                  <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    Ubicación
                  </label>
                  <input
                    type="text"
                    defaultValue={selectedCustomer.location}
                    className={`w-full px-3 py-2 rounded-lg border ${
                      darkMode 
                        ? 'bg-gray-800 border-gray-600 text-white' 
                        : 'bg-white border-gray-300 text-gray-900'
                    }`}
                  />
                </div>
              </div>

              <div className="flex gap-2 pt-4">
                <Button type="submit" className="bg-green-600 hover:bg-green-700 text-white">
                  Guardar Cambios
                </Button>
                <Button
                  type="button"
                  onClick={() => setEditCustomerModal(false)}
                  variant="ghost"
                  className={darkMode ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'}
                >
                  Cancelar
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal Ver Pedido */}
      {viewOrderModal && selectedOrder && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className={`max-w-2xl w-full rounded-lg p-6 ${
            darkMode ? 'bg-gray-950 border border-green-500/20' : 'bg-white border border-green-200'
          }`}>
            <div className="flex items-center justify-between mb-6">
              <h2 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                Detalles del Pedido
              </h2>
              <Button
                variant="ghost"
                onClick={() => setViewOrderModal(false)}
                className={darkMode ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'}
              >
                <X size={24} />
              </Button>
            </div>
            
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>ID Pedido</p>
                  <p className={`font-bold text-lg ${darkMode ? 'text-white' : 'text-gray-900'}`}>{selectedOrder.id}</p>
                </div>
                <div>
                  <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Cliente</p>
                  <p className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>{selectedOrder.customer}</p>
                </div>
                <div>
                  <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Fecha</p>
                  <p className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                    {new Date(selectedOrder.date).toLocaleDateString('es-ES')}
                  </p>
                </div>
                <div>
                  <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Total</p>
                  <p className={`font-bold text-lg ${darkMode ? 'text-white' : 'text-gray-900'}`}>{selectedOrder.total}</p>
                </div>
              </div>

              <div>
                <p className={`text-sm mb-2 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Productos</p>
                <ul className="space-y-2">
                  {selectedOrder.products.map((product: string, index: number) => (
                    <li key={index} className={`flex items-center gap-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                      <Package size={16} className="text-green-500" />
                      {product}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Estado</p>
                <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium text-white ${
                  selectedOrder.status === 'pending' ? 'bg-yellow-500' :
                  selectedOrder.status === 'processing' ? 'bg-blue-500' :
                  selectedOrder.status === 'shipped' ? 'bg-purple-500' : 'bg-green-500'
                }`}>
                  {selectedOrder.status === 'pending' ? 'Pendiente' :
                   selectedOrder.status === 'processing' ? 'Procesando' :
                   selectedOrder.status === 'shipped' ? 'Enviado' : 'Entregado'}
                </span>
              </div>

              <div className="flex gap-2 pt-4">
                <Button
                  onClick={() => {
                    setViewOrderModal(false);
                    handleEditOrder(selectedOrder);
                  }}
                  className="bg-green-600 hover:bg-green-700 text-white"
                >
                  Editar Pedido
                </Button>
                <Button
                  onClick={() => setViewOrderModal(false)}
                  variant="ghost"
                  className={darkMode ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'}
                >
                  Cerrar
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal Editar Pedido */}
      {editOrderModal && selectedOrder && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className={`max-w-2xl w-full rounded-lg p-6 ${
            darkMode ? 'bg-gray-950 border border-green-500/20' : 'bg-white border border-green-200'
          }`}>
            <div className="flex items-center justify-between mb-6">
              <h2 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                Editar Pedido
              </h2>
              <Button
                variant="ghost"
                onClick={() => setEditOrderModal(false)}
                className={darkMode ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'}
              >
                <X size={24} />
              </Button>
            </div>
            
            <form className="space-y-4" onSubmit={(e) => {
              e.preventDefault();
              showNotification('Pedido actualizado exitosamente', 'success');
              setEditOrderModal(false);
            }}>
              <div>
                <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  ID Pedido
                </label>
                <input
                  type="text"
                  defaultValue={selectedOrder.id}
                  disabled
                  className={`w-full px-3 py-2 rounded-lg border ${
                    darkMode 
                      ? 'bg-gray-900 border-gray-600 text-gray-500' 
                      : 'bg-gray-100 border-gray-300 text-gray-500'
                  }`}
                />
              </div>

              <div>
                <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  Estado del Pedido
                </label>
                <select
                  defaultValue={selectedOrder.status}
                  className={`w-full px-3 py-2 rounded-lg border ${
                    darkMode 
                      ? 'bg-gray-800 border-gray-600 text-white' 
                      : 'bg-white border-gray-300 text-gray-900'
                  }`}
                >
                  <option value="pending">Pendiente</option>
                  <option value="processing">Procesando</option>
                  <option value="shipped">Enviado</option>
                  <option value="delivered">Entregado</option>
                </select>
              </div>

              <div>
                <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  Total
                </label>
                <input
                  type="text"
                  defaultValue={selectedOrder.total}
                  className={`w-full px-3 py-2 rounded-lg border ${
                    darkMode 
                      ? 'bg-gray-800 border-gray-600 text-white' 
                      : 'bg-white border-gray-300 text-gray-900'
                  }`}
                />
              </div>

              <div className="flex gap-2 pt-4">
                <Button type="submit" className="bg-green-600 hover:bg-green-700 text-white">
                  Guardar Cambios
                </Button>
                <Button
                  type="button"
                  onClick={() => setEditOrderModal(false)}
                  variant="ghost"
                  className={darkMode ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'}
                >
                  Cancelar
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal Confirmación de Eliminación */}
      {showDeleteConfirm && customerToDelete && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className={`max-w-md w-full rounded-lg p-6 ${
            darkMode ? 'bg-gray-950 border border-red-500/20' : 'bg-white border border-red-200'
          }`}>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-red-500/20 rounded-full flex items-center justify-center">
                <Trash2 size={24} className="text-red-500" />
              </div>
              <div>
                <h2 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  Confirmar Eliminación
                </h2>
              </div>
            </div>
            
            <p className={`mb-6 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              ¿Estás seguro de eliminar al cliente <span className="font-bold">{customerToDelete.name}</span>? 
              Esta acción no se puede deshacer.
            </p>

            <div className="flex gap-2">
              <Button
                onClick={confirmDeleteCustomer}
                className="flex-1 bg-red-600 hover:bg-red-700 text-white"
              >
                Sí, Eliminar
              </Button>
              <Button
                onClick={() => {
                  setShowDeleteConfirm(false);
                  setCustomerToDelete(null);
                }}
                variant="ghost"
                className={`flex-1 ${darkMode ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'}`}
              >
                Cancelar
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Modal Confirmación Eliminar Pedido */}
      {showDeleteOrderConfirm && orderToDelete && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className={`max-w-md w-full rounded-lg p-6 ${
            darkMode ? 'bg-gray-950 border border-red-500/20' : 'bg-white border border-red-200'
          }`}>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-red-500/20 rounded-full flex items-center justify-center">
                <Trash2 size={24} className="text-red-500" />
              </div>
              <div>
                <h2 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  Confirmar Eliminación
                </h2>
              </div>
            </div>
            
            <p className={`mb-6 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              ¿Estás seguro de eliminar el pedido <span className="font-bold">{orderToDelete.id}</span>? 
              Esta acción no se puede deshacer.
            </p>

            <div className="flex gap-2">
              <Button
                onClick={confirmDeleteOrder}
                className="flex-1 bg-red-600 hover:bg-red-700 text-white"
              >
                Sí, Eliminar
              </Button>
              <Button
                onClick={() => {
                  setShowDeleteOrderConfirm(false);
                  setOrderToDelete(null);
                }}
                variant="ghost"
                className={`flex-1 ${darkMode ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'}`}
              >
                Cancelar
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Modal Confirmación Eliminar Producto */}
      {showDeleteProductConfirm && productToDelete && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className={`max-w-md w-full rounded-lg p-6 ${
            darkMode ? 'bg-gray-950 border border-red-500/20' : 'bg-white border border-red-200'
          }`}>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-red-500/20 rounded-full flex items-center justify-center">
                <Trash2 size={24} className="text-red-500" />
              </div>
              <div>
                <h2 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  Confirmar Eliminación
                </h2>
              </div>
            </div>
            
            <p className={`mb-6 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              ¿Estás seguro de eliminar el producto <span className="font-bold">{productToDelete.name}</span>? 
              Esta acción no se puede deshacer.
            </p>

            <div className="flex gap-2">
              <Button
                onClick={confirmDeleteProduct}
                className="flex-1 bg-red-600 hover:bg-red-700 text-white"
              >
                Sí, Eliminar
              </Button>
              <Button
                onClick={() => {
                  setShowDeleteProductConfirm(false);
                  setProductToDelete(null);
                }}
                variant="ghost"
                className={`flex-1 ${darkMode ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'}`}
              >
                Cancelar
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Modal Editar Producto */}
      {editProductModal && selectedProduct && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className={`max-w-2xl w-full rounded-lg p-6 max-h-[90vh] overflow-y-auto ${
            darkMode ? 'bg-gray-950 border border-green-500/20' : 'bg-white border border-green-200'
          }`}>
            <div className="flex items-center justify-between mb-6">
              <h2 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                Editar Producto
              </h2>
              <Button
                variant="ghost"
                onClick={() => setEditProductModal(false)}
                className={darkMode ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'}
              >
                <X size={24} />
              </Button>
            </div>
            
            <form className="space-y-4" onSubmit={(e) => {
              e.preventDefault();
              showNotification('Producto actualizado exitosamente', 'success');
              setEditProductModal(false);
            }}>
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2">
                  <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    Nombre del Producto
                  </label>
                  <input
                    type="text"
                    defaultValue={selectedProduct.name}
                    className={`w-full px-3 py-2 rounded-lg border ${
                      darkMode 
                        ? 'bg-gray-800 border-gray-600 text-white' 
                        : 'bg-white border-gray-300 text-gray-900'
                    }`}
                    required
                  />
                </div>
                <div>
                  <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    Categoría
                  </label>
                  <input
                    type="text"
                    defaultValue={selectedProduct.category}
                    className={`w-full px-3 py-2 rounded-lg border ${
                      darkMode 
                        ? 'bg-gray-800 border-gray-600 text-white' 
                        : 'bg-white border-gray-300 text-gray-900'
                    }`}
                  />
                </div>
                <div>
                  <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    Precio
                  </label>
                  <input
                    type="text"
                    defaultValue={selectedProduct.price}
                    className={`w-full px-3 py-2 rounded-lg border ${
                      darkMode 
                        ? 'bg-gray-800 border-gray-600 text-white' 
                        : 'bg-white border-gray-300 text-gray-900'
                    }`}
                  />
                </div>
                <div>
                  <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    Stock
                  </label>
                  <input
                    type="number"
                    defaultValue={selectedProduct.stock}
                    className={`w-full px-3 py-2 rounded-lg border ${
                      darkMode 
                        ? 'bg-gray-800 border-gray-600 text-white' 
                        : 'bg-white border-gray-300 text-gray-900'
                    }`}
                  />
                </div>
                <div>
                  <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    Estado
                  </label>
                  <select
                    defaultValue={selectedProduct.status}
                    className={`w-full px-3 py-2 rounded-lg border ${
                      darkMode 
                        ? 'bg-gray-800 border-gray-600 text-white' 
                        : 'bg-white border-gray-300 text-gray-900'
                    }`}
                  >
                    <option value="active">Activo</option>
                    <option value="service">Servicio</option>
                    <option value="inactive">Inactivo</option>
                  </select>
                </div>
              </div>

              <div className="flex gap-2 pt-4">
                <Button type="submit" className="bg-green-600 hover:bg-green-700 text-white">
                  Guardar Cambios
                </Button>
                <Button
                  type="button"
                  onClick={() => setEditProductModal(false)}
                  variant="ghost"
                  className={darkMode ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'}
                >
                  Cancelar
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal Agregar Cliente */}
      {showAddCustomerModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className={`max-w-2xl w-full rounded-lg p-6 max-h-[90vh] overflow-y-auto ${
            darkMode ? 'bg-gray-950 border border-green-500/20' : 'bg-white border border-green-200'
          }`}>
            <div className="flex items-center justify-between mb-6">
              <h2 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                Agregar Nuevo Cliente
              </h2>
              <Button
                variant="ghost"
                onClick={() => setShowAddCustomerModal(false)}
                className={darkMode ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'}
              >
                <X size={24} />
              </Button>
            </div>
            
            <form className="space-y-4" onSubmit={(e) => {
              e.preventDefault();
              showNotification('Cliente agregado exitosamente', 'success');
              setShowAddCustomerModal(false);
            }}>
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2">
                  <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    Nombre Completo *
                  </label>
                  <input
                    type="text"
                    placeholder="Ej: María González"
                    className={`w-full px-3 py-2 rounded-lg border ${
                      darkMode 
                        ? 'bg-gray-800 border-gray-600 text-white placeholder:text-gray-500' 
                        : 'bg-white border-gray-300 text-gray-900 placeholder:text-gray-400'
                    }`}
                    required
                  />
                </div>
                <div>
                  <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    Email *
                  </label>
                  <input
                    type="email"
                    placeholder="correo@ejemplo.com"
                    className={`w-full px-3 py-2 rounded-lg border ${
                      darkMode 
                        ? 'bg-gray-800 border-gray-600 text-white placeholder:text-gray-500' 
                        : 'bg-white border-gray-300 text-gray-900 placeholder:text-gray-400'
                    }`}
                    required
                  />
                </div>
                <div>
                  <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    Teléfono *
                  </label>
                  <input
                    type="tel"
                    placeholder="+57 300 123 4567"
                    className={`w-full px-3 py-2 rounded-lg border ${
                      darkMode 
                        ? 'bg-gray-800 border-gray-600 text-white placeholder:text-gray-500' 
                        : 'bg-white border-gray-300 text-gray-900 placeholder:text-gray-400'
                    }`}
                    required
                  />
                </div>
                <div className="col-span-2">
                  <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    Ubicación
                  </label>
                  <input
                    type="text"
                    placeholder="Ciudad, País"
                    className={`w-full px-3 py-2 rounded-lg border ${
                      darkMode 
                        ? 'bg-gray-800 border-gray-600 text-white placeholder:text-gray-500' 
                        : 'bg-white border-gray-300 text-gray-900 placeholder:text-gray-400'
                    }`}
                  />
                </div>
                <div className="col-span-2">
                  <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    Estado
                  </label>
                  <select
                    className={`w-full px-3 py-2 rounded-lg border ${
                      darkMode 
                        ? 'bg-gray-800 border-gray-600 text-white' 
                        : 'bg-white border-gray-300 text-gray-900'
                    }`}
                  >
                    <option value="new">Nuevo</option>
                    <option value="active">Activo</option>
                    <option value="vip">VIP</option>
                  </select>
                </div>
              </div>

              <div className="flex gap-2 pt-4">
                <Button type="submit" className="bg-green-600 hover:bg-green-700 text-white">
                  Agregar Cliente
                </Button>
                <Button
                  type="button"
                  onClick={() => setShowAddCustomerModal(false)}
                  variant="ghost"
                  className={darkMode ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'}
                >
                  Cancelar
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal Agregar Pedido */}
      {showAddOrderModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className={`max-w-2xl w-full rounded-lg p-6 max-h-[90vh] overflow-y-auto ${
            darkMode ? 'bg-gray-950 border border-green-500/20' : 'bg-white border border-green-200'
          }`}>
            <div className="flex items-center justify-between mb-6">
              <h2 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                Crear Nuevo Pedido
              </h2>
              <Button
                variant="ghost"
                onClick={() => setShowAddOrderModal(false)}
                className={darkMode ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'}
              >
                <X size={24} />
              </Button>
            </div>
            
            <form className="space-y-4" onSubmit={(e) => {
              e.preventDefault();
              showNotification('Pedido creado exitosamente', 'success');
              setShowAddOrderModal(false);
            }}>
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2">
                  <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    Cliente *
                  </label>
                  <input
                    type="text"
                    placeholder="Nombre del cliente"
                    className={`w-full px-3 py-2 rounded-lg border ${
                      darkMode 
                        ? 'bg-gray-800 border-gray-600 text-white placeholder:text-gray-500' 
                        : 'bg-white border-gray-300 text-gray-900 placeholder:text-gray-400'
                    }`}
                    required
                  />
                </div>
                <div className="col-span-2">
                  <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    Productos *
                  </label>
                  <textarea
                    placeholder="Lista de productos (uno por línea)"
                    rows={3}
                    className={`w-full px-3 py-2 rounded-lg border ${
                      darkMode 
                        ? 'bg-gray-800 border-gray-600 text-white placeholder:text-gray-500' 
                        : 'bg-white border-gray-300 text-gray-900 placeholder:text-gray-400'
                    }`}
                    required
                  />
                </div>
                <div>
                  <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    Total *
                  </label>
                  <input
                    type="text"
                    placeholder="$0"
                    className={`w-full px-3 py-2 rounded-lg border ${
                      darkMode 
                        ? 'bg-gray-800 border-gray-600 text-white placeholder:text-gray-500' 
                        : 'bg-white border-gray-300 text-gray-900 placeholder:text-gray-400'
                    }`}
                    required
                  />
                </div>
                <div>
                  <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    Estado
                  </label>
                  <select
                    className={`w-full px-3 py-2 rounded-lg border ${
                      darkMode 
                        ? 'bg-gray-800 border-gray-600 text-white' 
                        : 'bg-white border-gray-300 text-gray-900'
                    }`}
                  >
                    <option value="pending">Pendiente</option>
                    <option value="processing">Procesando</option>
                    <option value="shipped">Enviado</option>
                    <option value="delivered">Entregado</option>
                  </select>
                </div>
                <div className="col-span-2">
                  <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    Estado de Pago
                  </label>
                  <select
                    className={`w-full px-3 py-2 rounded-lg border ${
                      darkMode 
                        ? 'bg-gray-800 border-gray-600 text-white' 
                        : 'bg-white border-gray-300 text-gray-900'
                    }`}
                  >
                    <option value="pending">Pendiente</option>
                    <option value="paid">Pagado</option>
                  </select>
                </div>
              </div>

              <div className="flex gap-2 pt-4">
                <Button type="submit" className="bg-green-600 hover:bg-green-700 text-white">
                  Crear Pedido
                </Button>
                <Button
                  type="button"
                  onClick={() => setShowAddOrderModal(false)}
                  variant="ghost"
                  className={darkMode ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'}
                >
                  Cancelar
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal Agregar Producto */}
      {showAddProductModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className={`max-w-2xl w-full rounded-lg p-6 max-h-[90vh] overflow-y-auto ${
            darkMode ? 'bg-gray-950 border border-green-500/20' : 'bg-white border border-green-200'
          }`}>
            <div className="flex items-center justify-between mb-6">
              <h2 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                Agregar Nuevo Producto
              </h2>
              <Button
                variant="ghost"
                onClick={() => setShowAddProductModal(false)}
                className={darkMode ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'}
              >
                <X size={24} />
              </Button>
            </div>
            
            <form className="space-y-4" onSubmit={(e) => {
              e.preventDefault();
              showNotification('Producto agregado exitosamente', 'success');
              setShowAddProductModal(false);
            }}>
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2">
                  <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    Nombre del Producto *
                  </label>
                  <input
                    type="text"
                    placeholder="Ej: Taza Personalizada"
                    className={`w-full px-3 py-2 rounded-lg border ${
                      darkMode 
                        ? 'bg-gray-800 border-gray-600 text-white placeholder:text-gray-500' 
                        : 'bg-white border-gray-300 text-gray-900 placeholder:text-gray-400'
                    }`}
                    required
                  />
                </div>
                <div>
                  <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    Categoría *
                  </label>
                  <select
                    className={`w-full px-3 py-2 rounded-lg border ${
                      darkMode 
                        ? 'bg-gray-800 border-gray-600 text-white' 
                        : 'bg-white border-gray-300 text-gray-900'
                    }`}
                    required
                  >
                    <option value="">Seleccionar...</option>
                    <option value="Sublimación">Sublimación</option>
                    <option value="Impresión 3D">Impresión 3D</option>
                    <option value="Diseño">Diseño</option>
                  </select>
                </div>
                <div>
                  <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    Precio *
                  </label>
                  <input
                    type="text"
                    placeholder="$0"
                    className={`w-full px-3 py-2 rounded-lg border ${
                      darkMode 
                        ? 'bg-gray-800 border-gray-600 text-white placeholder:text-gray-500' 
                        : 'bg-white border-gray-300 text-gray-900 placeholder:text-gray-400'
                    }`}
                    required
                  />
                </div>
                <div>
                  <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    Stock Inicial
                  </label>
                  <input
                    type="number"
                    placeholder="0"
                    defaultValue="0"
                    className={`w-full px-3 py-2 rounded-lg border ${
                      darkMode 
                        ? 'bg-gray-800 border-gray-600 text-white placeholder:text-gray-500' 
                        : 'bg-white border-gray-300 text-gray-900 placeholder:text-gray-400'
                    }`}
                  />
                </div>
                <div>
                  <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    Estado
                  </label>
                  <select
                    className={`w-full px-3 py-2 rounded-lg border ${
                      darkMode 
                        ? 'bg-gray-800 border-gray-600 text-white' 
                        : 'bg-white border-gray-300 text-gray-900'
                    }`}
                  >
                    <option value="active">Activo</option>
                    <option value="service">Servicio</option>
                    <option value="inactive">Inactivo</option>
                  </select>
                </div>
                <div className="col-span-2">
                  <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    Descripción
                  </label>
                  <textarea
                    placeholder="Descripción del producto..."
                    rows={3}
                    className={`w-full px-3 py-2 rounded-lg border ${
                      darkMode 
                        ? 'bg-gray-800 border-gray-600 text-white placeholder:text-gray-500' 
                        : 'bg-white border-gray-300 text-gray-900 placeholder:text-gray-400'
                    }`}
                  />
                </div>
              </div>

              <div className="flex gap-2 pt-4">
                <Button type="submit" className="bg-green-600 hover:bg-green-700 text-white">
                  Agregar Producto
                </Button>
                <Button
                  type="button"
                  onClick={() => setShowAddProductModal(false)}
                  variant="ghost"
                  className={darkMode ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'}
                >
                  Cancelar
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modales adicionales se agregarán aquí */}
    </div>
  );
}