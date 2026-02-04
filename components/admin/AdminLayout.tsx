'use client';

import { useState, ReactNode } from 'react';
import { 
  BarChart3, 
  Users, 
  ShoppingCart, 
  Package, 
  Settings,
  LogOut,
  Bell,
  Search,
  Moon,
  Sun
} from 'lucide-react';
import { Button } from '@/components/ui/button';

interface AdminLayoutProps {
  children: ReactNode;
  darkMode: boolean;
  toggleDarkMode: () => void;
  currentPage?: string;
}

export function AdminLayout({ children, darkMode, toggleDarkMode, currentPage = 'overview' }: AdminLayoutProps) {
  const menuItems = [
    { id: 'overview', label: 'Overview', icon: BarChart3, href: '/admin' },
    { id: 'customers', label: 'Customers', icon: Users, href: '/admin/customers' },
    { id: 'orders', label: 'Orders', icon: ShoppingCart, href: '/admin/orders' },
    { id: 'products', label: 'Products', icon: Package, href: '/admin/products' },
  ];

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      darkMode 
        ? 'bg-gray-900 text-white' 
        : 'bg-gradient-to-br from-green-400 via-green-500 to-green-600'
    }`}>
      {/* Sidebar */}
      <div className={`fixed left-0 top-0 h-full w-64 transition-colors duration-300 ${
        darkMode ? 'bg-gray-800' : 'bg-gray-900'
      } p-6 z-50`}>
        <div className="flex items-center gap-2 mb-8">
          <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold">CQ</span>
          </div>
          <span className="text-white font-semibold">CQ Sublimación</span>
        </div>

        <nav className="space-y-2">
          <div className="text-gray-400 text-sm font-medium mb-4">DASHBOARD</div>
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentPage === item.id;
            
            return (
              <a 
                key={item.id}
                href={item.href} 
                className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                  isActive 
                    ? 'bg-green-500 text-white' 
                    : 'text-gray-400 hover:text-white hover:bg-gray-700'
                }`}
              >
                <Icon size={20} />
                {item.label}
              </a>
            );
          })}

          <div className="text-gray-400 text-sm font-medium mb-4 mt-8">SETTINGS</div>
          <a href="/admin/settings" className="flex items-center gap-3 px-3 py-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded-lg">
            <Settings size={20} />
            Settings
          </a>
        </nav>

        <div className="absolute bottom-6 left-6 right-6">
          <Button 
            variant="ghost" 
            className="w-full justify-start text-gray-400 hover:text-white hover:bg-gray-700"
          >
            <LogOut size={20} className="mr-3" />
            Log Out
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="ml-64">
        {/* Header */}
        <div className={`sticky top-0 z-40 backdrop-blur-sm border-b ${
          darkMode 
            ? 'bg-gray-900/80 border-gray-700' 
            : 'bg-white/10 border-white/20'
        } px-6 py-4`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="relative">
                <Search size={20} className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${
                  darkMode ? 'text-gray-400' : 'text-gray-600'
                }`} />
                <input
                  type="text"
                  placeholder="Search Here"
                  className={`pl-10 pr-4 py-2 rounded-lg border-none outline-none ${
                    darkMode 
                      ? 'bg-gray-800 text-white placeholder-gray-400' 
                      : 'bg-white/20 text-gray-900 placeholder-gray-700 backdrop-blur-sm'
                  }`}
                />
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={toggleDarkMode}
                className={`p-2 ${darkMode ? 'text-gray-400 hover:text-white' : 'text-gray-700 hover:text-gray-900'}`}
              >
                {darkMode ? <Sun size={20} /> : <Moon size={20} />}
              </Button>

              <Button variant="ghost" size="sm" className={darkMode ? 'text-gray-400' : 'text-gray-700'}>
                <Bell size={20} />
              </Button>

              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-gradient-to-br from-green-400 to-green-600 rounded-full"></div>
                <span className={`text-sm font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  Admin
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Page Content */}
        <div className="p-6">
          {children}
        </div>
      </div>
    </div>
  );
}