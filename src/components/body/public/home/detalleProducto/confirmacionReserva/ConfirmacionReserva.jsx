import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import API_URL from '../../../../../../config/api';
import imgConfirmacion from '../../../../../../assets/reserva/confirmacion-reserva.svg';
import WhatsAppButton from '../../whatsapp/WhatsAppButton'
import { useApi } from '../../../../../../context/ApiContext';
import './ConfirmacionReserva.css';

const ConfirmacionReserva = () => {
    const [reservaData, setReservaData] = useState(null);
    const [productName, setProductName] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [price, setPrice] = useState(0);
    const { fetchProductById, loggedInUser } = useApi();

    useEffect(() => {
        const fetchReservaData = async () => {
            try {
                const response = await fetch(`http://localhost:8081/api/customer/reservation/history/${loggedInUser.userId}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch reservation data');
                }
                const data = await response.json();
                setReservaData(data);

                // Fetch product details using productId
                if (data && data.length > 0) {
                    const productId = data[0].productId; // Assuming productId is from the first reservation entry
                    const productResponse = await fetch(`http://localhost:8081/api/admin/products/${productId}`);
                    if (!productResponse.ok) {
                        throw new Error('Failed to fetch product data');
                    }
                    const productData = await productResponse.json();
                    setProductName(productData.name);
                    setPrice(productData.price);
                }
            } catch (error) {
                console.error('Error fetching reservation data:', error);
            }
        };

        fetchReservaData();
    }, [loggedInUser.userId]);

    useEffect(() => {
        if (reservaData && reservaData.length > 0) {
            setStartDate(reservaData[0].startDate);
            setEndDate(reservaData[0].endDate);
        }
    }, [reservaData]);

    return (
        <div className='container-confirmacion-reserva'>
            <div className='container-fin-reserva-izquierda'>
                <img className='imagen-confimacion' src={imgConfirmacion} alt="" />
            </div>
            <div className='container-fin-reserva-derecha'>
                <div className='container-boton-fin-reservacion'>
                    <Link to={"/home"}><button className='boton-fin-reservacion'>Inicio</button></Link>
                </div>
                <div className='container-titulo-fin-presentacion'>
                    ¡Su reserva se ha realizado con éxito!
                </div>
                <div className='container-parrafo-fin-presentacion'>
                    <p>
                        Gracias por confiar en nosotros. 
                    </p>
                    <p className='texto-fin-reserva'>
                        A continuación, encontrará los detalles de su reserva: 
                    </p>
                    <ul className='listado-reserva-fin'>
                        <li className='listado-reserva-fin-li'>
                            <p listado-reserva-fin-li>Fechas: {startDate} - {endDate}</p>
                            <p className='precio-fin-reservacion'><span className='spam-precio-fin-reserva'>Precio: </span> {price.toLocaleString('es-AR', { style: 'currency', currency: 'ARS' })}</p>
                            <p className='nombre-fin-reservacion-nombre'>Nombre del producto: {productName}</p>
                        </li>
                    </ul>
                </div>
                <div className='icono-whatsapp-fin-reserva' >
                    <WhatsAppButton />
                </div>
                
            </div>
        </div>
    );
};

export default ConfirmacionReserva;
