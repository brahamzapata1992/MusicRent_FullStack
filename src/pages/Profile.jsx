import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { User, Mail, Phone, MapPin, Calendar, Package, LogOut, Heart, ChevronRight, X, Star } from 'lucide-react';
import { useApp } from '../context/AppContext';

const Profile = () => {
  const { user, logout, favorites, products, fetchReservationHistory } = useApp();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('reservas');
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedReservation, setSelectedReservation] = useState(null);

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  useEffect(() => {
    loadReservations();
  }, [user]);

  const loadReservations = async () => {
    if (!user?.userId) return;
    setLoading(true);
    const data = await fetchReservationHistory();
    setReservations(data);
    setLoading(false);
  };

  const favoriteProducts = products.filter(p => favorites.includes(p.id));

  const getStatusBadge = (status) => {
    const styles = {
      active: 'bg-green-100 text-green-700',
      completed: 'bg-blue-100 text-blue-700',
      cancelled: 'bg-red-100 text-red-700',
      pending: 'bg-yellow-100 text-yellow-700',
    };
    const labels = {
      active: 'En curso',
      completed: 'Completada',
      cancelled: 'Cancelada',
      pending: 'Pendiente',
    };
    return (
      <span className={`px-3 py-1 rounded-full text-xs font-medium ${styles[status] || styles.pending}`}>
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
        <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
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
                    <div 
                      key={reservation.id} 
                      onClick={() => setSelectedReservation(reservation)}
                      className="flex flex-col sm:flex-row gap-4 p-4 bg-gray-50 rounded-xl cursor-pointer hover:bg-gray-100 transition-colors"
                    >
                      <img
                        src={reservation.productImage}
                        alt={reservation.productName}
                        className="w-full sm:w-24 h-32 sm:h-24 object-cover rounded-lg bg-gray-200"
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
                          📅 {new Date(reservation.startDate).toLocaleDateString('es-ES')} - {new Date(reservation.endDate).toLocaleDateString('es-ES')}
                        </p>
                        <div className="flex items-center justify-between">
                          <p className="font-bold text-primary-500">${reservation.totalPrice?.toLocaleString()}</p>
                          <ChevronRight size={20} className="text-gray-400" />
                        </div>
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
                  {favoriteProducts.map(product => {
                    // Handle base64 imageData format (same as ProductCard)
                    const getImageSrc = () => {
                      if (product.images && product.images[0] && product.images[0].imageData) {
                        return `data:image/jpeg;base64,${product.images[0].imageData}`;
                      }
                      return '/placeholder-instrument.png';
                    };
                    
                    return (
                      <Link
                        key={product.id}
                        to={`/producto/${product.id}`}
                        className="flex gap-4 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
                      >
                        <img
                          src={getImageSrc()}
                          alt={product.name}
                          className="w-20 h-20 object-cover rounded-lg bg-gray-200"
                          onError={(e) => {
                            e.target.src = '/placeholder-instrument.png';
                          }}
                        />
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-800 line-clamp-2">{product.name}</h3>
                          <div className="flex items-center gap-1 mt-1">
                            <Star size={14} className="text-yellow-400 fill-yellow-400" />
                            <span className="text-sm text-gray-500">4.5</span>
                          </div>
                          <p className="text-primary-500 font-bold mt-1">${product.price?.toLocaleString()}/día</p>
                        </div>
                      </Link>
                    );
                  })}
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

      {/* Reservation Detail Modal */}
      {selectedReservation && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl w-full max-w-2xl my-8 relative">
            <button
              onClick={() => setSelectedReservation(null)}
              className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full z-10"
            >
              <X size={20} />
            </button>

            <div className="p-6 lg:p-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-800">Detalle de Reserva</h2>
                {getStatusBadge(selectedReservation.status)}
              </div>

              {/* Product Info */}
              <div className="flex gap-4 p-4 bg-gray-50 rounded-xl mb-6">
                <img
                  src={selectedReservation.productImage}
                  alt={selectedReservation.productName}
                  className="w-24 h-24 object-cover rounded-lg bg-gray-200"
                />
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-800">{selectedReservation.productName}</h3>
                  <p className="text-sm text-gray-500 mt-1">ID de reserva: {selectedReservation.id}</p>
                  <p className="text-sm text-gray-500">
                    Reservado el: {new Date(selectedReservation.createdAt).toLocaleDateString('es-ES', { 
                      year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' 
                    })}
                  </p>
                </div>
              </div>

              {/* Dates */}
              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="p-4 bg-gray-50 rounded-xl text-center">
                  <p className="text-xs text-gray-500 mb-1">Fecha inicio</p>
                  <p className="font-semibold">{new Date(selectedReservation.startDate).toLocaleDateString('es-ES')}</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-xl text-center">
                  <p className="text-xs text-gray-500 mb-1">Fecha fin</p>
                  <p className="font-semibold">{new Date(selectedReservation.endDate).toLocaleDateString('es-ES')}</p>
                </div>
                <div className="p-4 bg-primary-50 rounded-xl text-center">
                  <p className="text-xs text-primary-600 mb-1">Total días</p>
                  <p className="font-bold text-primary-600">{selectedReservation.totalDays}</p>
                </div>
              </div>

              {/* Price Breakdown */}
              <div className="border-t border-gray-100 pt-4 mb-6">
                <h4 className="font-semibold text-gray-800 mb-3">Resumen de pago</h4>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Precio por día</span>
                    <span>${selectedReservation.pricePerDay?.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Días de alquiler</span>
                    <span>{selectedReservation.totalDays} días</span>
                  </div>
                  <div className="flex justify-between font-bold text-lg pt-2 border-t border-gray-100">
                    <span>Total</span>
                    <span className="text-primary-500">${selectedReservation.totalPrice?.toLocaleString()}</span>
                  </div>
                </div>
              </div>

              {/* Customer Info */}
              <div className="border-t border-gray-100 pt-4 mb-6">
                <h4 className="font-semibold text-gray-800 mb-3">Datos de entrega</h4>
                <div className="space-y-2 text-sm">
                  <p className="flex items-center gap-2">
                    <User size={16} className="text-gray-400" />
                    <span className="text-gray-600">Nombre:</span>
                    <span className="font-medium">{selectedReservation.customer.name} {selectedReservation.customer.surname}</span>
                  </p>
                  <p className="flex items-center gap-2">
                    <Mail size={16} className="text-gray-400" />
                    <span className="text-gray-600">Email:</span>
                    <span className="font-medium">{selectedReservation.customer.email}</span>
                  </p>
                  <p className="flex items-center gap-2">
                    <Phone size={16} className="text-gray-400" />
                    <span className="text-gray-600">Teléfono:</span>
                    <span className="font-medium">{selectedReservation.customer.phone}</span>
                  </p>
                  <p className="flex items-center gap-2">
                    <MapPin size={16} className="text-gray-400" />
                    <span className="text-gray-600">Dirección:</span>
                    <span className="font-medium">{selectedReservation.customer.address}</span>
                  </p>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-4">
                <button
                  onClick={() => setSelectedReservation(null)}
                  className="flex-1 py-3 border border-gray-200 rounded-xl font-medium hover:bg-gray-50 transition-colors"
                >
                  Cerrar
                </button>
                {selectedReservation.status === 'pending' && (
                  <button className="flex-1 py-3 bg-red-500 text-white rounded-xl font-medium hover:bg-red-600 transition-colors">
                    Cancelar reserva
                  </button>
                )}
                {selectedReservation.status === 'completed' && (
                  <Link
                    to={`/producto/${selectedReservation.productId}`}
                    className="flex-1 py-3 bg-primary-500 text-white rounded-xl font-medium hover:bg-primary-600 transition-colors text-center"
                  >
                    Reservar de nuevo
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
};

export default Profile;
