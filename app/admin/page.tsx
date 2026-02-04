'use client';

import { AdminDashboard } from '@/components/admin/AdminDashboard';
import { ThemeProvider, useTheme } from '@/contexts/ThemeContext';

function AdminPageContent() {
  const { darkMode, toggleDarkMode } = useTheme();

  return (
    <AdminDashboard darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
  );
}

export default function AdminPage() {
  return (
    <ThemeProvider>
      <AdminPageContent />
    </ThemeProvider>
  );
}