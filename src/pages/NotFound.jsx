import { Link } from 'react-router-dom';
import errorImg from '../assets/notFound/img-found.jpg';

const NotFound = () => {
  return (
    <main className="min-h-screen pt-20 flex items-center justify-center bg-gray-50 px-4">
      <div className="text-center max-w-lg">
        <img
          src={errorImg}
          alt="Página no encontrada"
          className="w-64 h-64 object-contain mx-auto mb-8"
        />
        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          ¡Ups! Algo salió mal
        </h1>
        <p className="text-gray-600 mb-8">
          Lo sentimos, ha ocurrido un problema técnico. Por favor, intenta de nuevo más tarde o vuelve al inicio.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/"
            className="px-8 py-3 bg-primary-500 text-white font-semibold rounded-xl hover:bg-primary-600 transition-colors"
          >
            Volver al inicio
          </Link>
          <button
            onClick={() => window.location.reload()}
            className="px-8 py-3 border border-gray-300 text-gray-700 font-semibold rounded-xl hover:bg-gray-50 transition-colors"
          >
            Intentar de nuevo
          </button>
        </div>
      </div>
    </main>
  );
};

export default NotFound;
