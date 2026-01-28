import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useApi } from '../../../../context/ApiContext'; 
import API_URL from '../../../../config/api';
import img_login from '../../../../assets/user/iniciarSesion.png';
import { useNavigate } from 'react-router-dom';
import './IniciarSesion.css';

const IniciarSesion = () => {
  const navigate = useNavigate();
  const { updateLoggedInUser } = useApi();
  const [usuario, setUsuario] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [error, setError] = useState(null);

  const handleLogin = async (e) => {
    e.preventDefault();
    setEmailError('');
    setPasswordError('');

    if (!usuario.trim()) {
      setEmailError('Por favor, ingrese su dirección de correo electrónico.');
      return;
    }

    if (!password.trim()) {
      setPasswordError('Por favor, ingrese su contraseña.');
      return;
    }

    try {
      const response = await fetch(`${API_URL}/users/authenticate`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: usuario,
          password: password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        if (data.error === 'user_not_found') {
          setError("El usuario ingresado no existe. Por favor, verifique sus credenciales e inténtelo de nuevo.");
        } else {
          setError("El usuario o la contraseña no coinciden. Por favor, inténtelo de nuevo.");
        }
        return;
      }

      updateLoggedInUser({
        userRole: data.role,
        userName: data.name,
        userId: data.userId,
        lastName: data.lastName,
        email: data.email
      });

      switch (data.role) {
        case 'ADMIN':
          navigate('/administracion');
          break;
        case 'CUSTOMER':          
          navigate('/home');
          break;       
      }

      setError(null);
    } catch (error) {
      console.error("Error al iniciar sesión:", error.message);
      setError("Correo o contraseña invalidos. Por favor, inténtalo de nuevo.");
    }
  };

  return (
    <div className='login-page-inicio-principal'>
      <div className='img-login-inicio'>
        <img className='img-login-inicio' src={img_login} alt='Iniciarsesión' />
      </div>
      <div className='form-login-inicio'>
        <h2 className='h2_login-inicio'>Iniciar Sesión</h2>
        <form onSubmit={handleLogin}>
          <div className='form-group-login-inicio'>
            <label htmlFor="email">Dirección de correo electrónico</label>
            <input
              className='input-login-inicio'
              type="email"
              id="email"
              value={usuario}
              onChange={(e) => setUsuario(e.target.value)}
            />
            {emailError && <p className="error-message-login-inicio">{emailError}</p>}
          </div>
          <div className='form-group-login-inicio'>
            <label htmlFor="password">Contraseña</label>
            <input
              className='input-login-inicio'
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {passwordError && <p className="error-message-login-inicio" >{passwordError}</p>}
          </div>
          <div className='contenedor-boton-login-inicio'>
          <button className='boton-login-inicio' type="submit">Iniciar Sesión</button>
          </div>          
        </form>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <div className='inf_login'>
          <Link to='/registro' class="link-gris" className='link-login-inicio'>
            <p className='link-texto-login-inicio'>¿Aún no tienes una cuenta creada? <span className='spam-login-inicio'>Crea Cuenta</span></p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default IniciarSesion;