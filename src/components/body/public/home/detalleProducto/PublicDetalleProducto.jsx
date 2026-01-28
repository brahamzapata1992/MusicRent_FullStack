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

  if (loading) {
    return <p>Cargando...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
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
              <div className='container-detalle-producto-imagen1'>
              {product.images && product.images.length > 0 && (
                  <img
                    src={`data:image/jpeg;base64,${product.images[0].imageData}`}
                    alt={`${product.name}-image-0`}
                    className="img-1"
                  />
                )}
              </div>
              {/* contenedor imagenes pequenas */}
              <div className='container-galeria-detalle-producto'>
                <div className='container-detalle-producto-imagen2'>
                {product.images && product.images.length > 1 && (
                    <img
                      src={`data:image/jpeg;base64,${product.images[1].imageData}`}
                      alt={`${product.name}-image-1`}
                      className="img-2"
                    />
                  )}
                </div>
                {/* imagen 3 */}
                <div className='container-detalle-producto-imagen3'>
                {product.images && product.images.length > 2 && (
                    <img
                      src={`data:image/jpeg;base64,${product.images[2].imageData}`}
                      alt={`${product.name}-image-2`} 
                      className="img-3"
                    />
                  )}
                </div>
                {/* imagen 4 */}
                <div className='container-detalle-producto-imagen4'>
                {product.images && product.images.length > 3 && (
                    <img
                      src={`data:image/jpeg;base64,${product.images[3].imageData}`}
                      alt={`${product.name}-image-3`}
                      className="img-4"
                    />
                  )}
                </div>
                {/* imagen 5 */}
                <div className='container-detalle-producto-imagen5'>
                {product.images && product.images.length > 4 && (
                    <img
                      src={`data:image/jpeg;base64,${product.images[4].imageData}`}
                      alt={`${product.name}-image-4`}
                      className="img-5"
                    />
                  )}                  
                </div>                             
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
