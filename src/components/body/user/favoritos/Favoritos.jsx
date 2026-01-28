// Favoritos.js
import { useState, useEffect } from 'react';
import { useApi } from '../../../../context/ApiContext';
import API_URL from '../../../../config/api';
import Card from '../../public/home/ListaProductos/Card/Card'; 
import './Favoritos.css';

const Favoritos = () => {
  const { loggedInUser } = useApi();
  const [productos, setProductos] = useState([]);
  const [favoritos, setFavoritos] = useState([]);

  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const response = await fetch(`${API_URL}/api/admin/products`);
        if (response.ok) {
          const data = await response.json();
          setProductos(data);         
        } else {
          console.error('Error fetching product data:', response.status);
        }
      } catch (error) {
        console.error('Error fetching product data:', error);
      }
    };

    fetchProductos();

    const fetchFavoritos = async () => {
      try {
        const response = await fetch(`${API_URL}/api/favorites/${loggedInUser.userId}`);
        if (response.ok) {
          const data = await response.json();
          setFavoritos(data);          
        } else {
          console.error('Error fetching favorites:', response.status);
        }
      } catch (error) {
        console.error('Error fetching favorites:', error);
      }
    };

    fetchFavoritos();
  }, []);

  // Función para buscar el producto por productId
  const buscarProducto = (productId) => {
    return productos.find(producto => producto.id === productId);
  };

  // Función para verificar si un producto está en la lista de favoritos
  const estaEnFavoritos = (productId) => {
    return favoritos.some(favorito => favorito.productId === productId);
  };

  const handleFavoriteClick = async (productId, addToFavorites) => {
    try {
      const url = `http://localhost:8081/api/favorites/${loggedInUser.userId}/${productId}`;
      const method = addToFavorites ? 'POST' : 'DELETE';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        console.error(`Failed to ${addToFavorites ? 'add' : 'remove'} product from favorites`);
        return;
      }

      if (addToFavorites) {
        setFavoritos(prevFavoritos => [...prevFavoritos, { productId }]);
      } else {
        setFavoritos(prevFavoritos => prevFavoritos.filter(favorito => favorito.productId !== productId));
      }
    } catch (error) {
      console.error('Error while updating favorites:', error);
    }
  };

  return (
    <div className='container-principal-favoritos'>      
      <div className="cards-container-favoritos">
        {favoritos.map((favorito, index) => {
          const producto = buscarProducto(favorito.productId);
          if (producto) {
            return (
              <Card
                key={index}
                id={favorito.productId}
                name={producto.name}
                price={producto.price}
                image={`data:image/jpeg;base64,${producto.images[0].imageData}`} 
                isFavorite={true} // Pasa isFavorite como true si el producto está en la lista de favoritos
                onFavoriteClick={handleFavoriteClick}
              />
            );
          } else {
            return null; 
          }
        })}
      </div>
    </div>
  );
};

export default Favoritos;










