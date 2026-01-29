# Music Rent - E-commerce de Alquiler de Instrumentos Musicales

## Descripción del Proyecto
Aplicación web de e-commerce para alquiler de instrumentos musicales construida desde cero con React + Vite + Tailwind CSS.

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
│   ├── context/AppContext.jsx   # Estado global y llamadas al API
│   ├── components/
│   │   ├── Header.jsx           # Header responsive con menú hamburguesa
│   │   ├── Footer.jsx           # Footer con logo y copyright
│   │   ├── ProductCard.jsx      # Card de producto con favoritos
│   │   ├── ProductCardSkeleton.jsx # Skeleton de carga
│   │   ├── SearchHero.jsx       # Hero con buscador y datepickers
│   │   ├── Categories.jsx       # Categorías con iconos
│   │   └── WhatsAppButton.jsx   # Botón flotante de WhatsApp
│   ├── pages/
│   │   ├── Home.jsx             # Página principal
│   │   ├── ProductDetail.jsx    # Detalle de producto con reservas
│   │   ├── Login.jsx            # Iniciar sesión
│   │   ├── Register.jsx         # Crear cuenta
│   │   └── admin/
│   │       ├── AdminLayout.jsx  # Layout del panel admin
│   │       ├── AdminUsers.jsx   # Gestión de usuarios
│   │       ├── AdminCategories.jsx # Gestión de categorías
│   │       └── AdminProducts.jsx # Gestión de productos
│   ├── assets/                  # Imágenes y recursos
│   ├── App.jsx                  # Rutas principales
│   ├── main.jsx                 # Entry point
│   └── index.css                # Tailwind imports
├── tailwind.config.js           # Configuración de Tailwind
├── vite.config.js               # Configuración de Vite (puerto 3000)
├── API_DOCUMENTATION.md         # Documentación de endpoints
└── package.json                 # Dependencias
```

## Páginas Implementadas

### Públicas
- **Home (/)** - Buscador, categorías, lista de productos con paginación
- **Detalle de Producto (/producto/:id)** - Imágenes, descripción, reviews, reserva
- **Login (/login)** - Formulario de inicio de sesión
- **Registro (/registro)** - Formulario de crear cuenta

### Panel Admin (/admin)
- **Usuarios (/admin/usuarios)** - Lista, cambiar rol, eliminar
- **Categorías (/admin/categorias)** - Crear, eliminar categorías
- **Productos (/admin/productos)** - CRUD completo de productos

## Funcionalidades
- ✅ Diseño responsive (mobile, tablet, desktop)
- ✅ Header con menú hamburguesa en mobile
- ✅ Buscador con autocompletado
- ✅ Datepickers para fechas de reserva
- ✅ Filtro por categorías
- ✅ Paginación de productos
- ✅ Favoritos (localStorage)
- ✅ Skeletons de carga
- ✅ Modal de reserva
- ✅ Panel de administración completo
- ✅ Botón de WhatsApp flotante

## Configuración del API

Para desplegar, solo cambia esta URL en el archivo `.env`:

```bash
VITE_API_URL=https://tu-api-url.com
```

Ver `API_DOCUMENTATION.md` para la lista completa de endpoints.

## Comandos

```bash
yarn dev      # Desarrollo en localhost:3000
yarn build    # Build de producción
yarn preview  # Preview del build
```

## Comparación con Versión Anterior

| Aspecto | Versión Anterior | Nueva Versión |
|---------|------------------|---------------|
| CSS Framework | CSS puro (81KB) | Tailwind (41KB) |
| Líneas de código | ~3000+ | ~1500 |
| Componentes | 30+ archivos | 15 archivos |
| Build time | 8+ segundos | 5.5 segundos |
| Mantenibilidad | Media | Alta |

## Idioma Preferido del Usuario
Español
