import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Mail, Phone, MapPin, Calendar, Package, LogOut, Heart } from 'lucide-react';
import { useApp } from '../context/AppContext';

const Profile = () => {
  const { user, logout, favorites, products, API_URL, token } = useApp();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('reservas');
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  useEffect(() => {
    fetchReservations();
  }, []);

  const fetchReservations = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/api/customer/reservations`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        const data = await res.json();
        setReservations(data);
      }
    } catch (error) {
      console.error('Error fetching reservations:', error);
      // Mock data for development
      setReservations([
        {
          id: 'RES-001',
          productName: 'Guitarra Fender CD60s',
          productImage: '/placeholder-instrument.png',
          startDate: '2024-04-01',
          endDate: '2024-04-05',
          totalPrice: 150000,
          status: 'completed'
        },
        {
          id: 'RES-002',
          productName: 'Batería Pearl Export',
          productImage: '/placeholder-instrument.png',
          startDate: '2024-04-10',
          endDate: '2024-04-15',
          totalPrice: 250000,
          status: 'active'
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const favoriteProducts = products.filter(p => favorites.includes(p.id));

  const getStatusBadge = (status) => {
    const styles = {
      active: 'bg-green-100 text-green-700',
      completed: 'bg-gray-100 text-gray-700',
      cancelled: 'bg-red-100 text-red-700',
      pending: 'bg-yellow-100 text-yellow-700',
    };
    const labels = {
      active: 'Activa',
      completed: 'Completada',
      cancelled: 'Cancelada',
      pending: 'Pendiente',
    };
    return (
      <span className={`px-3 py-1 rounded-full text-sm font-medium ${styles[status] || styles.pending}`}>
        {labels[status] || status}
      </span>
    );
  };

  if (!user) return null;

  return (
    <main className="min-h-screen bg-gray-50 pt-24 pb-10">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Profile Header */}
        <div className="bg-white rounded-2xl shadow-sm p-6 mb-6">
          <div className="flex flex-col sm:flex-row items-center gap-6">
            <div className="w-24 h-24 rounded-full bg-primary-500 text-white flex items-center justify-center text-3xl font-bold">
              {user.name?.charAt(0).toUpperCase() || 'U'}
            </div>
            <div className="flex-1 text-center sm:text-left">
              <h1 className="text-2xl font-bold text-gray-800">{user.name} {user.surname}</h1>
              <p className="text-gray-500">{user.email}</p>
              {user.role === 'admin' && (
                <span className="inline-block mt-2 px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-medium">
                  Administrador
                </span>
              )}
            </div>
            <button
              onClick={() => {
                logout();
                navigate('/');
              }}
              className="flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-red-50 rounded-xl transition-colors"
            >
              <LogOut size={18} />
              Cerrar sesión
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6 overflow-x-auto">
          <button
            onClick={() => setActiveTab('reservas')}
            className={`flex items-center gap-2 px-5 py-3 rounded-xl font-medium transition-colors whitespace-nowrap ${
              activeTab === 'reservas'
                ? 'bg-primary-500 text-white'
                : 'bg-white text-gray-600 hover:bg-gray-50'
            }`}
          >
            <Calendar size={18} />
            Mis Reservas
          </button>
          <button
            onClick={() => setActiveTab('favoritos')}
            className={`flex items-center gap-2 px-5 py-3 rounded-xl font-medium transition-colors whitespace-nowrap ${
              activeTab === 'favoritos'
                ? 'bg-primary-500 text-white'
                : 'bg-white text-gray-600 hover:bg-gray-50'
            }`}
          >
            <Heart size={18} />
            Favoritos ({favorites.length})
          </button>
          <button
            onClick={() => setActiveTab('datos')}
            className={`flex items-center gap-2 px-5 py-3 rounded-xl font-medium transition-colors whitespace-nowrap ${
              activeTab === 'datos'
                ? 'bg-primary-500 text-white'
                : 'bg-white text-gray-600 hover:bg-gray-50'
            }`}
          >
            <User size={18} />
            Mis Datos
          </button>
        </div>

        {/* Content */}
        <div className="bg-white rounded-2xl shadow-sm">
          {/* Reservations Tab */}
          {activeTab === 'reservas' && (
            <div className="p-6">
              <h2 className="text-lg font-bold text-gray-800 mb-4">Historial de Reservas</h2>
              
              {loading ? (
                <div className="space-y-4">
                  {[1, 2, 3].map(i => (
                    <div key={i} className="animate-pulse flex gap-4 p-4 bg-gray-50 rounded-xl">
                      <div className="w-20 h-20 bg-gray-200 rounded-lg" />
                      <div className="flex-1 space-y-2">
                        <div className="h-4 bg-gray-200 rounded w-1/2" />
                        <div className="h-3 bg-gray-200 rounded w-1/3" />
                        <div className="h-3 bg-gray-200 rounded w-1/4" />
                      </div>
                    </div>
                  ))}
                </div>
              ) : reservations.length === 0 ? (
                <div className="text-center py-12">
                  <Package size={48} className="mx-auto text-gray-300 mb-4" />
                  <p className="text-gray-500">No tienes reservas aún</p>
                  <button
                    onClick={() => navigate('/')}
                    className="mt-4 px-6 py-2 bg-primary-500 text-white rounded-xl hover:bg-primary-600 transition-colors"
                  >
                    Explorar instrumentos
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  {reservations.map(reservation => (
                    <div key={reservation.id} className="flex flex-col sm:flex-row gap-4 p-4 bg-gray-50 rounded-xl">
                      <img
                        src={reservation.productImage}
                        alt={reservation.productName}
                        className="w-full sm:w-24 h-32 sm:h-24 object-cover rounded-lg"
                      />
                      <div className="flex-1">
                        <div className="flex flex-wrap items-start justify-between gap-2 mb-2">
                          <h3 className="font-semibold text-gray-800">{reservation.productName}</h3>
                          {getStatusBadge(reservation.status)}
                        </div>
                        <p className="text-sm text-gray-500 mb-1">
                          <span className="font-medium">Reserva:</span> {reservation.id}
                        </p>
                        <p className="text-sm text-gray-500 mb-2">
                          {new Date(reservation.startDate).toLocaleDateString('es-ES')} - {new Date(reservation.endDate).toLocaleDateString('es-ES')}
                        </p>
                        <p className="font-bold text-primary-500">${reservation.totalPrice?.toLocaleString()}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Favorites Tab */}
          {activeTab === 'favoritos' && (
            <div className="p-6">
              <h2 className="text-lg font-bold text-gray-800 mb-4">Mis Favoritos</h2>
              
              {favoriteProducts.length === 0 ? (
                <div className="text-center py-12">
                  <Heart size={48} className="mx-auto text-gray-300 mb-4" />
                  <p className="text-gray-500">No tienes favoritos guardados</p>
                  <button
                    onClick={() => navigate('/')}
                    className="mt-4 px-6 py-2 bg-primary-500 text-white rounded-xl hover:bg-primary-600 transition-colors"
                  >
                    Explorar instrumentos
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {favoriteProducts.map(product => (
                    <div
                      key={product.id}
                      onClick={() => navigate(`/producto/${product.id}`)}
                      className="flex gap-4 p-4 bg-gray-50 rounded-xl cursor-pointer hover:bg-gray-100 transition-colors"
                    >
                      <img
                        src={product.images?.[0]?.url ? `${API_URL}${product.images[0].url}` : '/placeholder-instrument.png'}
                        alt={product.name}
                        className="w-20 h-20 object-cover rounded-lg"
                      />
                      <div>
                        <h3 className="font-semibold text-gray-800 line-clamp-2">{product.name}</h3>
                        <p className="text-primary-500 font-bold mt-1">${product.price?.toLocaleString()}/día</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* User Data Tab */}
          {activeTab === 'datos' && (
            <div className="p-6">
              <h2 className="text-lg font-bold text-gray-800 mb-4">Mis Datos</h2>
              
              <div className="space-y-4">
                <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
                  <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                    <User size={20} className="text-primary-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Nombre completo</p>
                    <p className="font-medium text-gray-800">{user.name} {user.surname}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
                  <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                    <Mail size={20} className="text-primary-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Correo electrónico</p>
                    <p className="font-medium text-gray-800">{user.email}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
                  <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                    <Phone size={20} className="text-primary-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Teléfono</p>
                    <p className="font-medium text-gray-800">{user.phone || 'No registrado'}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
                  <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                    <MapPin size={20} className="text-primary-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Dirección</p>
                    <p className="font-medium text-gray-800">{user.address || 'No registrada'}</p>
                  </div>
                </div>
              </div>

              <button className="mt-6 w-full py-3 border border-primary-500 text-primary-500 rounded-xl font-medium hover:bg-primary-50 transition-colors">
                Editar mis datos
              </button>
            </div>
          )}
        </div>
      </div>
    </main>
  );
};

export default Profile;
