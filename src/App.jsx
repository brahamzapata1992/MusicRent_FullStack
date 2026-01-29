import { Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import WhatsAppButton from './components/WhatsAppButton';
import Home from './pages/Home';
import ProductDetail from './pages/ProductDetail';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import NotFound from './pages/NotFound';
import AdminLayout from './pages/admin/AdminLayout';
import AdminUsers from './pages/admin/AdminUsers';
import AdminCategories from './pages/admin/AdminCategories';
import AdminProducts from './pages/admin/AdminProducts';

const App = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Routes>
        {/* Admin Routes - No Header/Footer */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Navigate to="/admin/usuarios" replace />} />
          <Route path="usuarios" element={<AdminUsers />} />
          <Route path="categorias" element={<AdminCategories />} />
          <Route path="productos" element={<AdminProducts />} />
        </Route>

        {/* Public Routes - With Header/Footer */}
        <Route
          path="*"
          element={
            <>
              <Header />
              <div className="flex-1">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/home" element={<Navigate to="/" replace />} />
                  <Route path="/producto/:id" element={<ProductDetail />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/inicioSesion" element={<Navigate to="/login" replace />} />
                  <Route path="/registro" element={<Register />} />
                  <Route path="/perfil" element={<Profile />} />
                  <Route path="/error" element={<NotFound />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </div>
              <Footer />
              <WhatsAppButton />
            </>
          }
        />
      </Routes>
    </div>
  );
};

export default App;
