'use client';

import { AdminLayout } from '@/components/admin/AdminLayout';
import { ThemeProvider, useTheme } from '@/contexts/ThemeContext';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MoreHorizontal, Package, Truck, CheckCircle, Clock } from 'lucide-react';

function OrdersPageContent() {
  const { darkMode, toggleDarkMode } = useTheme();

  const orders = [
    {
      id: 'ORD-001',
      customer: 'María González',
      products: ['Taza personalizada', 'Camiseta sublimada'],
      total: '$45.99',
      status: 'pending',
      date: '2024-01-10',
      paymentStatus: 'paid'
    },
    {
      id: 'ORD-002',
      customer: 'Carlos Rodríguez',
      products: ['Impresión 3D figura'],
      total: '$89.50',
      status: 'processing',
      date: '2024-01-09',
      paymentStatus: 'paid'
    },
    {
      id: 'ORD-003',
      customer: 'Ana Martínez',
      products: ['Taza personalizada', 'Llavero 3D', 'Camiseta'],
      total: '$67.25',
      status: 'shipped',
      date: '2024-01-08',
      paymentStatus: 'paid'
    },
    {
      id: 'ORD-004',
      customer: 'Luis Fernández',
      products: ['Camiseta sublimada'],
      total: '$25.00',
      status: 'delivered',
      date: '2024-01-07',
      paymentStatus: 'paid'
    },
    {
      id: 'ORD-005',
      customer: 'Elena Ruiz',
      products: ['Impresión 3D personalizada'],
      total: '$120.00',
      status: 'pending',
      date: '2024-01-06',
      paymentStatus: 'pending'
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending': return <Clock size={16} className="text-yellow-500" />;
      case 'processing': return <Package size={16} className="text-blue-500" />;
      case 'shipped': return <Truck size={16} className="text-purple-500" />;
      case 'delivered': return <CheckCircle size={16} className="text-green-500" />;
      default: return <Clock size={16} className="text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-500';
      case 'processing': return 'bg-blue-500';
      case 'shipped': return 'bg-purple-500';
      case 'delivered': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'pending': return 'Pendiente';
      case 'processing': return 'Procesando';
      case 'shipped': return 'Enviado';
      case 'delivered': return 'Entregado';
      default: return 'Desconocido';
    }
  };

  const getPaymentStatusColor = (status: string) => {
    return status === 'paid' ? 'bg-green-500' : 'bg-red-500';
  };

  const getPaymentStatusLabel = (status: string) => {
    return status === 'paid' ? 'Pagado' : 'Pendiente';
  };

  return (
    <AdminLayout darkMode={darkMode} toggleDarkMode={toggleDarkMode} currentPage="orders">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              Pedidos
            </h1>
            <p className={`${darkMode ? 'text-gray-400' : 'text-gray-700'} mt-1`}>
              Gestiona todos los pedidos de CQ Sublimación
            </p>
          </div>
          <Button className="bg-green-500 hover:bg-green-600 text-white">
            Nuevo Pedido
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className={`p-4 ${
            darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white/10 backdrop-blur-sm border-white/20'
          }`}>
            <div className="flex items-center gap-3">
              <div className="p-2 bg-yellow-500/20 rounded-lg">
                <Clock size={20} className="text-yellow-500" />
              </div>
              <div>
                <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-700'}`}>
                  Pendientes
                </div>
                <div className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  23
                </div>
              </div>
            </div>
          </Card>

          <Card className={`p-4 ${
            darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white/10 backdrop-blur-sm border-white/20'
          }`}>
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-500/20 rounded-lg">
                <Package size={20} className="text-blue-500" />
              </div>
              <div>
                <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-700'}`}>
                  Procesando
                </div>
                <div className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  15
                </div>
              </div>
            </div>
          </Card>

          <Card className={`p-4 ${
            darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white/10 backdrop-blur-sm border-white/20'
          }`}>
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-500/20 rounded-lg">
                <Truck size={20} className="text-purple-500" />
              </div>
              <div>
                <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-700'}`}>
                  Enviados
                </div>
                <div className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  8
                </div>
              </div>
            </div>
          </Card>

          <Card className={`p-4 ${
            darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white/10 backdrop-blur-sm border-white/20'
          }`}>
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-500/20 rounded-lg">
                <CheckCircle size={20} className="text-green-500" />
              </div>
              <div>
                <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-700'}`}>
                  Entregados
                </div>
                <div className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  142
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Orders Table */}
        <Card className={`${
          darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white/10 backdrop-blur-sm border-white/20'
        }`}>
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                Pedidos Recientes
              </h3>
              <Button variant="ghost" size="sm">
                <MoreHorizontal size={16} />
              </Button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className={`border-b ${darkMode ? 'border-gray-700' : 'border-white/20'}`}>
                    <th className={`text-left py-3 text-sm font-medium ${
                      darkMode ? 'text-gray-400' : 'text-gray-600'
                    }`}>
                      Pedido
                    </th>
                    <th className={`text-left py-3 text-sm font-medium ${
                      darkMode ? 'text-gray-400' : 'text-gray-600'
                    }`}>
                      Cliente
                    </th>
                    <th className={`text-left py-3 text-sm font-medium ${
                      darkMode ? 'text-gray-400' : 'text-gray-600'
                    }`}>
                      Productos
                    </th>
                    <th className={`text-left py-3 text-sm font-medium ${
                      darkMode ? 'text-gray-400' : 'text-gray-600'
                    }`}>
                      Total
                    </th>
                    <th className={`text-left py-3 text-sm font-medium ${
                      darkMode ? 'text-gray-400' : 'text-gray-600'
                    }`}>
                      Estado
                    </th>
                    <th className={`text-left py-3 text-sm font-medium ${
                      darkMode ? 'text-gray-400' : 'text-gray-600'
                    }`}>
                      Pago
                    </th>
                    <th className={`text-left py-3 text-sm font-medium ${
                      darkMode ? 'text-gray-400' : 'text-gray-600'
                    }`}>
                      Fecha
                    </th>
                    <th className={`text-left py-3 text-sm font-medium ${
                      darkMode ? 'text-gray-400' : 'text-gray-600'
                    }`}>
                      Acciones
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order) => (
                    <tr key={order.id} className={`border-b ${darkMode ? 'border-gray-700' : 'border-white/10'}`}>
                      <td className="py-4">
                        <div className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                          {order.id}
                        </div>
                      </td>
                      <td className={`py-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                        {order.customer}
                      </td>
                      <td className="py-4">
                        <div className="space-y-1">
                          {order.products.map((product, index) => (
                            <div key={index} className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                              • {product}
                            </div>
                          ))}
                        </div>
                      </td>
                      <td className={`py-4 font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                        {order.total}
                      </td>
                      <td className="py-4">
                        <div className="flex items-center gap-2">
                          {getStatusIcon(order.status)}
                          <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium text-white ${getStatusColor(order.status)}`}>
                            {getStatusLabel(order.status)}
                          </span>
                        </div>
                      </td>
                      <td className="py-4">
                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium text-white ${getPaymentStatusColor(order.paymentStatus)}`}>
                          {getPaymentStatusLabel(order.paymentStatus)}
                        </span>
                      </td>
                      <td className={`py-4 text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                        {new Date(order.date).toLocaleDateString('es-ES')}
                      </td>
                      <td className="py-4">
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal size={16} />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </Card>
      </div>
    </AdminLayout>
  );
}

export default function OrdersPage() {
  return (
    <ThemeProvider>
      <OrdersPageContent />
    </ThemeProvider>
  );
}