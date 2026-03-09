'use client';

import { useState } from 'react';
import { UserDashboard } from '@/components/usuario/UserDashboard';

export default function UsuarioPage() {
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <UserDashboard darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
  );
}
