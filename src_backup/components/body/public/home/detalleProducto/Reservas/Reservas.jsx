import React, { useState, useEffect } from 'react';

import { useParams } from 'react-router-dom';
import { useApi } from '../../../../../../context/ApiContext';
import API_URL from '../../../../../../config/api';
import Calendario from '../../BuscadorProductos/calendario/Calendario';
import { useNavigate } from 'react-router-dom';
import './Reservas.css';
import Atras from '../../../../../../assets/detalleProducto/Atras.svg';
import ErrorConfirmacionModal from '../errorConfirmacion/ErrorConfirmacion';

const Reservas = () => {
    const { id } = useParams();
    const { fetchProductById, loggedInUser } = useApi();
    const [product, setProduct] = useState();
    const [errorModalVisible, setErrorModalVisible] = useState(false);
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const navigate = useNavigate();
    
    

    const handleDateChange = (start, end) => {        // Maneja las fechas seleccionadas aquí
        
        // También puedes almacenar las fechas en el estado si es necesario
        setStartDate(start);
        setEndDate(end);
    };

    useEffect(() => {
        const getProductDetails = async () => {
            try {
                const productDetails = await fetchProductById(id);
                setProduct(productDetails);
            } catch (error) {
                console.error('Error fetching product details:', error);
            }
        };
        getProductDetails();
    }, [id, fetchProductById]);

    const handleConfirmReservation = async () => {
      try {
          const response = await fetch(`${API_URL}/api/customer/reservation/create`, {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                userId: loggedInUser.userId,  
                productId: product.id,                
                startDate: startDate, 
                endDate: endDate,
                          
              }),
          });
          
  
          if (!response.ok) {
              setErrorModalVisible(true); 
          } else {
              navigate('/confirmacion-reserva');
          }
      } catch (error) {
          console.error('Error creating reservation:', error);
          setErrorModalVisible(true); 
      }
  };

    const handleCloseErrorModal = () => {
        setErrorModalVisible(false); 
    };

    return (
        <div className='reserva-main-container'>
            <div className='encabezado'>
                <h1>¡Falta Poco! Finaliza Tu Reserva</h1>
                <button onClick={() => navigate(-1)}> <img src={Atras} alt="" /></button>
            </div>
            <div className='reserva-body'>
                <div className='reserva-instrument'>
                    <div className='first-container'>
                        <h4>Instrumentos a Reservar</h4>
                        <div className='instrument-detail'>
                            <div className='img-container'>
                                {product && product.images && product.images.length > 0 && (
                                    <img
                                        src={`data:image/jpeg;base64,${product.images[0].imageData}`}
                                        alt={`${product.name}-image-0`}
                                        className="img-1"
                                        style={{ width: '8rem', height: '8rem' }}
                                    />
                                )}
                            </div>
                            <div className='detail-container'>
                                <h4>{product && product.name}</h4>
                                <p className='descripcion-texto'>{product && product.description}</p>
                                <p className='precio-detalle'>
                                    ${product && product.price.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                                    <span className='spam-precio'> por día</span>
                                </p>
                            </div>
                        </div>
                    </div>  
                    <div clayssName='user-detail'>
                        <h4>Usuario Que Reserva</h4>
                        <h5>Nombre:</h5>
                        <p className='descripcion-texto'>{loggedInUser.userName}</p>
                        <h5>Apellido:</h5>
                        <p className='descripcion-texto'>{loggedInUser.lastName}</p>
                        <h5>Email:</h5>
                        <p className='descripcion-texto'>{loggedInUser.email}</p>
                    </div>
                    <div className='direccion'>
                        <label htmlFor="">Direccion</label>
                        <div> <input className='input-reservas' type="text" /></div>
                    </div>
                </div>
                <div className='reserva-detail'>
                    <h4 className='descripcion-texto detalle-reserva'>Detalle De La Reserva</h4>
                    <div className='fechas'>
                        <p className='descripcion-texto' >Fechas</p>
                        <Calendario onDateSelect={handleDateChange} />
                    </div>
                    <div className='reserva-resumen'>
                        <div className='detalles'>
                            <h4 className='descripcion-texto'>Instrumento</h4>
                            <div className='descripcion-precio'>
                                <p className='descripcion-texto descripcion-confirmar'>{product && product.description}</p>
                                ${product && product.price.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                            </div>
                            <div className='envio'>
                                <p className='descripcion-texto'>Envio</p>
                                <p>$0</p>
                            </div>
                        </div>
                    </div>
                    <div className='total'>
                        <h4>Total</h4>
                        <p className='precio-detalle'>
                            ${product && product.price.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                        </p>
                    </div>
                    <button className='boton-reserva-usuario-confirmar-reserva' onClick={handleConfirmReservation}>
                        Confirmar Reserva
                    </button>
                    {errorModalVisible && ( 
                        <ErrorConfirmacionModal onClose={handleCloseErrorModal} /> 
                    )}
                </div>
            </div>
        </div>
    );
};

export default Reservas;
