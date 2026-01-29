import React from 'react';
import Modal from 'react-modal';
import { BiError } from "react-icons/bi";

import './ErrorConfirmacion.css';

Modal.setAppElement('#root');

const ErrorConfirmacion = ({ isOpen, onRequestClose }) => {
    return (
    <Modal className='containerError'
        isOpen={isOpen}
            onRequestClose={onRequestClose}
            contentLabel="Error Confirmacion"
    >
        <div className='errorConfirmacion'>
            <div className='iconoError'><BiError /></div>
        <p className='mnjError'>
            Lamentablemente, no pudimos completar su reserva en este momento debido a un problema técnico. Por favor, inténtelo de nuevo más tarde. Si el problema persiste, póngase en contacto con nuestro equipo de soporte técnico para obtener ayuda adicional. Disculpe las molestias.
        </p>      
        <button className="buttonError" onClick={onRequestClose}>Cerrar</button>
        </div>
    </Modal>
    );
};

export default ErrorConfirmacion;


