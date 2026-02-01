import { createContext, useContext, useState, useEffect } from 'react';
import API_URL from '../config/api';

const AppContext = createContext();

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

  // Fetch products from API
  const fetchProducts = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/api/public/products`);
      if (res.ok) {
        const data = await res.json();
        setProducts(data);
      } else {
        console.error('Error fetching products:', res.status);
        setProducts([]);
      }
    } catch (error) {
      console.error('Error fetching products:', error);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  // Fetch categories from API
  const fetchCategories = async () => {
    try {
      const res = await fetch(`${API_URL}/api/public/categories`);
      if (res.ok) {
        const data = await res.json();
        setCategories(data);
      } else {
        console.error('Error fetching categories:', res.status);
        setCategories([]);
      }
    } catch (error) {
      console.error('Error fetching categories:', error);
      setCategories([]);
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
      return { success: false, message: data.message || 'Credenciales incorrectas' };
    } catch (error) {
      console.error('Login error:', error);
      return { success: false, message: 'Error de conexión con el servidor' };
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
      console.error('Register error:', error);
      return { success: false, message: 'Error de conexión con el servidor' };
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
