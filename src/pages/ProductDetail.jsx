import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import { ArrowLeft, Heart, Share2, Star, Calendar, Sparkles, Music, Award, X } from 'lucide-react';
import { useApp } from '../context/AppContext';
import "react-datepicker/dist/react-datepicker.css";

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { products, toggleFavorite, isFavorite, user, API_URL } = useApp();
  
  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [showReservationModal, setShowReservationModal] = useState(false);
  const [reservationData, setReservationData] = useState({
    name: '',
    surname: '',
    email: '',
    address: '',
  });
  const [reservationSuccess, setReservationSuccess] = useState(false);

  useEffect(() => {
    const found = products.find(p => p.id?.toString() === id);
    setProduct(found);
  }, [id, products]);

  const handleReservation = async (e) => {
    e.preventDefault();
    
    if (!user) {
      navigate('/login');
      return;
    }

    // Simulate reservation
    setTimeout(() => {
      setReservationSuccess(true);
    }, 1000);
  };

  if (!product) {
    return (
      <div className="min-h-screen pt-24 flex items-center justify-center">
        <div className="animate-pulse text-gray-500">Cargando producto...</div>
      </div>
    );
  }

  const images = product.images || [];
  const currentImage = images[selectedImage]?.url 
    ? `${API_URL}${images[selectedImage].url}`
    : '/placeholder-instrument.png';

  const favorite = isFavorite(product.id);

  // Mock reviews
  const reviews = [
    { id: 1, name: 'Carlos Rodríguez', rating: 5, comment: 'Excelente instrumento, muy bien cuidado.', date: '15/03/2024' },
    { id: 2, name: 'María García', rating: 4, comment: 'Muy buen servicio y calidad.', date: '10/03/2024' },
    { id: 3, name: 'Juan Pérez', rating: 5, comment: 'Perfecto para mi presentación.', date: '05/03/2024' },
  ];

  const avgRating = reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length;

  return (
    <main className="min-h-screen bg-gray-50 pt-24 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-gray-600 hover:text-primary-500 mb-6 transition-colors"
        >
          <ArrowLeft size={20} />
          Atrás
        </Link>

        <div className="bg-white rounded-3xl shadow-sm overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-6 lg:p-10">
            {/* Images */}
            <div className="space-y-4">
              <div className="aspect-square bg-gray-100 rounded-2xl overflow-hidden">
                <img
                  src={currentImage}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>
              
              {images.length > 1 && (
                <div className="flex gap-2 overflow-x-auto">
                  {images.map((img, i) => (
                    <button
                      key={i}
                      onClick={() => setSelectedImage(i)}
                      className={`w-20 h-20 rounded-xl overflow-hidden flex-shrink-0 border-2 transition-colors ${
                        selectedImage === i ? 'border-primary-500' : 'border-transparent'
                      }`}
                    >
                      <img
                        src={`${API_URL}${img.url}`}
                        alt=""
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Details */}
            <div className="space-y-6">
              <div>
                <h1 className="text-2xl lg:text-3xl font-bold text-gray-800">
                  {product.name}
                </h1>
                
                <div className="flex items-center gap-4 mt-3">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={18}
                        className={i < Math.round(avgRating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}
                      />
                    ))}
                    <span className="ml-2 text-gray-600 text-sm">{reviews.length} opiniones</span>
                  </div>
                  
                  <div className="flex gap-2">
                    <button
                      onClick={() => toggleFavorite(product.id)}
                      className={`p-2 rounded-full transition-colors ${
                        favorite ? 'bg-red-50 text-red-500' : 'bg-gray-100 text-gray-500 hover:bg-red-50 hover:text-red-500'
                      }`}
                    >
                      <Heart size={20} fill={favorite ? 'currentColor' : 'none'} />
                    </button>
                    <button className="p-2 rounded-full bg-gray-100 text-gray-500 hover:bg-primary-50 hover:text-primary-500">
                      <Share2 size={20} />
                    </button>
                  </div>
                </div>
              </div>

              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-bold text-primary-500">
                  ${product.price?.toLocaleString()}
                </span>
                <span className="text-gray-500">por día</span>
              </div>

              <p className="text-gray-600 leading-relaxed">
                {product.description || 'Este instrumento de alta calidad es perfecto para músicos profesionales y aficionados. Incluye todos los accesorios necesarios para su uso inmediato.'}
              </p>

              {/* Date Selection */}
              <div className="space-y-4 pt-4 border-t border-gray-100">
                <h3 className="font-semibold text-gray-800">Selecciona las fechas de tu reserva</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="relative">
                    <DatePicker
                      selected={startDate}
                      onChange={setStartDate}
                      selectsStart
                      startDate={startDate}
                      endDate={endDate}
                      minDate={new Date()}
                      placeholderText="Fecha inicio"
                      className="w-full px-4 py-3 pl-10 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500"
                      dateFormat="dd/MM/yyyy"
                    />
                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={18} />
                  </div>
                  <div className="relative">
                    <DatePicker
                      selected={endDate}
                      onChange={setEndDate}
                      selectsEnd
                      startDate={startDate}
                      endDate={endDate}
                      minDate={startDate || new Date()}
                      placeholderText="Fecha fin"
                      className="w-full px-4 py-3 pl-10 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500"
                      dateFormat="dd/MM/yyyy"
                    />
                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={18} />
                  </div>
                </div>

                <button
                  onClick={() => {
                    if (!user) {
                      navigate('/login');
                    } else {
                      setShowReservationModal(true);
                    }
                  }}
                  disabled={!startDate || !endDate}
                  className="w-full py-4 bg-primary-500 text-white font-semibold rounded-xl hover:bg-primary-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
                >
                  Reservar Ahora
                </button>
              </div>

              <div className="text-sm text-gray-500">
                <p>Revisa las políticas de envío, cancelación y reserva</p>
              </div>
            </div>
          </div>

          {/* Characteristics */}
          <div className="px-6 lg:px-10 py-6 border-t border-gray-100">
            <h3 className="font-semibold text-gray-800 mb-4">Características</h3>
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center gap-2 px-4 py-2 bg-gray-50 rounded-xl">
                <Sparkles size={18} className="text-primary-500" />
                <span className="text-sm text-gray-700">Nuevo</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-gray-50 rounded-xl">
                <Music size={18} className="text-primary-500" />
                <span className="text-sm text-gray-700">{product.category?.name || 'Cuerdas'}</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-gray-50 rounded-xl">
                <Award size={18} className="text-primary-500" />
                <span className="text-sm text-gray-700">Uso profesional</span>
              </div>
            </div>
          </div>

          {/* Reviews */}
          <div className="px-6 lg:px-10 py-6 border-t border-gray-100">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-4">
                <h3 className="font-semibold text-gray-800">Opiniones</h3>
                <div className="flex items-center gap-2">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={16}
                        className={i < Math.round(avgRating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-gray-600">{reviews.length} opiniones</span>
                </div>
              </div>
              <button className="px-4 py-2 border border-gray-200 rounded-xl text-sm font-medium hover:bg-gray-50">
                Comentar
              </button>
            </div>

            <div className="space-y-4">
              {reviews.map(review => (
                <div key={review.id} className="p-4 bg-gray-50 rounded-xl">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium text-gray-800">{review.name}</span>
                    <span className="text-sm text-gray-500">{review.date}</span>
                  </div>
                  <div className="flex gap-1 mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={14}
                        className={i < review.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}
                      />
                    ))}
                  </div>
                  <p className="text-gray-600 text-sm">{review.comment}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Reservation Modal */}
      {showReservationModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl w-full max-w-lg p-6 relative">
            <button
              onClick={() => setShowReservationModal(false)}
              className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full"
            >
              <X size={20} />
            </button>

            {reservationSuccess ? (
              <div className="text-center py-8">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Sparkles size={40} className="text-green-500" />
                </div>
                <h2 className="text-2xl font-bold text-gray-800 mb-2">¡Reserva exitosa!</h2>
                <p className="text-gray-600 mb-6">Gracias por confiar en nosotros.</p>
                <button
                  onClick={() => {
                    setShowReservationModal(false);
                    setReservationSuccess(false);
                    navigate('/');
                  }}
                  className="px-6 py-3 bg-primary-500 text-white rounded-xl hover:bg-primary-600"
                >
                  Volver al inicio
                </button>
              </div>
            ) : (
              <>
                <h2 className="text-xl font-bold text-gray-800 mb-6">Finaliza tu reserva</h2>
                
                <form onSubmit={handleReservation} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Nombre</label>
                      <input
                        type="text"
                        required
                        value={reservationData.name}
                        onChange={(e) => setReservationData({ ...reservationData, name: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Apellido</label>
                      <input
                        type="text"
                        required
                        value={reservationData.surname}
                        onChange={(e) => setReservationData({ ...reservationData, surname: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Correo electrónico</label>
                    <input
                      type="email"
                      required
                      value={reservationData.email}
                      onChange={(e) => setReservationData({ ...reservationData, email: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Dirección</label>
                    <input
                      type="text"
                      required
                      value={reservationData.address}
                      onChange={(e) => setReservationData({ ...reservationData, address: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-4 bg-primary-500 text-white font-semibold rounded-xl hover:bg-primary-600 transition-colors"
                  >
                    Confirmar Reserva
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      )}
    </main>
  );
};

export default ProductDetail;
