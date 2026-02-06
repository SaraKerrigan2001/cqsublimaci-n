'use client';

import { AdminDashboard } from '@/components/admin/AdminDashboard';
import { ThemeProvider, useTheme } from '@/contexts/ThemeContext';

function OrdersPageContent() {
  const { darkMode, toggleDarkMode } = useTheme();

  return (
    <AdminDashboard darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
  );
}

export default function OrdersPage() {
  return (
    <ThemeProvider>
      <OrdersPageContent />
    </ThemeProvider>
  );
}
