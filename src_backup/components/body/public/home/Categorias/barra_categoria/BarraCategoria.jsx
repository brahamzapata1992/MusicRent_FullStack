import React from 'react';
import { MdOutlineArrowBackIosNew } from "react-icons/md";
import Cuerdas from '../../../../../../assets/categorias/imagen_hombre_cuerdas.svg';
import Percusion from '../../../../../../assets/categorias/pianos.png';
import Vientos from '../../../../../../assets/categorias/imagen_hombre_vientos.svg';
import Folkloricos from '../../../../../../assets/categorias/hombre-folklolricos.png';
import './BarraCategoria.css';
import { Link } from 'react-router-dom';

const BarraCategoria = ({ nombreCategoria }) => {
  const imagenes = {
    Cuerdas: Cuerdas,
    Percusion: Percusion,
    Vientos: Vientos,
    Folkloricos: Folkloricos
  };

  const normalizarCadena = (str) => str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");

  const nombreCategoriaNormalizado = normalizarCadena(nombreCategoria);

  return (
    <div id='Barra-Categoria-container'>
      <div className='barra-categoria-izq'>
        <img className='img-barra-categoria-izq' src={imagenes[nombreCategoriaNormalizado]} alt="imagen-categoria" />
      </div>
      <div className='barra-categoria-cen'>
        <h2>{nombreCategoria}</h2>
      </div>
      <div className='barra-categoria-der'>
        <Link to='/home'>
          <button className='barra-categoria-atras-boton'><MdOutlineArrowBackIosNew /> Atrás</button>
        </Link>
      </div>
    </div>
  );
};

export default BarraCategoria;
