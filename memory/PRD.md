# Music Rent - E-commerce de Alquiler de Instrumentos Musicales

## Descripción del Proyecto
Aplicación web de e-commerce para alquiler de instrumentos musicales construida con React + Vite.

## Problema Original
1. Centralizar la URL del API en una sola variable para facilitar el despliegue
2. Corregir defectos existentes
3. Mejorar el diseño y estilos manteniendo la esencia original
4. Añadir placeholders de carga para cards e imágenes
5. Mejorar la página de detalle de producto
6. Hacer la aplicación responsive para dispositivos móviles

## Stack Técnico
- **Frontend:** React 18, Vite 5
- **Estilos:** CSS puro con media queries para responsividad
- **Estado:** React Context API (`ApiContext.jsx`)
- **Routing:** React Router DOM
- **Componentes UI:** Ant Design, rsuite, react-icons

## Arquitectura
```
/app/
├── .env                          # Variable VITE_API_URL
├── src/
│   ├── config/api.js            # Configuración centralizada del API
│   ├── context/ApiContext.jsx   # Estado global y llamadas al API
│   ├── components/
│   │   ├── header/              # Header con menú hamburguesa
│   │   ├── footer/              # Footer
│   │   └── body/
│   │       ├── admin/           # Dashboard administrador
│   │       ├── public/          # Páginas públicas (home, detalle)
│   │       └── user/            # Autenticación, perfil, favoritos
│   └── assets/                  # Imágenes y recursos
├── vite.config.js               # Configuración de Vite (puerto 3000)
└── package.json                 # Dependencias
```

## Tareas Completadas ✅

### Sesión Actual (2026-01-28)

#### 1. Build de producción arreglado
- Instalada dependencia `styled-components` (requerida por react-data-table-component)
- Corregida ruta de importación en `ListaProductos.jsx` (de 4 a 5 niveles)

#### 2. Configuración del entorno
- `vite.config.js` configurado para puerto 3000
- Supervisor configurado correctamente para `yarn dev`

#### 3. Estilos y responsividad corregidos

**BuscadorProductos.css:**
- Añadido `position: relative` al contenedor principal
- Corregida posición de la imagen de la chica con guitarra (ahora dentro del banner)
- Ajustado `padding-right` para dar espacio a la imagen
- Media queries mejoradas para tablet y mobile

**Categorias.css:**
- Cambiado `width: 10vh` a `width: 100%` (bug crítico)
- Mejorados botones de categoría con hover effects
- Grid responsivo para mobile (2-3 columnas)

**Footer.css:**
- Eliminado código repetitivo
- Cambiado `100vw` a `100%` (evita scroll horizontal)
- Footer centrado con logo y copyright

**IniciarSesion.css:**
- Eliminado 70% de código repetitivo
- Inputs con transiciones y focus states
- Botón con hover animation
- Responsivo para mobile

**CrearCuenta.css:**
- Eliminado código repetitivo
- Modal centrado correctamente con `position: fixed`
- Formulario responsive

### Sesiones Anteriores
- Centralización de URL del API en `VITE_API_URL`
- Creación de skeletons de carga para cards
- Placeholders para imágenes en detalle de producto
- Header responsivo con menú hamburguesa

## Configuración del API
```javascript
// src/config/api.js
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8081';
export default API_URL;
```

Para cambiar la URL del API, modificar el archivo `.env`:
```
VITE_API_URL=https://tu-api-url.com
```

## Comandos
```bash
yarn dev      # Desarrollo en localhost:3000
yarn build    # Build de producción
yarn preview  # Preview del build
```

## Verificación Visual
- ✅ Desktop: Header, buscador con imagen de chica, categorías
- ✅ Mobile: Menú hamburguesa, buscador apilado, formularios responsive
- ✅ Login/Registro: Formularios centrados, footer visible
- ✅ Build: Compila sin errores

## Tareas Pendientes (Backlog)
- [ ] Conectar con backend real para probar flujo completo
- [ ] Optimización de imágenes grandes (algunos SVGs superan 7MB)
- [ ] Implementar lazy loading para imágenes
- [ ] Code splitting para reducir bundle size
- [ ] Revisar página de detalle de producto en mobile

## Notas Importantes
- La URL de preview externa puede no funcionar debido al ingress (el servidor local en puerto 3000 funciona correctamente)
- El CSS fue optimizado de 81KB a 77KB eliminando código repetitivo

## Idioma Preferido del Usuario
Español
