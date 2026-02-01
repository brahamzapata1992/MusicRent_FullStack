import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useApp } from '../context/AppContext';
import SearchHero from '../components/SearchHero';
import Categories from '../components/Categories';
import ProductCard from '../components/ProductCard';
import ProductCardSkeleton from '../components/ProductCardSkeleton';

const Home = () => {
  const { products, loading } = useApp();
  const [searchParams] = useSearchParams();
  const [selectedCategory, setSelectedCategory] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 8;

  const searchTerm = searchParams.get('search') || '';
  const categoryParam = searchParams.get('category') || '';

  useEffect(() => {
    if (categoryParam) {
      setSelectedCategory(categoryParam);
    }
  }, [categoryParam]);

  // Filter products - check both category.id and category_id (direct from DB)
  const filteredProducts = products.filter(product => {
    const matchesSearch = !searchTerm || 
      product.name?.toLowerCase().includes(searchTerm.toLowerCase());
    // Support both nested category.id and flat category_id from API
    const productCategoryId = product.category?.id || product.category_id || product.categoryId;
    const matchesCategory = !selectedCategory || 
      productCategoryId?.toString() === selectedCategory.toString();
    return matchesSearch && matchesCategory;
  });

  // Pagination
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
  const startIndex = (currentPage - 1) * productsPerPage;
  const currentProducts = filteredProducts.slice(startIndex, startIndex + productsPerPage);

  const handleCategorySelect = (categoryId) => {
    setSelectedCategory(categoryId === selectedCategory ? '' : categoryId);
    setCurrentPage(1);
  };

  return (
    <main className="min-h-screen bg-white">
      <SearchHero />
      
      <Categories onCategorySelect={handleCategorySelect} />

      {/* Products Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <h2 className="text-xl font-bold text-gray-800 mb-6">
          {selectedCategory ? 'Productos Filtrados' : 'Instrumentos Recomendados'}
        </h2>

        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {[...Array(8)].map((_, i) => (
              <ProductCardSkeleton key={i} />
            ))}
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-gray-500 text-lg">No se encontraron productos</p>
            <button
              onClick={() => setSelectedCategory('')}
              className="mt-4 px-6 py-2 bg-primary-500 text-white rounded-xl hover:bg-primary-600 transition-colors"
            >
              Ver todos los productos
            </button>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
              {currentProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center gap-2 mt-10">
                <button
                  onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="p-2 rounded-lg border border-gray-200 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                >
                  <ChevronLeft size={20} />
                </button>
                
                {[...Array(totalPages)].map((_, i) => (
                  <button
                    key={i + 1}
                    onClick={() => setCurrentPage(i + 1)}
                    className={`w-10 h-10 rounded-lg font-medium transition-colors ${
                      currentPage === i + 1
                        ? 'bg-primary-500 text-white'
                        : 'border border-gray-200 hover:bg-gray-50'
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}
                
                <button
                  onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                  className="p-2 rounded-lg border border-gray-200 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                >
                  <ChevronRight size={20} />
                </button>
              </div>
            )}
          </>
        )}
      </section>
    </main>
  );
};

export default Home;
