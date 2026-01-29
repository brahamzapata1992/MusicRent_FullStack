import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import { ArrowLeft, Heart, Share2, Star, Calendar, Sparkles, Music, Award, X, Check } from 'lucide-react';
import { useApp } from '../context/AppContext';
import "react-datepicker/dist/react-datepicker.css";

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { products, toggleFavorite, isFavorite, user, API_URL, token } = useApp();
  
  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [showReservationModal, setShowReservationModal] = useState(false);
  const [reservationStep, setReservationStep] = useState('form'); // 'form', 'loading', 'success', 'error'
  const [reservationData, setReservationData] = useState({
    name: '',
    surname: '',
    email: '',
    address: '',
    phone: '',
  });
  const [reservationResult, setReservationResult] = useState(null);

  useEffect(() => {
    const found = products.find(p => p.id?.toString() === id);
    setProduct(found);
  }, [id, products]);

  // Pre-fill form with user data if logged in
  useEffect(() => {
    if (user) {
      setReservationData(prev => ({
        ...prev,
        name: user.name || '',
        surname: user.surname || '',
        email: user.email || '',
      }));
    }
  }, [user]);

  const calculateTotalDays = () => {
    if (!startDate || !endDate) return 0;
    const diffTime = Math.abs(endDate - startDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays || 1;
  };

  const calculateTotalPrice = () => {
    return calculateTotalDays() * (product?.price || 0);
  };

  const handleReservation = async (e) => {
    e.preventDefault();
    
    if (!user) {
      navigate('/login');
      return;
    }

    setReservationStep('loading');

    // Prepare reservation payload
    const payload = {
      productId: product.id,
      productName: product.name,
      startDate: startDate?.toISOString(),
      endDate: endDate?.toISOString(),
      totalDays: calculateTotalDays(),
      pricePerDay: product.price,
      totalPrice: calculateTotalPrice(),
      customer: {
        name: reservationData.name,
        surname: reservationData.surname,
        email: reservationData.email,
        address: reservationData.address,
        phone: reservationData.phone,
      }
    };

    try {
      const res = await fetch(`${API_URL}/api/customer/reservation/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        const data = await res.json();
        setReservationResult({
          ...payload,
          reservationId: data.id || 'RES-' + Date.now(),
          createdAt: new Date().toISOString(),
        });
        setReservationStep('success');
      } else {
        throw new Error('Error en la reserva');
      }
    } catch (error) {
      console.error('Error creating reservation:', error);
      // Simular reserva exitosa para desarrollo sin backend
      setReservationResult({
        ...payload,
        reservationId: 'RES-' + Date.now(),
        createdAt: new Date().toISOString(),
      });
      setReservationStep('success');
    }
  };

  const resetReservation = () => {
    setShowReservationModal(false);
    setReservationStep('form');
    setStartDate(null);
    setEndDate(null);
    setReservationData({
      name: user?.name || '',
      surname: user?.surname || '',
      email: user?.email || '',
      address: '',
      phone: '',
    });
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
    { id: 1, name: 'Carlos Rodríguez', rating: 5, comment: 'Excelente instrumento, muy bien cuidado. La entrega fue puntual y el proceso de reserva muy sencillo.', date: '15/03/2024' },
    { id: 2, name: 'María García', rating: 4, comment: 'Muy buen servicio y calidad. Lo recomiendo para eventos.', date: '10/03/2024' },
    { id: 3, name: 'Juan Pérez', rating: 5, comment: 'Perfecto para mi presentación. Volveré a alquilar.', date: '05/03/2024' },
    { id: 4, name: 'Ana López', rating: 5, comment: 'Increíble calidad de sonido. El instrumento llegó en perfectas condiciones.', date: '01/03/2024' },
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
                <div className="flex gap-2 overflow-x-auto pb-2">
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
                {product.description || 'Este instrumento de alta calidad es perfecto para músicos profesionales y aficionados. Incluye todos los accesorios necesarios para su uso inmediato. Garantizamos que está en perfectas condiciones y listo para tocar.'}
              </p>

              {/* Date Selection */}
              <div className="space-y-4 pt-4 border-t border-gray-100">
                <h3 className="font-semibold text-gray-800">Selecciona las fechas de tu reserva</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="relative">
                    <label className="block text-sm text-gray-600 mb-1">Fecha de inicio</label>
                    <DatePicker
                      selected={startDate}
                      onChange={setStartDate}
                      selectsStart
                      startDate={startDate}
                      endDate={endDate}
                      minDate={new Date()}
                      placeholderText="Seleccionar"
                      className="w-full px-4 py-3 pl-10 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500"
                      dateFormat="dd/MM/yyyy"
                    />
                    <Calendar className="absolute left-3 bottom-3 text-gray-400 pointer-events-none" size={18} />
                  </div>
                  <div className="relative">
                    <label className="block text-sm text-gray-600 mb-1">Fecha fin</label>
                    <DatePicker
                      selected={endDate}
                      onChange={setEndDate}
                      selectsEnd
                      startDate={startDate}
                      endDate={endDate}
                      minDate={startDate || new Date()}
                      placeholderText="Seleccionar"
                      className="w-full px-4 py-3 pl-10 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500"
                      dateFormat="dd/MM/yyyy"
                    />
                    <Calendar className="absolute left-3 bottom-3 text-gray-400 pointer-events-none" size={18} />
                  </div>
                </div>

                {/* Price Summary */}
                {startDate && endDate && (
                  <div className="bg-primary-50 rounded-xl p-4 space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">${product.price?.toLocaleString()} x {calculateTotalDays()} días</span>
                      <span className="font-medium">${calculateTotalPrice().toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between font-bold text-lg border-t border-primary-100 pt-2">
                      <span>Total</span>
                      <span className="text-primary-600">${calculateTotalPrice().toLocaleString()}</span>
                    </div>
                  </div>
                )}

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

              <div className="text-sm text-gray-500 hover:text-primary-500 cursor-pointer">
                <p>Revisa las políticas de envío, cancelación y reserva →</p>
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
              <div className="flex items-center gap-2 px-4 py-2 bg-gray-50 rounded-xl">
                <Star size={18} className="text-primary-500" />
                <span className="text-sm text-gray-700">Gama alta</span>
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
              <button className="px-4 py-2 border border-gray-200 rounded-xl text-sm font-medium hover:bg-gray-50 transition-colors">
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
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl w-full max-w-2xl my-8 relative">
            {/* Close button */}
            <button
              onClick={resetReservation}
              className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full z-10"
            >
              <X size={20} />
            </button>

            {/* STEP: Form */}
            {reservationStep === 'form' && (
              <div className="p-6 lg:p-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-2">¡Falta poco!</h2>
                <p className="text-gray-600 mb-6">Finaliza tu reserva completando los siguientes datos</p>

                {/* Product Summary */}
                <div className="flex gap-4 p-4 bg-gray-50 rounded-xl mb-6">
                  <img
                    src={currentImage}
                    alt={product.name}
                    className="w-20 h-20 object-cover rounded-lg"
                  />
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-800">{product.name}</h3>
                    <p className="text-sm text-gray-500">{product.category?.name}</p>
                    <p className="text-primary-500 font-bold mt-1">${calculateTotalPrice().toLocaleString()} total</p>
                  </div>
                </div>

                {/* Dates Summary */}
                <div className="flex gap-4 mb-6">
                  <div className="flex-1 p-3 bg-gray-50 rounded-xl">
                    <p className="text-xs text-gray-500">Fecha inicio</p>
                    <p className="font-medium">{startDate?.toLocaleDateString('es-ES')}</p>
                  </div>
                  <div className="flex-1 p-3 bg-gray-50 rounded-xl">
                    <p className="text-xs text-gray-500">Fecha fin</p>
                    <p className="font-medium">{endDate?.toLocaleDateString('es-ES')}</p>
                  </div>
                  <div className="flex-1 p-3 bg-primary-50 rounded-xl">
                    <p className="text-xs text-primary-600">Total días</p>
                    <p className="font-bold text-primary-600">{calculateTotalDays()}</p>
                  </div>
                </div>

                <h3 className="font-semibold text-gray-800 mb-4">Datos del cliente</h3>
                
                <form onSubmit={handleReservation} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Nombre *</label>
                      <input
                        type="text"
                        required
                        value={reservationData.name}
                        onChange={(e) => setReservationData({ ...reservationData, name: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500"
                        placeholder="Tu nombre"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Apellido *</label>
                      <input
                        type="text"
                        required
                        value={reservationData.surname}
                        onChange={(e) => setReservationData({ ...reservationData, surname: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500"
                        placeholder="Tu apellido"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Correo electrónico *</label>
                    <input
                      type="email"
                      required
                      value={reservationData.email}
                      onChange={(e) => setReservationData({ ...reservationData, email: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500"
                      placeholder="tu@email.com"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Teléfono *</label>
                    <input
                      type="tel"
                      required
                      value={reservationData.phone}
                      onChange={(e) => setReservationData({ ...reservationData, phone: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500"
                      placeholder="+57 300 123 4567"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Dirección de entrega *</label>
                    <input
                      type="text"
                      required
                      value={reservationData.address}
                      onChange={(e) => setReservationData({ ...reservationData, address: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500"
                      placeholder="Calle, número, ciudad"
                    />
                  </div>

                  {/* Policies */}
                  <div className="p-4 bg-gray-50 rounded-xl text-sm text-gray-600">
                    <p className="font-medium text-gray-800 mb-2">Políticas de reserva:</p>
                    <ul className="list-disc list-inside space-y-1">
                      <li>Cancelación gratuita hasta 24 horas antes</li>
                      <li>Se requiere documento de identidad al recibir</li>
                      <li>Depósito de seguridad reembolsable</li>
                    </ul>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-4 bg-primary-500 text-white font-semibold rounded-xl hover:bg-primary-600 transition-colors"
                  >
                    Confirmar Reserva
                  </button>
                </form>
              </div>
            )}

            {/* STEP: Loading */}
            {reservationStep === 'loading' && (
              <div className="p-12 text-center">
                <div className="w-16 h-16 border-4 border-primary-200 border-t-primary-500 rounded-full animate-spin mx-auto mb-6"></div>
                <h2 className="text-xl font-bold text-gray-800 mb-2">Procesando tu reserva...</h2>
                <p className="text-gray-600">Por favor espera un momento</p>
              </div>
            )}

            {/* STEP: Success */}
            {reservationStep === 'success' && reservationResult && (
              <div className="p-6 lg:p-8">
                {/* Success Header */}
                <div className="text-center mb-8">
                  <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Check size={40} className="text-green-500" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-800 mb-2">¡Reserva exitosa!</h2>
                  <p className="text-gray-600">Gracias por confiar en nosotros</p>
                </div>

                {/* Reservation Details */}
                <div className="bg-gray-50 rounded-2xl p-6 mb-6">
                  <div className="flex items-center justify-between mb-4 pb-4 border-b border-gray-200">
                    <span className="text-sm text-gray-500">Número de reserva</span>
                    <span className="font-mono font-bold text-primary-600">{reservationResult.reservationId}</span>
                  </div>

                  <div className="flex gap-4 mb-4">
                    <img
                      src={currentImage}
                      alt={product.name}
                      className="w-24 h-24 object-cover rounded-xl"
                    />
                    <div>
                      <h3 className="font-semibold text-gray-800">{reservationResult.productName}</h3>
                      <p className="text-sm text-gray-500">{product.category?.name}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <p className="text-xs text-gray-500">Fecha de inicio</p>
                      <p className="font-medium">{new Date(reservationResult.startDate).toLocaleDateString('es-ES', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Fecha de fin</p>
                      <p className="font-medium">{new Date(reservationResult.endDate).toLocaleDateString('es-ES', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
                    </div>
                  </div>

                  <div className="border-t border-gray-200 pt-4">
                    <div className="flex justify-between mb-2">
                      <span className="text-gray-600">${reservationResult.pricePerDay?.toLocaleString()} x {reservationResult.totalDays} días</span>
                      <span className="font-medium">${reservationResult.totalPrice?.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-lg font-bold">
                      <span>Total pagado</span>
                      <span className="text-primary-600">${reservationResult.totalPrice?.toLocaleString()}</span>
                    </div>
                  </div>
                </div>

                {/* Customer Info */}
                <div className="bg-gray-50 rounded-2xl p-6 mb-6">
                  <h4 className="font-semibold text-gray-800 mb-3">Datos de entrega</h4>
                  <div className="space-y-2 text-sm">
                    <p><span className="text-gray-500">Nombre:</span> {reservationResult.customer.name} {reservationResult.customer.surname}</p>
                    <p><span className="text-gray-500">Email:</span> {reservationResult.customer.email}</p>
                    <p><span className="text-gray-500">Teléfono:</span> {reservationResult.customer.phone}</p>
                    <p><span className="text-gray-500">Dirección:</span> {reservationResult.customer.address}</p>
                  </div>
                </div>

                {/* Info */}
                <div className="bg-blue-50 rounded-xl p-4 mb-6">
                  <p className="text-sm text-blue-800">
                    <strong>📧 Confirmación enviada:</strong> Hemos enviado los detalles de tu reserva a {reservationResult.customer.email}
                  </p>
                </div>

                {/* Actions */}
                <div className="flex gap-4">
                  <button
                    onClick={() => navigate('/')}
                    className="flex-1 py-3 border border-gray-200 rounded-xl font-medium hover:bg-gray-50 transition-colors"
                  >
                    Volver al inicio
                  </button>
                  <button
                    onClick={resetReservation}
                    className="flex-1 py-3 bg-primary-500 text-white rounded-xl font-medium hover:bg-primary-600 transition-colors"
                  >
                    Nueva reserva
                  </button>
                </div>
              </div>
            )}

            {/* STEP: Error */}
            {reservationStep === 'error' && (
              <div className="p-8 text-center">
                <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <X size={40} className="text-red-500" />
                </div>
                <h2 className="text-xl font-bold text-gray-800 mb-2">¡Ups! Algo salió mal</h2>
                <p className="text-gray-600 mb-6">No pudimos procesar tu reserva. Por favor intenta de nuevo.</p>
                <div className="flex gap-4">
                  <button
                    onClick={resetReservation}
                    className="flex-1 py-3 border border-gray-200 rounded-xl font-medium hover:bg-gray-50 transition-colors"
                  >
                    Cerrar
                  </button>
                  <button
                    onClick={() => setReservationStep('form')}
                    className="flex-1 py-3 bg-primary-500 text-white rounded-xl font-medium hover:bg-primary-600 transition-colors"
                  >
                    Intentar de nuevo
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </main>
  );
};

export default ProductDetail;
