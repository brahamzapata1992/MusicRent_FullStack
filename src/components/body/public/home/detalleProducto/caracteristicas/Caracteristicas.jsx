import React, { useState, useEffect } from 'react';
import API_URL from '../../../../../../config/api';
import './Caracteristicas.css';

const Caracteristicas = () => {
  const [caracteristicas, setCaracteristicas] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCaracteristicas = async () => {
      try {
        const response = await fetch('http://localhost:8081/api/admin/features/list');
        if (response.ok) {
          const data = await response.json();
          setCaracteristicas(data);
        } else {
          setError('Error fetching characteristic data');
        }
      } catch (error) {
        setError('Error fetching characteristic data');
      }
    };

    fetchCaracteristicas();
  }, []);

  // Función para obtener un número aleatorio entre min y max
  const getRandomNumber = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  // Función para obtener un arreglo aleatorio de características
  const getRandomCaracteristicas = () => {
    const minCaracteristicas = 2;
    const maxCaracteristicas = 4;
    const cantidad = getRandomNumber(minCaracteristicas, maxCaracteristicas);
    const shuffledCaracteristicas = [...caracteristicas].sort(() => 0.5 - Math.random());
    return shuffledCaracteristicas.slice(0, cantidad);
  };

  // Lógica para obtener las características aleatorias y renderizarlas
  let caracteristicasAleatorias = [];
  if (caracteristicas.length > 0) {
    caracteristicasAleatorias = getRandomCaracteristicas();
  }

  return (
    <div className="caracteristicas-container-detalle-producto">
      <h2 className='titulo-caracteristicas-detalle'>Características</h2>
      <div className='iconos-caracteristicas-detalle-producto'>      
        {error && <div>Error: {error}</div>}
        {caracteristicasAleatorias.map(caracteristica => (
          <div key={caracteristica.id} className="caracteristica-detalle-producto">
            <img className='imagenes-iconos-caracteristicas-detalleproducto' src={`data:image/svg+xml;base64,${caracteristica.img}`} alt={`Imagen de la característica ${caracteristica.name}`} />
            <h5>{caracteristica.name}</h5>         
          </div>
        ))}
      </div>
    </div>
  );
};

export default Caracteristicas;


