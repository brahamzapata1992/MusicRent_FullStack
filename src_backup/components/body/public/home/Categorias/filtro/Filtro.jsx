import React, { useEffect, useState } from 'react';
import { useApi } from '../../../../../../context/ApiContext';
import { useParams } from 'react-router-dom';
import Card from '../../ListaProductos/Card/Card';
import BarraCategoria from '../barra_categoria/BarraCategoria';
import './Filtro.css';
import WhatsAppButton from '../../whatsapp/WhatsAppButton';


const Filtro = () => {
  const { fetchProductsByCategory, loading, error } = useApi();
  const { id: categoryId, nombreCategoria } = useParams();
  const [categoryProducts, setCategoryProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [productosPerPage] = useState(10);
  const [loadingInitial, setLoadingInitial] = useState(true);
  const [totalProducts, setTotalProducts] = useState(0);
  
 
  useEffect(() => {
    const fetchData = async () => {
      try {
        const productsByCategory = await fetchProductsByCategory(categoryId);

        if (productsByCategory) {
          const productsArray = Object.values(productsByCategory);
          setCategoryProducts(productsArray);
          setTotalProducts(productsArray.length);
        }
      } catch (error) {
        console.error('Error al obtener productos por categoría:', error);
      } finally {
        setLoadingInitial(false);
      }
    };

    fetchData();
  }, [fetchProductsByCategory, categoryId]);

  const indexOfLastProducto = currentPage * productosPerPage;
  const indexOfFirstProducto = indexOfLastProducto - productosPerPage;
  const currentCategoryProducts = categoryProducts.slice(indexOfFirstProducto, indexOfLastProducto);

  const nextPage = () => {
    if (!loading && currentPage < Math.ceil(categoryProducts.length / productosPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (!loading && currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className='barra-categoria-single'>
      <BarraCategoria nombreCategoria={nombreCategoria}  />
      <h2 className='text-filtro-title'>Productos encontrados: {totalProducts}</h2>
      <div className='filtro-container-categoria'>
        <div className="recomendados"></div>
        <div className="productos-container">
          <div className="grid-container-filtro">
            {loadingInitial ? (
              <p>Cargando productos...</p>
            ) : (
              currentCategoryProducts.map((producto, index) => (
                <Card
                  key={`${producto.id}-${index}`}
                  name={producto.name}
                  image={`data:image/jpeg;base64,${producto.images[0].imageData}`}
                  price={producto.price}
                />
              ))
            )}
          </div>
        </div>
        <div className="container-pagination">
          <div className="pagination">
            <button onClick={prevPage} disabled={loading || currentPage === 1}>Prev</button>
            <button onClick={nextPage} disabled={loading || currentPage === Math.ceil(categoryProducts.length / productosPerPage)}>Next</button>
          </div>
        </div>
      </div>
      <WhatsAppButton />
    </div>
  );
};

export default Filtro;

