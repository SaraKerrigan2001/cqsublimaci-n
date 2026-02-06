'use client';

import { AdminProfile } from '@/components/admin/AdminProfile';
import { ThemeProvider, useTheme } from '@/contexts/ThemeContext';

function AdminProfileContent() {
  const { darkMode, toggleDarkMode } = useTheme();

  return (
    <AdminProfile darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
  );
}

export default function AdminProfilePage() {
  return (
    <ThemeProvider>
      <AdminProfileContent />
    </ThemeProvider>
  );
}
