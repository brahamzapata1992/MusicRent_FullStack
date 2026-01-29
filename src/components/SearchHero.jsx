import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import { Search, Calendar, ChevronDown } from 'lucide-react';
import { useApp } from '../context/AppContext';
import "react-datepicker/dist/react-datepicker.css";

import fondoHome from '../assets/home/fondo_home.svg';
import mujerHome from '../assets/home/imagen_home_mujer.svg';

const SearchHero = () => {
  const { categories, products } = useApp();
  const navigate = useNavigate();
  
  const [searchTerm, setSearchTerm] = useState('');
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [showResults, setShowResults] = useState(false);

  const filteredProducts = products.filter(product =>
    product.name?.toLowerCase().includes(searchTerm.toLowerCase())
  ).slice(0, 5);

  const handleSearch = () => {
    if (searchTerm || selectedCategory) {
      navigate(`/?search=${searchTerm}&category=${selectedCategory}`);
    }
  };

  const handleProductClick = (productId) => {
    navigate(`/producto/${productId}`);
    setShowResults(false);
    setSearchTerm('');
  };

  return (
    <section
      className="relative mt-20 min-h-[320px] md:min-h-[280px] flex items-center overflow-hidden"
      style={{
        backgroundImage: `url(${fondoHome})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full">
        <div className="max-w-3xl">
          <h1 className="text-2xl md:text-3xl font-bold text-white mb-6">
            Busca el instrumento que deseas rentar al mejor precio
          </h1>

          <div className="bg-white rounded-2xl p-4 shadow-lg">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {/* Search Input */}
              <div className="relative md:col-span-1">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Buscar instrumento..."
                    value={searchTerm}
                    onChange={(e) => {
                      setSearchTerm(e.target.value);
                      setShowResults(e.target.value.length > 0);
                    }}
                    onFocus={() => setShowResults(searchTerm.length > 0)}
                    className="w-full px-4 py-3 pl-10 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                </div>
                
                {showResults && filteredProducts.length > 0 && (
                  <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-lg border border-gray-100 z-20 max-h-60 overflow-y-auto">
                    {filteredProducts.map(product => (
                      <button
                        key={product.id}
                        onClick={() => handleProductClick(product.id)}
                        className="w-full px-4 py-3 text-left hover:bg-gray-50 flex items-center gap-3 border-b border-gray-50 last:border-0"
                      >
                        <span className="text-sm text-gray-700">{product.name}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Start Date */}
              <div className="relative">
                <DatePicker
                  selected={startDate}
                  onChange={setStartDate}
                  selectsStart
                  startDate={startDate}
                  endDate={endDate}
                  minDate={new Date()}
                  placeholderText="Fecha inicio"
                  className="w-full px-4 py-3 pl-10 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  dateFormat="dd/MM/yyyy"
                />
                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={18} />
              </div>

              {/* End Date */}
              <div className="relative">
                <DatePicker
                  selected={endDate}
                  onChange={setEndDate}
                  selectsEnd
                  startDate={startDate}
                  endDate={endDate}
                  minDate={startDate || new Date()}
                  placeholderText="Fecha fin"
                  className="w-full px-4 py-3 pl-10 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  dateFormat="dd/MM/yyyy"
                />
                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={18} />
              </div>

              {/* Category Select */}
              <div className="relative">
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full px-4 py-3 pr-10 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent appearance-none bg-white"
                >
                  <option value="">Categoría</option>
                  {categories.map(cat => (
                    <option key={cat.id} value={cat.id}>{cat.name}</option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={18} />
              </div>
            </div>

            <button
              onClick={handleSearch}
              className="mt-4 w-full md:w-auto px-8 py-3 bg-primary-500 text-white font-semibold rounded-xl hover:bg-primary-600 transition-colors"
            >
              Realizar Búsqueda
            </button>
          </div>
        </div>
      </div>

      {/* Girl Image - Hidden on mobile */}
      <img
        src={mujerHome}
        alt=""
        className="hidden lg:block absolute right-0 bottom-0 h-full max-h-[320px] object-contain pointer-events-none"
      />
    </section>
  );
};

export default SearchHero;
