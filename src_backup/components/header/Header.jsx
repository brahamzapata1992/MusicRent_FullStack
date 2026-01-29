import React, { useState } from 'react';
import Modal from 'react-modal'; 
import logo from '../../assets/img_header/logo.png';
import { CiLogin, CiLogout } from "react-icons/ci";
import { HiOutlineMenuAlt3 } from "react-icons/hi";
import { MdClose, MdFavoriteBorder } from "react-icons/md";
import { GoPerson } from "react-icons/go";
import { Link, useNavigate } from 'react-router-dom';
import { useApi } from '../../context/ApiContext';
import { RiArrowDropDownFill } from "react-icons/ri";
import './Header.css'; 

const Header = () => {
    const [modalOpen, setModalOpen] = useState(false);
    const [modalLogin, setModalLogin] = useState(false);
    const { loggedInUser, updateLoggedInUser } = useApi();
    const primeraLetraNombre = loggedInUser && loggedInUser.userName ? loggedInUser.userName.charAt(0) : '';
    const primeraLetraApellido = loggedInUser && loggedInUser.lastName ? loggedInUser.lastName.charAt(0) : '';
    const navigate = useNavigate();

    const abrirModal = () => {
        setModalOpen(true);
    };
    
    const cerrarModal = () => {
        setModalOpen(false);
    };

    const cerrarModalYRedirect = () => {
        cerrarModal();
    };

    const handleLogout = () => {
        updateLoggedInUser(null); 
        navigate('/inicioSesion');         
    };

    const toggleModalLogin = () => {
        setModalLogin(prevState => !prevState);
    };

    const handleProfileClick = () => {
        toggleModalLogin();
    };

    const favoritos = () =>{
        navigate('/favoritos')
        cerrarModal()
    }
    const perfil = () =>{
        navigate('/perfil')
        cerrarModal()
    }


    return (
        <>
            <div className='contenedor-header-principal'>
                <div className='contenedor-header-logo-lema'>
                    <div>
                        <Link to={loggedInUser && loggedInUser.userRole === 'ADMIN' ? '/administracion' : '/home'}>
                            <img className='logo-header' src={logo} alt="logo" />        
                        </Link>
                    </div>
                    <div>
                        <p className='lema-header-text'>{loggedInUser && loggedInUser.userRole === 'ADMIN' ? 'A D M I N I S T R A D O R' : 'Encuentra tu nota perfecta con un solo clic'}</p>
                    </div>
                </div>
                {loggedInUser ? (
                    <div className="circle-login-avatar-user-contenedor">
                        <div className='circle-login-avatar-user'>
                            {primeraLetraNombre}
                            {primeraLetraApellido}
                        </div>                        
                        <div className='nombre-usuario-logueado' onClick={handleProfileClick}>
                            <p className='drop-down-login-header'>{loggedInUser.userName} {loggedInUser.lastName} <RiArrowDropDownFill className='drop-down-icono'/></p>
                        </div>
                    </div>                    
                ) : (
                    <div className='contenedor-header-botones'>
                        <Link to='/inicioSesion' className='link-botones-regi-login' onClick={cerrarModalYRedirect}>
                            <button className='boton-header-inisiar' ><CiLogin /> Iniciar Sesión</button>
                        </Link>
                        <Link to='/registro' className='link-botones-regi-login' onClick={cerrarModalYRedirect}>
                            <button className='boton-header-cerrar' ><CiLogout /> Crear Cuenta</button>                
                        </Link> 
                    </div>
                )}
                <div className='boton-menu-header-hamburger'>
                    <HiOutlineMenuAlt3 onClick={abrirModal}/>
                </div>
            </div>
            
            <Modal
                className='modal-header-hamburguesa'
                isOpen={modalOpen}
                onRequestClose={cerrarModal}
                contentLabel="Modal de Ejemplo"
                ariaHideApp={false} 
            >
                <div className='contenedor-modal-hamburguesa'>
                    <div className='contenedor-modal-header-hamburguesa'>
                        <div>
                            <p className='bienvenido-login-header'>{loggedInUser ? `${loggedInUser.userName} ${loggedInUser.lastName}` : 'Bienvenidos'}</p>
                        </div>
                        <div>
                            <MdClose onClick={cerrarModal} className='boton-cerrar-modal-hamburguesa'/>
                        </div>
                    </div>
                    <div className='contenedor-modal-listado-hamburguesa'>
                        {!loggedInUser && (
                            <>
                                <Link to='/inicioSesion' className='link-botones-regi-login' onClick={cerrarModalYRedirect}>
                                    <p className='contenedor-modal-header-text-perfil'><CiLogin className='icono-header-perfil'/> Iniciar Sesion</p>
                                </Link>
                                <Link to='/registro' className='link-botones-regi-login' onClick={cerrarModalYRedirect}>
                                    <p className='contenedor-modal-header-text-favoritos'><CiLogout className='icono-header-perfil'/> Crear Cuenta</p>
                                </Link>                                
                            </>
                        )}
                        {loggedInUser && (
                            <>
                                <p onClick={perfil} className='contenedor-modal-header-text-perfil'><GoPerson className='icono-header-perfil'/> Perfil</p>
                                <p onClick={favoritos} className='contenedor-modal-header-text-favoritos'><MdFavoriteBorder className='icono-header-favorito'/> Favoritos</p>
                            </>
                        )}
                    </div>
                    <hr className='linea-header-modal'/>
                    {loggedInUser && (
                        <div className='contenedor-modal-cerrarSesion-hamburguesa' onClick={handleLogout}>
                            <CiLogout />
                            <p className='text-cerarsesion-modal-header'>Cerrar sesión</p>
                        </div>
                    )}
                </div>           
            </Modal>
            {modalLogin && (
                <div className='modal-nombre-drop-donw-header-listado' onClick={handleProfileClick}>
                    <p onClick={perfil} className='text-icono-header-nuevo-modal-1'><GoPerson className='icono-header-perfil-nuevo-modal'/> Perfil</p>
                    {loggedInUser && loggedInUser.userRole !== 'ADMIN' && (
                        <p onClick={favoritos} className='text-icono-header-nuevo-modal-2'><MdFavoriteBorder className='icono-header-perfil-nuevo-modal'/> Favoritos</p>
                    )}
                    <p className='text-icono-header-nuevo-modal-3' onClick={handleLogout}><CiLogout className='icono-header-perfil-nuevo-modal' /> Cerrar sesión</p>
                </div>
            )}
        </>
    )
}

export default Header;



