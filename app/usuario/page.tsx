'use client';

import { UserDashboard } from '@/components/usuario/UserDashboard';
import { ThemeProvider, useTheme } from '@/contexts/ThemeContext';

function UsuarioPageContent() {
  const { darkMode, toggleDarkMode } = useTheme();

  return (
    <UserDashboard darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
  );
}

export default function UsuarioPage() {
  return (
    <ThemeProvider>
      <UsuarioPageContent />
    </ThemeProvider>
  );
}
