# Music Rent - Documentación de Configuración API

## Configuración Rápida

Para desplegar la aplicación, solo necesitas cambiar la URL del API en el archivo `.env`:

```bash
# .env
VITE_API_URL=https://tu-api-url.com
```

## Endpoints de la API

### Públicos (No requieren autenticación)

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/api/public/products` | Lista todos los productos |
| GET | `/api/public/products/:id` | Obtiene detalle de un producto |
| GET | `/api/public/categories` | Lista todas las categorías |

### Autenticación

| Método | Endpoint | Body | Descripción |
|--------|----------|------|-------------|
| POST | `/api/auth/login` | `{ email, password }` | Iniciar sesión |
| POST | `/api/auth/register` | `{ name, surname, email, password }` | Crear cuenta |

### Cliente (Requieren token)

| Método | Endpoint | Body | Descripción |
|--------|----------|------|-------------|
| POST | `/api/customer/reservation/create` | `{ productId, startDate, endDate, ... }` | Crear reserva |

### Administrador (Requieren token de admin)

**Usuarios:**
| Método | Endpoint | Body | Descripción |
|--------|----------|------|-------------|
| GET | `/api/admin/users` | - | Lista todos los usuarios |
| PUT | `/api/admin/users/:id` | `{ role }` | Cambiar rol de usuario |
| DELETE | `/api/admin/users/:id` | - | Eliminar usuario |

**Categorías:**
| Método | Endpoint | Body | Descripción |
|--------|----------|------|-------------|
| POST | `/api/admin/categories` | `{ name, description }` | Crear categoría |
| DELETE | `/api/admin/categories/:id` | - | Eliminar categoría |

**Productos:**
| Método | Endpoint | Body | Descripción |
|--------|----------|------|-------------|
| POST | `/api/admin/products` | `{ name, description, price, categoryId }` | Crear producto |
| PUT | `/api/admin/products/:id` | `{ name, description, price, categoryId }` | Editar producto |
| DELETE | `/api/admin/products/:id` | - | Eliminar producto |

## Estructura de Datos

### Producto
```json
{
  "id": "string",
  "name": "string",
  "description": "string",
  "price": "number",
  "category": {
    "id": "string",
    "name": "string"
  },
  "images": [
    {
      "url": "string"
    }
  ]
}
```

### Categoría
```json
{
  "id": "string",
  "name": "string",
  "description": "string"
}
```

### Usuario
```json
{
  "id": "string",
  "name": "string",
  "surname": "string",
  "email": "string",
  "role": "user" | "admin"
}
```

## Headers de Autenticación

Para endpoints que requieren autenticación, incluir el header:

```
Authorization: Bearer <token>
```

## Comandos

```bash
# Desarrollo
yarn dev

# Build para producción
yarn build

# Preview del build
yarn preview
```
