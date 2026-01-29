// API Configuration
// Para desplegar, solo cambia esta URL
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8081';

export default API_URL;

// Endpoints de referencia:
// GET  /api/public/products - Lista de productos
// GET  /api/public/products/:id - Detalle de producto
// GET  /api/public/categories - Lista de categorías
// POST /api/auth/login - Login
// POST /api/auth/register - Registro
// GET  /api/admin/users - Lista de usuarios (admin)
// PUT  /api/admin/users/:id - Editar usuario (admin)
// POST /api/admin/products - Crear producto (admin)
// PUT  /api/admin/products/:id - Editar producto (admin)
// DELETE /api/admin/products/:id - Eliminar producto (admin)
// POST /api/admin/categories - Crear categoría (admin)
// DELETE /api/admin/categories/:id - Eliminar categoría (admin)
// POST /api/customer/reservation/create - Crear reserva
