import React, { useState } from 'react';
import BuscadorProductos from './BuscadorProductos/BuscadorProductos';
import Categorias from './Categorias/Categorias';
import ListaProductos from './ListaProductos/ListaProductos';
import WhatsAppButton from './whatsapp/WhatsAppButton';

const Home = () => {
  const [selectedCategories, setSelectedCategories] = useState([]);

  const handleSelectedCategoriesChange = (categories) => {
    setSelectedCategories(categories);    
  };

  return (
    <>
      <BuscadorProductos onSelectedCategoriesChange={handleSelectedCategoriesChange} />
      <Categorias />
      <ListaProductos selectedCategories={selectedCategories} />
      <WhatsAppButton />
    </>
  );
};

export default Home;
