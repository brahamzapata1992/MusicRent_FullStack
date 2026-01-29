import { useApp } from '../context/AppContext';

import percusionImg from '../assets/categorias/imagen_hombre_percusion.svg';
import vientosImg from '../assets/categorias/imagen_hombre_vientos.svg';
import cuerdasImg from '../assets/categorias/imagen_hombre_cuerdas.svg';

const categoryImages = {
  'percusion': percusionImg,
  'vientos': vientosImg,
  'cuerdas': cuerdasImg,
};

const Categories = ({ onCategorySelect }) => {
  const { categories } = useApp();

  const getCategoryImage = (category) => {
    const name = category.name?.toLowerCase() || '';
    if (name.includes('percus')) return percusionImg;
    if (name.includes('viento')) return vientosImg;
    if (name.includes('cuerda')) return cuerdasImg;
    return cuerdasImg;
  };

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <h2 className="text-xl font-bold text-gray-800 mb-6">Categorías</h2>
      
      <div className="flex flex-wrap justify-center gap-4">
        {categories.map(category => (
          <button
            key={category.id}
            onClick={() => onCategorySelect(category.id)}
            className="group flex flex-col items-center justify-center w-32 h-28 md:w-40 md:h-32 bg-gray-50 rounded-2xl hover:bg-primary-50 transition-all duration-300 shadow-sm hover:shadow-md"
          >
            <img
              src={getCategoryImage(category)}
              alt={category.name}
              className="w-12 h-12 md:w-14 md:h-14 object-contain mb-2 group-hover:scale-110 transition-transform"
            />
            <span className="text-sm font-medium text-gray-700 group-hover:text-primary-600">
              {category.name}
            </span>
          </button>
        ))}
      </div>
    </section>
  );
};

export default Categories;
