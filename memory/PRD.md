# Music Rent - E-commerce de Alquiler de Instrumentos Musicales

## Descripción del Proyecto
Aplicación web frontend para alquiler de instrumentos musicales construida con React + Vite + Tailwind CSS. Se conecta a un backend Spring Boot externo del usuario (localhost:8081).

## Stack Técnico
- **Frontend:** React 18, Vite 5
- **Estilos:** Tailwind CSS 3.4
- **Iconos:** Lucide React
- **Routing:** React Router DOM 6
- **Date Picker:** React DatePicker
- **Estado:** React Context API
- **Backend:** Spring Boot (externo, localhost:8081) - NO incluido en este proyecto

## Pantallas Implementadas

### 1. Home
- Hero con buscador (producto, fechas, categoría)
- Grid de categorías dinámicas desde API
- Grid de productos con paginación
- Loading skeletons

### 2. Login / Register
- Formularios de autenticación
- Integración con API `/users/authenticate` y `/users/sign-up`

### 3. Detalle de Producto
- Galería de imágenes (soporta Base64 desde backend)
- Selector de fechas para reserva
- Cálculo automático de precio total
- Modal de reserva con formulario
- Estados: loading, success, error

### 4. Perfil de Usuario
- Tabs: Mis Reservas, Favoritos, Mis Datos
- Historial de reservas con estados
- Modal de detalle de reserva

### 5. Panel Admin
- Gestión de productos (CRUD)
- Gestión de categorías
- Gestión de usuarios y roles

### 6. Página 404/Error

## Arquitectura
```
/app/
├── src/
│   ├── assets/           # Imágenes estáticas
│   ├── components/       # Componentes reutilizables
│   ├── config/api.js     # URL de la API centralizada
│   ├── context/AppContext.jsx  # Estado global y llamadas API
│   ├── pages/            # Páginas de la aplicación
│   │   └── admin/        # Páginas del panel admin
│   ├── App.jsx           # Rutas
│   └── main.jsx          # Entry point
├── .env                  # VITE_API_URL=http://localhost:8081
└── API_DOCUMENTATION.md  # Documentación de endpoints
```

## Bugs Corregidos (Feb 2025)

### ✅ P0 - Imágenes Base64
- **Problema:** Las imágenes de productos venían como Base64 y no se renderizaban
- **Solución:** Implementada función `getImageSrc()` en `ProductCard.jsx` y `ProductDetail.jsx` que convierte `imageData` a Data URL

### ✅ P1 - Toggle de Favoritos
- **Problema:** El botón de favoritos no permitía quitar un producto de favoritos
- **Solución:** Ya estaba implementado correctamente en `AppContext.jsx` - usa DELETE para quitar y POST para agregar

### ✅ P2 - Filtrado Dinámico por Categorías
- **Problema:** Las categorías estaban hardcodeadas
- **Solución:** Ya estaba implementado - `Categories.jsx` usa categorías del contexto API

## API Endpoints (Backend Spring Boot)

### Auth
- `POST /users/authenticate` - Login
- `POST /users/sign-up` - Registro

### Productos
- `GET /api/admin/products` - Lista todos
- `GET /api/admin/products/{id}` - Detalle
- `GET /api/admin/products/byCategories?categoryIds={id}` - Por categoría
- `POST/PUT/DELETE /api/admin/products` - CRUD

### Categorías
- `GET /api/admin/list` - Lista categorías
- `POST /api/admin/category` - Crear
- `DELETE /api/admin/category/delete/{id}` - Eliminar

### Favoritos
- `GET /api/favorites/{userId}` - Lista favoritos
- `POST /api/favorites/{userId}/{productId}` - Agregar
- `DELETE /api/favorites/{userId}/{productId}` - Quitar

### Reservas
- `POST /api/customer/reservation/create` - Crear
- `GET /api/customer/reservation/history/{userId}` - Historial

## Comandos

```bash
yarn dev      # Desarrollo en localhost:3000
yarn build    # Build de producción
```

## Nota Importante
El backend Spring Boot corre en la máquina del usuario (localhost:8081) y NO es accesible desde el entorno de desarrollo de Emergent. La UI funcionará correctamente cuando se despliegue junto con el backend.

## Idioma Preferido del Usuario
Español
