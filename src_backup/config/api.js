// Configuración centralizada de la API
// Para cambiar la URL de tu API, solo modifica el archivo .env

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8081';

export default API_URL;
