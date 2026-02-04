'use client';

import { AdminLayout } from '@/components/admin/AdminLayout';
import { ThemeProvider, useTheme } from '@/contexts/ThemeContext';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MoreHorizontal, Mail, Phone, MapPin } from 'lucide-react';

function CustomersPageContent() {
  const { darkMode, toggleDarkMode } = useTheme();

  const customers = [
    {
      id: 1,
      name: 'María González',
      email: 'maria@email.com',
      phone: '+34 666 123 456',
      location: 'Madrid, España',
      orders: 15,
      totalSpent: '$1,250.00',
      status: 'active',
      avatar: 'MG'
    },
    {
      id: 2,
      name: 'Carlos Rodríguez',
      email: 'carlos@email.com',
      phone: '+34 677 987 654',
      location: 'Barcelona, España',
      orders: 8,
      totalSpent: '$890.50',
      status: 'active',
      avatar: 'CR'
    },
    {
      id: 3,
      name: 'Ana Martínez',
      email: 'ana@email.com',
      phone: '+34 688 456 789',
      location: 'Valencia, España',
      orders: 22,
      totalSpent: '$2,100.75',
      status: 'vip',
      avatar: 'AM'
    },
    {
      id: 4,
      name: 'Luis Fernández',
      email: 'luis@email.com',
      phone: '+34 699 321 654',
      location: 'Sevilla, España',
      orders: 3,
      totalSpent: '$180.25',
      status: 'new',
      avatar: 'LF'
    }
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
    <AdminLayout darkMode={darkMode} toggleDarkMode={toggleDarkMode} currentPage="customers">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              Clientes
            </h1>
            <p className={`${darkMode ? 'text-gray-400' : 'text-gray-700'} mt-1`}>
              Gestiona la base de datos de clientes
            </p>
          </div>
          <Button className="bg-green-500 hover:bg-green-600 text-white">
            Agregar Cliente
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className={`p-4 ${
            darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white/10 backdrop-blur-sm border-white/20'
          }`}>
            <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-700'} mb-1`}>
              Total Clientes
            </div>
            <div className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              1,247
            </div>
            <div className="text-xs text-green-500">+12% este mes</div>
          </Card>

          <Card className={`p-4 ${
            darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white/10 backdrop-blur-sm border-white/20'
          }`}>
            <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-700'} mb-1`}>
              Clientes Activos
            </div>
            <div className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              892
            </div>
            <div className="text-xs text-green-500">+8% este mes</div>
          </Card>

          <Card className={`p-4 ${
            darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white/10 backdrop-blur-sm border-white/20'
          }`}>
            <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-700'} mb-1`}>
              Clientes VIP
            </div>
            <div className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              156
            </div>
            <div className="text-xs text-yellow-500">+5% este mes</div>
          </Card>

          <Card className={`p-4 ${
            darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white/10 backdrop-blur-sm border-white/20'
          }`}>
            <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-700'} mb-1`}>
              Nuevos este mes
            </div>
            <div className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              89
            </div>
            <div className="text-xs text-blue-500">+23% vs mes anterior</div>
          </Card>
        </div>

        {/* Customers Table */}
        <Card className={`${
          darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white/10 backdrop-blur-sm border-white/20'
        }`}>
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                Lista de Clientes
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
                      Cliente
                    </th>
                    <th className={`text-left py-3 text-sm font-medium ${
                      darkMode ? 'text-gray-400' : 'text-gray-600'
                    }`}>
                      Contacto
                    </th>
                    <th className={`text-left py-3 text-sm font-medium ${
                      darkMode ? 'text-gray-400' : 'text-gray-600'
                    }`}>
                      Pedidos
                    </th>
                    <th className={`text-left py-3 text-sm font-medium ${
                      darkMode ? 'text-gray-400' : 'text-gray-600'
                    }`}>
                      Total Gastado
                    </th>
                    <th className={`text-left py-3 text-sm font-medium ${
                      darkMode ? 'text-gray-400' : 'text-gray-600'
                    }`}>
                      Estado
                    </th>
                    <th className={`text-left py-3 text-sm font-medium ${
                      darkMode ? 'text-gray-400' : 'text-gray-600'
                    }`}>
                      Acciones
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {customers.map((customer) => (
                    <tr key={customer.id} className={`border-b ${darkMode ? 'border-gray-700' : 'border-white/10'}`}>
                      <td className="py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center text-white text-sm font-medium">
                            {customer.avatar}
                          </div>
                          <div>
                            <div className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                              {customer.name}
                            </div>
                            <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                              ID: #{customer.id.toString().padStart(4, '0')}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="py-4">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <Mail size={14} className={darkMode ? 'text-gray-400' : 'text-gray-600'} />
                            <span className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                              {customer.email}
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Phone size={14} className={darkMode ? 'text-gray-400' : 'text-gray-600'} />
                            <span className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                              {customer.phone}
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <MapPin size={14} className={darkMode ? 'text-gray-400' : 'text-gray-600'} />
                            <span className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                              {customer.location}
                            </span>
                          </div>
                        </div>
                      </td>
                      <td className={`py-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                        {customer.orders}
                      </td>
                      <td className={`py-4 font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                        {customer.totalSpent}
                      </td>
                      <td className="py-4">
                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium text-white ${getStatusColor(customer.status)}`}>
                          {getStatusLabel(customer.status)}
                        </span>
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

export default function CustomersPage() {
  return (
    <ThemeProvider>
      <CustomersPageContent />
    </ThemeProvider>
  );
}