'use client';

import { AdminLayout } from '@/components/admin/AdminLayout';
import { ProductManager } from '@/components/ProductManager';
import { ThemeProvider, useTheme } from '@/contexts/ThemeContext';

function ProductsPageContent() {
  const { darkMode, toggleDarkMode } = useTheme();

  return (
    <AdminLayout darkMode={darkMode} toggleDarkMode={toggleDarkMode} currentPage="products">
      <div className="space-y-6">
        <div>
          <h1 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            Gestión de Productos
          </h1>
          <p className={`${darkMode ? 'text-gray-400' : 'text-gray-700'} mt-1`}>
            Administra el catálogo de productos de CQ Sublimación
          </p>
        </div>
        
        <div className={`rounded-lg ${
          darkMode ? 'bg-gray-800' : 'bg-white/10 backdrop-blur-sm'
        } p-6`}>
          <ProductManager />
        </div>
      </div>
    </AdminLayout>
  );
}

export default function ProductsPage() {
  return (
    <ThemeProvider>
      <ProductsPageContent />
    </ThemeProvider>
  );
}