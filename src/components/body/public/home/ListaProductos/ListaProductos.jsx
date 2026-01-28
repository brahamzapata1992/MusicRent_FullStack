import React, { useState, useEffect } from 'react';
import './ListaProductos.css';
import Card from './Card/Card';
import CardSkeleton from './Card/CardSkeleton';
import API_URL from '../../../../config/api';

const ListaProductos = ({ selectedCategories }) => {
    const [productos, setProductos] = useState([]);
    const [filteredProductos, setFilteredProductos] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [productosPerPage] = useState(10);

    useEffect(() => {
        const fetchProductos = async () => {
            try {
                const response = await fetch(`${API_URL}/api/admin/products`);
                if (response.ok) {
                    const data = await response.json();
                    // Mezclar aleatoriamente los productos antes de establecerlos
                    const randomizedProductos = data.sort(() => Math.random() - 0.5);
                    setProductos(randomizedProductos);
                    setLoading(false);
                } else {
                    setError('Error fetching product data');
                    setLoading(false);
                }
            } catch (error) {
                setError('Error fetching product data');
                setLoading(false);
            }
        };

        fetchProductos();
    }, []);

    useEffect(() => {
        // Filtrar productos basados en las categorías seleccionadas
        if (selectedCategories && selectedCategories.length > 0) {
            const filtered = productos.filter(producto =>
                selectedCategories.includes(producto.categoryName)
            );
            setFilteredProductos(filtered);
        } else {
            // Si no hay categorías seleccionadas, mostrar todos los productos
            setFilteredProductos(productos);
        }
    }, [selectedCategories, productos]);

    const indexOfLastProducto = currentPage * productosPerPage;
    const indexOfFirstProducto = indexOfLastProducto - productosPerPage;
    const currentProductos = filteredProductos.slice(indexOfFirstProducto, indexOfLastProducto);

    const nextPage = () => {
        if (currentPage < Math.ceil(filteredProductos.length / productosPerPage)) {
            setCurrentPage(currentPage + 1);
        }
    };

    const prevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };
    

    return (
        <div className='container-listado-cards'>
            {loading ? (
                <p>Loading...</p>
            ) : error ? (
                <p>{error}</p>
            ) : (
                <div>
                    <div className="grid-container-listaProductos">
                        {currentProductos.map((producto, index) => (
                            <Card
                                key={index}
                                id={producto.id} 
                                name={producto.name}
                                image={`data:image/jpeg;base64,${producto.images[0].imageData}`} 
                                price={producto.price}
                            />
                        ))}
                    </div>
                    <div className="pagination">
                        <button onClick={prevPage} disabled={currentPage === 1}>Prev</button>
                        <button onClick={nextPage} disabled={currentPage === Math.ceil(filteredProductos.length / productosPerPage)}>Next</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ListaProductos;  
