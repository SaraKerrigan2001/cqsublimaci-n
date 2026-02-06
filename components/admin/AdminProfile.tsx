'use client';

import { useState, useEffect } from 'react';
import { 
  User, 
  Mail, 
  Shield, 
  Calendar,
  Edit2,
  Save,
  X,
  Camera,
  Lock,
  Bell,
  Globe,
  Moon,
  Sun,
  ArrowLeft
} from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface AdminProfileProps {
  darkMode: boolean;
  toggleDarkMode: () => void;
}

export function AdminProfile({ darkMode, toggleDarkMode }: AdminProfileProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  
  // Datos del perfil
  const [profileData, setProfileData] = useState({
    name: 'María Paula',
    email: 'paitocapacho5@gmail.com',
    role: 'ADMIN',
    phone: '+57 300 123 4567',
    bio: 'Administradora de CQ Sublimación',
    location: 'Colombia',
    createdAt: '2024-01-15'
  });

  // Datos editables
  const [editData, setEditData] = useState({ ...profileData });

  // Datos de cambio de contraseña
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  // Configuraciones
  const [settings, setSettings] = useState({
    emailNotifications: true,
    orderNotifications: true,
    darkMode: darkMode,
    language: 'es'
  });

  const handleSaveProfile = async () => {
    setLoading(true);
    // Aquí iría la lógica para guardar en la API
    setTimeout(() => {
      setProfileData(editData);
      setIsEditing(false);
      setLoading(false);
      alert('Perfil actualizado exitosamente');
    }, 1000);
  };

  const handleCancelEdit = () => {
    setEditData({ ...profileData });
    setIsEditing(false);
  };

  const handleChangePassword = async () => {
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      alert('Las contraseñas no coinciden');
      return;
    }
    
    if (passwordData.newPassword.length < 4) {
      alert('La contraseña debe tener al menos 4 caracteres');
      return;
    }

    setLoading(true);
    // Aquí iría la lógica para cambiar la contraseña en la API
    setTimeout(() => {
      setIsChangingPassword(false);
      setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
      setLoading(false);
      alert('Contraseña actualizada exitosamente');
    }, 1000);
  };

  const handleSettingChange = (key: string, value: boolean | string) => {
    setSettings({ ...settings, [key]: value });
    
    if (key === 'darkMode') {
      toggleDarkMode();
    }
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      darkMode ? 'bg-black text-white' : 'bg-white text-gray-900'
    }`}>
      <div className="max-w-6xl mx-auto p-4 md:p-6">
        {/* Header */}
        <div className="mb-6">
          <Button
            variant="ghost"
            onClick={() => window.location.href = '/admin'}
            className={`mb-4 ${
              darkMode 
                ? 'text-gray-400 hover:text-white hover:bg-gray-800' 
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
            }`}
          >
            <ArrowLeft size={20} className="mr-2" />
            Volver al Dashboard
          </Button>
          
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className={`text-2xl md:text-3xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                Mi Perfil
              </h1>
              <p className={`text-sm md:text-base ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                Gestiona tu información personal y configuraciones
              </p>
            </div>
            
            <Button 
              onClick={toggleDarkMode}
              variant="ghost"
              className={`self-start md:self-auto ${
                darkMode 
                  ? 'text-gray-400 hover:text-white hover:bg-gray-800' 
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
              }`}
            >
              {darkMode ? <Sun size={20} /> : <Moon size={20} />}
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Columna Izquierda - Información del Perfil */}
          <div className="lg:col-span-2 space-y-6">
            {/* Card de Información Personal */}
            <Card className={`p-6 ${
              darkMode 
                ? 'bg-gray-950 border border-green-500/20 shadow-lg shadow-green-500/5' 
                : 'bg-white border border-green-200 shadow-lg shadow-green-100'
            }`}>
              <div className="flex items-center justify-between mb-6">
                <h2 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  Información Personal
                </h2>
                {!isEditing ? (
                  <Button
                    onClick={() => setIsEditing(true)}
                    className="bg-green-600 hover:bg-green-700 text-white"
                  >
                    <Edit2 size={16} className="mr-2" />
                    Editar
                  </Button>
                ) : (
                  <div className="flex gap-2">
                    <Button
                      onClick={handleSaveProfile}
                      disabled={loading}
                      className="bg-green-600 hover:bg-green-700 text-white"
                    >
                      <Save size={16} className="mr-2" />
                      {loading ? 'Guardando...' : 'Guardar'}
                    </Button>
                    <Button
                      onClick={handleCancelEdit}
                      variant="ghost"
                      className={`${
                        darkMode 
                          ? 'text-gray-400 hover:text-white hover:bg-gray-800' 
                          : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                      }`}
                    >
                      <X size={16} className="mr-2" />
                      Cancelar
                    </Button>
                  </div>
                )}
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label className={`${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      Nombre Completo
                    </Label>
                    {isEditing ? (
                      <Input
                        value={editData.name}
                        onChange={(e) => setEditData({ ...editData, name: e.target.value })}
                        className={`mt-1 ${
                          darkMode 
                            ? 'bg-gray-800 border-gray-600 text-white' 
                            : 'bg-white border-gray-300 text-gray-900'
                        }`}
                      />
                    ) : (
                      <p className={`mt-1 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                        {profileData.name}
                      </p>
                    )}
                  </div>

                  <div>
                    <Label className={`${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      Email
                    </Label>
                    <p className={`mt-1 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                      {profileData.email}
                    </p>
                    <p className={`text-xs ${darkMode ? 'text-gray-500' : 'text-gray-500'}`}>
                      El email no se puede cambiar
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label className={`${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      Teléfono
                    </Label>
                    {isEditing ? (
                      <Input
                        value={editData.phone}
                        onChange={(e) => setEditData({ ...editData, phone: e.target.value })}
                        className={`mt-1 ${
                          darkMode 
                            ? 'bg-gray-800 border-gray-600 text-white' 
                            : 'bg-white border-gray-300 text-gray-900'
                        }`}
                      />
                    ) : (
                      <p className={`mt-1 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                        {profileData.phone}
                      </p>
                    )}
                  </div>

                  <div>
                    <Label className={`${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      Ubicación
                    </Label>
                    {isEditing ? (
                      <Input
                        value={editData.location}
                        onChange={(e) => setEditData({ ...editData, location: e.target.value })}
                        className={`mt-1 ${
                          darkMode 
                            ? 'bg-gray-800 border-gray-600 text-white' 
                            : 'bg-white border-gray-300 text-gray-900'
                        }`}
                      />
                    ) : (
                      <p className={`mt-1 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                        {profileData.location}
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  <Label className={`${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    Biografía
                  </Label>
                  {isEditing ? (
                    <textarea
                      value={editData.bio}
                      onChange={(e) => setEditData({ ...editData, bio: e.target.value })}
                      rows={3}
                      className={`mt-1 w-full p-3 rounded-md ${
                        darkMode 
                          ? 'bg-gray-800 border-gray-600 text-white' 
                          : 'bg-white border-gray-300 text-gray-900'
                      } border focus:outline-none focus:ring-2 focus:ring-green-500`}
                    />
                  ) : (
                    <p className={`mt-1 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                      {profileData.bio}
                    </p>
                  )}
                </div>
              </div>
            </Card>

            {/* Card de Seguridad */}
            <Card className={`p-6 ${
              darkMode 
                ? 'bg-gray-950 border border-green-500/20 shadow-lg shadow-green-500/5' 
                : 'bg-white border border-green-200 shadow-lg shadow-green-100'
            }`}>
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                  <Lock size={20} className="text-green-500" />
                  <h2 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                    Seguridad
                  </h2>
                </div>
                {!isChangingPassword && (
                  <Button
                    onClick={() => setIsChangingPassword(true)}
                    className="bg-green-600 hover:bg-green-700 text-white"
                  >
                    Cambiar Contraseña
                  </Button>
                )}
              </div>

              {isChangingPassword ? (
                <div className="space-y-4">
                  <div>
                    <Label className={`${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      Contraseña Actual
                    </Label>
                    <Input
                      type="password"
                      value={passwordData.currentPassword}
                      onChange={(e) => setPasswordData({ ...passwordData, currentPassword: e.target.value })}
                      className={`mt-1 ${
                        darkMode 
                          ? 'bg-gray-800 border-gray-600 text-white' 
                          : 'bg-white border-gray-300 text-gray-900'
                      }`}
                    />
                  </div>

                  <div>
                    <Label className={`${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      Nueva Contraseña
                    </Label>
                    <Input
                      type="password"
                      value={passwordData.newPassword}
                      onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
                      className={`mt-1 ${
                        darkMode 
                          ? 'bg-gray-800 border-gray-600 text-white' 
                          : 'bg-white border-gray-300 text-gray-900'
                      }`}
                    />
                  </div>

                  <div>
                    <Label className={`${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      Confirmar Nueva Contraseña
                    </Label>
                    <Input
                      type="password"
                      value={passwordData.confirmPassword}
                      onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
                      className={`mt-1 ${
                        darkMode 
                          ? 'bg-gray-800 border-gray-600 text-white' 
                          : 'bg-white border-gray-300 text-gray-900'
                      }`}
                    />
                  </div>

                  <div className="flex gap-2 pt-2">
                    <Button
                      onClick={handleChangePassword}
                      disabled={loading}
                      className="bg-green-600 hover:bg-green-700 text-white"
                    >
                      {loading ? 'Actualizando...' : 'Actualizar Contraseña'}
                    </Button>
                    <Button
                      onClick={() => {
                        setIsChangingPassword(false);
                        setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
                      }}
                      variant="ghost"
                      className={`${
                        darkMode 
                          ? 'text-gray-400 hover:text-white hover:bg-gray-800' 
                          : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                      }`}
                    >
                      Cancelar
                    </Button>
                  </div>
                </div>
              ) : (
                <div className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  <p>Última actualización: Hace 30 días</p>
                  <p className="text-sm mt-2">
                    Se recomienda cambiar tu contraseña regularmente para mantener tu cuenta segura.
                  </p>
                </div>
              )}
            </Card>

            {/* Card de Configuraciones */}
            <Card className={`p-6 ${
              darkMode 
                ? 'bg-gray-950 border border-green-500/20 shadow-lg shadow-green-500/5' 
                : 'bg-white border border-green-200 shadow-lg shadow-green-100'
            }`}>
              <h2 className={`text-xl font-bold mb-6 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                Configuraciones
              </h2>

              <div className="space-y-4">
                <div className="flex items-center justify-between py-3 border-b border-gray-700">
                  <div className="flex items-center gap-3">
                    <Bell size={20} className="text-green-500" />
                    <div>
                      <p className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                        Notificaciones por Email
                      </p>
                      <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                        Recibe actualizaciones por correo
                      </p>
                    </div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={settings.emailNotifications}
                      onChange={(e) => handleSettingChange('emailNotifications', e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-800 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between py-3 border-b border-gray-700">
                  <div className="flex items-center gap-3">
                    <Bell size={20} className="text-green-500" />
                    <div>
                      <p className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                        Notificaciones de Pedidos
                      </p>
                      <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                        Alertas de nuevos pedidos
                      </p>
                    </div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={settings.orderNotifications}
                      onChange={(e) => handleSettingChange('orderNotifications', e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-800 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between py-3">
                  <div className="flex items-center gap-3">
                    <Globe size={20} className="text-green-500" />
                    <div>
                      <p className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                        Idioma
                      </p>
                      <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                        Idioma de la interfaz
                      </p>
                    </div>
                  </div>
                  <select
                    value={settings.language}
                    onChange={(e) => handleSettingChange('language', e.target.value)}
                    className={`px-3 py-2 rounded-md ${
                      darkMode 
                        ? 'bg-gray-800 border-gray-600 text-white' 
                        : 'bg-white border-gray-300 text-gray-900'
                    } border focus:outline-none focus:ring-2 focus:ring-green-500`}
                  >
                    <option value="es">Español</option>
                    <option value="en">English</option>
                  </select>
                </div>
              </div>
            </Card>
          </div>

          {/* Columna Derecha - Resumen */}
          <div className="space-y-6">
            {/* Card de Avatar */}
            <Card className={`p-6 ${
              darkMode 
                ? 'bg-gray-950 border border-green-500/20 shadow-lg shadow-green-500/5' 
                : 'bg-white border border-green-200 shadow-lg shadow-green-100'
            }`}>
              <div className="text-center">
                <div className="relative inline-block mb-4">
                  <div className="w-32 h-32 bg-green-600 rounded-full flex items-center justify-center shadow-lg shadow-green-500/25">
                    <User size={64} className="text-white" />
                  </div>
                  <button className="absolute bottom-0 right-0 w-10 h-10 bg-green-500 rounded-full flex items-center justify-center shadow-lg hover:bg-green-600 transition-colors">
                    <Camera size={20} className="text-white" />
                  </button>
                </div>
                <h3 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  {profileData.name}
                </h3>
                <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  {profileData.email}
                </p>
                <div className="mt-3 inline-flex items-center gap-2 px-3 py-1 bg-green-500/20 text-green-400 rounded-full text-sm">
                  <Shield size={16} />
                  Administrador
                </div>
              </div>
            </Card>

            {/* Card de Estadísticas */}
            <Card className={`p-6 ${
              darkMode 
                ? 'bg-gray-950 border border-green-500/20 shadow-lg shadow-green-500/5' 
                : 'bg-white border border-green-200 shadow-lg shadow-green-100'
            }`}>
              <h3 className={`text-lg font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                Información de Cuenta
              </h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Calendar size={18} className="text-green-500" />
                  <div>
                    <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      Miembro desde
                    </p>
                    <p className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                      {new Date(profileData.createdAt).toLocaleDateString('es-ES', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Shield size={18} className="text-green-500" />
                  <div>
                    <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      Rol
                    </p>
                    <p className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                      Administrador
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Mail size={18} className="text-green-500" />
                  <div>
                    <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      Estado
                    </p>
                    <p className="font-medium text-green-500">
                      Activo
                    </p>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
