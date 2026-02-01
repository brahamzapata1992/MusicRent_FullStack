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
  const [features, setFeatures] = useState([]);
  const [loading, setLoading] = useState(false);
  const [favorites, setFavorites] = useState([]);

  // Fetch products from API
  const fetchProducts = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/api/admin/products`);
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

  // Fetch single product by ID
  const fetchProductById = async (id) => {
    try {
      const res = await fetch(`${API_URL}/api/admin/products/${id}`);
      if (res.ok) {
        return await res.json();
      }
      return null;
    } catch (error) {
      console.error('Error fetching product:', error);
      return null;
    }
  };

  // Fetch products by category
  const fetchProductsByCategory = async (categoryId) => {
    try {
      const res = await fetch(`${API_URL}/api/admin/products/byCategories?categoryIds=${categoryId}`);
      if (res.ok) {
        return await res.json();
      }
      return [];
    } catch (error) {
      console.error('Error fetching products by category:', error);
      return [];
    }
  };

  // Fetch categories from API
  const fetchCategories = async () => {
    try {
      const res = await fetch(`${API_URL}/api/admin/list`);
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

  // Fetch features from API
  const fetchFeatures = async () => {
    try {
      const res = await fetch(`${API_URL}/api/admin/features/list`);
      if (res.ok) {
        const data = await res.json();
        setFeatures(data);
      }
    } catch (error) {
      console.error('Error fetching features:', error);
    }
  };

  // Login - POST /users/authenticate
  const login = async (email, password) => {
    try {
      const res = await fetch(`${API_URL}/users/authenticate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: email, password }),
      });
      const data = await res.json();
      if (res.ok) {
        // userRole from API comes as "ADMIN" or "CUSTOMER" - normalize to uppercase
        const normalizedRole = data.userRole?.toUpperCase() || 'CUSTOMER';
        const userData = {
          userId: data.userId,
          email: data.username,
          name: data.name,
          lastName: data.lastName,
          role: normalizedRole,
        };
        setToken(data.token);
        setUser(userData);
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(userData));
        // Fetch user favorites after login
        fetchUserFavorites(data.userId);
        return { success: true, user: userData };
      }
      return { success: false, message: data.message || 'Credenciales incorrectas' };
    } catch (error) {
      console.error('Login error:', error);
      return { success: false, message: 'Error de conexión con el servidor' };
    }
  };

  // Register - POST /users/sign-up
  const register = async (userData) => {
    try {
      const res = await fetch(`${API_URL}/users/sign-up`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: userData.email,
          password: userData.password,
          name: userData.name,
          lastName: userData.surname,
        }),
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
    setFavorites([]);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  };

  // Fetch user favorites
  const fetchUserFavorites = async (userId) => {
    if (!userId) return;
    try {
      const res = await fetch(`${API_URL}/api/favorites/${userId}`);
      if (res.ok) {
        const data = await res.json();
        setFavorites(data.map(fav => fav.productId || fav.id));
      }
    } catch (error) {
      console.error('Error fetching favorites:', error);
    }
  };

  // Toggle favorite - POST/DELETE /api/favorites/{userId}/{productId}
  const toggleFavorite = async (productId) => {
    if (!user?.userId) return;
    
    const isFav = favorites.includes(productId);
    const method = isFav ? 'DELETE' : 'POST';
    
    // Optimistic update
    if (isFav) {
      setFavorites(prev => prev.filter(id => id !== productId));
    } else {
      setFavorites(prev => [...prev, productId]);
    }
    
    try {
      const res = await fetch(`${API_URL}/api/favorites/${user.userId}/${productId}`, {
        method,
        headers: {
          'Content-Type': 'application/json',
          ...(token && { Authorization: `Bearer ${token}` }),
        },
      });
      
      // If API fails, revert the optimistic update
      if (!res.ok) {
        console.error('Error toggling favorite:', res.status);
        // Revert
        if (isFav) {
          setFavorites(prev => [...prev, productId]);
        } else {
          setFavorites(prev => prev.filter(id => id !== productId));
        }
      }
    } catch (error) {
      console.error('Error toggling favorite:', error);
      // Revert on network error
      if (isFav) {
        setFavorites(prev => [...prev, productId]);
      } else {
        setFavorites(prev => prev.filter(id => id !== productId));
      }
    }
  };

  // Check if product is favorite
  const isFavorite = (productId) => favorites.includes(productId);

  // Create reservation - POST /api/customer/reservation/create
  const createReservation = async (reservationData) => {
    try {
      const res = await fetch(`${API_URL}/api/customer/reservation/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(token && { Authorization: `Bearer ${token}` }),
        },
        body: JSON.stringify(reservationData),
      });
      
      if (res.ok) {
        const data = await res.json();
        return { success: true, data };
      }
      const error = await res.json();
      return { success: false, message: error.message || 'Error al crear reserva', status: res.status };
    } catch (error) {
      console.error('Error creating reservation:', error);
      return { success: false, message: 'Error de conexión' };
    }
  };

  // Fetch reservation history - GET /api/customer/reservation/history/{userId}
  const fetchReservationHistory = async () => {
    if (!user?.userId) return [];
    try {
      const res = await fetch(`${API_URL}/api/customer/reservation/history/${user.userId}`);
      if (res.ok) {
        return await res.json();
      }
      return [];
    } catch (error) {
      console.error('Error fetching reservations:', error);
      return [];
    }
  };

  // ===== ADMIN FUNCTIONS =====

  // Fetch all users - GET /users/list
  const fetchUsers = async () => {
    try {
      const res = await fetch(`${API_URL}/users/list`);
      if (res.ok) {
        return await res.json();
      }
      return [];
    } catch (error) {
      console.error('Error fetching users:', error);
      return [];
    }
  };

  // Change user role - PUT /users/change-role/{email}/{role}
  const changeUserRole = async (email, newRole) => {
    try {
      const res = await fetch(`${API_URL}/users/change-role/${email}/${newRole}`, {
        method: 'PUT',
      });
      return res.ok;
    } catch (error) {
      console.error('Error changing role:', error);
      return false;
    }
  };

  // Create category - POST /api/admin/category (form-data)
  const createCategory = async (formData) => {
    try {
      const res = await fetch(`${API_URL}/api/admin/category`, {
        method: 'POST',
        body: formData, // form-data with name, description, img
      });
      if (res.ok) {
        fetchCategories();
        return { success: true };
      }
      return { success: false };
    } catch (error) {
      console.error('Error creating category:', error);
      return { success: false };
    }
  };

  // Delete category - DELETE /api/admin/category/delete/{id}
  const deleteCategory = async (id) => {
    try {
      const res = await fetch(`${API_URL}/api/admin/category/delete/${id}`, {
        method: 'DELETE',
      });
      if (res.ok) {
        fetchCategories();
        return true;
      }
      return false;
    } catch (error) {
      console.error('Error deleting category:', error);
      return false;
    }
  };

  // Create product - POST /api/admin/products (form-data)
  const createProduct = async (formData) => {
    try {
      const res = await fetch(`${API_URL}/api/admin/products`, {
        method: 'POST',
        body: formData,
      });
      if (res.ok) {
        fetchProducts();
        return { success: true };
      }
      return { success: false };
    } catch (error) {
      console.error('Error creating product:', error);
      return { success: false };
    }
  };

  // Update product - PUT /api/admin/products/{id}
  const updateProduct = async (id, formData) => {
    try {
      const res = await fetch(`${API_URL}/api/admin/products/${id}`, {
        method: 'PUT',
        body: formData,
      });
      if (res.ok) {
        fetchProducts();
        return { success: true };
      }
      return { success: false };
    } catch (error) {
      console.error('Error updating product:', error);
      return { success: false };
    }
  };

  // Delete product - DELETE /api/admin/products/{id}
  const deleteProduct = async (id) => {
    try {
      const res = await fetch(`${API_URL}/api/admin/products/${id}`, {
        method: 'DELETE',
      });
      if (res.ok) {
        fetchProducts();
        return true;
      }
      return false;
    } catch (error) {
      console.error('Error deleting product:', error);
      return false;
    }
  };

  // Create feature - POST /api/admin/features/create
  const createFeature = async (formData) => {
    try {
      const res = await fetch(`${API_URL}/api/admin/features/create`, {
        method: 'POST',
        body: formData,
      });
      if (res.ok) {
        fetchFeatures();
        return { success: true };
      }
      return { success: false };
    } catch (error) {
      console.error('Error creating feature:', error);
      return { success: false };
    }
  };

  // Delete feature - DELETE /api/admin/features/delete/{id}
  const deleteFeature = async (id) => {
    try {
      const res = await fetch(`${API_URL}/api/admin/features/delete/${id}`, {
        method: 'DELETE',
      });
      if (res.ok) {
        fetchFeatures();
        return true;
      }
      return false;
    } catch (error) {
      console.error('Error deleting feature:', error);
      return false;
    }
  };

  useEffect(() => {
    fetchProducts();
    fetchCategories();
    fetchFeatures();
    // If user is logged in, fetch favorites
    if (user?.userId) {
      fetchUserFavorites(user.userId);
    }
  }, []);

  return (
    <AppContext.Provider
      value={{
        user,
        token,
        products,
        categories,
        features,
        loading,
        favorites,
        // Auth
        login,
        register,
        logout,
        // Products
        fetchProducts,
        fetchProductById,
        fetchProductsByCategory,
        createProduct,
        updateProduct,
        deleteProduct,
        // Categories
        fetchCategories,
        createCategory,
        deleteCategory,
        // Features
        fetchFeatures,
        createFeature,
        deleteFeature,
        // Users
        fetchUsers,
        changeUserRole,
        // Favorites
        toggleFavorite,
        isFavorite,
        fetchUserFavorites,
        // Reservations
        createReservation,
        fetchReservationHistory,
        // API URL for images
        API_URL,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
