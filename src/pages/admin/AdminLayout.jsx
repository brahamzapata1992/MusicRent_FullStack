import { useState, useEffect } from 'react';
import { Link, useNavigate, Outlet, useLocation } from 'react-router-dom';
import { Users, FolderTree, List, Plus, LogOut } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import logo from '../../assets/img_header/logo.png';

const AdminLayout = () => {
  const { user, logout } = useApp();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!user || user.role?.toUpperCase() !== 'ADMIN') {
      navigate('/login');
    }
  }, [user, navigate]);

  const tabs = [
    { id: 'usuarios', label: 'Usuarios', icon: Users, path: '/admin/usuarios' },
    { id: 'categorias', label: 'Categorías', icon: FolderTree, path: '/admin/categorias' },
    { id: 'productos', label: 'Lista de Productos', icon: List, path: '/admin/productos' },
  ];

  const currentTab = tabs.find(t => location.pathname.includes(t.id))?.id || 'usuarios';

  if (!user || user.role?.toUpperCase() !== 'ADMIN') {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <Link to="/" className="flex items-center gap-3">
              <img src={logo} alt="Music Rent" className="h-10 w-auto" />
              <span className="font-bold text-lg text-gray-800">Admin</span>
            </Link>

            <nav className="hidden md:flex items-center gap-1">
              {tabs.map(tab => {
                const Icon = tab.icon;
                return (
                  <Link
                    key={tab.id}
                    to={tab.path}
                    className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-colors ${
                      currentTab === tab.id
                        ? 'bg-primary-50 text-primary-600'
                        : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    <Icon size={18} />
                    <span className="font-medium">{tab.label}</span>
                  </Link>
                );
              })}
            </nav>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-full bg-primary-500 text-white flex items-center justify-center font-semibold">
                  {user.name?.charAt(0).toUpperCase() || 'A'}
                </div>
                <span className="hidden sm:block text-gray-700 font-medium">{user.name}</span>
              </div>
              <button
                onClick={() => {
                  logout();
                  navigate('/');
                }}
                className="p-2 text-gray-500 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
              >
                <LogOut size={20} />
              </button>
            </div>
          </div>
        </div>

        {/* Mobile tabs */}
        <div className="md:hidden border-t border-gray-100 px-4 py-2 flex gap-1 overflow-x-auto">
          {tabs.map(tab => {
            const Icon = tab.icon;
            return (
              <Link
                key={tab.id}
                to={tab.path}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg whitespace-nowrap text-sm ${
                  currentTab === tab.id
                    ? 'bg-primary-50 text-primary-600'
                    : 'text-gray-600'
                }`}
              >
                <Icon size={16} />
                <span>{tab.label}</span>
              </Link>
            );
          })}
        </div>
      </header>

      {/* Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
