# Music Rent - PRD

## Descripción
Aplicación de alquiler de instrumentos musicales con React (Vite) frontend que consume una API Java/Spring en localhost:8081.

## Bugs Corregidos (2 Feb 2026)

### 1. Imágenes de favoritos no renderizaban
- **Archivo:** `/app/src/pages/Profile.jsx`
- **Problema:** Usaba `API_URL + url` pero las imágenes vienen en base64 (`imageData`)
- **Fix:** Cambiar a `data:image/jpeg;base64,${imageData}`

### 2. Panel de administrador no cargaba
- **Archivos:** `/app/src/context/AppContext.jsx`
- **Problema:** El role del usuario no se normalizaba a mayúsculas al cargar de localStorage ni al hacer login
- **Fix:** Normalizar `role.toUpperCase()` en login y al cargar de localStorage

### 3. Filtro de categorías no funcionaba
- **Archivo:** `/app/src/pages/Home.jsx`
- **Problema:** Comparaba `product.category?.id` pero API devuelve `category_id`
- **Fix:** Soportar ambos formatos: `product.category?.id || product.category_id || product.categoryId`

### 4. Imágenes de categorías en Admin
- **Archivo:** `/app/src/pages/admin/AdminCategories.jsx`
- **Problema:** Usaba `urlImg` pero API devuelve `img` en base64
- **Fix:** Verificar primero `img` para base64, luego `urlImg`

### 5. Imágenes de productos en Admin
- **Archivo:** `/app/src/pages/admin/AdminProducts.jsx`
- **Problema:** Usaba `url` pero API devuelve `imageData` en base64
- **Fix:** Verificar primero `imageData` para base64

### 6. Categorías en Home
- **Archivo:** `/app/src/components/Categories.jsx`
- **Problema:** Solo usaba imágenes SVG locales
- **Fix:** Priorizar imagen base64 de la API, fallback a SVG local

## Arquitectura
- Frontend: React + Vite + Tailwind CSS
- Backend: API externa en localhost:8081 (Java/Spring)
- DB: MySQL (categorias, productos, usuarios)

## Estructura de datos de la API
- Categorías: `{id, name, description, img (base64)}`
- Productos: `{id, name, description, price, category_id, images: [{imageData (base64)}]}`
- Usuarios: `{id, email, name, lastName, userRole: "ADMIN"|"CUSTOMER"}`

## Próximos pasos
- Probar con API backend conectada
- Verificar login de admin y redirección a panel
- Verificar filtro de productos por categoría
