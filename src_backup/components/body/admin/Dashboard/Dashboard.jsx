import React from 'react'
import img from '../../../../../src/assets/admin/dashboard/imagen_hombre_vientos.svg'
import { useNavigate } from 'react-router-dom'
import { TbUsers } from "react-icons/tb";
import { TbCategoryPlus } from "react-icons/tb";
import { CiViewList } from "react-icons/ci";
import { MdOutlineCategory } from "react-icons/md";
import imagen from '../../../../assets/responsive/admin_opss.svg'
import './Dashboard.css'

const Dashboard = () => {
    const navigate = useNavigate();
  return (    
    <div className='contenedor-elementos-dashboard'>
        <section className='left-section-dashboard'>
          <img className='img-admin-dashboard' src={img} alt="" />
         </section>                
         <section className='right-section-dashboard'>
          <h2 className='dashboard-text-container'> Administra usuarios, productos, categorías y características de manera eficiente.</h2>                    
          <div className='dashboard-boton-container'>
            <button className='btn-dashboard' onClick={()=>navigate("/administracion/Usuarios")}><TbUsers className='icon-admin-boton'/> Usuarios</button>
            <button className='btn-dashboard' onClick={()=>navigate("/administracion/Categorias")}><MdOutlineCategory />Categorias</button>
            <button className='btn-dashboard' onClick={()=>navigate("/administracion/Caracteristicas")}><TbCategoryPlus className='icon-admin-boton'/> Caracteristicas</button>
            <button className='btn-dashboard' onClick={()=>navigate("/administracion/Productos")}><CiViewList className='icon-admin-boton'/> Lista de productos</button> 
          </div>                    
        </section>
        <section className='no-responsive-dashboard'>
          <div  className="container-titulo-no-responsive-dashboard">
            <h2 className='titulo-no-responsive-dashboard'>Oops!</h2>
          </div>
          <div className='container-text-no-responsive-dashboard'>
            <p className='text-no-responsive-dashboard'>Lo sentimos, la versión responsive para el administrador aun no se encuentra disponible</p>
          </div>
          <div className='container-imagen-no-responsive-dashboard'>
            <img className='imagen-no-responsive-dashboard' src={imagen} alt="" />
          </div>
        </section>
    </div>    
  )
}

export default Dashboard