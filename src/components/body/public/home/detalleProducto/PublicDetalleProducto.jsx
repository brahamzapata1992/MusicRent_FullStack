import React, { useEffect, useState } from 'react';
import Modal from 'react-modal'; 
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useApi } from '../../../../../context/ApiContext';
import { IoChevronBack } from "react-icons/io5";
import { FaStar } from "react-icons/fa";
import { IoShareSocialOutline } from "react-icons/io5";
import { GoChecklist } from "react-icons/go";
import { TbPhotoShare } from "react-icons/tb";
import alert from '../../../../../assets/detalleProducto/alert.svg'
import GaleriaImagenes from './GaleriaImagenes/GaleriaImagenes'
import PoliticasProducto from './politicasProducto/PoliticasProducto'
import RedesProducto from './redesProducto/RedesProducto'
import Opiniones from './Comentarios/Comentarios'
import Calendario from '../detalleProducto/calendarioDetalle/CalendarioDetalle'
import './PublicDetalleProducto.css';
import Caracteristicas from './caracteristicas/Caracteristicas';

const PublicDetalleProducto = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { fetchProductById, loading, error, loggedInUser } = useApi();
  const [product, setProduct] = useState(null);
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const [isPoliticasOpen, setIsPoliticasOpen] = useState(false);
  const [isShareOpen, setIsShareOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [imagesLoaded, setImagesLoaded] = useState({});
  const [imagesError, setImagesError] = useState({});

  const handleClick = () => {
    if (loggedInUser) {
      // Redirige al usuario autenticado a la sección de reservas
      navigate(`/reservas/${product.id}`);
    } else {      
      setShowModal(true);
    }
  };

  const handleCloseModal = () =>{
    setShowModal(false)
   }

  const handleLogin = () => {   
    navigate('/inicioSesion');
  };

  const openGallery = () => {
    setIsGalleryOpen(true);
  };

  const closeGallery = () => {
    setIsGalleryOpen(false);
  };

  const openPoliticas = () => {
    setIsPoliticasOpen(true);
  };

  const closePoliticas = () => {
    setIsPoliticasOpen(false);    
  };
  const openShare = () => {
    setIsShareOpen(true);
  };

  const closeShare = () => {
    setIsShareOpen(false);
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

  // Función auxiliar para renderizar imágenes con placeholders
  const renderImage = (imageData, index, className, containerClass) => {
    const imageKey = `img-${index}`;
    
    if (!imageData) {
      return (
        <div className={containerClass}>
          <div className="img-placeholder-detalle">
            <span>🎵</span>
          </div>
        </div>
      );
    }

    return (
      <div className={containerClass}>
        {!imagesLoaded[imageKey] && !imagesError[imageKey] && (
          <div className="skeleton skeleton-image-detalle"></div>
        )}
        {imagesError[imageKey] ? (
          <div className="img-placeholder-detalle">
            <span>🎵</span>
          </div>
        ) : (
          <img
            src={`data:image/jpeg;base64,${imageData}`}
            alt={`${product?.name}-image-${index}`}
            className={className}
            onLoad={() => setImagesLoaded(prev => ({ ...prev, [imageKey]: true }))}
            onError={() => {
              setImagesError(prev => ({ ...prev, [imageKey]: true }));
              setImagesLoaded(prev => ({ ...prev, [imageKey]: true }));
            }}
            style={{ display: imagesLoaded[imageKey] && !imagesError[imageKey] ? 'block' : 'none' }}
          />
        )}
      </div>
    );
  };

  if (loading) {
    return (
      <div className='container-principal-detalle-producto'>
        <div className="loading-state">
          <div className="loading-spinner"></div>
          <p>Cargando detalles del producto...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className='container-principal-detalle-producto'>
        <div className="error-state">
          <p>⚠️ Error: {error}</p>
          <Link to='/home' className='btn-back-error'>Volver al inicio</Link>
        </div>
      </div>
    );
  }

  return (
    <div className='container-principal-detalle-producto'>
      {product && (
        <>
          {/* container titulo y boton */}
          <div className="container-titulo-boton-detalle">
            <div className="titulo-detalle-producto">
              <p className='text-titulo-detalle-producto'>{product.name}</p>
            </div>
            <div className="boton-detalle-producto">
              <Link to='/home' className='link-back-detalle-producto'><p className='back-icon-header-detalle'><IoChevronBack /> Atras</p></Link>
            </div>
          </div>
          {/* container titulo y boton */}

          {/* container izquierda y derecha*/}
          <div className='container-imagenes-deatlle-precio'>
            {/* container izquierda imagenes */}
            <div className="imagenes-detalle-producto-container">
              {/* imagen 1 */}
              {renderImage(
                product.images && product.images[0] ? product.images[0].imageData : null,
                0,
                'img-1',
                'container-detalle-producto-imagen1'
              )}
              {/* contenedor imagenes pequenas */}
              <div className='container-galeria-detalle-producto'>
                {renderImage(
                  product.images && product.images[1] ? product.images[1].imageData : null,
                  1,
                  'img-2',
                  'container-detalle-producto-imagen2'
                )}
                {renderImage(
                  product.images && product.images[2] ? product.images[2].imageData : null,
                  2,
                  'img-3',
                  'container-detalle-producto-imagen3'
                )}
                {renderImage(
                  product.images && product.images[3] ? product.images[3].imageData : null,
                  3,
                  'img-4',
                  'container-detalle-producto-imagen4'
                )}
                {renderImage(
                  product.images && product.images[4] ? product.images[4].imageData : null,
                  4,
                  'img-5',
                  'container-detalle-producto-imagen5'
                )}
              </div>
              <div className='container-galeria-fotos-detalle-producto' onClick={openGallery}>
                <TbPhotoShare className='icono-galeria-detalle-producto'/><p className='ver-mas-galeria-detalle-producto'>Ver Mas</p>
              </div>
                {/* Componente de Galería de Imágenes */}
                {isGalleryOpen && <GaleriaImagenes onClose={closeGallery} />}  
              {/* cierre contenedor imagenes pequenas */}            
            </div>
            {/* cierre izquierdo imagenes */}
            {/* container derecho */}
            <div className='container-derecha-informacion-producto'>
              <div className='container-detalle-derecha-estrella-redes'>
                <div className='container-estrellas-detalle'>
                  <FaStar className='estrella-calificacion' /><FaStar className='estrella-calificacion'/><FaStar className='estrella-calificacion'/><FaStar className='estrella-calificacion'/><FaStar className='estrella-calificacion-fake'/><p className='calificacion-estrellas-detalle-producto'>4/5 | 4 opiniones</p>
                </div>
                <div onClick={openShare} className='container-social-media-detalle'>
                  <IoShareSocialOutline className='icon-share-detalle-producto'/>
                </div>
                <RedesProducto isOpen={isShareOpen} onRequestClose={closeShare} /> 
              </div>
              <div>
              <p className='precio-detalle-producto'>${Number(product.price).toLocaleString()} <span className='text-pordia-detalle-producto'>por dia</span> </p>
              </div>
              <div className='detalle-producto-texto-descripcion'>
              <p>{product.description}</p>
              </div>
              <div className='container-calemndario-detalle-producto'>
                  <Calendario />
              </div>
              <div onClick={handleClick} className='container-detalle-producto-boton'>
                <button className='boton-detalle-producto-reserva'>Reserva Ahora</button>
                {showModal && (
                <div className='main-container'>
                  <div className='modal-container'>
                      <div className="modal">                      
                        <img className='modal-alert' src={alert} alt="" />
                        <button className='cerrar' onClick={handleCloseModal}>X</button>
                        <p>Para poder reservar un instrumento musical debes iniciar sesion</p>
                        <button onClick={handleLogin} className='btn-iniciar-sesion'>Iniciar sesión</button>
                      </div>
                  </div>
                </div>
                )}
              </div>
              <div className='container-politicas-detalle-producto'>
                <div className='container-icono-detalle-politica'>
                  <GoChecklist className='iconos-politicas-detalle-producto'/>
                </div>
                <div onClick={openPoliticas} className='container-texto-detalle-politica'>
                  <p>Politicas</p>
                  <PoliticasProducto isOpen={isPoliticasOpen} onRequestClose={closePoliticas} />
                  <p>Revise las politicas de envio, cancelación y reserva</p>
                </div>                
              </div>
            </div>
            {/* cierre derecho textos */}
          </div>
          {/* /* container izquierda y derecha*/}
          <div className='caracteristicas-componente'>
            <hr className='hr-oscura' />
            <Caracteristicas />
          </div>         
          <div className='comentarios-componente'>
            <hr className='hr-oscura' />
            <Opiniones />
          </div>                       
        </>        
      )}
    </div>
    
  );
}

export default PublicDetalleProducto;
