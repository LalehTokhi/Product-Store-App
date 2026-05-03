import React, { useState } from 'react';
import { LanguageProvider } from './context/LanguageContext';
import { SettingsProvider, useSettings } from './context/SettingsContext';
import Navbar from './components/Navbar';
import ProductList from './components/ProductList';
import ProductDetails from './components/ProductDetails';
import Cart from './components/Cart';
import SettingsPanel from './components/SettingsPanel';
import './App.css';

const AppContent = () => {
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const { theme } = useSettings();

  const handleViewDetails = (product) => {
    setSelectedProduct(product);
    setCurrentPage('details');
  };

  const handleBackToShop = () => setCurrentPage('home');

  return (
    <div className={`app ${theme}`}>
      <Navbar setCurrentPage={setCurrentPage} currentPage={currentPage} />
      <div className="container">
        {currentPage === 'home' && <ProductList onViewDetails={handleViewDetails} />}
        {currentPage === 'cart' && <Cart />}
        {currentPage === 'settings' && <SettingsPanel />}
        {currentPage === 'details' && selectedProduct && (
          <ProductDetails product={selectedProduct} onBack={handleBackToShop} />
        )}
      </div>
    </div>
  );
};

function App() {
  return (
    <LanguageProvider>
      <SettingsProvider>
        <AppContent />
      </SettingsProvider>
    </LanguageProvider>
  );
}

export default App;