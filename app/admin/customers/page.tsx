'use client';

import { AdminDashboard } from '@/components/admin/AdminDashboard';
import { ThemeProvider, useTheme } from '@/contexts/ThemeContext';

function CustomersPageContent() {
  const { darkMode, toggleDarkMode } = useTheme();

  return (
    <AdminDashboard darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
  );
}

export default function CustomersPage() {
  return (
    <ThemeProvider>
      <CustomersPageContent />
    </ThemeProvider>
  );
}