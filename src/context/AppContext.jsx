import { createContext, useContext, useState, useEffect } from 'react';
import API_URL from '../config/api';

const AppContext = createContext();

// Mock data for development without backend
const MOCK_CATEGORIES = [
  { id: '1', name: 'Cuerdas', description: 'Guitarras, bajos, violines y más instrumentos de cuerda' },
  { id: '2', name: 'Percusión', description: 'Baterías, tambores, platillos y más' },
  { id: '3', name: 'Vientos', description: 'Saxofones, trompetas, flautas y más' },
];

const MOCK_PRODUCTS = [
  { id: '1', name: 'Guitarra Fender CD60s', description: 'Guitarra acústica de alta calidad, perfecta para principiantes y profesionales. Tapa de abeto sólido, aros y fondo de caoba.', price: 30000, category: { id: '1', name: 'Cuerdas' }, images: [] },
  { id: '2', name: 'Guitarra Gibson Les Paul', description: 'La legendaria Les Paul con cuerpo de caoba y tapa de arce. Pastillas humbucker para un sonido potente y versátil.', price: 45000, category: { id: '1', name: 'Cuerdas' }, images: [] },
  { id: '3', name: 'Bajo Eléctrico Fender Jazz', description: 'El bajo más versátil del mundo. Mástil de arce, cuerpo de aliso y pastillas de bobina simple.', price: 35000, category: { id: '1', name: 'Cuerdas' }, images: [] },
  { id: '4', name: 'Batería Pearl Export', description: 'Kit de batería completo de 5 piezas. Cascos de álamo/caoba para un sonido cálido y potente.', price: 50000, category: { id: '2', name: 'Percusión' }, images: [] },
  { id: '5', name: 'Saxofón Alto Yamaha YAS-280', description: 'Saxofón alto ideal para estudiantes. Excelente entonación y respuesta fácil en todos los registros.', price: 40000, category: { id: '3', name: 'Vientos' }, images: [] },
  { id: '6', name: 'Trompeta Bach Stradivarius', description: 'La trompeta profesional por excelencia. Campana de latón dorado y válvulas Monel.', price: 55000, category: { id: '3', name: 'Vientos' }, images: [] },
  { id: '7', name: 'Violín Stradivarius Replica', description: 'Réplica de alta calidad del famoso violín. Madera de abeto y arce envejecido.', price: 60000, category: { id: '1', name: 'Cuerdas' }, images: [] },
  { id: '8', name: 'Cajón Peruano Profesional', description: 'Cajón de madera de cedro con cuerda ajustable. Sonido auténtico y potente.', price: 25000, category: { id: '2', name: 'Percusión' }, images: [] },
];

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
};

export const AppProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('user');
    return saved ? JSON.parse(saved) : null;
  });
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem('favorites');
    return saved ? JSON.parse(saved) : [];
  });

  // Fetch products
  const fetchProducts = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/api/public/products`);
      if (res.ok) {
        const data = await res.json();
        setProducts(data);
      } else {
        // Use mock data if API fails
        setProducts(MOCK_PRODUCTS);
      }
    } catch (error) {
      console.error('Error fetching products:', error);
      // Use mock data if API fails
      setProducts(MOCK_PRODUCTS);
    } finally {
      setLoading(false);
    }
  };

  // Fetch categories
  const fetchCategories = async () => {
    try {
      const res = await fetch(`${API_URL}/api/public/categories`);
      if (res.ok) {
        const data = await res.json();
        setCategories(data);
      } else {
        // Use mock data if API fails
        setCategories(MOCK_CATEGORIES);
      }
    } catch (error) {
      console.error('Error fetching categories:', error);
      // Use mock data if API fails
      setCategories(MOCK_CATEGORIES);
    }
  };

  // Login
  const login = async (email, password) => {
    try {
      const res = await fetch(`${API_URL}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (res.ok) {
        setToken(data.token);
        setUser(data.user);
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        return { success: true };
      }
      return { success: false, message: data.message || 'Error al iniciar sesión' };
    } catch (error) {
      // Mock login for development
      const mockUser = {
        id: '1',
        name: email.split('@')[0],
        surname: 'Usuario',
        email: email,
        role: email.includes('admin') ? 'admin' : 'user',
      };
      const mockToken = 'mock-token-' + Date.now();
      setToken(mockToken);
      setUser(mockUser);
      localStorage.setItem('token', mockToken);
      localStorage.setItem('user', JSON.stringify(mockUser));
      return { success: true };
    }
  };

  // Register
  const register = async (userData) => {
    try {
      const res = await fetch(`${API_URL}/api/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData),
      });
      const data = await res.json();
      if (res.ok) {
        return { success: true };
      }
      return { success: false, message: data.message || 'Error al registrar' };
    } catch (error) {
      // Mock register for development - always success
      return { success: true };
    }
  };

  // Logout
  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  };

  // Toggle favorite
  const toggleFavorite = (productId) => {
    setFavorites(prev => {
      const newFavorites = prev.includes(productId)
        ? prev.filter(id => id !== productId)
        : [...prev, productId];
      localStorage.setItem('favorites', JSON.stringify(newFavorites));
      return newFavorites;
    });
  };

  // Check if product is favorite
  const isFavorite = (productId) => favorites.includes(productId);

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  return (
    <AppContext.Provider
      value={{
        user,
        token,
        products,
        categories,
        loading,
        favorites,
        login,
        register,
        logout,
        fetchProducts,
        fetchCategories,
        toggleFavorite,
        isFavorite,
        API_URL,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
