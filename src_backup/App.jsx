import { Routes, Route, BrowserRouter } from 'react-router-dom';
import { ApiProvider } from './context/ApiContext';
import Header from "./components/header/Header";
import HomePrincipal from "./components/body/public/home/HomePrincipal";
import CrearCuenta from './components/body/user/crearCuenta/CrearCuenta';
import IniciarSesion from './components/body/user/login/IniciarSesion';
import Footer from './components/footer/Footer';
import Dashboard from './components/body/admin/Dashboard/Dashboard'
import Filtro from './components/body/public/home/Categorias/filtro/Filtro';
import PublicDetalleProducto from './components/body/public/home/detalleProducto/PublicDetalleProducto';
import AdminUsuarios from './components/body/admin/administrarUsuario/AdminUsuarios'
import AdminCategorias from './components/body/admin/administrarCategorias/AdminCategorias'
import AdministrarCaracteristicas from './components/body/admin/administrarCaracteristicas/AdministrarCaracteristicas'
import Favoritos from './components/body/user/favoritos/Favoritos';
import Perfil from './components/body/user/perfil/Perfil';
import Calendario from './components/body/public/home/BuscadorProductos/calendario/Calendario';
import AdminProducts from './components/body/admin/administrarProductos/AdminProducts';
import CrearProducto from './components/body/admin/administrarProductos/crearProducto/CrearProducto';
import EditarProducto from './components/body/admin/administrarProductos/editarProducto/EditarProducto'
import RutaNoEncontrada from './components/body/rutaNoEncontrada/RutaNoEncontrada';
import Reservas from './components/body/public/home/detalleProducto/Reservas/Reservas'
import ConfirmacionReserva from './components/body/public/home/detalleProducto/confirmacionReserva/ConfirmacionReserva'

function App() {
  

  return (
    <>
      <BrowserRouter>
        <ApiProvider>
          <Header/>
          <Routes>
            /* Pagina principal */
            <Route path="/home" element={<HomePrincipal />} />
            <Route path="/detalle-producto/:id" element={<PublicDetalleProducto />} />
            <Route path="/categoria/:id/:nombreCategoria" element={<Filtro />}/>
            /* Reservas */
            <Route path="/reservas/:id" element={<Reservas/>}/>
            /* Confirmacion Reserva */
            <Route path="/confirmacion-reserva" element={<ConfirmacionReserva />} />            
            /* seccion login*/
            <Route path="/registro" element={<CrearCuenta />}/>
            <Route path="/inicioSesion" element={<IniciarSesion />}/>
            /* seccion perfil*/
            <Route path="/perfil" element={<Perfil />}/>
            /* seccion perfil*/
            <Route path="/calendario" element={<Calendario />}/>
            /* Pagina Admin */
            <Route path="/administracion" element={<Dashboard />} />
            /* administrar usuarios*/
            <Route path="/administracion/Usuarios" element={<AdminUsuarios />} />
            /* administrar categorias*/
            <Route path="/administracion/Categorias" element={<AdminCategorias />} />
            /* administrar caractteristicas*/
            <Route path="/administracion/Caracteristicas" element={<AdministrarCaracteristicas />} />
            /* administrar productos*/
            <Route path="/administracion/Productos" element={<AdminProducts />} />
            <Route path="/administracion/Productos/CrearProducto" element={<CrearProducto />} />
            <Route path="/administracion/Productos/EditarProducto/:id" element={< EditarProducto />} />
            /*seccion usuarios*/
            <Route path="/favoritos" element={<Favoritos />} />
            /*Ruta not Found*/
            <Route path="*" element={<RutaNoEncontrada />} />
          </Routes>
          <Footer/>         
        </ApiProvider> 
      </BrowserRouter>
    </>
  )
}

export default App
