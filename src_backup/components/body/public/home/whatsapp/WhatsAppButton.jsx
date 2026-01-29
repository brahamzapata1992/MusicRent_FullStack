import React, { useState } from 'react';
import './WhatsAppButton.css';
import { FaWhatsapp } from 'react-icons/fa';
import Modal from 'react-modal';

const WhatsAppButton = () => {
  const phoneNumber = '+573196617172';
  const message = encodeURIComponent('Hola MusicRent, me gustaria conocer mas sobre tus productos !');
  const whatsappLink = `https://wa.me/${phoneNumber}?text=${message}`;

  const [showSuccessNotification, setShowSuccessNotification] = useState(false);

  const handleWhatsAppClick = () => {
    try {
      window.open(whatsappLink, '_blank', 'noopener noreferrer');
      setShowSuccessNotification(true);
    } catch (error) {
      console.error('Error sending WhatsApp message:', error);
    }
  };

  return (
    <div className="container-boton">
      <button onClick={handleWhatsAppClick} className="botonWhatsApp">
        <FaWhatsapp />
      </button>
      <Modal isOpen={showSuccessNotification} className="whatsapp-modal" onRequestClose={() => setShowSuccessNotification(false)}>
        <div className='whatsapp-modal-container'>
        <h2 className='whatsapp-modal-h2'>Mensaje enviado correctamente</h2>
        <p className='whatsapp-modal-p'>¡Tu mensaje ha sido enviado con éxito!</p>
        <div className='whatsapp-modal-cerrar'>
        <button className='whatsapp-modal-boton'onClick={() => setShowSuccessNotification(false)}>Cerrar</button>
        </div>
        </div>
      </Modal>
    </div>
  );
};

export default WhatsAppButton;