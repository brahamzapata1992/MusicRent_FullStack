import { useState } from 'react';
import { Search, Trash2, Plus, X } from 'lucide-react';
import { useApp } from '../../context/AppContext';

const AdminCategories = () => {
  const { categories, createCategory, deleteCategory, API_URL } = useApp();
  const [search, setSearch] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [newCategory, setNewCategory] = useState({ name: '', description: '' });
  const [imageFile, setImageFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleCreate = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    const formData = new FormData();
    formData.append('name', newCategory.name);
    formData.append('description', newCategory.description);
    if (imageFile) {
      formData.append('img', imageFile);
    }

    const result = await createCategory(formData);
    
    if (result.success) {
      setShowModal(false);
      setNewCategory({ name: '', description: '' });
      setImageFile(null);
    }
    setLoading(false);
  };

  const handleDelete = async (categoryId) => {
    if (!confirm('¿Estás seguro de eliminar esta categoría?')) return;
    await deleteCategory(categoryId);
  };

  const filteredCategories = categories.filter(cat =>
    cat.name?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800 mb-2">Administrar Categorías</h1>
      <p className="text-gray-600 mb-6">Permite añadir y eliminar categorías de productos</p>

      {/* Actions */}
      <div className="flex flex-wrap items-center gap-4 mb-6">
        <div className="relative flex-1 max-w-md">
          <input
            type="text"
            placeholder="Buscar categoría..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full px-4 py-3 pl-10 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500"
          />
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 px-5 py-3 bg-primary-500 text-white font-semibold rounded-xl hover:bg-primary-600 transition-colors"
        >
          <Plus size={20} />
          Agregar categoría
        </button>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-primary-50">
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Imagen</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">ID</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Nombre</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Descripción</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Acción</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredCategories.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-gray-500">
                    No se encontraron categorías
                  </td>
                </tr>
              ) : (
                filteredCategories.map(category => {
                  // Handle base64 img data from API (could be SVG or JPEG)
                  const getCategoryImage = () => {
                    if (category.img) {
                      // Detect if it's SVG (starts with PHN2 which is <svg in base64)
                      if (category.img.startsWith('PHN2') || category.img.startsWith('PD94')) {
                        return `data:image/svg+xml;base64,${category.img}`;
                      }
                      return `data:image/jpeg;base64,${category.img}`;
                    }
                    if (category.urlImg) {
                      return `${API_URL}${category.urlImg}`;
                    }
                    return '/placeholder-category.png';
                  };
                  
                  return (
                  <tr key={category.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <img
                        src={getCategoryImage()}
                        alt={category.name}
                        className="w-12 h-12 object-cover rounded-lg bg-gray-100"
                        onError={(e) => { e.target.src = '/placeholder-category.png'; }}
                      />
                    </td>
                    <td className="px-6 py-4 text-gray-500 font-mono text-sm">{category.id}</td>
                    <td className="px-6 py-4 font-medium text-gray-800">{category.name}</td>
                    <td className="px-6 py-4 text-gray-600 max-w-xs truncate">{category.description}</td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => handleDelete(category.id)}
                        className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        <Trash2 size={18} />
                      </button>
                    </td>
                  </tr>
                )})
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-md p-6 relative">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full"
            >
              <X size={20} />
            </button>

            <h2 className="text-xl font-bold text-gray-800 mb-6">Nueva Categoría</h2>

            <form onSubmit={handleCreate} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nombre</label>
                <input
                  type="text"
                  required
                  value={newCategory.name}
                  onChange={(e) => setNewCategory({ ...newCategory, name: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500"
                  placeholder="Ej: Cuerdas"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Descripción</label>
                <textarea
                  value={newCategory.description}
                  onChange={(e) => setNewCategory({ ...newCategory, description: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 resize-none"
                  rows={3}
                  placeholder="Descripción de la categoría"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Imagen</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setImageFile(e.target.files[0])}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 bg-primary-500 text-white font-semibold rounded-xl hover:bg-primary-600 disabled:bg-gray-300 transition-colors"
              >
                {loading ? 'Creando...' : 'Crear Categoría'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminCategories;
