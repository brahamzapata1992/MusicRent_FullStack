# Music Rent - E-commerce de Alquiler de Instrumentos Musicales

## Descripción del Proyecto
Aplicación web completa de e-commerce para alquiler de instrumentos musicales construida con React + Vite + Tailwind CSS.

## Stack Técnico
- **Frontend:** React 18, Vite 5
- **Estilos:** Tailwind CSS 3.4
- **Iconos:** Lucide React
- **Routing:** React Router DOM 6
- **Date Picker:** React DatePicker
- **Estado:** React Context API

## Arquitectura
```
/app/
├── .env                          # Variable VITE_API_URL
├── src/
│   ├── config/api.js            # Configuración centralizada del API
│   ├── context/AppContext.jsx   # Estado global + mock data para desarrollo
│   ├── components/
│   │   ├── Header.jsx           # Header responsive con menú hamburguesa
│   │   ├── Footer.jsx           # Footer con logo y copyright
│   │   ├── ProductCard.jsx      # Card de producto con favoritos
│   │   ├── ProductCardSkeleton.jsx # Skeleton de carga
│   │   ├── SearchHero.jsx       # Hero con buscador y datepickers
│   │   ├── Categories.jsx       # Categorías con iconos
│   │   └── WhatsAppButton.jsx   # Botón flotante de WhatsApp
│   ├── pages/
│   │   ├── Home.jsx             # Página principal con productos
│   │   ├── ProductDetail.jsx    # Detalle completo con flujo de reserva
│   │   ├── Login.jsx            # Iniciar sesión
│   │   ├── Register.jsx         # Crear cuenta
│   │   ├── Profile.jsx          # Perfil con reservas y favoritos
│   │   └── admin/
│   │       ├── AdminLayout.jsx  # Layout del panel admin
│   │       ├── AdminUsers.jsx   # Gestión de usuarios
│   │       ├── AdminCategories.jsx # Gestión de categorías
│   │       └── AdminProducts.jsx # Gestión de productos
│   └── assets/                  # Imágenes y recursos
├── tailwind.config.js           # Configuración de Tailwind
├── vite.config.js               # Configuración de Vite (puerto 3000)
├── API_DOCUMENTATION.md         # Documentación de endpoints
└── package.json                 # Dependencias
```

## Flujo de Reserva Completo

### 1. Selección de Producto
- Ver catálogo con filtros por categoría
- Buscar por nombre
- Agregar a favoritos

### 2. Detalle de Producto
- Galería de imágenes
- Descripción y características
- Reviews de otros usuarios
- Selección de fechas con DatePicker
- Cálculo automático del precio total

### 3. Formulario de Reserva
- Datos del cliente (nombre, email, teléfono, dirección)
- Resumen del producto y fechas
- Políticas de reserva
- Botón de confirmación

### 4. Confirmación de Reserva
- Número de reserva único
- Resumen completo de la reserva
- Datos de entrega
- Notificación por email (simulada)
- Opciones: volver al inicio o nueva reserva

### 5. Perfil de Usuario
- Historial de reservas con estados (activa, completada, cancelada)
- Lista de favoritos
- Datos personales

## Funcionalidades Implementadas
- ✅ Diseño completamente responsive (mobile, tablet, desktop)
- ✅ Header con menú hamburguesa en mobile
- ✅ Buscador con autocompletado
- ✅ Datepickers para fechas de reserva
- ✅ Cálculo automático de días y precio total
- ✅ Filtro por categorías
- ✅ Paginación de productos
- ✅ Favoritos (localStorage)
- ✅ Skeletons de carga
- ✅ Modal de reserva con múltiples pasos
- ✅ Pantalla de éxito con detalles completos
- ✅ Perfil con historial de reservas
- ✅ Panel de administración completo (usuarios, categorías, productos)
- ✅ Botón de WhatsApp flotante
- ✅ Mock data para desarrollo sin backend

## Configuración del API

Para desplegar con tu backend, solo cambia esta URL en el archivo `.env`:

```bash
VITE_API_URL=https://tu-api-url.com
```

Ver `API_DOCUMENTATION.md` para la lista completa de endpoints.

## Mock Data para Desarrollo

La aplicación incluye datos de prueba que se cargan automáticamente cuando el backend no está disponible:
- 8 productos de ejemplo (guitarras, bajos, baterías, saxofones, etc.)
- 3 categorías (Cuerdas, Percusión, Vientos)
- Login simulado (cualquier email/password funciona)
- Reservas de prueba en el perfil

## Comandos

```bash
yarn dev      # Desarrollo en localhost:3000
yarn build    # Build de producción
yarn preview  # Preview del build
```

## Notas Importantes

1. **Imágenes:** Los productos no tienen imágenes reales, se muestra un placeholder. Cuando conectes tu backend, las imágenes deben venir en el formato `{ url: '/path/to/image.jpg' }`

2. **Login Admin:** Usa un email que contenga "admin" (ej: admin@test.com) para acceder al panel de administración

3. **Reservas:** El flujo de reserva funciona completamente. Cuando conectes el backend, los datos se enviarán a `/api/customer/reservation/create`

## Idioma Preferido del Usuario
Español
