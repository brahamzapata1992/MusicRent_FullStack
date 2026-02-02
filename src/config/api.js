// API Configuration
// URL de API desplegada, ya sea local o en producción
const API_URL = import.meta.env.VITE_API_URL || 'http://backendmusicrent-production.up.railway.app';

export default API_URL;

// Helper to get base64 image with correct MIME type
export const getBase64ImageSrc = (base64String) => {
  if (!base64String) return null;
  
  // Detect SVG (starts with PHN2 = <svg or PD94 = <?xml)
  if (base64String.startsWith('PHN2') || base64String.startsWith('PD94')) {
    return `data:image/svg+xml;base64,${base64String}`;
  }
  // Detect PNG (starts with iVBOR)
  if (base64String.startsWith('iVBOR')) {
    return `data:image/png;base64,${base64String}`;
  }
  // Default to JPEG
  return `data:image/jpeg;base64,${base64String}`;
};

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
