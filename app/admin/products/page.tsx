'use client';

import { AdminDashboard } from '@/components/admin/AdminDashboard';
import { ThemeProvider, useTheme } from '@/contexts/ThemeContext';

function ProductsPageContent() {
  const { darkMode, toggleDarkMode } = useTheme();

  return (
    <AdminDashboard darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
  );
}

export default function ProductsPage() {
  return (
    <ThemeProvider>
      <ProductsPageContent />
    </ThemeProvider>
  );
}
