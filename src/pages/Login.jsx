import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import loginImg from '../assets/user/iniciarSesion.png';

const Login = () => {
  const { login } = useApp();
  const navigate = useNavigate();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const result = await login(email, password);
    
    if (result.success) {
      // Redirect based on role - ADMIN goes to admin panel
      if (result.user?.role === 'ADMIN') {
        navigate('/admin');
      } else {
        navigate('/');
      }
    } else {
      setError(result.message);
    }
    
    setLoading(false);
  };

  return (
    <main className="min-h-screen pt-20 flex">
      {/* Image - Hidden on mobile */}
      <div className="hidden lg:block w-2/5">
        <img
          src={loginImg}
          alt="Login"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Form */}
      <div className="flex-1 flex items-center justify-center p-6 lg:p-12">
        <div className="w-full max-w-md">
          <h1 className="text-3xl font-bold text-primary-500 text-center mb-8">
            Iniciar Sesión
          </h1>

          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-600 rounded-xl text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Correo electrónico
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                placeholder="tu@email.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Contraseña
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                placeholder="••••••••"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 bg-primary-500 text-white font-semibold rounded-xl hover:bg-primary-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-all transform hover:-translate-y-0.5"
            >
              {loading ? 'Iniciando...' : 'Iniciar Sesión'}
            </button>
          </form>

          <p className="mt-8 text-center text-gray-600">
            ¿No tienes una cuenta?{' '}
            <Link to="/registro" className="text-primary-500 font-semibold hover:underline">
              Crear Cuenta
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
};

export default Login;
