import { Link } from 'react-router-dom';
import { Heart } from 'lucide-react';
import { useApp } from '../context/AppContext';

const ProductCard = ({ product }) => {
  const { toggleFavorite, isFavorite, API_URL } = useApp();
  const favorite = isFavorite(product.id);

  const imageUrl = product.images?.[0]?.url 
    ? `${API_URL}${product.images[0].url}`
    : '/placeholder-instrument.png';

  return (
    <div className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden group">
      <Link to={`/producto/${product.id}`} className="block">
        <div className="relative aspect-square bg-gray-100 overflow-hidden">
          <img
            src={imageUrl}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            onError={(e) => {
              e.target.src = '/placeholder-instrument.png';
            }}
          />
        </div>
      </Link>
      
      <div className="p-4">
        <div className="flex justify-between items-start gap-2">
          <Link to={`/producto/${product.id}`}>
            <h3 className="font-semibold text-gray-800 group-hover:text-primary-500 transition-colors line-clamp-2">
              {product.name}
            </h3>
          </Link>
          <button
            onClick={() => toggleFavorite(product.id)}
            className={`p-2 rounded-full transition-all ${
              favorite
                ? 'bg-red-50 text-red-500'
                : 'bg-gray-100 text-gray-400 hover:bg-red-50 hover:text-red-500'
            }`}
          >
            <Heart size={18} fill={favorite ? 'currentColor' : 'none'} />
          </button>
        </div>
        
        <div className="mt-2 flex items-baseline gap-1">
          <span className="text-xl font-bold text-primary-500">
            ${product.price?.toLocaleString()}
          </span>
          <span className="text-sm text-gray-500">por día</span>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
