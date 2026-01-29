import React from 'react'
import imagen from '../../../assets/notFound/img-found.jpg'
import { RiArrowGoBackLine } from "react-icons/ri";
import './RutaNoEncontrada.css'
import { Link } from 'react-router-dom';

const RutaNoEncontrada = () => {
  return (
    <div className='container-ruta-no-encontrada'>
      <div className='contenedor-titulo-not-found'>
        <p className='titulo-not-found'>Oops !</p>
      </div>
      <div className='contenedor-parrafo-not-found'>
        <p className='parrafo-not-found'>no encontramos la pagina que estas buscando, por favor vuelve al inicio y realiza una nueva busqueda</p>
      </div>
      <div className='contenedor-imagen-not-found'>
        <img className='imagen-not-found' src={imagen} alt="" />
      </div>
      <div className='contenedor-boton-not-found'>
        <Link to='/home' className='link-boton-not-found'><button className='boton-not-found'><RiArrowGoBackLine className='icono-back-home-not-found' /> Ir a Inicio</button></Link>
      </div>
    </div>
  )
}

export default RutaNoEncontrada