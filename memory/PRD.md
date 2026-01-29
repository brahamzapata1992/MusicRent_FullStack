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

## Pantallas Implementadas

### 1. Página de Error (404 / Error 400)
- Imagen del personaje con lupa buscando
- Mensaje "¡Ups! Algo salió mal"
- Botones "Volver al inicio" e "Intentar de nuevo"
- Se muestra cuando hay errores de API (400, 404, 500)

### 2. Reserva Exitosa
- Imagen de la chica celebrando (vestido amarillo)
- Mensaje "¡Su reserva se ha realizado con éxito!"
- Detalles: fechas, nombre del producto, precio total, número de reserva
- Botones "Volver al inicio" y "Ver mis reservas"

### 3. Perfil de Usuario
- Avatar con inicial del usuario
- Tabs: Mis Reservas, Favoritos, Mis Datos
- **Historial de Reservas:**
  - Lista de reservas con estados (En curso, Completada, Pendiente, Cancelada)
  - Click en reserva abre modal con detalles completos
- **Detalle de Reserva (Modal):**
  - Imagen y nombre del producto
  - ID y fecha de creación
  - Fechas de inicio, fin y total de días
  - Resumen de pago (precio por día, total)
  - Datos de entrega (nombre, email, teléfono, dirección)
  - Botones según estado: "Cancelar reserva" o "Reservar de nuevo"

## Arquitectura
```
/app/
├── src/
│   ├── assets/
│   │   ├── notFound/img-found.jpg          # Personaje con lupa
│   │   └── reserva/confirmacion-reserva.svg # Chica celebrando
│   ├── pages/
│   │   ├── NotFound.jsx      # Página de error 404/400
│   │   ├── ProductDetail.jsx # Con modal de éxito/error
│   │   └── Profile.jsx       # Historial y detalle de reservas
│   └── ...
```

## Flujo de Reserva Completo

1. **Selección de fechas** → Calcula automáticamente días y precio total
2. **Formulario de reserva** → Pre-llena datos del usuario logueado
3. **Procesamiento** → Spinner de carga mientras se procesa
4. **Resultado:**
   - **Éxito (200):** Muestra imagen de celebración + detalles de reserva
   - **Error (400):** Muestra imagen del personaje con lupa + mensaje de error
   - **Error de red:** Simula éxito para desarrollo sin backend

## Manejo de Errores

```javascript
// En ProductDetail.jsx
if (res.status === 400) {
  setErrorMessage(errorData.message);
  setReservationStep('error'); // Muestra la imagen del error
}
```

## Mock Data para Desarrollo

- 8 productos de ejemplo
- 3 categorías
- 3 reservas de prueba en el perfil con diferentes estados
- Login simulado (cualquier email/password funciona)
- Email con "admin" → acceso al panel de administración

## Comandos

```bash
yarn dev      # Desarrollo en localhost:3000
yarn build    # Build de producción
yarn preview  # Preview del build
```

## Idioma Preferido del Usuario
Español
