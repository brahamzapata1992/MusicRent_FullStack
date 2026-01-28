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
1. **Arreglo del build de producción** (`yarn build`)
   - Instalada dependencia faltante: `styled-components`
   - Corregida ruta de importación incorrecta en `ListaProductos.jsx` (de 4 a 5 niveles)
   
2. **Configuración del entorno de desarrollo**
   - Actualizado `vite.config.js` para usar puerto 3000
   - Configurado supervisor para ejecutar `yarn dev` correctamente

3. **Verificación de responsividad**
   - Header: ✅ Menú hamburguesa funcional en móvil
   - Buscador de productos: ✅ Se apila verticalmente
   - Grid de productos: ✅ Se ajusta de 3 columnas a 2 a 1

### Sesiones Anteriores
- Centralización de URL del API en `VITE_API_URL`
- Creación de skeletons de carga para cards
- Placeholders para imágenes en detalle de producto
- Estilos responsivos con media queries

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

## Tareas Pendientes (Backlog)
- [ ] Conectar con backend real para probar flujo completo
- [ ] Optimización de imágenes grandes (algunos SVGs superan 7MB)
- [ ] Implementar lazy loading para imágenes
- [ ] Code splitting para reducir bundle size

## Notas Importantes
- La URL de preview de Emergent no funciona externamente debido a la configuración del ingress (el servidor local responde correctamente)
- El build de producción genera assets muy grandes debido a las imágenes SVG incluidas

## Idioma Preferido del Usuario
Español
