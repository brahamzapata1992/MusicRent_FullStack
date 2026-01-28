# 🎵 Music Rent - Ecommerce de Renta de Instrumentos Musicales

Aplicación web moderna para rentar instrumentos musicales construida con React + Vite.

## 🚀 Configuración Rápida de la API

### Para cambiar la URL de tu API desplegada:

1. **Edita el archivo `.env`** en la raíz del proyecto:
```bash
VITE_API_URL=https://tu-api-desplegada.com
```

2. **Reinicia el servidor de desarrollo**:
```bash
yarn dev
```

¡Eso es todo! Toda la aplicación ahora usará tu nueva URL de API.

---

## 📋 Características

- ✅ Sistema de autenticación (Login/Registro)
- ✅ Catálogo de productos con búsqueda y filtros
- ✅ Sistema de categorías
- ✅ Detalles de productos con galería de imágenes
- ✅ Sistema de reservas con calendario
- ✅ Favoritos de usuario
- ✅ Panel de administración (Usuarios, Productos, Categorías, Características)
- ✅ Diseño responsive
- ✅ Loading states y placeholders para imágenes
- ✅ Configuración centralizada de API

---

## 🛠️ Instalación

### Requisitos previos
- Node.js 16+ 
- Yarn

### Pasos de instalación

1. **Clonar el repositorio**
```bash
git clone <tu-repositorio>
cd music_rent
```

2. **Instalar dependencias**
```bash
yarn install
```

3. **Configurar variables de entorno**

Copia el archivo de ejemplo y edita según tus necesidades:
```bash
cp .env.example .env
```

Edita `.env` y configura tu URL de API:
```env
VITE_API_URL=http://localhost:8081
```

4. **Iniciar el servidor de desarrollo**
```bash
yarn dev
```

La aplicación estará disponible en `http://localhost:5173`

---

## 📁 Estructura del Proyecto

```
music_rent/
├── src/
│   ├── assets/          # Imágenes y recursos estáticos
│   ├── components/      # Componentes de React
│   │   ├── body/
│   │   │   ├── admin/   # Componentes del panel admin
│   │   │   ├── public/  # Componentes públicos (home, productos, etc.)
│   │   │   └── user/    # Componentes de usuario (login, perfil, etc.)
│   │   ├── footer/
│   │   └── header/
│   ├── config/
│   │   └── api.js       # ⚡ Configuración centralizada de API
│   ├── context/
│   │   └── ApiContext.jsx  # Context API para estado global
│   ├── App.jsx          # Componente principal
│   ├── main.jsx         # Punto de entrada
│   └── index.css        # Estilos globales
├── public/              # Archivos públicos
├── .env                 # ⚡ Variables de entorno (NO subir a git)
├── .env.example         # Plantilla de variables de entorno
├── package.json         # Dependencias del proyecto
└── vite.config.js       # Configuración de Vite
```

---

## 🔑 Variables de Entorno

| Variable | Descripción | Ejemplo |
|----------|-------------|---------|
| `VITE_API_URL` | URL base de tu API backend | `http://localhost:8081` o `https://api.tudominio.com` |

**⚠️ Importante:** 
- Las variables de Vite deben comenzar con `VITE_`
- Después de cambiar `.env`, debes reiniciar el servidor de desarrollo
- Nunca subas el archivo `.env` a git (ya está en `.gitignore`)

---

## 🎨 Scripts Disponibles

```bash
# Desarrollo
yarn dev          # Inicia servidor de desarrollo

# Producción
yarn build        # Construye para producción
yarn preview      # Vista previa de la build de producción

# Linting
yarn lint         # Ejecuta ESLint
```

---

## 🌐 Despliegue

### Para Producción

1. **Configura tu `.env` con la URL de producción**:
```env
VITE_API_URL=https://api-produccion.tudominio.com
```

2. **Construye el proyecto**:
```bash
yarn build
```

3. **Los archivos de producción estarán en `/dist`**

Puedes desplegar la carpeta `dist` en cualquier servicio de hosting estático (Vercel, Netlify, etc.)

---

## 🔧 Tecnologías Utilizadas

- **React 18.2** - Biblioteca de UI
- **Vite 5.1** - Build tool y dev server
- **React Router DOM** - Enrutamiento
- **Tailwind CSS** - Framework CSS
- **Font Awesome** - Iconos
- **React Icons** - Librería de iconos
- **React Modal** - Modales
- **React DatePicker** - Selector de fechas
- **Ant Design** - Componentes UI adicionales
- **Swiper** - Carrusel de imágenes

---

## 📝 Notas de Desarrollo

### Cambio de API durante desarrollo

Si necesitas cambiar entre diferentes APIs (local, staging, producción), simplemente:

1. Edita `.env`:
```env
# Para desarrollo local
VITE_API_URL=http://localhost:8081

# Para staging
# VITE_API_URL=https://api-staging.tudominio.com

# Para producción
# VITE_API_URL=https://api.tudominio.com
```

2. Reinicia el servidor:
```bash
# Detén el servidor (Ctrl+C) y vuelve a ejecutar:
yarn dev
```

### Estructura de la API

La aplicación espera los siguientes endpoints:

- `GET /api/admin/products` - Lista de productos
- `GET /api/admin/products/:id` - Detalle de producto
- `GET /api/admin/list` - Lista de categorías
- `GET /api/admin/features/list` - Lista de características
- `POST /users/sign-up` - Registro de usuario
- `POST /users/authenticate` - Login
- `POST /api/customer/reservation/create` - Crear reserva
- Y más...

---

## 🐛 Solución de Problemas

### La aplicación no se conecta a la API

1. Verifica que `.env` existe y tiene la URL correcta
2. Verifica que la URL no tiene espacios ni caracteres extraños
3. Reinicia el servidor de desarrollo
4. Verifica que tu API está corriendo y accesible

### Las imágenes no cargan

- La aplicación ahora muestra placeholders cuando las imágenes no cargan
- Verifica que tu API está retornando las imágenes en formato base64
- Revisa la consola del navegador para ver errores específicos

---

## 📄 Licencia

Este proyecto está bajo la Licencia MIT.

---

## 👥 Contribuciones

Las contribuciones son bienvenidas. Por favor:

1. Haz fork del proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

---

## 📧 Contacto

Para preguntas o soporte, por favor abre un issue en el repositorio.

---

**¡Disfruta rentando instrumentos musicales! 🎸🎹🥁**
